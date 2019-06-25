/* eslint-disable no-shadow */
const tap = require('tap')
const R = require('ramda')
const fs = require('fs')
const rover = require('./index')

tap.test('kata3', (t) => {
  t.type(rover, 'function')

  t.test('Error if function called without starting position', (t) => {
    t.throws(
      () => rover(),
      new Error(rover.ERROR_MISSING_STARTING_POSITION),
    )
    t.end()
  })

  t.test('Error if function called without starting direction', (t) => {
    t.throws(
      () => rover([1, 2]),
      new Error(rover.ERROR_MISSING_STARTING_DIRECTION),
    )
    t.end()
  })

  t.test('Error if function called without commands', (t) => {
    t.throws(
      () => rover([1, 2], 'W'),
      new Error(rover.ERROR_MISSING_COMMANDS),
    )
    t.end()
  })

  const testUseCaseProducer = (
    {
      startingPosition,
      startingDirection,
      commands,
      grid,
      obstacles,
      solution,
    },
  ) => {
    t.test(`startingPosition: ${startingPosition} - startingDirection: ${startingDirection} - commands: ${commands} - expectedResult: ${solution}`, (t) => {
      t.same(
        rover(
          startingPosition,
          startingDirection,
          commands,
          grid,
          obstacles,
        ),
        solution,
      )
      t.end()
    })
  }

  const useCaseReader = path => fs
    .readdirSync(path)
    // eslint-disable-next-line global-require,import/no-dynamic-require
    .map(fileName => require(R.join('/', [path, fileName])))

  t.test('Use Case 1', (t) => {
    useCaseReader('./usecase1')
      .forEach(input => testUseCaseProducer(input))
    t.end()
  })

  t.test('Use Case 2', (t) => {
    useCaseReader('./usecase2')
      .forEach(input => testUseCaseProducer(input))
    t.end()
  })

  t.test('Use Case 3', (t) => {
    useCaseReader('./usecase3')
      .forEach(input => testUseCaseProducer(input))
    t.end()
  })

  t.test('Use Case 4', (t) => {
    useCaseReader('./usecase4')
      .forEach(input => testUseCaseProducer(input))
    t.end()
  })

  t.end()
})
