import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  Calendar,
  MapPin,
  Target
} from "lucide-react";
import { toast } from "sonner";

type Event = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  category: string;
  date: string;
  time: string | null;
  location: string;
  image: string | null;
  video_url: string | null;
  description: string | null;
  full_description: string | null;
  goal: number;
  raised: number;
  donors: number;
  days_left: number | null;
  status: string;
  is_featured: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

export default function StudioDashboard() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkAuth();
    loadEvents();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/promoter-login");
      return;
    }
    setUser(user);
  };

  const loadEvents = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("created_by", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setEvents(data || []);
    } catch (error: any) {
      toast.error("Error al cargar eventos");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const togglePublish = async (event: Event) => {
    try {
      const newStatus = event.status === "published" ? "draft" : "published";
      const { error } = await supabase
        .from("events")
        .update({ status: newStatus })
        .eq("id", event.id);

      if (error) throw error;
      
      toast.success(
        newStatus === "published" 
          ? "Evento publicado correctamente" 
          : "Evento movido a borradores"
      );
      loadEvents();
    } catch (error: any) {
      toast.error("Error al actualizar evento");
      console.error(error);
    }
  };

  const deleteEvent = async (eventId: string) => {
    if (!confirm("¿Estás seguro de eliminar este evento?")) return;

    try {
      const { error } = await supabase
        .from("events")
        .delete()
        .eq("id", eventId);

      if (error) throw error;
      
      toast.success("Evento eliminado correctamente");
      loadEvents();
    } catch (error: any) {
      toast.error("Error al eliminar evento");
      console.error(error);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "outline"> = {
      published: "default",
      draft: "secondary",
      archived: "outline",
    };
    return (
      <Badge variant={variants[status] || "outline"}>
        {status === "published" ? "Publicado" : status === "draft" ? "Borrador" : "Archivado"}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const publishedCount = events.filter(e => e.status === "published").length;
  const draftCount = events.filter(e => e.status === "draft").length;
  const archivedCount = events.filter(e => e.status === "archived").length;
  const totalRaised = events.reduce((sum, e) => sum + Number(e.raised), 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Creator Studio</h1>
            <p className="text-muted-foreground">Gestiona tus eventos y visualiza métricas</p>
          </div>
          <Button 
            size="lg"
            onClick={() => navigate("/studio/new")}
            className="mt-4 md:mt-0"
          >
            <Plus className="mr-2 h-5 w-5" />
            Crear Evento
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Total Eventos</div>
            <div className="text-3xl font-bold text-foreground">{events.length}</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Publicados</div>
            <div className="text-3xl font-bold text-green-600">{publishedCount}</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Borradores</div>
            <div className="text-3xl font-bold text-yellow-600">{draftCount}</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Total Recaudado</div>
            <div className="text-3xl font-bold text-primary">S/ {totalRaised.toFixed(2)}</div>
          </Card>
        </div>

        {/* Events List */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-foreground mb-6">Mis Eventos</h2>
          
          {events.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">Aún no has creado ningún evento</p>
              <Button onClick={() => navigate("/studio/new")}>
                <Plus className="mr-2 h-4 w-4" />
                Crear tu primer evento
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {events.map((event) => (
                <div 
                  key={event.id}
                  className="flex flex-col md:flex-row gap-4 p-4 border border-border rounded-lg hover:border-primary transition-colors"
                >
                  {/* Event Image */}
                  <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    {event.image ? (
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Calendar className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  {/* Event Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-foreground truncate">
                          {event.title}
                        </h3>
                        <p className="text-sm text-muted-foreground truncate">
                          {event.subtitle}
                        </p>
                      </div>
                      {getStatusBadge(event.status)}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="h-4 w-4" />
                        S/ {Number(event.raised).toFixed(2)} / S/ {Number(event.goal).toFixed(2)}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => navigate(`/studio/edit/${event.id}`)}
                      >
                        <Edit className="mr-1 h-4 w-4" />
                        Editar
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => togglePublish(event)}
                      >
                        {event.status === "published" ? (
                          <>
                            <EyeOff className="mr-1 h-4 w-4" />
                            Despublicar
                          </>
                        ) : (
                          <>
                            <Eye className="mr-1 h-4 w-4" />
                            Publicar
                          </>
                        )}
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => navigate(`/evento/${event.slug}`)}
                      >
                        <Eye className="mr-1 h-4 w-4" />
                        Ver
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteEvent(event.id)}
                      >
                        <Trash2 className="mr-1 h-4 w-4" />
                        Eliminar
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </main>

      <Footer />
    </div>
  );
}
