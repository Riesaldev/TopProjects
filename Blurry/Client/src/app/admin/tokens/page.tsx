"use client";

import React from "react";
import ViewState from "@/components/ViewState";

interface TokenRow {
  id: number;
  userId: number;
  userName: string;
  reason: string;
  amount: number;
  createdAt: string;
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

export default function AdminTokensPage() {
  const [rows, setRows] = React.useState<TokenRow[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const token = typeof window !== "undefined" ? localStorage.getItem("jwt-token") : null;
        const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};

        const [tokensRes, usersRes] = await Promise.all([
          fetch("/api/tokens", { headers }),
          fetch("/api/users"),
        ]);

        const tokensRaw = await tokensRes.json().catch(() => []);
        const usersRaw = await usersRes.json().catch(() => []);

        const users = Array.isArray(usersRaw) ? usersRaw.map(asRecord) : [];
        const userNameMap = new Map(
          users.map((u) => [String(u.id ?? ""), String(u.nombre ?? u.name ?? `Usuario ${u.id ?? ""}`)]),
        );

        const normalized: TokenRow[] = (Array.isArray(tokensRaw) ? tokensRaw : []).map((tokenRow) => {
          const t = asRecord(tokenRow);
          const mappedUserId = Number(t.user_id ?? 0);

          return {
            id: Number(t.id ?? 0),
            userId: mappedUserId,
            userName: userNameMap.get(String(mappedUserId)) || `Usuario ${mappedUserId || "N/A"}`,
            reason: String(t.reason ?? "Movimiento"),
            amount: Number(t.amount ?? 0),
            createdAt: t.created_at ? new Date(String(t.created_at)).toLocaleDateString() : "-",
          };
        });

        setRows(normalized);
        setError(null);
      } catch (err) {
        console.error("Error cargando tokens:", err);
        setRows([]);
        setError("No se pudo cargar la gestión de tokens.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Tokens</h1>
      {loading ? (
        <ViewState variant="loading" title="Cargando transacciones" description="Sincronizando movimientos de tokens." className="mb-4 w-full max-w-md" />
      ) : null}
      {error ? <ViewState variant="error" title="Error en tokens" description={error} className="mb-4 w-full max-w-md" /> : null}

      <table className="min-w-[350px] border rounded shadow bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Usuario</th>
            <th className="p-2">Motivo</th>
            <th className="p-2">Cantidad</th>
            <th className="p-2">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((t) => (
            <tr key={t.id} className="text-center border-t">
              <td className="p-2">{t.userName}</td>
              <td className="p-2">{t.reason}</td>
              <td className={`p-2 font-semibold ${t.amount >= 0 ? "text-emerald-600" : "text-rose-600"}`}>{t.amount}</td>
              <td className="p-2">{t.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {!loading && rows.length === 0 && !error ? (
        <ViewState variant="empty" title="Sin transacciones registradas" description="Cuando existan movimientos se mostraran aqui." className="mt-4 w-full max-w-md" />
      ) : null}
    </main>
  );
} 