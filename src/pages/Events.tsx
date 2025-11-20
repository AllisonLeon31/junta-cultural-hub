import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EventCard } from "@/components/EventCard";
import { EventModal } from "@/components/EventModal";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const categories = [
  "Todos los Eventos",
  "Música",
  "Comedia",
  "Teatro",
  "Arte y Exposición",
  "Deportes",
  "Gastronomía",
  "Educación",
  "Otro"
];

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
  days_left: number | null;
}

const Events = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Todos los Eventos");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        .order("created_at", { ascending: false });

      if (error) throw error;
      setEvents(data || []);
    } catch (error: any) {
      console.error("Error loading events:", error);
      toast.error("Error al cargar los eventos");
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      selectedCategory === "Todos los Eventos" || event.category === selectedCategory;
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleEventClick = (event: Event) => {
    navigate(`/evento/${event.slug}`);
  };

  const handleDonateClick = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Explora Eventos</h1>
            <p className="text-muted-foreground text-lg">
              Descubre y apoya proyectos culturales y sociales que están transformando comunidades
            </p>
          </div>

          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar eventos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="transition-all"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">
                No se encontraron eventos que coincidan con tu búsqueda
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  id={event.slug}
                  title={event.title}
                  subtitle={event.subtitle || ""}
                  category={event.category}
                  date={event.date}
                  location={event.location}
                  image={event.image || ""}
                  progress={event.goal > 0 ? (event.raised / event.goal) * 100 : 0}
                  donors={event.donors}
                  goal={event.goal}
                  onViewDetails={() => handleEventClick(event)}
                  onDonate={() => handleDonateClick(event)}
                />
              ))}
            </div>
          )}
        </div>
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
            location: selectedEvent.location,
            image: selectedEvent.image || "",
            progress: selectedEvent.goal > 0 ? (selectedEvent.raised / selectedEvent.goal) * 100 : 0,
            donors: selectedEvent.donors,
            goal: selectedEvent.goal,
          }}
        />
      )}
    </div>
  );
};

export default Events;
