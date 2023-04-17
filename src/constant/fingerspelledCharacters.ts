type FingerspelledCharacters = {
  [singleCharacter: string]: string
}

// TODO: don't hardcode this
const fingerspelledCharacters: FingerspelledCharacters = {
  "a": "A*",
  "b": "PW*",
  "c": "KR*",
  "d": "TK*",
  "e": "*E",
  "f": "TP*",
  "g": "TKPW*",
  "h": "H*",
  "i": "*EU",
  "j": "SKWR*",
  "k": "K*",
  "l": "HR*",
  "m": "PH*",
  "n": "TPH*",
  "o": "O*",
  "p": "P*",
  "q": "KW*",
  "r": "R*",
  "s": "S*",
  "t": "T*",
  "u": "*U",
  "v": "SR*",
  "w": "W*",
  "x": "KP*",
  "y": "KWR*",
  "z": "STKPW*",
  "A": "A*P",
  "B": "PW*P",
  "C": "KR*P",
  "D": "TK*P",
  "E": "*EP",
  "F": "TP*P",
  "G": "TKPW*P",
  "H": "H*P",
  "I": "*EUP",
  "J": "SKWR*P",
  "K": "K*P",
  "L": "HR*P",
  "M": "PH*P",
  "N": "TPH*P",
  "O": "O*P",
  "P": "P*P",
  "Q": "KW*P",
  "R": "R*P",
  "S": "S*P",
  "T": "T*P",
  "U": "*UP",
  "V": "SR*P",
  "W": "W*P",
  "X": "KP*P",
  "Y": "KWR*P",
  "Z": "STKPW*P",
  "@": "SKWRAT",
  "(": "PREPB",
  ")": "PR*EPB",
  "“": "KW-GS/KW-GS",
  "”": "KR-GS/KR-GS",
  ",": "KW-BG",
  "?": "H-F",
  "!": "SKHRAPL",
  "–": "EPB/TKA*RB",
  "—": "EPL/TKA*RB",
  "`": "KH-FG",
  "^": "KR-RT",
  "~": "T*LD",
  "<": "PWRABG",
  ">": "PWRA*BG",
  "=": "KW-L",
  "|": "PAO*EUP",
  "_": "RUPBD",
  "-": "H-PB",
  ":": "KHR-PB",
  ";": "TH-FL",
  "/": "OEU",
  ".": "P-P",
  "]": "PWR*BGT",
  "[": "PWR-BGT",
  "{": "TPR-BGT",
  "}": "TPR*BGT",
  "$": "TK-PL",
  "*": "STA*R",
  "&": "SKP*",
  "#": "HAERB",
  "%": "P*ERS",
  "+": "PHR*US",
  "\\": "SPWHRAERB",
  "\"": "KR-GS",
  // "\"": "KWR-GS",
  // "{^\"}": "KR-GS",
  // "{\"^}": "KW-GS",
  // "{^~|\"}": "KR-GS",
  // "{~|\"^}": "KW-GS",
  " ": "S-P",
  "1": "#S",
  "2": "#T",
  "3": "#P",
  "4": "#H",
  "5": "#A",
  "0": "#O",
  "6": "#F",
  "7": "#-P",
  "8": "#L",
  "9": "#-T"
} as const;

export default fingerspelledCharacters;
