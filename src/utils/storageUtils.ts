
import { VERIFICATION_WINDOWS } from './timeUtils';

// Types
export interface VerificationItem {
  id: string;
  name: string;
  department: 'CARNES' | 'LATICINIOS' | 'HORTIFRUTI';
  location: string;
  lastVerificationTime: number;
  isUrgent: boolean;
  urgentReason?: string;
  urgentBy?: string;
  urgentTime?: number;
  verificationHistory: VerificationRecord[];
}

export interface VerificationRecord {
  timestamp: number;
  verifiedBy: string;
}

export interface UrgentAlert {
  itemId: string;
  itemName: string;
  department: string;
  location: string;
  reason: string;
  reportedBy: string;
  timestamp: number;
}

// Initial items data
const INITIAL_ITEMS: VerificationItem[] = [
  {
    id: '1',
    name: 'Frango Resfriado',
    department: 'CARNES',
    location: 'Freezer 01',
    lastVerificationTime: Date.now() - 60 * 60 * 1000, // 1 hour ago
    isUrgent: false,
    verificationHistory: []
  },
  {
    id: '2',
    name: 'Carne Bovina',
    department: 'CARNES',
    location: 'Freezer 02',
    lastVerificationTime: Date.now() - 150 * 60 * 1000, // 2.5 hours ago
    isUrgent: false,
    verificationHistory: []
  },
  {
    id: '3',
    name: 'Leite Integral',
    department: 'LATICINIOS',
    location: 'Geladeira 01',
    lastVerificationTime: Date.now() - 120 * 60 * 1000, // 2 hours ago
    isUrgent: false,
    verificationHistory: []
  },
  {
    id: '4',
    name: 'Queijos Especiais',
    department: 'LATICINIOS',
    location: 'Geladeira 02',
    lastVerificationTime: Date.now() - 300 * 60 * 1000, // 5 hours ago
    isUrgent: false,
    verificationHistory: []
  },
  {
    id: '5',
    name: 'Alface Americana',
    department: 'HORTIFRUTI',
    location: 'Prateleira 01',
    lastVerificationTime: Date.now() - 200 * 60 * 1000, // 3.3 hours ago
    isUrgent: false,
    verificationHistory: []
  }
];

// Initialize local storage with initial data
export const initializeStorage = (): void => {
  if (!localStorage.getItem('verificationItems')) {
    localStorage.setItem('verificationItems', JSON.stringify(INITIAL_ITEMS));
  }
  
  if (!localStorage.getItem('urgentAlerts')) {
    localStorage.setItem('urgentAlerts', JSON.stringify([]));
  }
};

// Get all verification items
export const getVerificationItems = (): VerificationItem[] => {
  const items = localStorage.getItem('verificationItems');
  return items ? JSON.parse(items) : [];
};

// Get a single verification item
export const getVerificationItem = (id: string): VerificationItem | undefined => {
  const items = getVerificationItems();
  return items.find(item => item.id === id);
};

// Get urgent alerts
export const getUrgentAlerts = (): UrgentAlert[] => {
  const alerts = localStorage.getItem('urgentAlerts');
  return alerts ? JSON.parse(alerts) : [];
};

// Record a verification
export const recordVerification = (id: string, username: string): void => {
  const items = getVerificationItems();
  const itemIndex = items.findIndex(item => item.id === id);
  
  if (itemIndex !== -1) {
    const updatedItems = [...items];
    const item = { ...updatedItems[itemIndex] };
    
    // Update verification time
    item.lastVerificationTime = Date.now();
    
    // Add to history
    item.verificationHistory = [
      { timestamp: Date.now(), verifiedBy: username },
      ...item.verificationHistory
    ];
    
    // Clear urgent status if it was urgent
    item.isUrgent = false;
    item.urgentReason = undefined;
    item.urgentBy = undefined;
    item.urgentTime = undefined;
    
    updatedItems[itemIndex] = item;
    localStorage.setItem('verificationItems', JSON.stringify(updatedItems));
  }
};

// Record an urgent alert
export const recordUrgentAlert = (
  itemId: string, 
  reason: string, 
  username: string
): void => {
  // Update the item
  const items = getVerificationItems();
  const itemIndex = items.findIndex(item => item.id === itemId);
  
  if (itemIndex !== -1) {
    const updatedItems = [...items];
    const item = { ...updatedItems[itemIndex] };
    
    item.isUrgent = true;
    item.urgentReason = reason;
    item.urgentBy = username;
    item.urgentTime = Date.now();
    
    updatedItems[itemIndex] = item;
    localStorage.setItem('verificationItems', JSON.stringify(updatedItems));
    
    // Add to urgent alerts
    const alerts = getUrgentAlerts();
    const newAlert: UrgentAlert = {
      itemId: item.id,
      itemName: item.name,
      department: item.department,
      location: item.location,
      reason,
      reportedBy: username,
      timestamp: Date.now()
    };
    
    localStorage.setItem('urgentAlerts', JSON.stringify([newAlert, ...alerts]));
  }
};
