import fs from 'fs';

const file = 'c:/Users/Ricardoea/OneDrive/Escritorio/TopProjects/Blurry/Client/src/app/user/video-call/page.tsx';
let txt = fs.readFileSync(file, 'utf8');

// Marcadores únicos del bloque a eliminar
const startMarker = `<main className="min-h-screen flex flex-col items-center justify-center py-12 px-4 bg-zinc-950 text-slate-200 relative z-10 w-full">`;
const endMarker = `</main>`;

const start = txt.indexOf(startMarker);
if (start === -1) {
  throw new Error('No se encontró el inicio del bloque <main> a eliminar.');
}

const end = txt.indexOf(endMarker, start);
if (end === -1) {
  throw new Error('No se encontró el cierre </main> del bloque a eliminar.');
}

// Elimina desde <main ...> hasta </main>
txt = txt.slice(0, start) + txt.slice(end + endMarker.length);

fs.writeFileSync(file, txt, 'utf8');
console.log('Bloque eliminado correctamente.');
