import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { EventModal } from "@/components/EventModal";
import { Calendar, MapPin, Users, Clock, ArrowLeft } from "lucide-react";

// Mock event data (in real app, fetch from API)
const mockEvents = [
  // Música
  {
    id: "festival-jazz-verano",
    title: "Festival de Jazz de Verano",
    subtitle: "Una noche bajo las estrellas",
    category: "Música",
    date: "2025-02-15",
    time: "19:00",
    location: "Parque de la Exposición, Lima",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800",
    videoUrl: "https://www.youtube.com/embed/vmDDOFXSgAs",
    description: "Únete a nosotros para una velada mágica de jazz en vivo bajo el cielo nocturno de Lima.",
    fullDescription: `El Festival de Jazz de Verano es un evento anual que celebra la rica tradición del jazz y su influencia en la cultura musical peruana. Este año, reuniremos a los mejores exponentes locales e internacionales para crear una experiencia musical inolvidable.

**Sobre el evento:**
Más que un concierto, es una celebración de la música, la comunidad y la cultura. Durante 6 horas ininterrumpidas, el Parque de la Exposición se transformará en un escenario vibrante donde el jazz cobrará vida.

**Artistas confirmados:**
- Perú Jazz Collective
- María Santos Trio
- Los Hermanos del Swing
- Special guest: Marcus Johnson (USA)

**Equipo organizador:**
Somos un grupo de productores culturales con más de 15 años de experiencia en la organización de eventos musicales. Nuestro compromiso es llevar cultura de calidad a todos los rincones de Lima.

**Por qué necesitamos tu apoyo:**
Los fondos recaudados se destinarán a:
- Escenario y sistema de sonido profesional (40%)
- Honorarios de artistas (35%)
- Producción y logística (15%)
- Difusión y marketing (10%)

Tu contribución no solo hace posible este evento, también apoya el desarrollo de la escena cultural peruana y brinda oportunidades a artistas locales.`,
    goal: 15000,
    raised: 9750,
    donors: 127,
    daysLeft: 12,
  },
  {
    id: "concierto-rock-independiente",
    title: "Concierto Rock Independiente",
    subtitle: "Bandas emergentes peruanas",
    category: "Música",
    date: "2025-02-22",
    time: "20:30",
    location: "La Noche de Barranco, Lima",
    image: "https://images.unsplash.com/photo-1501612780327-45045538702b?w=800",
    videoUrl: "",
    description: "Una noche de rock peruano con las bandas independientes más prometedoras del momento.",
    fullDescription: `El Concierto Rock Independiente reúne a las bandas emergentes más talentosas de la escena rock peruana para una noche de música auténtica y rebelde.

**Sobre el evento:**
El rock peruano vive un momento de efervescencia. Nuevas bandas están surgiendo con propuestas frescas que fusionan el rock clásico con sonidos contemporáneos y raíces andinas.

**Bandas confirmadas:**
- Los Outsiders
- Neon Souls
- Piedra Angular
- Eco del Vacío

**Nuestra visión:**
Queremos crear un espacio permanente para que las bandas independientes puedan compartir su música con un público más amplio, sin depender de grandes productoras.

**Inversión de fondos:**
- Alquiler del local y permisos (30%)
- Equipos de sonido e iluminación (35%)
- Honorarios de bandas (25%)
- Producción y marketing (10%)

Tu apoyo impulsa la escena rock independiente peruana y ayuda a que más personas descubran estos increíbles talentos.`,
    goal: 8000,
    raised: 3600,
    donors: 89,
    daysLeft: 19,
  },
  {
    id: "festival-musica-andina",
    title: "Festival de Música Andina",
    subtitle: "Celebrando nuestras raíces",
    category: "Música",
    date: "2025-03-08",
    time: "16:00",
    location: "Plaza de Armas, Cusco",
    image: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800",
    videoUrl: "https://www.youtube.com/embed/IgQfUPC79tY",
    description: "Un homenaje a la música tradicional andina con los mejores intérpretes de la región.",
    fullDescription: `El Festival de Música Andina es una celebración de nuestra herencia cultural y musical que ha trascendido generaciones.

**Sobre el evento:**
La música andina es el alma de nuestros pueblos. En este festival reuniremos a maestros y jóvenes intérpretes para mostrar la riqueza de nuestras tradiciones musicales y su evolución contemporánea.

**Artistas confirmados:**
- Los Kjarkas
- Alborada
- Savia Andina
- Proyección Andina

**Objetivo cultural:**
Más allá del espectáculo, este festival busca preservar y difundir la música andina entre las nuevas generaciones, mostrando su relevancia y belleza en el mundo actual.

**Distribución del presupuesto:**
- Honorarios de artistas (40%)
- Escenario y sonido (30%)
- Logística y producción (20%)
- Talleres educativos gratuitos (10%)

Con tu apoyo, mantenemos vivas nuestras tradiciones y las compartimos con el mundo.`,
    goal: 10000,
    raised: 7800,
    donors: 156,
    daysLeft: 28,
  },
  {
    id: "noche-musica-electronica",
    title: "Noche de Música Electrónica",
    subtitle: "DJs nacionales e internacionales",
    category: "Música",
    date: "2025-03-18",
    time: "22:00",
    location: "Centro de Convenciones, Lima",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800",
    videoUrl: "",
    description: "Una experiencia audiovisual única con los mejores DJs de la escena electrónica.",
    fullDescription: `La Noche de Música Electrónica promete ser el evento más esperado del año para los amantes de la música electrónica en Perú.

**Sobre el evento:**
Transformaremos el Centro de Convenciones en una experiencia inmersiva con visuales 360°, iluminación láser de última generación y un sistema de sonido que hará vibrar cada rincón del recinto.

**Line-up:**
- DJ Hernán Cattáneo (Argentina)
- Adriana Lopez (Colombia)
- Fabrizio Mammarella (Italia)
- Selección de DJs locales

**Producción de clase mundial:**
Este evento contará con producción técnica internacional, incluyendo mapping 3D, efectos especiales y una experiencia sensorial completa.

**Inversión de fondos:**
- Honorarios de DJs (45%)
- Producción técnica y visual (35%)
- Alquiler del espacio (12%)
- Marketing y difusión (8%)

Apoya la escena electrónica peruana y sé parte de una noche inolvidable.`,
    goal: 12000,
    raised: 3600,
    donors: 62,
    daysLeft: 38,
  },
  {
    id: "festival-salsa-peru",
    title: "Festival de Salsa Peruana",
    subtitle: "El sabor que nos une",
    category: "Música",
    date: "2025-03-25",
    time: "18:00",
    location: "Explanada de la Marina, Callao",
    image: "https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=800",
    videoUrl: "",
    description: "La mejor salsa peruana en un solo lugar, con orquestas legendarias y nuevas promesas.",
    fullDescription: `El Festival de Salsa Peruana rinde homenaje a uno de los géneros más queridos y bailables de nuestra cultura popular.

**Sobre el evento:**
El Callao es la cuna de la salsa peruana, y qué mejor lugar que la Explanada de la Marina para celebrar este género que nos hace mover las caderas y el corazón.

**Orquestas confirmadas:**
- Orquesta Candela
- La Tribu de los Gorilas
- Zaperoko
- Invitados especiales desde Nueva York

**Experiencia completa:**
Además de los conciertos, habrá clases de baile gratuitas, concursos de salsa y una feria gastronómica con lo mejor de la cocina chalaca.

**Presupuesto:**
- Honorarios de orquestas (40%)
- Escenario y sonido (25%)
- Producción y logística (20%)
- Actividades paralelas (15%)

Con tu aporte, celebramos la salsa que corre por nuestras venas y la compartimos con todos.`,
    goal: 9000,
    raised: 4950,
    donors: 98,
    daysLeft: 45,
  },

  // Comedia
  {
    id: "noche-comedia-stand-up",
    title: "Noche de Comedia Stand-Up",
    subtitle: "Risas y buen humor garantizado",
    category: "Comedia",
    date: "2025-02-20",
    time: "20:00",
    location: "Teatro Municipal, Miraflores",
    image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800",
    videoUrl: "",
    description: "Los mejores comediantes nacionales e internacionales reunidos en una noche llena de risas.",
    fullDescription: `La Noche de Comedia Stand-Up es el evento de humor más esperado del año. Reuniremos a los comediantes más talentosos de Perú y Latinoamérica para una noche que te hará llorar de la risa.

**Sobre el evento:**
El stand-up comedy es un arte que requiere valentía, creatividad y conexión genuina con el público. En esta noche especial, queremos crear un espacio donde el humor nos una y nos haga reflexionar sobre nuestra realidad con una sonrisa.

**Line-up de comediantes:**
- Carlos "El Risueño" Mendoza
- Lucia Ramos
- Javier Ponce
- Invitado internacional sorpresa

**Nuestra misión:**
Queremos democratizar el acceso a la cultura del humor. Por eso, el 20% de las entradas serán distribuidas gratuitamente a comunidades con menor acceso a eventos culturales.

**Inversión de fondos:**
- Alquiler del teatro (30%)
- Honorarios de artistas (40%)
- Producción técnica (20%)
- Programa de entradas gratuitas (10%)

Apoyar este evento significa apostar por el talento peruano y hacer que más personas puedan disfrutar de una noche de entretenimiento de calidad.`,
    goal: 8000,
    raised: 5600,
    donors: 89,
    daysLeft: 18,
  },
  {
    id: "improvisacion-comedy-club",
    title: "Comedy Club: Improvisación",
    subtitle: "Teatro improvisado sin límites",
    category: "Comedia",
    date: "2025-02-27",
    time: "21:00",
    location: "Café Teatro La Plaza, Miraflores",
    image: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=800",
    videoUrl: "",
    description: "Comedia improvisada donde el público decide el rumbo de cada escena.",
    fullDescription: `Comedy Club: Improvisación es un espectáculo único donde nada está escrito y todo puede pasar.

**Sobre el evento:**
La improvisación teatral es el arte de crear historias en el momento, sin guión ni red de seguridad. Nuestros improvisadores tomarán sugerencias del público para crear escenas hilarantes y únicas cada noche.

**Elenco:**
- Colectivo de Improvisación Lima
- Invitados de Impro Perú
- Workshops previos al show

**Formato innovador:**
El público participará activamente sugiriendo temas, personajes y situaciones. Ninguna función será igual a la anterior.

**Distribución del presupuesto:**
- Honorarios del elenco (35%)
- Alquiler del espacio (30%)
- Producción y utilería (20%)
- Talleres comunitarios (15%)

Tu apoyo hace posible este formato de comedia única en Lima y ayuda a desarrollar el arte de la improvisación.`,
    goal: 5000,
    raised: 2000,
    donors: 54,
    daysLeft: 25,
  },
  {
    id: "festival-humor-latino",
    title: "Festival de Humor Latino",
    subtitle: "Comediantes de toda Latinoamérica",
    category: "Comedia",
    date: "2025-03-10",
    time: "19:30",
    location: "Teatro Británico, Lima",
    image: "https://images.unsplash.com/photo-1516981879613-9f5da904015fe?w=800",
    videoUrl: "",
    description: "Un encuentro de las mejores voces del humor latinoamericano.",
    fullDescription: `El Festival de Humor Latino celebra la diversidad y riqueza del humor de nuestra región, reuniendo a comediantes de diferentes países para compartir sus perspectivas únicas.

**Sobre el evento:**
El humor es un lenguaje universal que nos conecta. Este festival mostrará cómo cada país latinoamericano tiene su propia forma de hacer reír, pero todos compartimos las mismas raíces culturales.

**Comediantes confirmados:**
- Andrés López (Colombia)
- Sofía Niño de Rivera (México)
- Malena Pichot (Argentina)
- Talentos peruanos

**Visión del festival:**
Crear un puente cultural a través del humor, mostrando que a pesar de nuestras diferencias, nos une mucho más de lo que nos separa.

**Inversión de fondos:**
- Honorarios internacionales (50%)
- Alojamiento y logística (20%)
- Alquiler del teatro (18%)
- Producción y marketing (12%)

Con tu donación, traemos las mejores voces del humor latinoamericano a Lima.`,
    goal: 11000,
    raised: 6820,
    donors: 112,
    daysLeft: 32,
  },
  {
    id: "show-comedia-familiar",
    title: "Show de Comedia Familiar",
    subtitle: "Humor para toda la familia",
    category: "Comedia",
    date: "2025-03-17",
    time: "17:00",
    location: "Auditorio Miraflores, Lima",
    image: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=800",
    videoUrl: "",
    description: "Comedia limpia y divertida que pueden disfrutar desde niños hasta abuelos.",
    fullDescription: `El Show de Comedia Familiar es un evento único diseñado para que toda la familia pueda reír junta en un ambiente seguro y acogedor.

**Sobre el evento:**
Creemos que el humor de calidad no necesita ser vulgar para ser divertido. Este show presenta sketches, música y comedia que entretienen a todas las edades.

**Artistas:**
- Payasos profesionales
- Comediantes especializados en humor familiar
- Músicos y malabaristas

**Propuesta de valor:**
En un mundo donde el entretenimiento familiar es escaso, este show ofrece una opción de calidad para pasar tiempo de calidad en familia.

**Presupuesto:**
- Honorarios de artistas (40%)
- Alquiler del auditorio (25%)
- Producción y escenografía (20%)
- Actividades interactivas (15%)

Tu contribución ayuda a crear más opciones de entretenimiento familiar de calidad en Lima.`,
    goal: 6500,
    raised: 3250,
    donors: 76,
    daysLeft: 39,
  },
  {
    id: "comedia-por-buena-causa",
    title: "Comedia por una Buena Causa",
    subtitle: "Risas que ayudan",
    category: "Comedia",
    date: "2025-03-28",
    time: "20:30",
    location: "Club de la Unión, Lima",
    image: "https://images.unsplash.com/photo-1555843645-a37cf0e1c4f4?w=800",
    videoUrl: "",
    description: "Show benéfico donde las risas se convierten en ayuda para quienes más lo necesitan.",
    fullDescription: `Comedia por una Buena Causa combina el humor con la solidaridad, destinando el 100% de lo recaudado a fundaciones que trabajan con niños en situación vulnerable.

**Sobre el evento:**
El humor tiene el poder de sanar y transformar. En este show benéfico, las risas del público se convertirán en sonrisas para niños que más lo necesitan.

**Artistas participantes:**
- Todos los comediantes donan su tiempo
- Músicos invitados
- Sorteos y subastas durante el evento

**Impacto social:**
Los fondos recaudados se distribuirán entre tres fundaciones certificadas que trabajan con educación, salud y alimentación infantil.

**Distribución transparente:**
- Fundación Ayuda al Niño (40%)
- Casa Hogar San José (35%)
- Comedor Infantil Esperanza (25%)

Tu donación no solo te garantiza una noche de risas, sino que cambia vidas de manera directa y medible.`,
    goal: 7000,
    raised: 5950,
    donors: 143,
    daysLeft: 50,
  },

  // Teatro
  {
    id: "romeo-julieta-version-moderna",
    title: "Romeo y Julieta: Versión Moderna",
    subtitle: "Teatro clásico con un twist contemporáneo",
    category: "Teatro",
    date: "2025-03-05",
    time: "18:00",
    location: "Teatro Segura, Centro de Lima",
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=800",
    videoUrl: "",
    description: "Una reinterpretación moderna del clásico de Shakespeare ambientada en el Lima actual.",
    fullDescription: `Romeo y Julieta: Versión Moderna es una audaz reinterpretación del clásico shakespeariano, trasladado al contexto urbano de Lima contemporánea. Esta producción combina teatro clásico con elementos multimedia y música original.

**Visión artística:**
Shakespeare escribió sobre el amor, el conflicto y la juventud de una manera atemporal. Nuestra versión mantiene la esencia de la historia original pero la contextualiza en los desafíos que enfrentan los jóvenes limeños hoy: diferencias socioeconómicas, prejuicios y la búsqueda de identidad.

**Elenco y equipo:**
- Dirección: Patricia Ramos (Premio Nacional de Teatro 2023)
- Elenco: 12 actores profesionales
- Músicos en vivo: 4
- Equipo técnico: 8 personas

**Innovación escénica:**
Utilizaremos proyecciones multimedia, música original de compositores peruanos y coreografía contemporánea para crear una experiencia teatral inmersiva.

**Impacto social:**
Parte de las funciones serán gratuitas para estudiantes de escuelas públicas, acompañadas de talleres educativos sobre teatro y literatura.

**Distribución del presupuesto:**
- Honorarios del elenco y equipo (45%)
- Producción y escenografía (25%)
- Alquiler del teatro (15%)
- Programa educativo (10%)
- Marketing y difusión (5%)

Tu apoyo hace posible que el teatro clásico llegue a nuevas audiencias de manera innovadora y accesible.`,
    goal: 12000,
    raised: 8400,
    donors: 104,
    daysLeft: 25,
  },
  {
    id: "obra-teatro-peruano-contemporaneo",
    title: "Teatro Peruano Contemporáneo",
    subtitle: "Voces de nuestra generación",
    category: "Teatro",
    date: "2025-03-12",
    time: "20:00",
    location: "Centro Cultural PUCP, Lima",
    image: "https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=800",
    videoUrl: "",
    description: "Tres obras cortas escritas por dramaturgos peruanos emergentes.",
    fullDescription: `Teatro Peruano Contemporáneo presenta tres obras originales que exploran la realidad peruana actual desde perspectivas frescas y provocadoras.

**Sobre el evento:**
El teatro peruano contemporáneo está viviendo un renacimiento. Nuevos dramaturgos están contando historias que reflejan nuestra realidad con honestidad, humor y crítica social.

**Obras presentadas:**
1. "La Espera" - sobre la migración venezolana
2. "Cerro sin Retorno" - drama urbano limeño
3. "Mamá Huaca" - fusión de mitología andina y presente

**Directores y elenco:**
- Tres directores emergentes
- 15 actores en total
- Producción colaborativa

**Objetivo cultural:**
Dar espacio a nuevas voces teatrales y contar historias que nos representen como sociedad actual.

**Presupuesto:**
- Honorarios de dramaturgos y directores (35%)
- Honorarios del elenco (30%)
- Producción y escenografía (20%)
- Alquiler del espacio (15%)

Con tu apoyo, impulsamos la nueva generación de teatro peruano.`,
    goal: 9500,
    raised: 5225,
    donors: 87,
    daysLeft: 32,
  },
  {
    id: "monologos-urbanos",
    title: "Monólogos Urbanos",
    subtitle: "Historias de la ciudad que vivimos",
    category: "Teatro",
    date: "2025-03-19",
    time: "21:00",
    location: "Teatro La Plaza, San Miguel",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800",
    videoUrl: "",
    description: "Historias personales que retratan la vida cotidiana en Lima.",
    fullDescription: `Monólogos Urbanos es una colección de historias reales interpretadas por sus propios protagonistas, capturando la esencia de vivir en Lima hoy.

**Sobre el evento:**
Cada monólogo es una ventana a la vida de personas reales: un taxista, una enfermera, un vendedor ambulante, una estudiante universitaria. Sus historias son nuestra historia colectiva.

**Formato único:**
- 8 monólogos de 10 minutos cada uno
- Interpretados por personas reales (no actores profesionales)
- Dirección y entrenamiento por profesionales del teatro

**Impacto social:**
Este proyecto da voz a quienes normalmente no la tienen, mostrando que cada vida merece ser contada y escuchada.

**Inversión:**
- Talleres de actuación para participantes (40%)
- Dirección y producción (30%)
- Alquiler del teatro (20%)
- Documentación audiovisual (10%)

Tu aporte hace posible que historias invisibilizadas sean escuchadas.`,
    goal: 6000,
    raised: 2880,
    donors: 69,
    daysLeft: 39,
  },
  {
    id: "festival-teatro-callejero",
    title: "Festival de Teatro Callejero",
    subtitle: "Arte en las calles de Lima",
    category: "Teatro",
    date: "2025-04-02",
    time: "16:00",
    location: "Parque Kennedy, Miraflores",
    image: "https://images.unsplash.com/photo-1518608159586-908285de2c82?w=800",
    videoUrl: "",
    description: "El teatro sale a las calles para llegar a todos sin barreras ni boletos.",
    fullDescription: `El Festival de Teatro Callejero transforma el Parque Kennedy en un escenario abierto donde el arte es accesible para todos.

**Sobre el evento:**
El teatro callejero rompe la cuarta pared y elimina las barreras económicas y sociales. Durante un día completo, el parque será escenario de múltiples presentaciones simultáneas.

**Compañías participantes:**
- 10 grupos de teatro callejero de Lima
- Invitados de provincias
- Talleres abiertos para el público

**Programación:**
- 4:00 PM - 10:00 PM
- Presentaciones cada 30 minutos
- Talleres participativos
- Zona de conversación con artistas

**Presupuesto:**
- Honorarios de compañías (40%)
- Permisos y logística (25%)
- Equipos técnicos portátiles (20%)
- Difusión y coordinación (15%)

Apoya el teatro accesible para todos y la democratización de la cultura.`,
    goal: 8500,
    raised: 6120,
    donors: 134,
    daysLeft: 53,
  },
  {
    id: "obra-experimental-vanguardia",
    title: "Teatro Experimental de Vanguardia",
    subtitle: "Rompiendo esquemas escénicos",
    category: "Teatro",
    date: "2025-04-15",
    time: "21:30",
    location: "Espacio Fundación Telefónica, Lima",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800",
    videoUrl: "",
    description: "Una experiencia teatral inmersiva que desafía las convenciones tradicionales.",
    fullDescription: `Teatro Experimental de Vanguardia es una propuesta radical que fusiona teatro, danza, video arte y tecnología para crear una experiencia totalmente nueva.

**Sobre el evento:**
Esta obra no tiene argumento lineal ni personajes tradicionales. Es una experiencia sensorial que invita al público a construir su propia interpretación a partir de estímulos visuales, sonoros y corporales.

**Equipo creativo:**
- Colectivo Escénico Experimental
- Diseñadores multimedia
- Músicos electrónicos en vivo
- 8 performers

**Innovación artística:**
Utilizaremos realidad aumentada, proyecciones 360°, y el público podrá moverse libremente por el espacio, eligiendo qué observar.

**Objetivo:**
Expandir los límites del teatro y crear nuevas formas de expresión artística que reflejen la complejidad del mundo contemporáneo.

**Distribución del presupuesto:**
- Desarrollo tecnológico (35%)
- Honorarios del equipo creativo (30%)
- Alquiler del espacio (20%)
- Equipamiento técnico (15%)

Con tu apoyo, empujamos los límites del arte escénico peruano.`,
    goal: 10000,
    raised: 3800,
    donors: 51,
    daysLeft: 66,
  },

  // Arte y Exposición
  {
    id: "exposicion-arte-urbano-contemporaneo",
    title: "Arte Urbano Contemporáneo",
    subtitle: "Muralismo y grafiti peruano",
    category: "Arte y Exposición",
    date: "2025-02-28",
    time: "18:00",
    location: "Galería 80m2, Barranco",
    image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800",
    videoUrl: "",
    description: "Una exposición que celebra el arte urbano como expresión legítima de cultura contemporánea.",
    fullDescription: `Arte Urbano Contemporáneo trae las calles a la galería, mostrando el trabajo de los mejores muralistas y artistas urbanos de Perú.

**Sobre el evento:**
El arte urbano ha pasado de ser considerado vandalismo a ser reconocido como una forma legítima de expresión artística. Esta exposición documenta y celebra esta evolución.

**Artistas participantes:**
- Entes y Pesimo (Lima)
- Jade Rivera (Cusco)
- Decertor (Arequipa)
- Colectivos de arte callejero

**Formato de la exposición:**
- Fotografías de murales icónicos
- Obras en lienzo
- Video-documentales del proceso creativo
- Mural en vivo durante la inauguración

**Impacto cultural:**
Legitimamos el arte urbano y mostramos cómo transforma espacios públicos en galerías abiertas para todos.

**Presupuesto:**
- Honorarios de artistas (35%)
- Montaje y curaduría (25%)
- Alquiler de galería (20%)
- Catálogo y documentación (20%)

Tu donación apoya el reconocimiento del arte urbano como patrimonio cultural.`,
    goal: 7500,
    raised: 6000,
    donors: 145,
    daysLeft: 26,
  },
  {
    id: "muestra-fotografia-peruana",
    title: "Muestra de Fotografía Peruana",
    subtitle: "Lentes que capturan nuestra identidad",
    category: "Arte y Exposición",
    date: "2025-03-08",
    time: "19:00",
    location: "Centro Cultural de España, Lima",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800",
    videoUrl: "",
    description: "Exposición fotográfica que retrata la diversidad y complejidad del Perú contemporáneo.",
    fullDescription: `La Muestra de Fotografía Peruana reúne el trabajo de 20 fotógrafos que capturan diferentes aspectos de nuestra realidad nacional.

**Sobre el evento:**
La fotografía es memoria y testimonio. Esta muestra presenta imágenes que van desde paisajes andinos hasta retratos urbanos, documentando la riqueza y diversidad de nuestro país.

**Fotógrafos participantes:**
- Fotógrafos reconocidos y emergentes
- Diferentes estilos: documental, artístico, fotoperiodismo
- Representación de todas las regiones del país

**Temáticas:**
- Identidad cultural
- Transformación urbana
- Naturaleza y medio ambiente
- Retratos sociales

**Valor educativo:**
Cada fotografía estará acompañada de textos explicativos y habrá visitas guiadas gratuitas los fines de semana.

**Distribución del presupuesto:**
- Impresión de fotografías de calidad museográfica (40%)
- Honorarios de fotógrafos (30%)
- Montaje y curaduría (20%)
- Catálogo impreso (10%)

Con tu apoyo, preservamos y difundimos la memoria visual de nuestro país.`,
    goal: 6000,
    raised: 3900,
    donors: 98,
    daysLeft: 28,
  },
  {
    id: "exposicion-artistas-emergentes",
    title: "Exposición Artistas Emergentes",
    subtitle: "Nuevas voces del arte peruano",
    category: "Arte y Exposición",
    date: "2025-03-15",
    time: "18:30",
    location: "MAC Lima, Barranco",
    image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800",
    videoUrl: "",
    description: "Plataforma para que artistas jóvenes muestren su trabajo y se conecten con el público.",
    fullDescription: `Exposición Artistas Emergentes es una vitrina para el talento joven que está redefiniendo el arte contemporáneo peruano.

**Sobre el evento:**
Los artistas emergentes enfrentan barreras para mostrar su trabajo. Esta exposición les da la oportunidad de exhibir en un museo de prestigio y conectar con coleccionistas, galeristas y público.

**Selección de artistas:**
- 15 artistas menores de 35 años
- Convocatoria abierta con jurado de expertos
- Diversidad de medios: pintura, escultura, instalación, video arte

**Programa complementario:**
- Charlas con los artistas
- Tours guiados
- Networking con galeristas
- Catálogo digital

**Impacto en la carrera artística:**
Esta exposición puede ser el lanzamiento profesional que muchos artistas necesitan.

**Presupuesto:**
- Montaje y museografía (30%)
- Honorarios simbólicos para artistas (25%)
- Marketing y difusión (25%)
- Catálogo y documentación (20%)

Tu aporte impulsa las carreras de los artistas del futuro.`,
    goal: 9000,
    raised: 3780,
    donors: 67,
    daysLeft: 35,
  },
  {
    id: "festival-arte-reciclado",
    title: "Festival de Arte Reciclado",
    subtitle: "Transformando desechos en arte",
    category: "Arte y Exposición",
    date: "2025-03-22",
    time: "10:00",
    location: "Parque de las Leyendas, Lima",
    image: "https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=800",
    videoUrl: "",
    description: "Arte con conciencia ambiental que transforma materiales reciclados en obras impactantes.",
    fullDescription: `El Festival de Arte Reciclado combina creatividad con conciencia ambiental, mostrando cómo el arte puede contribuir a un planeta más sostenible.

**Sobre el evento:**
En un mundo ahogado en desechos, el arte reciclado no solo crea belleza, sino que también envía un mensaje poderoso sobre consumo, desperdicio y responsabilidad ambiental.

**Artistas y obras:**
- Esculturas monumentales de plástico reciclado
- Instalaciones de materiales recuperados
- Talleres para niños y familias
- Moda sostenible con materiales reciclados

**Componente educativo:**
- Charlas sobre reciclaje y economía circular
- Demostraciones de técnicas de reutilización
- Zona de reciclaje interactiva

**Objetivo ambiental:**
Inspirar a las personas a repensar su relación con los materiales de desecho y ver el potencial creativo en lo que normalmente tiramos.

**Presupuesto:**
- Honorarios de artistas (30%)
- Materiales y producción (25%)
- Logística del evento (20%)
- Programa educativo (15%)
- Difusión (10%)

Con tu donación, promovemos el arte sostenible y la conciencia ambiental.`,
    goal: 8000,
    raised: 4640,
    donors: 112,
    daysLeft: 42,
  },
  {
    id: "bienal-arte-digital",
    title: "Bienal de Arte Digital",
    subtitle: "La intersección del arte y la tecnología",
    category: "Arte y Exposición",
    date: "2025-04-05",
    time: "17:00",
    location: "Museo de Arte Contemporáneo, Barranco",
    image: "https://images.unsplash.com/photo-1549887534-1541e9326642?w=800",
    videoUrl: "https://www.youtube.com/embed/fEgLgvXcFk4",
    description: "Primera bienal de arte digital en Perú, explorando las nuevas fronteras de la creación artística.",
    fullDescription: `La Bienal de Arte Digital marca un hito en el arte peruano, siendo la primera exposición de esta escala dedicada exclusivamente al arte creado con y para medios digitales.

**Sobre el evento:**
El arte digital está redefiniendo qué es el arte y quién puede ser artista. Esta bienal presenta obras que solo pueden existir en formato digital: arte generativo, NFTs, realidad virtual, inteligencia artificial y más.

**Artistas internacionales y locales:**
- 30 artistas de 12 países
- Pioneros del arte digital peruano
- Colectivos de arte tecnológico

**Experiencias inmersivas:**
- Instalaciones de realidad virtual
- Arte interactivo controlado por el público
- Proyecciones 3D mapping
- Experiencias de realidad aumentada

**Reflexión crítica:**
La bienal incluye conversatorios sobre el impacto de la tecnología en el arte, la propiedad digital, los NFTs y el futuro de la creatividad.

**Presupuesto:**
- Equipamiento tecnológico (40%)
- Honorarios de artistas internacionales (30%)
- Montaje y producción (20%)
- Programa de conferencias (10%)

Tu apoyo posiciona al Perú en la vanguardia del arte digital mundial.`,
    goal: 13000,
    raised: 4550,
    donors: 58,
    daysLeft: 56,
  },
];

