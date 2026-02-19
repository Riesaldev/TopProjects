import { useState, useRef } from "react";
import { useParams } from "react-router-dom";

type ResourceType = "all" | "map" | "token" | "handout" | "audio" | "pdf" | "other";

interface MockResource {
  id: string;
  name: string;
  type: "map" | "token" | "handout" | "audio" | "pdf" | "other";
  size: string;
  addedAt: string;
  url?: string;
  mimeType: string;
}

const MOCK_RESOURCES: MockResource[] = [
  { id: "1", name: "Castle_Ravenloft_Floor1.jpg", type: "map", size: "4.2 MB", addedAt: "2m ago", mimeType: "image/jpeg", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyR3wGGRHE-Kc-D4mDrDETrcxtnGer7BeKcgxENHehFyRUwySyqTx93qKsPdKvskREq-cI8DSgWTs8gZRpyPIk5vJa8zWamFqRU1Ybq505990XoJQ1vQGJ3lem0lZTXhl43owlzZ35HxG6ljdw3HXbARYusD5DqOls5Bo0EHHT3tJ7GBVPJpJhNG7aL2cQZoLaGQC-HYU8SBqPeG8G_IMmvd0my3aFO2ipBrh1hgyPBF_i_uZiEiY42qkbrbRbpiJunPWW3wafsVE" },
  { id: "2", name: "Strahd_Portrait.png", type: "token", size: "1.8 MB", addedAt: "15m ago", mimeType: "image/png", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrH7a8ynIf_hJPw8mmN1YsUMrcXF4XJArdiYJWUoP6Eo26Ngpgo8zZVdmZW3rPKcnE3-BvsqY0Z4yw9J8pc3S5IwK_RSAF06C6avmr1Sg3fzYVAUG6XByHLHppAKrro6eeH6dBGrJDa-qrIzP3QLxz9_hsqKy9sXwwidnpSGdWQe1rXaF_3cVk6_QxlaWIRMfTp3Us0CbxuMCBmdNeEEjGLie2KY4jbdk3_eigXChPYdoHF8mhxGa-y-wgWGCY2SNpzqJhkj4eXWI" },
  { id: "3", name: "Letter_Introduction.pdf", type: "handout", size: "450 KB", addedAt: "1h ago", mimeType: "application/pdf" },
  { id: "4", name: "Creepy_Wind_Loop.mp3", type: "audio", size: "3.1 MB", addedAt: "3h ago", mimeType: "audio/mpeg" },
  { id: "5", name: "Village_Map.jpg", type: "map", size: "2.6 MB", addedAt: "1d ago", mimeType: "image/jpeg" },
  { id: "6", name: "Zombie_Token.png", type: "token", size: "380 KB", addedAt: "2d ago", mimeType: "image/png" },
  { id: "7", name: "Dungeon_Master_Guide.pdf", type: "pdf", size: "64 MB", addedAt: "3d ago", mimeType: "application/pdf" },
  { id: "8", name: "Battle_Theme.mp3", type: "audio", size: "5.2 MB", addedAt: "4d ago", mimeType: "audio/mpeg" },
];

const FOLDER_CONFIGS = [
  { type: "map" as const, label: "Maps", description: "Battlemaps & Terrain", icon: "map", accent: "text-blue-400", bg: "bg-blue-500/10", border: "hover:border-blue-500/50", bar: "bg-blue-500" },
  { type: "token" as const, label: "Tokens", description: "Characters & Portraits", icon: "person", accent: "text-violet-400", bg: "bg-violet-500/10", border: "hover:border-violet-500/50", bar: "bg-violet-500" },
  { type: "handout" as const, label: "Handouts", description: "Letters & Clues", icon: "description", accent: "text-amber-400", bg: "bg-amber-500/10", border: "hover:border-amber-500/50", bar: "bg-amber-500" },
  { type: "audio" as const, label: "Audio", description: "Ambience & SFX", icon: "music_note", accent: "text-green-400", bg: "bg-green-500/10", border: "hover:border-green-500/50", bar: "bg-green-500" },
  { type: "pdf" as const, label: "PDFs", description: "Rulebooks & Supplements", icon: "picture_as_pdf", accent: "text-red-400", bg: "bg-red-500/10", border: "hover:border-red-500/50", bar: "bg-red-500" },
  { type: "other" as const, label: "Other", description: "Miscellaneous files", icon: "folder", accent: "text-text-muted", bg: "bg-surface-dark-lighter", border: "hover:border-border-dark-heavy", bar: "bg-text-muted" },
];

const TYPE_TABS: { label: string; value: ResourceType }[] = [
  { label: "All", value: "all" },
  { label: "Maps", value: "map" },
  { label: "Tokens", value: "token" },
  { label: "Handouts", value: "handout" },
  { label: "Audio", value: "audio" },
  { label: "PDFs", value: "pdf" },
];

function getExt(mimeType: string): string {
  const map: Record<string, string> = {
    "image/jpeg": "JPG", "image/png": "PNG", "image/webp": "WEBP",
    "application/pdf": "PDF", "audio/mpeg": "MP3", "audio/ogg": "OGG",
  };
  return map[mimeType] ?? "FILE";
}

function ResourcePreview({ resource }: { resource: MockResource }) {
  const ext = getExt(resource.mimeType);
  if (resource.mimeType.startsWith("image/") && resource.url) {
    return (
      <div className="aspect-square rounded-lg bg-surface-dark-lighter overflow-hidden mb-2 relative">
        <img
          src={resource.url}
          alt={resource.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] text-white font-medium">
          {ext}
        </div>
      </div>
    );
  }
  if (resource.mimeType === "application/pdf") {
    return (
      <div className="aspect-square rounded-lg bg-surface-dark-lighter flex items-center justify-center mb-2 relative group-hover:bg-border-dark transition-colors">
        <span className="material-symbols-outlined text-[56px] text-red-400 group-hover:scale-110 transition-transform">picture_as_pdf</span>
        <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] text-white font-medium">PDF</div>
      </div>
    );
  }
  if (resource.mimeType.startsWith("audio/")) {
    return (
      <div className="aspect-square rounded-lg bg-surface-dark-lighter flex flex-col items-center justify-center mb-2 relative group-hover:bg-border-dark transition-colors">
        <div className="flex items-end justify-center gap-1 h-10">
          {[3, 5, 8, 4, 2].map((h, i) => (
            <div key={i} className="w-1.5 rounded-full bg-green-400" style={{ height: `${h * 4}px` }} />
          ))}
        </div>
        <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] text-white font-medium">MP3</div>
      </div>
    );
  }
  return (
    <div className="aspect-square rounded-lg bg-surface-dark-lighter flex items-center justify-center mb-2 relative group-hover:bg-border-dark transition-colors">
      <span className="material-symbols-outlined text-[56px] text-text-muted">insert_drive_file</span>
      <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] text-white font-medium">{ext}</div>
    </div>
  );
}

