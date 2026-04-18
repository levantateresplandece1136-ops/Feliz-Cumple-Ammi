
export interface World {
  id: number;
  name: string;
  narrative: string;
  quality: string;
  question: string;
  options: {
    label: string;
    value: string;
  }[];
}

export const WORLDS: World[] = [
  {
    id: 1,
    name: "Mundo del Silencio",
    narrative: "Una vasta llanura donde el viento no hace ruido. Al fondo, una figura observa las estrellas sin decir una palabra. Parece cómoda en su soledad, pero el sistema indica que su tiempo aquí se agota.",
    quality: "La Observadora",
    question: "¿Cómo te acercas a ella?",
    options: [
      { label: "Me acerco aunque me cueste romper el silencio", value: "direct" },
      { label: "Observo primero desde la distancia", value: "observant" },
      { label: "Prefiero no intervenir hasta que haga una señal", value: "cautious" }
    ]
  },
  {
    id: 2,
    name: "Mundo de los Vínculos",
    narrative: "Cadenas de luz conectan todo en este lugar. Alguien sostiene un lazo roto, intentando repararlo con sus propias manos, ignorando el cansancio. Su compromiso es total.",
    quality: "La Leal",
    question: "Ves que el lazo vuelve a romperse. ¿Qué haces?",
    options: [
      { label: "Le ayudo a sostenerlo", value: "supportive" },
      { label: "Busco una herramienta mejor", value: "practical" },
      { label: "Le pregunto si vale la pena tanto esfuerzo", value: "analytical" }
    ]
  },
  {
    id: 3,
    name: "Mundo del Prisma",
    narrative: "Colores que no existen en la Tierra flotan en el aire. Una joven dibuja en el vacío, creando mundos enteros con solo imaginarlo. A veces parece perdida en sus propias creaciones.",
    quality: "La Creadora",
    question: "Te pide un color para completar su obra. ¿Tú qué eliges?",
    options: [
      { label: "Un azul profundo como el cosmos", value: "dreamer" },
      { label: "Un naranja vibrante como una supernova", value: "energetic" },
      { label: "Un blanco puro que contenga todos los colores", value: "holistic" }
    ]
  },
  {
    id: 4,
    name: "Mundo de los Ecos",
    narrative: "Voces del pasado resuenan en las cuevas. En el centro, alguien camina hacia lo desconocido sin mirar atrás, aunque sus manos tiemblan ligeramente.",
    quality: "La Valiente Silenciosa",
    question: "La oscuridad total está por llegar. ¿Qué le dices?",
    options: [
      { label: "No estás sola en la oscuridad", value: "empathetic" },
      { label: "Sigue adelante, el sensor detecta una salida", value: "logical" },
      { label: "Camina con cuidado, yo te cubro", value: "protective" }
    ]
  },
  {
    id: 5,
    name: "Mundo de Cristal",
    narrative: "Todo es frágil aquí. Un susurro podría romper el suelo. Una persona llora ante la belleza de una flor de cristal que está por marchitarse.",
    quality: "La Sensible",
    question: "Ella te entrega la flor, temiendo que se rompa en sus manos. ¿Cómo la recibes?",
    options: [
      { label: "Con una suavidad extrema, casi sin tocarla", value: "delicate" },
      { label: "La aseguro en un contenedor especial", value: "protective" },
      { label: "Le digo que su belleza no depende de su fragilidad", value: "philosophical" }
    ]
  },
  {
    id: 6,
    name: "Mundo de las Mareas Altas",
    narrative: "El agua sube y baja constantemente. Alguien intenta escalar un muro de roca que siempre vuelve a mojarse, resbalando una y otra vez sin rendirse.",
    quality: "La Perseverante",
    question: "Vuelve a caer. ¿Qué le ofreces?",
    options: [
      { label: "Mi mano para intentarlo una vez más", value: "tenacious" },
      { label: "Un momento de descanso antes de seguir", value: "compassionate" },
      { label: "Analizar el patrón de las olas para subir mejor", value: "strategic" }
    ]
  },
  {
    id: 7,
    name: "Mundo del Oráculo",
    narrative: "Libros flotantes y mapas astrales llenan el aire. Una anciana con ojos jóvenes lee patrones en el polvo estelar, buscando respuestas que otros ni siquiera saben preguntar.",
    quality: "La Sabia",
    question: "Te permite hacerle una sola pregunta sobre el mañana. ¿Qué preguntas?",
    options: [
      { label: "¿Cuál es mi verdadero propósito?", value: "seeker" },
      { label: "¿Cómo puedo salvar a todos?", value: "altruistic" },
      { label: "¿Qué es lo que aún no he visto de mí?", value: "reflective" }
    ]
  },
  {
    id: 8,
    name: "Mundo de los Espejos",
    narrative: "Miles de reflejos, todos diferentes. Alguien camina entre ellos buscando su propia imagen, pero cada espejo muestra una versión distorsionada.",
    quality: "La Auténtica",
    question: "Encuentra un espejo que no muestra nada. Ella te mira confundida. ¿Qué dices?",
    options: [
      { label: "Ese es el único que muestra tu esencia real", value: "deep" },
      { label: "Tú eres quien debe pintar esa imagen", value: "inspiring" },
      { label: "Tu reflejo está en lo que haces, no en lo que ves", value: "practical" }
    ]
  },
  {
    id: 9,
    name: "Mundo del Escudo",
    narrative: "Tormentas de arena golpean sin piedad. Una figura se mantiene firme, protegiendo con su cuerpo a un pequeño ser que duerme, recibiendo ella todo el impacto.",
    quality: "La Protectora",
    question: "La tormenta empeora. ¿Te unes a ella para cubrir al pequeño?",
    options: [
      { label: "Sí, mi escudo es lo suficientemente grande para ambos", value: "brave" },
      { label: "Busco un refugio cercano para llevarlos", value: "resourceful" },
      { label: "Le doy mi capa protectora para que resista mejor", value: "selfless" }
    ]
  },
  {
    id: 10,
    name: "Mundo del Reloj Arena",
    narrative: "El tiempo fluye visualmente. Alguien observa cómo la arena cae, meditando sobre cada grano, sin prisa por llegar a ninguna parte.",
    quality: "La Reflexiva",
    question: "Te dice que el tiempo es solo una ilusión del corazón. ¿Qué respondes?",
    options: [
      { label: "Entonces el corazón es el verdadero motor", value: "poetic" },
      { label: "Prefiero vivir el presente sin cuestionarlo tanto", value: "grounded" },
      { label: "Dime más sobre lo que has descubierto", value: "curious" }
    ]
  },
  {
    id: 11,
    name: "Mundo de los Engranajes",
    narrative: "Una ciudad mecánica que dejó de funcionar. Una joven con herramientas en el cinturón desarma y vuelve a armar piezas, buscando la chispa que lo inicie todo.",
    quality: "La Ingeniosa",
    question: "Le falta una pieza pequeña. Tú tienes un objeto que podría encajar pero es importante para tu nave. ¿Se lo das?",
    options: [
      { label: "Se lo doy, la misión es salvarla a ella", value: "generous" },
      { label: "Busco una alternativa creativa con lo que hay allí", value: "clever" },
      { label: "Analizo si el riesgo de mi nave vale el beneficio", value: "prudent" }
    ]
  },
  {
    id: 12,
    name: "Mundo del Hierro",
    narrative: "Gravedad extrema. Cada paso pesa toneladas. Alguien se mantiene de pie, con la espalda recta, a pesar de que el entorno intenta aplastarla.",
    quality: "La Firme",
    question: "La presión aumenta. Ella te mira buscando apoyo visual. ¿Qué gesto haces?",
    options: [
      { label: "Un saludo militar, reconociendo su fuerza", value: "respectful" },
      { label: "Me pongo a su lado, resistiendo con ella", value: "loyal" },
      { label: "Le indico el camino hacia una zona de baja presión", value: "helpful" }
    ]
  },
  {
    id: 13,
    name: "Mundo de las Cicatrices",
    narrative: "Un campo de batalla olvidado. Alguien cura las heridas de seres que ya no pueden agradecerle, poniendo flores donde hubo dolor.",
    quality: "La Compasiva",
    question: "Ves que ella misma tiene una herida que ignora. ¿Qué haces?",
    options: [
      { label: "Le pido permiso para curarla yo", value: "kind" },
      { label: "Le traigo más flores para que siga su labor", value: "supportive" },
      { label: "Le recuerdo que ella también importa", value: "empathetic" }
    ]
  },
  {
    id: 14,
    name: "Mundo de la Semilla",
    narrative: "Un desierto infinito. Una persona espera frente a una semilla plantada en la arena, regándola con su última reserva de agua, esperando un brote.",
    quality: "La Paciente",
    question: "Pasan las horas y nada sucede. ¿Qué le dices?",
    options: [
      { label: "Las raíces crecen primero hacia abajo, aunque no se vea", value: "wise" },
      { label: "Te ayudaré a traer más agua", value: "active" },
      { label: "Esperemos juntos un poco más", value: "patient" }
    ]
  },
  {
    id: 15,
    name: "Mundo de la Aurora",
    narrative: "Luces celestiales cubren el cielo. Una figura está en la cima de una montaña, extendiendo los brazos hacia la luz que parece llamarla por su nombre.",
    quality: "La Llamada",
    question: "La voz del sistema parpadea: 'Identidad detectada'. Ella se gira y te sonríe. ¿Qué sientes?",
    options: [
      { label: "Una paz que no puedo explicar", value: "peaceful" },
      { label: "Una urgencia por saber quién es realmente", value: "intense" },
      { label: "Que este es el final de un largo viaje", value: "fulfilled" }
    ]
  }
];
