import type { Language, StuckBlocker } from '../types/followThrough';

function cleanPhrase(input: string): string {
  return input.trim().replace(/\.+$/, '');
}

function isSpeakingOrWritingTask(text: string): boolean {
  const lower = text.toLowerCase();
  return /(podcast|intro|video|record|grabar|write|escrib|draft|borrador|email|correo|pitch|presenta|talk|charla|script|guion|guión|letter|carta|article|artículo|post|publica|essay|ensayo|report|informe|proposal|propuesta|speech|discurso)/.test(
    lower
  );
}

function isOrganizingOrAdminTask(text: string): boolean {
  const lower = text.toLowerCase();
  return /(clean|limpi|organiz|orden|sort|tax|impuesto|budget|presupuesto|bill|factura|recibo|receipt|room|cuarto|habitaci|kitchen|cocina|desk|escritorio|inbox|correo|file|archivo|garage|closet)/.test(
    lower
  );
}

function isCallOrOutreachTask(text: string): boolean {
  const lower = text.toLowerCase();
  return /(call|llamar|cita|book|reserv|schedule|agend|doctor|clinic|clínica|dentist|client|cliente|follow up|seguimiento|reach out|contact|mensaje|message)/.test(
    lower
  );
}

export function suggestFinishLines(rawInput: string, lang: Language): string[] {
  const base = cleanPhrase(rawInput);
  if (!base) return [];
  const lower = base.toLowerCase();

  if (lower.includes('podcast')) {
    return lang === 'es'
      ? [
          'Grabar una intro en borrador que pueda volver a escuchar',
          'Escribir y leer en voz alta un guion de 60 segundos para el episodio',
        ]
      : [
          'Record a rough intro I can listen back to',
          'Write and read aloud a 60-second episode outline',
        ];
  }

  if (isSpeakingOrWritingTask(base)) {
    return lang === 'es'
      ? [
          `Terminar un primer borrador completo para "${base}" que pueda revisar`,
          `Dejar lista una versión básica y usable de: ${base}`,
        ]
      : [
          `Finish a rough first version of "${base}" I can review`,
          `Have one complete, usable draft ready for: ${base}`,
        ];
  }

  if (isCallOrOutreachTask(base)) {
    return lang === 'es'
      ? [
          `Confirmar la llamada o mensaje y dejar cerrada la fecha de: ${base}`,
          `Enviar el mensaje o hacer la llamada de "${base}" y anotar la respuesta`,
        ]
      : [
          `Make the call or send the message for "${base}" and confirm the date`,
          `Complete the outreach for "${base}" and log the next date`,
        ];
  }

  if (isOrganizingOrAdminTask(base)) {
    return lang === 'es'
      ? [
          `Dejar resuelta y en orden una parte visible de: ${base}`,
          `Revisar todo lo pendiente de "${base}" y cerrar los primeros 3 puntos`,
        ]
      : [
          `Clear and finish one visible zone of: ${base}`,
          `Review everything in "${base}" and close out the top 3 items`,
        ];
  }

  return lang === 'es'
    ? [
        `Terminar una versión inicial usable de: ${base}`,
        `Completar el primer entregable visible de "${base}" para poder revisarlo`,
      ]
    : [
        `Finish a rough, usable version of: ${base}`,
        `Complete one visible milestone for "${base}" that I can inspect`,
      ];
}

export function suggestFirstMoves(finishLine: string, lang: Language): string[] {
  const base = cleanPhrase(finishLine);
  const lower = base.toLowerCase();

  if (lower.includes('podcast') || lower.includes('record') || lower.includes('grabar')) {
    return lang === 'es'
      ? [
          'Abrir Notas de Voz y grabar mi pregunta inicial en una toma',
          'Anotar 3 viñetas rápidas de lo que quiero decir primero',
        ]
      : [
          'Open Voice Memos and record my opening question in one take',
          'Jot down 3 rough bullet points for what I want to say first',
        ];
  }

  if (isSpeakingOrWritingTask(base)) {
    return lang === 'es'
      ? [
          'Abrir un documento en blanco y escribir 3 frases sin editar',
          'Anotar el punto principal y los 3 bloques que necesita',
        ]
      : [
          'Open a blank page and write 3 rough sentences without editing',
          'List the main point and the 3 sections it needs',
        ];
  }

  if (isCallOrOutreachTask(base)) {
    return lang === 'es'
      ? [
          'Buscar el número o contacto y escribir el mensaje corto antes de enviarlo',
          'Anotar 2 horarios posibles y hacer la llamada de 3 minutos',
        ]
      : [
          'Pull up the number or contact and write a two-line opener',
          'Pick two open time slots and place the 3-minute call',
        ];
  }

  if (isOrganizingOrAdminTask(base)) {
    return lang === 'es'
      ? [
          'Poner un temporizador de 10 minutos y despejar solo una superficie o carpeta',
          'Reunir todo lo que necesito en un solo lugar antes de ordenar',
        ]
      : [
          'Set a 10-minute timer and clear just one surface or folder',
          'Gather everything needed into one spot before sorting',
        ];
  }

  return lang === 'es'
    ? [
        `Abrir lo que necesito y dedicar 10 minutos solo al primer paso de "${base}"`,
        `Escribir los 2 primeros pasos concretos para empezar "${base}"`,
      ]
    : [
        `Open what I need and spend 10 minutes on the very first piece of "${base}"`,
        `Write down the first 2 visible steps to start "${base}"`,
      ];
}

