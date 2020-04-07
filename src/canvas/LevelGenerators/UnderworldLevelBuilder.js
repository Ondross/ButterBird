import RoomBuilder from './RoomBuilder'

function Level(maxWidth, maxHeight, numRooms) {
  this.currentRoom = RoomBuilder(maxWidth, maxHeight, maxWidth, maxHeight, 2)
  this.rooms = []

  let room = this.currentRoom
  for (let i = 0; i < numRooms; i++) {
    this.rooms.push(room)
    const newRoom = RoomBuilder(maxWidth, maxHeight, Math.floor(maxWidth / (1 + Math.random())), Math.floor(maxHeight / (1 + Math.random())), 0)
    room.addDoor('E', newRoom)
    newRoom.addDoor('W', room)
    room = newRoom
  }

  this.rooms.forEach(room => room.generateWalls())

  const enterDoor = (whichWall) => {
    this.currentRoom = this.currentRoom.doors[whichWall].nextRoom
  }

  this.enterDoor = enterDoor
}

export default function LevelBuilder() {
  this.build = (maxWidth, maxHeight) => {
    return new Level(maxWidth, maxHeight, 3)
  }
}