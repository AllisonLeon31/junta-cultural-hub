import { useEffect, useState } from "react";
import { CreatorLayout } from "@/components/creator/CreatorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, TrendingUp, Users, DollarSign } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface DashboardStats {
  totalEvents: number;
  draftEvents: number;
  publishedEvents: number;
  archivedEvents: number;
  totalRaised: number;
  topEvents: Array<{
    id: string;
    title: string;
    raised: number;
    goal: number;
  }>;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalEvents: 0,
    draftEvents: 0,
    publishedEvents: 0,
    archivedEvents: 0,
    totalRaised: 0,
    topEvents: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const { data: events, error } = await supabase
        .from("events")
        .select("*");

      if (error) throw error;

      if (events) {
        const draftEvents = events.filter((e) => e.status === "draft").length;
        const publishedEvents = events.filter((e) => e.status === "published").length;
        const archivedEvents = events.filter((e) => e.status === "archived").length;
        const totalRaised = events.reduce((sum, e) => sum + (Number(e.raised) || 0), 0);
        
        const topEvents = events
          .sort((a, b) => (Number(b.raised) || 0) - (Number(a.raised) || 0))
          .slice(0, 3)
          .map((e) => ({
            id: e.id,
            title: e.title,
            raised: Number(e.raised) || 0,
            goal: Number(e.goal) || 0,
          }));

        setStats({
          totalEvents: events.length,
          draftEvents,
          publishedEvents,
          archivedEvents,
          totalRaised,
          topEvents,
        });
      }
    } catch (error) {
      console.error("Error loading dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <CreatorLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Dashboard</h1>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="pb-2">
                  <div className="h-4 bg-muted rounded w-24" />
                </CardHeader>
                <CardContent>
                  <div className="h-8 bg-muted rounded w-16" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CreatorLayout>
    );
  }

  return (
    <CreatorLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Eventos</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalEvents}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.publishedEvents} publicados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Borradores</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.draftEvents}</div>
              <p className="text-xs text-muted-foreground mt-1">
                En progreso
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Archivados</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.archivedEvents}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Finalizados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Recaudado</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                S/ {stats.totalRaised.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Todos los eventos
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Top Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Top 3 Eventos
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats.topEvents.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No hay eventos todavía. ¡Crea tu primer evento!
              </p>
            ) : (
              <div className="space-y-4">
                {stats.topEvents.map((event, index) => (
                  <div key={event.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-muted-foreground">
                            S/ {event.raised.toLocaleString()} de S/ {event.goal.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Progress 
                      value={(event.raised / event.goal) * 100} 
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </CreatorLayout>
  );
}
