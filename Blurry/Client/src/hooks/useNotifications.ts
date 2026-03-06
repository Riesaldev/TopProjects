import { useCallback } from 'react';
import { useNotifications as useNotificationsContext, FeedbackOutcome, ToastType } from '@/components/NotificationsContext';

interface UseNotificationsReturn {
  showToast: (message: string, type?: ToastType) => void;
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showInfo: (message: string) => void;
  showWarning: (message: string) => void;
  showPartial: (message: string) => void;
  showOperationFeedback: (action: string, outcome: FeedbackOutcome, detail?: string) => void;
}

export function useNotifications(): UseNotificationsReturn {
  const {
    showToast,
    showSuccess,
    showError,
    showInfo,
    showWarning,
    showOperationFeedback,
  } = useNotificationsContext();

  const showPartial = useCallback((message: string) => {
    showWarning(message);
  }, [showWarning]);

  return {
    showToast,
    showSuccess,
    showError,
    showInfo,
    showWarning,
    showPartial,
    showOperationFeedback,
  };
}
