import { PrettyInputField } from "components/pretty-defaults"
import { TextButton } from "components/button"

const PositiveIntegerSearchbar = ({
    onSubmit,
    setIncompleteValue,
    incompleteValue,
    placeholder,
}) => {
    function handleSubmit(e) {
        e.preventDefault()
        onSubmit(incompleteValue)
    }

    return (
        <form
            onSubmit={handleSubmit}
            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
            <PrettyInputField
                type="number"
                pattern="^[0-9]"
                min="1"
                step="1"
                placeholder={placeholder}
                value={incompleteValue}
                onChange={e => setIncompleteValue(e.target.value)}
                style={{ height: "40px", width: "70%" }}
            />
            <TextButton
                isInvertedColor={true}
                type="submit"
                disabled={!incompleteValue.length}
                style={{ height: "35px", width: "30%", borderRadius: "10px" }}
                useBgPrimaryColor={true}
            >
                Submit
            </TextButton>
        </form>
    )
}

export default PositiveIntegerSearchbar
