<?php 
include('../includes/common.php');
$file = fopen('content_list.txt','r') or die('unable to open');
if($file){
	while(!feof($file)){
		$line =  fgets($file);
		//echo $line;
		$string_array = preg_split('/,\s+/',$line);
		//print_r($string_array);
		$data_array = array();
		for($i=0; $i<count($string_array); $i++){
			$small_arr = explode('# ',$string_array[$i]);
			$data_array[trim($small_arr[0]," \t\r\n")]= trim($small_arr[1]," \t\r\n");
			//echo $small_arr[0].' '.$small_arr[1];
		}
		if(!array_key_exists('order',$data_array)){
			$query = "INSERT INTO content_sd( type, name , image, imdb, year, link) VALUES( :type, :name, 
			:image, :imdb, :year, :link)";
			try{
			$sql=$con->prepare($query);
			$sql->execute(array(':type' =>$data_array['type'], ':name' => $data_array['name'], ':image' =>$data_array['image'], 
			':imdb' => $data_array['imdb'], ':year' => $data_array['year'], ':link' => $data_array['link'] ));
			}catch(PDOException $e){
				throw new Exception('Fetch failed : '.$e->getMessage());
				}
			//$sql=@mysql_query($query, $con);
			
			//echo('exists');
		}
		elseif(array_key_exists('order',$data_array)&&!array_key_exists('subtitle',$data_array)){
			$query = "INSERT INTO content_sd( type, name , image, imdb, year, link, `order`) VALUES( :type, :name, 
			:image, :imdb, :year, :link , :order)";
			try{
			$sql=$con->prepare($query);
			$sql->execute(array(':type'=>$data_array['type'], ':name' => $data_array['name'], ':image'=>$data_array['image'], 
			':imdb' => $data_array['imdb'], ':year' => $data_array['year'], ':link' => $data_array['link'] , ':order' => $data_array['order'] ));
			}catch(PDOException $e){
				throw new Exception('Fetch failed : '.$e->getMessage());
				}
			}
		else{
			$query = "INSERT INTO content_sd( type, name , image, imdb, year, link, `order`, subtitle) VALUES( :type, :name, 
			:image, :imdb, :year, :link , :order, :subtitle)";
			try{
			$sql=$con->prepare($query);
			$sql->execute(array(':type'=>$data_array['type'], ':name' => $data_array['name'], ':image'=>$data_array['image'], 
			':imdb' => $data_array['imdb'], ':year' => $data_array['year'], ':link' => $data_array['link'] , ':order' => $data_array['order'], ':subtitle' => $data_array['subtitle']  ));
			}catch(PDOException $e){
				throw new Exception('Fetch failed : '.$e->getMessage());
				}
			//echo $data_array['order'];
		}
		
		
		
	}
	
}
?>