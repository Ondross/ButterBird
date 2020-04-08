import RoomBuilder from './RoomBuilder'

function Level(maxWidth, maxHeight, numRooms) {
  this.currentRoom = RoomBuilder(maxWidth, maxHeight, Math.min(maxWidth, 40), maxHeight, 0)
  this.currentRoom.visited = true
  this.rooms = [this.currentRoom]

  let room = this.currentRoom
  for (let i = 0; i < numRooms -1; i++) {
    // any side with a door should go up against the edge of the screen.
    // that makes it easier so you can end up outside the walls.
    const newRoom = RoomBuilder(
      maxWidth,
      maxHeight,
      Math.floor(maxWidth / (1 + (Math.random() * .5))),
      Math.floor(maxHeight / (1 + (Math.random() * .5))),
      Math.floor(Math.random() * 4)
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
  this.build = (maxWidth, maxHeight) => {
    return new Level(maxWidth, maxHeight, 3)
  }
}