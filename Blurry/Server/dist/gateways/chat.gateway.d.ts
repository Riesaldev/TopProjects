import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private activeSockets;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleAuthenticate(data: {
        userId: string;
    }, client: Socket): {
        status: string;
    };
    handleMessage(data: {
        to: string;
        message: string;
    }, client: Socket): {
        status: string;
    };
    private getUserIdBySocketId;
}
