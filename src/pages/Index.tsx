
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!username || !password) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }
    
    // In a real app, this would validate credentials against a backend
    // For demo purposes, we'll just navigate to dashboard
    toast.success("Login realizado com sucesso");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md bg-white rounded-lg overflow-hidden shadow-xl">
        <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'}`}>
          {/* Logo and title section */}
          <div className="bg-white p-6 md:p-8 flex flex-col items-center justify-center space-y-6 w-full md:w-1/2">
            <div className="w-full max-w-[180px] mx-auto transform hover:scale-105 transition-transform duration-300 fadeIn">
              <img 
                src="/lovable-uploads/8c508f49-3a48-492c-a233-071227efde2c.png" 
                alt="SGAS Logo" 
                className="w-full h-auto drop-shadow-lg"
              />
            </div>
            <div className="text-center space-y-1 fadeIn" style={{ animationDelay: "0.2s" }}>
              <h2 className="font-bold text-primary text-xl md:text-2xl tracking-tight">Sistema de Gestão</h2>
              <h3 className="text-gray-700 text-md md:text-lg font-medium">de Armazém Simplificado</h3>
            </div>
          </div>

          {/* Login form section */}
          <div className="bg-primary p-6 md:p-8 w-full md:w-1/2 relative">
            <div className="flex flex-col items-center mb-8">
              <h3 className="text-xl font-bold text-white">Login</h3>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="text-white text-sm font-medium uppercase block mb-1.5">Usuário</label>
                <Input
                  type="text"
                  placeholder="Usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-white/90 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="text-white text-sm font-medium uppercase block mb-1.5">Senha</label>
                <Input
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/90 focus:bg-white transition-colors"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-white text-primary hover:bg-gray-100 mt-4 text-base font-medium shadow-md hover:shadow-lg transition-all"
              >
                Entrar
              </Button>
            </form>
            <div className="wave-bottom"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
