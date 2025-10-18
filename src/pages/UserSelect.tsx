import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Heart, Megaphone, ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const UserSelect = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-5xl">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              ¿Cómo quieres participar en Junta.pe?
            </h1>
            <p className="text-lg text-muted-foreground">
              Selecciona tu rol para comenzar tu experiencia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Donador Card */}
            <Card
              className="p-8 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-primary group"
              onClick={() => navigate("/donor-login")}
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary transition-colors">
                  <Heart className="w-10 h-10 text-primary group-hover:text-white transition-colors" />
                </div>
                <h2 className="text-2xl font-bold mb-3">Donador</h2>
                <p className="text-muted-foreground mb-6">
                  Apoya eventos culturales y sociales que te apasionan. Tu
                  contribución hace la diferencia.
                </p>
                <div className="flex items-center justify-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all">
                  <span>Empezar a donar</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Card>

            {/* Promotor Card */}
            <Card
              className="p-8 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-primary group"
              onClick={() => navigate("/promoter-login")}
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary transition-colors">
                  <Megaphone className="w-10 h-10 text-primary group-hover:text-white transition-colors" />
                </div>
                <h2 className="text-2xl font-bold mb-3">Promotor</h2>
                <p className="text-muted-foreground mb-6">
                  Crea y gestiona tus eventos culturales. Conecta con donadores
                  que creen en tu proyecto.
                </p>
                <div className="flex items-center justify-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all">
                  <span>Crear mi evento</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserSelect;
