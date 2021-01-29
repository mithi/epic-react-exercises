import { PrettyInputField } from "components/pretty-defaults"
import { TextButton } from "components/button"
import { GiClick } from "react-icons/gi"

const PositiveIntegerSearchbar = ({
    style,
    onSubmit,
    setIncompleteValue,
    incompleteValue,
    placeholder,
    disabled,
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
                style={{ height: "40px", width: "190px" }}
            />
            <TextButton
                isInvertedColor={true}
                type="submit"
                disabled={disabled}
                style={{
                    width: "auto",
                    borderRadius: "10px",
                    margin: "0px 5px",
                    height: "auto",
                    padding: "10px 10px",
                    fontSize: "12px",
                }}
                useBgPrimaryColor={true}
            >
                <GiClick />
                Submit
            </TextButton>
        </form>
    )
}

export default PositiveIntegerSearchbar
