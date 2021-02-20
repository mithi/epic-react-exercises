import { useState } from "react"
import { dequal } from "dequal"
import {
    BorderedDiv,
    PrettyHeader,
    PrettyInputField,
    PrettyTextArea,
    SmallSpan,
    DivBg1,
} from "components/pretty-defaults"
import { PlainButton, ColoredButton } from "components/button"
import { UserProvider, useUser, updateUser } from "./components/user-context"
import { AvatarHead } from "./components/big-head"

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

function UserProfileCard() {
    const [{ user }] = useUser()
    const avatarSpecs = user.avatar
        ? { ...user.avatar.baseTraits, ...user.avatar.accessories }
        : null

    const formattedName = user.nickName.charAt(0).toUpperCase() + user.nickName.slice(1)
    return (
        <DivBg1 style={{ display: "flex", margin: "20px" }}>
            <div>
                <AvatarHead specs={avatarSpecs} />
            </div>
            <div>
                <PrettyHeader style={{ fontSize: "22px" }}>
                    {formattedName || "Unnamed"}
                </PrettyHeader>
                <SmallSpan>{user.bio || "No biography provided"}</SmallSpan>
                <br />
                <SmallSpan>({user.userId})</SmallSpan>
            </div>
        </DivBg1>
    )
}

function App() {
    return (
        <div>
            <UserProvider>
                <UserUpdateForm />
                <UserProfileCard />
            </UserProvider>
        </div>
    )
}

export default App
