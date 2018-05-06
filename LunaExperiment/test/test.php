<?php 
 header('Access-Control-Allow-Origin: *');  
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Untitled Document</title>
<script src="../js/jquery.min.js"></script>
<script>
$(document).ready(function(e) {
$('.container').load('http://123movies.to/');    
});

</script>
<style>
	.container{
		width: 640px;
		height: 480px;
		border:thin solid;
		}
</style>
</head>

<body>
<div class="container"> </div>
</body>
</html>
