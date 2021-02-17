import { cloneElement } from "react"
import { PrettyInputField } from "components/pretty-defaults"
import { ColoredButton } from "components/button"

const FormSubmit = ({ style, ...otherProps }) => {
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

const FormSameLine = ({ children }) => <>{children}</>
const FormBottom = ({ children }) => <>{children}</>
const FormTop = ({ children }) => <>{children}</>

const SingleFieldForm = ({
    onSubmit,
    setIncompleteValue,
    incompleteValue,
    style,
    children,
}) => {
    let submitButton = null
    let inputField = null
    let formSameLine = null
    let formBottom = null
    let formTop = null

    for (let child in children) {
        if (children[child].type === FormSubmit) {
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
        } else if (children[child].type === FormSameLine) {
            formSameLine = children[child]
        } else if (children[child].type === FormBottom) {
            formBottom = children[child]
        } else if (children[child].type === FormTop) {
            formTop = children[child]
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
            {formTop}
            <div
                style={{
                    display: "flex",
                    alignItems: "stretch",
                    ...style,
                }}
            >
                {inputField}
                {submitButton}
                {formSameLine}
            </div>
            {formBottom}
        </form>
    )
}

export {
    PositiveIntegerInputField,
    FormSubmit,
    SingleFieldForm,
    FormSameLine,
    FormBottom,
    FormTop,
}
