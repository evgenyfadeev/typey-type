import React from "react";
import { shouldShowStroke } from "../../../utils/typey-type";

import StrokeTipHidden from "./StrokeTipHidden";
import StrokeTipDiagram from "./StrokeTipDiagram";
import StrokeTipText from "./StrokeTipText";

import type { Outline, UserSettings } from "../../../types";

type Props = {
  changeShowStrokesInLesson: () => void;
  currentStroke: Outline;
  showStrokesInLesson: boolean;
  targetStrokeCount: number;
  userSettings: UserSettings;
  repetitionsRemaining: number;
};

export default function StrokeTip({
  changeShowStrokesInLesson,
  currentStroke,
  showStrokesInLesson,
  targetStrokeCount,
  userSettings,
  repetitionsRemaining,
}: Props) {
  const isMultiline = userSettings.upcomingWordsLayout === "multiline";
  const showStroke = shouldShowStroke(
    showStrokesInLesson,
    userSettings.showStrokes,
    repetitionsRemaining,
    userSettings.hideStrokesOnLastRepetition
  );

  return (
    <div className="mb6">
      {showStroke && currentStroke ? (
        <div
          className={`stroke-tip${isMultiline ? " flex justify-center" : ""}`}
          aria-live="polite"
          aria-atomic="true"
        >
          <span
            className="visually-hidden"
            aria-hidden={userSettings.showStrokesAsDiagrams ? "true" : "false"}
          >
            Hint:{" "}
          </span>
          {userSettings.showStrokesAsDiagrams ? (
            <StrokeTipDiagram
              currentStroke={currentStroke}
              diagramSize={userSettings.diagramSize}
              isMultiline={isMultiline}
              stenoLayout={userSettings.stenoLayout}
            />
          ) : (
            <StrokeTipText
              currentStroke={currentStroke}
              isMultiline={isMultiline}
              stenoLayout={userSettings.stenoLayout}
            />
          )}
        </div>
      ) : (
        <StrokeTipHidden
          changeShowStrokesInLesson={changeShowStrokesInLesson}
          isMultiline={isMultiline}
          showStrokesInLesson={showStrokesInLesson}
          targetStrokeCount={targetStrokeCount}
        />
      )}
    </div>
  );
}