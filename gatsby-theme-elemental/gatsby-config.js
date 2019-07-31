const path = require("path");

module.exports = ({ contentPath = `contents` }) => {
    return {
        plugins: [
            `gatsby-plugin-sharp`,
            `gatsby-transformer-sharp`,
            `gatsby-plugin-react-helmet`,
            {
                resolve: `gatsby-transformer-remark`,
                options: {
                    plugins: [
                        "gatsby-remark-copy-linked-files",
                        {
                            resolve: `gatsby-remark-images`,
                            options: {
                                maxWidth: 1280
                            }
                        }
                    ]
                }
            },
            {
                resolve: `gatsby-source-filesystem`,
                options: {
                    name: `contents`,
                    path: path.resolve(contentPath)
                }
            },
            {
                resolve: `gatsby-plugin-page-creator`,
                options: {
                    path: path.join(__dirname, `src`, `pages`)
                }
            },
            {
                resolve: `gatsby-plugin-less`,
                options: {
                    strictMath: true,
                },
            },
        ],
    }
}
