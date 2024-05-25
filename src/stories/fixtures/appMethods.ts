import { AppMethods } from "../../states/legacy/AppMethodsContext";

const appMethods: AppMethods = {
  appFetchAndSetupGlobalDict: () => Promise.resolve(true),
  changeFullscreen: () => undefined,
  changeShowStrokesInLesson: () => undefined,
  createCustomLesson: () => console.log("create custom lesson"),
  customiseLesson: () => undefined,
  generateCustomLesson: () => console.log("generate custom lesson"),
  handleLesson: () => undefined,
  handleStopLesson: () => undefined,
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
  updateFlashcardsMetWords: () => ({ the: { phrase: "the", stroke: "-T", rung: 1 } }),
  updateFlashcardsProgress: () => ({}),
  updateFlashcardsRecommendation: () => console.log("update flashcards recommendation"),
  updateGlobalLookupDictionary: () => undefined,
  updateMarkup: () => undefined,
  updateMetWords: () => undefined,
  updateMultipleMetWords: () => undefined,
  updatePersonalDictionaries: () => undefined,
  updateRecommendationHistory: () => console.log("update recommendation history"),
  updateRevisionMaterial: () => undefined,
  updateStartingMetWordsAndCounts: () => console.log("update starting met words and counts"),
  updateTopSpeedPersonalBest: () => undefined,
  updateUserGoals: () => console.log("update user goals"),
  updateUserGoalsUnveiled: () => undefined
}

export default appMethods;
