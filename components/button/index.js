import Link from "next/link"
import { useTheme } from "hooks"
import { useButtonThemeClasses, ButtonThemeProvider } from "providers/theme"

const TOTALLY_CENTERED = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
}

const BIG_ICON_STYLE = {
    width: "50px",
    height: "50px",
    margin: "10px",
    fontSize: "20px",
    borderRadius: "25%",
}

const DEFAULT_BUTTON_STYLE = {
    ...TOTALLY_CENTERED,
    ...BIG_ICON_STYLE,
    textDecoration: "none",
    borderStyle: "none",
}

const AUTO_SIZE_STYLE = {
    height: "auto",
    width: "auto",
    margin: "10px",
    padding: "10px",
    fontSize: "12px",
    borderRadius: "8px",
}

const useDefaultButtonStyle = (
    style,
    disabled,
    useBgPrimaryColor,
    isAutoSize,
    noDisabledBorder
) => {
    const { headerFont, primaryColor } = useTheme()
    const disabledBorder = {
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: primaryColor,
    }
    const border = disabled && !noDisabledBorder ? disabledBorder : null
    const autoStyle = isAutoSize ? AUTO_SIZE_STYLE : null

    return {
        ...DEFAULT_BUTTON_STYLE,
        ...border,
        fontFamily: headerFont,
        backgroundColor: useBgPrimaryColor ? primaryColor : null,
        ...autoStyle,
        ...style,
    }
}

const LinkButtonInner = ({
    children,
    href,
    disabled,
    className,
    style,
    ...otherProps
}) => {
    className = useButtonThemeClasses(className, disabled)
    style = useDefaultButtonStyle(style, disabled)
    return (
        <Link {...{ href }}>
            <a style={{ textDecoration: "none" }}>
                <button {...{ disabled, className, style, ...otherProps }} tabIndex="-1">
                    {children}
                </button>
            </a>
        </Link>
    )
}

const LinkOutButtonInner = ({ children, href, className, style, ...otherProps }) => {
    className = useButtonThemeClasses(className)
    style = useDefaultButtonStyle(style, false)
    return (
        <a {...{ href }} target="_blank" rel="noopener noreferrer">
            <button {...{ className, style, ...otherProps }} tabIndex="-1">
                {children}
            </button>
        </a>
    )
}

const OnClickButtonInner = ({
    children,
    onClick,
    disabled,
    className,
    style,
    useBgPrimaryColor,
    isInvertedColor,
    isAutoSize,
    noDisabledBorder,
    ...otherProps
}) => {
    className = useButtonThemeClasses(className, disabled, isInvertedColor)
    style = useDefaultButtonStyle(
        style,
        disabled,
        useBgPrimaryColor,
        isAutoSize,
        noDisabledBorder
    )
    return (
        <button {...{ onClick, disabled, className, style, ...otherProps }}>
            {children}
        </button>
    )
}

const DefaultButton = ({ onClick, children, style, disabled, ...otherProps }) => (
    <ButtonThemeProvider>
        <OnClickButton
            isAutoSize={true}
            useBgPrimaryColor={true}
            isInvertedColor={true}
            noDisabledBorder={true}
            {...{ onClick, style, disabled, ...otherProps }}
        >
            {children}
        </OnClickButton>
    </ButtonThemeProvider>
)

const LinkButton = props => (
    <ButtonThemeProvider>
        <LinkButtonInner {...props} />
    </ButtonThemeProvider>
)

const LinkOutButton = props => (
    <ButtonThemeProvider>
        <LinkOutButtonInner {...props} />
    </ButtonThemeProvider>
)

const OnClickButton = props => (
    <ButtonThemeProvider>
        <OnClickButtonInner {...props} />
    </ButtonThemeProvider>
)

export { LinkOutButton, OnClickButton, LinkButton, DefaultButton }
