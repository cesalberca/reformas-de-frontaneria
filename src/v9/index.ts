import { GetWordGuessesUseCase } from './get-word-guesses-use-case'
import { WordValidator } from './word-validator'
import { View } from './view'
import { Controller } from './controller'
import { GetRandomWordToGuessUseCase } from './get-random-word-to-guess-use-case'
import { WordsRepository } from './words-repository'

const wordsRepository = new WordsRepository(window)
const wordValidator = new WordValidator()
const getWordGuessesUseCase = new GetWordGuessesUseCase(wordValidator)
const getRandomWordToGuessUseCase = new GetRandomWordToGuessUseCase(wordsRepository)

const view = new View()
const controller = new Controller(view, getWordGuessesUseCase, getRandomWordToGuessUseCase)
controller.init()

export {}
