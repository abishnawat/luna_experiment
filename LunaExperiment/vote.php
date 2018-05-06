
<?php

include('includes/common.php');
date_default_timezone_set("Asia/Calcutta");
if(isset($_POST['vote'])&&$_POST['vote']!=''){
	$vote= mysql_prep($_POST['vote']);
	$date = mysql_prep(date("d/m/Y"));
	$time = mysql_prep(date("h:i:s a"));
	//echo "$date <br> $time";
	if(isset($_SERVER['HTTP_X_FORWARDED_FOR']) && $_SERVER['HTTP_X_FORWARTDED_FOR'] != '') {
    $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
	} else {
		$ip= $_SERVER['REMOTE_ADDR'];
	}
	
	$query="INSERT INTO vote(`date`, `time`,`ip`, `vote`) VALUES('".$date."', '".$time."', '".$ip."', '".$vote."')";
	$sql= @mysql_query($query,$con);
	
	}
//header('location: public');
?>