
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
  const maxVolume = .6
  const transition = (newSong) => {
    if (!songPlaying) {
      songPlaying = newSong
      songPlaying.volume = maxVolume
      songPlaying.play()
      return
    }

    if (newSong.volume > .2) {
      newSong.play()
    }

    songPlaying.volume = Math.max(songPlaying.volume / 1.05, 0)
    newSong.volume = Math.min(Math.max(newSong.volume * 1.05, .05), 1)

    if (songPlaying.volume < .1) {
      songPlaying.pause()
      songPlaying = newSong
    } else {
      clearTimeout(newSongTimeout)
      newSongTimeout = setTimeout(() => transition(newSong), 60)
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

  // between .5 and 1
  const setIntensity = (level) => {
    if (songPlaying) {
      songPlaying.volume = level
      // experimenting with playback rate between 1 and 1.2
     // songPlaying.playbackRate = level * .4 + .8
    }
  }

  this.play = play
  this.setIntensity = setIntensity
}