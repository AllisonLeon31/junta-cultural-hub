import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EventCard } from "@/components/EventCard";
import { EventModal } from "@/components/EventModal";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Search, Plus, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const categories = [
  "Todos los Eventos",
  "Música",
  "Comedia",
  "Teatro",
  "Arte y Exposición",
];

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
  description: string | null;
  full_description: string | null;
  goal: number;
  raised: number;
  donors: number;
};

const Index = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Todos los Eventos");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setEvents(data || []);
    } catch (error: any) {
      toast.error("Error al cargar eventos");
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter((event) => {
    const matchesCategory = selectedCategory === "Todos los Eventos" || event.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.subtitle && event.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleViewDetails = (id: string) => {
    navigate(`/evento/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section with Video Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Video Background */}
<video
  autoPlay
  loop
  muted
  playsInline
  className="absolute inset-0 w-full h-full object-cover"
>
  <source src="/header_movie.mp4" type="video/mp4" />
  Tu navegador no soporta la reproducción de video.
</video>
        
        {/* Purple Gradient Overlay - from top (60% opacity) to bottom (transparent) */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-transparent"></div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in drop-shadow-lg">
            Junta.pe
          </h1>
          <p className="text-2xl md:text-3xl mb-4 animate-fade-in drop-shadow-md" style={{ animationDelay: '0.2s' }}>
            Financiamos cultura. Impulsamos impacto.
          </p>
          <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto animate-fade-in drop-shadow-md" style={{ animationDelay: '0.4s' }}>
            Conectamos a creadores y donadores para hacer realidad proyectos culturales y sociales que transforman comunidades.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 shadow-lg"
              onClick={() => navigate("/user-select")}
            >
              <Plus className="mr-2 h-5 w-5" />
              Crea un evento
            </Button>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 shadow-lg"
              onClick={() => navigate("/eventos")}
            >
              <Heart className="mr-2 h-5 w-5" />
              Apoya a un evento
            </Button>
          </div>
        </div>
      </section>

      {/* Search and Categories */}
      <section className="bg-secondary py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Input
                  type="text"
                  placeholder="Buscar eventos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
              <Button size="lg" className="md:w-auto">
                <Search className="mr-2 h-5 w-5" />
                Buscar
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            Eventos Destacados
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {filteredEvents.slice(0, 3).map((event) => (
              <div key={event.id} className="animate-fade-in">
                <EventCard 
                  {...event}
                  subtitle={event.subtitle || ""}
                  image={event.image || ""}
                  progress={Math.round((event.raised / event.goal) * 100)}
                  onViewDetails={handleViewDetails} 
                />
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-10">
            <Button
              size="lg"
              onClick={() => navigate("/eventos")}
              className="hover-scale"
            >
              Ver más eventos
            </Button>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-background py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Cómo funciona Junta.pe
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Crea tu evento</h3>
              <p className="text-muted-foreground">
                Sube tu propuesta cultural y comparte tu visión con la comunidad.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Recibe apoyo</h3>
              <p className="text-muted-foreground">
                Los donadores financian tu idea y te ayudan a alcanzar tu meta.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Hazlo realidad</h3>
              <p className="text-muted-foreground">
                Comparte los resultados con tu comunidad y celebra el éxito.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Inspirational Section */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Más que eventos, creamos comunidad.
          </h2>
        </div>
      </section>

      <Footer />

      {/* Event Modal */}
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={selectedEvent ? {
          ...selectedEvent,
          subtitle: selectedEvent.subtitle || "",
          time: selectedEvent.time || "Por confirmar",
          image: selectedEvent.image || "",
          description: selectedEvent.description || "",
          progress: Math.round((selectedEvent.raised / selectedEvent.goal) * 100)
        } : null}
      />
    </div>
  );
};

export default Index;
