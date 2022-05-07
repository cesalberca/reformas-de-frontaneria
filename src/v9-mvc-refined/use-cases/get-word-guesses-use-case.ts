import { WordValidator } from '../word-validator'
import { Guess } from '../guess'

export class GetWordGuessesUseCase {
  constructor(private readonly wordValidator: WordValidator) {}

  async execute(wordToTry: string, wordToGuess: string): Promise<Guess[]> {
    return this.wordValidator.validate(wordToTry, wordToGuess)
  }
}
