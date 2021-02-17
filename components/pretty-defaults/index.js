import Link from "next/link"
import Image from "next/image"
import { useTheme } from "hooks"

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

const DivBg1 = ({ style, className, children, Component }) => {
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

const DivBg2 = ({ style, className, children, Component }) => {
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

const PrettyHeader = ({ style, children, Component, ...otherProps }) => {
    Component = Component ? Component : "div"
    const { headerFont } = useTheme()
    style = { ...style, fontFamily: headerFont }
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
        `Link in markdown does not start with "http" or "/", href=${href}, children=${children}`
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

const INPUT_STYLE = {
    borderWidth: "0px",
    borderRadius: "8px",
    padding: "5px 15px",
    marginRight: "5px",
    flex: 1,
}

const PrettyInputField = ({ placeholder, value, onChange, style, ...otherProps }) => {
    const { bg1ClassName, bodyFont } = useTheme()
    return (
        <input
            className={bg1ClassName}
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
                borderRadius: "15px",
                padding: "10px",
                margin: "5px",
                display: "flex",
                ...style,
            }}
            {...otherProps}
        >
            {children}
        </div>
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
                padding: "3px",
                flexShrink: 0,
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
    PrettyInputField,
    BorderedDiv,
    SimpleLink,
    OnClickText,
    SmallSpan,
    RoundedImage,
    DivBg1,
    DivBg2,
    MainGrid,
}
