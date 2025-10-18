import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Shield, Eye, FileText } from "lucide-react";

const Policies = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24">
        <section className="gradient-hero text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Políticas y Términos
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Transparencia y confianza en cada paso
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Privacy Policy */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold">Política de Privacidad</h2>
              </div>
              
              <div className="space-y-6 text-muted-foreground">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Recopilación de Información
                  </h3>
                  <p>
                    En Junta.pe recopilamos únicamente la información necesaria
                    para operar la plataforma y proporcionar nuestros servicios.
                    Esto incluye: nombre, correo electrónico, información de
                    pago (procesada de forma segura por terceros), y datos de
                    uso de la plataforma.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Uso de la Información
                  </h3>
                  <p>
                    Utilizamos tu información para: procesar donaciones,
                    gestionar cuentas de usuario, enviar actualizaciones sobre
                    eventos, mejorar nuestros servicios y cumplir con
                    obligaciones legales. Nunca vendemos tu información a
                    terceros.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Seguridad de Datos
                  </h3>
                  <p>
                    Implementamos medidas de seguridad técnicas y
                    organizacionales para proteger tu información personal
                    contra acceso no autorizado, pérdida o alteración. Todos los
                    datos sensibles son encriptados.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Tus Derechos
                  </h3>
                  <p>
                    Tienes derecho a acceder, corregir o eliminar tu información
                    personal en cualquier momento. Puedes ejercer estos derechos
                    contactándonos a través de privacidad@junta.pe
                  </p>
                </div>
              </div>
            </div>

            {/* Terms of Use */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold">Términos de Uso</h2>
              </div>
              
              <div className="space-y-6 text-muted-foreground">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Aceptación de Términos
                  </h3>
                  <p>
                    Al usar Junta.pe, aceptas cumplir con estos términos de uso.
                    Si no estás de acuerdo, por favor no utilices la plataforma.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Responsabilidades del Usuario
                  </h3>
                  <p>
                    Los promotores son responsables de la veracidad de la
                    información de sus eventos y del uso apropiado de los fondos
                    recaudados. Los donadores comprenden que las donaciones son
                    voluntarias y no reembolsables, salvo en casos excepcionales.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Propiedad Intelectual
                  </h3>
                  <p>
                    El contenido creado por los usuarios (descripciones,
                    imágenes) sigue siendo propiedad de sus creadores. Al
                    publicar en Junta.pe, otorgas una licencia para mostrar y
                    promocionar tu contenido en la plataforma.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Limitación de Responsabilidad
                  </h3>
                  <p>
                    Junta.pe actúa como intermediario entre promotores y
                    donadores. No garantizamos el éxito de los eventos ni somos
                    responsables de disputas entre usuarios, aunque ofrecemos
                    mecanismos de resolución.
                  </p>
                </div>
              </div>
            </div>

            {/* Transparency */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold">Transparencia de Fondos</h2>
              </div>
              
              <div className="space-y-6 text-muted-foreground">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Seguimiento en Tiempo Real
                  </h3>
                  <p>
                    Todos los eventos muestran públicamente el progreso de
                    recaudación, permitiendo a donadores ver el impacto de sus
                    contribuciones en tiempo real.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Distribución de Fondos
                  </h3>
                  <p>
                    De cada donación, el 95% va directamente al promotor del
                    evento y el 5% se destina a mantener la plataforma operativa
                    y mejorar nuestros servicios.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Reportes y Rendición de Cuentas
                  </h3>
                  <p>
                    Alentamos a los promotores a compartir actualizaciones sobre
                    el uso de los fondos y el resultado de sus eventos. La
                    transparencia fortalece la confianza de nuestra comunidad.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Policies;
