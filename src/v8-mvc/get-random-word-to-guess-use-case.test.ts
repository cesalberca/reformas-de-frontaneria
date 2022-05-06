import { GetRandomWordToGuessUseCase } from './get-random-word-to-guess-use-case'
import { instance, mock, when } from 'ts-mockito'
import { WordsRepository } from './words-repository'

describe('GetRandomWordToGuessUseCase', () => {
  it('should get random word to guess', async () => {
    const wordsRepository = mock(WordsRepository)
    const getRandomWordToGuessUseCase = new GetRandomWordToGuessUseCase(instance(wordsRepository))
    when(wordsRepository.findAll()).thenResolve(['foo', 'bar'])

    const actual = await getRandomWordToGuessUseCase.execute(0.5)

    expect(actual).toBe('bar')
  })
})
