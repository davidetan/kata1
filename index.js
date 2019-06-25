const R = require('ramda')

const ERROR_MISSING_STARTING_POSITION = 'ERROR_MISSING_STARTING_POSITION'
const ERROR_MISSING_STARTING_DIRECTION = 'ERROR_MISSING_STARTING_DIRECTION'
const ERROR_MISSING_COMMANDS = 'ERROR_MISSING_COMMANDS'
const ERROR_UNRECOGNIZED_DIRECTION = 'ERROR_UNRECOGNIZED_DIRECTION'
const ERROR_MISSING_GRID_SIZE = 'ERROR_MISSING_GRID_SIZE'

const DIRECTION_NORTH = 'N'
const DIRECTION_SOUTH = 'S'
const DIRECTION_WEST = 'W'
const DIRECTION_EAST = 'E'

const COMMAND_FORWARD = 'f'
const COMMAND_BACKARD = 'b'
const COMMAND_LEFT = 'l'
const COMMAND_RIGHT = 'r'

// eslint-disable-next-line max-len
module.exports = (startingPosition, startingDirection, commands, gridSize = [Infinity, Infinity], obstacleList = []) => {
  if (!startingPosition) {
    throw new Error(ERROR_MISSING_STARTING_POSITION)
  }
  if (!startingDirection) {
    throw new Error(ERROR_MISSING_STARTING_DIRECTION)
  }
  if (!commands) {
    throw new Error(ERROR_MISSING_COMMANDS)
  }

  const COMMAND_MAP = {
    Nf: ([x, y]) => [[x, y + 1], DIRECTION_NORTH],
    Nb: ([x, y]) => [[x, y - 1], DIRECTION_NORTH],
    Nl: ([x, y]) => [[x, y], DIRECTION_WEST],
    Nr: ([x, y]) => [[x, y], DIRECTION_EAST],
    Sf: ([x, y]) => [[x, y - 1], DIRECTION_SOUTH],
    Sb: ([x, y]) => [[x, y + 1], DIRECTION_SOUTH],
    Sl: ([x, y]) => [[x, y], DIRECTION_EAST],
    Sr: ([x, y]) => [[x, y], DIRECTION_WEST],
    Ef: ([x, y]) => [[x + 1, y], DIRECTION_EAST],
    Eb: ([x, y]) => [[x - 1, y], DIRECTION_EAST],
    El: ([x, y]) => [[x, y], DIRECTION_NORTH],
    Er: ([x, y]) => [[x, y], DIRECTION_SOUTH],
    Wf: ([x, y]) => [[x - 1, y], DIRECTION_WEST],
    Wb: ([x, y]) => [[x + 1, y], DIRECTION_WEST],
    Wl: ([x, y]) => [[x, y], DIRECTION_SOUTH],
    Wr: ([x, y]) => [[x, y], DIRECTION_NORTH],
  }

  const fixPositionValue = ([sizeX, sizeY]) => {
    const normalizedPosition = (lengthValue) => {
      const maxValue = lengthValue * 2 + 1
      return R.ifElse(
        value => Math.abs(value) > lengthValue,
        value => value + (-Math.sign(value) * maxValue),
        R.identity,
      )
    }
    const lengthX = normalizedPosition(sizeX)
    const lengthY = normalizedPosition(sizeY)
    return (x, y) => [lengthX(x), lengthY(y)]
  }

  const fixPositionValueGivenGrid = fixPositionValue(gridSize)

  // eslint-disable-next-line no-underscore-dangle
  const isThereObstacleGen = list => R.includes(R.__, list)
  const isThereObstacle = isThereObstacleGen(obstacleList)

  const getNewPositionFixed = direction => command => oldPosition => R.pipe(
    R.prop(
      R.join('', [direction, command]),
      COMMAND_MAP,
    ),
    ([newPosition, newDirection]) => [
      fixPositionValueGivenGrid(...newPosition),
      newDirection,
    ],
    ([newPositionFixed, newDirection]) => [
      isThereObstacle(newPositionFixed) ? oldPosition : newPositionFixed,
      newDirection,
    ],
  )(oldPosition)

  return R.reduce(
    ([position, direction], nextCommand) => {
      const [newPosition, newDirection] = getNewPositionFixed(direction)(nextCommand)(position)
      return [
        fixPositionValueGivenGrid(...newPosition),
        newDirection,
      ]
    },
    [startingPosition, startingDirection],
  )(commands)
}

module.exports.ERROR_MISSING_STARTING_POSITION = ERROR_MISSING_STARTING_POSITION
module.exports.ERROR_MISSING_STARTING_DIRECTION = ERROR_MISSING_STARTING_DIRECTION
module.exports.ERROR_MISSING_COMMANDS = ERROR_MISSING_COMMANDS
module.exports.ERROR_UNRECOGNIZED_DIRECTION = ERROR_UNRECOGNIZED_DIRECTION
module.exports.ERROR_MISSING_GRID_SIZE = ERROR_MISSING_GRID_SIZE

module.exports.COMMAND_FORWARD = COMMAND_FORWARD
module.exports.COMMAND_BACKWARD = COMMAND_BACKARD
module.exports.COMMAND_LEFT = COMMAND_LEFT
module.exports.COMMAND_RIGHT = COMMAND_RIGHT
module.exports.DIRECTION_EAST = DIRECTION_EAST
module.exports.DIRECTION_SOUTH = DIRECTION_SOUTH
module.exports.DIRECTION_NORTH = DIRECTION_NORTH
module.exports.DIRECTION_WEST = DIRECTION_WEST
