import { WordsHttpRepository } from './words-http-repository'

describe('WordsHttpRepository', () => {
  it('should find all words', async () => {
    const fetcher = jest.fn().mockResolvedValue({ json: () => Promise.resolve(['foo', 'bar', 'baz']) } as Response)
    const wordsRepository = new WordsHttpRepository(fetcher)

    const actual = await wordsRepository.findAll()

    expect(actual).toEqual(['foo', 'bar', 'baz'])
  })
})
