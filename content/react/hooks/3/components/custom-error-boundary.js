import { Component } from "react"

class CustomErrorBoundary extends Component {
    state = { error: null }

    static getDerivedStateFromError(error) {
        return { error }
    }

    render() {
        const { error } = this.state
        const { resetErrorBoundary, FallbackComponent } = this.props
        if (error) {
            return <FallbackComponent {...{ error, resetErrorBoundary }} />
        }

        return this.props.children
    }
}

export default CustomErrorBoundary
