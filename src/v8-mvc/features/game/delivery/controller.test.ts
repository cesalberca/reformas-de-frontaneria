import { Controller } from './controller'
import { anyNumber, capture, instance, mock, when } from 'ts-mockito'
import { View } from './view'
import { GetWordGuessesUseCase } from '../application/get-word-guesses-use-case'
import { GetRandomWordToGuessUseCase } from '../application/get-random-word-to-guess-use-case'
import { Guess } from '../domain/guess'

function setup() {
  const view = mock(View)
  const getWordGuessesUseCase = mock(GetWordGuessesUseCase)
  const getRandomWordToGuessUseCase = mock(GetRandomWordToGuessUseCase)

  return {
    view,
    getWordGuessesUseCase,
    getRandomWordToGuessUseCase,
    controller: new Controller(instance(view), instance(getWordGuessesUseCase), instance(getRandomWordToGuessUseCase)),
  }
}

describe('Controller', () => {
  it('should start with empty state', async () => {
    const { controller, view, getRandomWordToGuessUseCase } = setup()
    when(getRandomWordToGuessUseCase.execute(anyNumber())).thenResolve('foo')

    await controller.start()

    const [maxTries, wordToGuess, tries, triedWords] = capture(view.start).first()
    expect(maxTries).toBe(6)
    expect(wordToGuess).toBe('foo')
    expect(tries).toEqual([
      [Guess.EMPTY, Guess.EMPTY, Guess.EMPTY],
      [Guess.EMPTY, Guess.EMPTY, Guess.EMPTY],
      [Guess.EMPTY, Guess.EMPTY, Guess.EMPTY],
      [Guess.EMPTY, Guess.EMPTY, Guess.EMPTY],
      [Guess.EMPTY, Guess.EMPTY, Guess.EMPTY],
      [Guess.EMPTY, Guess.EMPTY, Guess.EMPTY],
    ])
    expect(triedWords).toEqual([])
  })

  it('should add event listeners', async () => {
    const { controller, view, getRandomWordToGuessUseCase } = setup()
    when(getRandomWordToGuessUseCase.execute(anyNumber())).thenResolve('foo')

    await controller.start()

    const [actual] = capture(view.addEventListeners).last()
    expect(actual.name).toEqual('bound wordHandler')
  })
})
