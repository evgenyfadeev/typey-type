// import React from 'react';
// import ReactDOM from 'react-dom';
import { matchSplitText, loadPersonalPreferences, writePersonalPreferences, repetitionsRemaining } from './typey-type';

describe('loadPersonalPreferences', () => {
  describe('without localStorage', () => {
    it('should return previously met words and user settings', () => {
      let metWords = {};
      let userSettings = {
        caseSensitive: true,
        retainedWords: true,
        limitNumberOfWords: 30,
        newWords: true,
        repetitions: 1,
        showStrokes: false,
        spacePlacement: 'spaceOff',
        sortOrder: 'sortOff',
        seenWords: true,
        study: 'discover'
      };
      expect(loadPersonalPreferences()).toEqual([metWords, userSettings]);
    });
  });
});

// describe('writePersonalPreferences', () => {
//   describe('without localStorage', () => {
//     it('should log error', () => {
//       let metWords = { "hi": 0, "hey": 1 };
//       let userSettings = {
//         caseSensitive: true,
//         retainedWords: true,
//         limitNumberOfWords: 0,
//         newWords: true,
//         repetitions: 1,
//         showStrokes: false,
//         spacePlacement: 'spaceBeforeOutput',
//         sortOrder: 'sortRandom',
//         seenWords: true
//       };
//     });
//   });
// });

describe('repetitionsRemaining', () => {
  describe('for 4 reps and 3 words', () => {
    const userSettings = {
      repetitions: 4
    };
    const presentedMaterial = [
      {phrase: 'apple', stroke: 'A*EPL'},           // 0 => 4    // 12 words remaining
      {phrase: 'banana', stroke: 'PWA/TPHA/TPHA'},  // 1 => 4    // 11 words remaining
      {phrase: 'coffee', stroke: 'KOF/TPAOE'},      // 2 => 4    // 10 words remaining

      {phrase: 'apple', stroke: 'A*EPL'},           // 3 => 3    // 9 words remaining
      {phrase: 'banana', stroke: 'PWA/TPHA/TPHA'},  // 4 => 3    // 8 words remaining
      {phrase: 'coffee', stroke: 'KOF/TPAOE'},      // 5 => 3    // 7 words remaining

      {phrase: 'apple', stroke: 'A*EPL'},           // 6 => 2    // 6 words remaining
      {phrase: 'banana', stroke: 'PWA/TPHA/TPHA'},  // 7 => 2    // 5 words remaining
      {phrase: 'coffee', stroke: 'KOF/TPAOE'},      // 8 => 2    // 4 words remaining

      {phrase: 'apple', stroke: 'A*EPL'},           // 9 => 1    // 3 words remaining
      {phrase: 'banana', stroke: 'PWA/TPHA/TPHA'},  // 10 => 1   // 2 words remaining
      {phrase: 'coffee', stroke: 'KOF/TPAOE'}       // 11 => 1   // 1 word remaining
    ]
    let currentPhraseID = 0;

    it('on first word, returns full reps remaining from userSettings', () => {
      currentPhraseID = 0;
      expect(repetitionsRemaining(userSettings, presentedMaterial, currentPhraseID)).toEqual(4);
    });
    it('on third word, returns full reps remaining from userSettings', () => {
      currentPhraseID = 2;
      expect(repetitionsRemaining(userSettings, presentedMaterial, currentPhraseID)).toEqual(4);
    });
    it('on fourth word, returns full reps minus 1', () => {
      currentPhraseID = 3;
      expect(repetitionsRemaining(userSettings, presentedMaterial, currentPhraseID)).toEqual(3);
    });
    it('on sixth word, returns full reps minus 1', () => {
      currentPhraseID = 5;
      expect(repetitionsRemaining(userSettings, presentedMaterial, currentPhraseID)).toEqual(3);
    });
    it('on seventh word, returns full reps minus 1', () => {
      currentPhraseID = 6;
      expect(repetitionsRemaining(userSettings, presentedMaterial, currentPhraseID)).toEqual(2);
    });
    it('on ninth word, returns full reps minus 1', () => {
      currentPhraseID = 8;
      expect(repetitionsRemaining(userSettings, presentedMaterial, currentPhraseID)).toEqual(2);
    });
    it('on tenth word, returns full reps minus 3', () => {
      currentPhraseID = 9;
      expect(repetitionsRemaining(userSettings, presentedMaterial, currentPhraseID)).toEqual(1);
    });
    it('on twelfth word, returns full reps minus 3', () => {
      currentPhraseID = 11;
      expect(repetitionsRemaining(userSettings, presentedMaterial, currentPhraseID)).toEqual(1);
    });
    it('on words higher than lesson length, returns 0 reps remaining', () => {
      currentPhraseID = 12;
      expect(repetitionsRemaining(userSettings, presentedMaterial, currentPhraseID)).toEqual(0);
    });

  });

  describe('for 1 rep and 3 words', () => {
    const userSettings = {
      repetitions: 1
    };
    const presentedMaterial = [
      {phrase: 'apple', stroke: 'A*EPL'},
      {phrase: 'banana', stroke: 'PWA/TPHA/TPHA'},
      {phrase: 'coffee', stroke: 'KOF/TPAOE'}
    ]
    let currentPhraseID = 0;

    it('on first word, returns full reps remaining from userSettings', () => {
      currentPhraseID = 0;
      expect(repetitionsRemaining(userSettings, presentedMaterial, currentPhraseID)).toEqual(1);
    });
  });
});

