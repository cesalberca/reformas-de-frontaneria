import { data } from './data'

const validWords = data
const wordToGuess = validWords[Math.floor(Math.random() * validWords.length)]
console.log({ wordToGuess })
const form = document.querySelector<HTMLFormElement>('#form')
const element = document.querySelector<HTMLInputElement>('#input')

form.addEventListener('submit', e => {
  e.preventDefault()
  let result = []

  if (element.value === wordToGuess) {
    const x = []
    for (let i = 0; i < wordToGuess.length; i++) {
      x.push(1)
    }
    result = x
  }

  for (let i = 0; i < element.value.length; i++) {
    if (element.value[i] === wordToGuess[i]) {
      result.push(1)
    } else if (wordToGuess.includes(element.value[i])) {
      result.push(0)
    } else {
      result.push(-1)
    }
  }

  console.log({ result })
})

export {}
