import Zipper from "../utils/zipper";

const fallbackLesson = {
  sourceMaterial: [
    { phrase: "The", stroke: "-T" },
    { phrase: "process", stroke: "PROEUS" },
    { phrase: "of", stroke: "-F" },
    { phrase: "writing", stroke: "WREUG" },
    { phrase: "shorthand", stroke: "SHORT/HA*PBD" },
    { phrase: "is", stroke: "S" },
    { phrase: "called", stroke: "KAULD" },
    { phrase: "stenography.", stroke: "STEPB/TKPWRAEF TP-PL" },
    { phrase: "It's", stroke: "T-S" },
    { phrase: "typed", stroke: "TAOEUPD" },
    { phrase: "with a", stroke: "WA*EU" },
    { phrase: "stenotype", stroke: "STEPB/TAOEUP" },
    { phrase: "or", stroke: "OR" },
    { phrase: "fancy", stroke: "TPAPB/SEU" },
    { phrase: "keyboard.", stroke: "KAOEBD TP-PL" },
    { phrase: "You can", stroke: "KU" },
    { phrase: "transcribe,", stroke: "TREUB KW-BG" },
    { phrase: "caption,", stroke: "KAPGS KW-BG" },
    { phrase: "dictate,", stroke: "TKEUBG/TAEUT KW-BG" },
    { phrase: "code,", stroke: "KOED KW-BG" },
    { phrase: "chat,", stroke: "KHAT KW-BG" },
    { phrase: "or", stroke: "OR" },
    { phrase: "write", stroke: "WREU" },
    { phrase: "prose", stroke: "PROES" },
    { phrase: "at", stroke: "AT" },
    { phrase: "over", stroke: "OEFR" },
    { phrase: "200", stroke: "#T-Z" },
    { phrase: "words", stroke: "WORDZ" },
    { phrase: "per", stroke: "PER" },
    { phrase: "minute.", stroke: "PHEUPB TP-PL" },
    { phrase: "Typey type", stroke: "TAOEUP/KWREU TAOEUP" },
    { phrase: "uses", stroke: "AOUFS" },
    { phrase: "spaced", stroke: "SPAEUFD" },
    { phrase: "repetitions", stroke: "REP/TEUGS/-S" },
    { phrase: "and", stroke: "SKP" },
    { phrase: "hundreds", stroke: "HUPBS" },
    { phrase: "of", stroke: "-F" },
    { phrase: "lessons", stroke: "HROEFPBS" },
    { phrase: "to", stroke: "TO" },
    { phrase: "help", stroke: "HEP" },
    { phrase: "you", stroke: "U" },
    { phrase: "master", stroke: "PHAFRT" },
    { phrase: "typing", stroke: "TAOEUPG" },
    { phrase: "with", stroke: "W" },
    { phrase: "stenography.", stroke: "STEPB/TKPWRAEF TP-PL" },
  ],
  presentedMaterial: [
    { phrase: "The", stroke: "-T" },
    { phrase: "process", stroke: "PROEUS" },
    { phrase: "of", stroke: "-F" },
    { phrase: "writing", stroke: "WREUG" },
    { phrase: "shorthand", stroke: "SHORT/HA*PBD" },
    { phrase: "is", stroke: "S" },
    { phrase: "called", stroke: "KAULD" },
    { phrase: "stenography.", stroke: "STEPB/TKPWRAEF TP-PL" },
    { phrase: "It's", stroke: "T-S" },
    { phrase: "typed", stroke: "TAOEUPD" },
    { phrase: "with a", stroke: "WA*EU" },
    { phrase: "stenotype", stroke: "STEPB/TAOEUP" },
    { phrase: "or", stroke: "OR" },
    { phrase: "fancy", stroke: "TPAPB/SEU" },
    { phrase: "keyboard.", stroke: "KAOEBD TP-PL" },
    { phrase: "You can", stroke: "KU" },
    { phrase: "transcribe,", stroke: "TREUB KW-BG" },
    { phrase: "caption,", stroke: "KAPGS KW-BG" },
    { phrase: "dictate,", stroke: "TKEUBG/TAEUT KW-BG" },
    { phrase: "code,", stroke: "KOED KW-BG" },
    { phrase: "chat,", stroke: "KHAT KW-BG" },
    { phrase: "or", stroke: "OR" },
    { phrase: "write", stroke: "WREU" },
    { phrase: "prose", stroke: "PROES" },
    { phrase: "at", stroke: "AT" },
    { phrase: "over", stroke: "OEFR" },
    { phrase: "200", stroke: "#T-Z" },
    { phrase: "words", stroke: "WORDZ" },
    { phrase: "per", stroke: "PER" },
    { phrase: "minute.", stroke: "PHEUPB TP-PL" },
    { phrase: "Typey type", stroke: "TAOEUP/KWREU TAOEUP" },
    { phrase: "uses", stroke: "AOUFS" },
    { phrase: "spaced", stroke: "SPAEUFD" },
    { phrase: "repetitions", stroke: "REP/TEUGS/-S" },
    { phrase: "and", stroke: "SKP" },
    { phrase: "hundreds", stroke: "HUPBS" },
    { phrase: "of", stroke: "-F" },
    { phrase: "lessons", stroke: "HROEFPBS" },
    { phrase: "to", stroke: "TO" },
    { phrase: "help", stroke: "HEP" },
    { phrase: "you", stroke: "U" },
    { phrase: "master", stroke: "PHAFRT" },
    { phrase: "typing", stroke: "TAOEUPG" },
    { phrase: "with", stroke: "W" },
    { phrase: "stenography.", stroke: "STEPB/TKPWRAEF TP-PL" },
  ],
  settings: {
    ignoredChars: "",
  },
  title: "Steno",
  subtitle: "",
  newPresentedMaterial: new Zipper([{ phrase: "", stroke: "" }]),
  path: "",
};

export default fallbackLesson;