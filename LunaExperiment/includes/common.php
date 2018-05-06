<?php


define('DB_DSN','mysql:host=localhost;dbname=lunaexperiment');
define('USERNAME', 'root' );
define('PASSWORD', '');
define('DATABASE', 'lunaexperiment');
define('TBL_CONTENT', 'content_sd');
define('TBL_SEASON', 'season_sd');
define('TBL_EPISODE', 'episode_sd');
define('TBL_HD_CONTENT', 'content_hd');
define('TBL_HD_SEASON', 'season_hd');
define('TBL_HD_EPISODE', 'episode_hd');


if(!isset($con)){
$con = @mysql_connect('localhost','root','') or die('unable to connect');
$db = @mysql_select_db('lunaexperiment',$con) or die('cannot select db');
}

function utf8_encode_all($dat)
{ 
  if (is_string($dat)) return str_replace(array("\n","\r","\t"),'',utf8_encode($dat)) ; 
  if (!is_array($dat)) return str_replace(array("\n","\r","\t"),'',utf8_encode($dat)) ; 
  $ret = array(); 
  foreach($dat as $i=>$d) $ret[$i] = utf8_encode_all($d); 
  return $ret; 
}

function mysql_prep( $value ) {
	$magic_quotes_active = get_magic_quotes_gpc();
	$new_enough_php = function_exists( "mysql_real_escape_string" );
	if( $new_enough_php ) {
		if( $magic_quotes_active ) { $value = stripslashes( $value ); }
		$value = mysql_real_escape_string( $value );
	} else { 
		if( !$magic_quotes_active ) { $value = addslashes( $value ); }
	}
	return $value;
}

?>