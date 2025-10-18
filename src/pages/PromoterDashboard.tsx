import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { Plus, Users, TrendingUp, Calendar, DollarSign, Edit } from "lucide-react";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const mockEvents = [
  {
    id: "1",
    title: "Festival de Jazz de Verano",
    category: "Música",
    date: "15 de Enero, 2025",
    image: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800&h=600&fit=crop",
    description: "Disfruta de una velada excepcional con los mejores exponentes del jazz peruano e internacional.",
    progress: 65,
    donors: 28,
    goal: 5000,
  },
];

const PromoterDashboard = () => {
  const navigate = useNavigate();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [events, setEvents] = useState(mockEvents);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: "",
    image: "",
    description: "",
    goal: "",
  });

  const userEmail = localStorage.getItem("userEmail") || "promotor@email.com";
  const totalRaised = Math.round(
    events.reduce((sum, event) => sum + (event.goal * event.progress) / 100, 0)
  );
  const activeEvents = events.length;
  const totalDonors = events.reduce((sum, event) => sum + event.donors, 0);
  const avgProgress = Math.round(
    events.reduce((sum, event) => sum + event.progress, 0) / events.length
  );

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.category || !formData.date || !formData.goal) {
      toast.error("Por favor completa todos los campos obligatorios");
      return;
    }

    const newEvent = {
      id: Date.now().toString(),
      title: formData.title,
      category: formData.category,
      date: formData.date,
      image: formData.image || "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&h=600&fit=crop",
      description: formData.description,
      progress: 0,
      donors: 0,
      goal: parseFloat(formData.goal),
    };

    setEvents([...events, newEvent]);
    setIsCreateModalOpen(false);
    setFormData({
      title: "",
      category: "",
      date: "",
      image: "",
      description: "",
      goal: "",
    });
    
    toast.success("¡Evento creado exitosamente!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <Header />
      
      <main className="flex-1 pt-20">
        <section className="gradient-hero text-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Mis Eventos</h1>
                  <p className="text-white/90">{userEmail}</p>
                </div>
              </div>
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => setIsCreateModalOpen(true)}
              >
                <Plus className="mr-2 h-5 w-5" />
                Crear Evento
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="h-5 w-5 text-white" />
                  <p className="text-white/80 text-sm">Eventos Activos</p>
                </div>
                <p className="text-3xl font-bold text-white">{activeEvents}</p>
              </Card>

              <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="h-5 w-5 text-white" />
                  <p className="text-white/80 text-sm">Total Recaudado</p>
                </div>
                <p className="text-3xl font-bold text-white">S/. {totalRaised}</p>
              </Card>

              <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="h-5 w-5 text-white" />
                  <p className="text-white/80 text-sm">Total Donadores</p>
                </div>
                <p className="text-3xl font-bold text-white">{totalDonors}</p>
              </Card>

              <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="h-5 w-5 text-white" />
                  <p className="text-white/80 text-sm">Avance Promedio</p>
                </div>
                <p className="text-3xl font-bold text-white">{avgProgress}%</p>
              </Card>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-4">Mis Eventos</h3>
          </div>

          <div className="space-y-4">
            {events.map((event) => (
              <Card key={event.id} className="p-6 shadow-card hover:shadow-card-hover transition-smooth">
                <div className="flex flex-col md:flex-row gap-6">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full md:w-48 h-32 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-xl font-semibold mb-1">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">{event.category} • {event.date}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Recaudado</p>
                        <p className="text-lg font-semibold text-primary">S/. {Math.round(event.goal * event.progress / 100)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Meta</p>
                        <p className="text-lg font-semibold">S/. {event.goal}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Donadores</p>
                        <p className="text-lg font-semibold">{event.donors}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Progreso</span>
                        <span className="font-semibold text-primary">{event.progress}%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-primary h-full transition-all duration-500"
                          style={{ width: `${event.progress}%` }}
                        />
                      </div>
                    </div>

                    <Button variant="outline">
                      <Edit className="mr-2 h-4 w-4" />
                      Editar Evento
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Evento</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div>
                <Label>Nombre del evento *</Label>
                <Input
                  placeholder="Ej: Festival de Jazz"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label>Categoría *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Música">Música</SelectItem>
                    <SelectItem value="Comedia">Comedia</SelectItem>
                    <SelectItem value="Teatro">Teatro</SelectItem>
                    <SelectItem value="Arte y Exposición">Arte y Exposición</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Fecha *</Label>
                <Input
                  placeholder="15 de Enero, 2025"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label>URL de imagen</Label>
                <Input
                  type="url"
                  placeholder="https://..."
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>

              <div>
                <Label>Descripción</Label>
                <Textarea
                  placeholder="Describe tu evento..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                />
              </div>

              <div>
                <Label>Meta de recaudación (S/.) *</Label>
                <Input
                  type="number"
                  placeholder="5000"
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Crear Evento
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </main>

      <Footer />
    </div>
  );
};

export default PromoterDashboard;
