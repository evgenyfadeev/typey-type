import { atom } from "jotai";

export const revisionModeState = atom(false);

/*
    this.state = {
      currentPhraseAttempts: [],
      currentPhraseID: 0,
      currentLessonStrokes: [],
      customLessonMaterial: ``,
      customLessonMaterialValidationMessages: [],
      customLessonMaterialValidationState: 'unvalidated',
      customLesson: fallbackLesson,
      actualText: ``,
      globalLookupDictionary: new Map(),
      globalLookupDictionaryLoaded: false,
      lessonNotFound: false,
      lessonsProgress: {
      },
      isPloverDictionaryLoaded: false,
      isGlobalLookupDictionaryLoaded: false,
      personalDictionaries: {
        dictionariesNamesAndContents: null,
      },
      previousCompletedPhraseAsTyped: '',
      repetitionsRemaining: 1,
      startTime: null,
      showStrokesInLesson: false,
      targetStrokeCount: 1,
      timer: 0,
      totalNumberOfMatchedWords: 0,
      numberOfMatchedChars: 0,
      totalNumberOfMatchedChars: 0,
      totalNumberOfNewWordsMet: 0,
      totalNumberOfLowExposuresSeen: 0,
      totalNumberOfRetainedWords: 0,
      totalNumberOfMistypedWords: 0,
      totalNumberOfHintedWords: 0,
      disableUserSettings: false,
      metWords: metWordsFromStorage,
      lesson: fallbackLesson,
      revisionMaterial: [
      ],
      startingMetWordsToday: startingMetWordsToday,
      yourSeenWordCount: calculateSeenWordCount(metWordsFromStorage),
      yourMemorisedWordCount: calculateMemorisedWordCount(metWordsFromStorage)
    };
  }
*/