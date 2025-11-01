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
  {
    id: "festival-humor-improv",
    title: "Festival de Humor e Improvisación",
    subtitle: "Comedia improvisada en vivo",
    category: "Comedia",
    date: "2025-01-25",
    time: "20:30",
    location: "Centro Cultural PUCP, San Miguel",
    image: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=800",
    videoUrl: "",
    description: "Una experiencia única donde el público participa en sketches improvisados.",
    fullDescription: `Festival de Humor e Improvisación presenta el arte de crear comedia en el momento, sin guión ni preparación previa.

**Sobre el evento:**
La improvisación teatral es pura espontaneidad y creatividad. En este festival, los mejores grupos de improvisación del Perú se reúnen para crear escenas hilarantes basadas en sugerencias del público.

**Grupos participantes:**
- Impro Perú
- Lima Comedy Lab
- Colectivo Escena Libre
- Invitados internacionales

**Experiencia interactiva:**
El público no es solo espectador, sino co-creador de las historias. Cada función es única e irrepetible.

**Talleres incluidos:**
Ofreceremos talleres gratuitos de improvisación para que el público descubra las técnicas detrás de este arte.

Este evento desarrolla el arte de la improvisación en Perú y ofrece entretenimiento único cada noche.`,
    goal: 8000,
    raised: 4800,
    donors: 89,
    daysLeft: 13,
  },
  {
    id: "comedia-familiar",
    title: "Comedia para Toda la Familia",
    subtitle: "Humor apto para todas las edades",
    category: "Comedia",
    date: "2025-02-05",
    time: "18:00",
    location: "Auditorio Nacional, San Borja",
    image: "https://images.unsplash.com/photo-1516450137517-162bfbeb8dba?w=800",
    videoUrl: "",
    description: "Un show de comedia que toda la familia puede disfrutar junta.",
    fullDescription: `Comedia para Toda la Familia es un espectáculo de humor diseñado para ser disfrutado por todas las generaciones.

**Sobre el evento:**
El humor familiar es un arte especial que conecta a padres, hijos y abuelos a través de la risa. Este show presenta comedia inteligente, divertida y apropiada para todas las edades.

**Comediantes:**
- Especialistas en humor familiar
- Magos cómicos
- Sketch comedy en vivo
- Interacción con el público

**Valores del show:**
Además de entretener, promovemos valores positivos como el respeto, la unión familiar y la importancia de reír juntos.

**Experiencia completa:**
Incluye zona de juegos pre-show para niños y espacio para fotos familiares con los comediantes.

Este evento crea momentos memorables para las familias peruanas y demuestra que la comedia puede unir generaciones.`,
    goal: 10000,
    raised: 8500,
    donors: 198,
    daysLeft: 24,
  },
  {
    id: "roast-battle",
    title: "Roast Battle Lima",
    subtitle: "Competencia de comediantes",
    category: "Comedia",
    date: "2025-02-15",
    time: "22:00",
    location: "La Noche de Barranco, Barranco",
    image: "https://images.unsplash.com/photo-1541188495357-ad2dc89487f4?w=800",
    videoUrl: "",
    description: "Los mejores comediantes compiten en un duelo de insultos creativos.",
    fullDescription: `Roast Battle Lima trae el formato de competencia de comedia más irreverente y atrevido a nuestro país.

**Sobre el evento:**
En un Roast Battle, dos comediantes se enfrentan en un duelo verbal de insultos creativos. Es un deporte de contacto verbal donde el ingenio y la creatividad son las armas.

**Formato de competencia:**
- 8 comediantes en batalla
- Sistema de eliminación directa
- Jurado de expertos
- El público vota al ganador final

**Reglas del juego:**
Solo hay una regla: todo es válido mientras sea gracioso. Los comediantes se insultan mutuamente en rondas cronometradas, creando momentos de humor audaz.

**Ambiente único:**
Este formato crea una energía eléctrica en el teatro, donde la audiencia se convierte en parte del espectáculo.

Tu apoyo trae formatos innovadores de comedia internacional a Lima y empuja los límites del humor peruano.`,
    goal: 6000,
    raised: 3000,
    donors: 67,
    daysLeft: 34,
  },
  {
    id: "monologos-comicos",
    title: "Noche de Monólogos Cómicos",
    subtitle: "Historias reales, risas auténticas",
    category: "Comedia",
    date: "2025-02-20",
    time: "20:00",
    location: "Teatro Marsano, Miraflores",
    image: "https://images.unsplash.com/photo-1611032843205-474e9c8e2ad1?w=800",
    videoUrl: "",
    description: "Comediantes compartiendo sus historias más divertidas de la vida real.",
    fullDescription: `Noche de Monólogos Cómicos presenta historias personales transformadas en comedia memorable.

**Sobre el evento:**
Los mejores monólogos nacen de experiencias reales. En esta noche especial, comediantes comparten sus historias más absurdas, embarazosas y divertidas de la vida cotidiana.

**Line-up:**
- 5 comediantes con estilos únicos
- Cada uno presenta un monólogo de 20 minutos
- Historias sobre familia, relaciones, trabajo y vida en Lima

**Autenticidad garantizada:**
Estas no son historias inventadas: son vivencias reales que todos podemos identificar y que se vuelven hilarantes en manos de comediantes talentosos.

**Conexión emocional:**
El mejor humor viene de la verdad. Estos monólogos crean momentos de conexión genuina entre comediantes y público.

Este evento celebra el poder del storytelling cómico y las experiencias compartidas que nos unen.`,
    goal: 7000,
    raised: 2800,
    donors: 52,
    daysLeft: 39,
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
  {
    id: "obra-clasica-shakespeare",
    title: "Romeo y Julieta",
    subtitle: "Clásico de Shakespeare en versión moderna",
    category: "Teatro",
    date: "2025-01-20",
    time: "20:00",
    location: "Teatro Segura, Lima",
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=800",
    videoUrl: "",
    description: "Una reinterpretación contemporánea del clásico de Shakespeare.",
    fullDescription: `Romeo y Julieta presenta el clásico inmortal de Shakespeare con una visión contemporánea que resuena con las audiencias actuales.

**Sobre el evento:**
Shakespeare escribió sobre el amor imposible y los conflictos que dividen a las personas. Esta producción mantiene la poesía del texto original mientras lo contextualiza en temas relevantes hoy.

**Propuesta escénica:**
- Dirección innovadora respetando el texto clásico
- Vestuario que fusiona época y modernidad
- Música incidental original
- Efectos visuales contemporáneos

**Elenco:**
Actores profesionales con formación clásica que dan nueva vida a estos personajes eternos.

**Accesibilidad:**
Funciones con subtítulos y audio-descripción para hacer el teatro clásico accesible a todos.

Este evento demuestra que los clásicos siguen hablándonos con fuerza en el siglo XXI.`,
    goal: 18000,
    raised: 14040,
    donors: 167,
    daysLeft: 8,
  },
  {
    id: "teatro-experimental",
    title: "Voces del Silencio",
    subtitle: "Teatro experimental contemporáneo",
    category: "Teatro",
    date: "2025-01-27",
    time: "19:30",
    location: "Centro Cultural Inca Garcilaso, Lima",
    image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800",
    videoUrl: "",
    description: "Una propuesta innovadora que explora la comunicación no verbal.",
    fullDescription: `Voces del Silencio es una obra experimental que desafía las convenciones del teatro tradicional al explorar la comunicación más allá de las palabras.

**Concepto artístico:**
En un mundo saturado de palabras, esta obra explora cómo nos comunicamos a través del silencio, el movimiento, los gestos y la presencia.

**Elementos de la puesta:**
- Teatro físico y movimiento expresivo
- Diseño sonoro envolvente
- Iluminación dramática como lenguaje
- Interacción espacial con el público

**Equipo creativo:**
Colectivo de artistas multidisciplinarios que fusionan teatro, danza y performance.

**Reflexión contemporánea:**
La obra invita a reflexionar sobre la incomunicación en la era digital y el valor de la presencia auténtica.

Este evento empuja los límites del arte escénico peruano hacia nuevas fronteras expresivas.`,
    goal: 14000,
    raised: 9100,
    donors: 112,
    daysLeft: 15,
  },
  {
    id: "musical-peruano",
    title: "Canto a Mi Tierra",
    subtitle: "Musical folclórico peruano",
    category: "Teatro",
    date: "2025-02-03",
    time: "19:00",
    location: "Teatro Municipal, Lima",
    image: "https://images.unsplash.com/photo-1516450137517-162bfbeb8dba?w=800",
    videoUrl: "",
    description: "Un homenaje musical a la diversidad cultural del Perú.",
    fullDescription: `Canto a Mi Tierra es un musical original que celebra la riqueza cultural del Perú a través de música, danza y teatro.

**Sobre el evento:**
Este musical recorre las tres regiones del Perú (costa, sierra y selva), presentando sus tradiciones, música y danzas en una narrativa teatral emotiva.

**Producción:**
- 30 artistas en escena (actores, cantantes, bailarines)
- Orquesta en vivo con instrumentos tradicionales
- Coreografías de danzas folclóricas
- Vestuario auténtico de cada región

**Repertorio musical:**
Desde marinera hasta huayno, pasando por festejo y música amazónica, todo interpretado en vivo.

**Valor educativo:**
El musical no solo entretiene, sino que educa sobre nuestra diversidad cultural y promueve el orgullo por nuestras raíces.

**Impacto social:**
Parte de la recaudación se destina a talleres de arte para jóvenes en comunidades rurales.

Este evento es una celebración total de la identidad peruana en su máxima expresión artística.`,
    goal: 20000,
    raised: 18400,
    donors: 234,
    daysLeft: 22,
  },
  {
    id: "teatro-infantil",
    title: "El Principito",
    subtitle: "Teatro para niños y familias",
    category: "Teatro",
    date: "2025-02-10",
    time: "16:00",
    location: "Teatro La Plaza, San Miguel",
    image: "https://images.unsplash.com/photo-1478479506715-e1f8f08c2ea1?w=800",
    videoUrl: "",
    description: "Una adaptación mágica del clásico de Saint-Exupéry.",
    fullDescription: `El Principito trae a los escenarios peruanos el clásico universal de Antoine de Saint-Exupéry con una producción mágica para niños y familias.

**Sobre el evento:**
Esta historia atemporal sobre amistad, amor y lo esencial de la vida cobra vida en una adaptación teatral que preserva la magia y profundidad del texto original.

**Puesta en escena:**
- Escenografía fantástica con el planeta del principito
- Títeres y máscaras artesanales
- Efectos especiales teatrales
- Música original inspirada en la obra

**Elenco especializado:**
Actores con experiencia en teatro infantil que conectan genuinamente con las audiencias jóvenes.

**Valores transmitidos:**
Amistad, responsabilidad, importancia de ver con el corazón y cuidado por lo que amamos.

**Experiencia familiar:**
Actividades pre-función y espacio de foto con los personajes incluidos en la entrada.

Este evento introduce a los niños al teatro de calidad y transmite valores universales a través del arte.`,
    goal: 12000,
    raised: 10560,
    donors: 201,
    daysLeft: 29,
  },
  {
    id: "drama-contemporaneo",
    title: "Fragmentos de Memoria",
    subtitle: "Drama contemporáneo sobre identidad",
    category: "Teatro",
    date: "2025-02-17",
    time: "20:30",
    location: "Teatro Británico, Miraflores",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800",
    videoUrl: "",
    description: "Una profunda reflexión sobre la memoria y la identidad peruana.",
    fullDescription: `Fragmentos de Memoria es un drama original que explora temas de identidad, memoria colectiva y el significado de ser peruano en el siglo XXI.

**Sinopsis:**
La obra sigue a cuatro personajes de diferentes generaciones cuyas historias se entrelazan, revelando cómo el pasado y la memoria definen quiénes somos.

**Temas abordados:**
- Migración interna y externa
- Conflicto armado interno y reconciliación
- Diversidad cultural y mestizaje
- Búsqueda de identidad en tiempos de cambio

**Propuesta dramatúrgica:**
Texto contemporáneo que fusiona realismo con elementos poéticos y multimedia para crear una narrativa rica y emotiva.

**Equipo:**
- Dramaturgia de autor peruano emergente
- Dirección de teatro contemporáneo
- Elenco multicultural

**Relevancia social:**
Esta obra inicia conversaciones necesarias sobre quiénes somos como nación y hacia dónde vamos.

Apoyar este evento es apostar por el teatro peruano que reflexiona sobre nuestra realidad.`,
    goal: 15000,
    raised: 8250,
    donors: 87,
    daysLeft: 36,
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
  {
    id: "fotografia-urbana",
    title: "Lima en Blanco y Negro",
    subtitle: "Fotografía urbana de Lima",
    category: "Arte y Exposición",
    date: "2025-01-30",
    time: "17:00",
    location: "Centro Cultural de España, Lima",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800",
    videoUrl: "",
    description: "Una colección fotográfica que captura la esencia de Lima contemporánea.",
    fullDescription: `Lima en Blanco y Negro presenta una mirada íntima y poética de nuestra capital a través de la fotografía urbana contemporánea.

**Sobre el evento:**
Esta exposición captura la esencia de Lima más allá de las postales turísticas: sus calles, su gente, sus contrastes y su belleza cotidiana en blanco y negro.

**Fotógrafos participantes:**
- 15 fotógrafos peruanos reconocidos
- Diferentes estilos y enfoques
- Más de 80 fotografías seleccionadas

**Temáticas:**
- Arquitectura histórica y moderna
- Vida cotidiana en los distritos
- Retratos de limeños
- Paisajes urbanos únicos

**Valor documental:**
Estas imágenes se convierten en testimonio visual de Lima en esta época, preservando momentos que definirán cómo recordamos nuestra ciudad.

**Programa educativo:**
Talleres de fotografía urbana para jóvenes incluidos en el proyecto.

Este evento celebra Lima y el arte fotográfico peruano contemporáneo.`,
    goal: 9000,
    raised: 7380,
    donors: 178,
    daysLeft: 18,
  },
  {
    id: "exposicion-arte-peruano",
    title: "Colores de los Andes",
    subtitle: "Arte tradicional andino",
    category: "Arte y Exposición",
    date: "2025-02-06",
    time: "16:00",
    location: "Museo de Arte de Lima (MALI), Lima",
    image: "https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=800",
    videoUrl: "",
    description: "Una celebración del arte textil y pictórico de las comunidades andinas.",
    fullDescription: `Colores de los Andes es una exposición que rinde homenaje al arte tradicional de las comunidades andinas del Perú.

**Sobre el evento:**
El arte andino es una de las expresiones culturales más antiguas y vibrantes del Perú. Esta exposición presenta textiles, cerámicas y pinturas que mantienen vivas técnicas ancestrales.

**Colección presentada:**
- Textiles con técnicas pre-incaicas e incaicas
- Cerámicas tradicionales de diferentes regiones
- Pinturas contemporáneas con iconografía andina
- Instrumentos musicales tradicionales

**Artistas y artesanos:**
- Maestros textileros de Cusco, Ayacucho y Puno
- Ceramistas de Chulucanas y Quinua
- Pintores de la escuela cusqueña contemporánea

**Valor cultural:**
Cada pieza cuenta historias de cosmovisión, tradición y resistencia cultural. Son obras de arte funcional con siglos de historia.

**Comercio justo:**
Parte de la recaudación va directamente a las comunidades artesanas.

Este evento preserva y valora el patrimonio cultural vivo de nuestros pueblos andinos.`,
    goal: 22000,
    raised: 20900,
    donors: 267,
    daysLeft: 25,
  },
  {
    id: "escultura-contemporanea",
    title: "Formas del Futuro",
    subtitle: "Esculturas contemporáneas",
    category: "Arte y Exposición",
    date: "2025-02-13",
    time: "18:30",
    location: "Galería Lucía de la Puente, San Isidro",
    image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800",
    videoUrl: "",
    description: "Esculturas que desafían la percepción del espacio y la materia.",
    fullDescription: `Formas del Futuro presenta esculturas contemporáneas que reimaginan las posibilidades de la forma, el espacio y los materiales.

**Sobre el evento:**
La escultura contemporánea desafía las nociones tradicionales de lo que puede ser una escultura. Esta exposición presenta obras que dialogan con el espacio de maneras innovadoras.

**Artistas participantes:**
- 8 escultores peruanos de renombre
- Diferentes generaciones y enfoques
- Obras creadas específicamente para esta muestra

**Materiales y técnicas:**
- Desde mármol y bronce tradicionales
- Hasta materiales reciclados y tecnología
- Instalaciones escultóricas de gran formato
- Esculturas cinéticas interactivas

**Concepto curatorial:**
Las obras exploran temas como transformación, equilibrio, fragilidad y permanencia en nuestro tiempo.

**Experiencia del visitante:**
El público puede circular entre las esculturas, experimentándolas desde múltiples ángulos y perspectivas.

Este evento posiciona la escultura peruana contemporánea en el diálogo artístico internacional.`,
    goal: 13000,
    raised: 7800,
    donors: 94,
    daysLeft: 32,
  },
  {
    id: "muralismo-urbano",
    title: "Muralismo Urbano Limeño",
    subtitle: "Arte callejero y cultura popular",
    category: "Arte y Exposición",
    date: "2025-02-22",
    time: "15:00",
    location: "Barranco Art District, Barranco",
    image: "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=800",
    videoUrl: "",
    description: "Un recorrido por los murales más emblemáticos de Lima.",
    fullDescription: `Muralismo Urbano Limeño es un evento que celebra el arte callejero como expresión cultural legítima y transformadora del espacio público.

**Sobre el evento:**
El muralismo limeño ha transformado barrios enteros en galerías abiertas. Este evento organiza un recorrido guiado por los murales más importantes y talleres de arte urbano.

**Recorrido incluye:**
- 15 murales emblemáticos de Barranco
- Historia y contexto de cada obra
- Encuentro con algunos de los artistas
- Documentación fotográfica profesional

**Artistas destacados:**
- Entes y Pesimo
- Jade Rivera
- Colectivos de arte callejero
- Artistas internacionales invitados

**Talleres:**
- Técnicas de muralismo para jóvenes
- Stencil art y plantillas
- Fotografía de arte urbano
- Todas las edades bienvenidas

**Impacto comunitario:**
El evento incluye la creación de nuevos murales en espacios públicos, embelleciendo el distrito.

Este evento legitima el arte urbano como patrimonio cultural de Lima y herramienta de transformación social.`,
    goal: 11000,
    raised: 8250,
    donors: 189,
    daysLeft: 41,
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
    // Generate event data if not found in mockEvents
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-12">
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="text-3xl font-bold mb-4">Cargando evento...</h1>
              <p className="text-muted-foreground mb-6">
                Si el evento no se carga, por favor regresa a la página de eventos.
              </p>
              <Button onClick={() => navigate("/eventos")}>Ver todos los eventos</Button>
            </div>
          </div>
        </main>
        <Footer />
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
