module.exports = {
    webpack: config => {
        config.module.rules.push({
            test: /\.md$/,
            use: "raw-loader",
        })

        /**
            the issuer section stricts these svg as component only for svgs
            that are imported from js / ts files.
            This Allows you to configure other behaviour for svgs that are
            imported from other file types (such as .css)
         **/
        config.module.rules.push({
            test: /\.svg$/,
            issuer: {
                test: /\.(js|ts)x?$/,
            },
            use: ["@svgr/webpack"],
        })

        return config
    },

    i18n: {
        locales: ["en-US"],
        defaultLocale: "en-US",
    },
}
