


export const RCampaignSidebar = () => {
  return (
    <aside
      className="w-80 bg-white dark:bg-surface-dark border-l border-gray-200 dark:border-border-dark shrink-0 flex flex-col h-full overflow-y-auto z-20 shadow-xl">
      <div className="p-6 border-b border-gray-200 dark:border-border-dark">
        <h2 className="text-text-muted text-xs font-bold uppercase tracking-wider mb-4">Preview</h2>
        <div
          className="w-full aspect-video bg-gray-100 dark:bg-[#121118] rounded-lg overflow-hidden border border-gray-200 dark:border-border-dark relative group">
          <img alt="Dark fantasy castle map full preview" className="w-full h-full object-cover"
            data-alt="Dark fantasy castle map full preview" data-location="Castle Ravenloft"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWcv5N5y4R21TiJG_OEbTeQEAkX6a9BrheV_FbyRp_h9Jdx0UdVJp_M315E3Z0Pp0LfMoEUUdKfj-qomm3U-gthKDipz3kJFgUWe1YeVgeBkYybXzPdy3P4XCB_-IE09NhOoRPDz3lklBHrQzpxJoSsW9WebUdqyGq0qH8SGUMvooNFlpkhQSwy4ogjloVU4ja5FJhA0iGyxs4J4iSAzv1NjDdJpj2r7Ul28iNLf_A_jk7dCeXHhvizoIcPduVf9jL2lfyP9BGXh0" />
          <button
            className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="bg-black/60 text-white p-2 rounded-full backdrop-blur-md hover:bg-black/80">
              <span className="material-symbols-outlined text-[24px]">zoom_in</span>
            </span>
          </button>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
            Castle_Ravenloft_Floor1.jpg</h3>
          <div className="flex items-center gap-2 mt-1">
            <span
              className="px-2 py-0.5 rounded text-[10px] font-bold bg-accent-maps/20 text-accent-maps border border-accent-maps/20">MAP</span>
            <span className="text-text-muted text-xs">40x40 Grid</span>
          </div>
        </div>
      </div>
      <div className="p-6 flex-1">
        <h2 className="text-text-muted text-xs font-bold uppercase tracking-wider mb-4">Properties</h2>
        <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm mb-6">
          <div>
            <span className="text-text-muted block text-xs mb-0.5">Dimensions</span>
            <span className="text-slate-700 dark:text-white font-medium">4096 x 4096 px</span>
          </div>
          <div>
            <span className="text-text-muted block text-xs mb-0.5">File Size</span>
            <span className="text-slate-700 dark:text-white font-medium">4.2 MB</span>
          </div>
          <div>
            <span className="text-text-muted block text-xs mb-0.5">Created</span>
            <span className="text-slate-700 dark:text-white font-medium">Oct 24, 2023</span>
          </div>
          <div>
            <span className="text-text-muted block text-xs mb-0.5">Type</span>
            <span className="text-slate-700 dark:text-white font-medium">image/jpeg</span>
          </div>
        </div>
        <h2 className="text-text-muted text-xs font-bold uppercase tracking-wider mb-4">Grid Configuration</h2>
        <div className="bg-gray-50 dark:bg-[#121118] rounded-lg p-3 mb-6">
          <label className="flex items-center justify-between text-sm text-slate-700 dark:text-gray-300 mb-2">
            <span>PPI (Pixels Per Inch)</span>
            <input
              className="w-16 h-7 bg-border-dark rounded border border-gray-200 dark:border-border-dark text-center focus:ring-1 focus:ring-primary focus:border-primary text-xs"
              type="number" value="100" />
          </label>
          <div className="w-full bg-border-dark rounded-full h-1.5 mt-2">
            <div className="bg-primary h-1.5 rounded-full" style={{ width: '70%' }}></div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <button
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-[#2d0fc0] text-white py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 transition-all">
            <span className="material-symbols-outlined text-[20px]">add_to_queue</span>
            Add to Scene
          </button>
          <button
            className="w-full flex items-center justify-center gap-2 bg-border-dark hover:bg-gray-50 dark:hover:bg-[#3f3b52] text-slate-700 dark:text-white border border-gray-200 dark:border-transparent py-2.5 rounded-lg text-sm font-medium transition-colors">
            <span className="material-symbols-outlined text-[20px]">edit</span>
            Configure Walls
          </button>
          <button
            className="w-full flex items-center justify-center gap-2 bg-border-dark hover:bg-gray-50 dark:hover:bg-[#3f3b52] text-slate-700 dark:text-white border border-gray-200 dark:border-transparent py-2.5 rounded-lg text-sm font-medium transition-colors">
            <span className="material-symbols-outlined text-[20px]">share</span>
            Send to Players
          </button>
        </div>
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-border-dark bg-gray-50 dark:bg-[#121118]/50">
        <div className="flex justify-between items-center">
          <button
            className="text-text-muted hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-500/10"
            title="Delete Asset">
            <span className="material-symbols-outlined text-[20px]">delete</span>
          </button>
          <button className="text-text-muted hover:text-white transition-colors p-2 rounded-lg hover:bg-border-dark/20"
            title="More Options">
            <span className="material-symbols-outlined text-[20px]">more_horiz</span>
          </button>
        </div>
      </div>
    </aside>
  );
}