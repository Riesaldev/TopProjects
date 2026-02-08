
export type Contact = {
  id: string;
  name: string;
  avatarUrl?: string;
};

type Props = {
  contacts: Contact[];
  onSelect?: (id: string) => void;
};

export default function ContactList({ contacts, onSelect }: Props) {
  return (
    <ul className="w-full max-w-md mx-auto divide-y divide-gray-200">
      {contacts.map((contact) => (
        <li
          key={contact.id}
          className="flex items-center gap-3 py-3 cursor-pointer hover:bg-gray-50 px-2 rounded"
          onClick={() => onSelect?.(contact.id)}
        >
          <img
            src={contact.avatarUrl || "/public/globe.svg"}
            alt={contact.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-medium">{contact.name}</span>
        </li>
      ))}
    </ul>
  );
} 