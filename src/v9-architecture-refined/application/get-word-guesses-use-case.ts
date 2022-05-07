import { WordValidator } from '../domain/word-validator'
import { Guess } from '../domain/guess'

export class GetWordGuessesUseCase {
  constructor(private readonly wordValidator: WordValidator) {}

  async execute(wordToTry: string, wordToGuess: string): Promise<Guess[]> {
    return this.wordValidator.validate(wordToTry, wordToGuess)
  }
}
