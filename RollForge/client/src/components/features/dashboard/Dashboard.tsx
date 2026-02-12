
export default function Dashboard() {
  return (

    <div className="flex h-screen w-full overflow-hidden">
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">

        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <div className="max-w-5xl mx-auto flex flex-col gap-8">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-2">Welcome back, Traveler</h2>
                <p className="text-slate-500 text-base md:text-lg">Ready to weave your next epic tale?</p>
              </div>
              <button className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-lg font-bold shadow-lg shadow-primary/25 transition-all active:scale-95">
                <span className="material-symbols-outlined text-[20px]">add</span>
                <span>Create Campaign</span>
              </button>
            </div>
            {/* Campaigns Grid */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">swords</span>
                  My Campaigns
                </h3>
                <button className="text-sm text-primary font-medium hover:underline">View All</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* Campaign Card 1 */}
                <div className="group relative flex flex-col bg-white dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 border border-slate-200 dark:border-slate-800/50 hover:border-primary/50 dark:hover:border-primary/50">
                  <div className="h-40 w-full bg-cover bg-center relative" data-alt="Dark fantasy forest landscape" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAQTwjWWh-JXT1K3bTMSh6UpbPwONNiKyvLbN8fxK8WWr4JpHYtVytpwJIbTh9r7jPQiFRb1iE9K9cBAfLd4u0CqOJ7Pl1WYPXmIGd6hlKWhI77P_-bQq_H3bvYIyZltv7fYj8AxeiJjI5EMfMqyBFxfid-2Dt0DCEfw8hsF00n3zBp2AQMYHjFV4a_xP3Ehj943QJkISH5y_5A-xkL91j1MEZEiryGO_V6QK7CPlmNl1J8j25IEqNPWPo396pAiXMMPxMdU0Y-lLI')" }}>
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent"></div>
                    <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-xs font-bold text-white px-2 py-1 rounded border border-white/10">D&amp;D 5e</span>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">Curse of Strahd</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">The mists of Barovia are closing in. Will you survive the night?</p>
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex -space-x-2 overflow-hidden">
                        <img alt="Player 1" className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-[#1d1c27]" data-alt="Player portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvONqMBQu7BvurqXTeBmoeY9bTvyQK5gxe1OvGHtdXMkQSGFPsz5-nz8hlEXuYUr900WjpfDg2OwBQ9cus1SKek80IjahgP7Yk4VZkyDj7Xr8xKWPHn3xWOIbCFB-FkXY9AyT-QNRV7LeVCs-Dv8G5MYPJih9w6ERO8wJKxuaMHEz9kRHZ4Zyn64OdIJqebobcuu0qC1mpInHrpGtwklcBw7SPTEUyNaP7Dyc_lBIcFt_XwIGuu9cL6ViI5Z1UC2Npf4FADOsQvO0" />
                        <img alt="Player 2" className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-[#1d1c27]" data-alt="Player portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCq455EwvaQBEdvuK1HrMYMI3ZUDhMIzKPspYnvIDZyVvHAhOs1j2WUVdRBAsp6qUfnEqkDdjDxoKF7OMOLIYTIRBWLNT-PDnF3BQ_VXkqoZBVhcKOPTJlyYHDYuYzy_Akf32mjGd5FVjRpqZ5pMs1wVEJHwySpqoQfm-Cw-4a7pg6d_TN8e5JT2utYJ3kda_GGc2eXL3Hylg4Y8Qi4eA56LiKPzuynQQ_W4PDAAq9e5qYmjHtliHJoYLgvRoRJsHeREILnh6Wl_zc" />
                        <img alt="Player 3" className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-[#1d1c27]" data-alt="Player portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_U0qfklRQvuMBhXphFJXMXr59k9m-nBPbm9MsXmLwyJN2AxfMVdaO300pbkTi0zGb4fT0k4GTHdPwhlMoK86JMjnjgqydoNxJjVgRVdo0kFvGGQNu939exJH0P-886S__iAdu7tWPT-oK51Mofzwq5iKQE30e-u1tFAWQ9uKqJ5f5YR2YJ60rTby-NPPw1t16C6HgI4SAC1D3CClyOJwP5U5ltHXEBgDLhXKe0ntt8Pn7LTZNAENgaAhbIuhUDYPFwRRaIR4sUfo" />
                        <div className="h-6 w-6 rounded-full ring-2 ring-white dark:ring-[#1d1c27] bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-500 dark:text-slate-300">+2</div>
                      </div>
                      <button className="text-sm font-bold text-primary hover:text-primary-hover flex items-center gap-1">
                        Launch <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </div>
                {/* Campaign Card 2 */}
                <div className="group relative flex flex-col bg-white dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 border border-slate-200 dark:border-slate-800/50 hover:border-primary/50 dark:hover:border-primary/50">
                  <div className="h-40 w-full bg-cover bg-center relative" data-alt="Ancient map scroll on wooden table" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDheGOqb-2MOSgOqflVNKZ_Oy8jAlMvE-9Z_2cxNZp9eqPVXXFKug0W8Y2ZO-YD5ngkMWWFg2Lu7gi46Vt3QQPxUEjFp4JEjI7aOoSXxtcZOcA_o1Rv7-C1GP2WyvjkImbcmkoKE_k2QG01ygJ0Hu0PlYZU29l_1W9BpalqTEVJecWdic9Uzcmdgey6trEKRNOP7kFygYazmr19bxbxlO7YhnX0XSn1tV6ziWc4Yzn6lsWPKDEecHPBDBPsrGU0a6V3HTTT5w-j5X0')" }}>
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent"></div>
                    <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-xs font-bold text-white px-2 py-1 rounded border border-white/10">Pathfinder 2e</span>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">Lost Omens</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">Exploring the Mwangi Expanse in search of lost artifacts.</p>
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex -space-x-2 overflow-hidden">
                        <img alt="Player 1" className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-[#1d1c27]" data-alt="Player portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsv1dblSWmfc_qYT-xwTNLS9H2Vf1WtUOxwoglggtwVFgNcM2ByOirlylExLD-9hXGN7YWRBIdIFTH5ROMwK370tSct1VeavJdh_tSATNz5R76-bbXtY5nNWpY-TR-iD4rZvDmSn03rLeknKBfb2E5mbnI-9TtJa6uIKmwplAkI4-RuNKUPzzKmorKQXtq1eeX5rQn8eDWUwhp4PXOQVB2NzShzWblieISE5mUtfo-dftKeJFgwXfb7DVWx4fk3vmauB7rDJ_oqKc" />
                        <div className="h-6 w-6 rounded-full ring-2 ring-white dark:ring-[#1d1c27] bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-500 dark:text-slate-300">+4</div>
                      </div>
                      <button className="text-sm font-bold text-primary hover:text-primary-hover flex items-center gap-1">
                        Launch <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </div>
                {/* Campaign Card 3 */}
                <div className="group relative flex flex-col bg-white dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 border border-slate-200 dark:border-slate-800/50 hover:border-primary/50 dark:hover:border-primary/50">
                  <div className="h-40 w-full bg-cover bg-center relative" data-alt="Futuristic cyberpunk city street at night" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCZPjeMHof59u2pbXHGS55YN-d3mDcR-VjbSQEPyOaoVJFMqJw-NDNKLmQT5HnTPJzRPCXSxSuNlCg1A9RSbT7A5ZUTYlI9EeUhXBEvabIJTspB4fROyZOImICfWDMdrz7kLM49QnFDsAfkUdrGb0nJbiShgimqpvepgIU7lA2dNoNcW19OL9Ax4RaD0wt80IkekNWUJahPgLcXYSkoISSobd7L5PGAWHom6o8AK1MKGkpYHbksJz9Lmqc1jSLqVgX1zJdr6wTfTZo')" }}>
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent"></div>
                    <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-xs font-bold text-white px-2 py-1 rounded border border-white/10">Cyberpunk RED</span>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">Neon Nights</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">One last job before we leave Night City for good.</p>
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex -space-x-2 overflow-hidden">
                        <img alt="Player 1" className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-[#1d1c27]" data-alt="Player portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsTPN7mwAqof8iIsmX6tPDuy3-XrnDbTHoF5EHCg3MMcHFvm1-qsTSAUTC61vrsMQanDP3IHPk7ul1Ip1VaCrrbuPeWKXB9Kdq-gOnAHxTFR1gyjL9mjXeC2Dks_AWNlLTG33LqVzxwBsDgbs60O14MH7-VBOBQDXAMdzIMwqqDg6uS8eeDPxAa17kqB3NOU-EDI0Mptl57WIQ28LXsQfwARwPv1nv2SqEC10ncs9fM892_XBP7pS29dB82KjcxIQ645AnojmDY7c" />
                        <img alt="Player 2" className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-[#1d1c27]" data-alt="Player portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBURDyh_iZHJ8nuaHIXOs_LdMsFux_s2rdZemBhe4pRjaApt16tO--hBO5k0H1rR0xakyYwzSTj5fIAMhgiprDTLGLxWolHv0RXtXMnJyaV3TeCgDnV3vNPia31-kPzCBymCo-I2tbWZ3g_6ulLGo872aMz-_5YKeQchSVNVu0jSTmTaYNm_Ka8AbFGB9HCMxSfARukQDTd-LHIG3IZw8VwHLppKKOUpS8ijKwvB2UH_u0fovxG2kC2pGz9RGJXJzs_b5q7hiM4CA" />
                      </div>
                      <button className="text-sm font-bold text-primary hover:text-primary-hover flex items-center gap-1">
                        Launch <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </div>
                {/* Add New Placeholder */}
                <button className="group flex flex-col items-center justify-center h-full min-h-62.5 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-transparent hover:border-primary hover:bg-primary/5 transition-all duration-300">
                  <div className="h-12 w-12 rounded-full bg-slate-200 dark:bg-surface-dark group-hover:bg-primary group-hover:text-white flex items-center justify-center text-slate-400 dark:text-slate-500 transition-colors mb-3">
                    <span className="material-symbols-outlined">add</span>
                  </div>
                  <span className="text-sm font-bold text-slate-500 dark:text-slate-400 group-hover:text-primary">Create New Campaign</span>
                </button>
              </div>
            </section>
            {/* Recent Activity / News */}
            <section className="pb-10">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-primary">feed</span>
                Community &amp; News
              </h3>
              <div className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-slate-200 dark:border-slate-800">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-1/3 h-48 md:h-auto rounded-lg bg-cover bg-center" data-alt="Abstract colorful nebula space background" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBH_5yKecaLb30JRpbT9bTmpr_zD-1HM9KQhdsP1acgu9vp9UqvPOqUXWVZGIljpWqzWWe_Rn_VLivFOxF3vkrEjopvodVP5hJlmU3R_HLPOelZGDGAXls_o__YrplPS905l_xJ5vdTnOBNbrwIQNKgDh5JL03PDJGm0NeXc3kdNtoDx2wAOR0i8KP1gYxIhqLNUobSJg5m86Nv9jowSt543TKH9yxg-4CY9bi8vPhVvNyuKBB4kJiRXMW62Yqf4BBPVQ3GhQNvdIQ')" }}></div>
                  <div className="flex-1 flex flex-col justify-center">
                    <span className="text-primary text-xs font-bold uppercase tracking-wider mb-2">Update v2.4</span>
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">The Astral Sea Update is Live!</h4>
                    <p className="text-slate-500 dark:text-slate-400 mb-4">New dynamic lighting features, 3D dice physics overhaul, and over 500+ new assets for space-faring adventures have been added to the library.</p>
                    <a className="text-primary font-bold hover:underline flex items-center gap-1" href="#">Read Patch Notes <span className="material-symbols-outlined text-sm">open_in_new</span></a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}