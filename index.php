<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>luna_experiment-first_page</title>
<link rel="stylesheet" type="text/css" href="css/luna_experiment.css" />
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<script>
$(document).ready(function(e) {
    
	$('.vote_button').click(function(e) {
		var val = $('.vote_button').val();
        $.ajax({
			url:"LunaExperiment/vote.php",
			data: "vote="+val,
			type:"post",
			success: function(){
				if(val==1){
				$('.vote_button').addClass('vote_button_active').html('voted');
				$('.vote_button').val(0);
				}
				else{
					$('.vote_button').removeClass('vote_button_active').html('vote');
					$('.vote_button').val(1);
					}
				}
			});
    });
	
});

</script>
</head>

<body>
	<div class="whole_stuff">
    	<div class="background_girl">
        	<div class="background_girl_inner">
            		<div class="website_name_area">
                    	<p class="website_name_word">THE LUNA EXPERIMENT</p>
                        <p class="initiative_word">online upto 20th Dec.</p>
                    </div>
                    <div class="start_button_area_top_one">
                         <button class="start_button_top_one" onClick="location.href = 'explore.php'">Explore the website</button>
                     </div>
            </div>
        </div>
    	<div class="background_titles">
        	<div class="background_titles_inner">
            			<div class="sample_area">
                            <p class="sample_word">This is a sample, just for experimental basis</p>
                            <p class="only_word"></p>
                        </div>
                        <div class="full_website_area">
                            <p class="full_website_word">If you'd like to have the full website in India, vote.</p>
                        </div>
                        <div class="vote_button_area">
                        	<button class="vote_button" name="vote" value="1">Vote</button>
                          
                        </div>
                        <div class="ten_lakh_area">
                            <p class="ten_lakh_word">If we get more than 10 lakh votes, we will launch the website on 31st Dec, 2015.</p>
                        </div>
                         <div class="start_button_area">
                         	<button class="start_button" onClick="location.href = 'explore.php'">Explore the website</button>
                   		 </div>
            </div>
        </div>
       
    </div>
</body>
</html>
