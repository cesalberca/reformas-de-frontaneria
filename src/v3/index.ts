import { validate } from './validate'

fetch(
  'https://gist.githubusercontent.com/cesalberca/3d0e343842c7697e0f788178e59fb471/raw/22bfe35c910dd02db78fec87fa39ca25cc604816/data.json',
)
  .then(x => x.json())
  .then(availableWords => {
    const wordToGuess = availableWords[Math.floor(Math.random() * availableWords.length)]
    console.log({ wordToGuess })
    const form = document.querySelector<HTMLFormElement>('#form')
    const element = document.querySelector<HTMLInputElement>('#input')

    form.addEventListener('submit', e => {
      e.preventDefault()
      const result = validate(element.value, wordToGuess)
      console.log({ result })
    })
  })

export {}
