import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
  }
})
@Injectable()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private activeSockets: Map<string, string> = new Map();

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    // Eliminar usuario de la lista de activos si estaba autenticado
    for (const [userId, socketId] of this.activeSockets.entries()) {
      if (socketId === client.id) {
        this.activeSockets.delete(userId);
        break;
      }
    }
  }

  @SubscribeMessage('authenticate')
  handleAuthenticate(@MessageBody() data: { userId: string }, @ConnectedSocket() client: Socket) {
    this.activeSockets.set(data.userId, client.id);
    return { status: 'authenticated' };
  }

  @SubscribeMessage('sendMessage')
  handleMessage(@MessageBody() data: { to: string, message: string }, @ConnectedSocket() client: Socket) {
    const recipientSocketId = this.activeSockets.get(data.to);
    
    if (recipientSocketId) {
      this.server.to(recipientSocketId).emit('newMessage', {
        from: this.getUserIdBySocketId(client.id),
        message: data.message,
        timestamp: new Date()
      });
      return { status: 'delivered' };
    }
    
    return { status: 'pending' };
  }

  private getUserIdBySocketId(socketId: string): string | undefined {
    for (const [userId, sid] of this.activeSockets.entries()) {
      if (sid === socketId) {
        return userId;
      }
    }
    return undefined;
  }
}