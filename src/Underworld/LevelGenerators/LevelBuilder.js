import RoomBuilder from './RoomBuilder'

// Difficulty (int: 1–3) affects number of enemies
// TODO: health and speed
function Level(level, maxWidth, maxHeight, difficulty) {
  this.currentRoom = RoomBuilder(maxWidth, maxHeight, 0, level.parameters.background)
  this.currentRoom.visited = true
  this.rooms = [this.currentRoom]
  this.npcs = []

  let room = this.currentRoom
  for (let i = 0; i < level.parameters.numRooms -1; i++) {
    const minEnemies = level.parameters.minimumEnemiesPerRoom || 0
    const avgEnemies = (level.parameters.averageEnemiesPerRoom || 0) * difficulty
    const numEnemies = Math.floor(Math.random() * (avgEnemies * 2 - minEnemies)) + minEnemies

    const newRoom = RoomBuilder(
      Math.floor(maxWidth / (1 + (Math.random() * .5))),
      Math.floor(maxHeight / (1 + (Math.random() * .5))),
      numEnemies,
      level.parameters.background
    )
    if (Math.random() > .5) {
      room.addDoor('S', newRoom)
      newRoom.addDoor('N', room)
    } else {
      room.addDoor('E', newRoom)
      newRoom.addDoor('W', room)
    }
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
  this.build = (level, maxWidth, maxHeight, difficulty) => {
    return new Level(level, maxWidth, maxHeight, difficulty)
  }
}