import { Word } from './word'

export interface WordsRepository {
  findAll(): Promise<Word[]>
}
