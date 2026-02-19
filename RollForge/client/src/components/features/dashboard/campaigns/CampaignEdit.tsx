import { useState, useRef } from "react";
import ProfileHeader from "../../profile/ProfileHeader";

interface Player {
  id: string;
  name: string;
  email: string;
  status: "online" | "offline";
  accepted: boolean;
}

interface CampaignEditProps {
  initialName?: string;
  initialSystem?: string;
  initialDescription?: string;
  onCancel?: () => void;
  onSave?: (data: { name: string; system: string; description: string; coverImage: File | null }) => void;
}

export default function CampaignEdit({
  initialName = "",
  initialSystem = "",
  initialDescription = "",
  onCancel,
  onSave,
}: CampaignEditProps) {
  const [name, setName] = useState(initialName);
  const [system, setSystem] = useState(initialSystem);
  const [description, setDescription] = useState(initialDescription);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [playerInput, setPlayerInput] = useState("");
  const [players, setPlayers] = useState<Player[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    const newPlayer: Player = {
      id: crypto.randomUUID(),
      name: playerInput.trim(),
      email: `${playerInput.trim().toLowerCase().replace(/\s/g, "")}@example.com`,
      status: "offline",
      accepted: false,
    };
    setPlayers((prev) => [...prev, newPlayer]);
    setPlayerInput("");
  };

  const handleRemovePlayer = (id: string) => {
    setPlayers((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave?.({ name, system, description, coverImage });
  };

  return (
    <div className="flex min-h-screen w-full flex-col overflow-hidden bg-background-primary">
      <ProfileHeader />
      <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth text-white bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDUn4yJA4CFyH_qCIiLzmeCpFaelK2JKr7NdSjUQemmPXGXvN2sl8tO1Wc7M-Fv-bgHMecm3wQq_okEqZ4e4Bq8TwMwbO8H4MVj1I_HDRJJ1OpZ6v-cEVtgeTrBc3uHM13hpFFKakBVHsL24VD3j3YjxJzGV5L7uvwnHKJKlcDyzyRnQh5CPgDjuZo3bwTlTF-lHpHteJZsD7Ig1mxA0c60j5lrY6TSpBnNHBH0xL_3O7_gx5k22h_dIM1h9Po_lMHVkPLiVFhbklw')" }}
      >
        <div className="max-w-5xl mx-auto flex flex-col gap-4 bg-surface-dark p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">
            Create New Campaign
          </h2>
          <p className="text-slate-500 text-base md:text-lg">
            Let's start by setting up the basics of your new adventure.
          </p>
        </div>

        {/* Header con nombre y botones */}
        <section className="flex flex-row justify-between items-center max-w-5xl mx-auto mt-8 p-6 bg-surface-dark rounded-lg shadow-lg">
          <span className="text-white text-xl font-semibold">
            {name || "Untitled Campaign"}
          </span>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition"
            >
              Save Campaign
            </button>
          </div>
        </section>

        {/* Formulario principal */}
        <section className="max-w-5xl mx-auto mt-6 p-6 bg-surface-dark rounded-lg shadow-lg flex flex-col gap-6">
          <h3 className="text-xl font-bold text-white">Campaign Details</h3>
          <form className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-sm font-medium text-slate-300">
                Campaign Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter campaign name..."
                className="px-4 py-2 bg-background-primary border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="system" className="text-sm font-medium text-slate-300">
                Game System
              </label>
              <input
                type="text"
                id="system"
                value={system}
                onChange={(e) => setSystem(e.target.value)}
                placeholder="e.g. D&D 5e, Pathfinder..."
                className="px-4 py-2 bg-background-primary border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="description" className="text-sm font-medium text-slate-300">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your campaign..."
                rows={4}
                className="px-4 py-2 bg-background-primary border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>
          </form>
        </section>

        {/* Drag & Drop imagen de portada */}
        <section className="max-w-5xl mx-auto mt-6 p-6 bg-surface-dark rounded-lg shadow-lg flex flex-col gap-4">
          <h3 className="text-xl font-bold text-white">Cover Image</h3>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${isDragging ? "border-primary bg-primary/10" : "border-gray-600 hover:border-gray-400"
              }`}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            {coverPreview ? (
              <img
                src={coverPreview}
                alt="Cover preview"
                className="max-h-48 mx-auto rounded-md object-cover"
              />
            ) : (
              <>
                <span className="material-symbols-outlined text-5xl text-gray-500">cloud_upload</span>
                <p className="text-gray-500 mt-2">
                  Drag and drop your cover image here, or{" "}
                  <span className="text-primary underline">click to select</span>
                </p>
                <p className="text-gray-600 text-sm mt-1">PNG, JPG, WEBP up to 5MB</p>
              </>
            )}
          </div>
          {coverPreview && (
            <button
              type="button"
              onClick={() => { setCoverImage(null); setCoverPreview(null); }}
              className="self-start px-3 py-1 text-sm bg-red-700 text-white rounded-md hover:bg-red-800 transition"
            >
              Remove Image
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            id="cover-image"
            onChange={handleFileInput}
          />
        </section>

        {/* Invitar jugadores */}
        <section className="max-w-5xl mx-auto mt-6 p-6 bg-surface-dark rounded-lg shadow-lg flex flex-col gap-4">
          <h3 className="text-xl font-bold text-white">Invite Players</h3>
          <form onSubmit={handleInvitePlayer} className="flex items-center gap-4">
            <input
              type="text"
              value={playerInput}
              onChange={(e) => setPlayerInput(e.target.value)}
              placeholder="Player's name or email"
              className="flex-1 px-4 py-2 border border-gray-600 rounded-md bg-background-primary text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition"
            >
              Invite Player
            </button>
          </form>

          {/* Lista de jugadores */}
          {players.length > 0 && (
            <ul className="flex flex-col gap-3 mt-2">
              {players.map((player) => (
                <li
                  key={player.id}
                  className="flex items-center justify-between px-4 py-3 bg-background-primary rounded-md border border-gray-700"
                >
                  <div className="flex items-center gap-3">
                    {/* Indicador online/offline */}
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${player.status === "online" ? "bg-green-500" : "bg-gray-500"
                        }`}
                    />
                    <div className="flex flex-col">
                      <span className="text-white font-medium">{player.name}</span>
                      <span className="text-gray-500 text-sm">{player.email}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${player.accepted
                        ? "bg-green-700/30 text-green-400"
                        : "bg-yellow-700/30 text-yellow-400"
                        }`}
                    >
                      {player.accepted ? "Accepted" : "Pending"}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemovePlayer(player.id)}
                      className="text-red-500 hover:text-red-400 transition"
                      title="Remove player"
                    >
                      <span className="material-symbols-outlined text-xl">person_remove</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {players.length === 0 && (
            <p className="text-gray-600 text-sm text-center py-4">
              No players invited yet.
            </p>
          )}
        </section>
      </main>
    </div>
  );
}