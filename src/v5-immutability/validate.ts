export function validate(wordToTry: string, wordToGuess: string) {
  if (isWordGuessed(wordToTry, wordToGuess)) {
    return setCorrectWordResult(wordToGuess)
  }

  return setIndividualLetterResult(wordToTry, wordToGuess)
}

function isWordGuessed(wordToTry: string, wordToGuess: string) {
  return wordToTry === wordToGuess
}

function setCorrectWordResult(wordToGuess: string) {
  return Array.from({ length: wordToGuess.length }).fill(1)
}

function setIndividualLetterResult(wordToTry: string, wordToGuess: string) {
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

    if (wordToGuess.includes(letterToTry)) {
      return 0
    }

    return -1
  })
}

export {}
