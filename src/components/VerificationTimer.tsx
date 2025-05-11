
import { useState, useEffect } from "react";
import { calculateTimeRemaining, formatTimeRemaining, VERIFICATION_WINDOWS } from "@/utils/timeUtils";
import { Clock, AlertTriangle } from "lucide-react";

interface VerificationTimerProps {
  lastVerificationTime: number;
  department: 'CARNES' | 'LATICINIOS' | 'HORTIFRUTI';
  isUrgent: boolean;
}

const VerificationTimer = ({ lastVerificationTime, department, isUrgent }: VerificationTimerProps) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const departmentWindow = VERIFICATION_WINDOWS[department];
  
  useEffect(() => {
    // Calculate initial time
    const calcTimeRemaining = () => {
      const remaining = calculateTimeRemaining(lastVerificationTime, departmentWindow);
      setTimeRemaining(remaining);
    };
    
    calcTimeRemaining();
    
    // Update every minute
    const timer = setInterval(calcTimeRemaining, 60000);
    
    return () => clearInterval(timer);
  }, [lastVerificationTime, departmentWindow]);
  
  if (isUrgent) {
    return (
      <div className="flex items-center text-amber-600">
        <AlertTriangle className="h-4 w-4 mr-1" />
        <span className="font-bold">Em Urgência</span>
      </div>
    );
  }
  
  if (timeRemaining <= 0) {
    return (
      <div className="flex items-center text-red-600">
        <Clock className="h-4 w-4 mr-1" />
        <span className="font-bold">Precisa Verificar</span>
      </div>
    );
  }
  
  return (
    <div className="flex items-center text-green-600">
      <Clock className="h-4 w-4 mr-1" />
      <span className="font-bold">{formatTimeRemaining(timeRemaining)}</span>
    </div>
  );
};

export default VerificationTimer;
