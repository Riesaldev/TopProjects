import type { NotificationPreference } from '../../../types/profile';

interface NotificationPreferencesProps {
  notifications: NotificationPreference[];
  onNotificationChange: (type: 'email' | 'whatsapp', field: 'enabled' | 'frequency', value: boolean | string) => void;
}

export default function NotificationPreferences({
  notifications,
  onNotificationChange,
}: NotificationPreferencesProps) {
  const emailNotif = notifications.find(n => n.type === 'email');
  const whatsappNotif = notifications.find(n => n.type === 'whatsapp');

  const NotificationCard = ({
    title,
    description,
    type,
    notif,
    isBeta,
  }: {
    title: string;
    description: string;
    type: 'email' | 'whatsapp';
    notif: NotificationPreference | undefined;
    isBeta?: boolean;
  }) => {
    if (!notif) return null;

    return (
      <div className="flex items-start gap-4 p-4 rounded-lg bg-surface-dark-lighter border border-border-dark">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <label className="text-base font-semibold text-text-primary">{title}</label>
              {isBeta && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-500/20 text-green-500 uppercase tracking-wide">Beta</span>
              )}
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                className="sr-only peer"
                type="checkbox"
                checked={notif.enabled}
                onChange={(e) => onNotificationChange(type, 'enabled', e.target.checked)}
              />
              <div className="w-11 h-6 bg-border-dark peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-border-dark after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          <p className="text-xs text-text-muted mb-3">{description}</p>
          {type === 'email' ? (
            <select
              className="w-full bg-surface-dark text-text-primary text-xs rounded border border-border-dark px-2 py-1 focus:ring-1 focus:ring-primary focus:border-primary disabled:opacity-50"
              value={notif.frequency}
              onChange={(e) => onNotificationChange(type, 'frequency', e.target.value)}
              disabled={!notif.enabled}
            >
              <option>Instant</option>
              <option>Daily Digest</option>
              <option>Weekly Summary</option>
            </select>
          ) : (
            <div className="flex items-center gap-2 text-xs text-text-muted">
              <select
                className="w-full bg-surface-dark text-text-primary text-xs rounded border border-border-dark px-2 py-1 focus:ring-1 focus:ring-primary focus:border-primary disabled:opacity-50"
                value={notif.frequency}
                onChange={(e) => onNotificationChange(type, 'frequency', e.target.value)}
                disabled={!notif.enabled}
              >
                <option>Instant</option>
                <option>Daily Digest</option>
                <option>Weekly Summary</option>
              </select>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-surface-dark rounded-xl p-6 shadow-sm border border-border-dark-heavy">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
          <span className="material-symbols-outlined">notifications_active</span>
        </div>
        <div>
          <h3 className="text-lg font-bold text-text-primary">Notification Preferences</h3>
          <p className="text-sm text-text-muted">Manage how you receive updates about game sessions.</p>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <NotificationCard
          title="Email Alerts"
          description="Get session summaries and campaign invites."
          type="email"
          notif={emailNotif}
        />
        <NotificationCard
          title="WhatsApp"
          description="Receive instant pings when your turn is starting."
          type="whatsapp"
          notif={whatsappNotif}
          isBeta
        />
      </div>
    </div>
  );
}
