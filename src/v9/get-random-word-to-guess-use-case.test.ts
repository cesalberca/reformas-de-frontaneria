import { GetRandomWordToGuessUseCase } from './get-random-word-to-guess-use-case'
import { instance, mock } from 'ts-mockito'
import { WordsRepository } from './words-repository'

describe('GetRandomWordToGuessUseCase', () => {
  it('should get random word to guess', () => {
    const wordsRepository = mock(WordsRepository)
    const getRandomWordToGuessUseCase = new GetRandomWordToGuessUseCase(instance(wordsRepository), () => 0.5)

    getRandomWordToGuessUseCase.execute(seed)
  })
})
