import { validate } from './validate'
import { Guess } from './guess'

export class GetWordGuessesUseCase {
  constructor() {}

  async execute(wordToTry: string, wordToGuess: string): Promise<Guess[]> {
    const guesses = validate(wordToTry, wordToGuess)
    return guesses
  }
}
