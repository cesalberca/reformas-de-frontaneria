import { WordsRepository } from './words-repository'
import { instance, mock, when } from 'ts-mockito'

describe('WordsRepository', () => {
  it('should find all words', async () => {
    const global = mock<typeof globalThis>()
    when(
      global.fetch(
        'https://gist.githubusercontent.com/cesalberca/3d0e343842c7697e0f788178e59fb471/raw/22bfe35c910dd02db78fec87fa39ca25cc604816/data.json',
      ),
    ).thenResolve({ json: () => Promise.resolve(['foo', 'bar', 'baz']) } as Response)
    const wordsRepository = new WordsRepository(instance(global))

    const actual = await wordsRepository.findAll()

    expect(actual).toEqual(['foo', 'bar', 'baz'])
  })
})
