


export default function ProducersPage() {
  return (
    <>
      <main className="flex-1 max-w-360 mx-auto w-full px-4 md:px-20 py-8">
        <div className="flex flex-col gap-2 mb-8">
<h1 className="text-3xl font-bold tracking-tight text-[#0d1b13] dark:text-white">Explorar Productores</h1>
<p className="text-[#4c9a6c] dark:text-primary/70">Conecta directamente con las manos que cultivan tus alimentos.</p>
</div>
<div className="flex flex-col lg:flex-row gap-8">
{/* Sidebar / Filtros */}
<aside className="w-full lg:w-64 flex flex-col gap-6">
<div className="bg-white dark:bg-[#162a1e] p-6 rounded-xl shadow-sm border border-[#e7f3ec] dark:border-[#1a3324]">
<div className="flex items-center justify-between mb-4">
<h3 className="text-lg font-bold">Filtros</h3>
<button className="text-primary text-xs font-bold uppercase tracking-wider">Limpiar</button>
</div>
{/* Tipo de Producción */}
<div className="mb-6">
<div className="flex items-center gap-2 mb-3 text-primary">
<span className="material-symbols-outlined text-sm">energy_savings_leaf</span>
<span className="text-sm font-bold uppercase tracking-wider">Producción</span>
</div>
<div className="flex flex-col gap-1">
<label className="flex items-center gap-3 py-1 cursor-pointer group">
<input defaultChecked className="h-5 w-5 rounded border-[#cfe7d9] dark:border-[#1a3324] bg-transparent text-primary focus:ring-0 checked:bg-[image:--checkbox-tick-svg]" type="checkbox"/>
<span className="text-[#0d1b13] dark:text-white/80 text-sm group-hover:text-primary transition-colors">Ecológica</span>
</label>
<label className="flex items-center gap-3 py-1 cursor-pointer group">
<input className="h-5 w-5 rounded border-[#cfe7d9] dark:border-[#1a3324] bg-transparent text-primary focus:ring-0 checked:bg-[image:--checkbox-tick-svg]" type="checkbox"/>
<span className="text-[#0d1b13] dark:text-white/80 text-sm group-hover:text-primary transition-colors">Artesanal</span>
</label>
<label className="flex items-center gap-3 py-1 cursor-pointer group">
<input className="h-5 w-5 rounded border-[#cfe7d9] dark:border-[#1a3324] bg-transparent text-primary focus:ring-0 checked:bg-[image:--checkbox-tick-svg]" type="checkbox"/>
<span className="text-[#0d1b13] dark:text-white/80 text-sm group-hover:text-primary transition-colors">Tradicional</span>
</label>
<label className="flex items-center gap-3 py-1 cursor-pointer group">
<input className="h-5 w-5 rounded border-[#cfe7d9] dark:border-[#1a3324] bg-transparent text-primary focus:ring-0 checked:bg-[image:--checkbox-tick-svg]" type="checkbox"/>
<span className="text-[#0d1b13] dark:text-white/80 text-sm group-hover:text-primary transition-colors">Biodinámica</span>
</label>
</div>
</div>
{/* Distancia Slider */}
<div className="mb-6">
<div className="flex items-center gap-2 mb-3 text-primary">
<span className="material-symbols-outlined text-sm">location_pin</span>
<span className="text-sm font-bold uppercase tracking-wider">Cercanía</span>
</div>
<div className="relative flex w-full flex-col items-start gap-3 py-2">
<p className="text-[#0d1b13] dark:text-white/60 text-xs">Distancia máxima: <span className="text-primary font-bold">50 km</span></p>
<div className="flex h-2 w-full pt-1">
<div className="flex h-1.5 w-full rounded-full bg-[#cfe7d9] dark:bg-[#1a3324] relative">
<div className="absolute left-0 top-0 h-full w-3/4 bg-primary rounded-full"></div>
<div className="absolute left-[75%] -top-1.5 size-4 rounded-full bg-primary shadow-md border-2 border-white dark:border-background-dark cursor-pointer"></div>
</div>
</div>
<div className="flex justify-between w-full text-[10px] text-[#4c9a6c]">
<span>0 km</span>
<span>100 km</span>
</div>
</div>
</div>
{/* Valoración Radio */}
<div className="mb-2">
<div className="flex items-center gap-2 mb-3 text-primary">
<span className="material-symbols-outlined text-sm">star</span>
<span className="text-sm font-bold uppercase tracking-wider">Valoración</span>
</div>
<div className="flex flex-col gap-2">
<label className="flex items-center gap-3 p-2 rounded-lg border border-[#cfe7d9] dark:border-[#1a3324] hover:bg-[#e7f3ec] dark:hover:bg-[#1a3324] cursor-pointer transition-colors">
<input defaultChecked className="h-4 w-4 border-2 border-[#cfe7d9] bg-transparent text-primary focus:ring-0 checked:bg-[image:--radio-dot-svg]" name="rating" type="radio"/>
<span className="text-[#0d1b13] dark:text-white/90 text-sm font-medium">4+ Estrellas</span>
</label>
<label className="flex items-center gap-3 p-2 rounded-lg border border-[#cfe7d9] dark:border-[#1a3324] hover:bg-[#e7f3ec] dark:hover:bg-[#1a3324] cursor-pointer transition-colors">
<input className="h-4 w-4 border-2 border-[#cfe7d9] bg-transparent text-primary focus:ring-0 checked:bg-[image:--radio-dot-svg]" name="rating" type="radio"/>
<span className="text-[#0d1b13] dark:text-white/90 text-sm font-medium">3+ Estrellas</span>
</label>
<label className="flex items-center gap-3 p-2 rounded-lg border border-[#cfe7d9] dark:border-[#1a3324] hover:bg-[#e7f3ec] dark:hover:bg-[#1a3324] cursor-pointer transition-colors">
<input className="h-4 w-4 border-2 border-[#cfe7d9] bg-transparent text-primary focus:ring-0 checked:bg-[image:--radio-dot-svg]" name="rating" type="radio"/>
<span className="text-[#0d1b13] dark:text-white/90 text-sm font-medium">Todas</span>
</label>
</div>
</div>
</div>
</aside>
{/* Grid de Productores */}
<div className="flex-1">
<div className="flex items-center justify-between mb-6">
<p className="text-sm text-[#4c9a6c] dark:text-white/50">Mostrando <span className="font-bold text-[#0d1b13] dark:text-primary">24 productores</span> cerca de tu ubicación</p>
<div className="flex items-center gap-2">
<span className="text-sm">Ordenar por:</span>
<select className="bg-transparent border-none text-sm font-bold text-primary focus:ring-0 cursor-pointer">
<option>Más cercanos</option>
<option>Mejor valorados</option>
<option>Nuevos</option>
</select>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
{/* Producer Card 1 */}
<div className="group bg-white dark:bg-[#162a1e] rounded-xl overflow-hidden shadow-sm border border-[#e7f3ec] dark:border-[#1a3324] hover:shadow-lg transition-all duration-300">
<div className="relative h-48 bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBmjCHvh7ersKFZKs8LDsXVnXuAgjxSnEJUVBm0TNApr-xX_t7wE42WpPOrpxjLp9T-QBWZGcosujClR2A4dfH6owOkTaKCF4OmiPznypTOgmUcb1icMb7LJeSiUXYmRD-HixzaHzqDe1IxpbopN0TDV3xz9DfkOZGXKyJdDsSBWGwuKYoEoEoL4io_FNTJdU6ki6H5pU1ogU8xhDXtH1skky-CZbnisp7kO7G5GRR9DIGKtPM92JWFuPWzd8HLXgkB61lwFjP2iq0W')"}} title="Vista aérea de una granja de hortalizas">
<div className="absolute top-3 left-3 bg-white/90 dark:bg-background-dark/90 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
<span className="material-symbols-outlined text-primary text-xs fill">star</span>
<span className="text-xs font-bold text-[#0d1b13] dark:text-white">4.9</span>
</div>
<button className="absolute top-3 right-3 size-8 bg-white/90 dark:bg-background-dark/90 backdrop-blur rounded-full flex items-center justify-center text-[#0d1b13] dark:text-white hover:text-red-500 transition-colors shadow-sm">
<span className="material-symbols-outlined text-xl">favorite</span>
</button>
<div className="absolute bottom-3 left-3 bg-primary text-background-dark text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md">
                                    A 2.5 km
                                </div>
