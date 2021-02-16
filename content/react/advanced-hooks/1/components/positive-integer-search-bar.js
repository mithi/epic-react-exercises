import { cloneElement } from "react"
import { PrettyInputField } from "components/pretty-defaults"
import { DefaultButton } from "components/button"

const SubmitButton = props => {
    return <DefaultButton {...props} type="submit" />
}

const PositiveIntegerInputField = props => {
    return <PrettyInputField type="number" pattern="^[0-9]" min="1" step="1" {...props} />
}

const SingleFieldForm = ({
    onSubmit,
    setIncompleteValue,
    incompleteValue,
    style,
    children,
}) => {
    let submitButton = null
    let inputField = null
    let fragmentIfAny = null

    for (let child in children) {
        if (children[child].type === SubmitButton) {
            submitButton = children[child]
        } else if (children[child].type === PositiveIntegerInputField) {
            inputField = cloneElement(children[child], {
                onChange: e => setIncompleteValue(e.target.value),
                value: incompleteValue,
            })
        } else {
            fragmentIfAny = children[child]
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        onSubmit(incompleteValue)
    }

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                ...style,
            }}
        >
            {inputField}
            {submitButton}
            {fragmentIfAny}
        </form>
    )
}

export { PositiveIntegerInputField, SubmitButton, SingleFieldForm }