describe('matchSplitText', () => {
  describe('case insensitive, ignore spacing', () => {
    const settings = {ignoredChars: ''};
    const userSettings = {
      caseSensitive: false,
      retainedWords: false,
      limitNumberOfWords: 0,
      newWords: true,
      repetitions: 1,
      showStrokes: false,
      spacePlacement: 'spaceOff',
      sortOrder: 'sortOff',
      seenWords: true
    };

    it('splits typed text into matching and not matching text for partially matching typed text with a misstroke, ignore spacing', () => {
      const expectedText = "and";
      const actualText = "ant";
      const expected = ["an", "d", "an", "t"];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for typed text that matches so far but is not finished, ignore spacing', () => {
      const expectedText = "and";
      const actualText = "an";
      const expected = ["an", "d", "an", ""];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for a misstroke, ignore spacing', () => {
      const expectedText = "and";
      const actualText = "the";
      const expected = ["", "and", "", "the"];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for perfectly stroked text, ignore spacing', () => {
      const expectedText = "and";
      const actualText = "and";
      const expected = ["and", "", "and", ""];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for correctly stroked text with incorrect capitalisation, ignore spacing', () => {
      const expectedText = "and";
      const actualText = "And";
      const expected = ["and", "", "And", ""];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for correctly stroked multi-word text, ignore spacing', () => {
      const expectedText = "as well as";
      const actualText = "as well as";
      const expected = ["as well as", "", "as well as", ""];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for stroked multi-word text, ignore spacing', () => {
      const expectedText = "as well as";
      const actualText = "aswell  as";
      const expected = ["as well as", "", "aswell  as", ""];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });
  });

  describe('case sensitive, no spacing', () => {
    const settings = {ignoredChars: ''};
    const userSettings = {
      caseSensitive: true,
      retainedWords: false,
      limitNumberOfWords: 0,
      newWords: true,
      repetitions: 1,
      showStrokes: false,
      spacePlacement: 'spaceOff',
      sortOrder: 'sortOff',
      seenWords: true
    };

    it('splits typed text into matching and not matching text for partially matching typed text with a misstroke, ignore spacing', () => {
      const expectedText = "and";
      const actualText = "ant";
      const expected = ["an", "d", "an", "t"];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for typed text that matches so far but is not finished, ignore spacing', () => {
      const expectedText = "and";
      const actualText = "an";
      const expected = ["an", "d", "an", ""];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for a misstroke, ignore spacing', () => {
      const expectedText = "and";
      const actualText = "the";
      const expected = ["", "and", "", "the"];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for perfectly stroked text, ignore spacing', () => {
      const expectedText = "and";
      const actualText = "and";
      const expected = ["and", "", "and", ""];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for correctly stroked text with incorrect capitalisation, ignore spacing', () => {
      const expectedText = "And";
      const actualText = "and";
      const expected = ["", "And", "", "and"];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for multi-word text, ignore spacing', () => {
      const expectedText = "as well as";
      const actualText = "as well as";
      const expected = ["as well as", "", "as well as", ""];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for multi-word text, ignore spacing', () => {
      const expectedText = "as well as";
      const actualText = "aswellAs";
      const expected = ["as well ", "as", "aswell", "As"];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });
  });

  describe('case sensitive, space before', () => {
    const settings = {ignoredChars: ''};
    const userSettings = {
      caseSensitive: true,
      retainedWords: false,
      limitNumberOfWords: 0,
      newWords: true,
      repetitions: 1,
      showStrokes: false,
      spacePlacement: 'spaceBefore',
      sortOrder: 'sortOff',
      seenWords: true
    };

    it('splits typed text into matching and not matching text for partially matching typed text with a misstroke, space before', () => {
      const expectedText = " and";
      const actualText = " ant";
      const expected = [" an", "d", " an", "t"];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for typed text that matches so far but is not finished, space before', () => {
      const expectedText = " and";
      const actualText = " an";
      const expected = [" an", "d", " an", ""];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for a misstroke, space before', () => {
      const expectedText = " and";
      const actualText = " the";
      const expected = [" ", "and", " ", "the"];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for perfectly stroked text, space before', () => {
      const expectedText = " and";
      const actualText = " and";
      const expected = [" and", "", " and", ""];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for correctly stroked text with incorrect capitalisation, space before', () => {
      const expectedText = " And";
      const actualText = " and";
      const expected = [" ", "And", " ", "and"];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for correctly stroked multi-word text, space before', () => {
      const expectedText = " as well as";
      const actualText = " as well as";
      const expected = [" as well as", "", " as well as", ""];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for incorrectly spaced multi-word text, space before', () => {
      const expectedText = " as well as";
      const actualText = "as well as";
      const expected = ["", " as well as", "", "as well as"];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });
  });

  describe('case sensitive, space before, ignoredChars', () => {
    const settings = {ignoredChars: '^-'};
    const userSettings = {
      caseSensitive: true,
      retainedWords: false,
      limitNumberOfWords: 0,
      newWords: true,
      repetitions: 1,
      showStrokes: false,
      spacePlacement: 'spaceBefore',
      sortOrder: 'sortOff',
      seenWords: true
    };

    it('splits typed text into matching and not matching text for partially matching typed text with a misstroke, an ignored char, space before', () => {
      const expectedText = " ^and";
      const actualText = " ant";
      const expected = [" ^an", "t", " an", "t"];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for a misstroke, an ignored char, space before', () => {
      const expectedText = " and";
      const actualText = " ^an the";
      const expected = [" ", "and", " ", "^an the"];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for typed text that matches so far but is not finished, an ignored char, space before', () => {
      const expectedText = " and^";
      const actualText = " an^";
      const expected = [" an", "d^", " an", "^"];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for perfectly stroked text, an ignored char, space before', () => {
      const expectedText = " -and";
      const actualText = " and";
      const expected = [" -and", "", " and", ""];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for correctly stroked text with incorrect capitalisation, an ignored char, space before', () => {
      const expectedText = " -And";
      const actualText = " and";
      const expected = [" -", "And", " ", "and"];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for incorrectly spaced multi-word text, an ignored char, space before', () => {
      const expectedText = " as^well^as";
      const actualText = " aswell as";
      const expected = [" as^well^", "as", " aswell", " as"];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });
  });

  describe('case sensitive, space after, ignoredChars', () => {
    const settings = {ignoredChars: '^-'};
    const userSettings = {
      caseSensitive: true,
      retainedWords: false,
      limitNumberOfWords: 0,
      newWords: true,
      repetitions: 1,
      showStrokes: false,
      spacePlacement: 'spaceAfter',
      sortOrder: 'sortOff',
      seenWords: true
    };

    it('splits typed text into matching and not matching text for partially matching typed text with a misstroke, an ignored char, space after', () => {
      const expectedText = "^and ";
      const actualText = "ant ";
      const expected = ["^an", "d ", "an", "t "];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for a misstroke, an ignored char, space after', () => {
      const expectedText = "and ";
      const actualText = "and";
      const expected = ["and", " ", "and", ""];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for typed text that matches so far but is not finished, an ignored char, space after', () => {
      const expectedText = "and^ ";
      const actualText = "and";
      const expected = ["and", "^ ", "and", ""];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for perfectly stroked text, space after', () => {
      const expectedText = "and ";
      const actualText = "and ";
      const expected = ["and ", "", "and ", ""];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for correctly stroked text with incorrect capitalisation, an ignored char, space after', () => {
      const expectedText = "And ";
      const actualText = "and ";
      const expected = ["", "And ", "", "and "];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for incorrectly spaced multi-word text, an ignored char, space after', () => {
      const expectedText = "as^well^as ";
      const actualText = "aswell as ";
      const expected = ["as^well^", "as ", "aswell", " as "];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });
  });

  describe('case sensitive, space off, ignoredChars', () => {
    const settings = {ignoredChars: '^-'};
    const userSettings = {
      caseSensitive: true,
      retainedWords: false,
      limitNumberOfWords: 0,
      newWords: true,
      repetitions: 1,
      showStrokes: false,
      spacePlacement: 'spaceOff',
      sortOrder: 'sortOff',
      seenWords: true
    };

    it('splits typed text into matching and not matching text for incorrectly spaced multi-word text, an ignored char, space off', () => {
      const expectedText = " as^well^as";
      const actualText = " as  we ll as";
      const expected = [" as^well^as", "", " as  we ll as", ""];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    it('splits typed text into matching and not matching text for incorrectly spaced multi-word text, an ignored char, space off', () => {
      const expectedText = " as^well^as";
      const actualText = " as  we";
      const expected = [" as^we", "ll^as", " as  we", ""];
      expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    });

    // it('splits typed text into matching and not matching text for typed text that matches but needs a trailing space, ignored caret, no added spaces to material', () => {
    //   const expectedText = "and^ ";
    //   const actualText = "and";
    //   const expected = ["and", "^ ", "and", ""];
    //   expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    // });

    // it('splits typed text into matching and not matching text for typed text that matches with a trailing space, an ignored char, space off', () => {
    //   const expectedText = "and^ ";
    //   const actualText = "and ";
    //   const expected = ["and^ ", "", "and ", ""];
    //   expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    // });

    // it('splits typed text into matching and not matching text for typed text that matches with no trailing space, an ignored char, space off', () => {
    //   const expectedText = "and^";
    //   const actualText = "and";
    //   const expected = ["and^", "", "and", ""];
    //   expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    // });

    // it('splits typed text into matching and not matching text for typed text that matches so far but is not finished, an ignored char, space off', () => {
    //   const expectedText = "and^ the";
    //   const actualText = "and the";
    //   const expected = ["and^ the", "", "and the", ""];
    //   expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
    // });
  });
  // return [matchedExpected, unmatchedExpected, matchedActual, unmatchedActual];
});
