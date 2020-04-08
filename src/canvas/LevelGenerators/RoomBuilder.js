import { Graph } from "../Util/Astar"
import Wall from '../BaseClasses/Wall'
import Door from '../BaseClasses/Door'
import Blob from "../Enemies/Blob"
import Squid from "../Enemies/Squid"
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

function Room(width, height, xOffset, yOffset) {
  this.id = Math.floor(Math.random() * Date.now())
  // this.grid[x][y]
  const addWall = (row, column, width, height) => {
    for (let i = Math.floor(row); i < row + width; i++) {
      for (let j = column; j < column + height; j++) {
        this.grid[i][j] = 0
      }
    }

    // objects are stored by the center coordinates
    let src = "/images/walls/wood/vertical.png"
    if (width > height) {
      src = "/images/walls/wood/horizontalTopLeft.png"
    }
    this.walls.push(new Wall(src,
      (xOffset + row + width / 2),
      (yOffset + column + height / 2),
      width,
      height))
  }

  const addDoor = (whichWall, room) => {
    const locations = {
      'E': {x: width - .5, y: height / 2},
      'W': {x: .5, y: height / 2 },
    }
    const location = locations[whichWall]
    this.doors[whichWall] = new Door("/images/doors/vertical.png",
      (xOffset + location.x),
      (yOffset + location.y),
      1,
      height/3,
      room,
      whichWall
    )
  }

  const generateWalls = () => {
    const walls = {
      'E': {
        height: height / 3,
        width: 1,
        xIncrement: 0,
        xOffset: width - 1,
        yIncrement: height / 3,
        yOffset: 0,
      },
      'W': {
        height: height / 3,
        width: 1,
        xIncrement: 0,
        xOffset: 0,
        yIncrement: height / 3,
        yOffset: 0,
      },
      'N': {
        height: 1,
        width: width / 3,
        xIncrement: width / 3,
        xOffset: 0,
        yIncrement: 0,
        yOffset: 0,
      },
      'S': {
        height: 1,
        width: width / 3,
        xIncrement: width / 3,
        xOffset: 0,
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

    // obstacle
    addWall(Math.round(width / 2), Math.round(height / 2), Math.round(width / 4), 1)
    addWall(Math.round(width / 2), Math.round(height / 2), 1, Math.round(height / 5))

    this.generateGraph()
  }

  const addEnemy = () => {
    const enemyClass = Math.random() < .5 ? Blob : Squid
    const enemy = new enemyClass(
      xOffset + 6 + Math.random() * (width - 12) ,
      yOffset + 2 + Math.random() * (height - 4))

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
  this.grid = EmptyGrid(width, height)
  this.generateGraph = () => {
    this.graph = new Graph(this.grid, { diagonal: true })
  }
}

export default function RoomBuilder(screenWidth, screenHeight, width, height, numEnemies) {
  const xZero = screenWidth / 2 - width / 2
  const yZero = screenHeight / 2 - height / 2

  const room = new Room(width, height, xZero, yZero)

  // enemies
  for (let i = 0; i < numEnemies; i++) {
    room.addEnemy()
  }
  return room
}