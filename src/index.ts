import { data } from './data'

const validWords = data

type Values = 'guess-correctly-position-and-letter' | 'miss' | 'guess-correctly-letter'

const wordToGuess = validWords[Math.floor(Math.random() * validWords.length)]

const letters = wordToGuess.length

function check(word: string): Values[] {
  if (word === wordToGuess) {
    return Array.from(
      {
        length: letters,
      },
      () => 'guess-correctly-position-and-letter',
    )
  }

  const result: Values[] = []
  word.split('').forEach((letter, j) => {
    if (letter === wordToGuess[j]) {
      result.push('guess-correctly-position-and-letter')
    } else if (wordToGuess.includes(letter)) {
      result.push('guess-correctly-letter')
    } else {
      result.push('miss')
    }
  })

  return result
}

const form = document.querySelector<HTMLFormElement>('#form')
const element = document.querySelector<HTMLInputElement>('#input')

form.addEventListener('submit', e => {
  e.preventDefault()
  const result = check(element.value)
  console.log({ result })
})

export {}
