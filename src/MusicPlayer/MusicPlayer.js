
export default function MusicPlayer(songs) {
  let songPlaying = null

  Object.keys(songs).forEach((name) => {
    const audio = new Audio()
    audio.src = songs[name]
    audio.volume = 0
    songs[name] = audio
  })

  let newSongTimeout

  // todo: handle this being called more than once in two seconds
  // todo: make the transition a little smoother. The midpoint has the volumes at 50/50 right now. Not great.
  const transitionTime = 2000
  const transitionSteps = 10
  const maxVolume = .6
  const transition = (newSong) => {
    if (!songPlaying) {
      songPlaying = newSong
      songPlaying.volume = maxVolume
      songPlaying.play()
      return
    }

    newSong.play()
    songPlaying.volume = Math.max(songPlaying.volume - (1 / transitionSteps), 0)
    newSong.volume = Math.min(newSong.volume + (1 / transitionSteps), 1)

    if (songPlaying.volume === 0) {
      songPlaying.pause()
      songPlaying = newSong
    } else {
      clearTimeout(newSongTimeout)
      newSongTimeout = setTimeout(() => transition(newSong), transitionTime / transitionSteps)
    }

    // todo: handle when the song ends better than this.
    if (songPlaying.currentTime >= songPlaying.duration - 1) {
      songPlaying.currentTime = 0
    }
  }

  const play = (name) => {
    const song = songs[name]
    if (song) {
      transition(song)
    } else {
      songPlaying.pause()
    }
  }

  this.play = play
}