import { useState } from "react"
import { dequal } from "dequal"
import { UserProvider, useUser, updateUser } from "./components/user-context"

function UserSettings() {
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
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="useId">UserId</label>
                <input
                    id="userId"
                    name="userId"
                    disabled
                    readOnly
                    value={formState.userId}
                />
            </div>
            <div>
                <label htmlFor="Nickname">Nickname</label>
                <input
                    id="nickName"
                    name="nickName"
                    value={formState.nickName}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="bio">Biography</label>
                <textarea
                    id="bio"
                    name="bio"
                    value={formState.bio}
                    onChange={handleChange}
                />
            </div>
            <div>
                <button
                    type="button"
                    onClick={() => {
                        setFormState(user)
                        userDispatch({ type: "RESET" })
                    }}
                    disabled={!isChanged || isPending}
                >
                    Reset
                </button>
                <br />
                <button type="submit" disabled={(!isChanged && !isRejected) || isPending}>
                    {isPending
                        ? "..."
                        : isRejected
                        ? "✖ Try again"
                        : isChanged
                        ? "Submit"
                        : "✔"}
                </button>
                {isRejected ? <pre style={{ color: "red" }}>{error.message}</pre> : null}
            </div>
        </form>
    )
}

function UserDataDisplay() {
    const [{ user }] = useUser()
    return <pre>{JSON.stringify(user, null, 2)}</pre>
}

function App() {
    return (
        <div>
            <UserProvider>
                <UserSettings />
                <UserDataDisplay />
            </UserProvider>
        </div>
    )
}

export default App
