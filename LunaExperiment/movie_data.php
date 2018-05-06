<?php
header("Cache-Control: no-cache,no-store");
header( "Pragma: no-cache" );
header( "Expires: 0" );

include('includes/common.php');
$position=0;
$limit= 15;

if(isset($_POST['scroll'])&&$_POST['scroll']=='true'){
	//die($_GET['scroll']);
	if(isset($_POST['hd'])&&$_POST['hd']=='on'){
		$content_tbl= TBL_HD_CONTENT;
		$episode_tbl= TBL_HD_EPISODE;
		$season_tbl= TBL_HD_SEASON;
		}
	else{
		$content_tbl= TBL_CONTENT;
		$episode_tbl= TBL_EPISODE;
		$season_tbl= TBL_SEASON;
		}
	if(isset($_POST['position'])){
				$position=mysql_prep($_POST['position']);
		}
	if(isset($_POST['limit'])){
				$limit =mysql_prep( $_POST['limit']);
		}	
		
		
	if(isset($_POST['series'])){
		$series =mysql_prep($_POST['series']);
		if(isset($_POST['season'])){
			$season = mysql_prep($_POST['season']);
			
				//te.id, te.name, te.link, te.type
				$query = "SELECT te.*, ts.image FROM ".$episode_tbl." te , ".$season_tbl." ts WHERE 
						te.series LIKE '".$series."' AND te.season = '".$season."' AND ts.series= te.series AND ts.season = te.season
					 ORDER BY te.name LIMIT ".$position.", ".$limit;
				$sql= @mysql_query($query,$con);
				if($sql){
				while ($row = mysql_fetch_array($sql, MYSQL_ASSOC)) {
    					$result[]=$row;
					}
				}
					//print_r($result);
			
			}
			else{
				
				$query = "SELECT * FROM ".$season_tbl." WHERE series LIKE '".$series."' ORDER BY season LIMIT ".$position.", ".$limit;
				$sql= @mysql_query($query,$con);
				if($sql){
				while ($row = mysql_fetch_array($sql, MYSQL_ASSOC)) {
    					$result[]=$row;
					}	
				}
				//print_r($result);
			}
	}
	elseif(isset($_POST['search'])&&$_POST['search']!=''){
			
				$q = mysql_prep('%'.$_POST['search'].'%');
				$c_query = "SELECT COUNT(*) AS total FROM ".$content_tbl." WHERE `order` <> 0 AND name LIKE '".$q."'";
				$c_sql =  @mysql_query($c_query,$con);
				$c_r = @mysql_fetch_array($c_sql);
				$total = $c_r[0];
				//echo $total;
				if($position<$total&&$limit<=($total-$position)){
					$query = "SELECT * FROM ".$content_tbl." WHERE `order` <> 0 AND name LIKE '".$q."' ORDER BY `order` LIMIT ".$position.", ".$limit;
					$sql= @mysql_query($query,$con);
					if($sql){
					while ($row = mysql_fetch_array($sql, MYSQL_ASSOC)) {
    					$result[]=$row;
					}
					}
					//print_r($result);
				}
				elseif($position>=$total){
					$position = $position - $total;
					$query = "SELECT * FROM ".$content_tbl." WHERE `order` = 0 AND name LIKE '".$q."' ORDER BY `imdb` DESC LIMIT ".$position.", ".$limit;
					$sql= @mysql_query($query,$con);
					if($sql){
					while ($row = mysql_fetch_array($sql, MYSQL_ASSOC)) {
    					$result[]=$row;
					}
					}
					
				}
				else{
					$left = $limit-($total-$position);
					$query1 = "SELECT * FROM ".$content_tbl." WHERE `order` <> 0 AND name LIKE '".$q."' ORDER BY `order` LIMIT ".$position.", ".$limit;
					$sql= @mysql_query($query1,$con);
					if($sql){
					while ($row = mysql_fetch_array($sql, MYSQL_ASSOC)) {
    					$result1[]=$row;
					}
					}
					$position=0;
					$query2 = "SELECT * FROM ".$content_tbl." WHERE `order` = 0 AND name LIKE '".$q."' ORDER BY `imdb` DESC LIMIT ".$position.", ".$limit;
					$sql= @mysql_query($query2,$con);
					if($sql){
					while ($row = mysql_fetch_array($sql, MYSQL_ASSOC)) {
    					$result2[]=$row;
					}
					}
					if(!empty($result1)&&!empty($result2)){
					  $result = array_merge($result1, $result2);
					}
					elseif(empty($result1)){
						$result= $result2;
						}
					else{
						$result = $result1;
						}
					}
				

		
		}
	else{
			
				$c_query = "SELECT COUNT(*) AS total FROM ".$content_tbl." WHERE `order` <> 0";
				$sql= @mysql_query($c_query,$con);
					$c_r = @mysql_fetch_array($sql);
				$total = $c_r[0];
				//echo $total;
				if($position<$total&&$limit<=($total-$position)){
					$query = "SELECT * FROM ".$content_tbl." WHERE `order` <> 0 ORDER BY `order` LIMIT ".$position.", ".$limit;
					$sql= @mysql_query($query,$con);
					while ($row = mysql_fetch_array($sql, MYSQL_ASSOC)) {
    					$result[]=$row;
					}
				
					//print_r($result);
					//echo $position;
				}
				elseif($position>=$total){
					$position = $position - $total;
					$query = "SELECT * FROM ".$content_tbl." WHERE `order` = 0 ORDER BY `imdb` DESC LIMIT ".$position.", ".$limit;
					$sql= @mysql_query($query,$con);
					while ($row = mysql_fetch_array($sql, MYSQL_ASSOC)) {
    					$result[]=$row;
					}
					
					
					}
				else{
					$left = $limit-($total-$position);
					$query1 = "SELECT * FROM ".$content_tbl." WHERE `order` <> 0 ORDER BY `order` LIMIT ".$position.", ".$limit;
					$sql= @mysql_query($query1,$con);
					if($sql){
					while ($row = mysql_fetch_array($sql, MYSQL_ASSOC)) {
    					$result1[]=$row;
					}
					}
					$position=0;
					$query2 = "SELECT * FROM ".$content_tbl." WHERE `order` = 0 ORDER BY `imdb` DESC LIMIT ".$position.", ".$left;
					$sql= @mysql_query($query2,$con);
					if($sql){
					while ($row = mysql_fetch_array($sql, MYSQL_ASSOC)) {
    					$result2[]=$row;
					}
					}
					if(!empty($result1)&&!empty($result2)){
					  $result = array_merge($result1, $result2);
					}
					elseif(empty($result1)){
						$result= $result2;
						}
					else{
						$result = $result1;
						}
					}
				
				//echo json_encode(utf8_encode_all($result));
				
			}
			
			echo json_encode(utf8_encode_all($result));
			//print_r($result);
		}
?>