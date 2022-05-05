export function validate(wordToTry: string, wordToGuess: string) {
  if (wordToTry === wordToGuess) {
    return Array.from({ length: wordToGuess.length }).fill(1)
  }

  /**
   *  1 → Guessed letter and position correctly
   *  0 → Guessed letter correctly
   * -1 → Miss
   */
  return wordToTry.split('').map((letterToTry, indexLetterToGuess) => {
    const letterToGuess = wordToGuess[indexLetterToGuess]
    if (letterToTry === letterToGuess) {
      return 1
    }

    if (wordToGuess.indexOf(letterToTry) !== -1) {
      return 0
    }

    return -1
  })
}

export {}
