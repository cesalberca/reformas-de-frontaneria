enum Guess {
  NOT_PRESENT = -1,
  PRESENT_BUT_NOT_IN_CORRECT_POSITION = 0,
  PRESENT_AND_IN_CORRECT_POSITION = 1,
}

export function validate(wordToTry: string, wordToGuess: string): Guess[] {
  return wordToTry.split('').map((letterToTry, indexLetterToGuess) => {
    const letterToGuess = wordToGuess[indexLetterToGuess]
    if (letterToTry === letterToGuess) {
      return Guess.PRESENT_AND_IN_CORRECT_POSITION
    }

    if (wordToGuess.includes(letterToTry)) {
      return Guess.PRESENT_BUT_NOT_IN_CORRECT_POSITION
    }

    return Guess.NOT_PRESENT
  })
}

export {}
