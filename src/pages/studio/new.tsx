import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Check, Calendar, MapPin, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

const eventSchema = z.object({
  title: z.string().min(5, "El título debe tener al menos 5 caracteres").max(100, "Máximo 100 caracteres"),
  subtitle: z.string().max(150, "Máximo 150 caracteres").optional(),
  category: z.string().min(1, "Selecciona una categoría"),
  date: z.string().min(1, "La fecha es obligatoria"),
  time: z.string().optional(),
  location: z.string().min(3, "La ubicación es obligatoria"),
  goal: z.number().min(1, "La meta debe ser mayor a 0"),
  days_left: z.number().min(0, "Los días restantes no pueden ser negativos"),
  description: z.string().min(20, "La descripción debe tener al menos 20 caracteres").max(300, "Máximo 300 caracteres"),
  full_description: z.string().min(50, "La descripción completa debe tener al menos 50 caracteres").max(5000, "Máximo 5000 caracteres"),
  image: z.string().url("Debe ser una URL válida").optional().or(z.literal("")),
  video_url: z.string().url("Debe ser una URL válida").optional().or(z.literal("")),
});

type EventFormData = z.infer<typeof eventSchema>;

const categories = [
  "Música",
  "Comedia",
  "Teatro",
  "Arte y Exposición",
  "Deportes",
  "Gastronomía",
  "Educación",
  "Otro"
];

const STEPS = [
  { number: 1, title: "Información Básica" },
  { number: 2, title: "Meta de Recaudación" },
  { number: 3, title: "Contenido del Evento" },
  { number: 4, title: "Media y Vista Previa" },
];

