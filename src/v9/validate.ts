import { Guess } from './guess'

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
