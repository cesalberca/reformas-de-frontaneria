import { WordsRepository } from './words-repository'
import { validate } from './validate.v9'

new WordsRepository(window).findAll().then(data => {
  const wordToGuess = data[Math.floor(Math.random() * data.length)]
  const form = document.querySelector<HTMLFormElement>('#form')
  const element = document.querySelector<HTMLInputElement>('#input')

  form.addEventListener('submit', e => {
    e.preventDefault()
    const result = validate(element.value, wordToGuess)
    console.log({ result })
  })
})

export {}
