
export interface World {
  id: number;
  name: string;
  narrative: string;
  quality: string;
  question?: string;
  isCrisis?: boolean;
  options?: {
    label: string;
    value: string;
  }[];
}

export const WORLDS: World[] = [
  {
    id: 1,
    name: "Mundo del Silencio",
    narrative: "Una llanura muda. Al fondo, una figura observa las estrellas. Te acercas y notas que su soledad no es vacío, sino observación pura.",
    quality: "La Observadora",
    question: "¿Cómo rompes el silencio?",
    options: [
      { label: "Con un saludo directo", value: "direct" },
      { label: "Observando con ella un rato", value: "patient" },
      { label: "Dejando una señal discreta", value: "subtle" }
    ]
  },
  {
    id: 2,
    name: "ALERTA: Falla de Red Neuronal",
    narrative: "Los sistemas de la nave parpadean. El soporte vital flaquea. El sistema sugiere abandonar el sector, pero sabes que hay alguien ahí abajo esperándote. Te mantienes firme en tu puesto.",
    quality: "La Leal",
    isCrisis: true
  },
  {
    id: 3,
    name: "Mundo del Prisma",
    narrative: "Colores imposibles. Una joven dibuja en el aire. Te pide un tono que defina tu misión.",
    quality: "La Creadora",
    question: "¿Qué color eliges?",
    options: [
      { label: "Azul cósmico", value: "deep" },
      { label: "Oro supernova", value: "bright" },
      { label: "Violeta nebulosa", value: "mystic" }
    ]
  },
  {
    id: 4,
    name: "CRISIS: Brecha en el Casco",
    narrative: "Una explosión técnica sacude la nave. El vacío intenta entrar. Mantienes la calma, sellas la brecha manualmente sin decir una sola palabra de pánico. Tu coraje es silencioso.",
    quality: "La Valiente Silenciosa",
    isCrisis: true
  },
  {
    id: 5,
    name: "Mundo de Cristal",
    narrative: "Todo es frágil. Alguien llora por una flor marchita. Sientes su dolor como si fuera tuyo.",
    quality: "La Sensible",
    question: "¿Qué haces con la flor?",
    options: [
      { label: "La guardo con ternura", value: "tender" },
      { label: "La transformo en luz", value: "transformative" }
    ]
  },
  {
    id: 6,
    name: "ERROR: Fatiga de Motores",
    narrative: "El motor de salto se ha bloqueado. La nave está varada en el vacío. Intentas el arranque 47 veces. No te rindes hasta que el motor ruge de nuevo.",
    quality: "La Perseverante",
    isCrisis: true
  },
  {
    id: 7,
    name: "Mundo del Oráculo",
    narrative: "Polvo de estrellas que forma mapas. Una anciana te ofrece una verdad sobre ti misma a cambio de una pregunta.",
    quality: "La Sabia",
    question: "¿Qué quieres saber?",
    options: [
      { label: "¿Por qué yo?", value: "purpose" },
      { label: "¿Qué falta por sanar?", value: "healing" }
    ]
  },
  {
    id: 8,
    name: "CRITICAL: Sincronización de Núcleo",
    narrative: "El espejo del puente de mando parpadea. Ves tu reflejo, pero sin el traje de capitana. Te reconoces. Eres tú, sin máscaras. Por fin eres auténtica.",
    quality: "La Auténtica",
    isCrisis: true
  },
  {
    id: 9,
    name: "Mundo del Escudo",
    narrative: "Tormentas de arena. Alguien protege a un pequeño ser. Te pones frente a la tormenta para darles un respiro.",
    quality: "La Protectora",
    question: "¿Cómo los cubres?",
    options: [
      { label: "Abriendo mi capa", value: "gentle" },
      { label: "Usando el escudo de la nave", value: "tech" }
    ]
  },
  {
    id: 10,
    name: "ALERTA: Dilatación Temporal",
    narrative: "El tiempo se estira. Los minutos parecen años. Te sientas en el puente, observas el flujo de la vida y comprendes que cada segundo tiene un peso eterno.",
    quality: "La Reflexiva",
    isCrisis: true
  },
  {
    id: 11,
    name: "Mundo de los Engranajes",
    narrative: "Una ciudad detenida. Falta una pieza. Tienes que improvisar con lo que hay en tu cinturón.",
    quality: "La Ingeniosa",
    question: "¿Qué usas?",
    options: [
      { label: "Una pieza de mi casco", value: "sacrifice" },
      { label: "Un cable sobrante", value: "clever" }
    ]
  },
  {
    id: 12,
    name: "Mundo del Hierro",
    narrative: "Gravedad extrema. Caminas pesado pero firme. El entorno intenta doblegarte, pero tu voluntad es de acero.",
    quality: "La Firme",
    question: "¿Cómo respondes al peso?",
    options: [
      { label: "Enderezando la espalda", value: "pride" },
      { label: "Avanzando paso a paso", value: "steady" }
    ]
  },
  {
    id: 13,
    name: "CRISIS: Parche de Empatía IA",
    narrative: "La inteligencia artificial de la nave sufre un error emocional. Se siente 'sola'. En lugar de reiniciarla, le hablas como a una amiga. La sanas con tu compasión.",
    quality: "La Compasiva",
    isCrisis: true
  },
  {
    id: 14,
    name: "Mundo de la Semilla",
    narrative: "Un desierto. Alguien espera un brote que no llega. Te sientas a su lado y esperas. El tiempo no importa cuando la fe es grande.",
    quality: "La Paciente",
    question: "¿Qué dices mientras esperas?",
    options: [
      { label: "Llegará cuando sea el momento", value: "trust" },
      { label: "El agua está en camino", value: "hope" }
    ]
  },
  {
    id: 15,
    name: "Mundo de la Aurora",
    narrative: "El último umbral. La luz te envuelve. Una voz te dice: 'Has llegado a casa'. Es La Llamada final.",
    quality: "La Llamada",
    question: "¿Cruzas el umbral?",
    options: [
      { label: "Sí, estoy lista", value: "ready" },
      { label: "Llevo a todos conmigo", value: "leader" }
    ]
  }
];
