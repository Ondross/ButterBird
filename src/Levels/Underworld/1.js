export default function level1() {
  let introPlayed = false
  let enemiesExplained = false
  let firstKill = false

  this.update = (gamestate) => {
    const command = {}
    if (!introPlayed) {
      command.playScene = 'Intro'
      introPlayed = true
    }

    if (gamestate.level.currentRoom.enemies.length > 0 && !enemiesExplained) {
      command.playScene = 'ExplainEnemies'
      enemiesExplained = true
    }
    if (gamestate.events.enemyDestroyed  && !firstKill) {
      command.playScene = 'FirstKill'
      firstKill = true
    }

    return command
  }
}