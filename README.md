# Diaspora Share Button

## Description

This repository contains a project for a [Diaspora](https://joindiaspora.com/)'s sharing button we can use with every pod in the world.

## Installation

Copy this folder wherever you want on your tree folder site installation but it must be accessible by your pages.
Add the following code where you wanna place the button:
`<script type="text/javascript" src="widget.js"></script>`
> Use the index.html as an exemple. The src must specify the full path URL to the widget.

## Localization

You can handle localization adding a lang argument (only 'en' and 'fr' are supported by now) in the previous src attribute like this:
`<script type="text/javascript" src="widget.js?lang=fr"></script>`

## CDN
You can activate a [CDN](https://en.wikipedia.org/wiki/Content_delivery_network) (Github by now) adding this 'cdn' attribute to your widget src url. If you don't, your domain will be used instead. Diaspora Share Button images set inside the css with [data uri](https://en.wikipedia.org/wiki/Data_Uri) so if the browser used is not IE 6 or 7, it won't require access to image files.
`<script type="text/javascript" src="widget.js?cdn=true"></script>`

## Used in this project

- **Eraser.css** http://github.com/necolas/eraser.css
- **Create HTML element** https://gist.github.com/1868872
- **Detection of Internet Explorer version** https://gist.github.com/1950913

## About the author

- **Site:** http://www.simounet.net
- **Diaspora's profile:** [Simon@diasp.org](https://diasp.org/u/simon)
- **Twitter profile:** [@Simounet](http://twitter.com/Simounet)

## Thanks
@tzilliox for your time and your good advices.

## License

[GNU Lesser General Public License, version 2.1](http://www.gnu.org/licenses/lgpl-2.1.html)

## Changelog

### 0.3.6
    img button and data uri replaced by a new one, widget path handling (full, relative, htts), title added to the lightbox, about Diaspora displayed directly (not a toggle function anymore)

### 0.3.5
    option to set up a cdn for images, detection of Data URI availability

### 0.3.4
    created button css set to inline-block, DSB and Close buttons accessibility

### 0.3.3
    updated eraser.css load URL in the JS, change button img URL (if data uri can't be used)

### 0.3.2
    CSS cleaned (border-radius, remove underline for close link)

### 0.3.1
    Localization handler

### 0.3
    Jqueryless version

### 0.1
    Initial Release
