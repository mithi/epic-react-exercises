import Main from "../../../components/main"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism"
import { LinkIconButton } from "../../../components/button"
import { RiArrowLeftRightLine } from "react-icons/ri"

const CODE_STRING = `import React from "react";
import uniquePropHOC from "./lib/unique-prop-hoc";

// this comment is here to demonstrate an extremely long line length, well beyond what you should probably allow in your own code, though sometimes you'll be highlighting code you can't refactor, which is unfortunate but should be handled gracefully

class Expire extends React.Component {

    constructor(props) {
        super(props);
        this.state = { component: props.children }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                component: null
            });
        }, this.props.time || this.props.seconds * 1000);
    }

    render() {
        return this.state.component;
    }
}
`
const Code = () => {
    return (
        <div style={{ fontSize: "12px" }}>
            <SyntaxHighlighter
                language="javascript"
                style={atomDark}
                showLineNumbers={true}
                wrapLongLines={true}
                lineNumberStyle={{
                    minWidth: "25px",
                    width: "25px",
                    paddingRight: "10px",
                    paddingLeft: "0",
                    borderRight: "1px solid red",
                    marginRight: "20px",
                    marginLeft: 0,
                }}
            >
                {CODE_STRING}
            </SyntaxHighlighter>
        </div>
    )
}

const Home = () => {
    return (
        <Main
            div1={
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap-reverse",
                    }}
                >
                    <div>
                        <h1 style={{ fontFamily: "kanit", fontSize: "40px" }}>
                            React <br /> Fundamentals
                        </h1>
                    </div>
                    <div>
                        <LinkIconButton page="/react/hooks" style={{ margin: 0 }}>
                            <RiArrowLeftRightLine />
                        </LinkIconButton>
                    </div>
                </div>
            }
            div2={<Code />}
        ></Main>
    )
}
export default Home
