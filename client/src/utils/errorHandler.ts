import toast from "react-hot-toast";

// Track recent errors to prevent duplicates
const errorTracker: Record<string, number> = {};
const ERROR_DEBOUNCE_TIME = 5000; // 5 seconds

export const showErrorToast = (errorMessage: string) => {
  const now = Date.now();
  const lastShown = errorTracker[errorMessage];
  
  // If this error was shown recently, don't show it again
  if (lastShown && now - lastShown < ERROR_DEBOUNCE_TIME) {
    return;
  }
  
  // Show the error and track it
  toast.error(errorMessage);
  errorTracker[errorMessage] = now;
  
  // Clean up old entries
  setTimeout(() => {
    delete errorTracker[errorMessage];
  }, ERROR_DEBOUNCE_TIME);
};