const CreateEvent = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      category: "",
      date: "",
      time: "",
      location: "",
      goal: 1000,
      days_left: 30,
      description: "",
      full_description: "",
      image: "",
      video_url: "",
    },
  });

  const watchedValues = form.watch();
  const progress = (watchedValues.goal > 0) ? Math.min(((watchedValues.goal * 0.3) / watchedValues.goal) * 100, 30) : 0;

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const onSubmit = async (data: EventFormData) => {
    setIsSubmitting(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Debes iniciar sesión para crear un evento");
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
        full_description: data.full_description,
        goal: data.goal,
        raised: 0,
        donors: 0,
        days_left: data.days_left,
        status: "published",
        created_by: user.id,
      };

      const { error } = await supabase.from("events").insert(eventData);

      if (error) throw error;

      toast.success("Evento creado exitosamente");
      navigate("/studio");
    } catch (error: any) {
      console.error("Error creating event:", error);
      toast.error(error.message || "Error al crear el evento");
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateCurrentStep = async () => {
    let fieldsToValidate: (keyof EventFormData)[] = [];
    
    switch (currentStep) {
      case 1:
        fieldsToValidate = ["title", "subtitle", "category", "date", "time", "location"];
        break;
      case 2:
        fieldsToValidate = ["goal", "days_left"];
        break;
      case 3:
        fieldsToValidate = ["description", "full_description"];
        break;
      case 4:
        fieldsToValidate = ["image", "video_url"];
        break;
    }

    const result = await form.trigger(fieldsToValidate);
    return result;
  };

  const nextStep = async () => {
    const isValid = await validateCurrentStep();
    if (isValid && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 pt-24">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {STEPS.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      currentStep >= step.number
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {currentStep > step.number ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <span className={`text-xs mt-2 text-center hidden md:block ${
                    currentStep >= step.number ? "text-foreground font-medium" : "text-muted-foreground"
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <div className={`h-1 flex-1 mx-2 rounded ${
                    currentStep > step.number ? "bg-primary" : "bg-muted"
                  }`} />
                )}
              </div>
            ))}
          </div>
          <Progress value={(currentStep / 4) * 100} className="h-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {currentStep === 1 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Información Básica</CardTitle>
                      <CardDescription>Define los detalles principales de tu evento</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Título del Evento *</FormLabel>
                            <FormControl>
                              <Input placeholder="Ej: Festival de Jazz 2025" {...field} />
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
                              <Input placeholder="Una breve descripción llamativa" {...field} />
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
                            <FormLabel>Categoría *</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecciona una categoría" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {categories.map((cat) => (
                                  <SelectItem key={cat} value={cat}>
                                    {cat}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="date"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Fecha *</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
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
                              <FormLabel>Hora</FormLabel>
                              <FormControl>
                                <Input type="time" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ubicación *</FormLabel>
                            <FormControl>
                              <Input placeholder="Ej: Parque de la Exposición, Lima" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                )}

                {currentStep === 2 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Meta de Recaudación</CardTitle>
                      <CardDescription>Define tu objetivo de financiamiento</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="goal"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Meta en Soles (S/) *</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="1"
                                step="0.01"
                                placeholder="5000"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="days_left"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Días Restantes *</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                placeholder="30"
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                )}

                {currentStep === 3 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Contenido del Evento</CardTitle>
                      <CardDescription>Describe tu evento de forma atractiva</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Descripción Corta *</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Una descripción breve que aparecerá en la tarjeta del evento"
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <p className="text-xs text-muted-foreground">
                              {field.value?.length || 0} / 300 caracteres
                            </p>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="full_description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Descripción Completa *</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Describe en detalle tu evento: qué incluye, quién participa, por qué es especial..."
                                className="min-h-[200px]"
                                {...field}
                              />
                            </FormControl>
                            <p className="text-xs text-muted-foreground">
                              {field.value?.length || 0} / 5000 caracteres
                            </p>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                )}

                {currentStep === 4 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Media y Vista Previa</CardTitle>
                      <CardDescription>Añade imágenes y videos para destacar tu evento</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>URL de Imagen</FormLabel>
                            <FormControl>
                              <Input placeholder="https://example.com/imagen.jpg" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="video_url"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>URL de Video (YouTube/Vimeo)</FormLabel>
                            <FormControl>
                              <Input placeholder="https://youtube.com/watch?v=..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                )}

                <div className="flex justify-between items-center pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Atrás
                  </Button>

                  {currentStep < 4 ? (
                    <Button type="button" onClick={nextStep}>
                      Siguiente
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Creando..." : "Crear Evento"}
                      <Check className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </div>

          <div className="lg:sticky lg:top-24 h-fit">
            <Card>
              <CardHeader>
                <CardTitle>Vista Previa</CardTitle>
                <CardDescription>Así se verá tu evento</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {watchedValues.image ? (
                    <img
                      src={watchedValues.image}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800";
                      }}
                    />
                  ) : (
                    <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-muted-foreground" />
                    </div>
                  )}

                  {watchedValues.category && (
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                      {watchedValues.category}
                    </span>
                  )}

                  <h3 className="text-2xl font-bold">
                    {watchedValues.title || "Título del evento"}
                  </h3>

                  {watchedValues.subtitle && (
                    <p className="text-muted-foreground">{watchedValues.subtitle}</p>
                  )}

                  <div className="space-y-2 text-sm">
                    {watchedValues.date && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{new Date(watchedValues.date).toLocaleDateString('es-PE', { 
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}</span>
                        {watchedValues.time && <span>• {watchedValues.time}</span>}
                      </div>
                    )}

                    {watchedValues.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{watchedValues.location}</span>
                      </div>
                    )}
                  </div>

                  {watchedValues.goal > 0 && (
                    <div className="space-y-2">
                      <Progress value={progress} className="h-2" />
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold">S/ {(watchedValues.goal * 0.3).toFixed(2)}</span>
                        <span className="text-muted-foreground">Meta: S/ {watchedValues.goal.toFixed(2)}</span>
                      </div>
                      {watchedValues.days_left > 0 && (
                        <p className="text-xs text-muted-foreground">
                          {watchedValues.days_left} días restantes
                        </p>
                      )}
                    </div>
                  )}

                  {watchedValues.description && (
                    <p className="text-sm text-muted-foreground border-t pt-4">
                      {watchedValues.description}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreateEvent;
