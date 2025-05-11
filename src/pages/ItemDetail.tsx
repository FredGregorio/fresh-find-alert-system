
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Header from "@/components/Header";
import UrgentAlertModal from "@/components/UrgentAlertModal";
import { Button } from "@/components/ui/button";
import { 
  getVerificationItem, 
  recordVerification, 
  recordUrgentAlert
} from "@/utils/storageUtils";
import { formatDate } from "@/utils/timeUtils";
import { Clock, AlertTriangle } from "lucide-react";
import VerificationTimer from "@/components/VerificationTimer";

const ItemDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<any>(null);
  const [isUrgentModalOpen, setIsUrgentModalOpen] = useState(false);
  
  useEffect(() => {
    if (id) {
      loadItemDetails();
    } else {
      navigate('/dashboard');
    }
  }, [id]);
  
  const loadItemDetails = () => {
    if (id) {
      const itemDetails = getVerificationItem(id);
      if (itemDetails) {
        setItem(itemDetails);
      } else {
        toast.error("Item não encontrado");
        navigate('/dashboard');
      }
    }
  };
  
  const handleVerification = () => {
    if (id) {
      recordVerification(id, "Usuário Atual");  // In a real app, use the logged-in user
      toast.success("Verificação registrada com sucesso");
      loadItemDetails();
    }
  };
  
  const handleUrgentConfirm = (reason: string) => {
    if (id) {
      recordUrgentAlert(id, reason, "Usuário Atual");  // In a real app, use the logged-in user
      toast.success("Alerta de urgência registrado");
      loadItemDetails();
    }
  };
  
  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Detalhes do Item" showBack={true} />
        <div className="p-4">
          <p>Carregando...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title={item.name} showBack={true} />
      
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-bold">{item.name}</h2>
              <p className="text-gray-600">{item.location}</p>
              <p className="text-sm text-gray-500">Setor: {item.department}</p>
            </div>
            
            <div className="flex items-center">
              <VerificationTimer 
                lastVerificationTime={item.lastVerificationTime}
                department={item.department}
                isUrgent={item.isUrgent}
              />
            </div>
          </div>
          
          {item.isUrgent && (
            <div className="bg-amber-100 border border-amber-300 rounded-md p-3 mb-4">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 mr-2" />
                <div>
                  <h3 className="font-semibold text-amber-800">Alerta de Urgência</h3>
                  <p className="text-sm text-amber-700">Motivo: {item.urgentReason}</p>
                  <p className="text-xs text-amber-600 mt-1">
                    Reportado por {item.urgentBy} em {formatDate(item.urgentTime || Date.now())}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex space-x-2 mb-6">
            <Button 
              onClick={handleVerification} 
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <Clock className="h-4 w-4 mr-2" />
              Verificar Agora
            </Button>
            
            <Button 
              onClick={() => setIsUrgentModalOpen(true)}
              variant="destructive"
              className="flex-1"
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Acelerar Troca
            </Button>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Histórico de Verificações</h3>
            {item.verificationHistory.length > 0 ? (
              <div className="border rounded-md divide-y">
                {item.verificationHistory.map((record: any, index: number) => (
                  <div key={index} className="p-2 flex justify-between">
                    <span className="text-sm">{formatDate(record.timestamp)}</span>
                    <span className="text-sm text-gray-600">por {record.verifiedBy}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">Nenhum histórico disponível</p>
            )}
          </div>
        </div>
      </div>
      
      <UrgentAlertModal 
        isOpen={isUrgentModalOpen}
        onClose={() => setIsUrgentModalOpen(false)}
        onConfirm={handleUrgentConfirm}
        itemName={item.name}
      />
    </div>
  );
};

export default ItemDetail;
