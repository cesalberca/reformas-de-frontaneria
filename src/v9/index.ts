import { WordsRepository } from './words-repository'
import { GetWordGuessesUseCase } from './get-word-guesses-use-case'
import { GetRandomWordToGuessUseCase } from './get-random-word-to-guess-use-case'
import { WordValidator } from './validate'

const seed = Math.random()
const wordsRepository = new WordsRepository(window)
const wordValidator = new WordValidator()
const getWordGuessesUseCase = new GetWordGuessesUseCase(wordValidator)
const getRandomWordToGuessUseCase = new GetRandomWordToGuessUseCase(wordsRepository, () => seed)

const form = document.querySelector<HTMLFormElement>('#form')
const element = document.querySelector<HTMLInputElement>('#input')

form.addEventListener('submit', async e => {
  const wordToGuess = await getRandomWordToGuessUseCase.execute()
  e.preventDefault()
  const result = await getWordGuessesUseCase.execute(element.value, wordToGuess)
  console.log({ result })
})

export {}
