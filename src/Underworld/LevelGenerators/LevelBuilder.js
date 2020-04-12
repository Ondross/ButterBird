import RoomBuilder from './RoomBuilder'

function Level(level, maxWidth, maxHeight) {
  this.currentRoom = RoomBuilder(maxWidth, maxHeight, 0, level.parameters.background)
  this.currentRoom.visited = true
  this.rooms = [this.currentRoom]
  this.npcs = []

  let room = this.currentRoom
  for (let i = 0; i < level.parameters.numRooms -1; i++) {
    // any side with a door should go up against the edge of the screen.
    // that makes it easier so you can end up outside the walls.
    const minEnemies = level.parameters.minimumEnemiesPerRoom || 0
    const avgEnemies = level.parameters.averageEnemiesPerRoom || 0
    const newRoom = RoomBuilder(
      Math.floor(maxWidth / (1 + (Math.random() * .5))),
      Math.floor(maxHeight / (1 + (Math.random() * .5))),
      Math.floor(Math.random() * (avgEnemies * 2 - minEnemies)) + minEnemies,
      level.parameters.background
    )
    room.addDoor('E', newRoom)
    newRoom.addDoor('W', room)
    room = newRoom
    this.rooms.push(room)
  }

  !level.completed && level.parameters.npcs && level.parameters.npcs.forEach(npc => {
    // avoid the first and last rooms.
    const roomNumber = (this.rooms.length > 2) ? (Math.floor(Math.random() * (this.rooms.length - 2)) + 1) : (this.rooms.length - 1)
    this.rooms[roomNumber].addNpc(npc)
    this.npcs.push(npc)
  })
  

  this.rooms.forEach(room => room.generateWalls())

  const enterDoor = (whichWall) => {
    this.currentRoom = this.currentRoom.doors[whichWall].nextRoom
    this.currentRoom.visited = true
  }

  this.enterDoor = enterDoor
}

export default function LevelBuilder() {
  this.build = (level, maxWidth, maxHeight) => {
    return new Level(level, maxWidth, maxHeight)
  }
}