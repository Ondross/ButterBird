import { Graph } from "../Util/Astar"
import Wall from '../Objects/Obstacles/Wall'
import Door from '../Objects/Obstacles/Door'
import Blob from "../Objects/Enemies/Blob"
import Squid from "../Objects/Enemies/Squid"
import Prune from "../Objects/Enemies/Prune"
import Util from "../Util/Util"

function EmptyGrid(width, height) {
  const grid = []
  for (let i = 0; i < width; i++) {
    grid[i] = []
    for (let j = 0; j < height; j++) {
      grid[i][j] = 1
    }
  }
  return grid
}

function Room(width, height, background) {
  this.id = Math.floor(Math.random() * Date.now())
  // this.grid[x][y]

  const addWall = (x, y, width, height) => {
    // walls can only have integer dimensions, because they are used in pathfinding.
    width = Math.round(width)
    height = Math.round(height)

    // xs/ys must be half-sized if the height/width is odd. eg, if height is 3, it's centered around n.5
    if (width % 2) {
      x = Math.floor(x) + .5
    } else {
      x = Math.round(x)
    }
    if (height % 2) {
      y = Math.floor(y) + .5
    } else {
      y = Math.round(y)
    }

    // we work in center coordinates, but we need prefer to work top-left to bottom-right for the grid
    for (let i = y - height / 2; i < y + (height / 2); i++) {
      for (let j = x - width / 2; j < x + (width / 2); j++) {
        this.grid[j][i] = 0
      }
    }

    let src = "/images/obstacles/walls/wood/vertical.png"
    if (width > height) {
      src = "/images/obstacles/walls/wood/horizontalTopLeft.png"
    }

    this.walls.push(new Wall(src,
      x,
      y,
      width,
      height))
  }

  const addDoor = (whichWall, room) => {
    const locations = {
      'E': {x: width - .2, y: height / 2},
      'W': {x: .3, y: height / 2 },
    }
    const location = locations[whichWall]
    this.doors[whichWall] = new Door("/images/obstacles/doors/vertical.png",
      location.x,
      location.y,
      1,
      height/3,
      room,
      whichWall
    )
  }

  const generateWalls = () => {
    const walls = {
      'W': {
        height: height / 3,
        width: 1,
        xIncrement: 0,
        xOffset: .5,
        yIncrement: height / 3,
        yOffset: height / 6,
      },
      'E': {
        height: height / 3,
        width: 1,
        xIncrement: 0,
        xOffset: width - 1,
        yIncrement: height / 3,
        yOffset: height / 6,
      },
      'N': {
        height: 1,
        width: width / 3,
        xIncrement: width / 3,
        xOffset: width / 6,
        yIncrement: 0,
        yOffset: .5,
      },
      'S': {
        height: 1,
        width: width / 3,
        xIncrement: width / 3,
        xOffset: width / 6,
        yIncrement: 0,
        yOffset: height - 1,
      },
    }

    // make each wall a third of the total wall.
    // Skip the second third if there's a door there.
    Object.keys(walls).forEach(whichWall => {
      const wall = walls[whichWall]

      for (var i = 0; i < 3; i++) {
        if (!(this.doors[whichWall] && i===1)) {
          const x = wall.xOffset + wall.xIncrement * i
          const y = wall.yOffset + wall.yIncrement * i
          const width = wall.width
          const height = wall.height

          addWall(x, y, width, height)
        }
      }
    })

    // randomly add obstacles
    // todo: make better rules than this.
    // idea: start with as many obstacles as possible that don't screw up the game, then remove randomly.

    const minPassageSize = 4.5 // hack: hardcoded hero height + edge
    const wallHeight = Math.round(height / 6)
    const maxWalls = Math.floor((height - minPassageSize) / wallHeight)

    for (var i = 0; i < maxWalls; i++) {
      Math.random() > .5 && addWall(Math.round(width / 4 * 1), 1+ wallHeight * (i + .5), 1, wallHeight)
      Math.random() > .5 && addWall(Math.round(width / 2 * 1), height - 1 - wallHeight * (i + .5), 1, wallHeight)
      Math.random() > .5 && addWall(Math.round(width / 4 * 3), 1+ wallHeight * (i + .5), 1, wallHeight)
    }

    Math.random() > .5 && addWall(Math.round(width / 2), Math.round(height / 2), Math.round(width / 5), 1)

    this.generateGraph()
  }

  const addEnemy = () => {
    const enemyClass = [Blob, Prune, Squid][Math.floor(Math.random() * 3)]
    const enemy = new enemyClass(
      7 + Math.random() * (width - 12) ,
      2 + Math.random() * (height - 4))

    let nearDoor = false
    Object.values(this.doors).forEach((door) => {
      if (Util.checkForOverlap(enemy, door)) {
        nearDoor = true
      }
    })
    if (nearDoor) {
      return addEnemy()
    }

    this.enemies.push(enemy)
  }

  this.generateWalls = generateWalls
  this.addDoor = addDoor
  this.addEnemy = addEnemy
  this.width = width
  this.height = height
  this.walls = []
  this.doors = {}
  this.enemies = []
  this.backgroundImage = background
  this.grid = EmptyGrid(width, height)
  this.generateGraph = () => {
    this.graph = new Graph(this.grid, { diagonal: true })
  }
}

export default function RoomBuilder(width, height, numEnemies, background) {
  
  const room = new Room(width, height, background)

  // enemies
  for (let i = 0; i < numEnemies; i++) {
    room.addEnemy()
  }
  return room
}