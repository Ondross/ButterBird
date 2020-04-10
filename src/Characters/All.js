import Squid from './Squid'

// These are character prototypes
// Any of these can be used on the battlefield,
// given dialogue to say, etc, but they must be instantiated and
// added to game.party, game.nps, or game.level.room.enemies
export default Characters = {
  'Squid': {
    images: {
      down: ["/images/characters/squid/down/1.png", "/images/characters/squid/down/2.png",],
      up: ["/images/characters/squid/up/1.png", "/images/characters/squid/up/2.png",],
      left: ["/images/characters/squid/left/1.png", "/images/characters/squid/left/2.png",],
      right: ["/images/characters/squid/right/1.png", "/images/characters/squid/right/2.png",],
      blink: ["/images/characters/squid/blink/1.png",],
      avatar: "/images/characters/squid/down/1.png",
    },
    attack: 1,
    health: 1,
  }
}