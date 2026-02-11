import { useState } from 'react';

interface Character {
  id: string;
  name: string;
  class: string;
  race: string;
  level: number;
  hp: number;
  ac: number;
  mainStat: string;
  mainStatValue: number;
  backgroundImage: string;
  portraitImage: string;
}

interface NotificationPreference {
  type: 'email' | 'whatsapp';
  enabled: boolean;
  frequency: string;
}

interface UserProfileData {
  displayName: string;
  email: string;
  avatar: string;
  role: string;
  level: number;
  campaigns: number;
  hoursPlayed: string;
  badgeColor: string;
  characters: Character[];
  notifications: NotificationPreference[];
}

const mockUserData: UserProfileData = {
  displayName: 'DungeonMaster99',
  email: 'DungeonMaster99@gmail.com',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALPnNUlc7GZE66xlXiAR_p4tgOeF7_3sroifjyELgHwm-wSCjEynXcW62WJb4gM9raClv7wjLIVIQpyDXrrwuYXOMwaeMn2wlSxJ-pdmBGSOReKcE8I5KhY-OB-kAWzznxncj7NCWuE-LMPQKwe-AL7aTc1WjkYIC5FxATetVKa1opEL2FhFaV52dgA5UHB7OwK40GWAMhpoU1XAwuhJnZ-ObIw_3On9fj7vOpmIBngVuM7ky1MfjuBmkjWtAOA_MekqXiBmeJWv0',
  role: 'Veteran Player',
  level: 42,
  campaigns: 12,
  hoursPlayed: '450h',
  badgeColor: '#00ff9d',
  characters: [
    {
      id: '1',
      name: 'Valeros',
      class: 'Fighter',
      race: 'Human',
      level: 5,
      hp: 48,
      ac: 18,
      mainStat: 'STR',
      mainStatValue: 16,
      backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBBg3ia67AXtYlxNTMGAjEWjb3SyLCyl7ouR7wy-ldI158j2BRG0TZT-kCPkl-0R9-QhUUOwW7UtvIU-2sT2c3KrJCpSzdFeCLQPUY88AMnLKJ4KNi75jq5LMILjQ3Yfz95mHE6klsWOtdtyEMNq-j8p6-9Lp8bOD80Fmhpa1p_Z41FRf1OFPftdIzZGCpK9HC-V49pHOe6elXjht41AvzyKwlxGeH3Fd2ICCVAw3yx5MjI_Nu2zpnWHBUqTACbMxuPvJC32Ta7eKc")',
      portraitImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIu0jDUZcF381rl03Ccv9Bf-kZ2W-hQCc5i8R1JKTDzbyVds8NWR98TZF937ZP7WUNQ90HQTzeX0emPy7WfXQRyWYYEdXHQEO2hI8Rb7R4Zkk4HMRjtF0EUvLDLssx-qK8NA8P7I37pP2nDzSK5GmfQdukmfob8OAK-dl_IUmHEX5xa-9Fs7Phqze66a2cbVqgPLkzSu5tJ4M-XvAsodpyAlNpwOjcUcaJduunOekJU7GdYU09I6jngaMDsPq-UrkjzlHUzz895AI',
    },
    {
      id: '2',
      name: 'Merisiel',
      class: 'Rogue',
      race: 'Elf',
      level: 3,
      hp: 24,
      ac: 16,
      mainStat: 'DEX',
      mainStatValue: 18,
      backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBPsaxDRa2kgGINlcJvLdpOyYbS09KvkmInFuuf67U2UF41z5lvNM_e7IYdw2ACKqOcmZ6SpDNNWV7iALVUL7VpuJQcygqcst4W5qsf0QWYu9ETtL51i_RfbPsQM0YiboAeB1Q7Sr9hmcw8ZirtVMUlqin338UAhQ4XDMnz4z23OBUUN5JxKFAPa3hnrTlH6Jfp8G8MsCuNOgj8FLXbgEirCg3xELkqwVGV5nLL_sy9s2LlMRGu1TiHZuw_hYfHQN3gtVVt1HIzCNc")',
      portraitImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2Hzskrc9V2kwjdS-DIB5Eac_wc2FwXo_d1fw9Z2BdJRCezlAY04FUvVqRrG_ELJ5Q1HAgan3v_lNVXt_hPppR_lPdjn4RO-UDhlIRD3kalbjBFXl9YFgc7lMt1nG5lCbwpprJ2UgGOvvGadWVYMo0DuGtaMLQlbCPPwIiz2tnNBGmMKQrPUjKa9FbnXy0JoAkY1zOxxnNb0f-ICjw9LdWwcL_2s-kGxjTL3TTdWWdfODxZOTgVvP35UghFcJbm1Zn5x_2H1of3zU',
    },
    {
      id: '3',
      name: 'Ezren',
      class: 'Wizard',
      race: 'Human',
      level: 9,
      hp: 52,
      ac: 12,
      mainStat: 'INT',
      mainStatValue: 20,
      backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBZnhEDwnw0rGhauJExVVNnQR7iuq1MNwVpssQfrUcmu8sUbEzndIBRtkSltNCZqobu7vM1hrbY0zPGM99sBmEp4ddtxxl5We9veJFTuGal7naWg6IZhzCKFnQPvhlbUsWywL2aeBQ4PDW3fjq8WSP8OZ1lJ9zcIKXvUspAQ50M1oPfEuO16dB4XmRwANox6U_ZgRei8mstPXQ14Fzask6D9ldZ0kO8dkvBoh4ENYCW-J-wHDWkXMcsX1D5zqAvS9QRVSkwYD8r330")',
      portraitImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDap-tlbV5WHZfpoU2e7PnCZeCg2owfRMfmjtqX8qcC88v2YmKqLiFIYsix6ZBpDFEs-Pj4-XexRww-QG4zeyWqFqMIHZaMULc31xZ26o9Isni7j14SNEfYzl4u14QS-lRj6hVJ7fwhLMrceCZv6MBI6GbrW4XW7fIOkeMmwISPwMSI1EDqXfypTw2GyYgHM14MEzrr-iLzBKdUuDc7D3WBHFdUSkxoP2cPqvT9pxDliUXvaAifqClcDyyejqyWpK1-9aDkRA6VaMY',
    },
  ],
  notifications: [
    { type: 'email', enabled: true, frequency: 'Instant' },
    { type: 'whatsapp', enabled: false, frequency: 'Instant' },
  ],
};

