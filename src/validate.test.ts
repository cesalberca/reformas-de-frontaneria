import { validate } from './validate.v4'

describe('validate', () => {
  it('should validate that no letter is present in the word', () => {
    const actual = validate('abc', 'def')

    expect(actual).toEqual([-1, -1, -1])
  })
})
