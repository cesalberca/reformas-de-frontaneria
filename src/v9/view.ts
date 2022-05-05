import { GetRandomWordToGuessUseCase } from './get-random-word-to-guess-use-case'
import { GetWordGuessesUseCase } from './get-word-guesses-use-case'
import { Guess } from './guess'

export class View {
  boardElement = document.querySelector<HTMLDivElement>('#board')
  form = document.querySelector<HTMLFormElement>('#form')
  element = document.querySelector<HTMLInputElement>('#input')
  wordToGuess: string
  tries: Guess[][] = []
  triedWords: string[] = []

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
    this.triedWords.push(this.element.value)

    this.clearInput()
    console.log({ result })
  }

  printWord() {}

  clearInput() {
    this.element.value = ''
  }

  printBoard() {
    for (let i = 0; i < 6; i++) {
      this.printRow(this.tries[i], this.triedWords[i])
    }
  }

  printRow(guesses: Guess[], triedWord: string) {
    const wordDiv = document.createElement('div')
    wordDiv.setAttribute('class', 'row')

    for (let i = 0; i < this.wordToGuess.length; i++) {
      this.printLetterCell(wordDiv, guesses[i], triedWord[i])
      this.boardElement.appendChild(wordDiv)
    }
  }

  printLetterCell(element: HTMLDivElement, guess: Guess, triedLetter: string) {
    const div = document.createElement('div')
    div.setAttribute('class', 'cell')
    div.innerHTML = triedLetter

    let className: string
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
    }

    div.setAttribute('class', className)

    element.appendChild(div)
  }
}
