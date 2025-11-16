import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CreatorLayout } from "@/components/creator/CreatorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { DollarSign, Users, Calendar, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EventData {
  id: string;
  title: string;
  category: string;
  date: string;
  goal: number;
  raised: number;
  donors: number;
  days_left: number;
}

export default function EventAnalytics() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      loadEvent();
    }
  }, [slug]);

  const loadEvent = async () => {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) throw error;

      if (data) {
        setEvent({
          id: data.id,
          title: data.title,
          category: data.category,
          date: data.date,
          goal: Number(data.goal) || 0,
          raised: Number(data.raised) || 0,
          donors: data.donors || 0,
          days_left: data.days_left || 0,
        });
      }
    } catch (error) {
      console.error("Error loading event:", error);
      navigate("/creator/events");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <CreatorLayout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Cargando...</h1>
        </div>
      </CreatorLayout>
    );
  }

  if (!event) {
    return (
      <CreatorLayout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Evento no encontrado</h1>
          <Button onClick={() => navigate("/creator/events")}>
            Volver a Eventos
          </Button>
        </div>
      </CreatorLayout>
    );
  }

  const progressPercentage = (event.raised / event.goal) * 100;

  return (
    <CreatorLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{event.title}</h1>
            <p className="text-muted-foreground">
              {event.category} • {event.date}
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate("/creator/events")}>
            Volver
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Meta</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                S/ {event.goal.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Recaudado</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                S/ {event.raised.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {progressPercentage.toFixed(1)}% de la meta
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Donadores</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{event.donors}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Personas han apoyado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Días Restantes</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{event.days_left}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Para alcanzar la meta
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Progress Card */}
        <Card>
          <CardHeader>
            <CardTitle>Progreso de Recaudación</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progreso actual</span>
                <span className="font-semibold">{progressPercentage.toFixed(1)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-4" />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div>
                <p className="text-sm text-muted-foreground">Recaudado</p>
                <p className="text-2xl font-bold">S/ {event.raised.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Falta</p>
                <p className="text-2xl font-bold">
                  S/ {(event.goal - event.raised).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Placeholder for future charts */}
        <Card>
          <CardHeader>
            <CardTitle>Tendencia de Donaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
              <p className="text-muted-foreground">
                Gráfico de tendencias próximamente
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </CreatorLayout>
  );
}