</div>
<div className="p-5">
<div className="flex flex-col mb-3">
<h3 className="text-lg font-bold text-[#0d1b13] dark:text-white group-hover:text-primary transition-colors">Huerto del Sol</h3>
<p className="text-xs font-medium text-primary uppercase tracking-tighter">Especialidad: Hortalizas y Cítricos</p>
</div>
<p className="text-sm text-[#4c9a6c] dark:text-white/70 mb-5 line-clamp-2">Cultivos 100% ecológicos utilizando técnicas ancestrales de riego por goteo y compost natural.</p>
<div className="flex items-center gap-2">
<button className="flex-1 bg-primary hover:bg-primary/90 text-background-dark font-bold py-2 rounded-lg transition-colors text-sm">Ver Perfil</button>
</div>
</div>
</div>
{/* Producer Card 2 */}
<div className="group bg-white dark:bg-[#162a1e] rounded-xl overflow-hidden shadow-sm border border-[#e7f3ec] dark:border-[#1a3324] hover:shadow-lg transition-all duration-300">
<div className="relative h-48 bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAQMhhebMkrl8S2_IANAQLtzOSlKcIGVk_dSLf0TGNikpzRtBEbLOKU0I120O73bHVdOkCQSOg_4m5rvZHIIw8h5pT-MU1au6jj-R6OQbg_Ljb8KgR05RGpPzH8crG1E4jNEGnlLsXJH3YT6xrjw32htx5o_rgjQu6aAnobzR1mLfXapZQPMUpBCjJ_ZEyZ35kkNOE_QuseNo8tP9YNXgHQbD6IgMYBmGzH0WMeyvox3BecnphXhG0qwPG-vVLXJct9kBKt_vimHwVm')"}} title="Productor de queso artesanal en su taller">
<div className="absolute top-3 left-3 bg-white/90 dark:bg-background-dark/90 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
<span className="material-symbols-outlined text-primary text-xs fill">star</span>
<span className="text-xs font-bold text-[#0d1b13] dark:text-white">4.8</span>
</div>
<button className="absolute top-3 right-3 size-8 bg-white/90 dark:bg-background-dark/90 backdrop-blur rounded-full flex items-center justify-center text-[#0d1b13] dark:text-white hover:text-red-500 transition-colors shadow-sm">
<span className="material-symbols-outlined text-xl">favorite</span>
</button>
<div className="absolute bottom-3 left-3 bg-primary text-background-dark text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md">
                                    A 5.2 km
                                </div>
