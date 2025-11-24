import Button from "@/components/Button";

export default function EditProfileForm() {
  return (
    <form className="flex flex-col gap-4 w-full max-w-sm mx-auto mt-6">
      <label className="font-semibold">Nombre</label>
      <input type="text" placeholder="Tu nombre" className="border p-2 rounded" />
      <label className="font-semibold">Biografía</label>
      <textarea placeholder="Cuéntanos sobre ti" className="border p-2 rounded" rows={3} />
      <label className="font-semibold">Avatar</label>
      <input
        type="file"
        className="border p-2 rounded"
        title="Selecciona tu avatar"
        placeholder="Selecciona tu avatar"
      />
      <Button type="submit">Guardar cambios</Button>
    </form>
  );
} 