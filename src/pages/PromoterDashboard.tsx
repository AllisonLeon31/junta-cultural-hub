import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Edit, TrendingUp } from "lucide-react";
import { toast } from "sonner";

const mockPromoterEvents = [
  {
    id: "1",
    title: "Festival de Jazz de Verano",
    category: "Música",
    date: "2025-01-15",
    image: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800&h=600&fit=crop",
    progress: 65,
    donors: 28,
    goal: 5000,
    raised: 3250,
  },
];

const PromoterDashboard = () => {
  const navigate = useNavigate();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [events, setEvents] = useState(mockPromoterEvents);
  const userEmail = localStorage.getItem("userEmail") || "promotor@email.com";

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: "",
    image: "",
    description: "",
    goal: "",
  });

  const handleLogout = () => {
    localStorage.removeItem("userType");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

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
      progress: 0,
      donors: 0,
      goal: parseFloat(formData.goal),
      raised: 0,
    };

    setEvents([...events, newEvent]);
    setShowCreateForm(false);
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

  const totalRaised = events.reduce((sum, e) => sum + e.raised, 0);
  const totalDonors = events.reduce((sum, e) => sum + e.donors, 0);

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <header className="gradient-hero text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10"
                onClick={() => navigate("/")}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Inicio
              </Button>
              <h1 className="text-2xl font-bold">Panel de Promotor</h1>
            </div>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary"
              onClick={handleLogout}
            >
              Cerrar sesión
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 shadow-card">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <p className="text-sm text-muted-foreground">Total Recaudado</p>
            </div>
            <p className="text-3xl font-bold text-primary">S/. {totalRaised}</p>
          </Card>

          <Card className="p-6 shadow-card">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold">{events.length}</span>
              </div>
              <p className="text-sm text-muted-foreground">Eventos Activos</p>
            </div>
            <p className="text-3xl font-bold">{events.length}</p>
          </Card>

          <Card className="p-6 shadow-card">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold">{totalDonors}</span>
              </div>
              <p className="text-sm text-muted-foreground">Total Donadores</p>
            </div>
            <p className="text-3xl font-bold">{totalDonors}</p>
          </Card>
        </div>

        {/* Create Event Button */}
        {!showCreateForm && (
          <Card className="p-6 mb-8 shadow-card text-center">
            <h3 className="text-xl font-semibold mb-2">¿Listo para tu próximo evento?</h3>
            <p className="text-muted-foreground mb-4">
              Crea un nuevo evento y comienza a recibir apoyo de la comunidad
            </p>
            <Button size="lg" onClick={() => setShowCreateForm(true)}>
              <Plus className="mr-2 h-5 w-5" />
              Crear Nuevo Evento
            </Button>
          </Card>
        )}

        {/* Create Event Form */}
        {showCreateForm && (
          <Card className="p-6 mb-8 shadow-card">
            <h3 className="text-2xl font-semibold mb-6">Crear Nuevo Evento</h3>
            
            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Nombre del evento *
                </label>
                <Input
                  placeholder="Ej: Festival de Jazz de Verano"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Categoría *
                </label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
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
                <label className="block text-sm font-medium mb-2">
                  Fecha *
                </label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  URL de imagen (opcional)
                </label>
                <Input
                  type="url"
                  placeholder="https://ejemplo.com/imagen.jpg"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Descripción breve
                </label>
                <Textarea
                  placeholder="Describe tu evento..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Meta de recaudación (S/.) *
                </label>
                <Input
                  type="number"
                  placeholder="5000"
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  required
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="flex-1">
                  Crear Evento
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Events List */}
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
                      <p className="text-lg font-semibold text-primary">S/. {event.raised}</p>
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
    </div>
  );
};

export default PromoterDashboard;
