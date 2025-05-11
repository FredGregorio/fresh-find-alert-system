
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  title: string;
  showBack?: boolean;
  urgentCount?: number;
}

const Header = ({ title, showBack = false, urgentCount = 0 }: HeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <header className="bg-primary text-white p-4 sticky top-0 z-10 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {showBack && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(-1)} 
              className="text-white hover:bg-primary/80"
            >
              ←
            </Button>
          )}
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative text-white hover:bg-primary/80"
              >
                <Bell className="h-5 w-5" />
                {urgentCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {urgentCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => navigate('/urgencies')}>
                Ver Urgências
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/')}>
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
