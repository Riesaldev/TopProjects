import { useEffect, useMemo, useRef, useState } from 'react';
import useChatSocket, { type MessagePayload } from '../hooks/useChatSocket.ts';

const { VITE_API_URL } = import.meta.env;

type ChatPanelProps = {
  contactId: number | null;
  contactName: string;
  authToken: string | null;
  onClose: () => void;
};

const ChatPanel = ({ contactId, contactName, authToken, onClose }: ChatPanelProps) => {
  const [messages, setMessages] = useState<MessagePayload[]>([]);
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const headers = useMemo<Record<string, string>>(() => {
    const base: Record<string, string> = {};
    if (authToken) base.Authorization = authToken;
    return base;
  }, [authToken]);

  const { sendMessage, readyState } = useChatSocket({
    token: authToken,
    onMessage: (message) => {
      if (!contactId) return;
      if (message.senderId === contactId || message.receiverId === contactId) {
        setMessages((prev) => [...prev, message]);
      }
    },
  });

  useEffect(() => {
    const fetchMessages = async () => {
      if (!contactId || !authToken) return;
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${VITE_API_URL}/api/users/contacts/${contactId}/messages`, {
          headers,
        });
        const body = await res.json();
        if (!res.ok) throw new Error(body.message || 'No se pudo cargar el chat');
        setMessages(body.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [contactId, authToken, headers]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!draft.trim() || !contactId) return;
    sendMessage({
      type: 'private-message',
      to: contactId,
      content: draft.trim(),
    });
    setDraft('');
  };

  if (!contactId) return null;

  return (
    <section className="fixed bottom-6 right-6 z-50 w-full max-w-md rounded-3xl border border-white/10 bg-[#05060f]/95 backdrop-blur-2xl p-5 shadow-2xl space-y-4">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/40">chat</p>
          <h3 className="text-lg font-semibold text-white">{contactName}</h3>
          <p className="text-xs text-white/50">
            {readyState === WebSocket.OPEN ? 'Conectado' : 'Conectando...'}
          </p>
        </div>
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/70 hover:text-white"
          onClick={onClose}
        >
          <i className="bi bi-x" />
        </button>
      </header>

      <div className="h-72 overflow-y-auto space-y-3 pr-2 flex flex-col">
        {loading && <p className="text-sm text-white/50">Cargando mensajes...</p>}
        {error && <p className="text-sm text-red-400">{error}</p>}
        {!loading &&
          messages.map((message) => {
            const isFromContact = message.senderId === contactId;
            return (
            <article
              key={message.id}
              className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                isFromContact ? 'bg-white/10 self-start text-white' : 'bg-[#7f5af0]/80 text-[#05060f] self-end ml-auto'
              }`}
            >
              <p>{message.content}</p>
              <span className="block text-[10px] mt-1 opacity-60">
                {new Date(message.createdAt || Date.now()).toLocaleTimeString()}
              </span>
            </article>
          );
          })}
        <div ref={bottomRef} />
      </div>

      <div className="flex items-center gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Escribe un mensaje"
          className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-white/40 focus:border-[#00e1d9] focus:ring-2 focus:ring-[#00e1d9]/40 transition"
        />
        <button type="button" className="btn-primary !px-4 !py-2 text-sm" onClick={handleSend} disabled={!draft.trim()}>
          Enviar
        </button>
      </div>
    </section>
  );
};

export default ChatPanel;

