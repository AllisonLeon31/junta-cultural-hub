import { useState } from "react";
import { CreatorLayout } from "@/components/creator/CreatorLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { EventCard } from "@/components/EventCard";

const eventSchema = z.object({
  title: z.string().min(3, "El título debe tener al menos 3 caracteres"),
  subtitle: z.string().min(3, "El subtítulo debe tener al menos 3 caracteres"),
  category: z.string().min(1, "Selecciona una categoría"),
  date: z.string().min(1, "La fecha es requerida"),
  time: z.string().optional(),
  location: z.string().min(3, "La ubicación es requerida"),
  goal: z.number().min(100, "La meta debe ser al menos S/ 100"),
  image: z.string().url("Debe ser una URL válida").optional(),
  videoUrl: z.string().url("Debe ser una URL válida de YouTube").optional(),
  description: z.string().min(20, "La descripción debe tener al menos 20 caracteres"),
  fullDescription: z.string().min(50, "La descripción completa debe tener al menos 50 caracteres"),
  publishNow: z.boolean().default(false),
});

type EventForm = z.infer<typeof eventSchema>;

const steps = [
  "Datos Básicos",
  "Fecha y Ubicación",
  "Recaudación",
  "Multimedia",
  "Descripción",
  "Revisar y Publicar",
];

export default function CreateEvent() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<EventForm>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      category: "",
      date: "",
      time: "",
      location: "",
      goal: 1000,
      image: "",
      videoUrl: "",
      description: "",
      fullDescription: "",
      publishNow: false,
    },
  });

  const onSubmit = async (data: EventForm) => {
    setIsSubmitting(true);
    try {
      const slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      const { error } = await supabase.from("events").insert([
        {
          slug,
          title: data.title,
          subtitle: data.subtitle,
          category: data.category,
          date: data.date,
          time: data.time,
          location: data.location,
          goal: data.goal,
          raised: 0,
          donors: 0,
          image: data.image || null,
          video_url: data.videoUrl || null,
          description: data.description,
          full_description: data.fullDescription,
          status: data.publishNow ? "published" : "draft",
          is_featured: false,
        },
      ]);

      if (error) throw error;

      toast.success(
        data.publishNow
          ? "¡Evento creado y publicado!"
          : "Evento creado como borrador"
      );
      navigate("/creator/events");
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Error al crear el evento");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const getFieldsForStep = (step: number): (keyof EventForm)[] => {
    switch (step) {
      case 0:
        return ["title", "subtitle", "category"];
      case 1:
        return ["date", "time", "location"];
      case 2:
        return ["goal"];
      case 3:
        return ["image", "videoUrl"];
      case 4:
        return ["description", "fullDescription"];
      default:
        return [];
    }
  };

  const formValues = form.watch();
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <CreatorLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Crear Nuevo Evento</h1>
          <p className="text-muted-foreground">
            Completa el formulario paso a paso
          </p>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">{steps[currentStep]}</span>
            <span className="text-muted-foreground">
              Paso {currentStep + 1} de {steps.length}
            </span>
          </div>
          <Progress value={progress} />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle>{steps[currentStep]}</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  {currentStep === 0 && (
                    <>
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Título del Evento</FormLabel>
                            <FormControl>
                              <Input placeholder="Ej: Festival de Jazz" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="subtitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subtítulo</FormLabel>
                            <FormControl>
                              <Input placeholder="Una descripción breve" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Categoría</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecciona una categoría" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Música">Música</SelectItem>
                                <SelectItem value="Comedia">Comedia</SelectItem>
                                <SelectItem value="Teatro">Teatro</SelectItem>
                                <SelectItem value="Arte y Exposición">
                                  Arte y Exposición
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  {currentStep === 1 && (
                    <>
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Fecha</FormLabel>
                            <FormControl>
                              <Input type="text" placeholder="15 de Enero, 2025" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Hora (opcional)</FormLabel>
                            <FormControl>
                              <Input type="text" placeholder="19:00" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ubicación</FormLabel>
                            <FormControl>
                              <Input placeholder="Teatro Nacional, Lima" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  {currentStep === 2 && (
                    <>
                      <FormField
                        control={form.control}
                        name="goal"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Meta de Recaudación (S/)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="10000"
                                {...field}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  {currentStep === 3 && (
                    <>
                      <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>URL de Imagen</FormLabel>
                            <FormControl>
                              <Input
                                type="url"
                                placeholder="https://ejemplo.com/imagen.jpg"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="videoUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>URL de Video YouTube (opcional)</FormLabel>
                            <FormControl>
                              <Input
                                type="url"
                                placeholder="https://youtube.com/watch?v=..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  {currentStep === 4 && (
                    <>
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Descripción Corta</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Una descripción breve del evento..."
                                rows={3}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="fullDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Descripción Completa</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Una descripción detallada del evento..."
                                rows={6}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  {currentStep === 5 && (
                    <div className="space-y-4">
                      <div className="p-4 bg-muted rounded-lg space-y-2">
                        <p><strong>Título:</strong> {formValues.title}</p>
                        <p><strong>Categoría:</strong> {formValues.category}</p>
                        <p><strong>Fecha:</strong> {formValues.date}</p>
                        <p><strong>Ubicación:</strong> {formValues.location}</p>
                        <p><strong>Meta:</strong> S/ {formValues.goal}</p>
                      </div>
                      <FormField
                        control={form.control}
                        name="publishNow"
                        render={({ field }) => (
                          <FormItem className="flex items-center gap-2 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="!mt-0 cursor-pointer">
                              Publicar inmediatamente
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  <div className="flex gap-2 pt-4">
                    {currentStep > 0 && (
                      <Button type="button" variant="outline" onClick={prevStep}>
                        Anterior
                      </Button>
                    )}
                    {currentStep < steps.length - 1 ? (
                      <Button type="button" onClick={nextStep} className="ml-auto">
                        Siguiente
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="ml-auto"
                      >
                        {isSubmitting ? "Creando..." : "Crear Evento"}
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Vista Previa</CardTitle>
            </CardHeader>
            <CardContent>
              <EventCard
                id="preview"
                title={formValues.title || "Título del Evento"}
                subtitle={formValues.subtitle || "Subtítulo del evento"}
                category={formValues.category || "Categoría"}
                date={formValues.date || "Fecha"}
                location={formValues.location || "Ubicación"}
                image={formValues.image || "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800"}
                progress={0}
                donors={0}
                goal={formValues.goal}
                raised={0}
                onViewDetails={() => {}}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </CreatorLayout>
  );
}
