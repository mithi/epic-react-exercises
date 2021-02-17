import { cloneElement } from "react"
import { PrettyInputField } from "components/pretty-defaults"
import { ColoredButton } from "components/button"

const SubmitButton = ({ style, ...otherProps }) => {
    return (
        <ColoredButton
            style={{ margin: "0 5px 0 0", ...style }}
            type="submit"
            {...otherProps}
        />
    )
}

const PositiveIntegerInputField = props => {
    return <PrettyInputField type="number" pattern="^[0-9]" min="1" step="1" {...props} />
}

const SameLineComponent = ({ children }) => <>{children}</>

const SingleFieldForm = ({
    onSubmit,
    setIncompleteValue,
    incompleteValue,
    style,
    children,
}) => {
    let submitButton = null
    let inputField = null
    let maybeSameLineComponent = null

    for (let child in children) {
        console.log("single field form child", child)
        if (children[child].type === SubmitButton) {
            submitButton = children[child]
        } else if (
            children[child].type === PositiveIntegerInputField ||
            children[child].type === PrettyInputField ||
            children[child].type === "input"
        ) {
            inputField = cloneElement(children[child], {
                onChange: e => setIncompleteValue(e.target.value),
                value: incompleteValue,
            })
        } else if (children[child].type === SameLineComponent) {
            maybeSameLineComponent = children[child]
        }
    }

    if (!submitButton) {
        throw new Error(`SingleFieldForm must have a child component "SubmitButton"`)
    }

    if (!inputField) {
        throw new Error(
            `SingleFieldForm must have a children component that is either "PositiveIntegerInputField", "PrettyInputField", or "input"`
        )
    }

    function handleSubmit(e) {
        e.preventDefault()
        onSubmit(incompleteValue)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div
                style={{
                    display: "flex",
                    alignItems: "stretch",
                    ...style,
                }}
            >
                {inputField}
                {submitButton}
                {maybeSameLineComponent}
            </div>
        </form>
    )
}

export { PositiveIntegerInputField, SubmitButton, SingleFieldForm, SameLineComponent }
