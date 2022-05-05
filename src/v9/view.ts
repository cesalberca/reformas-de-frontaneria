import { GetRandomWordToGuessUseCase } from './get-random-word-to-guess-use-case'
import { GetWordGuessesUseCase } from './get-word-guesses-use-case'

export class View {
  boardElement = document.querySelector<HTMLDivElement>('#board')
  form = document.querySelector<HTMLFormElement>('#form')
  element = document.querySelector<HTMLInputElement>('#input')
  wordToGuess: string

  constructor(
    private readonly getRandomWordToGuessUseCase: GetRandomWordToGuessUseCase,
    private readonly getWordGuessesUseCase: GetWordGuessesUseCase,
  ) {}

  async init() {
    this.wordToGuess = await this.getRandomWordToGuessUseCase.execute()
    this.printBoard()
  }

  addEventListeners() {
    this.form.addEventListener('submit', async e => {
      e.preventDefault()
      const result = await this.getWordGuessesUseCase.execute(this.element.value, this.wordToGuess)
      console.log({ result })
    })
  }

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
