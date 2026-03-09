import { useEffect, useRef, useState } from 'react';

type MessagePayload = {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  createdAt: string;
};

type UseChatSocketOptions = {
  token: string | null;
  onMessage?: (message: MessagePayload) => void;
};

const buildWsUrl = (token: string) => {
  const base = new URL(import.meta.env.VITE_API_URL);
  const protocol = base.protocol === 'https:' ? 'wss:' : 'ws:';
  return `${protocol}//${base.host}/ws/chat?token=${token}`;
};

const useChatSocket = ({ token, onMessage }: UseChatSocketOptions) => {
  const socketRef = useRef<WebSocket | null>(null);
  const [readyState, setReadyState] = useState<number>(WebSocket.CLOSED);

  useEffect(() => {
    if (!token) return undefined;
    const url = buildWsUrl(token);
    const ws = new WebSocket(url);
    socketRef.current = ws;

    const closeSocket = () => {
      ws.close();
    };

    ws.onopen = () => setReadyState(ws.readyState);
    ws.onclose = () => setReadyState(ws.readyState);
    ws.onerror = () => setReadyState(ws.readyState);
    ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (payload.type === 'private-message' && payload.data) {
          onMessage?.(payload.data as MessagePayload);
        }
      } catch (error) {
        console.error('WS message parse error', error);
      }
    };

    return closeSocket;
  }, [token, onMessage]);

  const sendMessage = (data: unknown) => {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) return;
    socketRef.current.send(JSON.stringify(data));
  };

  return {
    readyState,
    sendMessage,
  };
};

export type { MessagePayload };
export default useChatSocket;

