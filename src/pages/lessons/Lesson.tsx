import React, { useEffect, useRef } from "react";
import { Link, Route, Switch } from "react-router-dom";
import queryString from "query-string";
import DocumentTitle from "react-document-title";
import ErrorBoundary from "../../components/ErrorBoundary";
import LessonNotFound from "./LessonNotFound";
import LessonOverview from "./LessonOverview";
import LessonSubheader from "./components/LessonSubheader";
import Finished from "./components/Finished";
import Flashcards from "./flashcards/Flashcards";
import { loadPersonalPreferences } from "../../utils/typey-type";
import getLessonMetadata from "./utilities/getLessonMetadata";
import MainLessonView from "./MainLessonView";
import { LessonProps } from "./types";
import type { Lesson as LessonType } from "../../types";
import Zipper from "../../utils/zipper";
import { useAppMethods } from "../../states/legacy/AppMethodsContext";
import { useAtomValue } from "jotai";
import { userSettingsState } from "../../states/userSettingsState";

const isCustom = (pathname: string) =>
  pathname === "/lessons/custom" || pathname === "/lessons/custom/setup";

const isFinished = (lesson: LessonType, currentPhraseID: number) =>
  currentPhraseID === lesson?.presentedMaterial?.length || 0;

const isFlashcards = (pathname: string) =>
  pathname.startsWith("/lessons/") && pathname.endsWith("/flashcards");

const isOverview = (pathname: string) =>
  pathname.startsWith("/lessons/") && pathname.endsWith("/overview");

const isProgressLesson = (pathname: string) =>
  pathname.startsWith("/lessons/progress/");

