import { Guess } from './guess'

export class View {
  private boardElement = document.querySelector<HTMLDivElement>('#board')!
  private form = document.querySelector<HTMLFormElement>('#form')!
  private element = document.querySelector<HTMLInputElement>('#input')!

  private boardLength: number
  private maxRows = 6

  init(maxRows: number, rowLength: number, tries: Guess[][], triedWords: string[]) {
    this.maxRows = maxRows
    this.boardLength = rowLength
    this.printBoard(tries, triedWords)
  }

  printBoard(tries: Guess[][], triedWords: string[]) {
    this.clearBoard()
    for (let i = 0; i < this.maxRows; i++) {
      this.printRow(tries[i], triedWords[i])
    }
  }

  addEventListeners(onGuessWord: Function) {
    this.form.addEventListener('submit', async (e: Event) => {
      e.preventDefault()

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

  private clearBoard() {
    this.boardElement.innerHTML = ''
  }

  private printRow(guesses: Guess[], triedWord?: string) {
    const wordDiv = document.createElement('div')
    wordDiv.setAttribute('class', 'row')

    for (let i = 0; i < this.boardLength; i++) {
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
