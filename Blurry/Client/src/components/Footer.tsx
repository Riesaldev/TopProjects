
export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 text-center py-4 mt-8 text-gray-500 text-sm flex flex-col items-center gap-2">
      <div>&copy; {new Date().getFullYear()} Blurry. Todos los derechos reservados.</div>
      <a href="/help" className="text-primary-600 hover:underline focus:outline-primary-400" aria-label="Centro de ayuda y soporte">Centro de ayuda y soporte</a>
    </footer>
  );
} 