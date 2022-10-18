/**
 * Extracted into multiple functions (Maybe too DRY?)
 * Removed commented code
 *
 * Tip: Order functions by order of being called
 */

let wordToGuess = ''

fetch(
  'https://gist.githubusercontent.com/cesalberca/3d0e343842c7697e0f788178e59fb471/raw/22bfe35c910dd02db78fec87fa39ca25cc604816/data.json',
)
  .then(x => x.json())
  .then(availableWords => {
    wordToGuess = getRandomWord(availableWords)
    console.log({ wordToGuess })

    addFormListeners()
  })

function getRandomWord(availableWords: string[]) {
  return availableWords[Math.floor(Math.random() * availableWords.length)]
}

function addFormListeners() {
  const form = document.querySelector<HTMLFormElement>('#form')!

  form.addEventListener('submit', validateWord)
}

const validateWord = (event: Event) => {
  const element = document.querySelector<HTMLInputElement>('#input')!

  event.preventDefault()
  const result = validate(element.value, wordToGuess)
  console.log({ result })
}

export function validate(wordToTry: string, wordToGuess: string) {
  return isWordGuessed(wordToTry, wordToGuess)
    ? getCorrectWordResult(wordToGuess)
    : getIndividualLettersResult(wordToTry, wordToGuess)
}

function isWordGuessed(wordToTry: string, wordToGuess: string) {
  return wordToTry === wordToGuess
}

function getCorrectWordResult(wordToGuess: string) {
  let result = []
  for (let i = 0; i < wordToGuess.length; i++) {
    result.push(1)
  }
  return result
}

function getIndividualLettersResult(wordToTry: string, wordToGuess: string) {
  let result = []
  /**
   *  1 → Guessed letter and position correctly
   *  0 → Guessed letter correctly
   * -1 → Miss
   */
  for (let i = 0; i < wordToTry.length; i++) {
    if (lettersAreEqual(wordToTry[i], wordToGuess[i])) {
      result.push(1)
    } else if (wordIncludesLetter(wordToGuess, wordToTry[i])) {
      result.push(0)
    } else {
      result.push(-1)
    }
  }

  return result
}

function lettersAreEqual(firstLetter: string, secondLetter: string) {
  return firstLetter === secondLetter
}

function wordIncludesLetter(wordToGuess: string, letter: string) {
  return wordToGuess.indexOf(letter) !== -1
}

export {}
