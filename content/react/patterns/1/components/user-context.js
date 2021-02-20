import { createContext, useReducer, useContext } from "react"
import { useFakeAuth } from "./fake-auth-context"
import { updateFakeBackendUser } from "./fake-back-end"

const UserContext = createContext()
UserContext.displayName = "UserContext"

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

// Idea from Dan: https://twitter.com/dan_abramov/status/1125773153584676864
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
