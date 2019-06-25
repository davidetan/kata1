/* eslint-disable no-shadow */
const tap = require('tap')
const R = require('ramda')
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

  t.test('Use Case 1', (t) => {
    const useCase1 = [
      [
        {
          startingPosition: [0, 0],
          startingDirection: rover.DIRECTION_NORTH,
          commands: [rover.COMMAND_FORWARD, rover.COMMAND_FORWARD],
          solution: [[0, 2], rover.DIRECTION_NORTH],
        },
      ],
      [
        {
          startingPosition: [-1, -1],
          startingDirection: rover.DIRECTION_SOUTH,
          commands: [rover.COMMAND_BACKWARD, rover.COMMAND_BACKWARD],
          solution: [[-1, 1], rover.DIRECTION_SOUTH],
        },
      ],
      [
        {
          startingPosition: [-1, 3],
          startingDirection: rover.DIRECTION_EAST,
          commands: [
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
            rover.COMMAND_BACKWARD,
          ],
          solution: [[1, 3], rover.DIRECTION_EAST],
        },
      ],
      [
        {
          startingPosition: [0, 0],
          startingDirection: rover.DIRECTION_NORTH,
          commands: [rover.COMMAND_FORWARD],
          solution: [[0, 1], rover.DIRECTION_NORTH],
        },
      ],
      [
        {
          startingPosition: [0, 0],
          startingDirection: rover.DIRECTION_NORTH,
          commands: [rover.COMMAND_BACKWARD],
          solution: [[0, -1], rover.DIRECTION_NORTH],
        },
      ],
      [
        {
          startingPosition: [0, 0],
          startingDirection: rover.DIRECTION_WEST,
          commands: [rover.COMMAND_BACKWARD],
          solution: [[1, 0], rover.DIRECTION_WEST],
        },
      ],
      [
        {
          startingPosition: [0, 0],
          startingDirection: rover.DIRECTION_NORTH,
          commands: R.repeat(rover.COMMAND_FORWARD, 10),
          solution: [[0, 10], rover.DIRECTION_NORTH],
        },
      ],
      [
        {
          startingPosition: [0, 0],
          startingDirection: rover.DIRECTION_SOUTH,
          commands: R.concat(
            R.repeat(rover.COMMAND_FORWARD, 5),
            R.repeat(rover.COMMAND_BACKWARD, 5),
          ),
          solution: [[0, 0], rover.DIRECTION_SOUTH],
        },
      ],
    ]
    useCase1.forEach(input => testUseCaseProducer(...input))
    useCase1.forEach((input, index) => {
      require('fs').writeFileSync(`./usecase1/${index + 1}.json`, JSON.stringify(input[0], null, 2))
    })
    t.end()
  })

  t.test('Use Case 2', (t) => {
    const useCase2 = [
      [
        {
          startingPosition: [0, 0],
          startingDirection: rover.DIRECTION_NORTH,
          commands: [
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
            rover.COMMAND_LEFT,
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
          ],
          solution: [[-2, 2], rover.DIRECTION_WEST],
        },
      ],
      [
        {
          startingPosition: [-1, -1],
          startingDirection: rover.DIRECTION_SOUTH,
          commands: [
            rover.COMMAND_BACKWARD,
            rover.COMMAND_RIGHT,
            rover.COMMAND_BACKWARD,
          ],
          solution: [[0, 0], rover.DIRECTION_WEST],
        },
      ],
      [
        {
          startingPosition: [-1, 3],
          startingDirection: rover.DIRECTION_EAST,
          commands: [
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
            rover.COMMAND_LEFT,
            rover.COMMAND_LEFT,
            rover.COMMAND_FORWARD,
          ],
          solution: [[0, 3], rover.DIRECTION_WEST],
        },
      ],
      [
        {
          startingPosition: [0, 0],
          startingDirection: rover.DIRECTION_NORTH,
          commands: [rover.COMMAND_LEFT],
          solution: [[0, 0], rover.DIRECTION_WEST],
        },
      ],
      [
        {
          startingPosition: [0, 0],
          startingDirection: rover.DIRECTION_NORTH,
          commands: R.repeat(rover.COMMAND_LEFT, 4),
          solution: [[0, 0], rover.DIRECTION_NORTH],
        },
      ],
      [
        {
          startingPosition: [0, 0],
          startingDirection: rover.DIRECTION_NORTH,
          commands: [
            rover.COMMAND_LEFT,
            rover.COMMAND_FORWARD,
            rover.COMMAND_LEFT,
            rover.COMMAND_FORWARD,
            rover.COMMAND_LEFT,
            rover.COMMAND_FORWARD,
            rover.COMMAND_LEFT,
            rover.COMMAND_FORWARD,
          ],
          solution: [[0, 0], rover.DIRECTION_NORTH],
        },
      ],
      [
        {
          startingPosition: [1, 1],
          startingDirection: rover.DIRECTION_NORTH,
          commands: [
            rover.COMMAND_LEFT,
            rover.COMMAND_FORWARD,
            rover.COMMAND_LEFT,
            rover.COMMAND_FORWARD,
            rover.COMMAND_LEFT,
            rover.COMMAND_FORWARD,
            rover.COMMAND_LEFT,
            rover.COMMAND_FORWARD,
          ],
          solution: [[1, 1], rover.DIRECTION_NORTH],
        },
      ],
      [
        {
          startingPosition: [1, 1],
          startingDirection: rover.DIRECTION_NORTH,
          commands: [
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
            rover.COMMAND_LEFT,
            rover.COMMAND_LEFT,
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
            rover.COMMAND_RIGHT,
            rover.COMMAND_LEFT,
            rover.COMMAND_FORWARD,
            rover.COMMAND_BACKWARD,
          ],
          solution: [[1, 1], rover.DIRECTION_SOUTH],
        },
      ],
    ]
    useCase2.forEach(input => testUseCaseProducer(...input))
    useCase2.forEach((input, index) => {
      require('fs').writeFileSync(`./usecase2/${index + 1}.json`, JSON.stringify(input[0], null, 2))
    })
    t.end()
  })

  t.test('Use Case 3', (t) => {
    const useCase3 = [
      [
        {
          startingPosition: [0, 0],
          startingDirection: rover.DIRECTION_NORTH,
          commands: [
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
          ],
          grid: [1, 1],
          solution: [[0, 0], rover.DIRECTION_NORTH],
        },
      ],
      [
        {
          startingPosition: [-1, -1],
          startingDirection: rover.DIRECTION_SOUTH,
          commands: [
            rover.COMMAND_LEFT,
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
            rover.COMMAND_LEFT,
            rover.COMMAND_FORWARD,
            rover.COMMAND_RIGHT,
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
          ],
          grid: [1, 3],
          solution: [[0, 0], rover.DIRECTION_EAST],
        },
      ],
      [
        {
          startingPosition: [-2, 2],
          startingDirection: rover.DIRECTION_WEST,
          commands: [
            rover.COMMAND_FORWARD,
            rover.COMMAND_RIGHT,
            rover.COMMAND_FORWARD,
            rover.COMMAND_RIGHT,
            rover.COMMAND_FORWARD,
            rover.COMMAND_LEFT,
            rover.COMMAND_FORWARD,
          ],
          grid: [2, 2],
          solution: [[-2, -1], rover.DIRECTION_NORTH],
        },
      ],
      [
        {
          startingPosition: [0, 0],
          startingDirection: rover.DIRECTION_NORTH,
          commands: [
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
            rover.COMMAND_RIGHT,
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
          ],
          grid: [2, 2],
          solution: [[-2, -2], rover.DIRECTION_EAST],
        },
      ],
      [
        {
          startingPosition: [0, 0],
          startingDirection: rover.DIRECTION_NORTH,
          commands: [
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
            rover.COMMAND_RIGHT,
            rover.COMMAND_FORWARD,
            rover.COMMAND_RIGHT,
            rover.COMMAND_FORWARD,
            rover.COMMAND_RIGHT,
            rover.COMMAND_FORWARD,
          ],
          grid: [2, 2],
          solution: [[0, 2], rover.DIRECTION_WEST],
        },
      ],
      [
        {
          startingPosition: [0, 0],
          startingDirection: rover.DIRECTION_WEST,
          commands: [
            rover.COMMAND_BACKWARD,
            rover.COMMAND_BACKWARD,
            rover.COMMAND_RIGHT,
            rover.COMMAND_FORWARD,
            rover.COMMAND_RIGHT,
            rover.COMMAND_FORWARD,
            rover.COMMAND_LEFT,
            rover.COMMAND_FORWARD,
          ],
          grid: [2, 2],
          solution: [[-2, 2], rover.DIRECTION_NORTH],
        },
      ],
    ]
    useCase3.forEach(input => testUseCaseProducer(...input))
    useCase3.forEach((input, index) => {
      require('fs').writeFileSync(`./usecase3/${index + 1}.json`, JSON.stringify(input[0], null, 2))
    })
    t.end()
  })

  t.test('Use Case 4', (t) => {
    const useCase4 = [
      [
        {
          startingPosition: [2, -2],
          startingDirection: rover.DIRECTION_NORTH,
          commands: [
            rover.COMMAND_FORWARD,
            rover.COMMAND_LEFT,
            rover.COMMAND_FORWARD,
            rover.COMMAND_LEFT,
            rover.COMMAND_FORWARD,
            rover.COMMAND_LEFT,
            rover.COMMAND_FORWARD,
            rover.COMMAND_LEFT,
            rover.COMMAND_FORWARD,
          ],
          grid: [2, 2],
          obstacles: [
            [-1, 2],
            [1, 2],
            [-2, 1],
            [-1, 1],
            [1, 1],
            [2, 1],
            [-2, -1],
            [-1, -1],
            [1, -1],
            [2, -1],
            [-1, -2],
            [1, -2],
          ],
          solution: [[-2, -2], rover.DIRECTION_NORTH],
        },
      ],
      [
        {
          startingPosition: [0, 0],
          startingDirection: rover.DIRECTION_NORTH,
          commands: [
            rover.COMMAND_FORWARD,
          ],
          solution: [[0, 1], rover.DIRECTION_NORTH],
        },
        [2, 2],
        [],
      ],
      [
        {
          startingPosition: [0, 0],
          startingDirection: rover.DIRECTION_NORTH,
          commands: [
            rover.COMMAND_FORWARD,
            rover.COMMAND_BACKWARD,
          ],
          grid: [2, 2],
          obstacles: [[0, 1], [0, -1]],
          solution: [[0, 0], rover.DIRECTION_NORTH],
        },
      ],
      [
        {
          startingPosition: [0, 0],
          startingDirection: rover.DIRECTION_NORTH,
          commands: [
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
            rover.COMMAND_BACKWARD,
            rover.COMMAND_BACKWARD,
            rover.COMMAND_BACKWARD,
            rover.COMMAND_BACKWARD,
          ],
          grid: [2, 2],
          obstacles: [[0, 1], [0, -1]],
          solution: [[0, 0], rover.DIRECTION_NORTH],
        },
      ],
      [
        {
          startingPosition: [0, 0],
          startingDirection: rover.DIRECTION_NORTH,
          commands: [
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
          ],
          grid: [2, 2],
          obstacles: [[0, -2]],
          solution: [[0, 2], rover.DIRECTION_NORTH],
        },
      ],
      [
        {
          startingPosition: [0, 0],
          startingDirection: rover.DIRECTION_NORTH,
          commands: [
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
            rover.COMMAND_BACKWARD,
            rover.COMMAND_LEFT,
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
            rover.COMMAND_BACKWARD,
          ],
          grid: [2, 2],
          obstacles: [[0, 1], [0, -1], [1, 0], [-1, 0]],
          solution: [[0, 0], rover.DIRECTION_WEST],
        },
      ],
      [
        {
          startingPosition: [0, 0],
          startingDirection: rover.DIRECTION_NORTH,
          commands: [
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
            rover.COMMAND_BACKWARD,
            rover.COMMAND_LEFT,
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
            rover.COMMAND_BACKWARD,
          ],
          grid: [2, 2],
          obstacles: [[0, 0], [0, 1], [0, -1], [1, 0], [-1, 0]],
          solution: [[0, 0], rover.DIRECTION_WEST],
        },
      ],
      [
        {
          startingPosition: [0, 0],
          startingDirection: rover.DIRECTION_NORTH,
          commands: [
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
            rover.COMMAND_BACKWARD,
            rover.COMMAND_LEFT,
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
            rover.COMMAND_BACKWARD,
          ],
          grid: [2, 2],
          obstacles: [[0, 0]],
          solution: [[-1, 1], rover.DIRECTION_WEST],
        },
      ],
      [
        {
          startingPosition: [-1, 2],
          startingDirection: rover.DIRECTION_NORTH,
          commands: [
            rover.COMMAND_FORWARD,
            rover.COMMAND_LEFT,
            rover.COMMAND_LEFT,
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
            rover.COMMAND_LEFT,
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
            rover.COMMAND_LEFT,
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
          ],
          grid: [2, 2],
          obstacles: [
            [-2, -2], [-2, -1], [-2, 0], [-2, 1], [-2, 2],
            [2, -2], [2, -1], [2, 0], [2, 1], [2, 2],
            [0, -2], [0, 0], [0, 1], [0, 2],
            [-1, -2], [1, -2],
          ],
          solution: [[1, 2], rover.DIRECTION_NORTH],
        },
      ],
      [
        {
          startingPosition: [0, 0],
          startingDirection: rover.DIRECTION_SOUTH,
          commands: [
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
            rover.COMMAND_RIGHT,
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
            rover.COMMAND_RIGHT,
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
            rover.COMMAND_RIGHT,
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
            rover.COMMAND_RIGHT,
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
            rover.COMMAND_RIGHT,
            rover.COMMAND_FORWARD,
            rover.COMMAND_FORWARD,
            rover.COMMAND_LEFT,
          ],
          grid: [3, 3],
          obstacles: [
            [-1, 3], [1, 3],
            [-3, 2], [3, 2],
            [0, 1],
            [-1, 0], [1, 0],
            [-2, -1], [2, -1],
            [-3, -2], [3, -2],
            [-1, -3], [1, -3],
          ],
          solution: [[0, 2], rover.DIRECTION_SOUTH],
        },

      ],
    ]
    useCase4.forEach(input => testUseCaseProducer(...input))
    useCase4.forEach((input, index) => {
      require('fs').writeFileSync(`./usecase4/${index + 1}.json`, JSON.stringify(input[0], null, 2))
    })
    t.end()
  })

  t.end()
})
