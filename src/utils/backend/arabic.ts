/**
 * Retrieves random Arabic letters from a given string.
 *
 * @param {string} str - The input string to extract random Arabic letters from.
 * @param {number} count - The number of random Arabic letters to retrieve.
 * @returns {string[]} An array of random Arabic letters from the string.
 */
export function getRandomArabicLettersFromString(
  str: string,
  count: number
): string[] {
  const arabicLettersRegex = /[\u0621-\u064A]/g; // Arabic Unicode range
  const letters = str.match(arabicLettersRegex);

  const randomLetters: string[] = [];
  if (letters === null || count >= letters.length) {
    return [];
  }

  while (randomLetters.length < count) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    const randomLetter = letters[randomIndex] as string;

    if (!randomLetters.includes(randomLetter)) {
      randomLetters.push(randomLetter);
    }
  }

  return randomLetters;
}

/**
 * Generates quiz options for a writing system quiz.
 *
 * @param {string} transliteration - The transliteration string for the quiz question.
 * @param {Set<string>} similarStrings - A set of similar strings to the original transliteration.
 * @returns {Object} An object containing quiz options and the correct answer.
 * @property {string} a - Option A.
 * @property {string} b - Option B.
 * @property {string} c - Option C.
 * @property {string} d - Option D.
 * @property {string} rightAnsw - The key (a, b, c, d) representing the correct answer.
 */
export function generateWSQuizOptions(
  transliteration: string,
  similarStrings: Set<string>
): {
  a: string;
  b: string;
  c: string;
  d: string;
  rightAnswer: "a" | "b" | "c" | "d";
} {
  const options = [...similarStrings, transliteration];
  const shuffledOptions = shuffleArray(options);
  const rightAnswerIndex = shuffledOptions.indexOf(transliteration);
  const rightAnswerKey = String.fromCharCode(97 + rightAnswerIndex) as
    | "a"
    | "b"
    | "c"
    | "d"; // Convert index to letter 'a', 'b', 'c', etc.

  return {
    a: shuffledOptions[0],
    b: shuffledOptions[1],
    c: shuffledOptions[2],
    d: shuffledOptions[3],
    rightAnswer: rightAnswerKey,
  };
}

// Helper function to shuffle an array using Fisher-Yates algorithm
function shuffleArray(array: any[]): any[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

