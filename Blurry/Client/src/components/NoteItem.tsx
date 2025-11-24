
type Note = {
  id: string;
  content: string;
  date: string;
};

type Props = {
  note: Note;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export default function NoteItem({ note, onEdit, onDelete }: Props) {
  return (
    <div className="border rounded p-3 mb-2 bg-white shadow flex justify-between items-center">
      <div>
        <p className="text-gray-800 mb-1">{note.content}</p>
        <span className="text-xs text-gray-400">{note.date}</span>
      </div>
      <div className="flex gap-2">
        {onEdit && (
          <button onClick={() => onEdit(note.id)} className="text-primary-600 hover:underline text-xs">Editar</button>
        )}
        {onDelete && (
          <button onClick={() => onDelete(note.id)} className="text-accent-500 hover:underline text-xs">Eliminar</button>
        )}
      </div>
    </div>
  );
} 