export default function UserProfile() {
  const [userData, setUserData] = useState<UserProfileData>(mockUserData);
  const [editedData, setEditedData] = useState<UserProfileData>(mockUserData);
  const [hasChanges, setHasChanges] = useState(false);
  const [selectedClass, setSelectedClass] = useState<string>('All Classes');

  const handleInputChange = (field: keyof UserProfileData, value: string) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value,
    }));
    setHasChanges(true);
  };

  const handleBadgeColorChange = (color: string) => {
    setEditedData(prev => ({
      ...prev,
      badgeColor: color,
    }));
    setHasChanges(true);
  };

  const handleNotificationChange = (type: 'email' | 'whatsapp', field: 'enabled' | 'frequency', value: boolean | string) => {
    setEditedData(prev => ({
      ...prev,
      notifications: prev.notifications.map(notif =>
        notif.type === type
          ? { ...notif, [field]: value }
          : notif
      ),
    }));
    setHasChanges(true);
  };

  const handleSaveChanges = () => {
    setUserData(editedData);
    setHasChanges(false);
    // Aquí iría la llamada a la API para guardar cambios
    console.log('Cambios guardados:', editedData);
  };

  const handleCancel = () => {
    setEditedData(userData);
    setHasChanges(false);
  };

  const filteredCharacters = selectedClass === 'All Classes'
    ? editedData.characters
    : editedData.characters.filter(char => char.class === selectedClass);

  const emailNotif = editedData.notifications.find(n => n.type === 'email');
  const whatsappNotif = editedData.notifications.find(n => n.type === 'whatsapp');

  return (
    <main className="flex-1 w-full max-w-8xl mx-auto px-4 py-8 md:px-8 lg:py-12 flex flex-col lg:flex-row gap-20">
      {/* Left Sidebar: Identity */}
      <aside className="w-full lg:w-80 shrink-0 space-y-6">
        <div className="bg-surface-dark rounded-xl p-6 shadow-sm border border-border-dark-heavy relative overflow-hidden group">
          {/* Decorative background blur */}
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-primary/20 to-transparent pointer-events-none"></div>
          <div className="relative flex flex-col items-center">
            <div className="relative mb-4 group/avatar">
              <div className="size-32 rounded-full overflow-hidden border-4 border-surface-dark shadow-lg bg-slate-800">
                <img alt={editedData.displayName} className="w-full h-full object-cover" src={editedData.avatar} />
              </div>
              <button className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 group-hover/avatar:opacity-100 transition-opacity rounded-full">
                <span className="material-symbols-outlined text-3xl">photo_camera</span>
              </button>
              {/* Online Status Indicator */}
              <div className="absolute bottom-2 right-2 size-6 rounded-full border-4 border-surface-dark shadow-sm z-10"
                style={{ backgroundColor: editedData.badgeColor }}></div>
            </div>
            <h2 className="text-2xl font-bold text-text-primary">{editedData.displayName}</h2>
            <p className="text-text-muted text-sm font-medium ">{editedData.email}</p>
            <p className="text-text-muted text-sm font-medium mb-6">{editedData.role} | Lvl {editedData.level}</p>
            <div className="w-full grid grid-cols-2 gap-4 mb-6">
              <div className="bg-surface-dark-lighter rounded-lg p-3 text-center">
                <span className="block text-2xl font-bold text-primary">{editedData.campaigns}</span>
                <span className="text-xs text-text-muted uppercase tracking-wide">Campaigns</span>
              </div>
              <div className="bg-surface-dark-lighter rounded-lg p-3 text-center">
                <span className="block text-2xl font-bold text-primary">{editedData.hoursPlayed}</span>
                <span className="text-xs text-text-muted uppercase tracking-wide">Played</span>
              </div>
            </div>
            <div className="w-full space-y-4 border-t border-border-dark pt-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-text-secondary">Display Name</label>
                <div className="flex items-center bg-surface-dark-lighter rounded-lg px-3 py-2 border border-border-dark focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                  <span className="material-symbols-outlined text-text-muted mr-2 text-[20px]">person</span>
                  <input
                    className="bg-transparent border-none text-sm w-full focus:outline-none text-text-primary p-0"
                    type="text"
                    value={editedData.displayName}
                    onChange={(e) => handleInputChange('displayName', e.target.value)}
                  />
                </div>
                <label className="text-sm font-semibold text-text-secondary">Email</label>
                <div className="flex items-center bg-surface-dark-lighter rounded-lg px-3 py-2 border border-border-dark focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                  <span className="material-symbols-outlined text-text-muted mr-2 text-[20px]">email</span>
                  <input
                    className="bg-transparent border-none text-sm w-full focus:outline-none text-text-primary p-0"
                    type="email"
                    value={editedData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
              </div>
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
                    value={editedData.badgeColor}
                    onChange={(e) => handleBadgeColorChange(e.target.value)}
                  />
                  <div className="flex flex-1 gap-2 justify-end">
                    <button
                      onClick={() => handleBadgeColorChange('#3713ec')}
                      className="size-6 rounded-full bg-primary hover:scale-110 transition-transform ring-2 ring-offset-2 ring-offset-surface-dark ring-transparent hover:ring-text-secondary"
                    ></button>
                    <button
                      onClick={() => handleBadgeColorChange('#ff4d4f')}
                      className="size-6 rounded-full bg-accent-red hover:scale-110 transition-transform ring-2 ring-offset-2 ring-offset-surface-dark ring-transparent hover:ring-text-secondary"
                    ></button>
                    <button
                      onClick={() => handleBadgeColorChange('#f5c518')}
                      className="size-6 rounded-full bg-accent-yellow hover:scale-110 transition-transform ring-2 ring-offset-2 ring-offset-surface-dark ring-transparent hover:ring-text-secondary"
                    ></button>
                    <button
                      onClick={() => handleBadgeColorChange('#0bda6c')}
                      className="size-6 rounded-full bg-accent-green hover:scale-110 transition-transform ring-2 ring-offset-2 ring-offset-surface-dark ring-transparent hover:ring-text-secondary"
                    ></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom Action Bar */}
        <div className="z-40">
          <div className="bg-surface-dark/80 backdrop-blur-md border border-border-dark p-4 rounded-xl flex items-center justify-between shadow-xl">
            <span className={`text-sm ${hasChanges ? 'text-accent-yellow' : 'text-text-muted'} hidden sm:inline`}>
              {hasChanges ? 'Cambios sin guardar.' : 'Sin cambios.'}
            </span>
            <div className="flex gap-3 ml-auto w-full sm:w-auto">
              <button
                onClick={handleCancel}
                disabled={!hasChanges}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg border border-border-dark text-text-secondary font-medium text-sm hover:bg-surface-dark-lighter transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                disabled={!hasChanges}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg bg-primary text-white font-medium text-sm hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25 disabled:opacity-50"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Right Content: Settings & Vault */}
      <section className="flex-1 flex flex-col gap-8 min-w-0">
        {/* Notifications Section */}
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
            {/* Email Alerts */}
            {emailNotif && (
              <div className="flex items-start gap-4 p-4 rounded-lg bg-surface-dark-lighter border border-border-dark">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-base font-semibold text-text-primary">Email Alerts</label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        className="sr-only peer"
                        type="checkbox"
                        checked={emailNotif.enabled}
                        onChange={(e) => handleNotificationChange('email', 'enabled', e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-border-dark peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-border-dark after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  <p className="text-xs text-text-muted mb-3">Get session summaries and campaign invites.</p>
                  <select
                    className="w-full bg-surface-dark text-text-primary text-xs rounded border border-border-dark px-2 py-1 focus:ring-1 focus:ring-primary focus:border-primary"
                    value={emailNotif.frequency}
                    onChange={(e) => handleNotificationChange('email', 'frequency', e.target.value)}
                  >
                    <option>Instant</option>
                    <option>Daily Digest</option>
                    <option>Weekly Summary</option>
                  </select>
                </div>
              </div>
            )}
            {/* WhatsApp Alerts */}
            {whatsappNotif && (
              <div className="flex items-start gap-4 p-4 rounded-lg bg-surface-dark-lighter border border-border-dark">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <label className="text-base font-semibold text-text-primary">WhatsApp</label>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-500/20 text-green-500 uppercase tracking-wide">Beta</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        className="sr-only peer"
                        type="checkbox"
                        checked={whatsappNotif.enabled}
                        onChange={(e) => handleNotificationChange('whatsapp', 'enabled', e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-border-dark peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-border-dark after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  <p className="text-xs text-text-muted mb-3">Receive instant pings when your turn is starting.</p>
                  <div className="flex items-center gap-2 text-xs text-text-muted">
                    <span className="material-symbols-outlined text-[14px]">phone_iphone</span>
                    <span>+1 (555) •••-••89</span>
                    <a className="text-primary hover:underline ml-auto" href="#">Update</a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Character Vault Section */}
        <div className="flex-1 flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                <span className="material-symbols-outlined">swords</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary">Character Vault</h3>
                <p className="text-sm text-text-muted">Manage your heroes across all realms.</p>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-text-muted">
                  <span className="material-symbols-outlined text-[18px]">filter_list</span>
                </span>
                <select
                  className="pl-8 pr-8 py-2 bg-surface-dark text-text-primary text-sm rounded-lg border border-border-dark focus:outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                >
                  <option>All Classes</option>
                  <option>Fighter</option>
                  <option>Wizard</option>
                  <option>Rogue</option>
                </select>
              </div>
              <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined text-[18px]">add</span>
                <span className="hidden sm:inline">New Character</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCharacters.map((character) => (
              <div key={character.id} className="group relative bg-surface-dark rounded-xl overflow-hidden border border-border-dark hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/5 cursor-pointer">
                <div
                  className="h-32 w-full bg-cover bg-center relative"
                  style={{ backgroundImage: character.backgroundImage }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-dark to-transparent"></div>
                  <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-white border border-white/10">
                    Lvl {character.level}
                  </div>
                </div>
                <div className="p-4 relative">
                  <div className="absolute -top-10 left-4 size-16 rounded-lg border-4 border-surface-dark overflow-hidden bg-slate-800 shadow-lg">
                    <img alt={character.name} className="w-full h-full object-cover" src={character.portraitImage} />
                  </div>
                  <div className="ml-16 mb-2">
                    <h4 className="font-bold text-text-primary leading-tight">{character.name}</h4>
                    <span className="text-xs text-text-muted">{character.race} {character.class}</span>
                  </div>
                  {/* Mini Stats */}
                  <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-border-dark">
                    <div className="text-center">
                      <span className="block text-xs text-text-muted uppercase">HP</span>
                      <span className="font-bold text-accent-red">{character.hp}</span>
                    </div>
                    <div className="text-center border-l border-border-dark">
                      <span className="block text-xs text-text-muted uppercase">AC</span>
                      <span className="font-bold text-accent-maps">{character.ac}</span>
                    </div>
                    <div className="text-center border-l border-border-dark">
                      <span className="block text-xs text-text-muted uppercase">{character.mainStat}</span>
                      <span className="font-bold text-accent-yellow">{character.mainStatValue}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* Create New Placeholder */}
            <div className="group relative flex flex-col items-center justify-center bg-surface-dark-lighter rounded-xl border-2 border-dashed border-border-dark-heavy hover:border-primary hover:bg-primary/5 transition-all cursor-pointer h-full min-h-56">
              <div className="size-14 rounded-full bg-border-dark group-hover:bg-primary text-text-muted group-hover:text-white flex items-center justify-center transition-colors mb-3">
                <span className="material-symbols-outlined text-3xl">add</span>
              </div>
              <span className="text-sm font-bold text-text-secondary group-hover:text-primary transition-colors">Create New Character</span>
              <span className="text-xs text-text-muted mt-1">Start from scratch or import</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}