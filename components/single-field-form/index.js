import { cloneElement } from "react"
import { PrettyInputField } from "components/pretty-defaults"
import { ColoredButton } from "components/button"

const FormSubmit = ({ style, ...otherProps }) => {
    return (
        <ColoredButton
            style={{ margin: "0 5px 0 2px", ...style }}
            type="submit"
            {...otherProps}
        />
    )
}

const PositiveIntegerInputField = props => {
    return (
        <PrettyInputField
            type="number"
            pattern="^[0-9]"
            min="1"
            step="1"
            placeholder="Pick a number!"
            {...props}
        />
    )
}

const FormSameLine = ({ children }) => <>{children}</>
const FormBottom = ({ children }) => <>{children}</>

const SingleFieldForm = ({ onSubmit, setValue, value, style, children }) => {
    let submitButton = null
    let inputField = null
    let formSameLine = null
    let formBottom = null

    for (let child in children) {
        if (children[child].type === FormSubmit) {
            submitButton = children[child]
        } else if (
            children[child].type === PositiveIntegerInputField ||
            children[child].type === PrettyInputField ||
            children[child].type === "input"
        ) {
            inputField = cloneElement(children[child], {
                onChange: e => setValue(e.target.value),
                value,
            })
        } else if (children[child].type === FormSameLine) {
            formSameLine = children[child]
        } else if (children[child].type === FormBottom) {
            formBottom = children[child]
        }
    }

    if (!submitButton) {
        throw new Error(`SingleFieldForm must have a child component "FormSubmit"`)
    }

    if (!inputField) {
        throw new Error(
            `SingleFieldForm must have a child component that is either "PositiveIntegerInputField", "PrettyInputField", or "input"`
        )
    }

    function handleSubmit(e) {
        e.preventDefault()
        onSubmit(value)
    }

    return (
        <form onSubmit={handleSubmit} style={{ margin: "20px", ...style }}>
            <div style={{ display: "flex", alignItems: "stretch" }}>
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
}
