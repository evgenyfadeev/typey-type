import { AppMethods } from "../../states/legacy/AppMethodsContext";

const appMethods: AppMethods = {
  appFetchAndSetupGlobalDict: () => Promise.resolve(true),
  changeFlashcardCourseLevel: () => console.log("change flashcard course level"),
  changeFullscreen: () => undefined,
  changeInputForKAOES: () => undefined,
  changeShowStrokesAs: () => undefined,
  changeShowStrokesAsList: () => undefined,
  changeShowStrokesInLesson: () => undefined,
  changeShowStrokesOnMisstroke: () => undefined,
  changeSortOrderUserSetting: () => undefined,
  changeSpacePlacementUserSetting: () => undefined,
  changeStenoLayout: () => console.log("change steno layout"),
  changeUserSetting: () => undefined,
  changeVoiceUserSetting: () => undefined,
  changeWriterInput: () => console.log("change writer input"),
  chooseStudy: () => undefined,
  createCustomLesson: () => console.log("create custom lesson"),
  customiseLesson: () => undefined,
  dismissBackupBanner: () => undefined,
  generateCustomLesson: () => console.log("generate custom lesson"),
  handleBeatsPerMinute: () => undefined,
  handleDiagramSize: () => 1,
  handleLesson: () => undefined,
  handleLimitWordsChange: () => undefined,
  handleRepetitionsChange: () => undefined,
  handleStartFromWordChange: () => undefined,
  handleStopLesson: () => undefined,
  handleUpcomingWordsLayout: () => undefined,
  restartLesson: () => undefined,
  reviseLesson: () => undefined,
  sayCurrentPhraseAgain: () => undefined,
  setCustomLessonContent: () => undefined,
  setDictionaryIndex: () => undefined,
  setPersonalPreferences: () => [],
  setUpProgressRevisionLesson: () => undefined,
  setupLesson: () => undefined,
  startCustomLesson: () => undefined,
  startFromWordOne: () => undefined,
  stopLesson: () => console.log("stop lesson"),
  toggleExperiment: () => undefined,
  toggleHideOtherSettings: () => false,
  updateFlashcardsMetWords: () => ({ the: { phrase: "the", stroke: "-T", rung: 1 } }),
  updateFlashcardsProgress: () => ({}),
  updateFlashcardsRecommendation: () => console.log("update flashcards recommendation"),
  updateGlobalLookupDictionary: () => undefined,
  updateMarkup: () => undefined,
  updateMetWords: () => undefined,
  updateMultipleMetWords: () => undefined,
  updatePersonalDictionaries: () => undefined,
  updatePreset: () => undefined,
  updateRecommendationHistory: () => console.log("update recommendation history"),
  updateRevisionMaterial: () => undefined,
  updateStartingMetWordsAndCounts: () => console.log("update starting met words and counts"),
  updateTopSpeedPersonalBest: () => undefined,
  updateUserGoals: () => console.log("update user goals"),
  updateUserGoalsUnveiled: () => undefined
}

export default appMethods;
