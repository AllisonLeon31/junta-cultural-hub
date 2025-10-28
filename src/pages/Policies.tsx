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
                    Qué datos recolectamos
                  </h3>
                  <p>
                Recolectamos solo lo necesario para operar la plataforma: nombre, correo electrónico, contraseña cifrada, datos de perfil y uso. Los pagos se procesan mediante terceros certificados (no almacenamos los datos de tu tarjeta).
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Para qué usamos tus datos
                  </h3>
                  <p>
                 •	Procesar donaciones y operar tu cuenta.
                <br /> •	Enviarte confirmaciones, actualizaciones y avisos sobre eventos.
                <br /> •	Mejorar la plataforma y prevenir fraude.
                <br /> •	Cumplir obligaciones legales y requerimientos de autoridades.

                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Con quién lo compartimos
                  </h3>
                  <p>
                Compartimos datos solo con proveedores que nos ayudan a operar (pasarela de pagos, correo transaccional, analítica), bajo contratos que protegen tu información. No vendemos tus datos.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Cookies y analítica
                  </h3>
                  <p>
                    Usamos cookies para recordar tu sesión y medir uso de la plataforma. Puedes gestionarlas desde la configuración de tu navegador.
                  </p>
                </div>
              </div>
              <div className="space-y-6 text-muted-foreground">
  <div>
    <h3 className="text-xl font-semibold text-foreground mb-3">
      Conservación
    </h3>
    <p>
      Guardamos tus datos mientras tengas cuenta o sea necesario para prestar el
      servicio y cumplir obligaciones legales. Luego los eliminamos o
      anonimizamos.
    </p>
  </div>

  <div>
    <h3 className="text-xl font-semibold text-foreground mb-3">
      Seguridad
    </h3>
    <p>
      Aplicamos medidas técnicas y organizativas para proteger tu información
      (cifrado en tránsito, controles de acceso). Los pagos se realizan a través
      de pasarelas con estándares de seguridad del sector.
    </p>
  </div>

  <div>
    <h3 className="text-xl font-semibold text-foreground mb-3">
      Tus derechos
    </h3>
    <p>
      Puedes acceder, corregir, actualizar, portar o solicitar la eliminación de
      tu información, así como oponerte u objetar ciertos usos. Escríbenos a{" "}
      <strong>privacidad@junta.pe</strong>.
    </p>
  </div>

  <div>
    <h3 className="text-xl font-semibold text-foreground mb-3">
      Menores de edad
    </h3>
    <p>
      La plataforma está dirigida a mayores de 18 años. Si detectamos datos de
      menores sin autorización, los eliminaremos.
    </p>
  </div>

  <div>
    <h3 className="text-xl font-semibold text-foreground mb-3">
      Cambios a esta política
    </h3>
    <p>
      Podemos actualizar esta política. Publicaremos la fecha de última
      actualización y, si el cambio es relevante, te lo notificaremos.
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
                    De cada donación: 90% va al organizador, 8% es comisión de la plataforma (incluye procesamiento y soporte) y 2% se destina a Donación Social. Estos importes se descuentan al transferir.
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
