import Link from "next/link"
import Image from "next/image"
import { useTheme } from "providers/hooks"
import { DefaultButton } from "../button"

const PrettyHeader = ({ style, children, Component, ...otherProps }) => {
    Component = Component ? Component : "div"
    const { headerFont } = useTheme()
    style = { ...style, fontFamily: headerFont }
    return <Component {...{ style, ...otherProps }}>{children}</Component>
}

const PrettyAnchor = ({ children, href, style, ...otherProps }) => {
    const { primaryColor } = useTheme()
    return (
        <a style={{ color: primaryColor, ...style }} {...{ href, ...otherProps }}>
            {children}
        </a>
    )
}

const OnClickText = ({ children, onClick, style, ...otherProps }) => {
    const { primaryColor, bodyFont } = useTheme()
    return (
        <button
            {...{ onClick, ...otherProps }}
            style={{ color: primaryColor, fontFamily: bodyFont, ...style }}
        >
            {children}
        </button>
    )
}

const PrettyLink = ({ children, href, style, ...otherProps }) => {
    const { primaryColor } = useTheme()
    return (
        <Link {...{ href }}>
            <a style={{ color: primaryColor, ...style }} {...{ ...otherProps }}>
                {children}
            </a>
        </Link>
    )
}

const INPUT_STYLE = {
    borderWidth: "0px",
    borderRadius: "10px",
    margin: "5px",
    padding: "5px 15px",
}

const PrettyInputField = ({ placeholder, value, onChange, style, ...otherProps }) => {
    const { bodyClassNames, bodyFont } = useTheme()
    return (
        <input
            className={bodyClassNames[0]}
            style={{ ...INPUT_STYLE, ...style, fontFamily: bodyFont }}
            {...{ placeholder, value, onChange, ...otherProps }}
        />
    )
}

const BorderedDiv = ({ children, style, ...otherProps }) => {
    const { primaryColor } = useTheme()
    return (
        <div
            style={{
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: primaryColor,
                ...style,
            }}
            {...otherProps}
        >
            {children}
        </div>
    )
}

const PositiveIntegerSearchbar = ({
    onSubmit,
    setIncompleteValue,
    incompleteValue,
    disableButton,
    disableInputField,
    submitButtonStyle,
    submitButtonContent,
    inputFieldStyle,
    placeholder,
    style,
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
                {submitButtonContent ? submitButtonContent : "submit"}
            </DefaultButton>
        </form>
    )
}

const SmallSpan = ({ children, style }) => (
    <span style={{ fontSize: "12px", ...style }}>{children}</span>
)

const RoundedImage = ({ src, width, height, style, alt, borderType }) => {
    borderType = borderType || "border20percent"
    return (
        <div
            style={{
                width: `${width}px`,
                height: `${height}px`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                ...style,
            }}
        >
            <Image
                src={src}
                alt={alt}
                className={borderType}
                height={height}
                width={width}
                quality={100}
            />
            <style jsx global>{`
                .border20percent {
                    border-radius: 20%;
                }
                .border15px {
                    border-radius: 15px;
                }
                .border25percent {
                    border-radius: 25%;
                }
            `}</style>
        </div>
    )
}

export {
    PrettyHeader,
    PrettyAnchor,
    PrettyInputField,
    BorderedDiv,
    PrettyLink,
    PositiveIntegerSearchbar,
    OnClickText,
    SmallSpan,
    RoundedImage,
}
