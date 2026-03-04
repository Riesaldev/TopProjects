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
  LineElement,
  ChartOptions
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

ChartJS.defaults.color = '#94a3b8'; // text-slate-400
ChartJS.defaults.font.family = "'Inter', sans-serif";

export default function ChartsUser({ tokensHistory, gamesHistory, activityHistory }: {
  tokensHistory: { week: string; spent: number }[];
  gamesHistory: { week: string; played: number }[];
  activityHistory: { week: string; citas: number; chats: number; compras: number }[];
}) {
  const commonOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        border: { dash: [4, 4] }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: '#e2e8f0', // text-slate-200
          font: {
            weight: 600
          }
        }
      }
    }
  };

  // Tokens gastados por semana
  const tokensBar = {
    labels: tokensHistory.map(t => t.week),
    datasets: [
      {
        label: "Tokens Spent",
        data: tokensHistory.map(t => t.spent),
        backgroundColor: "rgba(168, 85, 247, 0.8)", // primary-500
        borderRadius: 4,
        hoverBackgroundColor: "rgba(168, 85, 247, 1)",
      }
    ]
  };
  // Juegos jugados por semana
  const gamesLine = {
    labels: gamesHistory.map(g => g.week),
    datasets: [
      {
        label: "Games Played",
        data: gamesHistory.map(g => g.played),
        borderColor: "rgba(236, 72, 153, 1)", // accent-500
        backgroundColor: "rgba(236, 72, 153, 0.2)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "rgba(236, 72, 153, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(236, 72, 153, 1)"
      }
    ]
  };
  // Actividad semanal
  const activityBar = {
    labels: activityHistory.map(a => a.week),
    datasets: [
      {
        label: "Dates",
        data: activityHistory.map(a => a.citas),
        backgroundColor: "rgba(59, 130, 246, 0.8)", // blue-500
        borderRadius: 4,
      },
      {
        label: "Chats",
        data: activityHistory.map(a => a.chats),
        backgroundColor: "rgba(168, 85, 247, 0.8)", // primary-500
        borderRadius: 4,
      },
      {
        label: "Purchases",
        data: activityHistory.map(a => a.compras),
        backgroundColor: "rgba(234, 179, 8, 0.8)", // yellow-500
        borderRadius: 4,
      }
    ]
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 relative z-10">
      <div className="bg-zinc-900/40 rounded-2xl shadow-inner border border-zinc-800/50 p-6 backdrop-blur-sm">
        <h3 className="font-bold text-white mb-4 tracking-tight">Tokens Spent</h3>
        <Bar data={tokensBar} options={{ ...commonOptions, plugins: { ...commonOptions.plugins, legend: { display: false } } }} />
      </div>
      <div className="bg-zinc-900/40 rounded-2xl shadow-inner border border-zinc-800/50 p-6 backdrop-blur-sm">
        <h3 className="font-bold text-white mb-4 tracking-tight">Games Played</h3>
        <Line data={gamesLine} options={commonOptions} />
      </div>
      <div className="bg-zinc-900/40 rounded-2xl shadow-inner border border-zinc-800/50 p-6 md:col-span-2 backdrop-blur-sm">
        <h3 className="font-bold text-white mb-4 tracking-tight">Weekly Activity</h3>
        <Bar data={activityBar} options={commonOptions} />
      </div>
    </div>
  );
} 