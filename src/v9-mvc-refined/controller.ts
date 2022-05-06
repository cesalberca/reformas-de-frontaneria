import { View } from './view'
import { GetWordGuessesUseCase } from './get-word-guesses-use-case'
import { GetRandomWordToGuessUseCase } from './get-random-word-to-guess-use-case'
import { Guess } from './guess'

export class Controller {
  private wordToGuess = ''
  private tries: Guess[][] = []
  private triedWords: string[] = []
  private maximumNumberOfTries = 6

  constructor(
    private readonly view: View,
    private readonly getWordGuessesUseCase: GetWordGuessesUseCase,
    private readonly getRandomWordToGuessUseCase: GetRandomWordToGuessUseCase,
  ) {}

  init = async () => {
    const seed = Math.random()
    this.wordToGuess = await this.getRandomWordToGuessUseCase.execute(seed)
    this.generateEmptyGuesses()
    console.log(this.wordToGuess)
    this.view.init(this.wordToGuess.length, this.tries, this.triedWords)
    this.view.addEventListeners(this.wordHandler)
  }

  wordHandler = async (wordToTry: string) => {
    const result = await this.getWordGuessesUseCase.execute(wordToTry, this.wordToGuess)
    this.tries[this.triedWords.length] = result
    this.triedWords.push(wordToTry)

    this.updateView()

    if (this.isWordGuessed(result)) {
      this.view.showWonMessage()
      this.resetGame()
      return
    }

    const isLastTry = this.triedWords.length === this.maximumNumberOfTries

    if (isLastTry) {
      this.view.showLostMessage(this.wordToGuess)
      this.resetGame()
    }

    return result
  }

  private resetGame() {
    this.tries = []
    this.triedWords = []
    this.init()
  }

  private updateView() {
    this.view.printBoard(this.tries, this.triedWords)
    this.view.clearInput()
  }

  private generateEmptyGuesses() {
    for (let i = 0; i < this.maximumNumberOfTries; i++) {
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
