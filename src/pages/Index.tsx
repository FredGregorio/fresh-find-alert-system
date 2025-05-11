
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Index = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg overflow-hidden shadow-lg">
        <div className="flex flex-col md:flex-row">
          {/* Left side with logo */}
          <div className="bg-white p-8 flex flex-col items-center justify-center space-y-4 w-full md:w-1/2">
            <div className="text-amber-500">
              <img 
                src="/lovable-uploads/edb48870-2fa0-4719-915e-5456b9ff8491.png" 
                alt="SGAS Logo" 
                className="w-32 h-auto mx-auto"
              />
            </div>
            <h1 className="text-4xl font-bold text-gray-600 text-center">SGAS</h1>
            <p className="text-sm text-gray-500 text-center">Sistema de Gestão de Armazém Simplificado</p>
          </div>

          {/* Right side with login form */}
          <div className="bg-primary p-8 w-full md:w-1/2 relative">
            <div className="flex flex-col items-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-1">NOSSO</h2>
              <p className="text-white text-sm">ATACAREJO</p>
              <h3 className="text-xl font-bold text-white mt-4">Login</h3>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-white text-sm uppercase">Usuário</label>
                <Input
                  type="text"
                  placeholder="Usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-white text-sm uppercase">Senha</label>
                <Input
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-white text-primary hover:bg-gray-100 mt-4"
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
