import { useEffect, useState } from "react"

// Adapted from: https://usehooks.com/useWindowSize/
function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    const [windowSize, setWindowSize] = useState({ width: undefined, height: undefined })

    useEffect(() => {
        const handleResize = () =>
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            })

        window.addEventListener("resize", handleResize)
        handleResize() // call it right away!

        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return windowSize
}

export default useWindowSize
