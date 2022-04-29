import { data } from './data'

const validWords = data
const wordToGuess = validWords[Math.floor(Math.random() * validWords.length)]
console.log({ wordToGuess })
const letters = wordToGuess.length

const form = document.querySelector<HTMLFormElement>('#form')
const element = document.querySelector<HTMLInputElement>('#input')

form.addEventListener('submit', e => {
  e.preventDefault()
  let result = []

  if (element.value === wordToGuess) {
    result = Array.from(
      {
        length: letters,
      },
      () => 'guess-correctly-position-and-letter',
    )
  }

  element.value.split('').forEach((letter, j) => {
    if (letter === wordToGuess[j]) {
      result.push('guess-correctly-position-and-letter')
    } else if (wordToGuess.includes(letter)) {
      result.push('guess-correctly-letter')
    } else {
      result.push('miss')
    }
  })

  console.log({ result })
})

export {}
