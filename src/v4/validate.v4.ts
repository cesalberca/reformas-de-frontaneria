export function validate(wordToTry: string, wordToGuess: string) {
  let result = []

  if (wordToTry === wordToGuess) {
    let x = []
    for (let i = 0; i < wordToGuess.length; i++) {
      x.push(1)
    }
    result = x
  } else {
    /**
     *  1 → Guessed letter and position correctly
     *  0 → Guessed letter correctly
     * -1 → Miss
     */
    for (let i = 0; i < wordToTry.length; i++) {
      if (wordToTry[i] === wordToGuess[i]) {
        result.push(1)
      } else if (wordToGuess.indexOf(wordToTry[i]) !== -1) {
        result.push(0)
      } else {
        result.push(-1)
      }
    }
  }

  return result
}

export {}
