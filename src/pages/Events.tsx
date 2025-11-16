import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EventCard } from "@/components/EventCard";
import { EventModal } from "@/components/EventModal";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Search, Plus, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

// 👇 NUEVO: cliente de Supabase
import { supabase } from "@/integrations/supabase/client";

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
    id: "improvisacion-comedia",
    title: "Show de Improvisación",
    subtitle: "Comedia sin guión",
    category: "Comedia",
    date: "25 de Enero, 2025",
    time: "21:00",
    location: "La Estación de Barranco",
    image: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=800",
    description: "Un espectáculo único donde los comediantes crean historias en el momento basadas en sugerencias del público.",
    progress: 60,
    donors: 67,
    goal: 6000,
    raised: 3600,
  },
  {
    id: "comedia-mujeres",
    title: "Noche de Comediantes Mujeres",
    subtitle: "Voces femeninas del humor peruano",
    category: "Comedia",
    date: "2 de Febrero, 2025",
    time: "19:30",
    location: "Teatro Británico, Miraflores",
    image: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=800",
    description: "Celebramos el talento de las comediantes peruanas en una noche inolvidable.",
    progress: 75,
    donors: 102,
    goal: 7500,
    raised: 5625,
  },
  {
    id: "comedia-politica",
    title: "Comedia Política: Sin Censura",
    subtitle: "Risas con crítica social",
    category: "Comedia",
    date: "10 de Febrero, 2025",
    time: "20:30",
    location: "Auditorio Miraflores",
    image: "https://images.unsplash.com/photo-1478147427282-58a87a120781?w=800",
    description: "Sátira política y humor inteligente sobre la realidad peruana actual.",
    progress: 50,
    donors: 58,
    goal: 5000,
    raised: 2500,
  },
  {
    id: "monologos-lima",
    title: "Monólogos desde Lima",
    subtitle: "Historias reales con humor",
    category: "Comedia",
    date: "16 de Febrero, 2025",
    time: "20:00",
    location: "Centro Cultural Ricardo Palma",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800",
    description: "Comediantes comparten sus experiencias más divertidas viviendo en Lima.",
    progress: 65,
    donors: 84,
    goal: 6500,
    raised: 4225,
  },
  
  // Teatro
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
  {
    id: "la-casa-bernarda-alba",
    title: "La Casa de Bernarda Alba",
    subtitle: "Drama español en el escenario peruano",
    category: "Teatro",
    date: "18 de Enero, 2025",
    time: "19:00",
    location: "Teatro Peruano Japonés, Jesús María",
    image: "https://images.unsplash.com/photo-1516307365426-bea591f05011?w=800",
    description: "La obra maestra de García Lorca cobra vida con un elenco nacional de primer nivel.",
    progress: 85,
    donors: 134,
    goal: 14000,
    raised: 11900,
  },
  {
    id: "teatro-experimental-absurdo",
    title: "Teatro Experimental: Lo Absurdo",
    subtitle: "Vanguardia teatral peruana",
    category: "Teatro",
    date: "26 de Enero, 2025",
    time: "20:00",
    location: "Espacio Fundación Telefónica, Lima",
    image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800",
    description: "Una propuesta innovadora que desafía los límites del teatro tradicional.",
    progress: 40,
    donors: 52,
    goal: 9000,
    raised: 3600,
  },
  {
    id: "obra-infantil-magica",
    title: "El Bosque Mágico",
    subtitle: "Teatro para niños y familias",
    category: "Teatro",
    date: "3 de Febrero, 2025",
    time: "16:00",
    location: "Teatro Municipal de Lima",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
    description: "Una aventura teatral llena de magia, música y personajes fantásticos para toda la familia.",
    progress: 95,
    donors: 187,
    goal: 11000,
    raised: 10450,
  },
  {
    id: "monologos-dramaticos",
    title: "Voces del Alma",
    subtitle: "Monólogos dramáticos contemporáneos",
    category: "Teatro",
    date: "14 de Febrero, 2025",
    time: "19:30",
    location: "Teatro La Plaza, Larcomar",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800",
    description: "Actores reconocidos interpretan textos contemporáneos sobre la condición humana.",
    progress: 55,
    donors: 71,
    goal: 8500,
    raised: 4675,
  },
  
  // Arte y Exposición
  {
    id: "exposicion-arte-contemporaneo",
    title: "Arte Contemporáneo Peruano",
    subtitle: "Nuevas voces del arte nacional",
    category: "Arte y Exposición",
    date: "17 de Enero, 2025",
    time: "18:00",
    location: "MALI - Museo de Arte de Lima",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800",
    description: "Exposición colectiva de artistas emergentes que exploran la identidad peruana contemporánea.",
    progress: 78,
    donors: 112,
    goal: 13000,
    raised: 10140,
  },
  {
    id: "fotografia-peru-antiguo",
    title: "Perú en Blanco y Negro",
    subtitle: "Fotografía histórica del Perú",
    category: "Arte y Exposición",
    date: "23 de Enero, 2025",
    time: "17:00",
    location: "Centro Cultural PUCP",
    image: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800",
    description: "Un recorrido visual por la historia del Perú a través de fotografías históricas restauradas.",
    progress: 88,
    donors: 145,
    goal: 16000,
    raised: 14080,
  },
  {
    id: "arte-urbano-mural",
    title: "Festival de Arte Urbano",
    subtitle: "Murales que transforman la ciudad",
    category: "Arte y Exposición",
    date: "30 de Enero, 2025",
    time: "10:00",
    location: "Distrito de Barranco",
    image: "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=800",
    description: "Artistas nacionales e internacionales crean murales en vivo en las calles de Barranco.",
    progress: 62,
    donors: 93,
    goal: 10000,
    raised: 6200,
  },
  {
    id: "escultura-moderna",
    title: "Esculturas en el Parque",
    subtitle: "Arte tridimensional al aire libre",
    category: "Arte y Exposición",
    date: "7 de Febrero, 2025",
    time: "11:00",
    location: "Parque de la Reserva, Lima",
    image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800",
    description: "Exposición de esculturas modernas en un espacio público para el disfrute de todos.",
    progress: 72,
    donors: 108,
    goal: 12500,
    raised: 9000,
  },
  {
    id: "arte-digital-interactivo",
    title: "Arte Digital Interactivo",
    subtitle: "Tecnología y creatividad",
    category: "Arte y Exposición",
    date: "15 de Febrero, 2025",
    time: "19:00",
    location: "Centro Cultural de España, Lima",
    image: "https://images.unsplash.com/photo-1551638898-1e0c8b6d8ecc?w=800",
    description: "Una experiencia inmersiva donde el público interactúa con obras de arte digital y proyecciones.",
    progress: 58,
    donors: 87,
    goal: 11500,
    raised: 6670,
  },
];

// 👇 NUEVO: función para migrar los mockEvents a Supabase (úsala solo una vez)
const migrateMockEventsToSupabase = async () => {
  try {
    for (const event of mockEvents) {
      const { id, progress, ...rest } = event;

      const { error } = await supabase
        .from("events")
        .insert(rest);

      if (error) {
        console.error("Error insertando evento", id, error);
        alert(`Error insertando el evento: ${id}`);
        return;
      } else {
        console.log("Evento insertado:", id);
      }
    }

    alert("Migración completada. Revisa la tabla 'events' en Supabase 🎉");
  } catch (e) {
    console.error("Error inesperado en la migración", e);
    alert("Hubo un error inesperado en la migración. Revisa la consola.");
  }
};

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
    navigate(`/evento/${id}`);
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

      {/* 👇 NUEVO: Botón temporal para migrar eventos mock a Supabase */}
      <section className="bg-secondary py-4">
        <div className="container mx-auto px-4 flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={migrateMockEventsToSupabase}
          >
            Migrar eventos mock a Supabase (uso interno)
          </Button>
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
                <EventCard {...event} onViewDetails={handleViewDetails} />
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
        event={selectedEvent}
      />
    </div>
  );
};

export default Index;
