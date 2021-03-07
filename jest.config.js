module.exports = {
    moduleFileExtensions: ["js", "jsx", "json", "png", "md", "html"],
    testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
    setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
    moduleDirectories: [".", "node_modules"],
    moduleNameMapper: {
        "\\.(css|less)$": "identity-obj-proxy",
    },
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    },
}
