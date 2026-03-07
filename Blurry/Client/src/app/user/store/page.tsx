"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Gamepad2, ShieldCheck, ShoppingCart, Sparkles, WalletCards } from "lucide-react";
import { useNotifications } from "@/components/NotificationsContext";
import ViewState from "@/components/ViewState";

type GameApiItem = {
  id?: number;
  name?: string;
  description?: string;
  category?: string;
  price?: number;
};

type ServiceApiItem = {
  id?: number;
  nombre?: string;
  estado?: string;
  price?: number;
};

type StoreItem = {
  id: string;
  label: string;
  description: string;
  category: "tokens" | "games" | "services";
  tokenPrice: number;
  tokenAmount?: number;
  badge?: string;
};

type CartLine = {
  item: StoreItem;
  quantity: number;
};

type JwtPayload = {
  sub?: number;
};

function toNumber(value: unknown, fallback = 0): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function parseUserIdFromToken(token: string | null): number | null {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1])) as JwtPayload;
    return typeof payload.sub === "number" ? payload.sub : null;
  } catch {
    return null;
  }
}

const TOKEN_PACKS = [10, 20, 30, 50] as const;

function toTokenPackItems(): StoreItem[] {
  return TOKEN_PACKS.map((amount) => ({
    id: `token-pack-${amount}`,
    label: `Pack ${amount} TKN`,
    description: `Recarga inmediata de ${amount} tokens en tu cartera.`,
    category: "tokens" as const,
    tokenPrice: 0,
    tokenAmount: amount,
    badge: "Recarga",
  }));
}

function toGameItems(games: GameApiItem[]): StoreItem[] {
  return games.map((g) => {
    const category = String(g.category ?? "game").toLowerCase();
    const isTest = category.includes("test");
    const tokenPrice = Math.max(1, Math.round(toNumber(g.price, 0)));

    return {
      id: `game-${String(g.id ?? "x")}`,
      label: String(g.name ?? (isTest ? "Test premium" : "Juego premium")),
      description: String(g.description ?? "Contenido premium desbloqueable."),
      category: "games" as const,
      tokenPrice,
      badge: isTest ? "Test" : "Juego",
    };
  });
}

function toServiceItems(services: ServiceApiItem[]): StoreItem[] {
  return services.map((s) => {
    const tokenPrice = Math.max(1, Math.round(toNumber(s.price, 0)));
    return {
      id: `service-${String(s.id ?? "x")}`,
      label: String(s.nombre ?? "Servicio premium"),
      description: `Estado actual: ${String(s.estado ?? "Activo")}. Se activa tras la compra.`,
      category: "services" as const,
      tokenPrice,
      badge: "Servicio",
    };
  });
}

