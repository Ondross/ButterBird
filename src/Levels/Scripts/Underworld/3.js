export default {
  'FriendEncounter': [
    { pause: 500, text: "Dude!", speaker: 0 },
    { text: "Where have you been?", speaker: 0 },
    { text: "Oh shoot <hero>. Thank god you're here. Let's get out of here.", speaker: 1 },
    { text: "Uh, okay.", speaker: 0 },
    { text: "Come get me.", speaker: 1 },
  ],
  'FriendRecruited': [
    { pause: 500, text: "What's going on? I went above ground and saw some wild shit.", speaker: 0 },
    { text: "Above ground? Are you in your right mind <hero>?", speaker: 1 },
    { text: "Yes! I'm being serious.", speaker: 0 },
    { text: "<hero>... look at me. What's my name?", speaker: 1, prompt: 'askName', maxLength: 20 },
    { text: "Okay. Let's go. We can talk at home.", speaker: 1 },
    { text: "Home is infested with this stuff. Follow me.", speaker: 0 },
  ],
  'YouDied': [
    { text: "Ho...ly... Oh god... I guess it's up to me now.", speaker: 0 },
  ],
  'GameOver': [
    { text: "Darn... Refresh the page and try again." },
  ]
}