const Lesson = ({
  actualText,
  completedPhrases,
  currentLessonStrokes,
  currentPhrase,
  currentPhraseID,
  currentStroke,
  disableUserSettings,
  flashcardsMetWords,
  flashcardsProgress,
  fullscreen,
  globalLookupDictionary,
  globalLookupDictionaryLoaded,
  globalUserSettings,
  lesson,
  lessonIndex,
  lessonLength,
  lessonNotFound,
  lessonSubTitle: lessonSubTitleProp,
  lessonTitle,
  location,
  match,
  metWords,
  personalDictionaries,
  previousCompletedPhraseAsTyped,
  recentLessonHistory,
  repetitionsRemaining,
  revisionMode,
  settings,
  showStrokesInLesson,
  startTime,
  targetStrokeCount,
  timer,
  topSpeedPersonalBest,
  totalNumberOfHintedWords,
  totalNumberOfLowExposuresSeen,
  totalNumberOfMatchedWords,
  totalNumberOfMistypedWords,
  totalNumberOfNewWordsMet,
  totalNumberOfRetainedWords,
  totalWordCount,
  upcomingPhrases,
}: LessonProps) => {
  const {
    appFetchAndSetupGlobalDict,
    chooseStudy,
    customiseLesson,
    handleLesson,
    handleStopLesson,
    toggleHideOtherSettings,
    changeFullscreen,
    changeShowStrokesInLesson,
    restartLesson,
    reviseLesson,
    sayCurrentPhraseAgain,
    setUpProgressRevisionLesson,
    setupLesson,
    startCustomLesson,
    startFromWordOne,
    stopLesson,
    updateFlashcardsMetWords,
    updateFlashcardsProgress,
    updateGlobalLookupDictionary,
    updateMarkup,
    updatePersonalDictionaries,
    updatePreset,
    updateRevisionMaterial,
    updateTopSpeedPersonalBest,
  } = useAppMethods();
  const userSettings = useAtomValue(userSettingsState);
  const loadedLessonPath = useRef("");

  // const mainHeading = useRef<HTMLHeadingElement>(null);
  const mainHeading = useRef(null);
  useEffect(() => {
    if (mainHeading) {
      // @ts-ignore
      mainHeading.current?.focus();
    }
  }, []);

  useEffect(() => {
    // If cookies are disabled, attempting to access localStorage will cause an error.
    // The disabled cookie error will be handled in ErrorBoundary.
    // Wrapping this in a try/catch or removing the conditional would fail silently.
    // By checking here, we let people use the rest of the app but not lessons.
    if (window.localStorage) {
      loadedLessonPath.current = match.url;

      if (
        location.pathname.startsWith("/lessons/progress/") &&
        !location.pathname.includes("/lessons/progress/seen/") &&
        !location.pathname.includes("/lessons/progress/memorised/")
      ) {
        let loadedPersonalPreferences = loadPersonalPreferences();
        let newSeenOrMemorised = [false, true, true];
        setUpProgressRevisionLesson(
          loadedPersonalPreferences[0],
          userSettings,
          newSeenOrMemorised
        );
      } else if (location.pathname.startsWith("/lessons/progress/seen/")) {
        let loadedPersonalPreferences = loadPersonalPreferences();
        let newSeenOrMemorised = [false, true, false];
        setUpProgressRevisionLesson(
          loadedPersonalPreferences[0],
          userSettings,
          newSeenOrMemorised
        );
      } else if (location.pathname.startsWith("/lessons/progress/memorised/")) {
        let loadedPersonalPreferences = loadPersonalPreferences();
        let newSeenOrMemorised = [false, false, true];
        setUpProgressRevisionLesson(
          loadedPersonalPreferences[0],
          userSettings,
          newSeenOrMemorised
        );
      } else if (
        location.pathname.startsWith("/lessons/custom") &&
        !location.pathname.startsWith("/lessons/custom/setup")
      ) {
        startCustomLesson();
      } else if (isOverview(location.pathname)) {
        // do nothing
      } else if (isFlashcards(location.pathname)) {
        // do nothing
      } else if (
        lesson.path !== location.pathname + "lesson.txt" &&
        location.pathname.startsWith("/lessons")
      ) {
        handleLesson(process.env.PUBLIC_URL + location.pathname + "lesson.txt");
      }

      const parsedParams = queryString.parse(location.search);
      let hasSettingsParams = false;

      if (
        Object.keys(parsedParams).some((param) => {
          return userSettings.hasOwnProperty(param);
        })
      ) {
        hasSettingsParams = true;
      }

      if (hasSettingsParams) {
        setupLesson();
        hasSettingsParams = false;
      }
    }
    // TODO: revisit this after reducing parent component re-renders and converting class component to function component
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // }, [handleLesson, lesson.path, location.pathname, location.search, match.url, setUpProgressRevisionLesson, setupLesson, startCustomLesson, userSettings]);

  const shouldStartCustomLesson =
    location.pathname.startsWith("/lessons/custom") &&
    !location.pathname.startsWith("/lessons/custom/setup") &&
    lesson.title !== "Custom";

  const hasLessonChanged = match.url !== loadedLessonPath.current;

  // Start custom lesson!
  useEffect(() => {
    if (shouldStartCustomLesson && hasLessonChanged) {
      loadedLessonPath.current = match.url;
      startCustomLesson();
    }
    // TODO: revisit this after reducing parent component re-renders and converting class component to function component
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldStartCustomLesson, hasLessonChanged]);
  // }, [shouldStartCustomLesson, hasLessonChanged, startCustomLesson, match.url]);

  // Load lesson file and start lesson!
  useEffect(() => {
    if (
      !shouldStartCustomLesson &&
      !isCustom(location.pathname) &&
      !isFlashcards(location.pathname) &&
      !isOverview(location.pathname) &&
      !isProgressLesson(location.pathname) &&
      location.pathname.startsWith("/lessons") &&
      hasLessonChanged
    ) {
      loadedLessonPath.current = match.url;
      handleLesson(process.env.PUBLIC_URL + location.pathname + "lesson.txt");
    }
    // TODO: revisit this after reducing parent component re-renders and converting class component to function component
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasLessonChanged, location.pathname, shouldStartCustomLesson]);
  // }, [hasLessonChanged, location.pathname, shouldStartCustomLesson, handleLesson, match.url]);

  const hasZeroTotalWordCount = totalWordCount === 0;
  const hasEmptyCurrentPhrase = currentPhrase === "";

  // Focus on input when starting custom lesson
  useEffect(() => {
    if (
      location.pathname.startsWith("/lessons/custom") &&
      (!hasEmptyCurrentPhrase || !hasZeroTotalWordCount)
    ) {
      const yourTypedText = document.getElementById("your-typed-text");
      if (yourTypedText) {
        yourTypedText.focus();
      }
    }
  }, [location.pathname, hasEmptyCurrentPhrase, hasZeroTotalWordCount]);

  // Stop lesson (timer, etc. when lesson is unmounted)
  useEffect(() => {
    return () => {
      stopLesson();
    };
    // TODO: revisit this after reducing parent component re-renders and converting class component to function component
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function stopAndCustomiseLesson() {
    stopLesson();
    customiseLesson();
  }

  if (lessonNotFound) {
    return <LessonNotFound lessonIndex={lessonIndex} />;
  }

  const lessonSubTitle =
    lesson?.subtitle?.length > 0 ? `: ${lessonSubTitleProp}` : "";

  const createNewCustomLesson = isCustom(location.pathname) ? (
    <Link
      to="/lessons/custom/setup"
      onClick={stopLesson}
      className="link-button link-button-ghost table-cell mr1"
      role="button"
    >
      Edit custom lesson
    </Link>
  ) : (
    <Link
      to="/lessons/custom/setup"
      onClick={stopAndCustomiseLesson.bind(this)}
      className="link-button link-button-ghost table-cell mr1"
      role="button"
    >
      Customise lesson
    </Link>
  );

  const metadata = getLessonMetadata(lessonIndex, lesson.path);
  const overviewLink = metadata?.overview ? (
    <Link
      to={location.pathname + "overview"}
      className="link-button link-button-ghost table-cell"
    >
      Overview
    </Link>
  ) : undefined;

  let propsLesson = lesson;
  if (
    (Object.keys(propsLesson).length === 0 &&
      propsLesson.constructor === Object) ||
    !propsLesson
  ) {
    propsLesson = {
      sourceMaterial: [{ phrase: "The", stroke: "-T" }],
      presentedMaterial: [{ phrase: "The", stroke: "-T" }],
      // possibly incorrect `newPresentedMaterial`?
      // @ts-ignore
      newPresentedMaterial: new Zipper([{ phrase: "The", stroke: "-T" }]),
      settings: { ignoredChars: "" },
      title: "Steno",
      subtitle: "",
      path: "",
    };
  }

  if (lesson) {
    if (
      isFinished(lesson, currentPhraseID) &&
      !isOverview(location.pathname) &&
      !isFlashcards(location.pathname)
    ) {
      return (
        <DocumentTitle title={"Typey Type | Lesson: " + lesson.title}>
          <main id="main">
            <LessonSubheader
              createNewCustomLesson={createNewCustomLesson}
              handleStopLesson={handleStopLesson}
              lessonSubTitle={lessonSubTitle}
              lessonTitle={lessonTitle}
              overviewLink={overviewLink}
              path={lesson?.path}
              restartLesson={restartLesson}
              ref={mainHeading}
            />
            <Finished
              chooseStudy={chooseStudy}
              currentLessonStrokes={currentLessonStrokes}
              disableUserSettings={disableUserSettings}
              globalUserSettings={globalUserSettings}
              toggleHideOtherSettings={toggleHideOtherSettings}
              metadata={metadata}
              lesson={lesson}
              lessonLength={propsLesson.presentedMaterial.length}
              lessonTitle={lessonTitle}
              metWords={metWords}
              path={lesson?.path}
              restartLesson={restartLesson}
              reviseLesson={reviseLesson}
              settings={lesson.settings}
              startFromWordOne={startFromWordOne}
              startTime={startTime}
              timer={timer}
              topSpeedPersonalBest={topSpeedPersonalBest}
              revisionMode={revisionMode}
              updatePreset={updatePreset}
              updateRevisionMaterial={updateRevisionMaterial}
              updateTopSpeedPersonalBest={updateTopSpeedPersonalBest}
              totalNumberOfMatchedWords={totalNumberOfMatchedWords}
              totalNumberOfNewWordsMet={totalNumberOfNewWordsMet}
              totalNumberOfLowExposuresSeen={totalNumberOfLowExposuresSeen}
              totalNumberOfRetainedWords={totalNumberOfRetainedWords}
              totalNumberOfMistypedWords={totalNumberOfMistypedWords}
              totalNumberOfHintedWords={totalNumberOfHintedWords}
              totalWordCount={propsLesson.presentedMaterial.length}
            />
          </main>
        </DocumentTitle>
      );
    } else {
      return (
        <Switch>
          <Route
            path={`/lessons/:category/:subcategory?/:lessonPath/overview`}
            render={(routeProps) => (
              <div>
                <ErrorBoundary>
                  <DocumentTitle title={"Typey Type | Lesson overview"}>
                    <LessonOverview
                      lessonMetadata={metadata}
                      lessonPath={location.pathname.replace("overview", "")}
                      lessonTxtPath={location.pathname.replace(
                        "overview",
                        "lesson.txt"
                      )}
                      lessonTitle={lesson.title}
                      {...routeProps}
                    />
                  </DocumentTitle>
                </ErrorBoundary>
              </div>
            )}
          />
          <Route
            path={`/lessons/:category/:subcategory?/:lessonPath/flashcards`}
            render={() => (
              <div>
                <DocumentTitle title={"Typey Type | Flashcards"}>
                  <Flashcards
                    fetchAndSetupGlobalDict={appFetchAndSetupGlobalDict}
                    flashcardsMetWords={flashcardsMetWords}
                    flashcardsProgress={flashcardsProgress}
                    globalLookupDictionary={globalLookupDictionary}
                    globalLookupDictionaryLoaded={globalLookupDictionaryLoaded}
                    globalUserSettings={globalUserSettings}
                    personalDictionaries={personalDictionaries}
                    updateFlashcardsMetWords={updateFlashcardsMetWords.bind(
                      this
                    )}
                    updateFlashcardsProgress={updateFlashcardsProgress.bind(
                      this
                    )}
                    updateGlobalLookupDictionary={updateGlobalLookupDictionary}
                    updatePersonalDictionaries={updatePersonalDictionaries}
                    fullscreen={fullscreen}
                    changeFullscreen={changeFullscreen.bind(this)}
                    lessonpath={
                      process.env.PUBLIC_URL +
                      location.pathname.replace(/flashcards/, "") +
                      "lesson.txt"
                    }
                    locationpathname={location.pathname}
                  />
                </DocumentTitle>
              </div>
            )}
          />
          <Route
            exact={true}
            path={`${match.url}`}
            render={() => (
              <MainLessonView
                createNewCustomLesson={createNewCustomLesson}
                lessonSubTitle={lessonSubTitle}
                overviewLink={overviewLink}
                propsLesson={propsLesson}
                actualText={actualText}
                changeShowStrokesInLesson={changeShowStrokesInLesson}
                chooseStudy={chooseStudy}
                completedPhrases={completedPhrases}
                currentLessonStrokes={currentLessonStrokes}
                currentPhrase={currentPhrase}
                currentPhraseID={currentPhraseID}
                currentStroke={currentStroke}
                disableUserSettings={disableUserSettings}
                globalLookupDictionary={globalLookupDictionary}
                globalLookupDictionaryLoaded={globalLookupDictionaryLoaded}
                handleStopLesson={handleStopLesson}
                toggleHideOtherSettings={toggleHideOtherSettings}
                lesson={lesson}
                lessonLength={lessonLength}
                lessonTitle={lessonTitle}
                previousCompletedPhraseAsTyped={previousCompletedPhraseAsTyped}
                recentLessonHistory={recentLessonHistory}
                repetitionsRemaining={repetitionsRemaining}
                restartLesson={restartLesson}
                revisionMode={revisionMode}
                sayCurrentPhraseAgain={sayCurrentPhraseAgain}
                settings={settings}
                showStrokesInLesson={showStrokesInLesson}
                targetStrokeCount={targetStrokeCount}
                timer={timer}
                totalNumberOfHintedWords={totalNumberOfHintedWords}
                totalNumberOfLowExposuresSeen={totalNumberOfLowExposuresSeen}
                totalNumberOfMatchedWords={totalNumberOfMatchedWords}
                totalNumberOfMistypedWords={totalNumberOfMistypedWords}
                totalNumberOfNewWordsMet={totalNumberOfNewWordsMet}
                totalNumberOfRetainedWords={totalNumberOfRetainedWords}
                totalWordCount={totalWordCount}
                upcomingPhrases={upcomingPhrases}
                updatePreset={updatePreset}
                updateMarkup={updateMarkup.bind(this)}
              />
            )}
          />
        </Switch>
      );
    }
  } else {
    return (
      <div>
        <h2 ref={mainHeading} tabIndex={-1}>
          That lesson is missing.
        </h2>
      </div>
    );
  }
};

export default Lesson;
