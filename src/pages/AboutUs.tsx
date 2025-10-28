import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Heart, Target, Users, Award } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="gradient-hero text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
              Sobre Nosotros
            </h1>
            <p className="text-xl max-w-2xl mx-auto animate-fade-in">
              Impulsamos la cultura peruana conectando promotores creativos con
              donadores apasionados
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Nuestra Misión</h2>
                <p className="text-muted-foreground">
                  Democratizar el acceso al financiamiento cultural, permitiendo
                  que proyectos valiosos encuentren el apoyo que necesitan para
                  hacer realidad sus ideas.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Nuestra Visión</h2>
                <p className="text-muted-foreground">
                  Ser la primera plataforma de crowdfunding cultural en Perú,
                  construyendo una comunidad vibrante que transforma ideas
                  creativas en experiencias memorables.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-secondary py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Nuestros Valores
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-card">
                <Users className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Comunidad</h3>
                <p className="text-muted-foreground">
                  Creemos en el poder de la colaboración y el apoyo mutuo para
                  crear un impacto positivo.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-card">
                <Award className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Transparencia</h3>
                <p className="text-muted-foreground">
                  Garantizamos claridad total en el uso de fondos y el progreso
                  de cada proyecto.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-card">
                <Heart className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Pasión Cultural</h3>
                <p className="text-muted-foreground">
                  Amamos y promovemos la diversidad cultural peruana en todas
                  sus formas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Metrics */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Nuestro Impacto
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">150+</div>
                <p className="text-muted-foreground">Eventos Financiados</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">5,000+</div>
                <p className="text-muted-foreground">Donadores Activos</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">S/. 2M+</div>
                <p className="text-muted-foreground">Fondos Recaudados</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">98%</div>
                <p className="text-muted-foreground">Satisfacción</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team or Testimonials */}
        <section className="bg-secondary py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Lo Que Dicen de Nosotros
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-card">
                <p className="text-muted-foreground mb-4 italic">
                  "Junta.pe hizo realidad nuestro festival de jazz. La
                  plataforma es intuitiva y el apoyo de la comunidad fue
                  increíble."
                </p>
                <p className="font-semibold">- María González, Promotora</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-card">
                <p className="text-muted-foreground mb-4 italic">
                  "Me encanta poder apoyar eventos culturales en mi ciudad.
                  Junta.pe me permite ser parte del cambio."
                </p>
                <p className="font-semibold">- Carlos Ruiz, Donador</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-card">
                <p className="text-muted-foreground mb-4 italic">
                  "Una plataforma necesaria para fortalecer la cultura peruana.
                  Transparente y fácil de usar."
                </p>
                <p className="font-semibold">- Ana Pérez, Donadora</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
