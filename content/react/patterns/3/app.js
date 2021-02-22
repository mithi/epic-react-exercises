import Example1 from "./components/example1"
import Example2 from "./components/example2"
import Example3 from "./components/example3"
import Example4 from "./components/example4"

const App = () => {
    return (
        <>
            <Example3 />
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                <Example1 />
                <div style={{ display: "flex" }}>
                    <Example2 />
                    <Example4 />
                </div>
            </div>
        </>
    )
}

export default App