export interface StartBlockerPrompt {
  question: string;
  placeholder: string;
  suggestedActionPrefix: string;
  options: { label: string; actionFromInput: (answer: string) => string }[];
}

export function getStartBlockerPrompt(
  finishLine: string,
  currentAction: string,
  lang: Language
): StartBlockerPrompt {
  const combined = `${finishLine} ${currentAction}`;

  if (isSpeakingOrWritingTask(combined)) {
    return lang === 'es'
      ? {
          question:
            '¿A quién le estás hablando y cuál es una pregunta o idea clave con la que quieres que se quede?',
          placeholder:
            'ej. A freelancers que sienten que trabajan todo el día: ¿Por qué sigues sin terminar lo importante?',
          suggestedActionPrefix: 'Solo esto:',
          options: [
            {
              label: 'Grabar o escribir solo esa frase',
              actionFromInput: (ans) =>
                ans.trim()
                  ? `Grabar o escribir solo esta frase inicial: "${cleanPhrase(ans)}"`
                  : 'Grabar o escribir solo una frase inicial de 15 segundos',
            },
            {
              label: 'Anotar 3 puntos rápidos en papel',
              actionFromInput: (ans) =>
                ans.trim()
                  ? `Anotar 3 viñetas rápidas sobre: "${cleanPhrase(ans)}"`
                  : 'Anotar 3 viñetas rápidas sin editar nada',
            },
          ],
        }
      : {
          question:
            'Who are you speaking to, and what’s one question or point you want them thinking about?',
          placeholder:
            'e.g., Solo builders stuck mid-project: What would happen if you only had to finish one piece today?',
          suggestedActionPrefix: 'Just this:',
          options: [
            {
              label: 'Record or write just this sentence',
              actionFromInput: (ans) =>
                ans.trim()
                  ? `Record or write just this opening line: "${cleanPhrase(ans)}"`
                  : 'Record or write just one 15-second opening line',
            },
            {
              label: 'Jot 3 rough bullets around it',
              actionFromInput: (ans) =>
                ans.trim()
                  ? `Jot 3 rough bullets around: "${cleanPhrase(ans)}"`
                  : 'Jot 3 rough bullets on paper without editing',
            },
          ],
        };
  }

  if (isCallOrOutreachTask(combined)) {
    return lang === 'es'
      ? {
          question: '¿Qué es lo único que necesitas confirmar o preguntar en esa llamada o mensaje?',
          placeholder: 'ej. Preguntar si tienen horario disponible el jueves por la mañana',
          suggestedActionPrefix: 'Primer paso visible:',
          options: [
            {
              label: 'Escribir ese mensaje de 2 líneas',
              actionFromInput: (ans) =>
                ans.trim()
                  ? `Abrir el chat o correo y escribir estas 2 líneas: "${cleanPhrase(ans)}"`
                  : 'Abrir el contacto y escribir un mensaje corto de 2 líneas',
            },
            {
              label: 'Hacer la llamada con esa sola pregunta',
              actionFromInput: (ans) =>
                ans.trim()
                  ? `Marcar el número solo para preguntar: "${cleanPhrase(ans)}"`
                  : 'Marcar el número y hacer una sola pregunta directa',
            },
          ],
        }
      : {
          question: 'What is the one thing you need to ask or confirm in that call or message?',
          placeholder: 'e.g., Ask if they have an opening next Thursday morning',
          suggestedActionPrefix: 'First visible step:',
          options: [
            {
              label: 'Write that 2-line message',
              actionFromInput: (ans) =>
                ans.trim()
                  ? `Open the message and write two lines asking: "${cleanPhrase(ans)}"`
                  : 'Open the contact and draft a two-line message',
            },
            {
              label: 'Make the call with that one question',
              actionFromInput: (ans) =>
                ans.trim()
                  ? `Call just to ask: "${cleanPhrase(ans)}"`
                  : 'Place the call with just one direct question written down',
            },
          ],
        };
  }

  return lang === 'es'
    ? {
        question:
          '¿Cuál es el primer objeto, archivo o lugar físico que necesitas tener frente a ti para empezar?',
        placeholder: 'ej. Abrir la carpeta de recibos de octubre en la mesa',
        suggestedActionPrefix: 'Primer paso visible:',
        options: [
          {
            label: 'Abrir eso y trabajar 5 minutos',
            actionFromInput: (ans) =>
              ans.trim()
                ? `Poner frente a mí "${cleanPhrase(ans)}" y trabajar en la primera parte por 5 minutos`
                : 'Abrir lo primero que necesito y trabajar 5 minutos sin corregir',
          },
          {
            label: 'Separar solo el primer elemento',
            actionFromInput: (ans) =>
              ans.trim()
                ? `Tomar solo el primer elemento de "${cleanPhrase(ans)}" y terminarlo`
                : 'Tomar solo el primer elemento visible y resolverlo',
          },
        ],
      }
    : {
        question:
          'What is the very first object, file, or spot you need in front of you to begin?',
        placeholder: 'e.g., Put the folder of October receipts on the table',
        suggestedActionPrefix: 'First visible step:',
        options: [
          {
            label: 'Open that and work for 5 minutes',
            actionFromInput: (ans) =>
              ans.trim()
                ? `Put "${cleanPhrase(ans)}" in front of me and work on just the first piece for 5 minutes`
                : 'Open the very first file or item and spend 5 minutes on it',
          },
          {
            label: 'Do just the first single item',
            actionFromInput: (ans) =>
              ans.trim()
                ? `Pick just the first item from "${cleanPhrase(ans)}" and finish only that`
                : 'Pick the single smallest visible item and finish only that',
          },
        ],
      };
}

