import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EventCard } from "@/components/EventCard";
import { EventModal } from "@/components/EventModal";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Search } from "lucide-react";

const categories = [
  "Todos los Eventos",
  "Música",
  "Comedia",
  "Teatro",
  "Arte y Exposición",
];

const mockEvents = [
  // Música
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
    id: "concierto-rock-nacional",
    title: "Concierto de Rock Nacional",
    subtitle: "Las mejores bandas peruanas en un solo escenario",
    category: "Música",
    date: "22 de Enero, 2025",
    time: "20:00",
    location: "Estadio Nacional, Lima",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800",
    description: "Una celebración del rock peruano con las bandas más icónicas del país.",
    progress: 55,
    donors: 98,
    goal: 20000,
    raised: 11000,
  },
  {
    id: "festival-musica-electronica",
    title: "Festival de Música Electrónica",
    subtitle: "DJs internacionales en Lima",
    category: "Música",
    date: "28 de Enero, 2025",
    time: "22:00",
    location: "Costa Verde, Miraflores",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800",
    description: "Una experiencia única con los mejores DJs y productores de música electrónica del mundo.",
    progress: 80,
    donors: 215,
    goal: 25000,
    raised: 20000,
  },
  {
    id: "noche-salsa-timba",
    title: "Noche de Salsa y Timba",
    subtitle: "Baile y sabor caribeño",
    category: "Música",
    date: "8 de Febrero, 2025",
    time: "21:00",
    location: "Club Social Lima, Barranco",
    image: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800",
    description: "Una noche llena de ritmo con las mejores orquestas de salsa y timba.",
    progress: 45,
    donors: 76,
    goal: 10000,
    raised: 4500,
  },
  {
    id: "recital-musica-clasica",
    title: "Recital de Música Clásica",
    subtitle: "Orquesta Sinfónica Nacional",
    category: "Música",
    date: "12 de Febrero, 2025",
    time: "19:30",
    location: "Gran Teatro Nacional, San Borja",
    image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800",
    description: "Una velada con las obras maestras de Beethoven, Mozart y compositores peruanos.",
    progress: 90,
    donors: 156,
    goal: 18000,
    raised: 16200,
  },
  
  // Comedia
  {
    id: "noche-comedia-stand-up",
    title: "Noche de Comedia Stand-Up",
    subtitle: "Los mejores comediantes de Latinoamérica",
    category: "Comedia",
    date: "18 de Enero, 2025",
    time: "21:00",
    location: "Teatro Británico, Miraflores",
    image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800",
    description: "Una noche de risas sin parar con los comediantes más destacados de la región.",
    progress: 72,
    donors: 143,
    goal: 12000,
    raised: 8640,
  },
  {
    id: "festival-humor-improv",
    title: "Festival de Humor e Improvisación",
    subtitle: "Comedia improvisada en vivo",
    category: "Comedia",
    date: "25 de Enero, 2025",
    time: "20:30",
    location: "Centro Cultural PUCP, San Miguel",
    image: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=800",
    description: "Una experiencia única donde el público participa en sketches improvisados.",
    progress: 60,
    donors: 89,
    goal: 8000,
    raised: 4800,
  },
  {
    id: "comedia-familiar",
    title: "Comedia para Toda la Familia",
    subtitle: "Humor apto para todas las edades",
    category: "Comedia",
    date: "5 de Febrero, 2025",
    time: "18:00",
    location: "Auditorio Nacional, San Borja",
    image: "https://images.unsplash.com/photo-1516450137517-162bfbeb8dba?w=800",
    description: "Un show de comedia que toda la familia puede disfrutar junta.",
    progress: 85,
    donors: 198,
    goal: 10000,
    raised: 8500,
  },
  {
    id: "roast-battle",
    title: "Roast Battle Lima",
    subtitle: "Competencia de comediantes",
    category: "Comedia",
    date: "15 de Febrero, 2025",
    time: "22:00",
    location: "La Noche de Barranco, Barranco",
    image: "https://images.unsplash.com/photo-1541188495357-ad2dc89487f4?w=800",
    description: "Los mejores comediantes compiten en un duelo de insultos creativos.",
    progress: 50,
    donors: 67,
    goal: 6000,
    raised: 3000,
  },
  {
    id: "monologos-comicos",
    title: "Noche de Monólogos Cómicos",
    subtitle: "Historias reales, risas auténticas",
    category: "Comedia",
    date: "20 de Febrero, 2025",
    time: "20:00",
    location: "Teatro Marsano, Miraflores",
    image: "https://images.unsplash.com/photo-1611032843205-474e9c8e2ad1?w=800",
    description: "Comediantes compartiendo sus historias más divertidas de la vida real.",
    progress: 40,
    donors: 52,
    goal: 7000,
    raised: 2800,
  },

  // Teatro
  {
    id: "obra-clasica-shakespeare",
    title: "Romeo y Julieta",
    subtitle: "Clásico de Shakespeare en versión moderna",
    category: "Teatro",
    date: "20 de Enero, 2025",
    time: "20:00",
    location: "Teatro Segura, Lima",
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=800",
    description: "Una reinterpretación contemporánea del clásico de Shakespeare.",
    progress: 78,
    donors: 167,
    goal: 18000,
    raised: 14040,
  },
  {
    id: "teatro-experimental",
    title: "Voces del Silencio",
    subtitle: "Teatro experimental contemporáneo",
    category: "Teatro",
    date: "27 de Enero, 2025",
    time: "19:30",
    location: "Centro Cultural Inca Garcilaso, Lima",
    image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800",
    description: "Una propuesta innovadora que explora la comunicación no verbal.",
    progress: 65,
    donors: 112,
    goal: 14000,
    raised: 9100,
  },
  {
    id: "musical-peruano",
    title: "Canto a Mi Tierra",
    subtitle: "Musical folclórico peruano",
    category: "Teatro",
    date: "3 de Febrero, 2025",
    time: "19:00",
    location: "Teatro Municipal, Lima",
    image: "https://images.unsplash.com/photo-1516450137517-162bfbeb8dba?w=800",
    description: "Un homenaje musical a la diversidad cultural del Perú.",
    progress: 92,
    donors: 234,
    goal: 20000,
    raised: 18400,
  },
  {
    id: "teatro-infantil",
    title: "El Principito",
    subtitle: "Teatro para niños y familias",
    category: "Teatro",
    date: "10 de Febrero, 2025",
    time: "16:00",
    location: "Teatro La Plaza, San Miguel",
    image: "https://images.unsplash.com/photo-1478479506715-e1f8f08c2ea1?w=800",
    description: "Una adaptación mágica del clásico de Saint-Exupéry.",
    progress: 88,
    donors: 201,
    goal: 12000,
    raised: 10560,
  },
  {
    id: "drama-contemporaneo",
    title: "Fragmentos de Memoria",
    subtitle: "Drama contemporáneo sobre identidad",
    category: "Teatro",
    date: "17 de Febrero, 2025",
    time: "20:30",
    location: "Teatro Británico, Miraflores",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800",
    description: "Una profunda reflexión sobre la memoria y la identidad peruana.",
    progress: 55,
    donors: 87,
    goal: 15000,
    raised: 8250,
  },

  // Arte y Exposición
  {
    id: "arte-digital-interactivo",
    title: "Arte Digital Interactivo",
    subtitle: "Fusión de tecnología y expresión artística",
    category: "Arte y Exposición",
    date: "23 de Enero, 2025",
    time: "18:00",
    location: "MAC Lima, Barranco",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    description: "Una exposición innovadora que combina arte digital con instalaciones interactivas.",
    progress: 70,
    donors: 156,
    goal: 16000,
    raised: 11200,
  },
  {
    id: "fotografia-urbana",
    title: "Lima en Blanco y Negro",
    subtitle: "Fotografía urbana de Lima",
    category: "Arte y Exposición",
    date: "30 de Enero, 2025",
    time: "17:00",
    location: "Centro Cultural de España, Lima",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800",
    description: "Una colección fotográfica que captura la esencia de Lima contemporánea.",
    progress: 82,
    donors: 178,
    goal: 9000,
    raised: 7380,
  },
  {
    id: "exposicion-arte-peruano",
    title: "Colores de los Andes",
    subtitle: "Arte tradicional andino",
    category: "Arte y Exposición",
    date: "6 de Febrero, 2025",
    time: "16:00",
    location: "Museo de Arte de Lima (MALI), Lima",
    image: "https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=800",
    description: "Una celebración del arte textil y pictórico de las comunidades andinas.",
    progress: 95,
    donors: 267,
    goal: 22000,
    raised: 20900,
  },
  {
    id: "escultura-contemporanea",
    title: "Formas del Futuro",
    subtitle: "Esculturas contemporáneas",
    category: "Arte y Exposición",
    date: "13 de Febrero, 2025",
    time: "18:30",
    location: "Galería Lucía de la Puente, San Isidro",
    image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800",
    description: "Esculturas que desafían la percepción del espacio y la materia.",
    progress: 60,
    donors: 94,
    goal: 13000,
    raised: 7800,
  },
  {
    id: "muralismo-urbano",
    title: "Muralismo Urbano Limeño",
    subtitle: "Arte callejero y cultura popular",
    category: "Arte y Exposición",
    date: "22 de Febrero, 2025",
    time: "15:00",
    location: "Barranco Art District, Barranco",
    image: "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=800",
    description: "Un recorrido por los murales más emblemáticos de Lima.",
    progress: 75,
    donors: 189,
    goal: 11000,
    raised: 8250,
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos los Eventos");
  const [selectedEvent, setSelectedEvent] = useState<typeof mockEvents[0] | null>(null);

  const filteredEvents = mockEvents.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Todos los Eventos" || 
                           event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleViewDetails = (eventId: string) => {
    const event = mockEvents.find(e => e.id === eventId);
    if (event) {
      setSelectedEvent(event);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Page Header */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Todos los Eventos
          </h1>
          <p className="text-lg text-center text-muted-foreground max-w-2xl mx-auto">
            Explora y apoya los proyectos culturales que están transformando nuestras comunidades
          </p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {filteredEvents.map((event) => (
              <div key={event.id} className="animate-fade-in">
                <EventCard {...event} onViewDetails={handleViewDetails} />
              </div>
            ))}
          </div>
          
          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No se encontraron eventos que coincidan con tu búsqueda.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
      
      {selectedEvent && (
        <EventModal
          isOpen={!!selectedEvent}
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

export default Index;
