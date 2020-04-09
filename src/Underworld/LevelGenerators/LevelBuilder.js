import RoomBuilder from './RoomBuilder'

function Level(parameters, maxWidth, maxHeight) {
  this.currentRoom = RoomBuilder(maxWidth, maxHeight, 0, parameters.background)
  this.currentRoom.visited = true
  this.rooms = [this.currentRoom]

  let room = this.currentRoom
  for (let i = 0; i < parameters.numRooms -1; i++) {
    // any side with a door should go up against the edge of the screen.
    // that makes it easier so you can end up outside the walls.
    const minEnemies = parameters.minimumEnemiesPerRoom || 0
    const avgEnemies = parameters.averageEnemiesPerRoom || 0
    const newRoom = RoomBuilder(
      Math.floor(maxWidth / (1 + (Math.random() * .5))),
      Math.floor(maxHeight / (1 + (Math.random() * .5))),
      Math.floor(Math.random() * (avgEnemies * 2 - minEnemies)) + minEnemies,
      parameters.background
    )
    room.addDoor('E', newRoom)
    newRoom.addDoor('W', room)
    room = newRoom
    this.rooms.push(room)
  }

  this.rooms.forEach(room => room.generateWalls())

  const enterDoor = (whichWall) => {
    this.currentRoom = this.currentRoom.doors[whichWall].nextRoom
    this.currentRoom.visited = true
  }

  this.enterDoor = enterDoor
}

export default function LevelBuilder() {
  this.build = (parameters, maxWidth, maxHeight) => {
    return new Level(parameters, maxWidth, maxHeight)
  }
}