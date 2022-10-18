/**
 * Make code immutable
 */

export function validate(wordToTry: string, wordToGuess: string) {
  if (wordToTry === wordToGuess) {
    return Array.from({ length: wordToGuess.length }).fill(1)
  }

  return wordToTry.split('').map((letterToTry, indexLetterToGuess) => {
    const letterToGuess = wordToGuess[indexLetterToGuess]
    if (letterToTry === letterToGuess) {
      return 1
    }

    if (wordToGuess.includes(letterToTry)) {
      return 0
    }

    return -1
  })
}

export {}
