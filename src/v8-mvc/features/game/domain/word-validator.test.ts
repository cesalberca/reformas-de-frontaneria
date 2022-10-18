import { WordValidator } from './word-validator'

function setup() {
  return { wordValidator: new WordValidator() }
}

describe('validate', () => {
  it('should validate that no letter is present in the word', () => {
    const { wordValidator } = setup()

    const actual = wordValidator.validate('abc', 'def')

    expect(actual).toEqual([-1, -1, -1])
  })

  it('should validate that some letters are present in the word but not in the particular position', () => {
    const { wordValidator } = setup()

    const actual = wordValidator.validate('abc', 'dea')

    expect(actual).toEqual([0, -1, -1])
  })

  it('should that a letter is present in the same position as the guessed word', () => {
    const { wordValidator } = setup()

    const actual = wordValidator.validate('abc', 'ade')

    expect(actual).toEqual([1, -1, -1])
  })

  it('should check that a letter is present multiple times', () => {
    const { wordValidator } = setup()

    const actual = wordValidator.validate('aba', 'aca')

    expect(actual).toEqual([1, -1, 1])
  })

  it('should check that the word matches', () => {
    const { wordValidator } = setup()

    const actual = wordValidator.validate('abc', 'abc')

    expect(actual).toEqual([1, 1, 1])
  })
})
