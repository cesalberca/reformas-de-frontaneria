export function validate(wordToTry: string, wordToGuess: string) {
  return isWordGuessed(wordToTry, wordToGuess)
    ? setCorrectWordResult(wordToGuess)
    : setIndividualLetterResult(wordToTry, wordToGuess)
}

function isWordGuessed(wordToTry: string, wordToGuess: string) {
  return wordToTry === wordToGuess
}

function setCorrectWordResult(wordToGuess: string) {
  let x = []
  for (let i = 0; i < wordToGuess.length; i++) {
    x.push(1)
  }
  return x
}

function setIndividualLetterResult(wordToTry: string, wordToGuess: string) {
  let result = []
  /**
   *  1 → Guessed letter and position correctly
   *  0 → Guessed letter correctly
   * -1 → Miss
   */
  for (let i = 0; i < wordToTry.length; i++) {
    if (lettersAreEqual(wordToTry[i], wordToGuess[i])) {
      result.push(1)
    } else if (wordIncludesLetter(wordToGuess, wordToTry[i])) {
      result.push(0)
    } else {
      result.push(-1)
    }
  }

  return result
}

function lettersAreEqual(firstLetter: string, secondLetter: string) {
  return firstLetter === secondLetter
}

function wordIncludesLetter(wordToGuess: string, letter: string) {
  return wordToGuess.indexOf(letter) !== -1
}

export {}
