import { WordsRepository } from './words-repository'

export class GetRandomWordToGuessUseCase {
  constructor(private readonly wordsRepository: WordsRepository, private readonly randomGenerator: () => number) {}
  async execute() {
    const words = await this.wordsRepository.findAll()
    const wordToGuess = words[Math.floor(this.randomGenerator() * words.length)]
    return wordToGuess
  }
}
