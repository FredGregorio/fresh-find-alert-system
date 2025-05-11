
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { getUrgentAlerts, UrgentAlert } from "@/utils/storageUtils";
import { formatDate } from "@/utils/timeUtils";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const UrgenciesPage = () => {
  const [alerts, setAlerts] = useState<UrgentAlert[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    loadAlerts();
  }, []);
  
  const loadAlerts = () => {
    const urgentAlerts = getUrgentAlerts();
    setAlerts(urgentAlerts);
  };
  
  const handleItemClick = (itemId: string) => {
    navigate(`/item/${itemId}`);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Itens em Urgência" showBack={true} />
      
      <div className="p-4">
        {alerts.length > 0 ? (
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-red-500"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold">{alert.itemName}</h3>
                    <p className="text-sm text-gray-600">
                      {alert.department} - {alert.location}
                    </p>
                  </div>
                  <div className="flex items-center bg-red-100 px-2 py-1 rounded">
                    <AlertTriangle className="h-4 w-4 text-red-600 mr-1" />
                    <span className="text-sm text-red-600 font-medium">Urgente</span>
                  </div>
                </div>
                
                <div className="bg-amber-50 p-2 rounded mb-2">
                  <p className="text-sm">{alert.reason}</p>
                </div>
                
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>Reportado por {alert.reportedBy}</span>
                  <span>{formatDate(alert.timestamp)}</span>
                </div>
                
                <Button 
                  className="w-full mt-3"
                  onClick={() => handleItemClick(alert.itemId)}
                >
                  Ver Detalhes
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <div className="mx-auto bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <AlertTriangle className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="font-medium text-gray-600">Nenhuma urgência reportada</h3>
            <p className="text-gray-500 text-sm mt-1">
              Todas as verificações estão em dia
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UrgenciesPage;
