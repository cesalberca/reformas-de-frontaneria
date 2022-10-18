import { Word } from '../domain/word'
import { WordsRepository } from '../domain/words-repository'

export class WordsHttpRepository implements WordsRepository {
  constructor(private readonly fetcher: typeof globalThis.fetch) {}

  findAll(): Promise<Word[]> {
    return this.fetcher(
      'https://gist.githubusercontent.com/cesalberca/3d0e343842c7697e0f788178e59fb471/raw/22bfe35c910dd02db78fec87fa39ca25cc604816/data.json',
    ).then(x => x.json())
  }
}