</div>
<div className="p-5">
<div className="flex flex-col mb-3">
<h3 className="text-lg font-bold text-[#0d1b13] dark:text-white group-hover:text-primary transition-colors">Lácteos La Sierra</h3>
<p className="text-xs font-medium text-primary uppercase tracking-tighter">Especialidad: Quesos de Oveja</p>
</div>
<p className="text-sm text-[#4c9a6c] dark:text-white/70 mb-5 line-clamp-2">Quesos elaborados artesanalmente con leche cruda de nuestra propia ganadería en pastoreo libre.</p>
<div className="flex items-center gap-2">
<button className="flex-1 bg-primary hover:bg-primary/90 text-background-dark font-bold py-2 rounded-lg transition-colors text-sm">Ver Perfil</button>
</div>
</div>
</div>
{/* Producer Card 3 */}
<div className="group bg-white dark:bg-[#162a1e] rounded-xl overflow-hidden shadow-sm border border-[#e7f3ec] dark:border-[#1a3324] hover:shadow-lg transition-all duration-300">
<div className="relative h-48 bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuACVoRimRmvVJNn_nIIxLXp5N-JVmVtUR_3YN9S8W841QN0CKdiBLcvM1bxTmZ2N1EwZky5LzzUIWDQNI4ZZEw1BJ5GC-vGKuUjuuRaLTolRyRVXq8PfXhn9gGtnBwjP0agnp8e8WehX-yHqvFIe5EvNcI2nrrmzBS1sGF42g2do0-laIpicOA3vAK4fqlewX9lHujl1jtY4N5jAcFaww_IMhUhk_SofGBhjhmc2ORXNCMUZyRjm2M0_YaVhH_QbG3sqVKd6mobR1HC')"}} title="Pan artesanal recién horneado en mesa de madera">
<div className="absolute top-3 left-3 bg-white/90 dark:bg-background-dark/90 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
<span className="material-symbols-outlined text-primary text-xs fill">star</span>
<span className="text-xs font-bold text-[#0d1b13] dark:text-white">5.0</span>
</div>
<button className="absolute top-3 right-3 size-8 bg-white/90 dark:bg-background-dark/90 backdrop-blur rounded-full flex items-center justify-center text-[#0d1b13] dark:text-white hover:text-red-500 transition-colors shadow-sm">
<span className="material-symbols-outlined text-xl">favorite</span>
</button>
<div className="absolute bottom-3 left-3 bg-primary text-background-dark text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md">
                                    A 1.8 km
                                </div>
