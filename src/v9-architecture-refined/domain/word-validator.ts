import { Guess } from './guess'

export class WordValidator {
  validate(wordToTry: string, wordToGuess: string): Guess[] {
    if (wordToTry === wordToGuess) {
      return Array.from<Guess>({ length: wordToGuess.length }).fill(Guess.PRESENT_AND_IN_CORRECT_POSITION)
    }

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
