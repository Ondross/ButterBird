export default function level1() {
  let introPlayed = false
  let enemiesExplained = false

  this.update = (gamestate) => {
    const command = {}
    if (!introPlayed) {
      command.playScene = 'Intro'
      introPlayed = true
    }

    // same room. Let's see if anything has changed.
    if (gamestate.events.enemyDestroyed  && !enemiesExplained) {
        command.playScene = 'ExplainEnemies'
        enemiesExplained = true
    }

    return command
  }
}