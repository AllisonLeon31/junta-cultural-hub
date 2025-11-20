import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Heart, Calendar } from "lucide-react";
import { EventModal } from "@/components/EventModal";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

interface Event {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  category: string;
  date: string;
  time: string | null;
  location: string;
  image: string | null;
  description: string | null;
  goal: number;
  raised: number;
  donors: number;
}

const DonorDashboard = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userEmail = localStorage.getItem("userEmail") || "usuario@email.com";
  
  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) throw error;
      setEvents(data || []);
    } catch (error: any) {
      console.error("Error loading events:", error);
      toast.error("Error al cargar los eventos");
    } finally {
      setLoading(false);
    }
  };

  const totalDonated = events.reduce((sum, e) => sum + (e.raised * 0.1), 0);
  const eventsSupported = events.length;
  const avgProgress = events.length > 0 
    ? Math.round(events.reduce((sum, e) => sum + ((e.raised / e.goal) * 100), 0) / events.length)
    : 0;

  const handleLogout = () => {
    localStorage.removeItem("userType");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  const handleViewDetails = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="gradient-hero text-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Mi Impacto</h1>
                <p className="text-white/90">{userEmail}</p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
                <div className="flex items-center gap-3 mb-2">
                  <Heart className="h-5 w-5 text-white" />
                  <p className="text-white/80 text-sm">Total Donado</p>
                </div>
                <p className="text-3xl font-bold text-white">S/. {totalDonated.toFixed(2)}</p>
              </Card>

              <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="h-5 w-5 text-white" />
                  <p className="text-white/80 text-sm">Eventos Apoyados</p>
                </div>
                <p className="text-3xl font-bold text-white">{eventsSupported}</p>
              </Card>

              <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="h-5 w-5 text-white" />
                  <p className="text-white/80 text-sm">Progreso Promedio</p>
                </div>
                <p className="text-3xl font-bold text-white">{avgProgress}%</p>
              </Card>

              <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
                <Button
                  onClick={handleLogout}
                  variant="secondary"
                  className="w-full"
                >
                  Cerrar Sesión
                </Button>
              </Card>
            </div>
          </div>
        </section>

        {/* Events List */}
        <section className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Eventos Disponibles</h2>
            <Button variant="outline" onClick={() => navigate("/eventos")}>
              Explorar más eventos
            </Button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No hay eventos disponibles en este momento</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <img
                    src={event.image || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800"}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6 space-y-4">
                    <div>
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs rounded-full mb-2">
                        {event.category}
                      </span>
                      <h3 className="font-bold text-lg mb-1">{event.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {event.subtitle}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progreso</span>
                        <span className="font-semibold">{Math.round((event.raised / event.goal) * 100)}%</span>
                      </div>
                      <Progress value={(event.raised / event.goal) * 100} className="h-2" />
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">{event.donors} colaboradores</span>
                        <span className="font-semibold text-primary">Meta: S/ {event.goal}</span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => handleViewDetails(event)}
                    >
                      Ver detalles
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />

      {selectedEvent && (
        <EventModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          event={{
            id: selectedEvent.slug,
            title: selectedEvent.title,
            subtitle: selectedEvent.subtitle || "",
            category: selectedEvent.category,
            date: selectedEvent.date,
            time: selectedEvent.time || "Por confirmar",
            location: selectedEvent.location,
            image: selectedEvent.image || "",
            description: selectedEvent.description || "",
            progress: (selectedEvent.raised / selectedEvent.goal) * 100,
            donors: selectedEvent.donors,
            goal: selectedEvent.goal,
          }}
        />
      )}
    </div>
  );
};

export default DonorDashboard;
