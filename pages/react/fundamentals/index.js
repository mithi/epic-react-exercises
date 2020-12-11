import Main from "../../../components/main"
import Code from "../../../components/code"
import { IconButton } from "../../../components/button"
import { RiArrowLeftRightLine } from "react-icons/ri"
import useStickyState from "../../../hooks/useStickyState"

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

const Home = () => {
    let [primarySection, setPrimarySection] = useStickyState("notes", "mode")
    const togglePrimarySection = () => {
        setPrimarySection(primarySection === "notes" ? "code" : "notes", "mode")
    }

    const notes = (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap-reverse",
            }}
        >
            <h1 style={{ fontFamily: "kanit", fontSize: "40px" }}>
                React <br /> Fundamentals
            </h1>
            <div>
                <IconButton
                    page="/react/hooks"
                    onClick={togglePrimarySection}
                    style={{ margin: 0 }}
                >
                    <RiArrowLeftRightLine />
                </IconButton>
            </div>
        </div>
    )

    const div1 = primarySection === "notes" ? notes : <Code children={CODE_STRING} />
    const div2 = primarySection === "notes" ? <Code children={CODE_STRING} /> : notes

    return <Main {...{ div1, div2 }}></Main>
}
export default Home
