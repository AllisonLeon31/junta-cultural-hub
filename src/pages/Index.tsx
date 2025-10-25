import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EventCard } from "@/components/EventCard";
import { EventModal } from "@/components/EventModal";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Search, Plus, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  "Todos los Eventos",
  "Música",
  "Comedia",
  "Teatro",
  "Arte y Exposición",
];

const mockEvents = [
  {
    id: "festival-jazz-verano",
    title: "Festival de Jazz de Verano",
    subtitle: "Una noche bajo las estrellas",
    category: "Música",
    date: "15 de Enero, 2025",
    time: "19:00",
    location: "Parque de la Exposición, Lima",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800",
    description: "Únete a nosotros para una velada mágica de jazz en vivo bajo el cielo nocturno de Lima.",
    progress: 65,
    donors: 127,
    goal: 15000,
    raised: 9750,
  },
  {
    id: "noche-comedia-stand-up",
    title: "Noche de Comedia Stand-Up",
    subtitle: "Risas y buen humor garantizado",
    category: "Comedia",
    date: "20 de Enero, 2025",
    time: "20:00",
    location: "Teatro Municipal, Miraflores",
    image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800",
    description: "Los mejores comediantes nacionales e internacionales reunidos en una noche llena de risas.",
    progress: 70,
    donors: 89,
    goal: 8000,
    raised: 5600,
  },
  {
    id: "romeo-julieta-version-moderna",
    title: "Romeo y Julieta: Versión Moderna",
    subtitle: "Teatro clásico con un twist contemporáneo",
    category: "Teatro",
    date: "5 de Febrero, 2025",
    time: "18:00",
    location: "Teatro Segura, Centro de Lima",
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=800",
    description: "Una reinterpretación moderna del clásico de Shakespeare ambientada en el Lima actual.",
    progress: 70,
    donors: 104,
    goal: 12000,
    raised: 8400,
  },
];

const Index = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Todos los Eventos");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<typeof mockEvents[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredEvents = mockEvents.filter((event) => {
    const matchesCategory = selectedCategory === "Todos los Eventos" || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleViewDetails = (id: string) => {
    const event = mockEvents.find((e) => e.id === id);
    if (event) {
      setSelectedEvent(event);
      setIsModalOpen(true);
    }
  };

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
          <source
            src="https://cdn.pixabay.com/video/2022/11/27/141041-776486984_large.mp4"
            type="video/mp4"
          />
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
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-primary backdrop-blur-sm"
            >
              <Heart className="mr-2 h-5 w-5" />
              Dona a un evento
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
            {filteredEvents.map((event) => (
              <div key={event.id} className="animate-fade-in">
                <EventCard {...event} onViewDetails={handleViewDetails} />
              </div>
            ))}
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
        event={selectedEvent}
      />
    </div>
  );
};

export default Index;
