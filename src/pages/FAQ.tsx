import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24">
        <section className="gradient-hero text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Preguntas Frecuentes
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Encuentra respuestas a las dudas más comunes sobre Junta.pe
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-8">Para Donadores</h2>
            <Accordion type="single" collapsible className="mb-12">
              <AccordionItem value="d1">
                <AccordionTrigger>
                  ¿Cómo puedo donar a un evento?
                </AccordionTrigger>
                <AccordionContent>
                  Es muy sencillo. Solo debes explorar los eventos disponibles,
                  seleccionar el que te interese, hacer clic en "Ver Detalles" y
                  elegir el monto que deseas donar. Puedes pagar con Yape, Plin
                  o tarjeta de crédito/débito.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="d2">
                <AccordionTrigger>
                  ¿Es seguro donar en Junta.pe?
                </AccordionTrigger>
                <AccordionContent>
                  Sí, completamente. Utilizamos sistemas de pago seguros y
                  encriptados. Tu información financiera está protegida y nunca
                  es compartida con terceros sin tu autorización.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="d3">
                <AccordionTrigger>
                  ¿Puedo hacer seguimiento de mis donaciones?
                </AccordionTrigger>
                <AccordionContent>
                  Por supuesto. En tu dashboard "Mi Impacto" podrás ver todos
                  los eventos que has apoyado, el monto donado y el progreso de
                  cada proyecto en tiempo real.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="d4">
                <AccordionTrigger>
                  ¿Qué pasa si un evento no alcanza su meta?
                </AccordionTrigger>
                <AccordionContent>
                  Los fondos se destinan al evento aunque no alcance el 100% de
                  su meta, a menos que el promotor especifique lo contrario. En
                  casos especiales, se puede ofrecer reembolso si el evento se
                  cancela.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="d5">
                <AccordionTrigger>
                  ¿Puedo recibir comprobante de donación?
                </AccordionTrigger>
                <AccordionContent>
                  Sí, al completar tu donación recibirás un comprobante digital
                  por correo electrónico que puedes usar como constancia de tu
                  aporte.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <h2 className="text-2xl font-bold mb-8">Para Promotores</h2>
            <Accordion type="single" collapsible>
              <AccordionItem value="p1">
                <AccordionTrigger>
                  ¿Cómo creo un evento en Junta.pe?
                </AccordionTrigger>
                <AccordionContent>
                  Regístrate como promotor, inicia sesión y haz clic en "Crear
                  nuevo evento". Completa el formulario con los detalles de tu
                  proyecto: nombre, categoría, fecha, descripción, imagen y meta
                  de recaudación. Una vez publicado, estará visible para todos
                  los usuarios.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="p2">
                <AccordionTrigger>
                  ¿Cuánto cobra Junta.pe por usar la plataforma?
                </AccordionTrigger>
                <AccordionContent>
                  Junta.pe cobra una comisión del 8% sobre lo recaudado (incluye procesamiento de pagos y soporte). Además, se destina un 2% a Donación Social. Estos importes se descuentan al transferir los fondos al organizador.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="p3">
                <AccordionTrigger>
                  ¿Cuándo recibo los fondos recaudados?
                </AccordionTrigger>
                <AccordionContent>
                  Los fondos se transfieren a tu cuenta bancaria al finalizar la
                  campaña o cuando alcances el 100% de tu meta, lo que ocurra
                  primero. El proceso de transferencia toma de 3 a 5 días
                  hábiles.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="p4">
                <AccordionTrigger>
                  ¿Puedo editar mi evento después de publicarlo?
                </AccordionTrigger>
                <AccordionContent>
                  Sí, puedes editar la descripción, imagen y algunos detalles
                  del evento desde tu dashboard. Sin embargo, no puedes cambiar
                  la meta de recaudación una vez que hayas recibido donaciones.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="p5">
                <AccordionTrigger>
                  ¿Cómo promociono mi evento?
                </AccordionTrigger>
                <AccordionContent>
                  Junta.pe te proporciona herramientas para compartir tu evento
                  en redes sociales. También destacamos eventos con buen
                  desempeño en nuestra página principal y boletines.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
