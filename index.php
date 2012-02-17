<?php
/*
Description: This is a project for a Diaspora's sharing button working with every pod in the world.
Author: Simon Alberny
Version: 0.1
Author URI: http://www.simounet.net/
License: GPL2

TODO: add document.write() to place the button at a specific location
*/

/*
    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License, version 2, as
    published by the Free Software Foundation.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/
?>

<!DOCTYPE html>
<html lang='fr'>
<head>
	<meta charset='utf-8'>
	<title>Diaspora Share Button</title>
	<script type='text/javascript' src='http://code.jquery.com/jquery-1.7.1.min.js'></script>
	<script type='text/javascript'>
		// TODO: check compatibility with IE
		document.onreadystatechange = function () {
			// TODO: check compatibility with IE
			if (document.readyState == "complete") {
				var widget = document.createElement( 'div' );
				document.body.appendChild( widget );
				var target = document.createElement( 'a' );
				target.setAttribute( 'style', 'display:block' );
				target.setAttribute( 'title', 'Share this at Diaspora!' );

				var img = document.createElement( 'img' );
				img.setAttribute( 'src', './images/diaspora-share-button.png' );
				img.setAttribute( 'alt', 'Share this at Diaspora!' );
				target.appendChild( img );
				widget.appendChild( target );

				var form = document.createElement( 'form' );
				form.setAttribute( 'method', 'get' );
				widget.appendChild( form );

				target.onclick = function() {
					var podname = target.getElementsByTagName('input');
					if ( podname.length == 0 ) {
						var label = document.createElement( 'label' );
						label.setAttribute( 'for', 'podname' );
						label.innerHTML = 'Pod Name: http://';
						form.appendChild( label );
						var podname = document.createElement( 'input' );
						podname.setAttribute( 'type', 'text' );
						podname.setAttribute( 'name', 'podname' );
						label.appendChild( podname );
						podname.onkeyup = function() {
							alert( 'coco' );
						};
					}
				}

			}
		}

		/* onkeyup

							if (document.getElementById('submit') == null && document.getElementById('podname').value != '') {
								var e = document.createElement('p');
								e.innerHTML = '<input id="submit" type="submit" value="Submit" name="submit">';

							}
		*/


				/*
					$('#form').submit(function() {
						var pod = $("#podname").val();
						$("#input").append("<iframe name='iframe' frameborder='0' src='https://" + pod + "/bookmarklet?url=" + encodeURIComponent(window.location.href) + "&amp;title=" + encodeURIComponent(document.title) + "&amp;notes=" + encodeURIComponent('' + (window.getSelection ? window.getSelection() : document.getSelection ? document.getSelection() : document.selection.createRange().text)) + "&amp;v=1&amp;' allowTransparency='true' width='700' height='490'></iframe>");
						return false;
					});
				};
			}
		}
		*/
	</script>
</head>

<body>
</body>
</html>
