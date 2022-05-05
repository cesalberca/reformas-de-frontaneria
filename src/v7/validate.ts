enum Guess {
  NOT_PRESENT = -1,
  PRESENT_BUT_NOT_IN_CORRECT_POSITION = 0,
  PRESENT_AND_IN_CORRECT_POSITION = 1,
}

export function validate(wordToTry: string, wordToGuess: string): Guess[] {
  return wordToTry.split('').map((letterToTry, indexLetterToGuess) => {
    const status = wordToGuess.indexOf(letterToTry)
    if (status === -1) {
      return Guess.NOT_PRESENT
    }

    if (status !== indexLetterToGuess) {
      return Guess.PRESENT_BUT_NOT_IN_CORRECT_POSITION
    }

    return Guess.PRESENT_AND_IN_CORRECT_POSITION
  })
}

export {}
