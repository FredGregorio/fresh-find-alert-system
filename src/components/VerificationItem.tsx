
import { getVerificationStatus } from "@/utils/timeUtils";
import { VerificationItem as VerificationItemType } from "@/utils/storageUtils";
import VerificationTimer from "./VerificationTimer";
import { AlertTriangle, Clock, BellRing } from "lucide-react";
import { formatDate } from "@/utils/timeUtils";
import { calculateTimeRemaining, VERIFICATION_WINDOWS } from "@/utils/timeUtils";

interface VerificationItemProps {
  item: VerificationItemType;
  onClick: () => void;
}

const VerificationItem = ({ item, onClick }: VerificationItemProps) => {
  const timeRemaining = calculateTimeRemaining(
    item.lastVerificationTime,
    VERIFICATION_WINDOWS[item.department]
  );
  
  const status = getVerificationStatus(timeRemaining, item.isUrgent);
  
  let statusIcon;
  let statusClass;
  
  switch (status) {
    case 'urgent':
      statusIcon = <AlertTriangle className="h-5 w-5 text-amber-600" />;
      statusClass = "status-urgent";
      break;
    case 'needs-verification':
      statusIcon = <Clock className="h-5 w-5 text-red-600" />;
      statusClass = "status-needs-verification";
      break;
    case 'verified':
    default:
      statusIcon = <Clock className="h-5 w-5 text-green-600" />;
      statusClass = "status-verified";
      break;
  }
  
  return (
    <div 
      onClick={onClick}
      className={`border rounded-lg p-4 mb-2 cursor-pointer hover:shadow-md transition-shadow ${statusClass}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg">{item.name}</h3>
          <p className="text-sm text-gray-600">{item.location}</p>
        </div>
        <div className="flex items-center">
          {statusIcon}
        </div>
      </div>
      
      <div className="mt-2 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Última verificação: {formatDate(item.lastVerificationTime)}
        </div>
        <VerificationTimer 
          lastVerificationTime={item.lastVerificationTime}
          department={item.department}
          isUrgent={item.isUrgent}
        />
      </div>
      
      {item.isUrgent && (
        <div className="mt-2 flex items-center bg-amber-100 p-2 rounded text-sm">
          <BellRing className="h-4 w-4 text-amber-600 mr-1" />
          <span className="text-amber-800">{item.urgentReason}</span>
        </div>
      )}
    </div>
  );
};

export default VerificationItem;
