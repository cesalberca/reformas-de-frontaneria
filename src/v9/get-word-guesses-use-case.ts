import { WordsRepository } from './words-repository'
import { validate } from './validate'
import { Guess } from './guess'

export class GetWordGuessesUseCase {
  constructor(private readonly wordsRepository: WordsRepository, private readonly randomGenerator: () => number) {}

  async execute(wordToTry: string): Promise<Guess[]> {
    const words = await this.wordsRepository.findAll()
    const wordToGuess = words[Math.floor(this.randomGenerator() * words.length)]
    console.log({ wordToGuess })
    const guesses = validate(wordToTry, wordToGuess)
    return guesses
  }
}
