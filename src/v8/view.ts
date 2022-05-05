import { GetRandomWordToGuessUseCase } from './get-random-word-to-guess-use-case'
import { GetWordGuessesUseCase } from './get-word-guesses-use-case'
import { Guess } from './guess'

export class View {
  private boardElement = document.querySelector<HTMLDivElement>('#board')!
  private form = document.querySelector<HTMLFormElement>('#form')!
  private element = document.querySelector<HTMLInputElement>('#input')!
  private wordToGuess = ''
  private tries: Guess[][] = []
  private triedWords: string[] = []
  private maximumNumberOfTries = 6

  constructor(
    private readonly getRandomWordToGuessUseCase: GetRandomWordToGuessUseCase,
    private readonly getWordGuessesUseCase: GetWordGuessesUseCase,
  ) {}

  async init() {
    this.wordToGuess = await this.getRandomWordToGuessUseCase.execute()
    console.log(this.wordToGuess)
    this.generateEmptyGuesses()
    this.printBoard()
    this.addEventListeners()
  }

  private printBoard() {
    this.clearBoard()
    for (let i = 0; i < this.maximumNumberOfTries; i++) {
      this.printRow(this.tries[i], this.triedWords[i])
    }
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

  private addEventListeners() {
    this.form.addEventListener('submit', this.checkWord.bind(this))
  }

  private async checkWord(e: Event) {
    e.preventDefault()
    const result = await this.getWordGuessesUseCase.execute(this.element.value, this.wordToGuess)
    this.tries[this.triedWords.length] = result
    this.triedWords.push(this.element.value)

    this.clearInput()

    this.printBoard()

    if (result.every(x => x === Guess.PRESENT_AND_IN_CORRECT_POSITION)) {
      alert('You won! Try again!')
      this.init()
      return
    }

    const isLastTry = this.triedWords.length === this.maximumNumberOfTries

    if (isLastTry) {
      alert(`You lost! The word to guess was ${this.wordToGuess}. Try again!`)
      this.init()
    }
  }

  private clearBoard() {
    this.boardElement.innerHTML = ''
  }

  private clearInput() {
    this.element.value = ''
  }

  private printRow(guesses: Guess[], triedWord?: string) {
    const wordDiv = document.createElement('div')
    wordDiv.setAttribute('class', 'row')

    for (let i = 0; i < this.wordToGuess.length; i++) {
      this.printLetterCell(wordDiv, guesses[i], triedWord?.[i])
      this.boardElement.appendChild(wordDiv)
    }
  }

  private printLetterCell(element: HTMLDivElement, guess: Guess, triedLetter?: string) {
    const div = document.createElement('div')
    div.classList.add('cell')
    if (triedLetter !== undefined) {
      div.innerHTML = triedLetter
    }

    let className = ''
    switch (guess) {
      case Guess.NOT_PRESENT:
        className = 'not-present'
        break
      case Guess.PRESENT_AND_IN_CORRECT_POSITION:
        className = 'present-and-in-correct-position'
        break
      case Guess.PRESENT_BUT_NOT_IN_CORRECT_POSITION:
        className = 'present-but-not-in-correct-position'
        break
      case Guess.EMPTY:
        className = 'empty'
        break
    }

    div.classList.add(className)

    element.appendChild(div)
  }
}