export const CampaignResources = () => {
  const { campaignId } = useParams<{ campaignId: string }>();
  const [activeType, setActiveType] = useState<ResourceType>("all");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isUploading, setIsUploading] = useState(false);
  const fileUploadRef = useRef<HTMLInputElement>(null);

  // TODO: replace with resourceService.getByCampaign(campaignId, activeType !== "all" ? activeType : undefined)
  const resources = MOCK_RESOURCES;

  const filtered = resources.filter((r) => {
    const matchesType = activeType === "all" || r.type === activeType;
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  const countByType = (type: MockResource["type"]) => resources.filter((r) => r.type === type).length;

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);
    // TODO: for each file, call resourceService.upload({ campaign_id: Number(campaignId), type: detectType(file) }, file)
    await new Promise((r) => setTimeout(r, 800));
    setIsUploading(false);
  };

  return (
    <main className="flex-1 flex flex-col min-w-0 bg-background-primary">
      {/* Toolbar */}
      <header className="flex h-16 items-center justify-between px-6 border-b border-border-dark shrink-0 bg-surface-dark">
        <div className="flex items-center gap-2 overflow-x-auto">
          {TYPE_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveType(tab.value)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg shrink-0 transition-colors ${
                activeType === tab.value
                  ? "bg-primary text-white shadow-sm"
                  : "text-text-muted hover:text-text-primary hover:bg-surface-hover"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* Search */}
          <div className="relative hidden sm:block">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
              <span className="material-symbols-outlined text-[18px]">search</span>
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search assets..."
              className="bg-surface-dark-lighter text-text-primary text-sm rounded-lg pl-9 pr-4 py-2 w-52 border border-border-dark focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* View toggle */}
          <div className="flex bg-surface-dark-lighter rounded-lg p-1 gap-1 border border-border-dark">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1 rounded transition-colors ${viewMode === "grid" ? "bg-surface-hover text-text-primary shadow-sm" : "text-text-muted hover:text-text-primary"}`}
            >
              <span className="material-symbols-outlined text-[18px]">grid_view</span>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1 rounded transition-colors ${viewMode === "list" ? "bg-surface-hover text-text-primary shadow-sm" : "text-text-muted hover:text-text-primary"}`}
            >
              <span className="material-symbols-outlined text-[18px]">list</span>
            </button>
          </div>

          {/* Upload */}
          <button
            onClick={() => fileUploadRef.current?.click()}
            disabled={isUploading}
            className="hidden sm:flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-lg shadow-primary/20 disabled:opacity-60"
          >
            {isUploading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <span className="material-symbols-outlined text-[18px]">upload</span>
            )}
            <span>{isUploading ? "Uploading..." : "Upload"}</span>
          </button>
          <input
            ref={fileUploadRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => handleUpload(e.target.files)}
          />
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 scroll-smooth flex flex-col gap-8">

        {/* Folders overview — only show on "all" tab */}
        {activeType === "all" && (
          <div>
            <h3 className="text-text-muted text-xs font-bold uppercase tracking-wider mb-4">Folders</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {FOLDER_CONFIGS.map((folder) => (
                <button
                  key={folder.type}
                  onClick={() => setActiveType(folder.type)}
                  className={`group flex flex-col p-4 bg-surface-dark rounded-xl border border-border-dark ${folder.border} transition-all cursor-pointer text-left relative overflow-hidden hover:bg-surface-hover`}
                >
                  <div className={`absolute top-0 left-0 w-1 h-full ${folder.bar} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2 rounded-lg ${folder.bg} ${folder.accent} transition-colors`}>
                      <span className="material-symbols-outlined text-[22px]">{folder.icon}</span>
                    </div>
                    <span className="text-text-muted text-xs font-medium">{countByType(folder.type)}</span>
                  </div>
                  <h4 className="text-text-primary font-semibold text-sm">{folder.label}</h4>
                  <p className="text-text-muted text-xs mt-0.5">{folder.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Files section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-text-muted text-xs font-bold uppercase tracking-wider">
              {activeType === "all" ? "All Assets" : FOLDER_CONFIGS.find((f) => f.type === activeType)?.label ?? "Files"}
              <span className="ml-2 text-text-muted/60 font-normal normal-case">{filtered.length} items</span>
            </h3>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
              <span className="material-symbols-outlined text-5xl text-text-muted/40">folder_open</span>
              <p className="text-text-muted">No assets found</p>
              <p className="text-text-muted/60 text-sm">Upload files or change the filter</p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filtered.map((resource) => (
                <div
                  key={resource.id}
                  className="group relative rounded-xl bg-surface-dark p-2 border border-border-dark hover:border-primary/50 cursor-pointer transition-colors"
                >
                  <ResourcePreview resource={resource} />
                  <div className="px-1">
                    <p className="text-text-primary text-sm font-medium truncate">{resource.name}</p>
                    <p className="text-text-muted text-xs truncate">{resource.size} &bull; {resource.addedAt}</p>
                  </div>
                  {/* Hover actions */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <button
                      className="bg-surface-dark border border-border-dark rounded-md p-1 text-text-muted hover:text-accent-red hover:border-accent-red/40 transition-colors"
                      title="Delete"
                      onClick={(e) => { e.stopPropagation(); /* TODO: resourceService.delete(resource.id) */ }}
                    >
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-border-dark rounded-xl border border-border-dark overflow-hidden">
              {filtered.map((resource) => {
                const ext = getExt(resource.mimeType);
                return (
                  <div
                    key={resource.id}
                    className="flex items-center gap-4 px-4 py-3 bg-surface-dark hover:bg-surface-hover transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-surface-dark-lighter flex items-center justify-center text-text-muted text-xs font-bold shrink-0">
                      {ext}
                    </div>
                    <p className="flex-1 text-text-primary text-sm font-medium truncate">{resource.name}</p>
                    <span className="text-text-muted text-xs hidden sm:block">{resource.size}</span>
                    <span className="text-text-muted text-xs hidden md:block">{resource.addedAt}</span>
                    <button
                      className="opacity-0 group-hover:opacity-100 text-text-muted hover:text-accent-red transition"
                      title="Delete"
                      onClick={() => { /* TODO: resourceService.delete(resource.id) */ }}
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};