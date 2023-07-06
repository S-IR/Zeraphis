/**
 * Finds the letters in the first string that are different from the corresponding letters in the second string at the exact same position.
 * @param {string} string1 - The first string.
 * @param {string} string2 - The second string.
 * @returns {Set<string>} - A set of letters that are different.
 */
export function findDifferentLetters(
  string1: string,
  string2: string
): Set<string> {
  const differentLetters = new Set<string>();
  const loopEnd =
    string1.length < string2.length ? string2.length : string1.length;
  for (let i = 0; i < loopEnd; i++) {
    if (string1[i] !== string2[i]) {
      differentLetters.add(string1[i] as string);
    }
  }
  return differentLetters;
}

export const arabicToLatinObj = {
  " ": " ",
  ا: "a",
  ب: "b",
  ت: "t",
  ث: "th",
  ج: "j",
  ح: "H",
  خ: "kh",
  د: "d",
  ذ: "dh",
  ر: "r",
  ز: "z",
  س: "s",
  ش: "sh",
  ص: "S",
  ض: "D",
  ط: "T",
  ظ: "Z",
  ع: "ʿ",
  غ: "gh",
  ف: "f",
  ق: "q",
  ك: "k",
  ل: "l",
  م: "m",
  ن: "n",
  ه: "h",
  و: "w",
  ي: "y",
} as { [key: string]: string };

export const latinToArabicObj = {
  " ": " ",
  a: "ا",
  b: "ب",
  t: "ت",
  th: "ث",
  j: "ج",
  H: "ح",
  kh: "خ",
  d: "د",
  dh: "ذ",
  r: "ر",
  z: "ز",
  s: "س",
  sh: "ش",
  S: "ص",
  D: "ض",
  T: "ط",
  Z: "ظ",
  ʿ: "ع",
  gh: "غ",
  f: "ف",
  q: "ق",
  k: "ك",
  l: "ل",
  m: "م",
  n: "ن",
  h: "ه",
  w: "و",
  y: "ي",
} as { [key: string]: string };
