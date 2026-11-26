import type { Language, StuckBlocker } from '../types/followThrough';

export interface Translations {
  brand: string;
  systemLabel: string;
  startOver: string;
  startOverConfirmTitle: string;
  startOverConfirmBody: string;
  startOverConfirmAction: string;
  cancel: string;
  back: string;
  continueLabel: string;
  storageNote: string;
  entry: {
    question: string;
    subtitle: string;
    roadmapTitle: string;
    roadmapDesc: string;
    roadmapPrompt: string;
    roadmapPlaceholder: string;
    ownTitle: string;
    ownDesc: string;
    ownPrompt: string;
    ownPlaceholder: string;
    examplesLabel: string;
    roadmapExamples: string[];
    ownExamples: string[];
    continueBtn: string;
    validationEmpty: string;
  };
  finishLine: {
    stepLabel: string;
    enteredFromRoadmap: string;
    enteredOwn: string;
    question: string;
    helper: string;
    exampleLabel: string;
    exampleBefore: string;
    exampleAfter: string;
    inputLabel: string;
    inputPlaceholder: string;
    suggestionsLabel: string;
    confirmBtn: string;
    validationEmpty: string;
  };
  firstMove: {
    stepLabel: string;
    finishLineAnchor: string;
    question: string;
    helper: string;
    actionLabel: string;
    actionPlaceholder: string;
    suggestionsLabel: string;
    cueLabel: string;
    cuePlaceholder: string;
    cuePresetsLabel: string;
    cuePresets: string[];
    previewLabel: string;
    saveBtn: string;
    validationAction: string;
    validationCue: string;
  };
  action: {
    finishLineLabel: string;
    currentActionLabel: string;
    whenLabel: string;
    didItBtn: string;
    stuckBtn: string;
    changeStepBtn: string;
    completedRecordTitle: string;
    completedCountSingle: string;
    completedCountPlural: string;
    deviceSavedStatus: string;
  };
  changeStep: {
    title: string;
    subtitle: string;
    finishLineLabel: string;
    actionLabel: string;
    cueLabel: string;
    saveBtn: string;
    cancelBtn: string;
  };
  stuck: {
    finishLineLabel: string;
    currentActionLabel: string;
    question: string;
    subtitle: string;
    blockers: Record<
      StuckBlocker,
      {
        title: string;
        detail: string;
      }
    >;
    followUpStepLabel: string;
    reviewTitle: string;
    reviewSubtitle: string;
    beforeLabel: string;
    proposedActionLabel: string;
    proposedCueLabel: string;
    saveRevisedBtn: string;
    declineBtn: string;
    changeBlockerBtn: string;
    generateProposalBtn: string;
    missingNotePrefix: string;
    missingCueDefault: string;
    ownAdjustmentLabel: string;
    ownBlockerLabel: string;
    ownBlockerPlaceholder: string;
    ownAdjustmentPlaceholder: string;
    timeOpeningLabel: string;
    timeOpenings: string[];
    shortenToggleLabel: string;
    shortenedHintLabel: string;
    validationRequired: string;
  };
  complete: {
    justFinishedLabel: string;
    question: string;
    finishLineLabel: string;
    yesBtn: string;
    yesDesc: string;
    noBtn: string;
    noDesc: string;
    nextMoveTitle: string;
    nextActionLabel: string;
    nextActionPlaceholder: string;
    nextCueLabel: string;
    nextCuePlaceholder: string;
    saveNextBtn: string;
    completedSoFarLabel: string;
    validationNextAction: string;
    validationNextCue: string;
  };
  done: {
    kicker: string;
    title: string;
    outcomeLabel: string;
    stepsTitle: string;
    startNewBtn: string;
    deviceNote: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    brand: 'Follow Through',
    systemLabel: 'System 02 · Human Systems Evolution Lab',
    startOver: 'Start over',
    startOverConfirmTitle: 'Start over on this device?',
    startOverConfirmBody:
      'This clears your current finish line, action, and completed steps from this browser.',
    startOverConfirmAction: 'Clear and start over',
    cancel: 'Cancel',
    back: 'Back',
    continueLabel: 'Continue',
    storageNote:
      'Saved automatically on this device. No account, login, or external sync required.',
    entry: {
      question: 'What’s one thing you want help getting done this week?',
      subtitle:
        'Pick one thing that matters right now. You’ll define what done looks like and choose a single first move.',
      roadmapTitle: 'Bring a step from my Roadmap',
      roadmapDesc:
        'Arriving from Day 7 or carrying over a step? Paste or type the step you want to finish.',
      roadmapPrompt: 'Paste or type your Roadmap step',
      roadmapPlaceholder: 'e.g., Work on my podcast intro, or Send the updated client proposal',
      ownTitle: 'Start with my own goal',
      ownDesc:
        'New here or starting fresh? Write what you want to finish in your own words.',
      ownPrompt: 'Write what you want to get done in your own words',
      ownPlaceholder: 'e.g., Clear out the kitchen corner, or Draft the project summary',
      examplesLabel: 'Or try one to see how it works:',
      roadmapExamples: [
        'Work on my podcast',
        'Finish the Q4 budget review',
        'Set up my portfolio page',
      ],
      ownExamples: [
        'Sort out my tax receipts',
        'Call the clinic and book my checkup',
        'Draft the opening section of my report',
      ],
      continueBtn: 'Continue',
      validationEmpty: 'Write or paste one thing you want to get done first.',
    },
    finishLine: {
      stepLabel: 'Step 1 of 2 · Define done',
      enteredFromRoadmap: 'From your Roadmap',
      enteredOwn: 'What you entered',
      question: 'What would count as done this week?',
      helper:
        'Name something concrete you can clearly recognize when it happens—not just "work on it."',
      exampleLabel: 'For example:',
      exampleBefore: 'Work on my podcast',
      exampleAfter: 'Record a rough intro I can listen back to.',
      inputLabel: 'Your finish line for this week',
      inputPlaceholder: 'Write a finish line you can clearly recognize when it happens',
      suggestionsLabel: 'Helpful ways to frame this:',
      confirmBtn: 'Confirm finish line',
      validationEmpty: 'Describe what would count as done before continuing.',
    },
    firstMove: {
      stepLabel: 'Step 2 of 2 · First move',
      finishLineAnchor: 'Finish line',
      question: 'What’s the first thing you could do with the time you actually have?',
      helper:
        'Keep it small enough that you can start right away, and tie it to a specific time or everyday cue.',
      actionLabel: 'One concrete action',
      actionPlaceholder: 'e.g., Open Voice Memos and record my opening question',
      suggestionsLabel: 'Small starting moves you can adapt:',
      cueLabel: 'When or after what everyday cue?',
      cuePlaceholder: 'e.g., After dinner, or Today at 4:30 PM',
      cuePresetsLabel: 'Quick cues:',
      cuePresets: [
        'Right now (10 min)',
        'After lunch',
        'After dinner',
        'Before checking messages tomorrow',
        'Tonight at 8:00 PM',
      ],
      previewLabel: 'Your commitment',
      saveBtn: 'Show my action',
      validationAction: 'Enter one concrete first action.',
      validationCue: 'Add a time or everyday cue so you know when to start.',
    },
    action: {
      finishLineLabel: 'Finish line',
      currentActionLabel: 'Current action',
      whenLabel: 'When',
      didItBtn: 'I did it',
      stuckBtn: 'I’m stuck',
      changeStepBtn: 'Change my step',
      completedRecordTitle: 'Completed so far',
      completedCountSingle: '1 step done',
      completedCountPlural: '{count} steps done',
      deviceSavedStatus: 'Saved on this device—you can close this tab and come back anytime.',
    },
    changeStep: {
      title: 'Adjust your current step',
      subtitle: 'Your finish line stays the same. Update the action or when you plan to do it.',
      finishLineLabel: 'Finish line (kept)',
      actionLabel: 'Current action',
      cueLabel: 'When or after what cue',
      saveBtn: 'Save step',
      cancelBtn: 'Cancel',
    },
    stuck: {
      finishLineLabel: 'Original finish line',
      currentActionLabel: 'Current step',
      question: 'What’s getting in the way right now?',
      subtitle: 'Pick the closest match. We’ll adjust the step—without changing your goal.',
      blockers: {
        'dont-know-start': {
          title: 'I don’t know where to start.',
          detail: 'Find the first visible piece so you are not staring at a blank start.',
        },
        'too-big': {
          title: 'This feels too big.',
          detail: 'Shrink the step into something you can attempt in 5–10 minutes.',
        },
        'time-taken': {
          title: 'My time got taken up.',
          detail: 'Pick a realistic opening now and move or shorten the step.',
        },
        'missing-something': {
          title: 'I’m missing something.',
          detail: 'Name the missing info, tool, or support and make getting it your next move.',
        },
        'something-else': {
          title: 'Something else.',
          detail: 'Describe what is happening in your own words and set your own adjustment.',
        },
      },
      followUpStepLabel: 'Step through the blocker',
      reviewTitle: 'Review your revised step',
      reviewSubtitle:
        'Your original finish line stays unchanged. Edit, save, or decline this adjustment.',
      beforeLabel: 'Previous step',
      proposedActionLabel: 'Revised action (editable)',
      proposedCueLabel: 'When (editable)',
      saveRevisedBtn: 'Save revised step',
      declineBtn: 'Decline and keep original step',
      changeBlockerBtn: 'Choose a different reason',
      generateProposalBtn: 'Preview revised step',
      missingNotePrefix: 'Get what is missing:',
      missingCueDefault: 'Today, next 10-minute break',
      ownAdjustmentLabel: 'What adjusted step do you want to try instead?',
      ownBlockerLabel: 'What’s getting in the way?',
      ownBlockerPlaceholder: 'Describe what happened or what is blocking this step',
      ownAdjustmentPlaceholder: 'Write the revised step in your own words',
      timeOpeningLabel: 'What opening is realistic now?',
      timeOpenings: [
        'Later today (10 min)',
        'Tonight after dinner',
        'Tomorrow morning',
        'Tomorrow after lunch',
        'This weekend',
      ],
      shortenToggleLabel: 'Also make the step smaller so it fits this opening',
      shortenedHintLabel: 'Shortened 10-minute version:',
      validationRequired: 'Fill in the details above so we can build a grounded next step.',
    },
    complete: {
      justFinishedLabel: 'Completed step',
      question: 'Does that finish what you set out to do?',
      finishLineLabel: 'Your finish line',
      yesBtn: 'Yes, that finishes it',
      yesDesc: 'Mark this goal done and review what you completed.',
      noBtn: 'No, there’s more to do',
      noDesc: 'Record this step and choose the next small move.',
      nextMoveTitle: 'Choose your next small action',
      nextActionLabel: 'Next action',
      nextActionPlaceholder: 'What is the next concrete move toward your finish line?',
      nextCueLabel: 'When or after what cue',
      nextCuePlaceholder: 'e.g., Tomorrow after coffee, or Tonight at 7:00 PM',
      saveNextBtn: 'Save next action',
      completedSoFarLabel: 'Steps completed so far',
      validationNextAction: 'Enter your next small action.',
      validationNextCue: 'Add when or after what cue you will do it.',
    },
    done: {
      kicker: 'Finished',
      title: 'You followed through.',
      outcomeLabel: 'Completed outcome',
      stepsTitle: 'What you actually did',
      startNewBtn: 'Start something new',
      deviceNote: 'This completed record stays on this device until you start something new.',
    },
  },
  es: {
    brand: 'Follow Through',
    systemLabel: 'Sistema 02 · Human Systems Evolution Lab',
    startOver: 'Empezar de nuevo',
    startOverConfirmTitle: '¿Empezar de nuevo en este dispositivo?',
    startOverConfirmBody:
      'Esto borra tu meta actual, tu acción y los pasos completados de este navegador.',
    startOverConfirmAction: 'Borrar y empezar de nuevo',
    cancel: 'Cancelar',
    back: 'Volver',
    continueLabel: 'Continuar',
    storageNote:
      'Se guarda automáticamente en este dispositivo. Sin cuenta, registro ni sincronización externa.',
    entry: {
      question: '¿Qué es una cosa que quieres terminar esta semana?',
      subtitle:
        'Elige una sola cosa que importe ahora. Vas a definir cómo se ve terminarla y escoger un primer paso concreto.',
      roadmapTitle: 'Traer un paso de mi Roadmap',
      roadmapDesc:
        '¿Vienes del Día 7 o traes un paso pendiente? Pega o escribe el paso que quieres trabajar.',
      roadmapPrompt: 'Pega o escribe el paso de tu Roadmap',
      roadmapPlaceholder:
        'ej. Trabajar en la intro de mi podcast, o Enviar la propuesta actualizada',
      ownTitle: 'Empezar con mi propia meta',
      ownDesc:
        '¿Primera vez aquí o empiezas desde cero? Escribe con tus propias palabras lo que quieres lograr.',
      ownPrompt: 'Escribe lo que quieres terminar con tus propias palabras',
      ownPlaceholder:
        'ej. Ordenar la esquina de la cocina, o Redactar el resumen del proyecto',
      examplesLabel: 'O prueba con un ejemplo:',
      roadmapExamples: [
        'Trabajar en mi podcast',
        'Terminar la revisión del presupuesto',
        'Armar la página de mi portafolio',
      ],
      ownExamples: [
        'Ordenar mis recibos de impuestos',
        'Llamar a la clínica y pedir cita',
        'Escribir el borrador inicial de mi informe',
      ],
      continueBtn: 'Continuar',
      validationEmpty: 'Escribe o pega primero eso que quieres terminar.',
    },
    finishLine: {
      stepLabel: 'Paso 1 de 2 · Definir la meta',
      enteredFromRoadmap: 'De tu Roadmap',
      enteredOwn: 'Lo que escribiste',
      question: '¿Qué contaría como terminado esta semana?',
      helper:
        'Nombra algo concreto que puedas reconocer cuando pase—no solo "trabajar en ello".',
      exampleLabel: 'Por ejemplo:',
      exampleBefore: 'Trabajar en mi podcast',
      exampleAfter: 'Grabar una intro en borrador que pueda volver a escuchar.',
      inputLabel: 'Tu punto de llegada para esta semana',
      inputPlaceholder:
        'Escribe un resultado concreto que reconozcas claramente al terminarlo',
      suggestionsLabel: 'Formas útiles de definirlo:',
      confirmBtn: 'Confirmar meta de llegada',
      validationEmpty: 'Describe qué contaría como terminado antes de seguir.',
    },
    firstMove: {
      stepLabel: 'Paso 2 de 2 · Primer movimiento',
      finishLineAnchor: 'Meta de llegada',
      question: '¿Qué es lo primero que podrías hacer con el tiempo que realmente tienes?',
      helper:
        'Hazlo lo bastante pequeño para empezar sin fricción y átalo a una hora o señal diaria.',
      actionLabel: 'Una acción concreta',
      actionPlaceholder: 'ej. Abrir Notas de Voz y grabar mi pregunta inicial',
      suggestionsLabel: 'Primeros pasos pequeños que puedes adaptar:',
      cueLabel: '¿Cuándo o después de qué hábito diario?',
      cuePlaceholder: 'ej. Después de cenar, o Hoy a las 4:30 PM',
      cuePresetsLabel: 'Señales rápidas:',
      cuePresets: [
        'Ahora mismo (10 min)',
        'Después de almorzar',
        'Después de cenar',
        'Mañana antes de abrir mensajes',
        'Hoy a las 8:00 PM',
      ],
      previewLabel: 'Tu compromiso',
      saveBtn: 'Ver mi acción',
      validationAction: 'Escribe una primera acción concreta.',
      validationCue: 'Agrega una hora o señal diaria para saber cuándo empezar.',
    },
    action: {
      finishLineLabel: 'Meta de llegada',
      currentActionLabel: 'Acción actual',
      whenLabel: 'Cuándo',
      didItBtn: 'Lo hice',
      stuckBtn: 'Me trabé',
      changeStepBtn: 'Cambiar mi paso',
      completedRecordTitle: 'Completado hasta ahora',
      completedCountSingle: '1 paso completado',
      completedCountPlural: '{count} pasos completados',
      deviceSavedStatus:
        'Guardado en este dispositivo: puedes cerrar esta pestaña y volver cuando quieras.',
    },
    changeStep: {
      title: 'Ajustar tu paso actual',
      subtitle: 'Tu meta de llegada sigue intacta. Cambia la acción o el momento para hacerla.',
      finishLineLabel: 'Meta de llegada (se mantiene)',
      actionLabel: 'Acción actual',
      cueLabel: 'Cuándo o después de qué señal',
      saveBtn: 'Guardar paso',
      cancelBtn: 'Cancelar',
    },
    stuck: {
      finishLineLabel: 'Meta de llegada original',
      currentActionLabel: 'Paso actual',
      question: '¿Qué te está frenando en este momento?',
      subtitle: 'Elige la opción más cercana. Ajustaremos el paso sin perder tu meta.',
      blockers: {
        'dont-know-start': {
          title: 'No sé por dónde empezar.',
          detail: 'Encuentra la primera acción visible para no quedarte frente al vacío.',
        },
        'too-big': {
          title: 'Esto se siente demasiado grande.',
          detail: 'Reduce el paso a algo que puedas intentar en 5–10 minutos.',
        },
        'time-taken': {
          title: 'Se me fue el tiempo.',
          detail: 'Busca un espacio realista ahora y mueve o acorta el paso.',
        },
        'missing-something': {
          title: 'Me falta algo.',
          detail: 'Nombra la información, material o apoyo que falta y haz de conseguirlo tu siguiente paso.',
        },
        'something-else': {
          title: 'Otra cosa.',
          detail: 'Explica lo que pasa con tus palabras y define tu propio ajuste.',
        },
      },
      followUpStepLabel: 'Destrabar el paso',
      reviewTitle: 'Revisa tu paso ajustado',
      reviewSubtitle:
        'Tu meta original sigue igual. Puedes editar, guardar o rechazar este ajuste.',
      beforeLabel: 'Paso anterior',
      proposedActionLabel: 'Acción ajustada (editable)',
      proposedCueLabel: 'Cuándo (editable)',
      saveRevisedBtn: 'Guardar paso ajustado',
      declineBtn: 'Rechazar y mantener paso original',
      changeBlockerBtn: 'Elegir otro motivo',
      generateProposalBtn: 'Ver paso ajustado',
      missingNotePrefix: 'Conseguir lo que falta:',
      missingCueDefault: 'Hoy, en mi próxima pausa de 10 minutos',
      ownAdjustmentLabel: '¿Qué paso ajustado quieres intentar en su lugar?',
      ownBlockerLabel: '¿Qué está estorbando?',
      ownBlockerPlaceholder: 'Describe qué pasó o qué frena este paso',
      ownAdjustmentPlaceholder: 'Escribe el paso ajustado con tus propias palabras',
      timeOpeningLabel: '¿Qué espacio es realista ahora?',
      timeOpenings: [
        'Más tarde hoy (10 min)',
        'Esta noche después de cenar',
        'Mañana por la mañana',
        'Mañana después de almorzar',
        'Este fin de semana',
      ],
      shortenToggleLabel: 'También hacer el paso más corto para que quepa en ese espacio',
      shortenedHintLabel: 'Versión corta de 10 minutos:',
      validationRequired: 'Completa los datos de arriba para armar un paso concreto.',
    },
    complete: {
      justFinishedLabel: 'Paso completado',
      question: '¿Con eso terminas lo que te propusiste?',
      finishLineLabel: 'Tu meta de llegada',
      yesBtn: 'Sí, ya terminé',
      yesDesc: 'Cerrar esta meta y ver todo lo que completaste.',
      noBtn: 'No, aún queda por hacer',
      noDesc: 'Guardar este paso y elegir el siguiente movimiento pequeño.',
      nextMoveTitle: 'Elige tu siguiente acción pequeña',
      nextActionLabel: 'Siguiente acción',
      nextActionPlaceholder: '¿Cuál es el siguiente paso concreto hacia tu meta?',
      nextCueLabel: '¿Cuándo o después de qué señal?',
      nextCuePlaceholder: 'ej. Mañana después del café, o Hoy a las 7:00 PM',
      saveNextBtn: 'Guardar siguiente acción',
      completedSoFarLabel: 'Pasos completados hasta ahora',
      validationNextAction: 'Escribe tu siguiente acción pequeña.',
      validationNextCue: 'Agrega cuándo o después de qué señal la harás.',
    },
    done: {
      kicker: 'Terminado',
      title: 'Lo sacaste adelante.',
      outcomeLabel: 'Resultado completado',
      stepsTitle: 'Lo que realmente hiciste',
      startNewBtn: 'Empezar algo nuevo',
      deviceNote:
        'Este registro queda guardado en este dispositivo hasta que empieces algo nuevo.',
    },
  },
};
