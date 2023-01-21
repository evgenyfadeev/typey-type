import Zipper from "../../../../utils/zipper";
import fallbackLesson from "../../../../constant/fallbackLesson";
import ruleFunctions from "./ruleFunctions";

import type {
  CustomLesson,
  LookupDictWithNamespacedDicts,
  Outline,
  Translation,
} from "../../../../types";

import type {
  FilterAndExpectation,
  Rules,
  RuleFunctionsTypes,
} from "../generator/types";

const translationExclusions = ["pos", "sol", "spas", "pros"];

function generateCustomLesson(
  globalLookupDictionary: LookupDictWithNamespacedDicts,
  rules: Rules
) {
  const filters: FilterAndExpectation[] = [];

  const validRules = Object.keys(rules).filter(
    (ruleName) => ruleName in ruleFunctions
  );

  for (let i = 0; i < validRules.length; i++) {
    const rule = validRules[i] as keyof RuleFunctionsTypes;
    if (ruleFunctions[rule]) {
      if (rules[rule] === true) {
        filters.push([ruleFunctions[rule], true]);
      } else {
        filters.push([ruleFunctions[rule], false]);
      }
    } else {
      throw new Error(`Invalid rule name used: ${rule}`);
    }
  }

  const ruleFilters = (entry: [string, string]) =>
    filters.every(([rule, expected]) => rule(...entry) === expected);

  const entriesList = [];
  for (const [
    translation,
    strokesAndNamespacedDicts,
  ] of globalLookupDictionary) {
    const bestOutline = strokesAndNamespacedDicts[0][0];
    const entry: [Outline, Translation] = [bestOutline, translation];

    const passesAllRules = ruleFilters(entry);
    const isNotExcludedTranslation =
      !translationExclusions.includes(translation);

    if (passesAllRules && isNotExcludedTranslation) {
      entriesList.push(entry);
    }
  }

  const rulesFilteredVocab = [...entriesList.slice(0, 1000)].filter(
    (materialItem) => ruleFilters(materialItem)
  );

  const rulesFilteredMaterial = rulesFilteredVocab.map(
    ([outline, translation]) => ({ phrase: translation, stroke: outline })
  );

  const customLesson: CustomLesson = {
    sourceMaterial: rulesFilteredMaterial,
    presentedMaterial: rulesFilteredMaterial,
    settings: { ignoredChars: "" },
    title: "Generated lesson",
    subtitle: "Generated lesson",
    // @ts-ignore FIXME: might be a Zipper typing issue
    newPresentedMaterial: new Zipper(rulesFilteredMaterial),
    path: process.env.PUBLIC_URL + "/lessons/custom",
  };

  const newCustomLesson =
    customLesson.presentedMaterial.length > 0 ? customLesson : fallbackLesson;

  // @ts-ignore 'this' implicitly has type 'any' because it does not have a type annotation.
  this.setState({
    lesson: newCustomLesson,
    currentPhraseID: 0,
    customLesson: newCustomLesson,
  });
}

export default generateCustomLesson;
