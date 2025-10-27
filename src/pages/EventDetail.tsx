import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { EventModal } from "@/components/EventModal";
import { Calendar, MapPin, Users, Clock, ArrowLeft } from "lucide-react";

// Mock event data matching Index.tsx IDs
const mockEvents = [
  // Música
  {
    id: "festival-jazz-verano",
    title: "Festival de Jazz de Verano",
    subtitle: "Una noche bajo las estrellas",
    category: "Música",
    date: "2025-01-15",
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

Tu contribución no solo hace posible este evento, también apoya el desarrollo de la escena cultural peruana y brinda oportunidades a artistas locales.`,
    goal: 15000,
    raised: 9750,
    donors: 127,
    daysLeft: 12,
  },
  {
    id: "concierto-rock-nacional",
    title: "Concierto de Rock Nacional",
    subtitle: "Las mejores bandas peruanas en un solo escenario",
    category: "Música",
    date: "2025-01-22",
    time: "20:00",
    location: "Estadio Nacional, Lima",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800",
    videoUrl: "",
    description: "Una celebración del rock peruano con las bandas más icónicas del país.",
    fullDescription: `El Concierto de Rock Nacional reúne a las bandas más legendarias del rock peruano para una noche épica que celebra décadas de música nacional.

**Sobre el evento:**
El rock peruano tiene una historia rica y poderosa. Este concierto rinde homenaje a esa tradición mientras celebra su evolución contemporánea.

**Bandas confirmadas:**
- Libido
- Mar de Copas
- Inyectores
- TK
- Dolores Delirio

**Nuestra visión:**
Crear un espacio donde generaciones de fanáticos del rock puedan reunirse y celebrar la música que ha marcado sus vidas.

Este evento preserva y difunde el legado del rock peruano entre nuevas audiencias.`,
    goal: 20000,
    raised: 11000,
    donors: 98,
    daysLeft: 19,
  },
  {
    id: "festival-musica-electronica",
    title: "Festival de Música Electrónica",
    subtitle: "DJs internacionales en Lima",
    category: "Música",
    date: "2025-01-28",
    time: "22:00",
    location: "Costa Verde, Miraflores",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800",
    videoUrl: "",
    description: "Una experiencia única con los mejores DJs y productores de música electrónica del mundo.",
    fullDescription: `El Festival de Música Electrónica promete ser el evento más esperado del año para los amantes de la música electrónica en Perú.

**Sobre el evento:**
Transformaremos la Costa Verde en una experiencia inmersiva con visuales 360°, iluminación láser de última generación y un sistema de sonido que hará vibrar cada rincón del espacio.

**Line-up:**
- DJ Hernán Cattáneo (Argentina)
- Adriana Lopez (Colombia)
- Nicole Moudaber (Reino Unido)
- Selección de DJs locales

**Producción de clase mundial:**
Este evento contará con producción técnica internacional, incluyendo mapping 3D, efectos especiales y una experiencia sensorial completa.

Apoya la escena electrónica peruana y sé parte de una noche inolvidable.`,
    goal: 25000,
    raised: 20000,
    donors: 215,
    daysLeft: 26,
  },
  {
    id: "noche-salsa-timba",
    title: "Noche de Salsa y Timba",
    subtitle: "Baile y sabor caribeño",
    category: "Música",
    date: "2025-02-08",
    time: "21:00",
    location: "Club Social Lima, Barranco",
    image: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800",
    videoUrl: "",
    description: "Una noche llena de ritmo con las mejores orquestas de salsa y timba.",
    fullDescription: `La Noche de Salsa y Timba rinde homenaje a uno de los géneros más queridos y bailables de nuestra cultura latina.

**Sobre el evento:**
El sabor de la salsa y la timba nos hace mover las caderas y el corazón. Esta noche especial celebra la música que nos une y nos hace celebrar la vida.

**Orquestas confirmadas:**
- Orquesta Candela
- La Tribu
- Invitados especiales desde Cuba

**Experiencia completa:**
Además de los conciertos, habrá clases de baile gratuitas, concursos de salsa y una atmósfera festiva única.

Con tu aporte, celebramos la salsa que corre por nuestras venas y la compartimos con todos.`,
    goal: 10000,
    raised: 4500,
    donors: 76,
    daysLeft: 36,
  },
  {
    id: "recital-musica-clasica",
    title: "Recital de Música Clásica",
    subtitle: "Orquesta Sinfónica Nacional",
    category: "Música",
    date: "2025-02-12",
    time: "19:30",
    location: "Gran Teatro Nacional, San Borja",
    image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800",
    videoUrl: "",
    description: "Una velada con las obras maestras de Beethoven, Mozart y compositores peruanos.",
    fullDescription: `El Recital de Música Clásica presenta una selección de obras maestras interpretadas por la Orquesta Sinfónica Nacional del Perú.

**Sobre el evento:**
La música clásica es patrimonio universal de la humanidad. Esta velada nos permite conectar con las emociones más profundas a través de composiciones inmortales.

**Programa:**
- Sinfonía No. 5 de Beethoven
- Una Pequeña Serenata Nocturna de Mozart
- Obra de compositor peruano contemporáneo
- Piezas de Tchaikovsky

**Director invitado:**
Maestro internacional con reconocimiento en las principales salas de conciertos del mundo.

Este evento hace accesible la música clásica de calidad para todos los peruanos.`,
    goal: 18000,
    raised: 16200,
    donors: 156,
    daysLeft: 40,
  },

  // Comedia
  {
    id: "noche-comedia-stand-up",
    title: "Noche de Comedia Stand-Up",
    subtitle: "Risas y buen humor garantizado",
    category: "Comedia",
    date: "2025-01-20",
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

Apoyar este evento significa apostar por el talento peruano y hacer que más personas puedan disfrutar de una noche de entretenimiento de calidad.`,
    goal: 8000,
    raised: 5600,
    donors: 89,
    daysLeft: 8,
  },
  {
    id: "improvisacion-comedia",
    title: "Show de Improvisación",
    subtitle: "Comedia sin guión",
    category: "Comedia",
    date: "2025-01-25",
    time: "21:00",
    location: "La Estación de Barranco",
    image: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=800",
    videoUrl: "",
    description: "Un espectáculo único donde los comediantes crean historias en el momento basadas en sugerencias del público.",
    fullDescription: `Show de Improvisación es un espectáculo único donde nada está escrito y todo puede pasar.

**Sobre el evento:**
La improvisación teatral es el arte de crear historias en el momento, sin guión ni red de seguridad. Nuestros improvisadores tomarán sugerencias del público para crear escenas hilarantes y únicas cada noche.

**Elenco:**
- Colectivo de Improvisación Lima
- Invitados de Impro Perú
- Workshops previos al show

**Formato innovador:**
El público participará activamente sugiriendo temas, personajes y situaciones. Ninguna función será igual a la anterior.

Tu apoyo hace posible este formato de comedia única en Lima y ayuda a desarrollar el arte de la improvisación.`,
    goal: 6000,
    raised: 3600,
    donors: 67,
    daysLeft: 13,
  },
  {
    id: "comedia-mujeres",
    title: "Noche de Comediantes Mujeres",
    subtitle: "Voces femeninas del humor peruano",
    category: "Comedia",
    date: "2025-02-02",
    time: "19:30",
    location: "Teatro Británico, Miraflores",
    image: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=800",
    videoUrl: "",
    description: "Celebramos el talento de las comediantes peruanas en una noche inolvidable.",
    fullDescription: `Noche de Comediantes Mujeres celebra el talento femenino en el stand-up comedy peruano.

**Sobre el evento:**
Las mujeres están revolucionando el humor con perspectivas frescas, valientes y auténticas. Esta noche especial presenta las voces más originales y poderosas del humor femenino peruano.

**Line-up:**
- Luciana Ramos
- Patricia "La Chola" Barraza
- Andrea Quispe
- Invitada internacional

**Nuestra misión:**
Crear espacios para que más mujeres se atrevan a hacer stand-up comedy y para que el público descubra estas increíbles talentos.

Este evento impulsa la diversidad en el humor peruano y abre puertas para nuevas generaciones.`,
    goal: 7500,
    raised: 5625,
    donors: 102,
    daysLeft: 21,
  },
  {
    id: "comedia-politica",
    title: "Comedia Política: Sin Censura",
    subtitle: "Risas con crítica social",
    category: "Comedia",
    date: "2025-02-10",
    time: "20:30",
    location: "Auditorio Miraflores",
    image: "https://images.unsplash.com/photo-1478147427282-58a87a120781?w=800",
    videoUrl: "",
    description: "Sátira política y humor inteligente sobre la realidad peruana actual.",
    fullDescription: `Comedia Política: Sin Censura presenta humor inteligente que reflexiona sobre nuestra realidad política y social.

**Sobre el evento:**
La sátira política es una tradición antigua pero más necesaria que nunca. En tiempos donde la libertad de expresión es fundamental, el humor se convierte en una forma de resistencia y reflexión.

**Comediantes:**
- Especialistas en humor político
- Satiristas reconocidos
- Invitados sorpresa

**Enfoque:**
Sin miedo a decir lo que todos piensan, este show aborda temas de actualidad con humor inteligente y crítico.

Tu apoyo defiende la libertad de expresión y el pensamiento crítico a través del humor.`,
    goal: 5000,
    raised: 2500,
    donors: 58,
    daysLeft: 29,
  },
  {
    id: "monologos-lima",
    title: "Monólogos desde Lima",
    subtitle: "Historias reales con humor",
    category: "Comedia",
    date: "2025-02-16",
    time: "20:00",
    location: "Centro Cultural Ricardo Palma",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800",
    videoUrl: "",
    description: "Comediantes comparten sus experiencias más divertidas viviendo en Lima.",
    fullDescription: `Monólogos desde Lima es una colección de historias reales contadas con humor sobre la experiencia de vivir en nuestra ciudad.

**Sobre el evento:**
Lima es una ciudad de contrastes, caos y belleza. Estos monólogos capturan la esencia de lo que significa vivir aquí: el tráfico, la comida, los vecinos, las tradiciones y todo lo que nos hace limeños.

**Formato:**
- 6 comediantes, 6 historias diferentes
- Cada monólogo de 15 minutos
- Basado en experiencias reales

**Conexión con el público:**
Estas historias resonarán con cualquiera que haya vivido en Lima, creando momentos de identificación y risas compartidas.

Este evento celebra nuestra identidad limeña con todo su humor y complejidad.`,
    goal: 6500,
    raised: 4225,
    donors: 84,
    daysLeft: 35,
  },

  // Teatro
  {
    id: "romeo-julieta-version-moderna",
    title: "Romeo y Julieta: Versión Moderna",
    subtitle: "Teatro clásico con un twist contemporáneo",
    category: "Teatro",
    date: "2025-02-05",
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

Tu apoyo hace posible que el teatro clásico llegue a nuevas audiencias de manera innovadora y accesible.`,
    goal: 12000,
    raised: 8400,
    donors: 104,
    daysLeft: 24,
  },
  {
    id: "la-casa-bernarda-alba",
    title: "La Casa de Bernarda Alba",
    subtitle: "Drama español en el escenario peruano",
    category: "Teatro",
    date: "2025-01-18",
    time: "19:00",
    location: "Teatro Peruano Japonés, Jesús María",
    image: "https://images.unsplash.com/photo-1516307365426-bea591f05011?w=800",
    videoUrl: "",
    description: "La obra maestra de García Lorca cobra vida con un elenco nacional de primer nivel.",
    fullDescription: `La Casa de Bernarda Alba presenta el drama intenso de Federico García Lorca con una producción de alta calidad.

**Sobre el evento:**
Esta obra maestra del teatro español explora temas universales: la represión, la libertad, el deseo y las convenciones sociales. Su mensaje resuena con fuerza en nuestra sociedad actual.

**Elenco destacado:**
- Actores con reconocida trayectoria nacional
- Dirección de Mariana Torres
- Producción profesional de alto nivel

**Propuesta escénica:**
Respetando el texto original, esta puesta en escena utiliza elementos visuales y sonoros contemporáneos para intensificar la experiencia dramática.

Este montaje demuestra la vigencia del teatro clásico y su capacidad de conmovernos hoy.`,
    goal: 14000,
    raised: 11900,
    donors: 134,
    daysLeft: 6,
  },
  {
    id: "teatro-experimental-absurdo",
    title: "Teatro Experimental: Lo Absurdo",
    subtitle: "Vanguardia teatral peruana",
    category: "Teatro",
    date: "2025-01-26",
    time: "20:00",
    location: "Espacio Fundación Telefónica, Lima",
    image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800",
    videoUrl: "",
    description: "Una propuesta innovadora que desafía los límites del teatro tradicional.",
    fullDescription: `Teatro Experimental: Lo Absurdo es una propuesta radical que fusiona teatro, performance y multimedia para crear una experiencia totalmente nueva.

**Sobre el evento:**
El teatro del absurdo nació como respuesta a un mundo que había perdido el sentido. Esta producción contemporánea explora la alienación, la incomunicación y la búsqueda de significado en nuestros tiempos.

**Equipo creativo:**
- Colectivo Escénico Experimental
- Diseñadores multimedia
- Performers multidisciplinarios

**Innovación artística:**
Esta obra no tiene argumento lineal ni personajes tradicionales. Es una experiencia sensorial que invita al público a construir su propia interpretación.

Con tu apoyo, empujamos los límites del arte escénico peruano y exploramos nuevas formas de expresión.`,
    goal: 9000,
    raised: 3600,
    donors: 52,
    daysLeft: 14,
  },
  {
    id: "obra-infantil-magica",
    title: "El Bosque Mágico",
    subtitle: "Teatro para niños y familias",
    category: "Teatro",
    date: "2025-02-03",
    time: "16:00",
    location: "Teatro Municipal de Lima",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
    videoUrl: "",
    description: "Una aventura teatral llena de magia, música y personajes fantásticos para toda la familia.",
    fullDescription: `El Bosque Mágico es una producción teatral diseñada especialmente para niños y familias, combinando teatro, música y magia.

**Sobre el evento:**
Esta obra original cuenta la historia de un grupo de niños que descubren un bosque mágico habitado por criaturas fantásticas. A través de su aventura, aprenden sobre amistad, valentía y el cuidado de la naturaleza.

**Características especiales:**
- Efectos especiales y escenografía impresionante
- Canciones originales pegajosas
- Momentos de participación del público
- Mensaje positivo y educativo

**Equipo de producción:**
- Dirección especializada en teatro infantil
- Actores con experiencia en audiencias jóvenes
- Producción de calidad profesional

Este evento ofrece entretenimiento familiar de calidad y introduce a los niños al maravilloso mundo del teatro.`,
    goal: 11000,
    raised: 10450,
    donors: 187,
    daysLeft: 22,
  },
  {
    id: "monologos-dramaticos",
    title: "Voces del Alma",
    subtitle: "Monólogos dramáticos contemporáneos",
    category: "Teatro",
    date: "2025-02-14",
    time: "19:30",
    location: "Teatro La Plaza, Larcomar",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800",
    videoUrl: "",
    description: "Actores reconocidos interpretan textos contemporáneos sobre la condición humana.",
    fullDescription: `Voces del Alma presenta una selección de monólogos dramáticos interpretados por los actores más talentosos del teatro peruano.

**Sobre el evento:**
Cada monólogo es una ventana al alma humana: sus miedos, esperanzas, contradicciones y búsquedas. Textos contemporáneos que hablan de amor, pérdida, identidad y el sentido de la vida.

**Actores participantes:**
- Destacados intérpretes del teatro nacional
- Cada actor presenta un monólogo de 20 minutos
- Selección de textos de autores contemporáneos

**Experiencia íntima:**
El formato de monólogo crea una conexión especial entre actor y público, permitiendo momentos de profunda emoción y reflexión.

Este evento celebra el poder de la palabra y la actuación en su forma más pura.`,
    goal: 8500,
    raised: 4675,
    donors: 71,
    daysLeft: 33,
  },

  // Arte y Exposición
  {
    id: "exposicion-arte-contemporaneo",
    title: "Arte Contemporáneo Peruano",
    subtitle: "Nuevas voces del arte nacional",
    category: "Arte y Exposición",
    date: "2025-01-17",
    time: "18:00",
    location: "MALI - Museo de Arte de Lima",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800",
    videoUrl: "",
    description: "Exposición colectiva de artistas emergentes que exploran la identidad peruana contemporánea.",
    fullDescription: `Arte Contemporáneo Peruano es una vitrina para el talento emergente que está redefiniendo el arte nacional.

**Sobre el evento:**
Esta exposición reúne obras de 20 artistas peruanos que exploran qué significa ser peruano en el siglo XXI. A través de diferentes medios y estilos, estos artistas cuestionan, celebran y reimaginan nuestra identidad colectiva.

**Artistas participantes:**
- Diversidad de medios: pintura, escultura, instalación, video arte
- Representación de diferentes regiones del país
- Convocatoria con jurado de expertos

**Programa complementario:**
- Charlas con los artistas
- Tours guiados
- Catálogo digital

Este evento posiciona al arte peruano contemporáneo en el mapa cultural latinoamericano.`,
    goal: 13000,
    raised: 10140,
    donors: 112,
    daysLeft: 5,
  },
  {
    id: "fotografia-peru-antiguo",
    title: "Perú en Blanco y Negro",
    subtitle: "Fotografía histórica del Perú",
    category: "Arte y Exposición",
    date: "2025-01-23",
    time: "17:00",
    location: "Centro Cultural PUCP",
    image: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800",
    videoUrl: "",
    description: "Un recorrido visual por la historia del Perú a través de fotografías históricas restauradas.",
    fullDescription: `Perú en Blanco y Negro presenta una colección única de fotografías históricas que documentan la evolución de nuestro país.

**Sobre el evento:**
La fotografía es memoria y testimonio. Esta exposición muestra imágenes desde 1850 hasta 1980, capturando momentos decisivos de nuestra historia: transformaciones urbanas, vida cotidiana, eventos históricos y rostros del Perú que fue.

**Colección:**
- 150 fotografías restauradas digitalmente
- Imágenes de archivos públicos y privados
- Fotografías inéditas

**Valor histórico:**
Cada imagen está contextualizada con información histórica detallada, ofreciendo una experiencia educativa profunda.

Este evento preserva y difunde la memoria visual de nuestro país para las futuras generaciones.`,
    goal: 16000,
    raised: 14080,
    donors: 145,
    daysLeft: 11,
  },
  {
    id: "arte-urbano-mural",
    title: "Festival de Arte Urbano",
    subtitle: "Murales que transforman la ciudad",
    category: "Arte y Exposición",
    date: "2025-01-30",
    time: "10:00",
    location: "Distrito de Barranco",
    image: "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=800",
    videoUrl: "",
    description: "Artistas nacionales e internacionales crean murales en vivo en las calles de Barranco.",
    fullDescription: `El Festival de Arte Urbano transforma las calles de Barranco en una galería abierta donde el arte es para todos.

**Sobre el evento:**
El arte urbano ha pasado de ser considerado vandalismo a ser reconocido como una forma legítima de expresión artística. Este festival celebra esta evolución y transforma espacios públicos en obras de arte.

**Artistas participantes:**
- Entes y Pesimo (Lima)
- Jade Rivera (Cusco)
- Artistas internacionales invitados
- Colectivos de arte callejero

**Formato del festival:**
- Muralistas trabajan en vivo durante 3 días
- El público puede observar el proceso creativo
- Talleres de arte urbano para jóvenes
- Conversatorios sobre arte y espacio público

Este evento legitimiza el arte urbano y demuestra cómo puede transformar comunidades.`,
    goal: 10000,
    raised: 6200,
    donors: 93,
    daysLeft: 18,
  },
  {
    id: "escultura-moderna",
    title: "Esculturas en el Parque",
    subtitle: "Arte tridimensional al aire libre",
    category: "Arte y Exposición",
    date: "2025-02-07",
    time: "10:00",
    location: "Parque El Olivar, San Isidro",
    image: "https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=800",
    videoUrl: "",
    description: "Exposición al aire libre de esculturas modernas que dialogan con la naturaleza.",
    fullDescription: `Esculturas en el Parque presenta obras tridimensionales de artistas contemporáneos en diálogo con la naturaleza del Parque El Olivar.

**Sobre el evento:**
La escultura pública democratiza el arte al sacarlo de museos y galerías. Esta exposición al aire libre permite que cualquier persona que visite el parque pueda experimentar arte de calidad.

**Artistas participantes:**
- Escultores peruanos de reconocida trayectoria
- Diferentes materiales: metal, piedra, madera, reciclados
- Obras de gran formato

**Interacción con el espacio:**
Cada escultura ha sido pensada para dialogar con su entorno natural, creando una experiencia única donde arte y naturaleza se complementan.

Este evento hace el arte accesible para todos y embellece nuestros espacios públicos.`,
    goal: 12000,
    raised: 8160,
    donors: 108,
    daysLeft: 26,
  },
  {
    id: "arte-digital-interactivo",
    title: "Arte Digital Interactivo",
    subtitle: "La fusión del arte y la tecnología",
    category: "Arte y Exposición",
    date: "2025-02-14",
    time: "18:00",
    location: "Museo de Arte Contemporáneo, Barranco",
    image: "https://images.unsplash.com/photo-1549887534-1541e9326642?w=800",
    videoUrl: "https://www.youtube.com/embed/fEgLgvXcFk4",
    description: "Exposición inmersiva de arte digital donde el público interactúa con las obras.",
    fullDescription: `Arte Digital Interactivo explora las nuevas fronteras de la creación artística en la era digital.

**Sobre el evento:**
El arte digital está redefiniendo qué es el arte y cómo lo experimentamos. Esta exposición presenta obras que solo pueden existir en formato digital y que responden a la presencia e interacción del público.

**Experiencias presentadas:**
- Instalaciones de realidad virtual
- Arte interactivo controlado por el público
- Proyecciones 3D mapping
- Arte generativo con inteligencia artificial

**Artistas:**
- Colectivos de arte tecnológico peruanos
- Artistas digitales internacionales
- Programadores creativos

**Reflexión sobre el futuro:**
La exposición incluye conversatorios sobre el impacto de la tecnología en el arte y el futuro de la creatividad.

Tu apoyo posiciona al Perú en la vanguardia del arte digital.`,
    goal: 15000,
    raised: 8700,
    donors: 97,
    daysLeft: 33,
  },
];

export default function EventDetail() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const foundEvent = mockEvents.find((e) => e.id === eventId);
    setEvent(foundEvent);
  }, [eventId]);

  if (!event) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Evento no encontrado</h1>
          <Button onClick={() => navigate("/")}>Volver a inicio</Button>
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
        <section className="relative h-[60vh] overflow-hidden bg-secondary">
          {event.videoUrl ? (
            <iframe
              src={event.videoUrl}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={`Video de ${event.title}`}
            />
          ) : (
            <>
              <img
                src={event.image}
                alt={`${event.title} - ${event.category}`}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector('.placeholder-hero')) {
                    const placeholder = document.createElement('div');
                    placeholder.className = 'placeholder-hero absolute inset-0 bg-secondary flex flex-col items-center justify-center';
                    placeholder.innerHTML = `
                      <svg class="w-24 h-24 text-muted-foreground mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <p class="text-muted-foreground text-lg font-medium">${event.category}</p>
                      <p class="text-muted-foreground text-sm mt-2">${event.title}</p>
                    `;
                    parent.insertBefore(placeholder, parent.firstChild);
                  }
                }}
              />
            </>
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
          event={{
            id: event.id,
            title: event.title,
            subtitle: event.subtitle,
            category: event.category,
            date: event.date,
            time: event.time,
            location: event.location,
            image: event.image,
            description: event.description,
            progress: percentage,
            donors: event.donors,
            goal: event.goal,
          }}
        />
      )}
    </div>
  );
}
