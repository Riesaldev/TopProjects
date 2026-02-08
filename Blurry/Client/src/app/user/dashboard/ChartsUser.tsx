"use client";

import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

export default function ChartsUser({ tokensHistory, gamesHistory, activityHistory }: {
  tokensHistory: { week: string; spent: number }[];
  gamesHistory: { week: string; played: number }[];
  activityHistory: { week: string; citas: number; chats: number; compras: number }[];
}) {
  // Tokens gastados por semana
  const tokensBar = {
    labels: tokensHistory.map(t => t.week),
    datasets: [
      {
        label: "Tokens gastados",
        data: tokensHistory.map(t => t.spent),
        backgroundColor: "#2563eb"
      }
    ]
  };
  // Juegos jugados por semana
  const gamesLine = {
    labels: gamesHistory.map(g => g.week),
    datasets: [
      {
        label: "Juegos jugados",
        data: gamesHistory.map(g => g.played),
        borderColor: "#f59e42",
        backgroundColor: "#f59e42",
        fill: false
      }
    ]
  };
  // Actividad semanal
  const activityBar = {
    labels: activityHistory.map(a => a.week),
    datasets: [
      {
        label: "Citas",
        data: activityHistory.map(a => a.citas),
        backgroundColor: "#22d3ee"
      },
      {
        label: "Chats",
        data: activityHistory.map(a => a.chats),
        backgroundColor: "#6366f1"
      },
      {
        label: "Compras",
        data: activityHistory.map(a => a.compras),
        backgroundColor: "#f59e42"
      }
    ]
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div className="bg-white rounded shadow p-4">
        <h3 className="font-semibold mb-2">Tokens gastados por semana</h3>
        <Bar data={tokensBar} options={{ responsive: true, plugins: { legend: { display: false } } }} />
      </div>
      <div className="bg-white rounded shadow p-4">
        <h3 className="font-semibold mb-2">Juegos jugados por semana</h3>
        <Line data={gamesLine} />
      </div>
      <div className="bg-white rounded shadow p-4 md:col-span-2">
        <h3 className="font-semibold mb-2">Actividad semanal</h3>
        <Bar data={activityBar} />
      </div>
    </div>
  );
} 