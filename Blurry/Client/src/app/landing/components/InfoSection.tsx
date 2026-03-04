import React from "react";

export default function InfoSection() {
  const features = [
    { title: "Matching por IA", desc: "Algoritmo inteligente basado en intereses y aficiones, no solo en fotos.", icon: "🧠" },
    { title: "Chat y Videollamada", desc: "Videollamadas P2P seguras y rápidas con notas y juegos integrados.", icon: "📹" },
    { title: "Comunidad Segura", desc: "Moderación automática que garantiza respeto y bloquea perfiles tóxicos.", icon: "🛡️" }
  ];

  return (
    <section className="my-12 w-full max-w-5xl mx-auto text-center px-4">
      <h2 className="text-4xl font-extrabold mb-6 text-gray-800 tracking-tight">Citas más allá del físico</h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-16 leading-relaxed">
        Blurry es una app para conectar personas de forma segura, divertida y anónima. 
        Descubre perfiles basándote en la compatibilidad de personalidad, chatea, juega y vive nuevas experiencias.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center transform hover:-translate-y-2 transition-transform duration-300 hover:shadow-xl">
            <div className="text-6xl mb-6 bg-indigo-50 w-24 h-24 flex items-center justify-center rounded-full shadow-inner">{feature.icon}</div>
            <h3 className="text-2xl font-bold mb-4 text-indigo-900">{feature.title}</h3>
            <p className="text-gray-600 leading-relaxed text-center">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
} 