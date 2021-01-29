const randomIntegerBetween = (x, y) => Math.floor(Math.random() * y) + x

const RICK_AND_MORTY_FUNNY_QUOTES = [
    "What, so everyone’s supposed to sleep every single night now? You realize that nighttime makes up half of all time?",
    "Weddings Are Basically Funerals With A Cake",
    "I'm a scientist; because I invent, transform, create, and destroy for a living, and when I don't like something about the world, I change it.",
    "Honey, stop raising your father's cholesterol so you can take a hot funeral selfie.",
    "Sometimes Science Is More Art Than Science, Morty",
    "The universe is basically an animal. It grazes on the ordinary. It creates infinite idiots just to eat them.",
    "To live is to risk it all; otherwise you're just an inert chunk of randomly assembled molecules drifting wherever the universe blows you...",
    "What about the reality where Hitler cured cancer, Morty? The answer is: don’t think about it.",
    "Have fun with empowerment. It seems to make everyone that gets it really happy.",
    "Listen, Morty, I hate to break it to you, but what people call love is just a chemical reaction that compels animals to breed. It hits hard, Morty, then it slowly fades, leaving you stranded in a failing marriage. I did it. Your parents are gonna do it. Break the cycle, Morty. Rise above. Focus on science",
    "Nobody exists on purpose. Nobody belongs anywhere. We’re all going to die. Come watch TV.",
    "Yeah, I’d like to order one large phone with extra phones, please.",
    "You ever hear about Wall Street, Morty? You know what those guys do in their fancy boardrooms? They take their balls and they dip them in cocaine and wipe them all over each other.",
    "So what if he’s the Devil, Rick? At least the Devil has a job. At least he’s active in the community.",
    "Traditionally, science fairs are a father-son thing. Well, scientifically, traditions are an idiot thing.",
    "Tell me, Summer, if a human was born with stumpy legs, would they breed it with another deformed human and put their children on display like the Dachshund",
    "Having a family doesn’t mean that you stop being an individual. You know the best thing you can do for the people that depend on you? Be honest with them, even if it means setting them free.",
    "Um, first of all, hello. Uh, my name is Blim Blam the Korblok. Second of all, cards on the table, I’m a murderer that eats babies, and I came to this planet to eat babies.",
    "There’s nothing worse than when someone else figures out your relationship is over before you. Especially if your relationship is the worst thing they’ve ever witnessed in a galaxy full of terror",
    "Well then get your shit together, get it all together, and put it in a backpack, all your shit, so it’s together.",
    "You pass butter",
    "Morty, do you know what “wubba lubba dub dub” means? It’s not nonsense at all. In my people’s tongue it means, “I am in great pain, please help me.”",
    "It’s like the N-word and the C-word had a baby and it was raised by all the bad words for Jews.",
    "This pickle doesn’t care about your children. I’m not gonna take their dreams. I’m gonna take their parents.",
    "I’ll tell you how I feel about school, Jerry: it’s a waste of time. Bunch of people runnin’ around bumpin’ into each other, got a guy up front says, ‘2 + 2,’ and the people in the back say, ‘4.’ Then the bell rings and they give you a carton of milk and a piece of paper that says you can go take a dump or somethin’.",
    "I mean, it’s not a place for smart people, Jerry. I know that’s not a popular opinion, but that’s my two cents on the issue",
    "Is evil real, and if so, can it be measured? Rhetorical question. The answer’s yes, you just have to be a genius.",
    "You’re a monster. You’re like Hitler but even Hitler cared about Germany or something!",
    "God? God is turning people into giant insect monsters, Beth. I’m the one who’s beating them to death. Thank me",
    "Unity, I’m sorry. I didn’t know freedom meant people doing stuff that sucks. I was thinking more of a ‘choose your own cellphone carrier’ thing.",
    "When you know nothing matters, the universe is yours. And I’ve never met a universe that was into it.",
    "Listen, I’m not the nicest guy in the universe, because I’m the smartest, and being nice is something stupid people do to hedge their bets.",
    "There is no god, Summer; gotta rip that band-aid off now you’ll thank me later.",
    "Homework is stupid. The whole point is to try and get less of it.",
    "This is the supergenius equivalent of dying on the toilet.",
    "I just want to go back to Hell, where everyone thinks I’m smart and funny",
    "I’m not staring at you. I’m a cyborg photographer.",
    "It's a device Morty, that when you put it in your ear, you can enter people’s dreams Morty. It's just like that movie that you keep crowing about",
    "He’s not pressing charges… That’s gotta be the “you shot me” equivalent of not being mad.",
    "Existence is pain to a meeseeks Jerry, and we will do anything to alleviate that pain. Meeseeks",
    "You sold a gun to a murderer so you could play video games? Yeah, sure, I mean, if you spend all day shuffling words around, you can make anything sound bad, Morty.",
    "Don’t get drawn into the culture, Morty. Stealing stuff is about the stuff, not the stealing.",
    "Ruben’s seen some rough years, Morty. You don’t agree to get a theme park built inside you if your life is going great.",
    "I mean, why would a Pop-Tart want to live inside a toaster, Rick? I mean, that would be like the scariest place for them to live. You know what I mean? You’re missing the point Morty. Why would he drive a smaller toaster with wheels? I mean, does your car look like a smaller version of your house? No.",
    "There’s a lesson here and I’m not going to be the one to figure it out.",
    "Who cares, Morty? Global acts of terrorism happen every day. Uh, here’s something that’s never happened before: I’m a pickle! I’m Pickle Rick!",
]

const getRandomRickAndMortyQuote = () => {
    const numberOfQuotes = RICK_AND_MORTY_FUNNY_QUOTES.length
    const r = randomIntegerBetween(0, numberOfQuotes)
    return `“${RICK_AND_MORTY_FUNNY_QUOTES[r]}”"`
}

export default getRandomRickAndMortyQuote
