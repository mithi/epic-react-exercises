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
        <form onSubmit={handleSubmit}>
            <input
                type="number"
                pattern="^[0-9]"
                min="1"
                step="1"
                placeholder={placeholder}
                value={incompleteValue}
                onChange={e => setIncompleteValue(e.target.value)}
            />
            <button type="submit" disabled={!incompleteValue.length}>
                Submit
            </button>
        </form>
    )
}

export default PositiveIntegerSearchbar
