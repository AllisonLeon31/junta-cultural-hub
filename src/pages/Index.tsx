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
    id: "1",
    title: "Festival de Jazz de Verano",
    subtitle: "Una noche mágica con los mejores artistas de jazz",
    category: "Música",
    date: "15 de Enero, 2025",
    time: "20:00",
    location: "Centro Cultural Lima",
    image: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800&h=600&fit=crop",
    description: "Disfruta de una velada excepcional con los mejores exponentes del jazz peruano e internacional. Una experiencia única bajo las estrellas.",
    progress: 65,
    donors: 28,
    goal: 5000,
  },
  {
    id: "2",
    title: "Noche de Comedia Stand-Up",
    subtitle: "Risas aseguradas con los mejores comediantes",
    category: "Comedia",
    date: "20 de Enero, 2025",
    time: "21:00",
    location: "Teatro Municipal",
    image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800&h=600&fit=crop",
    description: "Una noche llena de humor con los comediantes más destacados del momento. Prepárate para reír sin parar.",
    progress: 45,
    donors: 15,
    goal: 3000,
  },
  {
    id: "3",
    title: "Romeo y Julieta: Versión Moderna",
    subtitle: "Clásico shakesperiano reimaginado",
    category: "Teatro",
    date: "25 de Enero, 2025",
    time: "19:30",
    location: "Teatro Segura",
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&h=600&fit=crop",
    description: "Una adaptación contemporánea del clásico de Shakespeare que te dejará sin aliento. Arte en su máxima expresión.",
    progress: 80,
    donors: 42,
    goal: 8000,
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
      
      {/* Hero Section with Video */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden mt-16">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source
              src="https://cdn.pixabay.com/video/2022/07/15/123785-730744530_large.mp4"
              type="video/mp4"
            />
          </video>
          {/* Purple Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/70 via-primary/60 to-primary/50" />
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center justify-center">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
                Junta.pe
              </h1>
              <p className="text-2xl md:text-4xl font-semibold mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Financiamos cultura. Impulsamos impacto.
              </p>
              <p className="text-lg md:text-xl mb-10 opacity-95 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
                Conectamos a creadores y donadores para hacer realidad proyectos
                culturales y sociales que transforman comunidades.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 font-semibold shadow-lg h-14 px-8"
                  onClick={() => navigate("/promoter-login")}
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Crea un evento
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-primary font-semibold h-14 px-8"
                  onClick={() => navigate("/donor-login")}
                >
                  <Heart className="mr-2 h-5 w-5" />
                  Dona a un evento
                </Button>
              </div>
            </div>
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
