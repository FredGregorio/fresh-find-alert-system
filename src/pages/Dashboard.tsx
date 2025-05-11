
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Header from "@/components/Header";
import VerificationItem from "@/components/VerificationItem";
import { 
  getVerificationItems, 
  getUrgentAlerts,
  initializeStorage,
  VerificationItem as VerificationItemType
} from "@/utils/storageUtils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const [items, setItems] = useState<VerificationItemType[]>([]);
  const [urgentCount, setUrgentCount] = useState(0);
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();
  
  // Initialize storage on first load
  useEffect(() => {
    initializeStorage();
    loadItems();
    
    // Refresh every minute to update timers
    const interval = setInterval(loadItems, 60000);
    return () => clearInterval(interval);
  }, []);
  
  const loadItems = () => {
    const allItems = getVerificationItems();
    setItems(allItems);
    
    const urgentAlerts = getUrgentAlerts();
    setUrgentCount(urgentAlerts.length);
  };
  
  const handleItemClick = (id: string) => {
    navigate(`/item/${id}`);
  };
  
  // Filter items based on active tab
  const filteredItems = items.filter(item => {
    if (activeTab === "all") return true;
    if (activeTab === "urgent") return item.isUrgent;
    return item.department === activeTab;
  });
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Verificação de Perecíveis" urgentCount={urgentCount} />
      
      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full mb-4 grid grid-cols-4">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="CARNES">Carnes</TabsTrigger>
            <TabsTrigger value="LATICINIOS">Laticínios</TabsTrigger>
            <TabsTrigger value="HORTIFRUTI">Hortifrúti</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-2">
            {filteredItems.map(item => (
              <VerificationItem 
                key={item.id} 
                item={item} 
                onClick={() => handleItemClick(item.id)} 
              />
            ))}
          </TabsContent>
          
          <TabsContent value="CARNES" className="space-y-2">
            {filteredItems.map(item => (
              <VerificationItem 
                key={item.id} 
                item={item} 
                onClick={() => handleItemClick(item.id)} 
              />
            ))}
          </TabsContent>
          
          <TabsContent value="LATICINIOS" className="space-y-2">
            {filteredItems.map(item => (
              <VerificationItem 
                key={item.id} 
                item={item} 
                onClick={() => handleItemClick(item.id)} 
              />
            ))}
          </TabsContent>
          
          <TabsContent value="HORTIFRUTI" className="space-y-2">
            {filteredItems.map(item => (
              <VerificationItem 
                key={item.id} 
                item={item} 
                onClick={() => handleItemClick(item.id)} 
              />
            ))}
          </TabsContent>
          
          <TabsContent value="urgent" className="space-y-2">
            {filteredItems.map(item => (
              <VerificationItem 
                key={item.id} 
                item={item} 
                onClick={() => handleItemClick(item.id)} 
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
