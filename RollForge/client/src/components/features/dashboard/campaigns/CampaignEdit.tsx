import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCampaigns } from "@/hooks/useCampaigns";

interface InvitedPlayer {
  id: string;
  name: string;
  email: string;
  status: "pending" | "accepted";
}

export default function CampaignEdit() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);

  const { campaigns, createCampaign, updateCampaign, isLoading } = useCampaigns();

  const [name, setName] = useState("");
  const [system, setSystem] = useState("");
  const [description, setDescription] = useState("");
  const [_coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [playerInput, setPlayerInput] = useState("");
  const [players, setPlayers] = useState<InvitedPlayer[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Populate form in edit mode
  useEffect(() => {
    if (isEditMode && campaigns.length > 0) {
      const campaign = campaigns.find((c) => c.id === Number(id));
      if (campaign) {
        setName(campaign.name);
        setSystem(campaign.system ?? "");
        setDescription(campaign.description ?? "");
        if (campaign.cover_image) setCoverPreview(campaign.cover_image);
      }
    }
  }, [isEditMode, id, campaigns]);

  const handleImageChange = (file: File) => {
    setCoverImage(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageChange(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) handleImageChange(file);
  };

  const handleInvitePlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerInput.trim()) return;
    const newPlayer: InvitedPlayer = {
      id: crypto.randomUUID(),
      name: playerInput.trim(),
      email: playerInput.includes("@")
        ? playerInput.trim()
        : `${playerInput.trim().toLowerCase().replace(/\s+/g, "")}@example.com`,
      status: "pending",
    };
    setPlayers((prev) => [...prev, newPlayer]);
    setPlayerInput("");
  };

  const handleRemovePlayer = (playerId: string) => {
    setPlayers((prev) => prev.filter((p) => p.id !== playerId));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setIsSaving(true);
      if (isEditMode && id) {
        await updateCampaign(Number(id), { name: name.trim(), system, description });
      } else {
        await createCampaign({ name: name.trim(), system, description });
      }
      navigate("/campaigns");
    } catch {
      // useToast is invoked internally by the hook
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
      <form onSubmit={handleSave} className="max-w-3xl mx-auto flex flex-col gap-6">

        {/* Page title + actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-text-primary">
              {isEditMode ? "Edit Campaign" : "New Campaign"}
            </h2>
            <p className="text-text-muted text-sm mt-1">
              {isEditMode
                ? "Update the details of your campaign."
                : "Set up the basics of your new adventure."}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate("/campaigns")}
              className="px-4 py-2 text-sm font-medium text-text-muted bg-surface-dark border border-border-dark rounded-lg hover:bg-surface-hover hover:text-text-primary transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving || isLoading || !name.trim()}
              className="px-5 py-2 text-sm font-bold text-white bg-primary hover:bg-primary-hover rounded-lg transition-colors shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSaving && (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
              )}
              {isEditMode ? "Save Changes" : "Create Campaign"}
            </button>
          </div>
        </div>

        {/* Campaign Details */}
        <section className="bg-surface-dark border border-border-dark rounded-xl p-6 flex flex-col gap-5">
          <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-primary">campaign</span>
            Campaign Details
          </h3>

          <div className="flex flex-col gap-1">
            <label htmlFor="camp-name" className="text-sm font-medium text-text-secondary">
              Campaign Name <span className="text-accent-red">*</span>
            </label>
            <input
              id="camp-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Curse of Strahd"
              required
              className="px-4 py-2.5 bg-surface-dark-lighter border border-border-dark rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="camp-system" className="text-sm font-medium text-text-secondary">
              Game System
            </label>
            <input
              id="camp-system"
              type="text"
              value={system}
              onChange={(e) => setSystem(e.target.value)}
              placeholder="e.g. D&D 5e, Pathfinder 2e, Call of Cthulhu..."
              className="px-4 py-2.5 bg-surface-dark-lighter border border-border-dark rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="camp-desc" className="text-sm font-medium text-text-secondary">
              Description
            </label>
            <textarea
              id="camp-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your campaign, its setting, and what awaits the adventurers..."
              rows={4}
              className="px-4 py-2.5 bg-surface-dark-lighter border border-border-dark rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition resize-none"
            />
          </div>
        </section>

        {/* Cover Image */}
        <section className="bg-surface-dark border border-border-dark rounded-xl p-6 flex flex-col gap-4">
          <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-primary">image</span>
            Cover Image
          </h3>

          <div
            role="button"
            tabIndex={0}
            aria-label="Upload cover image"
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition select-none ${
              isDragging
                ? "border-primary bg-primary/10"
                : "border-border-dark-heavy hover:border-primary/60 hover:bg-primary/5"
            }`}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            {coverPreview ? (
              <img
                src={coverPreview}
                alt="Cover preview"
                className="max-h-48 mx-auto rounded-lg object-cover shadow-md"
              />
            ) : (
              <div className="flex flex-col items-center gap-2">
                <span className="material-symbols-outlined text-5xl text-text-muted">cloud_upload</span>
                <p className="text-text-muted text-sm">
                  Drag & drop your cover image, or{" "}
                  <span className="text-primary font-medium underline underline-offset-2">click to select</span>
                </p>
                <p className="text-text-muted/60 text-xs">PNG, JPG, WEBP — max 5 MB</p>
              </div>
            )}
          </div>

          {coverPreview && (
            <button
              type="button"
              onClick={() => { setCoverImage(null); setCoverPreview(null); }}
              className="self-start text-sm text-accent-red hover:underline flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[18px]">delete</span>
              Remove image
            </button>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileInput}
          />
          {/* TODO: on save, upload coverImage via campaignService.uploadCover(id, coverImage) */}
        </section>

        {/* Invite Players */}
        <section className="bg-surface-dark border border-border-dark rounded-xl p-6 flex flex-col gap-4">
          <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-primary">group_add</span>
            Invite Players
            <span className="text-xs text-text-muted font-normal ml-1">(optional, for now saves locally)</span>
          </h3>

          <div className="flex gap-3">
            <input
              type="text"
              value={playerInput}
              onChange={(e) => setPlayerInput(e.target.value)}
              placeholder="Player name or email..."
              className="flex-1 px-4 py-2.5 bg-surface-dark-lighter border border-border-dark rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleInvitePlayer(e))}
            />
            <button
              type="button"
              onClick={handleInvitePlayer}
              className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-hover rounded-lg transition-colors"
            >
              Invite
            </button>
          </div>

          {players.length > 0 ? (
            <ul className="flex flex-col gap-2">
              {players.map((player) => (
                <li
                  key={player.id}
                  className="flex items-center justify-between px-4 py-3 bg-surface-dark-lighter border border-border-dark rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm uppercase">
                      {player.name[0]}
                    </div>
                    <div>
                      <p className="text-text-primary text-sm font-medium">{player.name}</p>
                      <p className="text-text-muted text-xs">{player.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-accent-yellow/20 text-accent-yellow">
                      Pending
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemovePlayer(player.id)}
                      className="text-text-muted hover:text-accent-red transition-colors"
                      aria-label="Remove player"
                    >
                      <span className="material-symbols-outlined text-[18px]">person_remove</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-text-muted text-sm text-center py-3">
              No players invited yet. Your adventure awaits allies!
            </p>
          )}
        </section>

      </form>
    </div>
  );
}