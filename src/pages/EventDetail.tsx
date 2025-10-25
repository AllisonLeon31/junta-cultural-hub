import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { EventModal } from "@/components/EventModal";
import { Calendar, MapPin, Users, Clock, ArrowLeft } from "lucide-react";

// Mock event data (in real app, fetch from API)
const mockEvents = [
  {
    id: "festival-jazz-verano",
    title: "Festival de Jazz de Verano",
    subtitle: "Una noche bajo las estrellas",
    category: "Música",
    date: "2025-02-15",
    time: "19:00",
    location: "Parque de la Exposición, Lima",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800",
    videoUrl: "https://www.youtube.com/embed/vmDDOFXSgAs",
    description: "Únete a nosotros para una velada mágica de jazz en vivo bajo el cielo nocturno de Lima.",
    fullDescription: `El Festival de Jazz de Verano es un evento anual que celebra la rica tradición del jazz y su influencia en la cultura musical peruana. Este año, reuniremos a los mejores exponentes locales e internacionales para crear una experiencia musical inolvidable.

**Sobre el evento:**
Más que un concierto, es una celebración de la música, la comunidad y la cultura. Durante 6 horas ininterrumpidas, el Parque de la Exposición se transformará en un escenario vibrante donde el jazz cobrará vida.

**Artistas confirmados:**
- Perú Jazz Collective
- María Santos Trio
- Los Hermanos del Swing
- Special guest: Marcus Johnson (USA)

**Equipo organizador:**
Somos un grupo de productores culturales con más de 15 años de experiencia en la organización de eventos musicales. Nuestro compromiso es llevar cultura de calidad a todos los rincones de Lima.

**Por qué necesitamos tu apoyo:**
Los fondos recaudados se destinarán a:
- Escenario y sistema de sonido profesional (40%)
- Honorarios de artistas (35%)
- Producción y logística (15%)
- Difusión y marketing (10%)

Tu contribución no solo hace posible este evento, también apoya el desarrollo de la escena cultural peruana y brinda oportunidades a artistas locales.`,
    goal: 15000,
    raised: 9750,
    donors: 127,
    daysLeft: 12,
  },
  {
    id: "noche-comedia-stand-up",
    title: "Noche de Comedia Stand-Up",
    subtitle: "Risas y buen humor garantizado",
    category: "Comedia",
    date: "2025-02-20",
    time: "20:00",
    location: "Teatro Municipal, Miraflores",
    image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800",
    videoUrl: "",
    description: "Los mejores comediantes nacionales e internacionales reunidos en una noche llena de risas.",
    fullDescription: `La Noche de Comedia Stand-Up es el evento de humor más esperado del año. Reuniremos a los comediantes más talentosos de Perú y Latinoamérica para una noche que te hará llorar de la risa.

**Sobre el evento:**
El stand-up comedy es un arte que requiere valentía, creatividad y conexión genuina con el público. En esta noche especial, queremos crear un espacio donde el humor nos una y nos haga reflexionar sobre nuestra realidad con una sonrisa.

**Line-up de comediantes:**
- Carlos "El Risueño" Mendoza
- Lucia Ramos
- Javier Ponce
- Invitado internacional sorpresa

**Nuestra misión:**
Queremos democratizar el acceso a la cultura del humor. Por eso, el 20% de las entradas serán distribuidas gratuitamente a comunidades con menor acceso a eventos culturales.

**Inversión de fondos:**
- Alquiler del teatro (30%)
- Honorarios de artistas (40%)
- Producción técnica (20%)
- Programa de entradas gratuitas (10%)

Apoyar este evento significa apostar por el talento peruano y hacer que más personas puedan disfrutar de una noche de entretenimiento de calidad.`,
    goal: 8000,
    raised: 5600,
    donors: 89,
    daysLeft: 18,
  },
  {
    id: "romeo-julieta-version-moderna",
    title: "Romeo y Julieta: Versión Moderna",
    subtitle: "Teatro clásico con un twist contemporáneo",
    category: "Teatro",
    date: "2025-03-05",
    time: "18:00",
    location: "Teatro Segura, Centro de Lima",
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=800",
    videoUrl: "",
    description: "Una reinterpretación moderna del clásico de Shakespeare ambientada en el Lima actual.",
    fullDescription: `Romeo y Julieta: Versión Moderna es una audaz reinterpretación del clásico shakespeariano, trasladado al contexto urbano de Lima contemporánea. Esta producción combina teatro clásico con elementos multimedia y música original.

**Visión artística:**
Shakespeare escribió sobre el amor, el conflicto y la juventud de una manera atemporal. Nuestra versión mantiene la esencia de la historia original pero la contextualiza en los desafíos que enfrentan los jóvenes limeños hoy: diferencias socioeconómicas, prejuicios y la búsqueda de identidad.

**Elenco y equipo:**
- Dirección: Patricia Ramos (Premio Nacional de Teatro 2023)
- Elenco: 12 actores profesionales
- Músicos en vivo: 4
- Equipo técnico: 8 personas

**Innovación escénica:**
Utilizaremos proyecciones multimedia, música original de compositores peruanos y coreografía contemporánea para crear una experiencia teatral inmersiva.

**Impacto social:**
Parte de las funciones serán gratuitas para estudiantes de escuelas públicas, acompañadas de talleres educativos sobre teatro y literatura.

**Distribución del presupuesto:**
- Honorarios del elenco y equipo (45%)
- Producción y escenografía (25%)
- Alquiler del teatro (15%)
- Programa educativo (10%)
- Marketing y difusión (5%)

Tu apoyo hace posible que el teatro clásico llegue a nuevas audiencias de manera innovadora y accesible.`,
    goal: 12000,
    raised: 8400,
    donors: 104,
    daysLeft: 25,
  },
];

