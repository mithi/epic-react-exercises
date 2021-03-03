import Link from "next/link"
import Image from "next/image"
import { useTheme } from "providers"

const MainGrid = ({ children, className, style }) => {
    const { bg1ClassName, bodyFont } = useTheme()
    return (
        <div
            className={[bg1ClassName, className].join(" ")}
            style={{ fontFamily: bodyFont, ...style }}
        >
            {children}
        </div>
    )
}

const SECTION_STYLE = { borderRadius: "15px", padding: "20px" }

const DivBg1 = ({ Component, children, className, style }) => {
    const { bg1ClassName, bodyFont } = useTheme()
    Component = Component || "div"
    return (
        <Component
            className={[bg1ClassName, className].join(" ")}
            style={{ fontFamily: bodyFont, ...SECTION_STYLE, ...style }}
        >
            {children}
        </Component>
    )
}

const DivBg2 = ({ Component, children, className, style }) => {
    const { bg2ClassName, bodyFont } = useTheme()
    Component = Component || "div"

    return (
        <Component
            className={[bg2ClassName, className].join(" ")}
            style={{ fontFamily: bodyFont, ...SECTION_STYLE, ...style }}
        >
            {children}
        </Component>
    )
}

const PrettyHeader = ({ Component, children, style, ...otherProps }) => {
    Component = Component ? Component : "div"
    const { headerFont } = useTheme()
    style = { fontFamily: headerFont, ...style }
    return <Component {...{ style, ...otherProps }}>{children}</Component>
}

const SimpleLink = ({ href, children, style, ...otherProps }) => {
    const { primaryColor } = useTheme()
    style = { color: primaryColor, ...style }

    if (href.slice(0, 4) === "http") {
        return (
            <a
                target="_blank"
                rel="noopener noreferrer"
                {...{ href, style, ...otherProps }}
            >
                {children}
            </a>
        )
    } else if (href.slice(0, 1) === "/") {
        return (
            <Link {...{ href }}>
                <a {...{ style, ...otherProps }}>{children}</a>
            </Link>
        )
    }

    return new Error(
        `SimpleLink should start with "http" or "/", href=${href}, children=${children}`
    )
}

const OnClickText = ({ onClick, children, style, disabled, ...otherProps }) => {
    const { primaryColor, bodyFont } = useTheme()

    if (disabled) {
        return (
            <button
                disabled={true}
                style={{
                    ...style,
                    fontFamily: bodyFont,
                    color: "gray",
                    textDecoration: "none",
                }}
            >
                {children}
            </button>
        )
    }

    return (
        <button
            {...{ onClick, ...otherProps }}
            style={{ color: primaryColor, fontFamily: bodyFont, ...style }}
        >
            {children}
        </button>
    )
}

const INPUT_STYLE = {
    width: "100%",
    borderWidth: "0px",
    borderRadius: "8px",
    padding: "5px 15px",
    marginRight: "5px",
    fontSize: "16px",
    flex: 1,
}

const PrettyInputField = ({ value, onChange, disabled, style, ...otherProps }) => {
    const { bg1ClassName, bodyFont } = useTheme()
    return (
        <input
            className={bg1ClassName}
            style={{
                ...INPUT_STYLE,
                fontFamily: bodyFont,
                opacity: disabled ? 0.3 : 1.0,
                ...style,
            }}
            {...{ value, onChange, disabled, ...otherProps }}
        />
    )
}

const PrettyTextArea = ({ value, onChange, disabled, style, ...otherProps }) => {
    const { bg1ClassName, bodyFont } = useTheme()
    return (
        <textarea
            className={bg1ClassName}
            style={{
                fontFamily: bodyFont,
                ...INPUT_STYLE,
                lineHeight: "1.5",
                opacity: disabled ? 0.3 : 1.0,
                resize: "none",
                ...style,
            }}
            {...{ value, onChange, disabled, ...otherProps }}
        />
    )
}

const DIV_STYLE = {
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: "15px",
    padding: "10px",
    margin: "5px",
    display: "flex",
}

const BorderedDiv = ({ children, style, ...otherProps }) => {
    const { primaryColor } = useTheme()
    return (
        <div
            style={{ borderColor: primaryColor, ...DIV_STYLE, ...style }}
            {...otherProps}
        >
            {children}
        </div>
    )
}

const SmallSpan = ({ children, style }) => (
    <span style={{ fontSize: "12px", ...style }}>{children}</span>
)

const RoundedImage = ({ src, width, height, alt, borderType, style }) => {
    borderType = borderType || "border20percent"
    return (
        <div
            style={{
                width: `${width}px`,
                height: `${height}px`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "3px",
                flexShrink: 0,
                ...style,
            }}
        >
            <Image
                src={src}
                alt={alt || "unnamed image"}
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
    PrettyInputField,
    PrettyTextArea,
    BorderedDiv,
    SimpleLink,
    OnClickText,
    SmallSpan,
    RoundedImage,
    DivBg1,
    DivBg2,
    MainGrid,
}
