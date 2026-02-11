import { useState, useCallback, useMemo } from 'react';
import type { UserProfileData } from '../types/profile';
import { validateProfileData } from '../utils/validation';

export const useProfileForm = (initialData: UserProfileData) => {
  const [editedData, setEditedData] = useState<UserProfileData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  const hasChanges = useMemo(() => {
    return JSON.stringify(editedData) !== JSON.stringify(initialData);
  }, [editedData, initialData]);

  const handleInputChange = useCallback((field: keyof UserProfileData, value: string) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleBadgeColorChange = useCallback((color: string) => {
    setEditedData(prev => ({
      ...prev,
      badgeColor: color,
    }));
  }, []);

  const handleNotificationChange = useCallback(
    (type: 'email' | 'whatsapp', field: 'enabled' | 'frequency', value: boolean | string) => {
      setEditedData(prev => ({
        ...prev,
        notifications: prev.notifications.map(notif =>
          notif.type === type
            ? { ...notif, [field]: value }
            : notif
        ),
      }));
    },
    []
  );

  const validateAndSave = useCallback(async () => {
    const validationErrors = validateProfileData(editedData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return false;
    }

    setIsSaving(true);
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Profile saved:', editedData);
      return true;
    } catch (error) {
      setErrors({ server: 'Failed to save profile. Please try again.' });
      console.error(error);
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [editedData]);

  const reset = useCallback(() => {
    setEditedData(initialData);
    setErrors({});
  }, [initialData]);

  return {
    editedData,
    hasChanges,
    errors,
    isSaving,
    handleInputChange,
    handleBadgeColorChange,
    handleNotificationChange,
    validateAndSave,
    reset,
  };
};