</div>
<div className="p-5">
<div className="flex flex-col mb-3">
<h3 className="text-lg font-bold text-[#0d1b13] dark:text-white group-hover:text-primary transition-colors">Masa Madre Local</h3>
<p className="text-xs font-medium text-primary uppercase tracking-tighter">Especialidad: Panadería Tradicional</p>
</div>
<p className="text-sm text-[#4c9a6c] dark:text-white/70 mb-5 line-clamp-2">Pan de fermentación lenta hecho con harinas molidas a piedra y sin aditivos artificiales.</p>
<div className="flex items-center gap-2">
<button className="flex-1 bg-primary hover:bg-primary/90 text-background-dark font-bold py-2 rounded-lg transition-colors text-sm">Ver Perfil</button>
</div>
</div>
</div>
{/* Producer Card 4 */}
<div className="group bg-white dark:bg-[#162a1e] rounded-xl overflow-hidden shadow-sm border border-[#e7f3ec] dark:border-[#1a3324] hover:shadow-lg transition-all duration-300">
<div className="relative h-48 bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBmVjzs_pzIMiXowhM7vllrDDmAD5NnlrkURBI9h14c3too9YLv1poO-u6o44y2J0OwFjOiXWA5QknbOuBguo6y3HhEXMZBQkBidCJQTWVb37jh7vVfvF1NdgXitttSji73K78xHdFs4JBA_fhdxPCP6XIh79o83x9_QYF43Fh4t8CFegv-4mmYdskOb_MOiFjexgLu0MwcExxDdOGwO-R7e4jf6uCJ4DMcMROAvHNtS1aPDeEfnFbot6g0jX6M2ybyMRQbqExDHcXn')"}} title="Colmenas de abejas en un campo de flores">
<div className="absolute top-3 left-3 bg-white/90 dark:bg-background-dark/90 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
<span className="material-symbols-outlined text-primary text-xs fill">star</span>
<span className="text-xs font-bold text-[#0d1b13] dark:text-white">4.7</span>
</div>
<button className="absolute top-3 right-3 size-8 bg-white/90 dark:bg-background-dark/90 backdrop-blur rounded-full flex items-center justify-center text-[#0d1b13] dark:text-white hover:text-red-500 transition-colors shadow-sm">
<span className="material-symbols-outlined text-xl">favorite</span>
</button>
<div className="absolute bottom-3 left-3 bg-primary text-background-dark text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md">
                                    A 12 km
                                </div>
</div>
<div className="p-5">
<div className="flex flex-col mb-3">
<h3 className="text-lg font-bold text-[#0d1b13] dark:text-white group-hover:text-primary transition-colors">Apicultura Don Juan</h3>
<p className="text-xs font-medium text-primary uppercase tracking-tighter">Especialidad: Miel y Derivados</p>
</div>
<p className="text-sm text-[#4c9a6c] dark:text-white/70 mb-5 line-clamp-2">Miel pura de abeja recolectada en zonas de montaña, sin procesos térmicos que alteren su calidad.</p>
<div className="flex items-center gap-2">
<button className="flex-1 bg-primary hover:bg-primary/90 text-background-dark font-bold py-2 rounded-lg transition-colors text-sm">Ver Perfil</button>
</div>
</div>
</div>
{/* Producer Card 5 */}
<div className="group bg-white dark:bg-[#162a1e] rounded-xl overflow-hidden shadow-sm border border-[#e7f3ec] dark:border-[#1a3324] hover:shadow-lg transition-all duration-300">
<div className="relative h-48 bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCzK8KX9OJqUNB6vDCK7FdKzo_5RTFjeAm65H8w91dz1LmPFKtukPvSr0_cz9OIqoNrUptsKMcVC8BKEKuAGhZhSQZGwkTTO6Hm9dp_vO85-4X5JbqIuXqT_Ljz1fBbINWT1ruTWtPT161ZQoPXW2YLLonzwI9Mi6_iXsbs8WmCA3iOcjbg6HMlc8Vysm5ygYIUcvrVIKMrq8DMWDM2ecCk6yjo6304hbbNEobgsyKcIP8LMiVIuuqe8MD1uKMgd07Enlp0dGfE2Gs4')"}} title="Botella de aceite de oliva en un olivar">
<div className="absolute top-3 left-3 bg-white/90 dark:bg-background-dark/90 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
<span className="material-symbols-outlined text-primary text-xs fill">star</span>
<span className="text-xs font-bold text-[#0d1b13] dark:text-white">4.9</span>
</div>
<button className="absolute top-3 right-3 size-8 bg-white/90 dark:bg-background-dark/90 backdrop-blur rounded-full flex items-center justify-center text-[#0d1b13] dark:text-white hover:text-red-500 transition-colors shadow-sm">
<span className="material-symbols-outlined text-xl">favorite</span>
</button>
<div className="absolute bottom-3 left-3 bg-primary text-background-dark text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md">
                                    A 8.4 km
                                </div>
