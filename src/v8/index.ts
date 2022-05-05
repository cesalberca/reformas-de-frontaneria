import { WordsRepository } from './words-repository'
import { GetWordGuessesUseCase } from './get-word-guesses-use-case'
import { GetRandomWordToGuessUseCase } from './get-random-word-to-guess-use-case'
import { WordValidator } from './word-validator'
import { View } from './view'

const wordsRepository = new WordsRepository(window)
const wordValidator = new WordValidator()
const seed = Math.random()
const getWordGuessesUseCase = new GetWordGuessesUseCase(wordValidator)
const getRandomWordToGuessUseCase = new GetRandomWordToGuessUseCase(wordsRepository, () => seed)

const view = new View(getRandomWordToGuessUseCase, getWordGuessesUseCase)
view.init()

export {}
