'use client';

import Button from "@/components/Button";
import ReportForm from "@/components/ReportForm";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef, Suspense } from "react";
import { checkModeration } from "@/utils/moderation";
import { useNotifications } from "@/components/NotificationsContext";
import { Contact, Game, Product, Note, AgendaEvent, User } from "@/types";
import { useRealtime } from '@/context/RealtimeContext';
import { Brain, Swords } from "lucide-react";

const CALL_DURATION = 8 * 60; // 8 minutos en segundos
const TOKEN_COST_PER_2MIN = 10; // 10 tokens por 2 minutos extra

interface VideoCallPageProps {
  userId: number;
}

type SpeechRecognitionAlternativeLike = {
  transcript: string;
};

type SpeechRecognitionResultLike = {
  isFinal: boolean;
  [index: number]: SpeechRecognitionAlternativeLike;
};

type SpeechRecognitionEventLike = {
  resultIndex: number;
  results: ArrayLike<SpeechRecognitionResultLike>;
};

type SpeechRecognitionErrorEventLike = {
  error?: string;
};

type SpeechRecognitionInstance = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

function VideoCallContent({ userId }: Readonly<VideoCallPageProps>) {
  const router = useRouter();
  const getAuthHeaders = () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("jwt-token") : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const [showReport, setShowReport] =useState(false);
  const [contact, setContact] =useState<Contact | null>(null);
  const [note, setNote] =useState("");
  const [noteId, setNoteId] = useState<number | null>(null);
  const [saving, setSaving] =useState(false);
  const [showPanel, setShowPanel] =useState<"none"|"games"|"notes">("none");
  const [muted, setMuted] =useState(false);
  const [callActive, setCallActive] =useState(true);
  const [secondsLeft, setSecondsLeft] =useState(CALL_DURATION);
  const [tokens, setTokens] = useState<number | null>(null);
  const [games, setGames] =useState<Game[]>([]);
  const searchParams = useSearchParams();
  const contactId = searchParams?.get("contactId");
  const gameId = searchParams?.get("gameId");
  const gameName = searchParams?.get("gameName");
  const [showStore, setShowStore] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [purchaseMsg, setPurchaseMsg] = useState("");
  const { showToast } = useNotifications();
  const moderationActive = true;
  const [transcript, setTranscript] = useState("");
  const recognitionRef =useRef<SpeechRecognitionInstance | null>(null);
  const [agendaNote, setAgendaNote] =useState<string>("");
  const realtimeContext = useRealtime();
  const videoCallInvite = realtimeContext?.videoCallInvite;

  // Temporizador de llamada
  useEffect(() => {
    if (!callActive) return;
    if (secondsLeft <= 0) {
      setCallActive(false);
      return;
    }
    const timer = setTimeout(() => setSecondsLeft(s => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, callActive]);

  // Obtener datos de contacto, nota y juegos
  useEffect(() => {
    let cancelled = false;

    if (!contactId) {
      if (!cancelled) {
        setContact(null);
        setNote("");
        setNoteId(null);
        setAgendaNote("");
      }
      return () => {
        cancelled = true;
      };
    }
    const authHeaders = getAuthHeaders();

    fetch(`/api/users`, { headers: authHeaders })
      .then(res => res.json())
      .then((users: unknown) => {
        const usersList = Array.isArray(users) ? (users as Contact[]) : [];
        const c = usersList.find((u: Contact) => String(u.id) === String(contactId));
        if (!cancelled) {
          setContact(c || null);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setContact(null);
        }
      });
    fetch(`/api/notes?userId=${userId}`, { headers: authHeaders })
      .then(res => res.json())
      .then((notes: unknown) => {
        const notesList = Array.isArray(notes) ? (notes as Note[]) : [];
        const n = notesList.find((noteItem: Note) => String(noteItem.contactId) === String(contactId));
        if (n) {
          if (!cancelled) {
            setNote(n.content);
            setNoteId(Number(n.id));
          }
          return;
        }
        if (!cancelled) {
          setNote("");
          setNoteId(null);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setNote("");
          setNoteId(null);
        }
      });
    fetch(`/api/games`, { headers: authHeaders })
      .then(res => res.json())
      .then((data: unknown) => {
        if (!cancelled) {
          setGames(Array.isArray(data) ? data : []);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setGames([]);
        }
      });
    fetch(`/api/users/${userId}`, { headers: authHeaders })
      .then(res => res.json())
      .then((u: unknown) => {
        const user = (u && typeof u === "object") ? (u as User) : null;
        if (!cancelled) {
          setTokens(user?.tokens ?? 0);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setTokens(0);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [contactId, userId]);

  // Obtener nota privada de la cita activa
  useEffect(() => {
    let cancelled = false;

    if (!contactId) return;
    const authHeaders = getAuthHeaders();
    fetch(`/api/agenda?userId=${userId}`, { headers: authHeaders })
      .then(res => res.json())
      .then((agenda: unknown) => {
        const agendaList = Array.isArray(agenda) ? (agenda as AgendaEvent[]) : [];
        const cita = agendaList.find((e: AgendaEvent) => String(e.contactId) === String(contactId) && e.note);
        if (!cancelled) {
          setAgendaNote(cita?.note ?? "");
        }
      })
      .catch(() => {
        if (!cancelled) {
          setAgendaNote("");
        }
      });

    return () => {
      cancelled = true;
    };
  }, [contactId, userId]);

  // Obtener productos de la tienda al abrir el store
  useEffect(() => {
    let cancelled = false;

    if (showStore) {
      fetch("/api/products", { headers: getAuthHeaders() })
        .then(res => res.json())
        .then((data: unknown) => {
          if (!cancelled) {
            setProducts(Array.isArray(data) ? data : []);
          }
        })
        .catch(() => {
          if (!cancelled) {
            setProducts([]);
          }
        });
    }

    return () => {
      cancelled = true;
    };
  }, [showStore]);

  // Iniciar/detener reconocimiento de voz
  useEffect(() => {
    // Moderación IA siempre activa
    const SpeechRecognitionCtor = (window.SpeechRecognition || window.webkitSpeechRecognition) as SpeechRecognitionConstructor | undefined;
    if (!SpeechRecognitionCtor) {
      showToast("Tu navegador no soporta reconocimiento de voz.", "error");
      return;
    }
    const recognition = new SpeechRecognitionCtor();
    recognition.lang = "es-ES";
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = async (event: SpeechRecognitionEventLike) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const t = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setTranscript(prev => prev + " " + t);
          // Moderación IA
          const result = checkModeration(t);
          if (result.isBlocked) {
            showToast(
              `Moderación IA: infracción detectada (${result.reason})`,
              "error"
            );
            // Reporte automático al admin
            await fetch("/api/reports", {
              method: "POST",
              headers: { "Content-Type": "application/json", ...getAuthHeaders() },
              body: JSON.stringify({
                usuario: `ID ${userId}`,
                motivo: `Infracción por voz: ${result.reason} en videollamada con usuario ${contact?.nombre || contactId}`,
                fecha: new Date().toISOString(),
                estado: "Pendiente"
              })
            });
          }
        } else {
          interim += t;
        }
      }
      if (interim) setTranscript(prev => prev + " " + interim);
    };
    recognition.onerror = (e: SpeechRecognitionErrorEventLike) => {
      showToast("Error en reconocimiento de voz: " + String(e.error || "desconocido"), "error");
    };
    recognition.onend = () => {
      if (moderationActive) recognition.start(); // Reiniciar si se detuvo inesperadamente
    };
    recognition.start();
    recognitionRef.current = recognition;
    return () => {
      recognition.stop();
      recognitionRef.current = null;
    };
  }, [contact, contactId, showToast]);

  useEffect(() => {
    if (videoCallInvite) {
      // Mostrar modal de invitación a videollamada o lógica personalizada
      alert(`${videoCallInvite.from} te ha invitado a una videollamada`);
    }
  }, [videoCallInvite]);

  const handleSaveNote = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const method = noteId ? "PATCH" : "POST";
    await fetch(`/api/notes`, {
      method,
      headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      body: JSON.stringify({ id: noteId ?? undefined, userId: userId, contactId, content: note })
    });
    setSaving(false);
  };

  const handleBuyTime = async () => {
    if (tokens === null || tokens < TOKEN_COST_PER_2MIN) return;

    const newBalance = tokens - TOKEN_COST_PER_2MIN;

    try {
      const [userRes, tokenLogRes] = await Promise.all([
        fetch(`/api/users/${userId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json", ...getAuthHeaders() },
          body: JSON.stringify({ tokens: newBalance })
        }),
        fetch(`/api/tokens`, {
          method: "POST",
          headers: { "Content-Type": "application/json", ...getAuthHeaders() },
          body: JSON.stringify({
            user_id: userId,
            amount: -TOKEN_COST_PER_2MIN,
            reason: "Extension de videollamada (+2 min)",
          }),
        }),
      ]);

      if (!userRes.ok || !tokenLogRes.ok) {
        throw new Error("No se pudo registrar la compra de tiempo");
      }

      setTokens(newBalance);
      setSecondsLeft(s => s + 120);
      showToast("Tiempo extra comprado correctamente.", "success");
    } catch {
      showToast("No se pudo comprar tiempo extra.", "error");
    }
  };

  const handleMute = () => setMuted(m => !m);
  // Finalizar llamada
  const handleEndCall = async () => {
    setCallActive(false);
    // Llamar al endpoint de misión
    const res = await fetch("/api/video-call/end", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      body: JSON.stringify({ userId: userId, contactId })
    });
    const data = await res.json();
    if (data.completed) {
      showToast(`¡Misión completada! +${data.reward.tokens} tokens`, "success");
      // refreshMissions(); // Opcional: podrías emitir un evento global o usar SWR/mutación si usas un sistema de datos reactivo
    }
  };

  const handleBuyProduct = async (product: Product) => {
    if (tokens === null || tokens < product.price) {
      setPurchaseMsg("No tienes suficientes tokens.");
      return;
    }

    const amount = Number(product.price || 0);
    const newBalance = tokens - amount;

    try {
      const [userRes, purchaseRes, tokenLogRes] = await Promise.all([
        fetch(`/api/users/${userId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json", ...getAuthHeaders() },
          body: JSON.stringify({ tokens: newBalance })
        }),
        fetch(`/api/purchases`, {
          method: "POST",
          headers: { "Content-Type": "application/json", ...getAuthHeaders() },
          body: JSON.stringify({
            user_id: userId,
            product_name: product.name,
            price: amount,
            quantity: 1,
            total: amount,
            status: "completed",
          }),
        }),
        fetch(`/api/tokens`, {
          method: "POST",
          headers: { "Content-Type": "application/json", ...getAuthHeaders() },
          body: JSON.stringify({
            user_id: userId,
            amount: -amount,
            reason: `Compra en videollamada: ${product.name}`,
          }),
        }),
      ]);

      if (!userRes.ok || !purchaseRes.ok || !tokenLogRes.ok) {
        throw new Error("No se pudo registrar la compra");
      }

      setTokens(newBalance);
      setPurchaseMsg("¡Compra exitosa!");
      showToast("Compra registrada correctamente.", "success");
    } catch {
      setPurchaseMsg("No se pudo completar la compra.");
      showToast("Error al registrar la compra.", "error");
    }

    setTimeout(() => setPurchaseMsg("") , 2000);
  };

  // Refrescar misiones en dashboard (si está abierto en otra pestaña, el usuario debe recargar)
  const refreshMissions = async () => {
    // Opcional: podrías emitir un evento global o usar SWR/mutación si usas un sistema de datos reactivo
  };

  // Abrir juego en videollamada
  const handleOpenGame = async (game: Game) => {
    const params = new URLSearchParams();
    if (contactId) params.set("contactId", contactId);
    params.set("gameId", String(game.id));
    params.set("gameName", game.name || "Juego");
    router.replace(`/user/video-call?${params.toString()}`);
    setShowPanel("none");

    // Llamar al endpoint de misión
    const res = await fetch("/api/video-call/play-game", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      body: JSON.stringify({ userId: userId, contactId })
    });
    const data = await res.json();
    if (data.completed) {
      showToast(`¡Misión completada! +${data.reward.tokens} tokens`, "success");
      refreshMissions();
    }
  };

  // Formato de temporizador
  const min = Math.floor(secondsLeft / 60).toString().padStart(2, "0");
  const sec = (secondsLeft % 60).toString().padStart(2, "0");
  const timerRed = secondsLeft <= 60 && callActive;
  const timerClass = timerRed ? "animate-pulse text-error-600" : "text-accent-700";
  const activeGame = games.find((g) => String(g.id) === String(gameId ?? ""));
  const activeCategory = activeGame ? (activeGame.category === "test" ? "test" : "game") : null;
  const isActiveTest = activeCategory === "test";
  const ActiveCategoryIcon = isActiveTest ? Brain : Swords;
  const activeCategoryLabel = isActiveTest ? "Test" : "Juego";
  const cardAccentClass = activeCategory
    ? isActiveTest
      ? "border-cyan-300/70"
      : "border-violet-300/70"
    : "";
  const activeBadgeClass = isActiveTest
    ? "border-cyan-300 bg-cyan-50 text-cyan-800"
    : "border-violet-300 bg-violet-50 text-violet-800";

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold mb-4">Videollamada</h1>
      <div className={`w-full max-w-2xl bg-white rounded shadow p-6 flex flex-col items-center relative border ${cardAccentClass}`}>
        {(activeGame || gameName) && (
          <div className="mb-4 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 flex flex-wrap items-center justify-between gap-2">
            <div className="text-sm text-zinc-700">
              Sesion activa: <span className="font-semibold text-zinc-900">{activeGame?.name || gameName}</span>
            </div>
            {activeCategory && (
              <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-widest ${activeBadgeClass}`}>
                <ActiveCategoryIcon className="w-3 h-3" />
                {activeCategoryLabel}
              </span>
            )}
          </div>
        )}
        {/* Panel lateral */}
        {showPanel !== "none" && (
          <aside className="absolute right-0 top-0 h-full w-80 bg-accent-400 border-l shadow-lg z-10 p-4 flex flex-col gap-4">
            <button className="self-end text-accent-600" onClick={() => setShowPanel("none")}>✕</button>
            {showPanel === "games" && (
              <>
                <h2 className="font-semibold mb-2">Juegos y tests</h2>
                <ul className="flex flex-col gap-2">
                  {games.map(g => (
                    <li key={g.id} className="bg-white rounded shadow p-2 flex flex-col">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold">{g.name}</span>
                        <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${g.category === "test" ? "border-cyan-300 text-cyan-700 bg-cyan-50" : "border-violet-300 text-violet-700 bg-violet-50"}`}>
                          {g.category === "test" ? <Brain className="w-3 h-3" /> : <Swords className="w-3 h-3" />}
                          {g.category === "test" ? "Test" : "Juego"}
                        </span>
                      </div>
                      <span className="text-xs text-accent-600">{g.description}</span>
                      <button onClick={() => handleOpenGame(g)} className="text-blue-600 underline text-xs mt-1">Abrir</button>
                    </li>
                  ))}
                </ul>
                <button className="mt-4 bg-green-600 text-white px-3 py-1 rounded text-xs font-semibold" onClick={() => setShowStore(true)}>
                  Comprar más juegos/tests
                </button>
              </>
            )}
            {showPanel === "notes" && (
              <>
                <h2 className="font-semibold mb-2">Nota para {contact?.nombre || "usuario"}</h2>
                {agendaNote && (
                  <div className="bg-blue-50 border border-blue-200 rounded p-2 mb-2 text-xs text-blue-900">
                    <b>Nota privada de la cita:</b><br/>{agendaNote}
                  </div>
                )}
                <form onSubmit={handleSaveNote} className="flex flex-col gap-2">
                  <textarea
                    className="border rounded px-2 py-1 w-full"
                    value={note}
                    onChange={e => setNote(e.target.value)}
                    placeholder="Escribe aquí tus notas para esta persona..."
                    rows={4}
                  />
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-semibold self-end" disabled={saving}>{saving ? "Guardando..." : "Guardar nota"}</button>
                </form>
              </>
            )}
          </aside>
        )}
        {/* Modal de tienda de juegos/tests */}
        {showStore && (
          <div className="fixed inset-0 bg-black/30 z-20 flex items-center justify-center">
            <div className="bg-white rounded shadow-lg p-6 w-80 relative">
              <button className="absolute top-2 right-2 text-accent-600" onClick={() => setShowStore(false)}>✕</button>
              <h2 className="font-semibold mb-4">Tienda de juegos/tests</h2>
              {purchaseMsg && <div className={`mb-2 text-center ${purchaseMsg.includes('exitosa') ? 'text-green-600' : 'text-red-600'}`}>{purchaseMsg}</div>}
              <ul className="flex flex-col gap-3">
                {products.map(p => (
                  <li key={p.id} className="flex flex-col bg-accent-400 rounded p-2">
                    <span className="font-semibold">{p.name}</span>
                    <span className="text-xs text-accent-600">{p.description}</span>
                    <span className="text-xs text-primary-600">{p.price} tokens</span>
                    <button
                      className="mt-1 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold"
                      onClick={() => handleBuyProduct(p)}
                    >Comprar</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {/* Video preview */}
        <div className="relative w-full flex justify-center items-center mb-4">
          {/* Video del otro usuario con blur */}
          <div className="w-64 h-64 bg-accent-400 rounded-xl flex items-center justify-center overflow-hidden relative">
            <div className="absolute inset-0 bg-black/10 z-10" />
            <div className="w-full h-full flex items-center justify-center text-2xl text-accent-600 font-bold blur-xl select-none">{contact?.nombre?.charAt(0) || "U"}</div>
            <div className="absolute bottom-2 right-2 bg-white/80 text-xs px-2 py-1 rounded">{contact?.nombre || "Usuario"}</div>
          </div>
          {/* Miniatura propia sin blur */}
          <div className="absolute bottom-2 left-2 w-20 h-20 bg-accent-400 rounded-full flex items-center justify-center border-2 border-primary-400 text-lg font-bold z-20">
            Tú
          </div>
        </div>
        {/* Temporizador y tokens */}
        {(() => {
          let buyTimeTitle = "Comprar +2 minutos";
          if (tokens === null) buyTimeTitle = "Cargando tokens...";
          else if (tokens < TOKEN_COST_PER_2MIN) buyTimeTitle = "No tienes suficientes tokens";
          return (
            <div className="flex items-center gap-4 mb-4">
              <span className={`text-xl font-mono font-bold ${timerClass}`}>{min}:{sec}</span>
              <span className="text-sm text-accent-600">Tokens: <span className="font-bold text-primary-600">{tokens ?? <span className="italic text-gray-400">Cargando...</span>}</span></span>
              <button
                className="bg-green-600 text-white px-3 py-1 rounded text-xs font-semibold"
                onClick={handleBuyTime}
                disabled={tokens === null || tokens < TOKEN_COST_PER_2MIN || !callActive}
                title={buyTimeTitle}
              >
                +2 min ({TOKEN_COST_PER_2MIN} tokens)
              </button>
            </div>
          );
        })()}
        {/* Controles de llamada */}
        <div className="flex gap-2 mb-4">
          <Button variant={muted ? "secondary" : "primary"} onClick={handleMute}>{muted ? "Activar micrófono" : "Silenciar"}</Button>
          <Button variant="secondary" onClick={() => setShowPanel("games")}>Juegos/Tests</Button>
          <Button variant="secondary" onClick={() => setShowPanel("notes")}>Notas</Button>
          <Button variant="secondary" onClick={() => setShowReport(true)}>Reportar usuario</Button>
          <Button variant="primary" onClick={handleEndCall}>Finalizar</Button>
        </div>
        <div className="w-full max-w-xl bg-blue-50 border border-blue-200 rounded p-2 mb-2 text-xs text-blue-900">
          <b>Moderación IA activa.</b> Todo lo que digas se transcribirá y moderará automáticamente.<br/>
          <span className="block mt-1 text-accent-700">
            Transcripción: {transcript ? String(transcript) : <i>Esperando voz...</i>}
          </span>
        </div>
        {!callActive && <div className="text-red-600 font-bold text-lg mb-2">Llamada finalizada</div>}
        <p className="text-xs text-accent-600 mb-2">La videollamada se finalizará automáticamente si no hay interacción durante 8 minutos.</p>
      </div>
      {showReport && <ReportForm />}
    </main>
  );
}

export default function VideoCallPage({ userId }: Readonly<VideoCallPageProps>) {
  return (
    <Suspense fallback={<div>Cargando videollamada...</div>}>
      <VideoCallContent userId={userId} />
    </Suspense>
  );
}