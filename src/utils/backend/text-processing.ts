/**
 * Retrieves a set of random words from a given string.
 *
 * @param {string} str - The input string to extract random words from.
 * @param {number} count - The number of random words to retrieve.
 * @returns {Set<string>} A set of random words from the string.
 */
export function getRandomWordsFromString(
  str: string,
  count: number
): Set<string> {
  const words = str.split(" ").filter((word) => word.length > 1);
  const uniqueWords = new Set<string>();

  if (count >= words.length) {
    return new Set(words);
  }

  while (uniqueWords.size < count) {
    const randomIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomIndex] as string;
    if (randomWord.length > 1) {
      uniqueWords.add(randomWord);
    }
  }

  return uniqueWords;
}

/**
 * Generates a set of similar strings to the original string by modifying random letters (at least 1 letter and at most 25% of the word).
 *
 * @param {string} originalString - The original string to generate similar strings from.
 * @param {number} numStrings - The number of similar strings to generate.
 * @returns {Set<string>} A set of similar strings to the original string.
 */
export function generateSimilarStrings(
  originalString: string,
  numStrings: number
): Set<string> {
  const latinAlphabet = "abcdefghijklmnopqrstuvwxyz";
  const stringLength = originalString.length;
  const modifiedStrings = new Set<string>(); // Using a Set to store unique modified strings

  while (modifiedStrings.size < numStrings) {
    let modifiedString = "";
    let changeCount = 1;
    const maxChanges = Math.ceil(stringLength * 0.25);

    for (let j = 0; j < stringLength; j++) {
      const originalLetter = originalString[j];
      let modifiedLetter: string;

      if (changeCount <= maxChanges && Math.random() < 0.25) {
        modifiedLetter = latinAlphabet[
          Math.floor(Math.random() * latinAlphabet.length)
        ] as string;
        changeCount++;
      } else {
        modifiedLetter = originalLetter as string;
      }

      modifiedString += modifiedLetter;
    }
    if (modifiedString !== originalString) {
      modifiedStrings.add(modifiedString);
    }
  }

  return modifiedStrings; // Converting Set back to an array
}
