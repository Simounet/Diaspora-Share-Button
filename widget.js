(function() {
    // Create HTML element by @tzilliox : https://gist.github.com/1868872
    function createElement( str ) {
        var elem = document.createElement('div');
        elem.innerHTML = str;
        if ( elem.childNodes.length > 0 ) {
            return elem.childNodes[0];
        }
        return elem;
    }
    function hasClass( el, className ) {
        return ( (" " + el.className + " ").indexOf( " " + className + " " ) !== -1 );
    }
    function addClass( el, className ){
        if ( ! hasClass( el, className ) ){
            el.className = el.className + " " + className;
        }
    }
    function removeClass( el, className ){
        if ( hasClass( el, className ) ){
            el.className = (" " + el.className + " ").split( " " + className + " " ).join('');
        }
    }

	// Dectection of Internet Explorer version by @tzilliox : https://gist.github.com/1950913
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
/*    var langs = [ 'fr', 'en' ];
    var lang = script.getAttribute( 'data-lang' );
    if ( langs.indexOf( lang ) == -1 ) {
        lang = 'en';
    }
  */
	
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