export function getTooBigSuggestions(
  finishLine: string,
  currentAction: string,
  lang: Language
): string[] {
  const step = cleanPhrase(currentAction) || cleanPhrase(finishLine);
  const goal = cleanPhrase(finishLine);

  if (lang === 'es') {
    return [
      `Poner un temporizador de 5 minutos y hacer solo la primera parte en borrador de: ${step}`,
      `Dedicar 10 minutos a listar las 3 partes más pequeñas de "${goal}" y empezar solo la #1`,
      `Hacer una versión mínima e imperfecta de "${step}" en menos de 10 minutos`,
    ];
  }

  return [
    `Set a 5-minute timer and do just the rough first piece of: ${step}`,
    `Spend 10 minutes listing the 3 smallest parts of "${goal}" and do only part 1`,
    `Make a messy 10-minute version of "${step}" with zero polishing`,
  ];
}

export function getShortenedVersionForTime(
  currentAction: string,
  lang: Language
): string {
  const step = cleanPhrase(currentAction);
  if (lang === 'es') {
    return `Versión de 10 min: hacer solo el inicio de "${step}"`;
  }
  return `10-minute version: do just the opening piece of "${step}"`;
}

export function getMissingActionProposal(
  missingItem: string,
  missingKind: 'info' | 'material' | 'support',
  lang: Language
): string {
  const item = cleanPhrase(missingItem);
  if (!item) return '';

  if (lang === 'es') {
    if (missingKind === 'info') {
      return `Buscar o pedir esta información: ${item}`;
    }
    if (missingKind === 'support') {
      return `Escribir o pedir ayuda concreta con: ${item}`;
    }
    return `Conseguir o preparar este material: ${item}`;
  }

  if (missingKind === 'info') {
    return `Find or ask for this information: ${item}`;
  }
  if (missingKind === 'support') {
    return `Reach out and ask for help with: ${item}`;
  }
  return `Get or set up this material: ${item}`;
}

export function getBlockerOrder(): StuckBlocker[] {
  return [
    'dont-know-start',
    'too-big',
    'time-taken',
    'missing-something',
    'something-else',
  ];
}
