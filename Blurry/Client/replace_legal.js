import fs from 'fs';
const privacyFile = 'c:/Users/Ricardoea/OneDrive/Escritorio/TopProjects/Blurry/Client/src/app/legal/privacy/page.tsx';
const termsFile = 'c:/Users/Ricardoea/OneDrive/Escritorio/TopProjects/Blurry/Client/src/app/legal/terms/page.tsx';

if(fs.existsSync(privacyFile)) {
  let content = fs.readFileSync(privacyFile, 'utf8');
  content = content.replace(/className="container mx-auto px-4 py-8"/g, 'className="min-h-screen container mx-auto px-4 py-16 text-slate-200"');
  content = content.replace(/className="text-3xl font-bold mb-6"/g, 'className="text-4xl font-black mb-6 uppercase tracking-tight text-white"');
  content = content.replace(/className="bg-white rounded-lg shadow p-6"/g, 'className="glass-panel bg-zinc-900/40 border border-zinc-800/50 rounded-3xl p-8 backdrop-blur-md"');
  content = content.replace(/className="text-xl font-semibold mt-4 mb-2"/g, 'className="text-xl font-bold mt-8 mb-4 text-primary-400 uppercase tracking-widest text-sm"');
  content = content.replace(/<p>/g, '<p className="text-zinc-400 font-medium mb-4 leading-relaxed">');
  content = content.replace(/<li>/g, '<li className="text-zinc-400 font-medium mb-2 pl-2 border-l-2 border-primary-500/50">');
  fs.writeFileSync(privacyFile, content);
}

if(fs.existsSync(termsFile)) {
  let content = fs.readFileSync(termsFile, 'utf8');
  content = content.replace(/className="container mx-auto px-4 py-8"/g, 'className="min-h-screen container mx-auto px-4 py-16 text-slate-200"');
  content = content.replace(/className="text-3xl font-bold mb-6"/g, 'className="text-4xl font-black mb-6 uppercase tracking-tight text-white"');
  content = content.replace(/className="bg-white rounded-lg shadow p-6"/g, 'className="glass-panel bg-zinc-900/40 border border-zinc-800/50 rounded-3xl p-8 backdrop-blur-md"');
  content = content.replace(/className="text-xl font-semibold mt-4 mb-2"/g, 'className="text-xl font-bold mt-8 mb-4 text-primary-400 uppercase tracking-widest text-sm"');
  content = content.replace(/<p>/g, '<p className="text-zinc-400 font-medium mb-4 leading-relaxed">');
  content = content.replace(/<li>/g, '<li className="text-zinc-400 font-medium mb-2 pl-2 border-l-2 border-primary-500/50">');
  fs.writeFileSync(termsFile, content);
}
