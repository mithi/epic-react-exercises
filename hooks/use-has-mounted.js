import { useState, useEffect } from "react"

function useHasMounted() {
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
        setHasMounted(true)
    }, [])
    return hasMounted
}

export default useHasMounted
