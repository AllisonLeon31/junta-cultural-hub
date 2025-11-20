import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, X, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm transition-all duration-300"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold text-primary transition-colors">
              Junta.pe
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-foreground transition-colors hover:text-primary"
            >
              Inicio
            </Link>
            <Link
              to="/eventos"
              className="text-foreground transition-colors hover:text-primary"
            >
              Eventos
            </Link>
            <Link
              to="/sobre-nosotros"
              className="text-foreground transition-colors hover:text-primary"
            >
              Sobre Nosotros
            </Link>
            <Link
              to="/preguntas"
              className="text-foreground transition-colors hover:text-primary"
            >
              Preguntas
            </Link>
            <Link
              to="/politicas"
              className="text-foreground transition-colors hover:text-primary"
            >
              Políticas
            </Link>
          </nav>

          {/* Auth Button */}
          <div className="hidden md:block">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate("/studio")}>
                    Creator Studio
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="default"
                onClick={() => navigate("/user-select")}
              >
                Iniciar Sesión
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="text-foreground" />
            ) : (
              <Menu className="text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-border py-4 space-y-4">
            <Link
              to="/"
              className="block px-4 py-2 text-foreground hover:bg-secondary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link
              to="/eventos"
              className="block px-4 py-2 text-foreground hover:bg-secondary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Eventos
            </Link>
            <Link
              to="/sobre-nosotros"
              className="block px-4 py-2 text-foreground hover:bg-secondary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sobre Nosotros
            </Link>
            <Link
              to="/preguntas"
              className="block px-4 py-2 text-foreground hover:bg-secondary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Preguntas
            </Link>
            <Link
              to="/politicas"
              className="block px-4 py-2 text-foreground hover:bg-secondary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Políticas
            </Link>
            <div className="px-4">
              {user ? (
                <div className="space-y-2">
                  <Button
                    className="w-full"
                    onClick={() => {
                      navigate("/studio");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Creator Studio
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Cerrar Sesión
                  </Button>
                </div>
              ) : (
                <Button
                  className="w-full"
                  onClick={() => {
                    navigate("/user-select");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Iniciar Sesión
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
