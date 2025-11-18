import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";

const eventSchema = z.object({
  title: z.string().min(3, "El título debe tener al menos 3 caracteres"),
  subtitle: z.string().optional(),
  category: z.string().min(1, "Selecciona una categoría"),
  date: z.string().min(1, "La fecha es requerida"),
  time: z.string().optional(),
  location: z.string().min(3, "La ubicación es requerida"),
  image: z.string().url("Debe ser una URL válida").optional().or(z.literal("")),
  video_url: z.string().url("Debe ser una URL válida").optional().or(z.literal("")),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  full_description: z.string().optional(),
  goal: z.string().min(1, "La meta es requerida"),
  raised: z.string().optional(),
  donors: z.string().optional(),
  days_left: z.string().optional(),
  status: z.enum(["draft", "published", "archived"]),
});

type EventFormData = z.infer<typeof eventSchema>;

const categories = ["Música", "Comedia", "Teatro", "Arte y Exposición", "Deportes", "Educación"];

export default function EditEvent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
  });

  useEffect(() => {
    loadEvent();
  }, [id]);

  const loadEvent = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/promoter-login");
        return;
      }

      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .eq("created_by", user.id)
        .single();

      if (error) throw error;

      if (data) {
        setValue("title", data.title);
        setValue("subtitle", data.subtitle || "");
        setValue("category", data.category);
        setValue("date", data.date);
        setValue("time", data.time || "");
        setValue("location", data.location);
        setValue("image", data.image || "");
        setValue("video_url", data.video_url || "");
        setValue("description", data.description || "");
        setValue("full_description", data.full_description || "");
        setValue("goal", data.goal.toString());
        setValue("raised", data.raised.toString());
        setValue("donors", data.donors.toString());
        setValue("days_left", data.days_left?.toString() || "");
        setValue("status", data.status as "draft" | "published" | "archived");
      }
    } catch (error: any) {
      toast.error("Error al cargar evento");
      console.error(error);
      navigate("/studio");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: EventFormData) => {
    setIsSubmitting(true);

    try {
      const eventData = {
        title: data.title,
        subtitle: data.subtitle || null,
        category: data.category,
        date: data.date,
        time: data.time || null,
        location: data.location,
        image: data.image || null,
        video_url: data.video_url || null,
        description: data.description,
        full_description: data.full_description || null,
        goal: parseFloat(data.goal),
        raised: data.raised ? parseFloat(data.raised) : 0,
        donors: data.donors ? parseInt(data.donors) : 0,
        days_left: data.days_left ? parseInt(data.days_left) : null,
        status: data.status,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("events")
        .update(eventData)
        .eq("id", id);

      if (error) throw error;

      toast.success("Evento actualizado correctamente");
      navigate("/studio");
    } catch (error: any) {
      toast.error(error.message || "Error al actualizar evento");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-16 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/studio")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al Studio
          </Button>
          <h1 className="text-4xl font-bold text-foreground">Editar Evento</h1>
          <p className="text-muted-foreground mt-2">
            Actualiza la información de tu evento
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="p-6 space-y-6">
            {/* Status */}
            <div>
              <Label htmlFor="status">Estado del Evento *</Label>
              <Select 
                onValueChange={(value) => setValue("status", value as "draft" | "published" | "archived")}
                defaultValue="draft"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Borrador</SelectItem>
                  <SelectItem value="published">Publicado</SelectItem>
                  <SelectItem value="archived">Archivado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Basics */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground border-b pb-2">
                Información Básica
              </h2>

              <div>
                <Label htmlFor="title">Título del Evento *</Label>
                <Input
                  id="title"
                  {...register("title")}
                />
                {errors.title && (
                  <p className="text-sm text-destructive mt-1">{errors.title.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="subtitle">Subtítulo</Label>
                <Input
                  id="subtitle"
                  {...register("subtitle")}
                />
              </div>

              <div>
                <Label htmlFor="category">Categoría *</Label>
                <Select onValueChange={(value) => setValue("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-destructive mt-1">{errors.category.message}</p>
                )}
              </div>
            </div>

            {/* Date & Location */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground border-b pb-2">
                Fecha y Ubicación
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Fecha *</Label>
                  <Input
                    id="date"
                    type="date"
                    {...register("date")}
                  />
                  {errors.date && (
                    <p className="text-sm text-destructive mt-1">{errors.date.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="time">Hora</Label>
                  <Input
                    id="time"
                    type="time"
                    {...register("time")}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location">Ubicación *</Label>
                <Input
                  id="location"
                  {...register("location")}
                />
                {errors.location && (
                  <p className="text-sm text-destructive mt-1">{errors.location.message}</p>
                )}
              </div>
            </div>

            {/* Fundraising */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground border-b pb-2">
                Recaudación
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="goal">Meta (S/) *</Label>
                  <Input
                    id="goal"
                    type="number"
                    step="0.01"
                    {...register("goal")}
                  />
                  {errors.goal && (
                    <p className="text-sm text-destructive mt-1">{errors.goal.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="raised">Recaudado (S/)</Label>
                  <Input
                    id="raised"
                    type="number"
                    step="0.01"
                    {...register("raised")}
                  />
                </div>

                <div>
                  <Label htmlFor="donors">Donadores</Label>
                  <Input
                    id="donors"
                    type="number"
                    {...register("donors")}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="days_left">Días Restantes</Label>
                <Input
                  id="days_left"
                  type="number"
                  {...register("days_left")}
                />
              </div>
            </div>

            {/* Media */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground border-b pb-2">
                Multimedia
              </h2>

              <div>
                <Label htmlFor="image">URL de Imagen</Label>
                <Input
                  id="image"
                  {...register("image")}
                />
                {errors.image && (
                  <p className="text-sm text-destructive mt-1">{errors.image.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="video_url">URL de Video</Label>
                <Input
                  id="video_url"
                  {...register("video_url")}
                />
                {errors.video_url && (
                  <p className="text-sm text-destructive mt-1">{errors.video_url.message}</p>
                )}
              </div>
            </div>

            {/* Descriptions */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground border-b pb-2">
                Descripciones
              </h2>

              <div>
                <Label htmlFor="description">Descripción Corta *</Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  rows={3}
                />
                {errors.description && (
                  <p className="text-sm text-destructive mt-1">{errors.description.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="full_description">Descripción Completa</Label>
                <Textarea
                  id="full_description"
                  {...register("full_description")}
                  rows={8}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/studio")}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                <Save className="mr-2 h-4 w-4" />
                Guardar Cambios
              </Button>
            </div>
          </Card>
        </form>
      </main>

      <Footer />
    </div>
  );
}
