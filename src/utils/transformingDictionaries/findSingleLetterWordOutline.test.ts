import findSingleLetterWordOutline from "./findSingleLetterWordOutline";
import { AffixList } from "../affixList";

describe("findSingleLetterWordOutline", () => {
  beforeEach(() => {
    const affixList = new AffixList(
      new Map([
        ["{^en}", [["*EPB", "typey:typey-type.json"]]],
        ["{^ment}", [["*PLT", "typey:typey-type.json"]]],
        ["{a^}", [["A", "typey:typey-type.json"]]],
        ["{in^}", [["EUPB", "typey:typey-type.json"]]],
        ["{^ly}", [["HREU", "typey:typey-type.json"]]],
        ["{con^}", [["KAUPB", "typey:typey-type.json"]]],
        ["{^ent}", [["EPBT", "typey:typey-type.json"]]],
        ["{^ed}", [["-D", "typey:typey-type.json"]]],
      ])
    );
    AffixList.setSharedInstance(affixList);
  });

  afterEach(() => {
    AffixList.setSharedInstance([]);
  });

  it("returns fingerspelled outline for word “a” in the middle of a sentence with no personal dictionary entry", () => {
    const affixList = AffixList.getSharedInstance();
    const lookupDict = new Map([["a", [["AEU", "typey:typey-type.json"]]]]);
    expect(
      findSingleLetterWordOutline("a", lookupDict, "AEU", affixList, " ")
    ).toEqual("AEU");
  });

  it("returns fingerspelled outline for word “a” in the middle of a sentence with personal dictionary entry for “a”", () => {
    const affixList = AffixList.getSharedInstance();
    const lookupDict = new Map([
      [
        "a",
        [
          ["AEUZ", "user:personal.json"],
          ["AEU", "typey:typey-type.json"],
        ],
      ],
    ]);
    expect(
      findSingleLetterWordOutline("a", lookupDict, "AEU", affixList, " ")
    ).toEqual("AEUZ");
  });

  it("returns fingerspelled outline for word “A” at the start of a lesson with no personal dictionary entry", () => {
    const affixList = AffixList.getSharedInstance();
    const lookupDict = new Map([
      ["a", [["AEU", "typey:typey-type.json"]]],
      ["{ }{-|}", [["KPA", "typey:typey-type.json"]]],
      ["{^}{-|}", [["KPA*", "typey:typey-type.json"]]],
    ]);
    expect(
      findSingleLetterWordOutline("A", lookupDict, "KPA/AEU", affixList, "")
    ).toEqual("KPA/AEU");
  });

  it("returns fingerspelled outline for word “A” at the start of a lesson with personal dictionary entry for “a” and capitalisation strokes", () => {
    const affixList = AffixList.getSharedInstance();
    const lookupDict = new Map([
      [
        "a",
        [
          ["AEUZ", "user:personal.json"],
          ["AEU", "typey:typey-type.json"],
        ],
      ],
      ["{ }{-|}", [["KPA", "typey:typey-type.json"]]],
      [
        "{^}{-|}",
        [
          ["KPA*", "typey:typey-type.json"],
          ["KPA*Z", "user:personal.json"],
        ],
      ],
      [
        "{}{-|}",
        [
          ["KPAZ", "user:personal.json"],
          ["KPA", "plover:plover.json"],
        ],
      ],
    ]);
    expect(
      findSingleLetterWordOutline("A", lookupDict, "KPA/AEU", affixList, "")
    ).toEqual("KPAZ/AEUZ");
  });

  it("returns fingerspelled outline for word “I” in the middle of a sentence with no personal dictionary entry", () => {
    const affixList = AffixList.getSharedInstance();
    const lookupDict = new Map([["I", [["EU", "typey:typey-type.json"]]]]);
    expect(
      findSingleLetterWordOutline("I", lookupDict, "EU", affixList, " ")
    ).toEqual("EU");
  });

  it("returns fingerspelled outline for word “I” in the middle of a sentence with personal dictionary entry for “I”", () => {
    const affixList = AffixList.getSharedInstance();
    const lookupDict = new Map([
      [
        "I",
        [
          ["EUZ", "user:personal.json"],
          ["EU", "typey:typey-type.json"],
        ],
      ],
    ]);
    expect(
      findSingleLetterWordOutline("I", lookupDict, "EU", affixList, " ")
    ).toEqual("EUZ");
  });
});
