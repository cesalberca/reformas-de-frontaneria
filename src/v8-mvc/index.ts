import { GetWordGuessesUseCase } from './features/game/application/get-word-guesses-use-case'
import { WordValidator } from './features/game/domain/word-validator'
import { View } from './features/game/delivery/view'
import { Controller } from './features/game/delivery/controller'
import { GetRandomWordToGuessUseCase } from './features/game/application/get-random-word-to-guess-use-case'
import { WordsHttpRepository } from './features/game/infrastructure/words-http-repository'

const wordsRepository = new WordsHttpRepository(window.fetch.bind(this))
const wordValidator = new WordValidator()
const getWordGuessesUseCase = new GetWordGuessesUseCase(wordValidator)
const getRandomWordToGuessUseCase = new GetRandomWordToGuessUseCase(wordsRepository)

const view = new View()
const controller = new Controller(view, getWordGuessesUseCase, getRandomWordToGuessUseCase)
controller.start()

export {}
