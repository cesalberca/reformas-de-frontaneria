import { View } from './view'
import { GetWordGuessesUseCase } from '../application/get-word-guesses-use-case'
import { GetRandomWordToGuessUseCase } from '../application/get-random-word-to-guess-use-case'
import { Guess } from '../domain/guess'

export class Controller {
  private static MAXIMUM_NUMBER_OF_TRIES = 6

  private wordToGuess = ''
  private tries: Guess[][] = []
  private triedWords: string[] = []

  constructor(
    private readonly view: View,
    private readonly getWordGuessesUseCase: GetWordGuessesUseCase,
    private readonly getRandomWordToGuessUseCase: GetRandomWordToGuessUseCase,
  ) {}

  async start(): Promise<void> {
    const seed = Math.random()
    this.wordToGuess = await this.getRandomWordToGuessUseCase.execute(seed)
    this.generateEmptyGuesses()
    this.view.start(Controller.MAXIMUM_NUMBER_OF_TRIES, this.wordToGuess, this.tries, this.triedWords)
    this.view.addEventListeners(this.wordHandler.bind(this))
  }

  async wordHandler(wordToTry: string): Promise<void> {
    const result = await this.getWordGuessesUseCase.execute(wordToTry, this.wordToGuess)
    this.tries[this.triedWords.length] = result
    this.triedWords.push(wordToTry)

    this.updateView()

    if (this.isWordGuessed(result)) {
      this.view.showWonMessage()
      this.resetGame()
      return
    }

    const isLastTry = this.triedWords.length === Controller.MAXIMUM_NUMBER_OF_TRIES

    if (isLastTry) {
      this.view.showLostMessage(this.wordToGuess)
      this.resetGame()
    }
  }

  private resetGame() {
    this.tries = []
    this.triedWords = []
    this.start()
  }

  private updateView() {
    this.view.printBoard(this.tries, this.triedWords)
    this.view.clearInput()
  }

  private generateEmptyGuesses() {
    for (let i = 0; i < Controller.MAXIMUM_NUMBER_OF_TRIES; i++) {
      const values: Guess[] = []
      for (let j = 0; j < this.wordToGuess.length; j++) {
        values.push(Guess.EMPTY)
      }
      this.tries.push(values)
    }
  }

  private isWordGuessed(word: Guess[]) {
    return word.every(x => x === Guess.PRESENT_AND_IN_CORRECT_POSITION)
  }
}
