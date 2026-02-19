


export const CampaignResources = () => {
  return (
    <main className="flex-1 flex flex-col min-w-0 bg-background-light dark:bg-background-dark relative">
      {/* Header / Toolbar */}
      <header className="flex h-16 items-center justify-end px-6 border-b border-border-dark shrink-0 bg-[#121118]">
        <div className="flex items-center gap-8">
          {/* Search */}
          <div className="relative hidden sm:block">
            <span
              className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </span>
            <input
              className="bg-border-dark text-text-muted text-sm rounded-lg pl-10 pr-4 py-2 w-64 focus:outline-none focus:ring-1 focus:ring-primary border-none"
              placeholder="Filter assets..." type="text" />
          </div>
          {/* View Toggles */}
          <div className="flex bg-border-dark rounded-lg p-1 gap-1">
            <button
              className="p-1 rounded hover:bg-[#3f3b52] text-white bg-[#3f3b52] shadow-sm">
              <span className="material-symbols-outlined text-[20px]">grid_view</span>
            </button>
            <button
              className="p-1 rounded hover:bg-[#3f3b52] text-text-muted hover:text-white">
              <span className="material-symbols-outlined text-[20px]">list</span>
            </button>
          </div>
          <button
            className="hidden sm:flex items-center gap-2 bg-primary hover:bg-[#2d0fc0] text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-[20px]">upload</span>
            <span>Upload</span>
          </button>
        </div>
      </header>
      {/* Content Browser */}
      <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
        {/* Folders Section */}
        <div className="mb-8">
          <h3 className="text-text-muted text-xs font-bold uppercase tracking-wider mb-4 px-1">Folders</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {/* Folder: Maps */}
            <button
              className="group flex flex-col p-4 bg-surface-dark rounded-xl border border-border-dark hover:border-accent-maps/50 hover:bg-accent-maps/5 transition-all cursor-pointer text-left relative overflow-hidden">
              <div
                className="absolute top-0 left-0 w-1 h-full bg-accent-maps opacity-0 group-hover:opacity-100 transition-opacity">
              </div>
              <div className="flex items-start justify-between mb-3">
                <div
                  className="p-2 rounded-lg bg-accent-maps/10 text-accent-maps group-hover:bg-accent-maps group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[24px]">map</span>
                </div>
                <span className="text-text-muted text-xs font-medium">32 items</span>
              </div>
              <h4 className="text-white font-semibold text-sm">Maps</h4>
              <p className="text-text-muted text-xs mt-1">Battlemaps &amp; Terrain</p>
            </button>
            {/* Folder: Characters */}
            <button
              className="group flex flex-col p-4 bg-surface-dark rounded-xl border border-border-dark hover:border-accent-npcs/50 hover:bg-accent-npcs/5 transition-all cursor-pointer text-left relative overflow-hidden">
              <div
                className="absolute top-0 left-0 w-1 h-full bg-accent-npcs opacity-0 group-hover:opacity-100 transition-opacity">
              </div>
              <div className="flex items-start justify-between mb-3">
                <div
                  className="p-2 rounded-lg bg-accent-npcs/10 text-accent-npcs group-hover:bg-accent-npcs group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[24px]">person</span>
                </div>
                <span className="text-text-muted text-xs font-medium">3 items</span>
              </div>
              <h4 className="text-white font-semibold text-sm">PCs</h4>
              <p className="text-text-muted text-xs mt-1">Tokens &amp; Portraits</p>
            </button>
            {/* Folder: NPCs */}
            <button
              className="group flex flex-col p-4 bg-surface-dark rounded-xl border border-border-dark hover:border-accent-npcs/50 hover:bg-accent-npcs/5 transition-all cursor-pointer text-left relative overflow-hidden">
              <div
                className="absolute top-0 left-0 w-1 h-full bg-accent-npcs opacity-0 group-hover:opacity-100 transition-opacity">
              </div>
              <div className="flex items-start justify-between mb-3">
                <div
                  className="p-2 rounded-lg bg-accent-npcs/10 text-accent-npcs group-hover:bg-accent-npcs group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[24px]">person</span>
                </div>
                <span className="text-text-muted text-xs font-medium">14 items</span>
              </div>
              <h4 className="text-white font-semibold text-sm">NPCs</h4>
              <p className="text-text-muted text-xs mt-1">Tokens &amp; Portraits</p>
            </button>
            {/* Folder: Handouts */}
            <button
              className="group flex flex-col p-4 bg-surface-dark rounded-xl border border-border-dark hover:border-accent-handouts/50 hover:bg-accent-handouts/5 transition-all cursor-pointer text-left relative overflow-hidden">
              <div
                className="absolute top-0 left-0 w-1 h-full bg-accent-handouts opacity-0 group-hover:opacity-100 transition-opacity">
              </div>
              <div className="flex items-start justify-between mb-3">
                <div
                  className="p-2 rounded-lg bg-accent-handouts/10 text-accent-handouts group-hover:bg-accent-handouts group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[24px]">description</span>
                </div>
                <span className="text-text-muted text-xs font-medium">5 items</span>
              </div>
              <h4 className="text-white font-semibold text-sm">Handouts</h4>
              <p className="text-text-muted text-xs mt-1">Letters &amp; Clues</p>
            </button>
            {/* Folder: Audio */}
            <button
              className="group flex flex-col p-4 bg-surface-dark rounded-xl border border-border-dark hover:border-accent-audio/50 hover:bg-accent-audio/5 transition-all cursor-pointer text-left relative overflow-hidden">
              <div
                className="absolute top-0 left-0 w-1 h-full bg-accent-audio opacity-0 group-hover:opacity-100 transition-opacity">
              </div>
              <div className="flex items-start justify-between mb-3">
                <div
                  className="p-2 rounded-lg bg-accent-audio/10 text-accent-audio group-hover:bg-accent-audio group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[24px]">music_note</span>
                </div>
                <span className="text-text-muted text-xs font-medium">12 tracks</span>
              </div>
              <h4 className="text-white font-semibold text-sm">Audio</h4>
              <p className="text-text-muted text-xs mt-1">Ambience &amp; SFX</p>
            </button>
          </div>
        </div>
        {/* Recent Files Section */}
        <div>
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-text-muted text-xs font-bold uppercase tracking-wider">Unsorted Assets</h3>
            <button className="text-primary text-xs font-bold hover:underline">View All</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {/* File Item: Selected */}
            <div
              className="group relative rounded-xl bg-surface-dark p-2 border-2 border-primary shadow-[0_0_15px_-3px_rgba(55,19,236,0.3)] cursor-pointer">
              <div className="absolute top-3 right-3 z-10">
                <div className="bg-primary text-white rounded-full p-0.5 shadow-sm">
                  <span className="material-symbols-outlined text-[16px] block">check</span>
                </div>
              </div>
              <div
                className="aspect-square rounded-lg bg-gray-100 dark:bg-[#121118] overflow-hidden mb-2 relative">
                <img alt="Dark fantasy castle map top down view"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  data-alt="Dark fantasy castle map top down view" data-location="Castle Ravenloft"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyR3wGGRHE-Kc-D4mDrDETrcxtnGer7BeKcgxENHehFyRUwySyqTx93qKsPdKvskREq-cI8DSgWTs8gZRpyPIk5vJa8zWamFqRU1Ybq505990XoJQ1vQGJ3lem0lZTXhl43owlzZ35HxG6ljdw3HXbARYusD5DqOls5Bo0EHHT3tJ7GBVPJpJhNG7aL2cQZoLaGQC-HYU8SBqPeG8G_IMmvd0my3aFO2ipBrh1hgyPBF_i_uZiEiY42qkbrbRbpiJunPWW3wafsVE" />
                <div
                  className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] text-white font-medium">
                  JPG</div>
              </div>
              <div className="px-1">
                <p className="text-slate-900 dark:text-white text-sm font-medium truncate">
                  Castle_Ravenloft_Floor1.jpg</p>
                <p className="text-text-muted text-xs truncate">4.2 MB • Added 2m ago</p>
              </div>
            </div>
            {/* File Item */}
            <div
              className="group relative rounded-xl bg-surface-dark p-2 border border-border-dark hover:border-gray-300 dark:hover:border-primary/50 cursor-pointer transition-colors">
              <div
                className="aspect-square rounded-lg bg-gray-100 dark:bg-[#121118] overflow-hidden mb-2 relative">
                <img alt="Painting of a vampire lord portrait"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  data-alt="Painting of a vampire lord portrait"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrH7a8ynIf_hJPw8mmN1YsUMrcXF4XJArdiYJWUoP6Eo26Ngpgo8zZVdmZW3rPKcnE3-BvsqY0Z4yw9J8pc3S5IwK_RSAF06C6avmr1Sg3fzYVAUG6XByHLHppAKrro6eeH6dBGrJDa-qrIzP3QLxz9_hsqKy9sXwwidnpSGdWQe1rXaF_3cVk6_QxlaWIRMfTp3Us0CbxuMCBmdNeEEjGLie2KY4jbdk3_eigXChPYdoHF8mhxGa-y-wgWGCY2SNpzqJhkj4eXWI" />
                <div
                  className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] text-white font-medium">
                  PNG</div>
              </div>
              <div className="px-1">
                <p className="text-slate-900 dark:text-white text-sm font-medium truncate">
                  Strahd_Portrait.png</p>
                <p className="text-text-muted text-xs truncate">1.8 MB • Added 15m ago</p>
              </div>
            </div>
            {/* File Item (PDF) */}
            <div
              className="group relative rounded-xl bg-surface-dark p-2 border border-border-dark hover:border-gray-300 dark:hover:border-primary/50 cursor-pointer transition-colors">
              <div
                className="aspect-square rounded-lg bg-gray-50 dark:bg-[#121118] flex items-center justify-center mb-2 relative group-hover:bg-border-dark transition-colors">
                <span
                  className="material-symbols-outlined text-[64px] text-red-400 group-hover:scale-110 transition-transform">picture_as_pdf</span>
                <div
                  className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] text-white font-medium">
                  PDF</div>
              </div>
              <div className="px-1">
                <p className="text-slate-900 dark:text-white text-sm font-medium truncate">
                  Letter_Introduction.pdf</p>
                <p className="text-text-muted text-xs truncate">450 KB • Added 1h ago</p>
              </div>
            </div>
            {/* File Item (Audio) */}
            <div
              className="group relative rounded-xl bg-surface-dark p-2 border border-border-dark hover:border-gray-300 dark:hover:border-primary/50 cursor-pointer transition-colors">
              <div
                className="aspect-square rounded-lg bg-gray-50 dark:bg-[#121118] flex flex-col items-center justify-center mb-2 relative group-hover:bg-border-dark transition-colors">
                <div className="flex items-center justify-center gap-1 h-8">
                  <div
                    className="w-1 h-3 bg-purple-500 rounded-full animate-[pulse_1s_ease-in-out_infinite]">
                  </div>
                  <div
                    className="w-1 h-5 bg-purple-500 rounded-full animate-[pulse_1.2s_ease-in-out_infinite]">
                  </div>
                  <div
                    className="w-1 h-8 bg-purple-500 rounded-full animate-[pulse_0.8s_ease-in-out_infinite]">
                  </div>
                  <div
                    className="w-1 h-4 bg-purple-500 rounded-full animate-[pulse_1.1s_ease-in-out_infinite]">
                  </div>
                  <div
                    className="w-1 h-2 bg-purple-500 rounded-full animate-[pulse_0.9s_ease-in-out_infinite]">
                  </div>
                </div>
                <div
                  className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] text-white font-medium">
                  MP3</div>
              </div>
              <div className="px-1">
                <p className="text-slate-900 dark:text-white text-sm font-medium truncate">
                  Creepy_Wind_Loop.mp3</p>
                <p className="text-text-muted text-xs truncate">3.1 MB • Added 3h ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}