import { createContext, useContext } from "react"

// normally this is going to implement a similar pattern, learn more here: https://kcd.im/auth

const FakeAuthContext = createContext({
    user: { userId: "user#24601", nickName: "", bio: "" },
})

FakeAuthContext.displayName = "FakeAuthContext"

const FakeAuthProvider = ({ user, ...props }) => (
    <FakeAuthContext.Provider value={user} {...props} />
)

function useFakeAuth() {
    return useContext(FakeAuthContext)
}

export { FakeAuthProvider, useFakeAuth }
