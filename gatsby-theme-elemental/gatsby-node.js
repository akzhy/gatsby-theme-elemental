const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)
const fs = require("fs");

exports.onCreateNode = ({node, getNode, actions}) => {
    const {createNodeField} = actions;
    if (node.internal.type === `MarkdownRemark`) {
        const slug = createFilePath({node, getNode, basePath: `basepages`})
        createNodeField({node, name: `slug`, value: slug})
    }
}

exports.onPreBootstrap = ( {reporter} , themeOptions) => {
    const contentPath = themeOptions.contentPath || 'contents';

    if (!fs.existsSync(contentPath)) {
        reporter.info(`creating the ${contentPath} directory`);
        fs.mkdirSync(contentPath);
    }
    if (!fs.existsSync(`${contentPath}/blog`)) {
        reporter.info(`creating the ${contentPath}/blog directory`);
        fs.mkdirSync(`${contentPath}/blog`);
    }
    if (!fs.existsSync(`${contentPath}/portfolio`)) {
        reporter.info(`creating the ${contentPath}/portfolio directory`);
        fs.mkdirSync(`${contentPath}/portfolio`);
    }
    if (!fs.existsSync(`${contentPath}/basepages`)) {
        reporter.info(`creating the ${contentPath}/basepages directory`);
        fs.mkdirSync(`${contentPath}/basepages`);
    }
};

exports.createPages = ({graphql, actions}) => {
    const {createPage} = actions

    return graphql(`
    	{
      		blog: allMarkdownRemark(
				filter: { fileAbsolutePath: {regex : "\/blog/"} }
			) {
        		edges {
          			node {
						frontmatter{
							template
						}
            			fields {
              				slug
            			}
          			}
        		}
      		}
			portfolio: allMarkdownRemark(
				filter: { fileAbsolutePath: {regex : "\/portfolio/"} }
			) {
        		edges {
          			node {
						frontmatter{
							template
						}
            			fields {
              				slug
            			}
          			}
        		}
      		}
			basepages: allMarkdownRemark(
				filter: { fileAbsolutePath: {regex : "\/basepages/"} }
			) {
        		edges {
          			node {
						frontmatter{
							template
						}
            			fields {
              				slug
            			}
          			}
        		}
      		}
			limitPost: site{
				siteMetadata{
					blogItemsPerPage
					portfolioItemsPerPage
				}
			}
    	}
  `).then(result => {

        const blogPosts = result.data.blog.edges

        const blogPostsPerPage = result.data.limitPost.siteMetadata.blogItemsPerPage;
        const numBlogPages = Math.ceil(blogPosts.length / blogPostsPerPage)

        Array.from({length: numBlogPages}).forEach((_, i) => {
            createPage({
                path: i === 0
                    ? `/blog`
                    : `/blog/${i + 1}`,
                component: require.resolve("./src/templates/blog-list.js"),
                context: {
                    limit: blogPostsPerPage,
                    skip: i * blogPostsPerPage,
                    numPages: numBlogPages,
                    currentPage: i + 1
                }
            })
        })

        const PortfolioItems = result.data.portfolio.edges
        const PortfolioItemsPerPage = result.data.limitPost.siteMetadata.portfolioItemsPerPage;
        const numPortfolioItems = Math.ceil(PortfolioItems.length / PortfolioItemsPerPage)

        Array.from({length: numPortfolioItems}).forEach((_, i) => {
            createPage({
                path: i === 0
                    ? `/portfolio`
                    : `/portfolio/${i + 1}`,
                component: require.resolve("./src/templates/portfolio-list.js"),
                context: {
                    limit: blogPostsPerPage,
                    skip: i * blogPostsPerPage,
                    numPages: numPortfolioItems,
                    currentPage: i + 1
                }
            })
        })

        result.data.blog.edges.forEach(({node}) => {
            let template = node.frontmatter.template === undefined
                ? "blog"
                : node.frontmatter.template;
            createPage({
                path: node.fields.slug,
                component: require.resolve("./src/templates/" + template + ".js"),
                context: {
                    slug: node.fields.slug
                }
            })
        })

        result.data.portfolio.edges.forEach(({node}) => {
            let template = node.frontmatter.template == undefined ? "portfolio" : node.frontmatter.template;
            createPage({
                path: node.fields.slug,
                component: require.resolve("./src/templates/" + template + ".js"),
                context: {
                    slug: node.fields.slug
                }
            })
        })

        result.data.basepages.edges.forEach(({node}) => {
            let template = node.frontmatter.template == undefined ? "basepage" : node.frontmatter.template;
            createPage({
                path: node.fields.slug,
                component: require.resolve("./src/templates/" + template + ".js"),
                context: {
                    slug: node.fields.slug
                }
            })
        })

    })
}
