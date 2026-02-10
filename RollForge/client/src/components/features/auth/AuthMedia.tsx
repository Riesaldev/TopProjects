
export default function AuthMedia () {
  return (
    <div>
      {/* Social media login options */}
      <section className="w-full max-w-120 flex text-text-primary text-xl font-medium my-10 justify-around gap-4 overflow-x-hidden">
        <div className="flex items-center gap-2 mt-6 border border-text-secondary/20 rounded-md px-18 py-3 cursor-pointer active:scale-95 transition-transform duration-100 bg-border-dark-heavy/10">
          <img src="/Discord.svg"
            alt="Discord"
            className="h-5 w-5"
          />
          <p>Discord</p>
        </div>
        <div className="flex items-center gap-2 mt-6 border border-text-secondary/20 rounded-md px-18 py-3 cursor-pointer active:scale-95 transition-transform duration-100 bg-border-dark-heavy/10">
          <img src="/Google.svg"
            alt="Google"
            className="h-6 w-6"
          />
          <p>Google</p>
        </div>
      </section>
      {/* Divider */}
      <section className="relative flex items-center my-2 w-full max-w-120">
        <div className="flex-1 border-t border-text-secondary/20"></div>
        <span className="px-4 text-text-secondary/60 text-sm">Or continue with</span>
        <div className="flex-1 border-t border-text-secondary/20"></div>
      </section>
    </div>
  );
}