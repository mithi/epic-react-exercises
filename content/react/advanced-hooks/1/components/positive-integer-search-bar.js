import { PrettyInputField } from "components/pretty-defaults"
import { DefaultButton } from "components/button"

const PositiveIntegerSearchbar = ({
    style,
    onSubmit,
    setIncompleteValue,
    incompleteValue,
    placeholder,
    disableButton,
    disableInputField,
    submitButtonStyle,
    inputFieldStyle,
    submitButtonContent,
}) => {
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
                flexWrap: "wrap",
                ...style,
            }}
        >
            <PrettyInputField
                type="number"
                pattern="^[0-9]"
                min="1"
                step="1"
                placeholder={placeholder}
                value={incompleteValue}
                onChange={e => setIncompleteValue(e.target.value)}
                style={inputFieldStyle}
                disabled={disableInputField}
            />
            <DefaultButton
                type="submit"
                disabled={disableButton}
                style={submitButtonStyle}
            >
                {submitButtonContent || "submit"}
            </DefaultButton>
        </form>
    )
}

export default PositiveIntegerSearchbar
