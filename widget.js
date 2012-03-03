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
		}
		
		// LOGIC
		return get_argument_value( get_arguments_url_part( url ), argument_name );
	}

	// Dectection of Internet Explorer version by @tzilliox : https://gist.github.com/1950913
	// check browser
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

	// append global div and set as widget
	var scripts = document.getElementsByTagName( 'script' );
	var script = scripts[ scripts.length - 1 ];
	var widget = createElement( '<div class="x-widget"></div>' );
	script.parentNode.appendChild( widget );
	script.parentNode.removeChild( script );
	var langs = [ 'fr', 'en' ];
	var lang = get_url_argument_value( script.getAttribute( 'src'), 'lang' );
	if ( langs.indexOf( lang ) == -1 ) {
		lang = 'en';
	}
	
	// check if eraser.css is already set
	var links = document.getElementsByTagName( 'link' );
	var is_eraser_css = false;
	var eraser_css_href = window.location.href + '/eraser.css';
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
	
	// img button
	var img_src = 'data:image/png;base64,' +
		'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';
	// <a> element with the Diaspora*'s img button
	var target = createElement( '<a class="target" href="javascript:;" title="Share this at Diaspora*">&nbsp;</a>' );
	widget.appendChild( target );

	// widget parentContainer
	var parentContainer = createElement( '<div class="parent_container"></div>' );
	widget.appendChild( parentContainer );

	// widget container
	var container = createElement( '<div class="container"></div>' );
	widget.appendChild( container );

	// form
	var form = createElement( '<form method="get" name="widgetform"></form>' );
	container.appendChild( form );

	// handle onclick img to show input text
	target.onclick = function() {
		addClass( parentContainer, 'show' );
		addClass( container, 'show' );

		// label with input and submit button
		var labels = form.getElementsByTagName('label');
		if (labels.length == 0) {
			var label = createElement( '<label class="label" for="podname">Pod Name: <span>http://</span></label>' );
			form.appendChild( label );

			var podname = createElement( '<input class="podname" type="text" name="podname"></input>' );
			label.appendChild( podname );

			// close button
			var close = createElement( '<a class="close" href="javascript:;" title="Close">&nbsp;</a>' );
			var to_close = function () {
				for (var i = 0; i < form.childNodes.length; i++) {
					form.removeChild(form.childNodes[i]);
					i--;
				}
				removeClass( parentContainer, 'show' );
				removeClass( container, 'show' );
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

			podname.select();
			var button = createElement( '<button class="button" name="submit" type="submit">Submit</button>' );
			form.appendChild( button );
		} else {
			form.removeChild(labels[0]);
		}
		// checks invalid browser
		if ( ! is_valid_navigator( ) ) {
			var badIE = createElement( '<div class="bad-browser"><p>You are browsing the web with an outdated tool that doesn\'t allow you to feel the full power of the Internet. If you can, pick a best one : <a href="http://www.mozilla.org/firefox/" target="_blank">Firefox</a></p></div>' );
			form.appendChild( badIE );
		}
	}

	// pop up handler
	function popitup(url) {
		newwindow=window.open(url,'name','height=700,width=600');
		if (window.focus) { newwindow.focus(); }
		return false;
	}

	form.onsubmit = function() {
		var label = form.getElementsByTagName('label');
		var podurl = "https://" + label[0].childNodes[2].value + "/bookmarklet?url=" + encodeURIComponent(window.location.href) + "&amp;title=" + encodeURIComponent(document.title) + "&amp;notes=" + encodeURIComponent('' + (window.getSelection ? window.getSelection() : document.getSelection ? document.getSelection() : document.selection.createRange().text)) + "&amp;v=1&amp;";
		// TODO: check if url/bookmarklet and url/.well-known/host-meta exist
		popitup( podurl );
		return false;
	}
}) ();
