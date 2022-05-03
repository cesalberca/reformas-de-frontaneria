import { WordsRepository } from './words-repository'
import { anything, instance, mock, when } from 'ts-mockito'

describe('WordsRepository', () => {
  it('should find all words', async () => {
    const response = mock<Response>()
    when(response.json()).thenResolve(['foo', 'bar', 'baz'])
    const global = mock<typeof globalThis>()
    when(global.fetch(anything())).thenResolve(instance(response))
    const wordsRepository = new WordsRepository(instance(global))

    const actual = await wordsRepository.findAll()

    expect(actual).toEqual(['foo', 'bar', 'baz'])
  })
})
