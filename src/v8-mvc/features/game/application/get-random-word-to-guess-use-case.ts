import { WordsHttpRepository } from '../infrastructure/words-http-repository'

export class GetRandomWordToGuessUseCase {
  constructor(private readonly wordsRepository: WordsHttpRepository) {}

  async execute(seed: number) {
    const words = await this.wordsRepository.findAll()
    const wordToGuess = words[Math.floor(seed * words.length)]
    return wordToGuess
  }
}
