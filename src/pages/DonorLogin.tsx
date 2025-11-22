import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const DonorLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.user_metadata?.role === "donor") {
        navigate("/donor-dashboard");
      }
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    setLoading(true);

    try {
      if (isSignup) {
        // Sign up new donor
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              role: "donor"
            },
            emailRedirectTo: `${window.location.origin}/donor-dashboard`
          }
        });

        if (error) throw error;
        toast.success("¡Cuenta creada exitosamente! Revisa tu correo.");
      } else {
        // Sign in existing user
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        // Check if user is a donor
        if (data.user?.user_metadata?.role !== "donor") {
          await supabase.auth.signOut();
          toast.error("Esta cuenta no es de donador. Por favor usa la opción de promotor.");
          return;
        }

        toast.success("¡Bienvenido de nuevo!");
        navigate("/donor-dashboard");
      }
    } catch (error: any) {
      toast.error(error.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
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
              {isSignup ? "Crear cuenta de Donador" : "Iniciar sesión como Donador"}
            </h2>
            <p className="text-muted-foreground">
              {isSignup 
                ? "Únete y apoya proyectos culturales increíbles" 
                : "Bienvenido de vuelta"}
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
                disabled={loading}
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
                disabled={loading}
              />
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isSignup ? "Creando cuenta..." : "Iniciando sesión..."}
                </>
              ) : (
                isSignup ? "Crear cuenta" : "Iniciar sesión"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-primary hover:underline text-sm"
              disabled={loading}
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

export default DonorLogin;