export default function UserStorePage() {
  const { showOperationFeedback } = useNotifications();

  const [walletTokens, setWalletTokens] = useState<number>(0);
  const [tokenItems] = useState<StoreItem[]>(toTokenPackItems());
  const [gameItems, setGameItems] = useState<StoreItem[]>([]);
  const [serviceItems, setServiceItems] = useState<StoreItem[]>([]);
  const [cart, setCart] = useState<CartLine[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadStore = async () => {
      const token = typeof window !== "undefined" ? localStorage.getItem("jwt-token") : null;
      const userId = parseUserIdFromToken(token);

      if (!userId) {
        setError("No se pudo identificar al usuario autenticado.");
        setLoading(false);
        return;
      }

      const authHeaders: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};

      try {
        setLoading(true);
        const [userRes, gamesRes, servicesRes] = await Promise.all([
          fetch(`/api/users/${userId}`, { headers: authHeaders }),
          fetch("/api/games", { headers: authHeaders }),
          fetch("/api/services", { headers: authHeaders }),
        ]);

        const userData = userRes.ok ? await userRes.json() : null;
        const gamesData = gamesRes.ok ? await gamesRes.json() : [];
        const servicesData = servicesRes.ok ? await servicesRes.json() : [];

        if (cancelled) return;

        setWalletTokens(Math.max(0, Math.round(toNumber((userData as { tokens?: number } | null)?.tokens, 0))));
        setGameItems(toGameItems(Array.isArray(gamesData) ? gamesData : []));
        setServiceItems(toServiceItems(Array.isArray(servicesData) ? servicesData : []));
        setError(null);
      } catch {
        if (!cancelled) {
          setGameItems([]);
          setServiceItems([]);
          setError("No se pudo cargar la tienda. Intenta nuevamente en unos minutos.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadStore();

    return () => {
      cancelled = true;
    };
  }, []);

  const sections = useMemo(
    () => [
      {
        id: "games-tests",
        title: "Juegos y Tests",
        subtitle: "Packs premium de juego y test.",
        icon: Gamepad2,
        items: gameItems,
      },
      {
        id: "tokens",
        title: "Tokens",
        subtitle: "Recargas fijas de 10, 20, 30 y 50 TKN.",
        icon: WalletCards,
        items: tokenItems,
      },
      {
        id: "services",
        title: "Servicios",
        subtitle: "Servicios que se compran usando TKN.",
        icon: ShieldCheck,
        items: serviceItems,
      },
    ],
    [gameItems, serviceItems, tokenItems],
  );

  const topUpTokens = useMemo(
    () => cart.filter((line) => line.item.category === "tokens").reduce((acc, line) => acc + (line.item.tokenAmount ?? 0) * line.quantity, 0),
    [cart],
  );

  const spendTokens = useMemo(
    () => cart.filter((line) => line.item.category !== "tokens").reduce((acc, line) => acc + line.item.tokenPrice * line.quantity, 0),
    [cart],
  );

  const projectedBalance = walletTokens + topUpTokens - spendTokens;

  const addToCart = (item: StoreItem) => {
    setCart((prev) => {
      const idx = prev.findIndex((line) => line.item.id === item.id);
      if (idx === -1) return [...prev, { item, quantity: 1 }];
      const next = [...prev];
      next[idx] = { ...next[idx], quantity: next[idx].quantity + 1 };
      return next;
    });
  };

  const decreaseCartItem = (itemId: string) => {
    setCart((prev) => {
      const line = prev.find((x) => x.item.id === itemId);
      if (!line) return prev;
      if (line.quantity <= 1) return prev.filter((x) => x.item.id !== itemId);
      return prev.map((x) => (x.item.id === itemId ? { ...x, quantity: x.quantity - 1 } : x));
    });
  };

  const clearCart = () => setCart([]);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      showOperationFeedback("Carrito", "partial", "Tu carrito esta vacio.");
      return;
    }

    if (projectedBalance < 0) {
      showOperationFeedback("Carrito", "error", "Saldo insuficiente para completar checkout.");
      return;
    }

    const token = typeof window !== "undefined" ? localStorage.getItem("jwt-token") : null;
    const userId = parseUserIdFromToken(token);

    if (!userId) {
      showOperationFeedback("Checkout", "error", "No se pudo identificar al usuario autenticado.");
      return;
    }

    const authHeaders = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    setCheckoutLoading(true);
    try {
      const requests: Array<Promise<Response>> = [];

      requests.push(
        fetch(`/api/users/${userId}`, {
          method: "PATCH",
          headers: authHeaders,
          body: JSON.stringify({ tokens: projectedBalance }),
        }),
      );

      if (topUpTokens > 0) {
        requests.push(
          fetch("/api/tokens", {
            method: "POST",
            headers: authHeaders,
            body: JSON.stringify({
              user_id: userId,
              amount: topUpTokens,
              reason: "Recarga desde carrito store",
            }),
          }),
        );
      }

      if (spendTokens > 0) {
        requests.push(
          fetch("/api/tokens", {
            method: "POST",
            headers: authHeaders,
            body: JSON.stringify({
              user_id: userId,
              amount: -spendTokens,
              reason: "Compra desde carrito store",
            }),
          }),
        );
      }

      for (const line of cart) {
        if (line.item.category === "tokens") continue;
        requests.push(
          fetch("/api/purchases", {
            method: "POST",
            headers: authHeaders,
            body: JSON.stringify({
              user_id: userId,
              product_name: `${line.item.category.toUpperCase()}: ${line.item.label}`,
              price: Number(line.item.tokenPrice),
              quantity: line.quantity,
              total: Number(line.item.tokenPrice * line.quantity),
              status: "completed",
            }),
          }),
        );
      }

      const results = await Promise.all(requests);
      if (results.some((res) => !res.ok)) {
        throw new Error("Checkout request failed");
      }

      setWalletTokens(projectedBalance);
      clearCart();
      showOperationFeedback("Checkout", "success", "Compra procesada y cartera actualizada.");
    } catch {
      showOperationFeedback("Checkout", "error", "No se pudo procesar el carrito.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 text-slate-200">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <section className="rounded-3xl border border-zinc-800/70 bg-zinc-900/40 p-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary-500/40 bg-primary-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-300">
            <Sparkles className="h-3.5 w-3.5" />
            User Store
          </div>
          <h1 className="text-3xl font-black uppercase tracking-wide text-zinc-100 sm:text-4xl">Tienda del Usuario</h1>
          <p className="mt-3 max-w-3xl text-sm text-zinc-400 sm:text-base">
            Moneda de la plataforma: TKN. Compra juegos/tests y servicios con tokens, y recarga packs para aumentar saldo.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2">
              <WalletCards className="h-4 w-4 text-emerald-300" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">Cartera</span>
              <span className="text-lg font-black text-white">{walletTokens} TKN</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/80 px-4 py-2 text-xs font-semibold text-zinc-300">
              Carrito: {cart.length} items
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-zinc-300">Carrito</p>
              <p className="text-xs text-zinc-500">Base preparada para futura pasarela de pagos.</p>
            </div>
            <div className="text-right text-sm">
              <p className="text-zinc-400">Recarga: +{topUpTokens} TKN</p>
              <p className="text-zinc-400">Gasto: -{spendTokens} TKN</p>
              <p className="text-base font-black text-white">Saldo proyectado: {projectedBalance} TKN</p>
            </div>
          </div>

          {cart.length === 0 ? (
            <p className="mt-4 text-sm text-zinc-500">Aun no anadiste productos al carrito.</p>
          ) : (
            <div className="mt-4 space-y-2">
              {cart.map((line) => (
                <div key={line.item.id} className="flex items-center justify-between rounded-xl border border-zinc-800/70 bg-zinc-950/70 p-3">
                  <div>
                    <p className="font-semibold text-zinc-200">{line.item.label}</p>
                    <p className="text-xs text-zinc-500">{line.quantity}x</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary-300">
                      {line.item.category === "tokens"
                        ? `+${(line.item.tokenAmount ?? 0) * line.quantity} TKN`
                        : `${line.item.tokenPrice * line.quantity} TKN`}
                    </p>
                    <button
                      type="button"
                      onClick={() => decreaseCartItem(line.item.id)}
                      className="mt-1 text-xs font-semibold text-zinc-400 hover:text-zinc-200"
                    >
                      Quitar uno
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={clearCart}
              className="rounded-xl border border-zinc-700 px-3 py-2 text-xs font-bold uppercase tracking-wider text-zinc-300 hover:bg-zinc-800"
            >
              Limpiar carrito
            </button>
            <button
              type="button"
              onClick={handleCheckout}
              disabled={checkoutLoading || cart.length === 0}
              className="rounded-xl bg-primary-600 px-3 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-primary-500 disabled:opacity-50"
            >
              {checkoutLoading ? "Procesando" : "Checkout"}
            </button>
          </div>
        </section>

        {loading ? (
          <section className="rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-8">
            <ViewState variant="loading" title="Cargando tienda" description="Preparando catalogo y precios disponibles." />
          </section>
        ) : error ? (
          <section className="rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-8">
            <ViewState variant="error" title="No se pudo cargar la tienda" description={error} />
          </section>
        ) : (
          sections.map((section) => (
            <section key={section.id} className="space-y-4">
              <div className="flex items-center gap-3">
                <section.icon className="h-5 w-5 text-primary-400" />
                <h2 className="text-xl font-black uppercase tracking-wide text-zinc-100">{section.title}</h2>
              </div>
              <p className="text-sm text-zinc-400">{section.subtitle}</p>

              {section.items.length === 0 ? (
                <div className="rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-6 text-sm text-zinc-400">
                  No hay items disponibles en esta categoria.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {section.items.map((item, index) => (
                    <motion.article
                      key={item.id}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: index * 0.04 }}
                      className="rounded-2xl border border-zinc-800/70 bg-zinc-900/60 p-5"
                    >
                      <div className="mb-3 inline-flex rounded-full border border-zinc-700 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-300">
                        {item.badge ?? "Item"}
                      </div>
                      <h3 className="text-lg font-bold text-zinc-100">{item.label}</h3>
                      <p className="mt-2 min-h-[44px] text-sm text-zinc-400">{item.description}</p>

                      <div className="mt-5 flex items-center justify-between">
                        <span className="text-xl font-black text-primary-300">
                          {item.category === "tokens" ? `+${item.tokenAmount ?? 0} TKN` : `${item.tokenPrice} TKN`}
                        </span>
                        <button
                          type="button"
                          onClick={() => addToCart(item)}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-primary-600 px-3 py-2 text-xs font-black uppercase tracking-wider text-white hover:bg-primary-500"
                        >
                          <ShoppingCart className="h-3.5 w-3.5" />
                          Anadir
                        </button>
                      </div>

                      {item.category !== "tokens" && walletTokens < item.tokenPrice ? (
                        <p className="mt-2 text-xs font-semibold text-amber-300">Saldo insuficiente actualmente</p>
                      ) : null}
                    </motion.article>
                  ))}
                </div>
              )}
            </section>
          ))
        )}
      </div>
    </main>
  );
}
