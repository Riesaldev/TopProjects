import type { UserProfileData } from '../../../types/profile';
import { BADGE_COLORS } from '../../../data/mockProfile';

interface ProfileInfoProps {
  data: UserProfileData;
  errors: Record<string, string>;
  onDisplayNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onBadgeColorChange: (color: string) => void;
}

export default function ProfileInfo({
  data,
  errors,
  onDisplayNameChange,
  onEmailChange,
  onPhoneChange,
  onBadgeColorChange,
}: ProfileInfoProps) {
  return (
    <aside className="w-full lg:w-80 shrink-0 space-y-6">
      <div className="bg-surface-dark rounded-xl p-6 shadow-sm border border-border-dark-heavy relative overflow-hidden group">
        {/* Decorative background blur */}
        <div className="absolute top-0 left-0 w-full h-24 bg-linear-to-b from-primary/20 to-transparent pointer-events-none"></div>
        <div className="relative flex flex-col items-center">
          <div className="relative mb-4 group/avatar">
            <div className="size-32 rounded-full overflow-hidden border-4 border-surface-dark shadow-lg bg-slate-800">
              <img alt={data.displayName} className="w-full h-full object-cover" src={data.avatar} />
            </div>
            <button className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 group-hover/avatar:opacity-100 transition-opacity rounded-full">
              <span className="material-symbols-outlined text-3xl">photo_camera</span>
            </button>
            {/* Online Status Indicator */}
            <div
              className="absolute bottom-2 right-2 size-6 rounded-full border-4 border-surface-dark shadow-sm z-10"
              style={{ backgroundColor: data.badgeColor }}
            ></div>
          </div>

          <h2 className="text-2xl font-bold text-text-primary">{data.displayName}</h2>
          <p className="text-text-muted text-sm font-medium">{data.email}</p>
          <p className="text-text-muted text-sm font-medium mb-6">
            {data.role} | Lvl {data.level}
          </p>

          {/* Stats Grid */}
          <div className="w-full grid grid-cols-2 gap-4 mb-6">
            <div className="bg-surface-dark-lighter rounded-lg p-3 text-center">
              <span className="block text-2xl font-bold text-primary">{data.campaigns}</span>
              <span className="text-xs text-text-muted uppercase tracking-wide">Campaigns</span>
            </div>
            <div className="bg-surface-dark-lighter rounded-lg p-3 text-center">
              <span className="block text-2xl font-bold text-primary">{data.hoursPlayed}</span>
              <span className="text-xs text-text-muted uppercase tracking-wide">Played</span>
            </div>
          </div>

          {/* Edit Form */}
          <div className="w-full space-y-4 border-t border-border-dark pt-6">
            {/* Display Name Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-secondary">Display Name</label>
              <div className={`flex items-center bg-surface-dark-lighter rounded-lg px-3 py-2 border transition-all ${errors.displayName
                ? 'border-accent-red focus-within:ring-1 focus-within:ring-accent-red'
                : 'border-border-dark focus-within:border-primary focus-within:ring-1 focus-within:ring-primary'
                }`}>
                <span className="material-symbols-outlined text-text-muted mr-2 text-[20px]">person</span>
                <input
                  className="bg-transparent border-none text-sm w-full focus:outline-none text-text-primary p-0"
                  type="text"
                  value={data.displayName}
                  onChange={(e) => onDisplayNameChange(e.target.value)}
                  aria-invalid={!!errors.displayName}
                />
              </div>
              {errors.displayName && (
                <p className="text-xs text-accent-red">{errors.displayName}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-secondary">Email</label>
              <div className={`flex items-center bg-surface-dark-lighter rounded-lg px-3 py-2 border transition-all ${errors.email
                ? 'border-accent-red focus-within:ring-1 focus-within:ring-accent-red'
                : 'border-border-dark focus-within:border-primary focus-within:ring-1 focus-within:ring-primary'
                }`}>
                <span className="material-symbols-outlined text-text-muted mr-2 text-[20px]">email</span>
                <input
                  className="bg-transparent border-none text-sm w-full focus:outline-none text-text-primary p-0"
                  type="email"
                  value={data.email}
                  onChange={(e) => onEmailChange(e.target.value)}
                  aria-invalid={!!errors.email}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-accent-red">{errors.email}</p>
              )}
            </div>

            {/*Phone Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-secondary">Phone</label>
              <div className={`flex items-center bg-surface-dark-lighter rounded-lg px-3 py-2 border transition-all ${errors.phone
                ? 'border-accent-red focus-within:ring-1 focus-within:ring-accent-red'
                : 'border-border-dark focus-within:border-primary focus-within:ring-1 focus-within:ring-primary'
                }`}>
                <span className="material-symbols-outlined text-text-muted mr-2 text-[20px]">phone</span>
                <input
                  className="bg-transparent border-none text-sm w-full focus:outline-none text-text-primary p-0"
                  type="tel"
                  value={data.phone}
                  onChange={(e) => onPhoneChange(e.target.value)}
                  aria-invalid={!!errors.phone}
                />
              </div>
              {errors.phone && (
                <p className="text-xs text-accent-red">{errors.phone}</p>
              )}
            </div>

            {/* Badge Color Selector */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-secondary flex justify-between">
                Online Badge Color
                <span className="text-xs font-normal text-text-muted">Preview above</span>
              </label>
              <div className="flex gap-2 items-center">
                <input
                  className="h-10 w-12 bg-transparent border-none cursor-pointer p-0 rounded overflow-hidden"
                  title="Choose your custom color"
                  type="color"
                  value={data.badgeColor}
                  onChange={(e) => onBadgeColorChange(e.target.value)}
                />
                <div className="flex flex-1 gap-2 justify-end">
                  {BADGE_COLORS.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => onBadgeColorChange(color.value)}
                      className={`size-6 rounded-full hover:scale-110 transition-transform ring-2 ${data.badgeColor === color.value
                        ? `ring-offset-2 ring-offset-surface-dark ring-text-secondary`
                        : 'ring-offset-2 ring-offset-surface-dark ring-transparent hover:ring-text-secondary'
                        }`}
                      style={{ backgroundColor: color.value }}
                      title={color.label}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
