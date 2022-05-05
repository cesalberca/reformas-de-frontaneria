import { GetRandomWordToGuessUseCase } from './get-random-word-to-guess-use-case'
import { GetWordGuessesUseCase } from './get-word-guesses-use-case'
import { Guess } from './guess'

type Empty = -2

export class View {
  boardElement = document.querySelector<HTMLDivElement>('#board')!
  form = document.querySelector<HTMLFormElement>('#form')!
  element = document.querySelector<HTMLInputElement>('#input')!
  wordToGuess: string = ''
  tries: (Guess | Empty)[][] = []

  constructor(
    private readonly getRandomWordToGuessUseCase: GetRandomWordToGuessUseCase,
    private readonly getWordGuessesUseCase: GetWordGuessesUseCase,
  ) {}

  async init() {
    this.wordToGuess = await this.getRandomWordToGuessUseCase.execute()
    this.printBoard()
    this.addEventListeners()
  }

  addEventListeners() {
    this.form.addEventListener('submit', this.checkWord)
  }

  checkWord = async (e: Event) => {
    e.preventDefault()
    const result = await this.getWordGuessesUseCase.execute(this.element.value, this.wordToGuess)
    this.tries.push(result)
    console.log({ result })
  }

  printWord() {}

  printBoard() {
    for (let i = 0; i < 6; i++) {
      this.printRow()
    }
  }

  printRow() {
    const wordDiv = document.createElement('div')
    wordDiv.setAttribute('class', 'row')

    for (let i = 0; i < this.wordToGuess.length; i++) {
      this.printLetterCell(wordDiv)
      this.boardElement.appendChild(wordDiv)
    }
  }

  printLetterCell(element: HTMLDivElement) {
    const div = document.createElement('div')
    div.setAttribute('class', 'cell')
    element.appendChild(div)
  }
}
