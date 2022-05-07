import { WordsRepository } from '../words-repository'

export class GetRandomWordToGuessUseCase {
  constructor(private readonly wordsRepository: WordsRepository) {}

  async execute(seed: number) {
    const words = await this.wordsRepository.findAll()
    const wordToGuess = words[Math.floor(seed * words.length)]
    return wordToGuess
  }
}
