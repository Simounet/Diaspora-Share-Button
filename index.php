<!DOCTYPE html>
<html lang='fr'>
<head>
	<meta charset='utf-8'>
	<title>Diaspora Share Button</title>
	<script type='text/javascript' src='http://code.jquery.com/jquery-1.7.1.min.js'></script>
	<script type='text/javascript'>
		$(document).ready(function() {
			$("#target").click(function() {
				if ($("#podname").length == 0) {
					$("#input").append("<label for='podname'>Pod Name:</label> http://<input type='text' name='podname' id='podname'>");
				}
				
				$("#podname").keyup( function() {
					if ($("#submit").length == 0) {
						$("#input").append("<p><input id ='submit' type='submit' value='Submit' name='submit'></p>");
					}
				});
				
				$('#form').submit(function() {
					var pod = $("#podname").val();
				    $("#input").append("<iframe name='iframe' frameborder='0' src='https://" + pod + "/bookmarklet?url=" + encodeURIComponent(window.location.href) + "&amp;title=" + encodeURIComponent(document.title) + "&amp;notes=" + encodeURIComponent('' + (window.getSelection ? window.getSelection() : document.getSelection ? document.getSelection() : document.selection.createRange().text)) + "&amp;v=1&amp;' allowTransparency='true' width='700' height='490'></iframe>");
				    return false;
				});
			});
		});
	</script>
</head>

<body>
	<div id="diaspora-button-box">
		<div id="target" title="Share this at Diaspora!"><img alt="img_button" src="./images/diaspora-share-button.png" /></div>
		<form action="#" method="get" id="form">
			<div id="input"></div>
		</form>
	</div>
</body>
</html>