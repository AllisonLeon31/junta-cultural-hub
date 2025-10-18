import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, TrendingUp, Calendar, MessageCircle } from "lucide-react";
import { EventModal } from "@/components/EventModal";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const mockDonations = [
  {
    id: "1",
    title: "Festival de Jazz de Verano",
    subtitle: "Una noche mágica con los mejores artistas de jazz",
    category: "Música",
    date: "15 de Enero, 2025",
    time: "20:00",
    location: "Centro Cultural Lima",
    image: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800&h=600&fit=crop",
    description: "Disfruta de una velada excepcional con los mejores exponentes del jazz peruano e internacional.",
    amount: 50,
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
    description: "Una noche llena de humor con los comediantes más destacados del momento.",
    amount: 25,
    progress: 45,
    donors: 15,
    goal: 3000,
  },
];

const DonorDashboard = () => {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState<typeof mockDonations[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userEmail = localStorage.getItem("userEmail") || "usuario@email.com";
  const totalDonated = mockDonations.reduce((sum, d) => sum + d.amount, 0);
  const eventsSupported = mockDonations.length;
  const avgProgress = Math.round(
    mockDonations.reduce((sum, d) => sum + d.progress, 0) / mockDonations.length
  );

  const handleLogout = () => {
    localStorage.removeItem("userType");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  const handleViewDetails = (donation: typeof mockDonations[0]) => {
    setSelectedEvent(donation);
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
                <p className="text-3xl font-bold text-white">S/. {totalDonated}</p>
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
                  <TrendingUp className="h-5 w-5 text-white" />
                  <p className="text-white/80 text-sm">Avance Promedio</p>
                </div>
                <p className="text-3xl font-bold text-white">{avgProgress}%</p>
              </Card>

              <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
                <div className="flex items-center gap-3 mb-2">
                  <MessageCircle className="h-5 w-5 text-white" />
                  <p className="text-white/80 text-sm">Mensajes</p>
                </div>
                <p className="text-3xl font-bold text-white">3</p>
              </Card>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
        {/* Donations List */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-4">Mis Donaciones</h3>
          <p className="text-muted-foreground mb-6">
            Eventos a los que has contribuido
          </p>
        </div>

        <div className="space-y-4">
          {mockDonations.map((donation) => (
            <Card key={donation.id} className="p-6 shadow-card hover:shadow-card-hover transition-smooth">
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={donation.image}
                  alt={donation.title}
                  className="w-full md:w-48 h-32 object-cover rounded-lg"
                />
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-xl font-semibold mb-1">{donation.title}</h4>
                      <p className="text-sm text-muted-foreground">{donation.category}</p>
                    </div>
                    <span className="text-2xl font-bold text-primary">
                      S/. {donation.amount}
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Progreso de recaudación</span>
                      <span className="font-semibold text-primary">{donation.progress}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-primary h-full transition-all duration-500"
                        style={{ width: `${donation.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {donation.donors} donadores • Meta: S/. {donation.goal}
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => handleViewDetails(donation)}
                  >
                    Ver Detalles
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA to browse more events */}
        <Card className="mt-8 p-8 text-center shadow-card">
          <h3 className="text-2xl font-semibold mb-2">¿Quieres apoyar más proyectos?</h3>
          <p className="text-muted-foreground mb-6">
            Explora otros eventos culturales que necesitan tu ayuda
          </p>
          <Button size="lg" onClick={() => navigate("/")}>
            Ver todos los eventos
          </Button>
        </Card>
      </div>

        <EventModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          event={selectedEvent}
        />
      </main>

      <Footer />
    </div>
  );
};

export default DonorDashboard;
