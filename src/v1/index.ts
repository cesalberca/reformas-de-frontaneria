fetch(
  'https://gist.githubusercontent.com/cesalberca/3d0e343842c7697e0f788178e59fb471/raw/22bfe35c910dd02db78fec87fa39ca25cc604816/data.json',
)
  .then(x => x.json())
  .then(data => {
    // Word to guess
    const word = data[Math.floor(Math.random() * data.length)]
    console.log({ word })
    const form = document.querySelector<HTMLFormElement>('#form')
    const element = document.querySelector<HTMLInputElement>('#input')

    form.addEventListener('submit', e => {
      e.preventDefault()
      let result = []

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
        for (let i = 0; i < element.value.length; i++) {
          if (element.value[i] === word[i]) {
            result.push(1)
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
  })

export {}
