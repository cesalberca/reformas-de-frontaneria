fetch(
  'https://gist.githubusercontent.com/cesalberca/3d0e343842c7697e0f788178e59fb471/raw/22bfe35c910dd02db78fec87fa39ca25cc604816/data.json',
)
  .then(x => x.json())
  .then(data => {
    // Word to guess
    const w = data[Math.floor(Math.random() * data.length)]
    console.log({ word: w })
    // Form
    const f = document.querySelector<HTMLFormElement>('#form')!
    // Input
    const b = document.querySelector<HTMLInputElement>('#input')!

    f.addEventListener('submit', e => {
      e.preventDefault()
      let r = []

      if (b.value === w) {
        let x = []
        for (let i = 0; i < w.length; i++) {
          x.push(1)
        }
        r = x
      } else {
        /**
         *  1 → Guessed letter and position correctly
         *  0 → Guessed letter correctly
         * -1 → Miss
         */
        for (let i = 0; i < b.value.length; i++) {
          if (b.value[i] === w[i]) {
            r.push(1)
            // } else if (word.includes(element.value[i])) {
          } else if (w.indexOf(b.value[i]) !== -1) {
            r.push(0)
          } else {
            r.push(-1)
          }
        }
      }

      console.log({ result: r })
    })
  })

export {}
