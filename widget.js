(function() {
	// Create HTML element by @tzilliox : https://gist.github.com/1868872
	var createElement = function( str ) {
		var elem = document.createElement('div');
		elem.innerHTML = str;
		if ( elem.childNodes.length > 0 ) {
			return elem.childNodes[0];
		}
		return elem;
	}
	var hasClass = function( el, className ) {
		return ( (" " + el.className + " ").indexOf( " " + className + " " ) !== -1 );
	}
	var addClass = function( el, className ){
		if ( ! hasClass( el, className ) ){
			el.className = el.className + " " + className;
		}
	}
	var removeClass = function( el, className ){
		if ( hasClass( el, className ) ){
			el.className = (" " + el.className + " ").split( " " + className + " " ).join('');
		}
	}
	var get_url_argument_value = function( url, argument_name ) {
		var get_arguments_url_part = function( url ) {
			var indexOf;
			if ( indexOf = url.indexOf( '?' ) + 1 ) {
				url = decodeURIComponent( url.substring( indexOf ) ).replace( new RegExp( '\\+', 'g' ), ' ');
				if ( indexOf = url.indexOf( '#' ) + 1 ) {
					url = url.substring( 0, indexOf - 1 );
				}
				return url;
			}
			return '';
		}
		var get_argument_value = function( url ) {
			var string_reverse = function( string ) {
				return string.split('').reverse().join('');
			}
			url = '&' + url + '&';
			var matches = new RegExp( '&([^=]*)=' + string_reverse( argument_name ) + '&').exec( string_reverse( url ) );
			if( matches != null && matches.length > 1 ) {
				return string_reverse( matches[ 1 ] );
			}
			return '';
		}
		
		// LOGIC
		return get_argument_value( get_arguments_url_part( url ), argument_name );
	}

	// Detection of Internet Explorer version by @tzilliox : https://gist.github.com/1950913
	var is_valid_navigator = function( ) {

		// UTILS
		var is_internet_explorer = function( ) {
		return ( window.navigator.appName == 'Microsoft Internet Explorer' );
		}
		var get_internet_explorer_version = function( ) {
			var matches = new RegExp( ' MSIE ([0-9]\.[0-9]);' ).exec( window.navigator.userAgent );
			if ( matches != null && matches.length > 1 ) {
				return matches[ 1 ];
			}
			return false;
		}

		// LOGIC
		if ( is_internet_explorer( ) ) {
			return ( get_internet_explorer_version( ) > 7 );
		}
		return true;
	}

	// DataURI detection by @tzilliox https://gist.github.com/2953065
	var fallback_datauri = function( fallback ){
		var datauri = new Image();
		datauri.onerror = fallback;
		datauri.onload = function() {
			if (datauri.width != 1 || datauri.height != 1) {
				fallback();
			}
		};
		datauri.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
	};

	// set image if DataURI not supported (thanks to @tzilliox AGAIN! https://gist.github.com/2953155 )
	var add_background_image = function( element, url ){
		// Specific old IE
		if ( document.all ) {
			element.style.setAttribute( 'cssText', 'background-image: url( "' + url + '" ) !important' );

		// Modern browser
		} else {
			element.setAttribute( 'style', 'background-image: url( "' + url + '" ) !important' );
		}
	}

	// append global div and set as widget
	var scripts = document.getElementsByTagName( 'script' );
	var script = scripts[ scripts.length - 1 ];
	var widget = createElement( '<div class="x-widget"></div>' );
	script.parentNode.appendChild( widget );
	script.parentNode.removeChild( script );
	var langs = { fr: 'fr', en: 'en' };
	var lang = get_url_argument_value( script.getAttribute( 'src'), 'lang' );
	if ( typeof langs[ lang ] == 'undefined' ) {
		lang = 'en';
	}
	
	// get path to the widget
	var get_widget_path = function ( src ) {
		// tools
		var startsWith = function(handle, needle) {return (handle.match("^"+needle)==needle)}
		var endsWith = function(handle, needle) {return (handle.match(needle+"$")==needle)}
		var dirname = function(path) {return path.replace(/\\/g, '/').replace(/\/[^\/]*\/?$/, '');}

		var widgetPath = src.split("widget.js");
		widgetPath = widgetPath[0];
		if ( startsWith(widgetPath, 'https://') ) {
			widgetPath = widgetPath.substr(6);
		}
		if ( startsWith(widgetPath, '//') ) {
			widgetPath = widgetPath.substr(2);
			widgetPath = 'http://' + widgetPath;
		}

		if ( startsWith( widgetPath, '/') ) {
			widgetPath = 'http://' + window.location.hostname + widgetPath;
		} else if ( ! startsWith(widgetPath, 'http://') ) {
			var path = window.location.pathname;
			if ( ! endsWith(path, '/') ) {
				path = dirname( path ) + '/';
			}
			widgetPath = 'http://' + window.location.hostname + path + widgetPath;
		}
		return widgetPath;
	}
	var widgetPath = get_widget_path( script.getAttribute( 'src' ) );

	// cdn used
	var cdnUsed = get_url_argument_value( script.getAttribute( 'src'), 'cdn' );
	if ( cdnUsed == 'true' ) {
		var imagesPath = 'https://github.com/Simounet/Diaspora-Share-Button/raw/master/images/';
	} else {
		var imagesPath = widgetPath + 'images/';
	}
	
	// check if eraser.css is already set
	var links = document.getElementsByTagName( 'link' );
	var is_eraser_css = false;
	var eraser_css_href = widgetPath + 'eraser.css';
	//console.log(eraser_css_href);
	for ( i=0; i<links.length; i++ ) {
		if ( links[ i ].href == eraser_css_href ) {
			is_eraser_css = true;
		}
	}
	if ( ! is_eraser_css ) {
		if (document.createStyleSheet) {
			document.createStyleSheet( eraser_css_href );
		} else {
			var link = document.createElement( 'link' );
			link.setAttribute( 'type', 'text/css' );
			link.setAttribute( 'href', eraser_css_href );
			link.setAttribute( 'rel', 'stylesheet' );
			var heads = document.getElementsByTagName( 'head' );
			heads[0].appendChild( link );
		}
	}
	
	// <a> element with the Diaspora*'s img button
	var target = createElement( '<a class="target" href="javascript:;" title="Share this at Diaspora*">Diaspora Share Button</a>' );
	fallback_datauri( function( ) {
		var disporaShareButtonImage = imagesPath + 'diaspora-share-button.png';
		add_background_image(target, disporaShareButtonImage);
	} );
	widget.appendChild( target );

	// handle onclick img to show input text
	target.onclick = function() {
		// fix IE 6 go to the top onclick
		if ( ! is_valid_navigator( ) ) {
			window.location.hash = '#';
		}

		var widget = createElement( '<div class="x-widget"></div>' );
		document.body.appendChild( widget );

		// popin parentContainer
		var parentContainer = createElement( '<div class="parent_container"></div>' );
		widget.appendChild( parentContainer );

		// popin container
		var container = createElement( '<div class="container"></div>' );
		widget.appendChild( container );
		var box = createElement( '<div class="box"></div>' );
		container.appendChild( box );

		// form
		var form = createElement( '<form method="get" name="widgetform"></form>' );
		box.appendChild( form );

		form.onsubmit = function() {
			var label = form.getElementsByTagName('label');
			var podurl = "https://" + label[0].childNodes[2].value + "/bookmarklet?url=" + encodeURIComponent(window.location.href) + "&amp;title=" + encodeURIComponent(document.title) + "&amp;notes=" + encodeURIComponent('' + (window.getSelection ? window.getSelection() : document.getSelection ? document.getSelection() : document.selection.createRange().text)) + "&amp;v=1&amp;";
			// TODO: check if url/bookmarklet and url/.well-known/host-meta exist
			popitup( podurl );
			return false;
		}
		
		// title
		var title = createElement( '<div class="title">' + locales.title[lang] + '</div>' );
		form.appendChild( title );
		
		// label with input and submit button
		var labels = form.getElementsByTagName('label');
		if (labels.length == 0) {
			var label = createElement( '<label class="label" for="podname">' + locales.podname[lang] + ': <span>http://</span></label>' );
			form.appendChild( label );

			var podname = createElement( '<input class="podname" type="text" name="podname"></input>' );
			label.appendChild( podname );

			// close button
			var close = createElement( '<a class="close" href="javascript:;" title="' + locales.close[lang] + '">Close button</a>' );
			fallback_datauri (function() {
				var closeButtonImage = imagesPath + 'close-button.png';
				add_background_image(close, closeButtonImage);
			});
			var to_close = function () {
				for (var i = 0; i < form.childNodes.length; i++) {
					form.removeChild(form.childNodes[i]);
					i--;
				}
				document.body.removeChild( widget );
				document.body.onkeyup = function(){}
			}
			// esc key handler
			document.body.onkeyup = function( event ) {
				if (window.event) {
					event = window.event;
				}
				var k = ( event.keyCode ) ? event.keyCode : event.which;
				if ( k == 27 ) {
					to_close();
					return false;
				} else {
					return true;
				}
			}
			close.onclick = to_close;
			parentContainer.onclick = to_close;
			form.appendChild( close );

			// about Diaspora
			var aboutDiaspora = createElement( '<div class="about">' + locales.diaspora_infos[lang] + '</div>' );
			box.appendChild( aboutDiaspora );

			podname.select();
			var button = createElement( '<button class="button" name="submit" type="submit">' + locales.submit[lang] + '</button>' );
			form.appendChild( button );
		} else {
			form.removeChild(labels[0]);
		}
		// checks invalid browser
		if ( ! is_valid_navigator( ) ) {
			var badIE = createElement( '<div class="box">' + locales.old_browser[lang] + '</div>' );
			container.appendChild( badIE );
		}
	}

	// pop up handler
	function popitup(url) {
		newwindow=window.open(url,'name','height=700,width=600');
		if (window.focus) { newwindow.focus(); }
		return false;
	}

	// locales array
	// TODO: Locales generator from an external file
	var locales = { "diaspora_infos" : { "en" : '<strong>Diaspora*</strong> is the social network\'s of the future with real cares about privacy. If you\'re interested about it, go to <a href="http://diasporaproject.org/" title="The Diaspora* Project" target="_blank">The Diaspora* Project</a>.',
										 "fr" : '<strong>Diaspora*</strong> est le r&eacute;seau social du futur qui se soucie vraiment de la confidentialit&eacute; des donn&eacute;es que vous y mettez. Si &ccedil;a vous int&eacute;resse, rendez-vous sur <a href="http://diasporaproject.org/" title="The Diaspora* Project" target="_blank">The Diaspora* Project</a>.' },
					"old_browser"	: { "en" : '<p>You are browsing the web with an outdated tool that doesn\'t allow you to feel the full power of the Internet. If you can, pick a best one: <a href="http://www.mozilla.org/firefox/" target="_blank">Firefox</a>.</p><p>You can also install Google Chrome Iframe as suggested by Diaspora* but if you choose the first solution I gave to you, you won\'t regret it! It must be that if you really can\'t install a modern browser.</p>',
										 "fr" : '<p>Vous utilisez un navigateur d&eacute;pass&eacute; qui ne vous permet pas de profiter de toute la puissace d\'Internet. Si vous le pouvez, choisissez en un meilleur : <a href="http://www.mozilla.org/firefox/" target="_blank">Firefox</a>.</p><p>Vous pouvez &eacute;galement installer Google Chrome Iframe comme sugg&eacute;r&eacute; par Diaspora* mais si vous optez pour la 1&egrave;re solution que je vous ai donn&eacute;, vous ne le regretterez pas ! &Ccedil;a ne doit &ecirc;tre que si vous ne pouvez vraiment pas installer un navigateur moderner.</p>' },
					"submit"		 : { "en" : 'Submit',
										 "fr" : 'Valider' },
					"about_diaspora" : { "en" : 'About Diaspora*',
										 "fr" : '&Agrave; propos de Diaspora*' },
					"title"          : { "en" : 'Share this page on Diaspora*',
										 "fr" : 'Partager cette page sur Diaspora*'},
					"close"		  : { "en" : 'Close',
										 "fr" : 'Fermer' },
					"podname"		: { "en" : 'Pod Address',
										 "fr" : 'Adresse du Pod ' }
				  }
}) ();

