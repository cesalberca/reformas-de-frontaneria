import { WordsRepository } from './words-repository'
import { GetWordGuessesUseCase } from './get-word-guesses-use-case'

const wordsRepository = new WordsRepository(window)
const getWordGuessesUseCase = new GetWordGuessesUseCase(wordsRepository, () => Math.random())

const form = document.querySelector<HTMLFormElement>('#form')
const element = document.querySelector<HTMLInputElement>('#input')

form.addEventListener('submit', async e => {
  e.preventDefault()
  const result = await getWordGuessesUseCase.execute(element.value)
  console.log({ result })
})

export {}
