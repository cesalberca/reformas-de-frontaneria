import { WordsRepository } from './words-repository'
import { validate } from './validate'

/**
 * Add repository to handle data fetching
 */

new WordsRepository(window.fetch.bind(this)).findAll().then(data => {
  const wordToGuess = data[Math.floor(Math.random() * data.length)]
  const form = document.querySelector<HTMLFormElement>('#form')!
  const element = document.querySelector<HTMLInputElement>('#input')!

  form.addEventListener('submit', event => {
    event.preventDefault()
    const result = validate(element.value, wordToGuess)
    console.log({ result })
  })
})

export {}
