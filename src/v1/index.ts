/**
 * Problems with this code:
 *   1. Names are not clear
 *   2. Mixed responsibilities
 *   3. Commented code
 *   4. Primitive obsession
 *   5. Use of any
 *   6. Not strict equals
 *   7. Use of let when there is no reassignment
 */

fetch(
  'https://gist.githubusercontent.com/cesalberca/3d0e343842c7697e0f788178e59fb471/raw/22bfe35c910dd02db78fec87fa39ca25cc604816/data.json',
)
  .then(x => x.json())
  .then(data => {
    let a

    if (a) {
      a = 1
    }

    // Word to guess
    let w = data[Math.floor(Math.random() * data.length)]
    console.log({ word: w })
    // Form
    let f = document.querySelector('#form')!
    // Input
    let b: any = document.querySelector('#input')!

    f.addEventListener('submit', (e: any) => {
      e.preventDefault()
      let r = []

      if (b.value == w) {
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
