import { Guess } from './guess'

export class WordValidator {
  validate(wordToTry: string, wordToGuess: string): Guess[] {
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
}
