## Context Module Functions

> Summary: Add the ability for a user to submit data (such as updating its user profile) to a backend. As usual, your app should handle the request success or failure appropriately keeping the end user's experience in mind. Use the `Context Module functions` pattern for better performance by avoiding unneccessarily component rerenders and comparisons.

-   This user Update Exercise is taken from here [https://advanced-react-patterns.netlify.app/1]
-   This exercise, you'll have a form that updates the user profile, you'll have to submit the updates to a backend.
-   The request to update will be rejected 50% of the time to simulate network errors.

-   The backend will choose an (bighead avatar) for the user on the provided information, you can create your own algorithm on how to do this but it has to be deterministic.

-   This user profile should be available anywhere in your app
-   When the form is submitted, the user profile will be immediately updated, but when the backend reports that something when wrong, the update will be erased, and the user profile will go back to the latest saved information.
-   There should be a `reset`, `submit`, `try again` button when appropriate, and they should be disabled when appropriate.

-   Here's how my backend computes the profile avatar specification

    -   How you look is determined by the letters of your nickname
    -   The accessories (hat, hat color, shirt color, graphic, shirt) depends on the letters of your bio and previous bio

### Background

A good pattern to use here is `Context Module Functions`. In a nutshell, the idea have a function that can be exported to be used in conjuction with the `dispatch` function that your hook exposes. This function accepts the `dispatch` function (along with other arguments) and calls this `dispatch` function appropriately.

Here is an example of how this pattern can be applied to a global `Counter` context. You'd have a module `counter-context.js` which exports `CounterProvider`, `useCounter` and `updateCounter`. `useCounter` exposes two properties `[state, dispatch]`. To update the state of the counter, you'd pass the `dispatch` to `updateCounter` along with any other arguments required by the `updateCounter` function.

For this exercise, I'll have a `user-context.js` which exports `UserProvider`, `useUser` and `updateUser`. Where `userUpdate` takes in three arguments:
the `dispatch` function, the current `user` from the `useUser` and `updates`. `updates` are the contents of the submitted form.The `userUpdate` function is responsible for communicating the required updates to our backend and updating the saved `user` depending on the response of the backend. The `user` is updated by calling the `dispatch` function.

### My Solution

My solution is not really that different to [Kent's solution](https://github.com/kentcdodds/advanced-react-patterns/blob/main/src/final/01.js), so I guess it's better that you go look at that instead.

Here's the user reducer

```jsx
/**

action.updatedUser / user: {
    userId,
    nickName,
    bio
    avatar: {
        baseTraits,
        accessories
    }
}

action.pendingUserUpdates: {
    userId,
    nickName,
    bio
}

state: [{status, error, user, storedUser}]

 **/
function userReducer(previous, action) {
    switch (action.type) {
        case "START_UPDATE": {
            return {
                ...previous,
                user: { ...previous.user, ...action.pendingUserUpdates },
                storedUser: previous.user,
                status: "pending",
            }
        }
        case "FINISH_UPDATE": {
            return {
                user: action.updatedUser,
                storedUser: null,
                status: "resolved",
                error: null,
            }
        }
        case "FAIL_UPDATE": {
            return {
                user: previous.storedUser,
                storedUser: null,
                status: "rejected",
                error: action.error,
            }
        }
        case "RESET": {
            return {
                ...previous,
                status: null,
                error: null,
            }
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}
```

Here's the context module (with a context module function)

```jsx
const UserContext = createContext()
UserContext.displayName = "UserContext"

function UserProvider({ children }) {
    const { user } = useFakeAuth()
    const [state, dispatch] = useReducer(userReducer, {
        storedUser: user,
        user,
        status: null,
        error: null,
    })

    return (
        <UserContext.Provider value={[state, dispatch]}>{children}</UserContext.Provider>
    )
}

function useUser() {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error(`useUser must be used within a UserProvider`)
    }
    return context
}

async function updateUser(dispatch, currentUser, pendingUserUpdates) {
    dispatch({ type: "START_UPDATE", pendingUserUpdates })

    try {
        const { user } = await updateFakeBackendUser(currentUser, pendingUserUpdates)
        dispatch({ type: "FINISH_UPDATE", updatedUser: user })
        return user
    } catch (error) {
        dispatch({ type: "FAIL_UPDATE", error })
        return Promise.reject(error)
    }
}

export { useUser, UserProvider, updateUser }
```

Here's the form component

```jsx
function UserUpdateForm() {
    const [{ user, status, error }, userDispatch] = useUser()

    const isPending = status === "pending"
    const isRejected = status === "rejected"

    const userForForm = { bio: user.bio, nickName: user.nickName, userId: user.userId }
    const [formState, setFormState] = useState(userForForm)

    const isChanged = !dequal(userForForm, formState)

    function handleChange(e) {
        setFormState({ ...formState, [e.target.name]: e.target.value })
    }

    function handleSubmit(event) {
        event.preventDefault()
        updateUser(userDispatch, user, formState).catch(() => {})
        /* ignores errors */
    }

    return (
        <BorderedDiv>
            <form onSubmit={handleSubmit}>
                <LabeledInputField
                    id="userId"
                    value={formState.userId}
                    labelName="User ID"
                    disabled
                    readOnly
                />
                <LabeledInputField
                    id="nickName"
                    value={formState.nickName}
                    onChange={handleChange}
                    labelName="Nickname*"
                    maxLength={15}
                    required
                />
                <LabeledTextArea
                    id="bio"
                    labelName="Biography"
                    value={formState.bio}
                    onChange={handleChange}
                    maxLength={140}
                    placeholder="Tell us more about yourself in less than 140 characters"
                />
                <PlainButton
                    type="button"
                    onClick={() => {
                        setFormState(user)
                        userDispatch({ type: "RESET" })
                    }}
                    disabled={!isChanged || isPending}
                >
                    Reset
                </PlainButton>
                <ColoredButton
                    type="submit"
                    disabled={(!isChanged && !isRejected) || isPending}
                >
                    {isPending
                        ? "Please wait..."
                        : isRejected
                        ? "✖ Try again"
                        : isChanged
                        ? "Submit"
                        : "✔ Success!"}
                </ColoredButton>
                {isRejected ? <SmallSpan>Error! {error.message}</SmallSpan> : null}
            </form>
        </BorderedDiv>
    )
}
```

And here's the user profile card

```jsx
function UserProfileCard {
    const [{ user }] = useUser()
    const avatarSpecs = user.avatar
        ? { ...user.avatar.baseTraits, ...user.avatar.accessories }
        : null

    return (
        <div>
            <AvatarHead specs={avatarSpecs} />
            <PrettyHeader>{user.nickName || "No Nickname provided"} </PrettyHeader>
            <p>{user.bio || "No biography provided"}</p>
            <SmallSpan>({user.userId})</SmallSpan>
        </div>
    )
}
```

### Notes

> Helper methods are object junk that we need to recreate and compare for no purpose other than superficially nicer looking syntax. - [Dan Abramov](https://twitter.com/dan_abramov/status/1125758606765383680)

-   Dan Abramov says this pattern (context module functions) [may help improve performance](https://twitter.com/dan_abramov/status/1125774170154065920)
-   [KCD: Authentication in React Applications](https://kcd.im/auth)
