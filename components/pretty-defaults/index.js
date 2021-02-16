import Link from "next/link"
import Image from "next/image"
import { useTheme } from "hooks"

const DivBg1 = ({ style, className, children, Component }) => {
    const { bg1ClassName, bodyFont } = useTheme()
    Component = Component || "div"
    return (
        <Component
            className={[bg1ClassName, className].join(" ")}
            style={{ fontFamily: bodyFont, ...style }}
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
            style={{ fontFamily: bodyFont, ...style }}
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
    padding: "5px 15px",
    marginRight: "5px",
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
    OnClickText,
    SmallSpan,
    RoundedImage,
    DivBg1,
    DivBg2,
}
