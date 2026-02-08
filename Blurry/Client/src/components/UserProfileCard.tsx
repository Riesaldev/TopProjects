
export type UserProfile = {
  name: string;
  avatarUrl?: string;
  bio?: string;
  rating?: number;
};

type Props = {
  user: UserProfile;
};

export default function UserProfileCard({ user }: Props) {
  return (
    <div className="flex flex-col items-center border border-accent-400 rounded-lg p-4 shadow w-64 bg-primary-50">
      <img
        src={user.avatarUrl || "/public/globe.svg"}
        alt={user.name}
        className="w-20 h-20 rounded-full mb-2 object-cover"
      />
      <h3 className="font-bold text-lg mb-1">{user.name}</h3>
      {user.bio && <p className="text-accent-600 text-sm mb-2">{user.bio}</p>}
      {user.rating && (
        <span className="text-accent-400">{"★".repeat(Math.round(user.rating))}</span>
      )}
    </div>
  );
} 