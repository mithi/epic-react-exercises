import "@testing-library/jest-dom/extend-expect"

jest.mock("next/dynamic", () => {
    return jest.fn(() => "Dynamic")
})
