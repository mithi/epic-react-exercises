import { useTheme } from "providers/hooks"

const SpinnerDots = () => {
    const { primaryColor } = useTheme()
    const style = { backgroundColor: primaryColor }
    return (
        <div className="lds-ellipsis">
            <div {...{ style }}></div>
            <div {...{ style }}></div>
            <div {...{ style }}></div>
            <div {...{ style }}></div>
        </div>
    )
}

export { SpinnerDots }
