module.exports = {
    webpack: config => {
        config.module.rules.push({
            test: /\.md$/,
            use: "raw-loader",
        })
        return config
    },

    i18n: {
        locales: ["en-US"],
        defaultLocale: "en-US",
    },
    images: {
        domains: ["rickandmortyapi.com", "img.pokemondb.net", "storage.googleapis.com"],
    },
    reactStrictMode: true,
}