</div>
<div className="p-5">
<div className="flex flex-col mb-3">
<h3 className="text-lg font-bold text-[#0d1b13] dark:text-white group-hover:text-primary transition-colors">Finca Los Olivos</h3>
<p className="text-xs font-medium text-primary uppercase tracking-tighter">Especialidad: Aceite de Oliva Virgen</p>
</div>
<p className="text-sm text-[#4c9a6c] dark:text-white/70 mb-5 line-clamp-2">Aceite de oliva de extracción en frío, producido con olivos centenarios de la región.</p>
<div className="flex items-center gap-2">
<button className="flex-1 bg-primary hover:bg-primary/90 text-background-dark font-bold py-2 rounded-lg transition-colors text-sm">Ver Perfil</button>
</div>
</div>
</div>
{/* Producer Card 6 */}
<div className="group bg-white dark:bg-[#162a1e] rounded-xl overflow-hidden shadow-sm border border-[#e7f3ec] dark:border-[#1a3324] hover:shadow-lg transition-all duration-300">
<div className="relative h-48 bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCECqxGh9W1r4qI637Faq4vf4u9Av2rPgOgd5S_LB8jknKv72h6J3m_cyQYz2QKoyRvC0ieunHYHHUTi9GpLX2gmZJx90VlW1OU-rmJEndjHhzn6lYnAHSM8AILIAYIUyNeZvUX34NBJIA_mWDZw2XIPJDXPD0GO9bC4AFDsMh2DplEr1bCys6D9grbU-I0szRzK3673IpNyvrJtfUga9HQdPUjnscdKdTp12r_lQdbiPDGqWl3Zt_-UsAB3jCpacluoPEZ5AFG0iC5')"}} title="Cesta de huevos frescos de granja">
<div className="absolute top-3 left-3 bg-white/90 dark:bg-background-dark/90 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
<span className="material-symbols-outlined text-primary text-xs fill">star</span>
<span className="text-xs font-bold text-[#0d1b13] dark:text-white">4.6</span>
</div>
<button className="absolute top-3 right-3 size-8 bg-white/90 dark:bg-background-dark/90 backdrop-blur rounded-full flex items-center justify-center text-[#0d1b13] dark:text-white hover:text-red-500 transition-colors shadow-sm">
<span className="material-symbols-outlined text-xl">favorite</span>
</button>
<div className="absolute bottom-3 left-3 bg-primary text-background-dark text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md">
                                    A 3.1 km
                                </div>
</div>
<div className="p-5">
<div className="flex flex-col mb-3">
<h3 className="text-lg font-bold text-[#0d1b13] dark:text-white group-hover:text-primary transition-colors">Granja Avícola Real</h3>
<p className="text-xs font-medium text-primary uppercase tracking-tighter">Especialidad: Huevos Camperos</p>
</div>
<p className="text-sm text-[#4c9a6c] dark:text-white/70 mb-5 line-clamp-2">Huevos de gallinas criadas en libertad y alimentadas con granos naturales sin transgénicos.</p>
<div className="flex items-center gap-2">
<button className="flex-1 bg-primary hover:bg-primary/90 text-background-dark font-bold py-2 rounded-lg transition-colors text-sm">Ver Perfil</button>
</div>
</div>
</div>
</div>
{/* Pagination */}
<div className="flex justify-center items-center gap-2 mt-12">
<button className="flex items-center justify-center size-10 rounded-lg border border-[#cfe7d9] dark:border-[#1a3324] hover:bg-[#e7f3ec] dark:hover:bg-[#1a3324] transition-colors">
<span className="material-symbols-outlined">chevron_left</span>
</button>
<button className="size-10 rounded-lg bg-primary text-background-dark font-bold">1</button>
<button className="size-10 rounded-lg border border-[#cfe7d9] dark:border-[#1a3324] hover:bg-[#e7f3ec] dark:hover:bg-[#1a3324] transition-colors">2</button>
<button className="size-10 rounded-lg border border-[#cfe7d9] dark:border-[#1a3324] hover:bg-[#e7f3ec] dark:hover:bg-[#1a3324] transition-colors">3</button>
<span className="mx-1 text-[#4c9a6c]">...</span>
<button className="size-10 rounded-lg border border-[#cfe7d9] dark:border-[#1a3324] hover:bg-[#e7f3ec] dark:hover:bg-[#1a3324] transition-colors">8</button>
<button className="flex items-center justify-center size-10 rounded-lg border border-[#cfe7d9] dark:border-[#1a3324] hover:bg-[#e7f3ec] dark:hover:bg-[#1a3324] transition-colors">
<span className="material-symbols-outlined">chevron_right</span>
</button>
</div>
</div>
</div>
</main>
    </>
  );
}