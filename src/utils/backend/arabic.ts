const arabicToIJMESMap = {
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

export const transliterateArabic = (text: string) => {
  const arabicChars = text.split("");

  // Map each Arabic character to its I J M E S counterpart
  var transliteratedChars = arabicChars.map(function (char) {
    if (arabicToIJMESMap[char] === undefined)
      throw new Error(
        `this arabic character does not have a corresponding latin equivalent in the map , ${char}`
      );
    return arabicToIJMESMap[char] || char; // If no mapping exists, return the original character
  });

  // Join the array of characters back into a string
  return transliteratedChars.join("");
};
