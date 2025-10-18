import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

const PromoterLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    // Simulación de login/registro
    localStorage.setItem("userType", "promoter");
    localStorage.setItem("userEmail", email);
    
    toast.success(isSignup ? "¡Cuenta creada exitosamente!" : "¡Bienvenido de nuevo!");
    navigate("/promoter-dashboard");
  };

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al inicio
        </Button>

        <Card className="p-8 shadow-card-hover">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold gradient-hero bg-clip-text text-transparent mb-2">
              Junta.pe
            </h1>
            <h2 className="text-2xl font-semibold mb-2">
              {isSignup ? "Crear cuenta de Promotor" : "Iniciar sesión como Promotor"}
            </h2>
            <p className="text-muted-foreground">
              {isSignup 
                ? "Comparte tus proyectos culturales con el mundo" 
                : "Gestiona tus eventos y campañas"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Correo electrónico
              </label>
              <Input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Contraseña
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" size="lg">
              {isSignup ? "Crear cuenta" : "Iniciar sesión"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-primary hover:underline text-sm"
            >
              {isSignup 
                ? "¿Ya tienes cuenta? Inicia sesión" 
                : "¿No tienes cuenta? Regístrate"}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PromoterLogin;
