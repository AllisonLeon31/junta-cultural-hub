import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-secondary py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-primary mb-3">Junta.pe</h2>
            <p className="text-muted-foreground mb-4">
              Plataforma de crowdfunding cultural y social que conecta a
              creadores y donadores para hacer realidad proyectos que
              transforman comunidades.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary flex items-center justify-center transition-colors group"
              >
                <Facebook className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary flex items-center justify-center transition-colors group"
              >
                <Instagram className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary flex items-center justify-center transition-colors group"
              >
                <Twitter className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary flex items-center justify-center transition-colors group"
              >
                <Youtube className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/sobre-nosotros"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link
                  to="/preguntas"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link
                  to="/politicas"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Políticas
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Ver Eventos
                </Link>
              </li>
            </ul>
          </div>

          {/* For Users */}
          <div>
            <h3 className="font-semibold mb-4">Para Usuarios</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/user-select"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Mi Cuenta
                </Link>
              </li>
              <li>
                <Link
                  to="/promoter-login"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Crear Evento
                </Link>
              </li>
              <li>
                <Link
                  to="/donor-login"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Donar
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center">
          <p className="text-muted-foreground">
            © 2025 Junta.pe – Cultura que une. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
