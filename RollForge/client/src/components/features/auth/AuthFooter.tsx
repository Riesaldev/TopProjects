

export default function AuthFooter() {
  return (
    <section className="w-full max-w-180 mx-auto my-8 flex items-center justify-center gap-6 text-sm text-text-secondary/60 ">
      <a href="#"
        className="hover:text-text-secondary transition-colors active:scale-95"
      >Help Center</a>
      <a href="#"
        className="hover:text-text-secondary transition-colors active:scale-95"
      >Privacy Policy</a>
      <a href="#"
        className="hover:text-text-secondary transition-colors active:scale-95"
      >Terms of Service</a>
    </section>
  );
}