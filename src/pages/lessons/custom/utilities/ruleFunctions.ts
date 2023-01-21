import isOneSyllable from "../generator/rules/isOneSyllable";
import hasEfAsVeeOrEss from "../generator/rules/hasEfAsVeeOrEss";

import type { RuleFunctionsTypes } from "../generator/types";

const ruleFunctions: Required<RuleFunctionsTypes> = {
  isOneSyllable: isOneSyllable,
  // outlineIsTranslation: outlineIsTranslation,
  // hasOneKeyPerFinger: hasOneKeyPerFinger,
  // hasStretchKeys: hasStretchKeys,
  // fewerThanFiveCharacters: fewerThanFiveCharacters,
  // moreThanTwoCharacters: moreThanTwoCharacters,
  // moreThanOneSyllable: moreThanOneSyllable,
  // hasOnlyOneVowelKey: hasOnlyOneVowelKey,
  // hasOnlyShortIVowel: hasOnlyShortIVowel,
  // hasAnyShortVowel: hasAnyShortVowel,
  // hasAnyLongVowel: hasAnyLongVowel,
  // hasDiphthong: hasDiphthong,
  // hasVowelDisambiguator: hasVowelDisambiguator,
  // hasAnyVowelKey: hasAnyVowelKey,
  // isSingleStroke: isSingleStroke,
  // isMultiStroke: isMultiStroke,
  // hasForcedWordEnding: hasForcedWordEnding,
  // hasOneConsonantOnEachSide: hasOneConsonantOnEachSide,
  // hasMoreThanOneConsonant: hasMoreThanOneConsonant,
  // hasLhsConsonantWithMultipleKeys: hasLhsConsonantWithMultipleKeys,
  // hasRhsConsonantWithMultipleKeys: hasRhsConsonantWithMultipleKeys,
  // hasDigraphs: hasDigraphs,
  // hasCompoundClusters: hasCompoundClusters,
  // hasSomeConsonants: hasSomeConsonants,
  // hasApostrophes: hasApostrophes,
  // hasDoubleLetters: hasDoubleLetters,
  // hasDoubleConsonants: hasDoubleConsonants,
  // hasDoubleVowels: hasDoubleVowels,
  // hasContractionsPluralsOrPossessives: hasContractionsPluralsOrPossessives,
  // hasSimpleStenoKeys: hasSimpleStenoKeys,
  // hasUnstressedVowels: hasUnstressedVowels,
  // hasInversion: hasInversion,
  // hasSuppressedSpaceStroke: hasSuppressedSpaceStroke,
  hasEfAsVeeOrEss: hasEfAsVeeOrEss,
  // isFingerspelled: isFingerspelled,
  // hasNumbers: hasNumbers,
  // hasPunctuation: hasPunctuation,
  // hasCapitalLetter: hasCapitalLetter,
  // isUppercase: isUppercase,
  // hasDictionaryFormatting: hasDictionaryFormatting,
  // hasCoding: hasCoding,
  // hasMedical: hasMedical,
  // hasDisambiguatingBrief: hasDisambiguatingBrief,
  // hasPhillyShift: hasPhillyShift,
  // hasShortTranslations: hasShortTranslations,
  // hasLongTranslations: hasLongTranslations,
  // hasLongWords: hasLongWords,
  // isBrief: isBrief,
  // startsWithPrefix: startsWithPrefix,
  // endsWithSuffix: endsWithSuffix,
  // hasStar: hasStar,
  // isRomanNumeral: isRomanNumeral,
};

export default ruleFunctions;
