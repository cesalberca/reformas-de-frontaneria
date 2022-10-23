import { Guess } from '../domain/guess'

export class View {
  private readonly boardElement = this.global.document.querySelector<HTMLDivElement>('#board')!
  private readonly form = this.global.document.querySelector<HTMLFormElement>('#form')!
  private readonly element = this.global.document.querySelector<HTMLInputElement>('#input')!

  private boardLength: number
  private maxRows = 6

  constructor(private readonly global: typeof globalThis) {}

  start(maxRows: number, wordToGuess: string, tries: Guess[][], triedWords: string[]) {
    this.maxRows = maxRows
    this.boardLength = wordToGuess.length
    this.printBoard(tries, triedWords)
    this.setInputValidation(wordToGuess)
  }

  printBoard(tries: Guess[][], triedWords: string[]) {
    this.clearBoard()
    for (let i = 0; i < this.maxRows; i++) {
      this.printRow(tries[i], triedWords[i])
    }
  }

  addEventListeners(onGuessWord: Function) {
    this.form.addEventListener('submit', async (event: Event) => {
      event.preventDefault()

      if (!this.element.value) {
        return
      }

      await onGuessWord(this.element.value)
    })
  }

  showWonMessage() {
    alert('You won! Try again!')
  }

  showLostMessage(wordToGuess: string) {
    alert(`You lost! The word to guess was ${wordToGuess}. Try again!`)
  }

  clearInput() {
    this.element.value = ''
  }

  private setInputValidation(wordToGuess: string) {
    this.element.setAttribute('maxlength', wordToGuess.length.toString())
    this.element.setAttribute('minlength', wordToGuess.length.toString())
  }

  private clearBoard() {
    this.boardElement.innerHTML = ''
  }

  private printRow(guesses: Guess[], triedWord?: string) {
    const word = this.global.document.createElement('div')
    word.classList.add('row')

    for (let i = 0; i < this.boardLength; i++) {
      this.printLetterCell(word, guesses[i], triedWord?.[i])
      this.boardElement.appendChild(word)
    }
  }

  private printLetterCell(element: HTMLDivElement, guess: Guess, triedLetter?: string) {
    const div = this.global.document.createElement('div')
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
