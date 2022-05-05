export function validate(wordToTry: string, wordToGuess: string) {
  let result = []

  if (wordToTry === wordToGuess) {
    return Array.from({ length: wordToGuess.length }).fill(1)
  }

  /**
   *  1 → Guessed letter and position correctly
   *  0 → Guessed letter correctly
   * -1 → Miss
   */
  for (let i = 0; i < wordToTry.length; i++) {
    if (wordToTry[i] === wordToGuess[i]) {
      result.push(1)
    } else if (wordToGuess.includes(wordToTry[i])) {
      result.push(0)
    } else {
      result.push(-1)
    }
  }

  return result
}

export {}
