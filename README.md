## wonderJucks 🗿 - a Nunjucks starter site

A starter kit to build websites using [Nunjucks](https://mozilla.github.io/nunjucks/) a rich and powerful templating language for JavaScript. 

- 🐛 Framework free
- 🐝 Minimal CSS
- 🐬 Block based templating 

## Requirements

| Prerequisite    | How to check | How to install
| --------------- | ------------ | ------------- |
| Node.js >= 10.0  | `node -v`    | [nodejs.org](http://nodejs.org/) |
| gulp >= 4.0.0  | `gulp -v`    | `npm install -g gulp` |

---------------

## Installation
Install Node dependencies (Gulp 4.0.2, Nunjucks and a few others)

`npm install gulp --save-dev`
`npm install nunjucks`
`npm install`

Edit `gulpfile.js` for varibales such as folder names

---------------

### Build Process
`gulp` for devopment
`gulp build` for production (builds to /docs)

---------------

### Testing
Uses [cypress.io](https://www.cypress.io/) and test are located in `cypress/integration/tests` 

`./node_modules/.bin/cypress open`

---------------

### Deployment
This has been set up for deploying tpo GitHub pages but it's static so there are many options

---------------
### Dependencies
This uses a few libraries and open-source plugins, all MIT licensed. Apart from Astro and maybe the cookie notice (local law permitting) none are essential and can be removed.  

- [JavaScript Cookie v2.2.0](https://github.com/js-cookie/js-cookie)
- [Astro - Mobile-first navigation patterns.](https://github.com/cferdinandi/astro)
- [Validate.js - A lightweight form validation script.](https://github.com/cferdinandi/validate)
- [PhotoSwipe- JavaScript gallery, no dependencies](https://github.com/dimsemenov/photoswipe)

---------------

### Customisation

There are some site variables that should be edited away from the boilerplate defaults

- [ ] Change site vars - `data.json`
- [ ] Site name - `/images/fav/manifest.json`
- [ ] Update social images in `/images/og`, `/images/fav/`, `logotype.svg`
- [ ] Update form endpoint in `contact.html` - currently using [Formspree](https://formspree.io/)


#### Page variables 

Meta description (this also changes the twitter and facebook share text)

```
{{ siteDesc }}
{% set siteDesc = "Blah blah blah" %}
{{ siteDesc }}
```

Body class - `{% set body_class = "jw-gallery" %}`
Page title - `{% set page_title = "Gallery" %}`

Social (`footer.njk`) - `{{ social('dogwonder', 'dogwonder@gmail.com', '07967835097') }}`

---------------

## License

juckWonder is licensed under [MIT license](https://github.com/dogwonder/juckWonder/blob/master/LICENSE). 


