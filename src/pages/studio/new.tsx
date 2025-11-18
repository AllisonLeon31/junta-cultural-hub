import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { ArrowLeft, Save, Send } from "lucide-react";
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
  days_left: z.string().optional(),
});

type EventFormData = z.infer<typeof eventSchema>;

const categories = ["Música", "Comedia", "Teatro", "Arte y Exposición", "Deportes", "Educación"];

export default function CreateEvent() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
  });

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[áàäâ]/g, "a")
      .replace(/[éèëê]/g, "e")
      .replace(/[íìïî]/g, "i")
      .replace(/[óòöô]/g, "o")
      .replace(/[úùüû]/g, "u")
      .replace(/ñ/g, "n")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const onSubmit = async (data: EventFormData, isDraft: boolean) => {
    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Debes iniciar sesión");
        navigate("/promoter-login");
        return;
      }

      const slug = generateSlug(data.title);

      const eventData = {
        slug,
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
        raised: 0,
        donors: 0,
        days_left: data.days_left ? parseInt(data.days_left) : null,
        status: isDraft ? "draft" : "published",
        is_featured: false,
        created_by: user.id,
      };

      const { error } = await supabase.from("events").insert([eventData]);

      if (error) throw error;

      toast.success(
        isDraft 
          ? "Evento guardado como borrador" 
          : "Evento publicado correctamente"
      );
      navigate("/studio");
    } catch (error: any) {
      toast.error(error.message || "Error al crear evento");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <h1 className="text-4xl font-bold text-foreground">Crear Nuevo Evento</h1>
          <p className="text-muted-foreground mt-2">
            Completa la información de tu evento
          </p>
        </div>

        <form>
          <Card className="p-6 space-y-6">
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
                  placeholder="Ej: Festival de Jazz de Verano"
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
                  placeholder="Ej: Una noche bajo las estrellas"
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
                  placeholder="Ej: Parque de la Exposición, Lima"
                />
                {errors.location && (
                  <p className="text-sm text-destructive mt-1">{errors.location.message}</p>
                )}
              </div>
            </div>

            {/* Fundraising */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground border-b pb-2">
                Meta de Recaudación
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="goal">Meta en Soles *</Label>
                  <Input
                    id="goal"
                    type="number"
                    step="0.01"
                    {...register("goal")}
                    placeholder="15000"
                  />
                  {errors.goal && (
                    <p className="text-sm text-destructive mt-1">{errors.goal.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="days_left">Días Restantes</Label>
                  <Input
                    id="days_left"
                    type="number"
                    {...register("days_left")}
                    placeholder="30"
                  />
                </div>
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
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
                {errors.image && (
                  <p className="text-sm text-destructive mt-1">{errors.image.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="video_url">URL de Video (YouTube)</Label>
                <Input
                  id="video_url"
                  {...register("video_url")}
                  placeholder="https://www.youtube.com/watch?v=..."
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
                  placeholder="Una breve descripción de tu evento..."
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
                  placeholder="Describe en detalle tu evento, artistas, objetivos, etc..."
                  rows={8}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={handleSubmit((data) => onSubmit(data, true))}
                disabled={isSubmitting}
                className="flex-1"
              >
                <Save className="mr-2 h-4 w-4" />
                Guardar como Borrador
              </Button>
              <Button
                type="button"
                onClick={handleSubmit((data) => onSubmit(data, false))}
                disabled={isSubmitting}
                className="flex-1"
              >
                <Send className="mr-2 h-4 w-4" />
                Publicar Ahora
              </Button>
            </div>
          </Card>
        </form>
      </main>

      <Footer />
    </div>
  );
}
