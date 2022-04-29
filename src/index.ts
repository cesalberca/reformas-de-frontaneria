import { data } from './data'

// Word to guess
const word = data[Math.floor(Math.random() * data.length)]
console.log({ word })
const form = document.querySelector('#form')
const element = document.querySelector('#input')

form.addEventListener('submit', e => {
  e.preventDefault()
  let result = []

  // @ts-ignore
  if (element.value === word) {
    let x = []
    for (let i = 0; i < word.length; i++) {
      x.push(1)
    }
    result = x
  } else {
    /**
     *  1 → Guessed letter and position correctly
     *  0 → Guessed letter correctly
     * -1 → Miss
     */
    // @ts-ignore
    for (let i = 0; i < element.value.length; i++) {
      // @ts-ignore
      if (element.value[i] === word[i]) {
        result.push(1)
        // @ts-ignore
        // } else if (word.includes(element.value[i])) {
      } else if (word.indexOf(element.value[i]) !== -1) {
        result.push(0)
      } else {
        result.push(-1)
      }
    }
  }

  console.log({ result })
})

export {}
