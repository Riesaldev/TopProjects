import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from "chart.js";
import { User, Report, Sanction, Match, TokenTransaction } from "@/types";
import { useRealtime } from '@/context/RealtimeContext';
import { useEffect, useState } from 'react';

type FeedbackItem = { rating?: number };

function parseMonth(value: unknown): number | null {
  if (typeof value !== "string" || value.trim().length === 0) {
    return null;
  }

  const normalized = value.trim();

  // Fast path for ISO-like values: YYYY-MM-DD...
  const isoMatch = normalized.match(/^\d{4}-(\d{2})-/);
  if (isoMatch) {
    const month = Number(isoMatch[1]);
    return Number.isFinite(month) && month >= 1 && month <= 12 ? month : null;
  }

  const parsedDate = new Date(normalized);
  if (!Number.isNaN(parsedDate.getTime())) {
    return parsedDate.getMonth() + 1;
  }

  return null;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export default function AdminCharts({ usuarios, denuncias, sanciones, matches, tokens, feedback }: Readonly<{
  usuarios: readonly User[];
  denuncias: readonly Report[];
  sanciones: readonly Sanction[];
  matches: readonly Match[];
  tokens: readonly TokenTransaction[];
  feedback: readonly FeedbackItem[];
}>) {
  const realtimeContext = useRealtime();
  const metric = realtimeContext?.metric;
  const [usuariosOnline, setUsuariosOnline] = useState<number>(0);

  useEffect(() => {
    if (metric && metric.metric === 'usuarios_online') {
      setUsuariosOnline(typeof metric.value === "number" ? metric.value : 0);
    }
  }, [metric]);

  // Usuarios por actividad
  const actividadCount = { Alta: 0, Media: 0, Baja: 0 };
  usuarios.forEach(u => {
    if (u.actividad === "Alta" || u.actividad === "Media" || u.actividad === "Baja") {
      actividadCount[u.actividad]++;
    }
  });
  const actividadData = {
    labels: ["Alta", "Media", "Baja"],
    datasets: [
      {
        label: "Usuarios",
        data: [actividadCount.Alta, actividadCount.Media, actividadCount.Baja],
        backgroundColor: ["#2563eb", "#f59e42", "#e11d48"]
      }
    ]
  };

  // Denuncias por estado
  const pendientes = denuncias.filter(d => d.estado === "Pendiente").length;
  const resueltas = denuncias.filter(d => d.estado === "Resuelta").length;
  const denunciasPie = {
    labels: ["Pendiente", "Resuelta"],
    datasets: [
      {
        data: [pendientes, resueltas],
        backgroundColor: ["#facc15", "#22c55e"]
      }
    ]
  };

  // Evolución de denuncias por mes
  const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul"];
  const denunciasPorMes = meses.map((mes, i) =>
    denuncias.filter(d => {
      const m = parseMonth(
        (d as Report & { created_at?: string; date?: string }).fecha
        || (d as Report & { created_at?: string; date?: string }).created_at
        || (d as Report & { created_at?: string; date?: string }).date
      );
      return m === i + 1;
    }).length
  );
  const denunciasLine = {
    labels: meses,
    datasets: [
      {
        label: "Denuncias",
        data: denunciasPorMes,
        borderColor: "#f59e42",
        backgroundColor: "#f59e42",
        fill: false
      }
    ]
  };

  // Sanciones por estado
  const sancionesActivas = sanciones.filter(s => s.estado === "Activa").length;
  const sancionesExpiradas = sanciones.filter(s => s.estado === "Expirada").length;
  const sancionesPie = {
    labels: ["Activa", "Expirada"],
    datasets: [
      {
        data: [sancionesActivas, sancionesExpiradas],
        backgroundColor: ["#ef4444", "#a3a3a3"]
      }
    ]
  };

  // Matches por mes
  const matchesPorMes = meses.map((mes, i) =>
    matches.filter(m => {
      const mth = parseMonth(
        (m as Match & { match_date?: string; date?: string }).fecha
        || (m as Match & { match_date?: string; date?: string }).match_date
        || (m as Match & { match_date?: string; date?: string }).date
      );
      return mth === i + 1;
    }).length
  );
  const matchesLine = {
    labels: meses,
    datasets: [
      {
        label: "Matches",
        data: matchesPorMes,
        borderColor: "#22d3ee",
        backgroundColor: "#22d3ee",
        fill: false
      }
    ]
  };

  // Ventas de productos (tokens)
  const getProductName = (transaction: TokenTransaction): string => {
    const maybeWithProduct = transaction as TokenTransaction & { producto?: string };
    if (typeof maybeWithProduct.producto === "string" && maybeWithProduct.producto.trim().length > 0) {
      return maybeWithProduct.producto;
    }
    return transaction.transaccion || "Sin detalle";
  };

  const isPurchase = (transaction: TokenTransaction): boolean => {
    const maybeWithType = transaction as TokenTransaction & { tipo?: string };
    const typeValue = maybeWithType.tipo || transaction.transaccion;
    return String(typeValue || "").toLowerCase().includes("compra");
  };

  const purchaseTokens = tokens.filter(isPurchase);
  const productos = Array.from(new Set(purchaseTokens.map(getProductName)));
  const ventasPorProducto = productos.map((prod) =>
    purchaseTokens.filter((t) => getProductName(t) === prod).length
  );
  const ventasBar = {
    labels: productos,
    datasets: [
      {
        label: "Ventas",
        data: ventasPorProducto,
        backgroundColor: "#f59e42"
      }
    ]
  };

  // Distribucion real de ratings
  const ratingsBuckets = [1, 2, 3, 4, 5].map((bucket) =>
    feedback.filter((item) => Math.round(Number(item?.rating ?? 0)) === bucket).length
  );
  const ratingDistribution = {
    labels: ["1★", "2★", "3★", "4★", "5★"],
    datasets: [
      {
        label: "Feedback",
        data: ratingsBuckets,
        backgroundColor: "#6366f1"
      }
    ]
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#d4d4d8",
          font: { size: 11, weight: 600 as const },
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#a1a1aa", font: { size: 10 } },
        grid: { color: "rgba(113, 113, 122, 0.2)" },
      },
      y: {
        ticks: { color: "#a1a1aa", font: { size: 10 } },
        grid: { color: "rgba(113, 113, 122, 0.2)" },
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#d4d4d8",
          font: { size: 11, weight: 600 as const },
        },
      },
    },
  };

  return (
    <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="h-72 rounded-2xl border border-zinc-800/70 bg-zinc-950/70 p-4 shadow-lg shadow-black/20 backdrop-blur">
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-zinc-300">Usuarios por actividad</h3>
        <Bar data={actividadData} options={commonOptions} />
      </div>
      <div className="h-72 rounded-2xl border border-zinc-800/70 bg-zinc-950/70 p-4 shadow-lg shadow-black/20 backdrop-blur">
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-zinc-300">Distribucion de denuncias</h3>
        <Pie data={denunciasPie} options={pieOptions} />
      </div>
      <div className="h-72 rounded-2xl border border-zinc-800/70 bg-zinc-950/70 p-4 shadow-lg shadow-black/20 backdrop-blur">
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-zinc-300">Evolucion de denuncias</h3>
        <Line data={denunciasLine} options={commonOptions} />
      </div>
      <div className="h-72 rounded-2xl border border-zinc-800/70 bg-zinc-950/70 p-4 shadow-lg shadow-black/20 backdrop-blur">
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-zinc-300">Sanciones por estado</h3>
        <Pie data={sancionesPie} options={pieOptions} />
      </div>
      <div className="h-72 rounded-2xl border border-zinc-800/70 bg-zinc-950/70 p-4 shadow-lg shadow-black/20 backdrop-blur">
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-zinc-300">Matches por mes</h3>
        <Line data={matchesLine} options={commonOptions} />
      </div>
      <div className="h-72 rounded-2xl border border-zinc-800/70 bg-zinc-950/70 p-4 shadow-lg shadow-black/20 backdrop-blur">
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-zinc-300">Ventas de productos</h3>
        <Bar data={ventasBar} options={commonOptions} />
      </div>
      <div className="h-72 rounded-2xl border border-zinc-800/70 bg-zinc-950/70 p-4 shadow-lg shadow-black/20 backdrop-blur">
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-zinc-300">Distribucion de ratings</h3>
        <Bar data={ratingDistribution} options={commonOptions} />
      </div>
      <div className="h-72 rounded-2xl border border-zinc-800/70 bg-zinc-950/70 p-4 shadow-lg shadow-black/20 backdrop-blur">
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-zinc-300">Metricas en tiempo real</h3>
        <div className="flex h-[calc(100%-28px)] items-center justify-center">
          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-8 py-6 text-center">
            <p className="text-xs font-bold uppercase tracking-wide text-emerald-300">Usuarios online</p>
            <p className="mt-2 text-4xl font-black text-emerald-200">{usuariosOnline}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 