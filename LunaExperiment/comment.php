
<?php

include('includes/common.php');
date_default_timezone_set("Asia/Calcutta");
if(isset($_POST['comment'])&&$_POST['comment']!=''){
	$comment = mysql_prep($_POST['comment']);
	$date = mysql_prep(date("d/m/Y"));
	$time = mysql_prep(date("h:i:s a"));
	//echo "$date <br> $time";
	
	$query="INSERT INTO comment(comment,`date`, `time`) VALUES('".$comment."', '".$date."', '".$time."')";
	$sql= @mysql_query($query,$con);
	
	
	}

?>