export default function EventDetail() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // In real app, fetch event data from API
    const foundEvent = mockEvents.find((e) => e.id === eventId);
    if (foundEvent) {
      setEvent(foundEvent);
    }
  }, [eventId]);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Evento no encontrado</h2>
          <Button onClick={() => navigate("/")}>Volver al inicio</Button>
        </div>
      </div>
    );
  }

  const percentage = Math.round((event.raised / event.goal) * 100);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Image/Video Section */}
        <section className="relative h-[60vh] overflow-hidden">
          {event.videoUrl ? (
            <iframe
              src={event.videoUrl}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <img
              src={event.image}
              alt={event.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 -mt-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Event Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Back Button */}
              <Button
                variant="ghost"
                onClick={() => navigate("/")}
                className="mb-4"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a eventos
              </Button>

              {/* Event Header Card */}
              <div className="bg-card rounded-xl shadow-card p-8 space-y-4">
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {event.category}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                  {event.title}
                </h1>
                <p className="text-xl text-muted-foreground">{event.subtitle}</p>

                {/* Event Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Fecha</p>
                      <p className="font-medium">{new Date(event.date).toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Hora</p>
                      <p className="font-medium">{event.time} hrs</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 md:col-span-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Lugar</p>
                      <p className="font-medium">{event.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description Card */}
              <div className="bg-card rounded-xl shadow-card p-8 space-y-4">
                <h2 className="text-2xl font-bold text-foreground">Sobre este evento</h2>
                <div className="prose prose-lg max-w-none text-foreground whitespace-pre-line">
                  {event.fullDescription}
                </div>
              </div>
            </div>

            {/* Right Column - Donation Card (Sticky) */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl shadow-card-hover p-6 space-y-6 sticky top-24">
                {/* Progress Section */}
                <div className="space-y-3">
                  <div className="flex justify-between items-baseline">
                    <div>
                      <p className="text-3xl font-bold text-primary">
                        S/.{event.raised.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        de S/.{event.goal.toLocaleString()} meta
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-foreground">{percentage}%</p>
                    </div>
                  </div>
                  <Progress value={percentage} className="h-3" />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="text-center p-4 bg-secondary rounded-lg">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Users className="h-4 w-4 text-primary" />
                      <p className="text-2xl font-bold text-foreground">{event.donors}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Donadores</p>
                  </div>
                  <div className="text-center p-4 bg-secondary rounded-lg">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Clock className="h-4 w-4 text-primary" />
                      <p className="text-2xl font-bold text-foreground">{event.daysLeft}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Días restantes</p>
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  size="lg"
                  className="w-full shadow-lg"
                  onClick={() => setIsModalOpen(true)}
                >
                  ❤️ Apoyar este evento
                </Button>

                {/* Info Text */}
                <p className="text-sm text-muted-foreground text-center">
                  Tu aporte ayuda a hacer realidad este evento cultural y apoya a los artistas peruanos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      
      {isModalOpen && (
        <EventModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          event={event}
        />
      )}
    </div>
  );
}
