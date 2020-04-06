
const checkPositionForWalls = (walls, character, newX, newY) => {
  const directionsOkay = [true, true]

  const characterWidth = character.width() - (character.hitboxWidthOffset || 0)
  const characterHeight = character.height() - (character.hitboxHeightOffset || 0)
  walls.forEach(w => {
    const currentXOverlap =
      Math.abs(w.x() - character.x()) < (characterWidth / 2 + w.width() / 2)
    const currentYOverlap =
      Math.abs(w.y() - character.y()) < (characterHeight / 2 + w.height() / 2)
    const newXOverlap =
      Math.abs(w.x() - newX) < (characterWidth / 2 + w.width() / 2)
    const newYOverlap =
      Math.abs(w.y() - newY) < (characterHeight / 2 + w.height() / 2)

    if (newXOverlap && newYOverlap) {
      if (!currentXOverlap) {
        directionsOkay[0] = false
      }
      if (!currentYOverlap) {
        directionsOkay[1] = false
      }
    }
  })
  return directionsOkay
}

const tryUpdatingPosition = (walls, character, newX, newY) => {
  const [xOkay, yOkay] = checkPositionForWalls(walls, character, newX, newY)

  if (xOkay && yOkay) {
    return [newX, newY]
  } else if (xOkay) {
    return [newX, character.y()]
  } else if (yOkay) {
    return [character.x(), newY]
  } else {
    // we've hit a corner. Try just moving one way.
    if (checkPositionForWalls(walls, character, newX, character.y())[0]) {
      return [newX, character.y()]
    } else if (checkPositionForWalls(walls, character, character.x(), newY)[1]) {
      return [character.x(), newY]
    }
  }
  return [character.x(), character.y()]
}

export default {
  tryUpdatingPosition
}