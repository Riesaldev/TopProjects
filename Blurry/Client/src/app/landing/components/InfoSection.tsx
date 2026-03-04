import React from "react";

export default function InfoSection() {
  const features = [
    { title: "Personalidad Primero", desc: "Algoritmo inteligente basado en intereses y aficiones, no solo en fotos.", icon: "🧠" },
    { title: "Chat y Videollamada", desc: "Videollamadas P2P seguras y rápidas con notas y juegos integrados para romper el hielo.", icon: "📹" },
    { title: "Comunidad Segura", desc: "Moderación automática que garantiza respeto y bloquea perfiles tóxicos de forma inmediata.", icon: "🛡️" }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto text-center">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 tracking-tight">
        Citas más allá del <span className="text-indigo-600">físico</span>
      </h2>
      <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-16 leading-relaxed font-light">
        Blurry es la primera app que oculta el físico hasta que conectas emocionalmente. 
        Descubre perfiles basándote en la compatibilidad y vive nuevas experiencias.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {features.map((feature, index) => (
          <article 
            key={index} 
            className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group"
          >
            <div 
              className="text-6xl mb-8 bg-indigo-50 w-28 h-28 flex items-center justify-center rounded-2xl shadow-inner group-hover:bg-indigo-100 group-hover:scale-110 transition-all duration-300"
              aria-hidden="true"
            >
              {feature.icon}
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-indigo-700 transition-colors">
              {feature.title}
            </h3>
            <p className="text-gray-600 leading-relaxed text-center text-lg">
              {feature.desc}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
} 