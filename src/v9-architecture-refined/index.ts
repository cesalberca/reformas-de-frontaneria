import { GetWordGuessesUseCase } from './application/get-word-guesses-use-case'
import { WordValidator } from './domain/word-validator'
import { View } from './delivery/view'
import { Controller } from './delivery/controller'
import { GetRandomWordToGuessUseCase } from './application/get-random-word-to-guess-use-case'
import { WordsRepository } from './domain/words-repository'

const wordsRepository = new WordsRepository(window)
const wordValidator = new WordValidator()
const getWordGuessesUseCase = new GetWordGuessesUseCase(wordValidator)
const getRandomWordToGuessUseCase = new GetRandomWordToGuessUseCase(wordsRepository)

const view = new View()
const controller = new Controller(view, getWordGuessesUseCase, getRandomWordToGuessUseCase)
controller.init()

export {}
