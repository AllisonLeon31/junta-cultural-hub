import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { EventModal } from "@/components/EventModal";
import { Calendar, MapPin, Users, Clock, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function EventDetail() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadEvent = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("events")
          .select("*")
          .eq("slug", eventId)
          .eq("status", "published")
          .single();

        if (error) {
          console.error("Error loading event:", error);
          toast.error("Error al cargar el evento");
          setEvent(null);
        } else {
          setEvent(data);
        }
      } catch (error) {
        console.error("Error loading event:", error);
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      loadEvent();
    }
  }, [eventId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-12">
            <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <h1 className="text-3xl font-bold">Cargando evento...</h1>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-12">
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="text-3xl font-bold mb-4">Evento no encontrado</h1>
              <p className="text-muted-foreground mb-6">
                El evento que buscas no existe o ya no está disponible.
              </p>
              <Button onClick={() => navigate("/eventos")}>Ver todos los eventos</Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const percentage = Math.round((event.raised / event.goal) * 100);
  const videoUrl = event.video_url;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Image/Video Section */}
        <section className="relative h-[60vh] overflow-hidden bg-secondary">
          {videoUrl ? (
            <iframe
              src={videoUrl}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={`Video de ${event.title}`}
            />
          ) : (
            <>
              <img
                src={event.image || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800"}
                alt={`${event.title} - ${event.category}`}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </>
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
                onClick={() => navigate("/eventos")}
                className="mb-4"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a eventos
              </Button>

              {/* Event Header Card */}
              <div className="bg-card rounded-lg shadow-lg p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0">
                    <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full font-semibold">
                      {event.category}
                    </span>
                  </div>
                </div>

                <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
                
                {event.subtitle && (
                  <p className="text-xl text-muted-foreground mb-6">{event.subtitle}</p>
                )}

                {/* Event Meta Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Calendar className="h-5 w-5" />
                    <div>
                      <p className="font-medium text-foreground">
                        {new Date(event.date).toLocaleDateString('es-PE', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                      {event.time && <p className="text-sm">{event.time}</p>}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="h-5 w-5" />
                    <p className="font-medium text-foreground">{event.location}</p>
                  </div>
                </div>
              </div>

              {/* Description Card */}
              <div className="bg-card rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-4">Sobre este evento</h2>
                <div className="space-y-4 prose prose-slate max-w-none">
                  {(event.full_description || event.description || "").split('\n').map((paragraph: string, index: number) => {
                    if (paragraph.trim().startsWith('**') && paragraph.trim().endsWith('**')) {
                      return (
                        <h3 key={index} className="text-xl font-semibold mt-6 mb-3">
                          {paragraph.replace(/\*\*/g, '')}
                        </h3>
                      );
                    }
                    if (paragraph.trim().startsWith('- ')) {
                      return (
                        <li key={index} className="ml-6">
                          {paragraph.substring(2)}
                        </li>
                      );
                    }
                    if (paragraph.trim()) {
                      return <p key={index} className="text-muted-foreground leading-relaxed">{paragraph}</p>;
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>

            {/* Right Column - Donation Card (Sticky) */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg shadow-lg p-6 sticky top-24">
                <div className="space-y-6">
                  {/* Progress Section */}
                  <div>
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="text-3xl font-bold text-primary">
                        S/ {event.raised.toLocaleString('es-PE')}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        de S/ {event.goal.toLocaleString('es-PE')}
                      </span>
                    </div>
                    <Progress value={percentage} className="h-3 mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {percentage}% del objetivo alcanzado
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-y">
                    <div>
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Users className="h-4 w-4" />
                        <span className="text-sm">Donadores</span>
                      </div>
                      <p className="text-2xl font-bold">{event.donors}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">Días restantes</span>
                      </div>
                      <p className="text-2xl font-bold">{event.days_left || 0}</p>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Apoyar este evento
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Todas las contribuciones son seguras y están protegidas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={{
          id: event.slug,
          title: event.title,
          subtitle: event.subtitle || "",
          category: event.category,
          date: event.date,
          time: event.time || "Por confirmar",
          location: event.location,
          image: event.image || "",
          description: event.description || "",
          progress: percentage,
          donors: event.donors,
          goal: event.goal,
        }}
      />
    </div>
  );
}