export default function EventDetail() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // In real app, fetch event data from API
    const foundEvent = mockEvents.find((e) => e.id === eventId);
    if (foundEvent) {
      setEvent(foundEvent);
    }
  }, [eventId]);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Evento no encontrado</h2>
          <Button onClick={() => navigate("/")}>Volver al inicio</Button>
        </div>
      </div>
    );
  }

  const percentage = Math.round((event.raised / event.goal) * 100);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Image/Video Section */}
        <section className="relative h-[60vh] overflow-hidden">
          {event.videoUrl ? (
            <iframe
              src={event.videoUrl}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <img
              src={event.image}
              alt={event.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 -mt-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Event Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Back Button */}
              <Button
                variant="ghost"
                onClick={() => navigate("/")}
                className="mb-4"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a eventos
              </Button>

              {/* Event Header Card */}
              <div className="bg-card rounded-xl shadow-card p-8 space-y-4">
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {event.category}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                  {event.title}
                </h1>
                <p className="text-xl text-muted-foreground">{event.subtitle}</p>

                {/* Event Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Fecha</p>
                      <p className="font-medium">{new Date(event.date).toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Hora</p>
                      <p className="font-medium">{event.time} hrs</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 md:col-span-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Lugar</p>
                      <p className="font-medium">{event.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description Card */}
              <div className="bg-card rounded-xl shadow-card p-8 space-y-4">
                <h2 className="text-2xl font-bold text-foreground">Sobre este evento</h2>
                <div className="prose prose-lg max-w-none text-foreground whitespace-pre-line">
                  {event.fullDescription}
                </div>
              </div>
            </div>

            {/* Right Column - Donation Card (Sticky) */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl shadow-card-hover p-6 space-y-6 sticky top-24">
                {/* Progress Section */}
                <div className="space-y-3">
                  <div className="flex justify-between items-baseline">
                    <div>
                      <p className="text-3xl font-bold text-primary">
                        S/.{event.raised.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        de S/.{event.goal.toLocaleString()} meta
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-foreground">{percentage}%</p>
                    </div>
                  </div>
                  <Progress value={percentage} className="h-3" />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="text-center p-4 bg-secondary rounded-lg">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Users className="h-4 w-4 text-primary" />
                      <p className="text-2xl font-bold text-foreground">{event.donors}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Donadores</p>
                  </div>
                  <div className="text-center p-4 bg-secondary rounded-lg">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Clock className="h-4 w-4 text-primary" />
                      <p className="text-2xl font-bold text-foreground">{event.daysLeft}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Días restantes</p>
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  size="lg"
                  className="w-full shadow-lg"
                  onClick={() => setIsModalOpen(true)}
                >
                  ❤️ Apoyar este evento
                </Button>

                {/* Info Text */}
                <p className="text-sm text-muted-foreground text-center">
                  Tu aporte ayuda a hacer realidad este evento cultural y apoya a los artistas peruanos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      
      {isModalOpen && (
        <EventModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          event={event}
        />
      )}
    </div>
  );
}
