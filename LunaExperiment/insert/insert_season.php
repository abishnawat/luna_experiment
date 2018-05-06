<?php 
include('../includes/common.php');
$file = fopen('season_hd_list.txt','r') or die('unable to open');
if($file){
	while(!feof($file)){
		$line =  fgets($file);
		//echo $line;
		$string_array = preg_split('/,\s+/',$line);
		//print_r($string_array);
		$data_array = array();
		for($i=0; $i<count($string_array); $i++){
			$small_arr = explode('# ',$string_array[$i]);
			$data_array[trim($small_arr[0]," \t")]= trim($small_arr[1]," \t");
			//echo $small_arr[0].' '.$small_arr[1];
		}
		
			$query = "INSERT INTO season_hd( type, name , image, season, series, link) VALUES( :type, :name, 
			:image, :season, :series, :link )";
			try{
			$sql=$con->prepare($query);
			$sql->execute(array(':type' =>$data_array['type'], ':name' => $data_array['name'], ':image' =>$data_array['image'], 
			':season' => $data_array['season'], ':series' => $data_array['series'], ':link' => $data_array['link'] ));
			}catch(PDOException $e){
				throw new Exception('Fetch failed : '.$e->getMessage());
				}
			//$sql=@mysql_query($query, $con);
			
			//echo('exists');
		
		
	}
	
}
?>