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
  let loopEnd =
    string1.length < string2.length ? string2.length : string1.length;
  for (let i = 0; i < loopEnd; i++) {
    if (string1[i] !== string2[i]) {
      differentLetters.add(string1[i] as string);
    }
  }
  return differentLetters;
}
