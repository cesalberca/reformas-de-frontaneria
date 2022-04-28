const validWords = ['react', 'vueJs']

type Values = 'guess-correctly-position-and-letter' | 'miss' | 'guess-correctly-letter'

const wordToGuess = validWords[Math.floor(Math.random() * length)]

console.log({ wordToGuess })

function check(word: string): Values[] {
  // TODO: Check if word exist

  if (word === wordToGuess) {
    return [
      'guess-correctly-position-and-letter',
      'guess-correctly-position-and-letter',
      'guess-correctly-position-and-letter',
      'guess-correctly-position-and-letter',
      'guess-correctly-position-and-letter',
    ]
  }

  const result: Values[] = []
  word.split('').forEach((letter, j) => {
    if (letter === wordToGuess[j]) {
      result.push('guess-correctly-position-and-letter')
    } else if (wordToGuess.includes(letter)) {
      result.push('guess-correctly-letter')
    } else {
      result.push('miss')
    }
  })

  return result
}

const element = document.querySelector<HTMLInputElement>('#input')
const button = document.querySelector('#send')

button.addEventListener('click', () => {
  const result = check(element.value)
  console.log(result)
})
