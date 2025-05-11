
// Department verification windows in minutes
export const VERIFICATION_WINDOWS = {
  CARNES: 120, // 2 hours
  LATICINIOS: 240, // 4 hours
  HORTIFRUTI: 360, // 6 hours
};

// Calculate time remaining in minutes
export const calculateTimeRemaining = (
  lastVerificationTime: number,
  departmentWindow: number
): number => {
  const currentTime = Date.now();
  const timeSinceLastVerification = (currentTime - lastVerificationTime) / (1000 * 60);
  return Math.max(0, departmentWindow - timeSinceLastVerification);
};

// Format minutes as hours and minutes
export const formatTimeRemaining = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = Math.floor(minutes % 60);
  
  if (hours === 0) {
    return `${mins}m`;
  }
  
  return `${hours}h ${mins}m`;
};

// Format date to dd/mm/yyyy HH:MM
export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Get verification status based on time remaining
export const getVerificationStatus = (
  timeRemaining: number,
  isUrgent: boolean
): 'verified' | 'needs-verification' | 'urgent' => {
  if (isUrgent) return 'urgent';
  return timeRemaining > 0 ? 'verified' : 'needs-verification';
};
