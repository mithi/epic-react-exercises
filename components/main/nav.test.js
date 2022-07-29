import { render, screen } from "@testing-library/react"
import Nav from "./navbar"
import { ThemeProvider } from "providers"

describe("Nav", () => {
    it("The buttons for theme menu, react menu, github link and kofi link should be rendered", () => {
        render(
            <ThemeProvider>
                <Nav />
            </ThemeProvider>
        )

        const themeMenuButton = screen.getByRole("button", { name: /theme/i })
        const reactMenuButton = screen.getByRole("button", { name: /react/i })
        const githubButton = screen.getByRole("button", { name: /github/i })
        const kofiButton = screen.getByRole("button", { name: /coffee/i })

        expect(themeMenuButton).toBeInTheDocument()
        expect(reactMenuButton).toBeInTheDocument()
        expect(githubButton).toBeInTheDocument()
        expect(kofiButton).toBeInTheDocument()
    })
})
