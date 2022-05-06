import { Guess } from './guess'

export class View {
  private boardElement = document.querySelector<HTMLDivElement>('#board')!
  private form = document.querySelector<HTMLFormElement>('#form')!
  private element = document.querySelector<HTMLInputElement>('#input')!
  private wordToGuess = ''
  private tries: Guess[][] = []
  private triedWords: string[] = []
  private maximumNumberOfTries = 6

  init(wordToGuess: string) {
    this.tries = []
    this.triedWords = []
    this.wordToGuess = wordToGuess
    this.generateEmptyGuesses()
    this.printBoard()
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

  addEventListeners(onGuessWord: (value: string) => Promise<Guess[]>, onFinished: () => void) {
    this.form.addEventListener('submit', async (e: Event) => {
      e.preventDefault()
      const result = await onGuessWord(this.element.value)
      this.tries[this.triedWords.length] = result
      this.triedWords.push(this.element.value)

      this.clearInput()

      this.printBoard()

      if (result.every(x => x === Guess.PRESENT_AND_IN_CORRECT_POSITION)) {
        alert('You won! Try again!')
        onFinished()
        return
      }

      const isLastTry = this.triedWords.length === this.maximumNumberOfTries

      if (isLastTry) {
        alert(`You lost! The word to guess was ${this.wordToGuess}. Try again!`)
        onFinished()
      }
    })
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
