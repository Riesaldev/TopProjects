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

export default function AdminCharts({ usuarios, denuncias, sanciones, matches, tokens }: Readonly<{
  usuarios: readonly User[];
  denuncias: readonly Report[];
  sanciones: readonly Sanction[];
  matches: readonly Match[];
  tokens: readonly TokenTransaction[];
}>) {
  const realtimeContext = useRealtime();
  const metric = realtimeContext?.metric;
  const [usuariosOnline, setUsuariosOnline] = useState<number>(0);

  useEffect(() => {
    if (metric && metric.metric === 'usuarios_online') {
      setUsuariosOnline(metric.value);
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
      const m = Number(d.fecha.split("-")[1]);
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
      const mth = Number(m.fecha.split("-")[1]);
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
  const productos = Array.from(new Set(tokens.map(t => t.producto)));
  const ventasPorProducto = productos.map(prod =>
    tokens.filter(t => t.producto === prod && t.tipo === "Compra").length
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

  // Rating medio histórico (simulado)
  const ratingLine = {
    labels: meses,
    datasets: [
      {
        label: "Rating medio",
        data: [4.5, 4.6, 4.7, 4.6, 4.8, 4.7, 4.7],
        borderColor: "#6366f1",
        backgroundColor: "#6366f1",
        fill: false
      }
    ]
  };

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div className="bg-white rounded shadow p-4">
        <h3 className="font-semibold mb-2">Usuarios por actividad</h3>
        <Bar data={actividadData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
      </div>
      <div className="bg-white rounded shadow p-4">
        <h3 className="font-semibold mb-2">Distribución de denuncias</h3>
        <Pie data={denunciasPie} />
      </div>
      <div className="bg-white rounded shadow p-4">
        <h3 className="font-semibold mb-2">Evolución de denuncias</h3>
        <Line data={denunciasLine} />
      </div>
      <div className="bg-white rounded shadow p-4">
        <h3 className="font-semibold mb-2">Sanciones por estado</h3>
        <Pie data={sancionesPie} />
      </div>
      <div className="bg-white rounded shadow p-4">
        <h3 className="font-semibold mb-2">Matches por mes</h3>
        <Line data={matchesLine} />
      </div>
      <div className="bg-white rounded shadow p-4">
        <h3 className="font-semibold mb-2">Ventas de productos</h3>
        <Bar data={ventasBar} />
      </div>
      <div className="bg-white rounded shadow p-4">
        <h3 className="font-semibold mb-2">Rating medio histórico</h3>
        <Line data={ratingLine} />
      </div>
      <div className="bg-white rounded shadow p-4">
        <h3>Métricas en tiempo real</h3>
        <div className="text-[#4caf50] font-semibold">
          Usuarios online: {usuariosOnline}
        </div>
      </div>
    </div>
  );
} 