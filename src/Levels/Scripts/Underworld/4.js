export default {
  'Intro': [
    { pause: 500, text: "Okay, Let's keep going.", speaker: 0 },
    { text: "You can switch to me by pressing the R key.", speaker: 1 },
  ],
  'FriendEncounter': [
    { text: "<dee dum dum>, t-t-t-tee. Hey, hey.", speaker: 2 },
    { pause: 500, text: "", speaker: "Hang on, <hero>.", speaker: 1 },
    { text: "What is that thing?", speaker: 1 },
    { text: "What thing?", speaker: 0 },
    { text: "The fuzzy thing, digging around.", speaker: 1 },
    { text: "Hm...", speaker: 0 },
    { text: "Be careful.", speaker: 1 },
  ],
  'FriendRecruited': [
    { pause: 500, text: "Badum, bum.", speaker: 2 },
    { text: "...", speaker: 1 },
    { text: "Hey", speaker: 1 },
    { text: "Bada-Huh?! Was that you?", speaker: 2 },
    { text: "What are you doing down here?", speaker: 1 },
    { text: "Me? I'm digging for diamonds. What is a talking piece of trash doing down here?", speaker: 2},
    { text: "Everyone calm down.", speaker: 0 },
    { text: "Okay okay. Let me introduce myself...", speaker: 2, prompt: 'askName', maxLength: 20 },
    { text: "I'm <hero>. We are looking for some diamonds ourselves. Things are getting out of hands.", speaker: 0 },
    { text: "You're telling me. Let's go talk to my father in the overworld.", speaker: 2 },
  ],
}