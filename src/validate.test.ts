import { validate } from './validate.v7'

describe('validate', () => {
  it('should validate that no letter is present in the word', () => {
    const actual = validate('abc', 'def')

    expect(actual).toEqual([-1, -1, -1])
  })

  it('should validate that some letters are present in the word but not in the particular position', () => {
    const actual = validate('abc', 'dea')

    expect(actual).toEqual([0, -1, -1])
  })

  it('should that a letter is present in the same position as the guessed word', () => {
    const actual = validate('abc', 'ade')

    expect(actual).toEqual([1, -1, -1])
  })
})
