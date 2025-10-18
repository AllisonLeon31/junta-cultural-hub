import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Safely get user data
  const userType = typeof window !== 'undefined' ? localStorage.getItem("userType") : null;
  const userEmail = typeof window !== 'undefined' ? localStorage.getItem("userEmail") : null;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("userType");
      localStorage.removeItem("userEmail");
    }
    navigate("/");
  };

  const handleDashboard = () => {
    if (userType === "donor") {
      navigate("/donor-dashboard");
    } else if (userType === "promoter") {
      navigate("/promoter-dashboard");
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1
              className={`text-2xl font-bold transition-colors ${
                isScrolled ? "text-primary" : "text-white"
              }`}
            >
              Junta.pe
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`transition-colors hover:text-primary ${
                isScrolled ? "text-foreground" : "text-white"
              }`}
            >
              Inicio
            </Link>
            <Link
              to="/sobre-nosotros"
              className={`transition-colors hover:text-primary ${
                isScrolled ? "text-foreground" : "text-white"
              }`}
            >
              Sobre Nosotros
            </Link>
            <Link
              to="/preguntas"
              className={`transition-colors hover:text-primary ${
                isScrolled ? "text-foreground" : "text-white"
              }`}
            >
              Preguntas
            </Link>
            <Link
              to="/politicas"
              className={`transition-colors hover:text-primary ${
                isScrolled ? "text-foreground" : "text-white"
              }`}
            >
              Políticas
            </Link>
          </nav>

          {/* Auth Button */}
          <div className="hidden md:block">
            {userEmail ? (
              <div className="flex items-center gap-3">
                <Button
                  variant={isScrolled ? "default" : "outline"}
                  className={
                    isScrolled
                      ? ""
                      : "border-white text-white hover:bg-white hover:text-primary"
                  }
                  onClick={handleDashboard}
                >
                  {userType === "donor" ? "Mi Impacto" : "Mis Eventos"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className={isScrolled ? "" : "text-white hover:bg-white/10"}
                >
                  Salir
                </Button>
              </div>
            ) : (
              <Button
                variant={isScrolled ? "default" : "outline"}
                className={
                  isScrolled
                    ? ""
                    : "border-white text-white hover:bg-white hover:text-primary"
                }
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
              <X className={isScrolled ? "text-foreground" : "text-white"} />
            ) : (
              <Menu className={isScrolled ? "text-foreground" : "text-white"} />
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
              {userEmail ? (
                <div className="space-y-2">
                  <Button
                    className="w-full"
                    onClick={() => {
                      handleDashboard();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {userType === "donor" ? "Mi Impacto" : "Mis Eventos"}
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
