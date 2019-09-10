# Gatsby Theme Elemental

**[Live Demo](https://elemental-theme.netlify.com/)** | **[Elemental Starter](https://github.com/akzhy/gatsby-starter-elemental)**


Elemental is a portfolio template suitable for artists, photographers, designers etc. With the theme you can create blog posts, portfolio posts an miscellaneous posts (such as privacy-policy).

## Installation

```
npm install gatsby-theme-elemental
```

### Configuring

Almost all features of this theme are editable. In order to personalize, open the `gatsby-config.js` file and start editing the below part.

```javascript
// Do not remove any of the properties below.

let siteMetadata = {
    title: `Elemental`, // Title of your webpage
    capitalizeTitleOnHome: true, // Whether to capitalize the letter on homepage
    logo: `/images/logo.png`, // Logo (Required)
    icon: `/images/icon.png`, // Favicon, shown in the browsers "tab" (Required)
    titleImage: `/images/wall.jpg`, // The main title is filled with an image. (Required)
    introTag: `PHOTOGRAPHER | VIDEOGRAPHER`, // Intro tag shown below title
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet accumsan arcu. Proin ac consequat arcu.`,
    author: `@_akzhy`,
    blogItemsPerPage: 10,
    portfolioItemsPerPage: 10,
    darkmode: true, // Whether to enable the darkmode. Change to false if you want the light mode
    switchTheme: true,
    // The links shown on the navbar and footer, follow the same structure to add or remove more items.
    navLinks: [{
            name: "HOME",
            url: "/"
        },
        {
            name: "ABOUT",
            url: "/about"
        },
        {
            name: "BLOG",
            url: "/blog"
        },
        {
            name: "PORTFOLIO",
            url: "/portfolio"
        },
        {
            name: "CONTACT",
            url: "/contact"
        }
    ],
    // Same as navbar links, except these are shown on the footer
    footerLinks: [{
        name: "PRIVACY POLICY",
        url: "/privacy-policy"
    }],
    // Your social profile links. The icons of the given social medias are available in the static folder. If you are adding a new item, include the icon in the static/images folder.
    social: [{
            name: "Facebook",
            icon: "/images/Facebook.svg",
            url: "#"
        },
        {
            name: "Twitter",
            icon: "/images/Twitter.svg",
            url: "#"
        },
        {
            name: "Instagram",
            icon: "/images/Instagram.svg",
            url: "#"
        },
        {
            name: "Youtube",
            icon: "/images/Youtube.svg",
            url: "#"
        }
    ],
    contact: {
        /* Leave this completely empty (no space either) if you don't want a contact form. */
        api_url: "./test.json",
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet accumsan arcu. Proin ac consequat arcu.`,
        mail: "hi@akzhy.com",
        phone: "000-000-0000",
        address: "1234 \nLocation \nLocation"
    }
}

```

#### Creating new blog posts.

Open the `contents/blog` folder and create a new folder with the name you wish to see as the URL. Inside the folder create an `index.md` file and also include any files you wish to add.

The frontmatter should be of the below structure

```
---
title: Title of your post
date: 2019-06-29 <-- Date should be in the given format
template: blog <-- The template you wish to use. "blog" for blog posts
image: ./image.jpg <-- Image shown on the list pages and also used as open graph image
banner: ./banner.jpg <-- Banner shown in the blog post
description: The description shown in the listing page. Also used for SEO description.
---
```

If you don't want the blog section, simply delete everything inside the `contents/blog` folder. (Do not delete the folder itself)

#### Creating new portfolio posts.

Open the `contents/portfolio` folder and create a new folder with the name you wish to see as the URL. Inside the folder create an `index.md` file and also include any files you wish to add.

The frontmatter should be of the below structure

```
---
title: Title of your post
date: 2019-06-29 <-- Date should be in the given format
template: blog <-- The template you wish to use. "blog" for blog posts
image: ./image.jpg <-- Image shown on the list pages and also used as open graph image
description: The description shown in the listing page. Also used for SEO description.
---
```

Portfolio pages support the creation of grids.

To create a grid, follow the below structure

```
[row]
[col]
**Markdown**
[/col]
[/row]
```

The columns will have equal width on wide screens, and will expand on smaller screens.


#### Creating miscellaneous posts

These posts follow the URL structure of `http://example.com/miscellaneous-post/`. They are useful for creating pages like `privacy-policy`

The "About" page is created as a miscellaneous post.

#### Contact Form

The contact form will only appear when you provide a URL to the `api_url` inside `contact`.

On form submission, a `post` request will be sent to the URL given with properties `name`, `email`, `message`. A response is expected in the form

```
{
    response: "success"
}
```

If response is "success" a "Message sent" message will be shown, otherwise an error message is shown.


## Contributing

Any kind of contributions are welcome. Bump the version and create a PR.
