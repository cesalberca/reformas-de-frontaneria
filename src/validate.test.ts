import { WordValidator } from './v8/word-validator'

describe('validate', () => {
  it('should validate that no letter is present in the word', () => {
    const actual = new WordValidator().validate('abc', 'def')

    expect(actual).toEqual([-1, -1, -1])
  })

  it('should validate that some letters are present in the word but not in the particular position', () => {
    const actual = new WordValidator().validate('abc', 'dea')

    expect(actual).toEqual([0, -1, -1])
  })

  it('should that a letter is present in the same position as the guessed word', () => {
    const actual = new WordValidator().validate('abc', 'ade')

    expect(actual).toEqual([1, -1, -1])
  })

  it('should handle a letter that is present multiple times', () => {
    const actual = new WordValidator().validate('aba', 'aca')

    expect(actual).toEqual([1, -1, 1])
  })
})
