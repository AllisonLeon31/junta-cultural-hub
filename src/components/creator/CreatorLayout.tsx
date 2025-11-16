import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Calendar, 
  Settings, 
  HelpCircle,
  Plus,
  Menu,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CreatorLayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: "/creator", label: "Dashboard", icon: LayoutDashboard },
  { path: "/creator/events", label: "Eventos", icon: Calendar },
  { path: "/creator/settings", label: "Configuración", icon: Settings },
  { path: "/creator/faq", label: "FAQ", icon: HelpCircle },
];

export const CreatorLayout = ({ children }: CreatorLayoutProps) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Top Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
        <div className="flex h-16 items-center gap-4 px-6">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          
          <Link to="/creator" className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
              Junta.pe
            </span>
            <span className="text-sm text-muted-foreground">Creator Studio</span>
          </Link>

          <div className="flex-1" />

          <Button asChild>
            <Link to="/creator/events/new">
              <Plus className="h-4 w-4" />
              Crear Evento
            </Link>
          </Button>

          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:flex w-64 flex-col border-r bg-card min-h-[calc(100vh-4rem)]">
          <nav className="flex-1 space-y-1 p-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
