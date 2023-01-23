import React, { useEffect, useReducer, useRef } from "react";
import GoogleAnalytics from "react-ga";
import { actions } from "./generator/rulesActions";
import Subheader from "../../../components/Subheader";
import { useLocalStorage } from "usehooks-ts";
import {
  defaultState as defaultRules,
  rulesReducer,
} from "./generator/rulesReducer";
import { Link } from "react-router-dom";
import RuleOptions from "./generator/components/RuleOptions";
import availableRulePrettyNames from "./generator/utilities/availableRulePrettyNames";
import maxItems from "./generator/constants/maxItems";
import type {
  CustomLesson,
  LookupDictWithNamespacedDicts,
} from "../../../types";
import type { Rules } from "./generator/types";
import type { CustomLessonMaterialValidationState } from "./components/CustomLessonIntro";

type Props = {
  customLesson: CustomLesson;
  customLessonMaterialValidationState: CustomLessonMaterialValidationState;
  generateCustomLesson: (
    globalLookupDictionary: LookupDictWithNamespacedDicts,
    rules: Rules
  ) => void;
  fetchAndSetupGlobalDict: (
    withPlover: boolean,
    importedPersonalDictionaries?: any
  ) => Promise<any>;
  personalDictionaries: any;
  globalLookupDictionary: LookupDictWithNamespacedDicts;
};

const numberOfVisibleOptions = 16;

const CustomLessonGenerator = ({
  customLesson,
  customLessonMaterialValidationState,
  fetchAndSetupGlobalDict,
  generateCustomLesson,
  globalLookupDictionary,
  personalDictionaries,
}: Props) => {
  const mainHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const shouldUsePersonalDictionaries =
      personalDictionaries &&
      Object.entries(personalDictionaries).length > 0 &&
      !!personalDictionaries.dictionariesNamesAndContents;

    fetchAndSetupGlobalDict(
      false,
      shouldUsePersonalDictionaries ? personalDictionaries : null
    ).catch((error: Error) => {
      console.error(error);
    });
    // }, [fetchAndSetupGlobalDict, personalDictionaries]);
    // Excluding fetchAndSetupGlobalDict…
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personalDictionaries]);

  useEffect(() => {
    mainHeading.current?.focus();
  }, []);

  const [rulesSettings, setRulesSettings] = useLocalStorage(
    "rules",
    defaultRules
  );

  const [rulesState, dispatchRules] = useReducer(
    rulesReducer,
    {}, // init state
    () => rulesSettings
  );

  const onRules = Object.fromEntries(
    Object.entries(rulesState).filter(([_ruleName, value]) => value)
  );

  const buildLesson = () => {
    generateCustomLesson(globalLookupDictionary, onRules);
    setRulesSettings(rulesState);
  };

  const onChangeRuleStatus: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    dispatchRules({
      type: actions.setRuleStatus,
      payload: { ruleName: event.target.name, ruleStatus: event.target.value },
    });

    setRulesSettings(rulesState);

    GoogleAnalytics.event({
      category: "Lesson generator",
      action: "Change rule setting",
      label: `${event.target.name}: ${event.target.value}`,
    });
  };

  return (
    <main id="main">
      <Subheader>
        <div className="flex mr1 self-center">
          <header className="flex items-center min-h-40">
            <h2
              ref={mainHeading}
              tabIndex={-1}
              id="typey-type-for-stenographers-lesson-generator"
            >
              Lesson generator
            </h2>
          </header>
        </div>
      </Subheader>

      <div className="bg-info dark:bg-coolgrey-1100 landing-page-section">
        <div className="p3 mx-auto mw-1024">
          <div className="flex flex-wrap justify-between">
            <div className="mt1">
              <h3 className="mt3">Lesson generator</h3>
              <div>
                <p>
                  This page lets you generate custom lessons using
                  Typey&nbsp;Type dictionaries and personal dictionaries.
                </p>
                <p>
                  <span role="img" aria-label="Warning!">
                    ⚠️{" "}
                  </span>
                  Language is messy. These rules use heuristics and make
                  imperfect guesses.
                </p>
                <div className="pb1 columns-2 columns-xs gap-4">
                  {availableRulePrettyNames
                    .slice(0, numberOfVisibleOptions)
                    .map((rule) => (
                      <RuleOptions
                        key={rule.ruleName}
                        ruleName={rule.ruleName}
                        prettyName={rule.prettyName}
                        rulesState={rulesState}
                        onChangeRuleStatus={onChangeRuleStatus}
                      />
                    ))}
                </div>
                <details>
                  <summary>
                    <p className="cursor-pointer color-interactive">
                      More options…
                    </p>
                  </summary>
                  <div className="pb3 columns-2 columns-xs gap-4">
                    {availableRulePrettyNames
                      .slice(numberOfVisibleOptions)
                      .map((rule) => (
                        <RuleOptions
                          key={rule.ruleName}
                          ruleName={rule.ruleName}
                          prettyName={rule.prettyName}
                          rulesState={rulesState}
                          onChangeRuleStatus={onChangeRuleStatus}
                        />
                      ))}
                  </div>
                </details>
                <p>
                  <button
                    className="link-button dib mr1"
                    style={{ lineHeight: 2 }}
                    onClick={buildLesson}
                    type="button"
                  >
                    Build lesson
                  </button>
                  <Link
                    to="/lessons/custom?study=practice&newWords=1&seenWords=1&retainedWords=1&sortOrder=sortOff&startFromWord=1"
                    className="link-button dib button button--secondary"
                    style={{ lineHeight: 2 }}
                  >
                    Start generated lesson
                  </Link>
                </p>
                <p>
                  {customLessonMaterialValidationState === "fail" && (
                    <>
                      That combination of rule settings results in no material.
                      Try setting some rules to “ignored”.
                      {rulesState.isOneSyllable ===
                        rulesState.moreThanOneSyllable &&
                      rulesState.isOneSyllable !== "ignored"
                        ? " Change one of the syllable count settings."
                        : ""}
                      {rulesState.isSingleStroke === rulesState.isMultiStroke &&
                      rulesState.isSingleStroke !== "ignored"
                        ? " Change one of the stroke count settings."
                        : ""}
                    </>
                  )}
                  {customLessonMaterialValidationState === "unvalidated" &&
                    "Preview generated lesson here after building."}
                  {customLessonMaterialValidationState === "success" &&
                    `Preview generated lesson with ${
                      customLesson.presentedMaterial.length === maxItems
                        ? "max "
                        : ""
                    }${customLesson.presentedMaterial.length} item${
                      customLesson.presentedMaterial.length === 1 ? "" : "s"
                    }:`}
                </p>
                <div>
                  <ul>
                    {customLessonMaterialValidationState === "fail" ||
                    customLessonMaterialValidationState === "unvalidated"
                      ? undefined
                      : customLesson.presentedMaterial.map(
                          (materialItem, index: number) => (
                            <li
                              key={`${index}-${materialItem.phrase}-${materialItem.stroke}`}
                              className="wrap"
                            >
                              {materialItem.phrase}{" "}
                              <kbd className="raw-steno-key raw-steno-key--subtle">
                                {materialItem.stroke}
                              </kbd>
                            </li>
                          )
                        )}
                  </ul>
                </div>
                {customLessonMaterialValidationState === "success" && (
                  <Link
                    to="/lessons/custom/setup"
                    className="link-button dib button button--secondary"
                    style={{ lineHeight: 2 }}
                  >
                    Edit generated lesson
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CustomLessonGenerator;