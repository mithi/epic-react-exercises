// from kent c dodds
// this is just a fake user client, in reality it'd probably be using
// window.fetch to actually interact with the user.

/****************

THIS FUNCTION SHOULD TECHNICALLY BE FOR INTERACTING WITH
YOUR BACKEND (UPDATE YOUR DATABASE AND ALL THAT).

THIS FUNCTION SHOULD SEND A REQUEST TO THE BACKEND
AND RETURN THE BACKENDS RESPONSE

 *****************/
const sleep = t => new Promise(resolve => setTimeout(resolve, t))

const TRAITS = {
    body: ["chest", "breasts"],
    eyebrows: ["raised", "leftLowered", "serious", "angry", "concerned"],
    facialHair: ["none", "none2", "none3", "stubble", "mediumBeard"],
    hair: ["none", "long", "bun", "short", "pixie", "buzz", "afro", "bob"],
    hairColor: ["blonde", "orange", "black", "white", "brown", "blue", "pink"],
    lashes: ["true", "false"],
    lipColor: ["red", "purple", "pink", "turqoise", "green"],
    mouth: ["grin", "sad", "openSmile", "lips", "open", "serious", "tongue"],
    skinTone: ["light", "yellow", "brown", "dark", "red", "black"],
    eyes: [
        "normal",
        "leftTwitch",
        "happy",
        "content",
        "squint",
        "simple",
        "dizzy",
        "wink",
        "heart",
    ],
}

const ACCESSORIES = {
    accessory: ["none", "roundGlasses", "tinyGlasses", "shades"],
    clothing: ["naked", "shirt", "dressShirt", "vneck", "tankTop", "dress"],
    clothingColor: ["white", "blue", "black", "green", "red"],
    graphic: ["none", "redwood", "gatsby", "vue", "react", "graphQL"],
    hat: ["none", "none2", "none3", "none4", "none5", "beanie", "turban"],
    hatColor: ["white", "blue", "black", "green", "red"],
}

/**

user = { userId, nickName, bio, avatar: { baseTraits, accessories} }
pendingUserUpdates = {userId, nickName, bio}

**/

async function updateFakeBackendUser(currentUser, pendingUserUpdates) {
    await sleep(1500) // simulate a real-world wait period

    if (Math.random() > 0.7) {
        return Promise.reject({ message: "Randomly rejected by the backend" })
    }

    const combinedNickName = pendingUserUpdates.nickName.toLowerCase()
    const combinedBio = (pendingUserUpdates.bio + currentUser.bio).toLowerCase()

    const baseTraits = Object.entries(TRAITS).reduce(
        (base, [traitName, possibleValues], index) => {
            const myTraitIndex =
                combinedNickName.charCodeAt(index) % possibleValues.length || 0
            return { ...base, [traitName]: possibleValues[myTraitIndex] }
        },
        {}
    )

    const accessories = Object.entries(ACCESSORIES).reduce(
        (base, [traitName, possibleValues], index) => {
            const myTraitIndex =
                combinedBio.charCodeAt(index) % possibleValues.length || 0
            return { ...base, [traitName]: possibleValues[myTraitIndex] }
        },
        {}
    )

    return { user: { ...pendingUserUpdates, avatar: { baseTraits, accessories } } }
}

export { updateFakeBackendUser }
