import { GetWordGuessesUseCase } from './get-word-guesses-use-case'
import { instance, mock, when } from 'ts-mockito'
import { WordValidator } from '../domain/word-validator'
import { Guess } from '../domain/guess'

describe('GetWordGuessesUseCase', () => {
  it('should get word guesses', async () => {
    const wordValidator = mock(WordValidator)
    const getWordGuessesUseCase = new GetWordGuessesUseCase(instance(wordValidator))
    when(wordValidator.validate('foo', 'bar')).thenReturn([Guess.NOT_PRESENT])

    const actual = await getWordGuessesUseCase.execute('foo', 'bar')

    expect(actual).toEqual<Guess[]>([Guess.NOT_PRESENT])
  })
})
