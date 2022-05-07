import { validate } from './validate'

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

const validateWord = (e: Event) => {
  const element = document.querySelector<HTMLInputElement>('#input')!

  e.preventDefault()
  const result = validate(element.value, wordToGuess)
  console.log({ result })
}

export {}
