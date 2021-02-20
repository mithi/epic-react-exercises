import { useState } from "react"
import { dequal } from "dequal"
import {
    BorderedDiv,
    PrettyHeader,
    PrettyInputField,
    PrettyTextArea,
    SmallSpan,
} from "components/pretty-defaults"
import { PlainButton, ColoredButton } from "components/button"
import { UserProvider, useUser, updateUser } from "./components/user-context"

const LabeledInputField = ({ labelName, id, ...otherProps }) => {
    return (
        <div style={{ margin: "5px" }}>
            <label htmlFor={`${id}`}>
                <SmallSpan>{labelName}</SmallSpan>{" "}
            </label>
            <PrettyInputField
                id={`${id}`}
                name={`${id}`}
                placeholder={labelName}
                {...otherProps}
            />
        </div>
    )
}

const LabeledTextArea = ({ labelName, id, ...otherProps }) => {
    return (
        <div>
            <label htmlFor={`${id}`}>
                <SmallSpan>{labelName}</SmallSpan>{" "}
            </label>
            <PrettyTextArea
                id={`${id}`}
                name={`${id}`}
                placeholder={labelName}
                {...otherProps}
            />
        </div>
    )
}

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
        <BorderedDiv style={{ borderStyle: "dashed" }}>
            <form onSubmit={handleSubmit}>
                <PrettyHeader style={{ textAlign: "center" }}>
                    (User Update Form)
                </PrettyHeader>
                <div style={{ display: "flex" }}>
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
                </div>
                <LabeledTextArea
                    id="bio"
                    labelName="Biography"
                    value={formState.bio}
                    onChange={handleChange}
                    maxLength={140}
                    placeholder="Tell us more about yourself in less than 140 characters"
                />
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
                </div>
                {isRejected ? (
                    <BorderedDiv style={{ borderColor: "red", borderRadius: 0 }}>
                        <SmallSpan style={{ color: "red" }}>
                            Error! {error.message}
                        </SmallSpan>
                    </BorderedDiv>
                ) : null}
            </form>
        </BorderedDiv>
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
