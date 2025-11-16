import { useEffect, useState } from "react";
import { CreatorLayout } from "@/components/creator/CreatorLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Search, Edit, BarChart3, Eye, EyeOff, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Event {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  status: string;
  goal: number;
  raised: number;
  donors: number;
}

export default function EventsList() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [events, searchQuery, statusFilter, categoryFilter]);

  const loadEvents = async () => {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      const formattedEvents = (data || []).map((e) => ({
        id: e.id,
        slug: e.slug,
        title: e.title,
        category: e.category,
        date: e.date,
        status: e.status || "draft",
        goal: Number(e.goal) || 0,
        raised: Number(e.raised) || 0,
        donors: e.donors || 0,
      }));
      
      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error loading events:", error);
      toast.error("Error al cargar eventos");
    } finally {
      setLoading(false);
    }
  };

  const filterEvents = () => {
    let filtered = [...events];

    if (searchQuery) {
      filtered = filtered.filter((e) =>
        e.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((e) => e.status === statusFilter);
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((e) => e.category === categoryFilter);
    }

    setFilteredEvents(filtered);
  };

  const toggleEventStatus = async (eventId: string, currentStatus: string) => {
    const newStatus = currentStatus === "published" ? "draft" : "published";

    try {
      const { error } = await supabase
        .from("events")
        .update({ status: newStatus })
        .eq("id", eventId);

      if (error) throw error;

      toast.success(
        newStatus === "published"
          ? "Evento publicado"
          : "Evento despublicado"
      );
      loadEvents();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Error al actualizar estado");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-500">Publicado</Badge>;
      case "draft":
        return <Badge variant="secondary">Borrador</Badge>;
      case "archived":
        return <Badge variant="outline">Archivado</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <CreatorLayout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Mis Eventos</h1>
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-muted rounded w-full" />
            <div className="h-64 bg-muted rounded w-full" />
          </div>
        </div>
      </CreatorLayout>
    );
  }

  return (
    <CreatorLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Mis Eventos</h1>
          <Button asChild>
            <Link to="/creator/events/new">
              <Plus className="h-4 w-4" />
              Nuevo Evento
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por título..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="draft">Borrador</SelectItem>
              <SelectItem value="published">Publicado</SelectItem>
              <SelectItem value="archived">Archivado</SelectItem>
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="Música">Música</SelectItem>
              <SelectItem value="Comedia">Comedia</SelectItem>
              <SelectItem value="Teatro">Teatro</SelectItem>
              <SelectItem value="Arte y Exposición">Arte y Exposición</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Events Table */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              {events.length === 0
                ? "No hay eventos todavía. ¡Crea tu primer evento!"
                : "No se encontraron eventos con los filtros aplicados."}
            </p>
            <Button asChild>
              <Link to="/creator/events/new">Crear Evento</Link>
            </Button>
          </div>
        ) : (
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Meta</TableHead>
                  <TableHead className="text-right">Recaudado</TableHead>
                  <TableHead className="text-right">Donadores</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.title}</TableCell>
                    <TableCell>{event.category}</TableCell>
                    <TableCell>{event.date}</TableCell>
                    <TableCell>{getStatusBadge(event.status)}</TableCell>
                    <TableCell className="text-right">
                      S/ {event.goal.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      S/ {event.raised.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">{event.donors}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => navigate(`/creator/events/${event.slug}/edit`)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => navigate(`/creator/events/${event.slug}/analytics`)}
                        >
                          <BarChart3 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleEventStatus(event.id, event.status)}
                        >
                          {event.status === "published" ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </CreatorLayout>
  );
}
