import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const { VITE_API_URL } = import.meta.env;

type ContactUser = {
  userId: number;
  username: string;
  email: string;
  avatar?: string | null;
  id?: number;
  direction?: 'incoming' | 'outgoing';
  status?: string;
  isOnline?: boolean;
};

type AgendaDrawerProps = {
  isOpen: boolean;
  authToken: string | null;
  onClose: () => void;
  onSelectContact: (contact: ContactUser) => void;
};

const AgendaDrawer = ({ isOpen, onClose, authToken, onSelectContact }: AgendaDrawerProps) => {
  const [contacts, setContacts] = useState<ContactUser[]>([]);
  const [pendingRequests, setPendingRequests] = useState<ContactUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<ContactUser[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const buildHeaders = (extra: Record<string, string> = {}) => {
    const headers: Record<string, string> = { ...extra };
    if (authToken) headers.Authorization = authToken;
    return headers;
  };

  useEffect(() => {
    if (!isOpen || !authToken) return;

    const fetchContacts = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${VITE_API_URL}/api/users/contacts`, {
          headers: buildHeaders(),
        });
        const body = await res.json();
        if (!res.ok) throw new Error(body.message || 'Error al cargar agenda');
        const accepted = body.data?.accepted || [];
        const pending = body.data?.pending || [];
        setContacts(
          accepted.map((item: any) => ({
            userId: item.userId,
            username: item.username,
            email: item.email,
            avatar: item.avatar ? `${VITE_API_URL}/${item.avatar}` : null,
            isOnline: item.isOnline,
          }))
        );
        setPendingRequests(
          pending.map((item: any) => ({
            userId: item.userId,
            username: item.username,
            email: item.email,
            avatar: item.avatar ? `${VITE_API_URL}/${item.avatar}` : null,
            direction: item.direction,
            status: item.status,
            isOnline: item.isOnline,
          }))
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [isOpen, authToken]);

  const handleSearch = async (value: string) => {
    setSearch(value);
    if (!authToken || value.trim().length < 2) {
      setSearchResults([]);
      return;
    }
    try {
      setSearchLoading(true);
      const res = await fetch(`${VITE_API_URL}/api/users/search?q=${encodeURIComponent(value.trim())}`, {
        headers: buildHeaders(),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.message || 'Error al buscar');
      setSearchResults(
        (body.data || []).map((item: any) => ({
          id: item.id,
          userId: item.id,
          username: item.username,
          email: item.email,
          avatar: item.avatar,
        }))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setSearchLoading(false);
    }
  };

  const sendRequest = async (userId: number) => {
    if (!authToken) return;
    try {
      const res = await fetch(`${VITE_API_URL}/api/users/contacts/request`, {
        method: 'POST',
        headers: buildHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ userId }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.message || 'No se pudo enviar la solicitud');
      setSearch('');
      setSearchResults([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    }
  };

  const acceptRequest = async (userId: number) => {
    if (!authToken) return;
    try {
      const res = await fetch(`${VITE_API_URL}/api/users/contacts/${userId}/accept`, {
        method: 'POST',
        headers: buildHeaders(),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.message || 'No se pudo aceptar la solicitud');
      const acceptedUser = pendingRequests.find((item) => item.userId === userId);
      if (acceptedUser) {
        setContacts((prev) => [...prev, acceptedUser]);
      }
      setPendingRequests((prev) => prev.filter((item) => item.userId !== userId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    }
  };

  if (!isOpen) return null;

  return (
    <aside
      className="fixed inset-y-0 right-0 z-40 w-full max-w-md bg-[#05060f]/95 border-l border-white/5 backdrop-blur-2xl p-6 space-y-6 overflow-y-auto"
      aria-label="Agenda de contactos"
    >
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-white/40">agenda</p>
          <h2 className="text-2xl font-semibold text-white">Tu estudio de contactos</h2>
        </div>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 hover:text-white"
          onClick={onClose}
          aria-label="Cerrar agenda"
        >
          <i className="bi bi-x" />
        </button>
      </header>

      <div className="space-y-3">
        <label className="text-sm text-white/60" htmlFor="contact-search">
          Buscar usuarios
        </label>
        <input
          id="contact-search"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Escribe un nombre o email"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-[#7f5af0] focus:ring-2 focus:ring-[#7f5af0]/40 transition"
        />
        {searchLoading && <p className="text-xs text-white/50">Buscando...</p>}
        {searchResults.length > 0 && (
          <ul className="space-y-2 rounded-2xl border border-white/10 p-3 bg-white/5">
            {searchResults.map((user) => (
              <li key={user.id} className="flex items-center justify-between text-sm text-white/80">
                <span>{user.username || user.email}</span>
                <button
                  type="button"
                  className="btn-secondary !px-3 !py-1 text-xs"
                  onClick={() => sendRequest(Number(user.userId))}
                >
                  Solicitar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <section className="space-y-3">
        <p className="text-xs uppercase tracking-[0.4em] text-white/40">Solicitudes recibidas</p>
        {pendingRequests.length === 0 && <p className="text-sm text-white/50">No tienes invitaciones pendientes.</p>}
        <ul className="space-y-3">
          {pendingRequests.map((request) => (
            <li
              key={request.userId}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3"
            >
              <div>
                <p className="text-white font-medium">{request.username}</p>
                <p className="text-xs text-white/50">{request.email}</p>
                <span className={`inline-flex items-center gap-1 text-[11px] ${request.isOnline ? 'text-[#00e1d9]' : 'text-white/40'}`}>
                  <span className={`h-2 w-2 rounded-full ${request.isOnline ? 'bg-[#00e1d9]' : 'bg-white/30'}`} />
                  {request.isOnline ? 'Activo' : 'Desconectado'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="btn-primary !px-3 !py-1 text-xs"
                  onClick={() => acceptRequest(request.userId)}
                >
                  Aceptar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <p className="text-xs uppercase tracking-[0.4em] text-white/40">contactos</p>
        {loading && <p className="text-sm text-white/60">Cargando agenda...</p>}
        {error && <p className="text-sm text-red-400">{error}</p>}
        {!loading && contacts.length === 0 && (
          <p className="text-sm text-white/50">
            Aún no tienes contactos aceptados. Envía solicitudes desde la búsqueda o comparte tu perfil.
          </p>
        )}
        <ul className="space-y-3">
          {contacts.map((contact) => (
            <li
              key={contact.userId}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3"
            >
              <div>
                <p className="text-white font-medium">{contact.username}</p>
                <p className="text-xs text-white/50">{contact.email}</p>
                <span className={`inline-flex items-center gap-1 text-[11px] ${contact.isOnline ? 'text-[#00e1d9]' : 'text-white/40'}`}>
                  <span className={`h-2 w-2 rounded-full ${contact.isOnline ? 'bg-[#00e1d9]' : 'bg-white/30'}`} />
                  {contact.isOnline ? 'Activo' : 'Desconectado'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" className="btn-primary !px-3 !py-1 text-xs" onClick={() => onSelectContact(contact)}>
                  Abrir chat
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <footer className="text-xs text-white/50">
        Gestiona contactos desde{' '}
        <Link to="/community" className="text-[#00e1d9] hover:text-white">
          la comunidad
        </Link>{' '}
        o escríbenos para ayuda personalizada.
      </footer>
    </aside>
  );
};

export type { ContactUser };
export default AgendaDrawer;

