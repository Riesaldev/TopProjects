import { useState } from 'react';
import { mockUserData } from '../../../data/mockProfile';
import { useProfileForm } from '../../../hooks/useProfileForm';
import ProfileInfo from './ProfileInfo';
import NotificationPreferences from './NotificationPreferences';
import CharacterVault from './CharacterVault';
import ProfileActionBar from './ProfileActionBar';

export default function UserProfile() {
  const {
    editedData,
    hasChanges,
    errors,
    isSaving,
    handleInputChange,
    handleBadgeColorChange,
    handleNotificationChange,
    validateAndSave,
    reset,
  } = useProfileForm(mockUserData);

  const [selectedClass, setSelectedClass] = useState<string>('All Classes');
  const [saveError, setSaveError] = useState<string | undefined>();

  const handleSave = async () => {
    setSaveError(undefined);
    const success = await validateAndSave();
    if (!success) {
      setSaveError(errors.server || 'Validation failed. Please check your information.');
    }
  };

  const handleCancel = () => {
    setSaveError(undefined);
    reset();
    setSelectedClass('All Classes');
  };

  return (
    <main className="flex-1 w-full max-w-8xl mx-auto px-4 py-8 md:px-8 lg:py-12 flex flex-col lg:flex-row gap-20">
      {/* Left Sidebar */}
      <ProfileInfo
        data={editedData}
        errors={errors}
        onDisplayNameChange={(value) => handleInputChange('displayName', value)}
        onEmailChange={(value) => handleInputChange('email', value)}
        onPhoneChange={(value) => handleInputChange('phone', value)}
        onBadgeColorChange={handleBadgeColorChange}
      />

      {/* Action Bar (Mobile) */}
      <div className="lg:hidden">
        <ProfileActionBar
          hasChanges={hasChanges}
          isSaving={isSaving}
          error={saveError}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>

      {/* Right Content */}
      <section className="flex-1 flex flex-col gap-8 min-w-0">
        <NotificationPreferences
          notifications={editedData.notifications}
          onNotificationChange={handleNotificationChange}
        />

        <CharacterVault
          characters={editedData.characters}
          selectedClass={selectedClass}
          onClassChange={setSelectedClass}
        />

        {/* Bottom Action Bar (Desktop) */}
        <div className="hidden lg:block mt-auto">
          <ProfileActionBar
            hasChanges={hasChanges}
            isSaving={isSaving}
            error={saveError}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>
      </section>
    </main>
  );
}