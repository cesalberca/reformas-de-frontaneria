import { View } from './view'
import { GetWordGuessesUseCase } from './get-word-guesses-use-case'
import { GetRandomWordToGuessUseCase } from './get-random-word-to-guess-use-case'

export class Controller {
  private wordToGuess = ''

  constructor(
    private readonly view: View,
    private readonly getWordGuessesUseCase: GetWordGuessesUseCase,
    private readonly getRandomWordToGuessUseCase: GetRandomWordToGuessUseCase,
  ) {}

  init = async () => {
    const seed = Math.random()
    this.wordToGuess = await this.getRandomWordToGuessUseCase.execute(seed)
    console.log(this.wordToGuess)
    this.view.init(this.wordToGuess)
    this.view.addEventListeners(this.wordHandler, this.init)
  }

  wordHandler = async (wordToTry: string) => {
    const guesses = await this.getWordGuessesUseCase.execute(wordToTry, this.wordToGuess)
    return guesses
  }
}
