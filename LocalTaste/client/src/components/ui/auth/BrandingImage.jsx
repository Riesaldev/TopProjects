


export default function BrandingImage () {
  return (
    <>
      {/* Left Side: Image/Branding (Hidden on mobile, visible on lg screens) */}
      <div className="hidden lg:flex lg:w-5/12 xl:w-1/2 relative overflow-hidden p-6 items-center justify-center">
        <div className="absolute inset-0 m-4 rounded-3xl overflow-hidden shadow-2xl shadow-green-600">
          <div className="w-full h-full bg-cover bg-center bg-[url('/hero-reg.png')] relative">
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent flex flex-col justify-end p-14 text-white">
              <h1 className="text-5xl font-black leading-tight mb-8">Del campo a tu mesa, sin intermediarios.</h1>
              <div className="max-w-xl">
                <p className="text-lg mt-2 opacity-90 tracking-wider leading-relaxed pl-4">Únete a la comunidad que valora el sabor real y apoya a los productores locales.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}