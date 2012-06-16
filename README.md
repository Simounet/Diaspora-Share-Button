# Description

This repository contains a project for a Diaspora's sharing button we can use with every pod in the world.

# About the author

**Site:** http://www.simounet.net <br>
**Diaspora's profile:** http://diasp.org/u/Simon <br>
**Twitter profile:** [@Simounet](http://twitter.com/Simounet) <br>

# Used in this project
**Eraser.css** http://github.com/necolas/eraser.css <br>
**Create HTML element** https://gist.github.com/1868872 <br>
**Detection of Internet Explorer version** https://gist.github.com/1950913 <br>

# Thanks
> @tzilliox for your time and your good advices. <br>

	
# Description

This repository contains a project for a Diaspora's sharing button we can use with every pod in the world.

# Installation

Copy this folder wherever you want on your tree folder site installation but it must be accessible by your pages.
Add the following code where you wanna place the button:
> <code>&lt;script type="text/javascript" src="widget.js">&lt;/script></code>
> Use the index.html as an exemple. The src must specify the full path URL to the widget.

# Localization<br>
You can handle localization adding a lang argument (only 'en' and 'fr' are supported by now) in the previous src attribute like this:
> <code>&lt;script type="text/javascript" src="widget.js?lang=fr">&lt;/script></code><br>


# Infos

* **License**<br>
    [GNU Lesser General Public License, version 2.1](http://www.gnu.org/licenses/lgpl-2.1.html) <br>


# Changelog

## 0.1<br>
    Initial Release

## 0.3<br>
    Jqueryless version

## 0.3.1<br>
    Localization handler

## 0.3.2<br>
    CSS cleaned (border-radius, remove underline for close link)

## 0.3.3<br>
    updated eraser.css load URL in the JS, change button img URL (if data uri can't be used)

## 0.3.4<br>
    created button css set to inline-block, DSB and Close buttons accessibility
