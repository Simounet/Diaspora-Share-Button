(function() {
    // append global div and set as widget
	document.write( '<div class="x-widget"></div>' );
	var widgets = document.getElementsByTagName( 'div' );
	var widget = widgets[ widgets.length - 1 ];
	
    // check if eraser.css is already set
	var links = document.getElementsByTagName( 'link' );
	var is_eraser_css = false;
	var eraser_css_href = 'eraser.css';
	for ( i=0; i<links.length; i++ ) {
		if ( links[ i ].href == eraser_css_href ) {
			is_eraser_css = true;
			break;
		}
	}
	if ( ! is_eraser_css ) {
		var link = document.createElement( 'link' );
		link.setAttribute( 'type', 'text/css' );
		link.setAttribute( 'rel', 'stylesheet' );
		link.setAttribute( 'href', eraser_css_href );
		document.head.appendChild( link );
	}
	
    // img button
	var img_src = 'data:image/png;base64,' +
		'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';
    // <a> element with the Diaspora*'s img button
	var target = document.createElement( 'a' );
    var targetDefaultStyle = 'display:block !important; width: 50px !important;height: 60px !important;background:url(https://github.com/Simounet/Diaspora-Share-Button/raw/jqueryless/images/diaspora-share-button.png) no-repeat !important;';
	target.setAttribute( 'style', targetDefaultStyle );
	target.setAttribute( 'title', 'Share this at Diaspora*' );
    target.onmouseover=function(){
        this.setAttribute( 'style', targetDefaultStyle + 'cursor: pointer !important;' );
    }
    target.onmouseout=function(){
        this.setAttribute( 'style', targetDefaultStyle + 'cursor: default !important;' );
    }
	widget.appendChild( target );

    // widget container
    var container = document.createElement( 'div' );
    container.setAttribute( 'style', 'display:none !important;' );
    widget.appendChild( container )

    // form
	var form = document.createElement( 'form' );
	form.setAttribute( 'method', 'get' );
    form.setAttribute( 'style', 'background-color: #FFFFFF !important;color: #000000 !important;display: block;height: 500px !important;left: 50% !important;margin: -250px auto 0 -250px !important;position: absolute !important;top: 50% !important;width: 500px !important;' );
	form.setAttribute( 'name', 'widgetform' );
	container.appendChild( form );

    // handle onclick on the img to show input text
	target.onclick = function() {
        container.setAttribute('style', 'z-index:999 !important;width:100% !important;height:100% !important;display:block !important;position:absolute !important;top:0 !important;left:0 !important;background: rgb(0, 0, 0) !important;background: rgba(0, 0, 0, 0.6) !important;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000);-ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000)";');

        // label with input and submit button
        var labels = form.getElementsByTagName('label');
        if (labels.length == 0) {
            var label = document.createElement('label');
            label.setAttribute('for', 'podname');
            label.innerHTML = 'Pod Name: http://';
            form.appendChild(label);
            var podname = document.createElement('input');
            podname.setAttribute('type', 'text');
            podname.setAttribute('name', 'podname');
            label.appendChild(podname);

            // close button
            var close = document.createElement('a');
            close.setAttribute('href', 'javascript:;');
            close.onclick = function () {
                for (var i = 0; i < form.childNodes.length; i++) {
                    form.removeChild(form.childNodes[i]);
                }
                // fix remove all label childs at the same time
                form.removeChild(close);
                container.setAttribute('style', 'display:none !important');
            }
            close.setAttribute('style', 'display:block !important');
            close.innerHTML = 'Close';
            form.appendChild(close);

            podname.select();
            podname.onkeyup = function () {
                var buttons = form.getElementsByTagName('button');
                if (podname.textLength != 0 && buttons.length == 0) {
                    var button = document.createElement('button');
                    button.setAttribute('type', 'submit');
                    button.setAttribute('name', 'submit');
                    button.innerHTML = 'Submit';
                    label.appendChild(button);
                } else if (podname.textLength == 0) {
                    label.removeChild(buttons[0]);
                }
            }
        } else {
            form.removeChild(labels[0]);
        }
	}

    // handle form validation and iframe
	form.onsubmit = function() {
		var iframes = form.getElementsByTagName('iframe');
		if ( iframes.length != 0 ) {
			iframes[0].parentNode.removeChild( iframes[0] );
		}
		var label = form.getElementsByTagName('label');
		var podurl = "https://" + label[0].childNodes[1].value + "/bookmarklet?url=" + encodeURIComponent(window.location.href) + "&amp;title=" + encodeURIComponent(document.title) + "&amp;notes=" + encodeURIComponent('' + (window.getSelection ? window.getSelection() : document.getSelection ? document.getSelection() : document.selection.createRange().text)) + "&amp;v=1&amp;";
		// TODO: check if url/bookmarklet and url/.well-known/host-meta exist
		var iframe = document.createElement( 'iframe' );
		iframe.setAttribute( 'name', 'iframe' );
		iframe.setAttribute( 'src', podurl );
        iframe.setAttribute('style', 'width: 700px !important;height: 490px !important;border: 0;');
		form.appendChild( iframe );
		return false;
	}
	
}) ();
