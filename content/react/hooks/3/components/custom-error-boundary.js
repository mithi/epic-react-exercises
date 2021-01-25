import { Component } from "react"

class CustomErrorBoundary extends Component {
    state = { error: null }

    static getDerivedStateFromError(error) {
        return { error }
    }

    render() {
        const { error } = this.state
        const { resetFunction, FallbackComponent, children } = this.props
        if (error) {
            return <FallbackComponent {...{ error, resetFunction }} />
        }

        return children
    }
}

export default CustomErrorBoundary
