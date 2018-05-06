
function loaded_metadata(){
	//alert('called');
	$('.loading_msg').hide();
	}
function failed(){
	$('.video_messages').html('oops!!.., something went wrong');
	}
function playing(){
	if(window.innerWidth<=640){
	$('.video_messages').append('<div class="buffer_img"><img src="explore_page_imgs/loader.gif"></div>');
	}
}

function progress(el){
	if(Math.round(el.currentTime) >=1){
		$('.video_messages').html('');
		}
	
	}

	
$(document).ready(function(e) {
$.ajaxSetup({ cache: false });
var history_lock=false;
var position = 0, old_position=-1, limit =15 ,limit1= 9,scroll1= true, it = 0, row=0, no_of_item =3;	
if(window.innerWidth<=640&&window.innerWidth>400){no_of_item=2; limit=12; limit1=6;}
if(window.innerWidth<=400){no_of_item=1; limit=8; limit1=4;}
/*
if(Modernizr.video){
			var content=[];
			getPage();
		}
		else{
			$('.download_info_area').hide();
			$('.ct_inner').html('<div class="html5_error">Sorry, we use HTML5 features. Please, update your browser to enjoy our site.</div>');
	}
*/		

$(function()
{
	if(history.pushState){	//alert(History.getCurrentIndex());
    if (History.getCurrentIndex() == 0)
    {
		//alert('working');
		// if(history_lock==false){
		 history_lock=false;
         History.Adapter.trigger(window, 'statechange');
		 //}
    }
	else{
		if(Modernizr.video){
			var content=[];
			getPage();
		}
		else{
			$('.download_info_area').hide();
			$('.ct_inner').html('<div class="html5_error">Sorry, we use HTML5 features. Please, update your browser to enjoy our site.</div>');
			}
		}
	}
	else{
		
		if(Modernizr.video){
			var content=[];
			getPage();
		}
		else{
			$('.download_info_area').hide();
			$('.ct_inner').html('<div class="html5_error">Sorry, we use HTML5 features. Please, update your browser to enjoy our site.</div>');
			}
		
		
		
		}
});



$('.ct_inner').html('');
function escapeHtml(text) {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };

  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}


limit=limit1;
if(history.pushState){
	History.options.disableSuid = true;
	
		(function(window,undefined){
				History.Adapter.bind(window,'statechange',function(){
				 if(history_lock==false){
					// alert('called');
					$('.ct_inner').html('');
					position = 0; limit =15 ;limit1= 9;scroll1= true; it = 0; row=0; no_of_item =3;	
					if(window.innerWidth<=640&&window.innerWidth>400){no_of_item=2; limit=12; limit1=6;}
					if(window.innerWidth<=400){no_of_item=1; limit=8; limit1=4;}
					$('.ct_inner').html('');
					var state= History.getState();
					//alert('hello');
					//alert(state.data.position);
					//$('#search_box').val()=state.data.query;
					if(typeof state.data.scrollpos != 'undefined'){
						limit=limit1;
						//alert(state.data.position);
						//alert('history');	
						position = state.data.position;
						content = state.data.content;
						
						//var results= content.length;
						//alert(JSON.stringify(content));
							var i=1,subtitle;
							//var textToInsert = [];
							$.each(content,function(ind,val){
								//alert(content[ind].name);
								//it++;
				
								if(it%no_of_item==0){
									$('.ct_inner').append('<div class="row_'+(row+1)+'_area row_area" data-row="'+(row+1)+'"><div class="row_'+(row+1)+'_area_inner row_area_inner"></div></div><div class="bottom_section_area bottom_section_area_'+(row+1)+' bottom_section_area_'+(row+1)+'_1" data-row="'+(row+1)+'"><div class="bottom_section_area_inner bottom_section_area_inner_'+(row+1)+' bottom_section_area_inner_'+(row+1)+'_1"><div class="close_section"></div><div class="filler"><div class="video_panel"><video src="" class="luna_player" height="400" controls preload="none"  onloadedmetadata=\'loaded_metadata()\' onerror=\'failed()\'  onPlay=\'playing()\' onTimeUpdate=\'progress(this)\'></video><div class="video_messages"></div></div></div></div></div></div>');
									row++;
									}
									it++;
									if(i>no_of_item){i=1;}
									//$('.row_'+(row)+'_area_inner').append(it);
								 $('.row_'+(row)+'_area_inner').append('<div class="movie_'+(row)+'_'+i+'_area movie_area" data-id="'+val.id+'" data-row="'+(row)+'" data-item="'+it+'" data-type="'+val.type+'"><div class="movie_'+(row)+'_'+i+'_area_inner movie_area_inner" style=\'background:url(\" '+escapeHtml(val.image)+' \") center no-repeat; background-size:cover;\'><div class="play_area" data-id="'+val.id+'" data-row="'+(row)+'" data-item="'+it+'"><div class="play_area_inner"><div class="play_img_area"><div class="play_img"></div></div></div> </div><div class="details_area"><div class="details_area_inner"><div class="name_area">'+val.name+'<div class="dot_area">·</div><div class="tv_area">TV Series</div><div class="tv_area year_area">'+val.year+'</div></div></div></div></div></div>');
								//alert(val.image);
									i++;
								});
								if (History.getCurrentIndex() == 0){
									$(window).scrollTop(0);
								}
								else{$(window).scrollTop(state.data.scrollpos);}
						
						}
						else{
							content=[];
							getPage();
							limit=limit1;
							}
				 }
					
			 });
		})(window);
 	}
		
	
		
//var da = window.location.href.split('#')[1];
//alert(da);
		
function getPage(){
		old_position=position;
		var da = window.location.href.split('?')[1];
		if(typeof da == 'undefined'){da='';}
		//alert(da);
		$.ajax({
		url: "LunaExperiment/movie_data.php",
		type:'post',
		cache: false,
		data: 'position='+position+'&limit='+limit+'&scroll=true&'+'buster='+new Date().getTime()+'&'+da,
		dataType:"json",
		success: function(data){
			//position +=15;
			//alert(JSON.stringify(data));
			//alert('hey');
			if(typeof data[0]!="undefined"){
			var i;	
			var no_of_results=data.length;
			
			position+=no_of_results;
			
			if(limit%no_of_item!=0){
				if(window.innerWidth<=640&&window.innerWidth>400){limit=6;}
				else if(window.innerWidth>640){limit=9;}
				else{limit=4;}
				}
			var i=1;
			
			$.each(data,function(ind,val){		
						if(it%no_of_item==0){
									$('.ct_inner').append('<div class="row_'+(row+1)+'_area row_area" data-row="'+(row+1)+'"><div class="row_'+(row+1)+'_area_inner row_area_inner"></div></div><div class="bottom_section_area bottom_section_area_'+(row+1)+' bottom_section_area_'+(row+1)+'_1" data-row="'+(row+1)+'"><div class="bottom_section_area_inner bottom_section_area_inner_'+(row+1)+' bottom_section_area_inner_'+(row+1)+'_1"><div class="close_section"></div><div class="filler"><div class="video_panel"><video src="" class="luna_player" height="400" controls preload="none" onloadedmetadata=\'loaded_metadata()\'  onerror=\'failed()\'  onPlay=\'playing()\' onTimeUpdate=\'progress(this)\'></video><div class="video_messages"></div></div></div></div></div></div>');
									row++;
									}
									it++;
									//$('.row_'+(row)+'_area_inner').append(it);
									if(i>no_of_item){i=1;}
								 $('.row_'+(row)+'_area_inner').append('<div class="movie_'+(row)+'_'+i+'_area movie_area" data-id="'+val.id+'" data-row="'+(row)+'" data-item="'+it+'" data-type="'+val.type+'"><div class="movie_'+(row)+'_'+i+'_area_inner movie_area_inner" style=\'background:url(\" '+escapeHtml(val.image)+' \") no-repeat center; background-size:cover\'><div class="play_area" data-id="'+val.id+'" data-row="'+(row)+'" data-item="'+it+'"><div class="play_area_inner"><div class="play_img_area"><div class="play_img"></div></div></div> </div><div class="details_area"><div class="details_area_inner"><div class="name_area">'+val.name+'<div class="dot_area">·</div><div class="tv_area">TV Series</div><div class="tv_area year_area">'+val.year+'</div></div></div></div></div></div>');
								 content.push(val);
								 //alert(escapeHtml(val.image));
								 i++;
					});
					
					if((typeof data[0]!="undefined")){
						//alert(data[0]);
						if(data[0].type=='season'||data[0].type=='episode'&&history.pushState){
						//alert('hey');
						
						history_lock=true;
						History.replaceState({'position': position,'scrollpos' : $(window).scrollTop(), 'content' : content},null,'');
						history_lock=false;
						}
						}
			
			//alert(position);
			//$.each($('.row_area'),function(ind,val){ alert($('.row_'+(ind+1)+'_area').find('.movie_area').length);});
			if(($('.header').height()+$('.ct').height()+20)<=screen.height){
				getPage();
				}
			}///
		  }
		});
	 	
	}
		
		
		//$('video').on('loadedmetadata',loaded_metadata);
		function element_in_scroll(elem) {
			var docViewTop = $(window).scrollTop();
			var docViewBottom = docViewTop + $(window).height();
			var elemTop = elem.offset().top;
			var elemBottom = elemTop + elem.height();
			return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
		}
		
		
		$(document).scroll(function(e){
			//History.replaceState({'position': position,'scrollpos' : $(window).scrollTop(), 'content' : content},null,'');
			//$(document).height() - $(window).height()
			//e.preventDefault();
			//handle(scrollTop);
			if  ($(window).scrollTop() == $(document).height() - $(window).height()&&position>=limit){
                       if(position!=old_position){ 
					   getPage();
					  }
                       
                    }
		/*if(element_in_scroll($('.row_'+(row-1)+'_area'))){
					getPage();
			}*/
					
		});
		var prev_sec=0;
		$(document).on('click', '.play_area',function(e){
			e.stopPropagation();
			$('.movie_area').css('border-bottom','none');
			var item_no = $(this).attr('data-item');
			//alert(item_no);
			$('.movie_area[data-item="'+item_no+'"]').css('border-bottom','solid medium whitesmoke');
			var id = $(this).attr('data-id');
			var cur_sec = $(this).attr('data-row');
			//alert(cur_sec);
			var elem={},i;
			for(i=0;i<content.length;i++){
						if(content[i].id==id){
							//alert(v.id);
							elem = content[i];
							break;
							}
						}
			//alert(content[id].name);
			
			//alert(prev_sec);
			if(cur_sec!=prev_sec&&prev_sec!=0){
				//alert(cur_sec);
				
				$('.bottom_section_area_'+prev_sec).slideUp(500,function(){
					var all_video = $('.luna_player');
					all_video.removeAttr('onerror');
					all_video.attr('src','');});
			}
				if(elem.type=='movie'||elem.type=='episode'){
				$('.bottom_section_area_'+cur_sec).slideDown(500,function(){
						var s1 =$('.bottom_section_area').height() + $(this).offset().top - $(window).height() ;
						//alert($(this).height());
						$("html, body").animate( {scrollTop:s1},300);
						
					var video = $(this).find('.luna_player');
					if(typeof elem.subtitle!="undefined"&&elem.subtitle!=""){
									subtitle='<track src="'+elem.subtitle+'" label="English" kind="subtitles" srclang="en-us" default >';
									video.html(subtitle);
						}
					else{
						video.html('');
						}
									
					video.attr({'src': elem.link, 'preload': 'metadata'}).get(0).play();
					$('.video_messages').html('<div class="loading_msg"><img src="explore_page_imgs/balls4.gif" />Loading media, please wait...</div>');
					$('.loading_msg').show();
					video.attr('onerror','failed()');
					prev_sec=cur_sec;
					});
				}
				else{
					//window.location.href = 'explore.php?'+content[id].link;
					if(history.pushState){
						history_lock=true;
						History.replaceState({'position': position,'scrollpos' : $(window).scrollTop(), 'content' : content},null,'');
						history_lock=false;
						//History.pushState({},null,'explore.php?'+elem.link);
						
						History.pushState({},null,'explore.php?'+elem.link);
						}
					else{
						window.location.href = 'explore.php?'+elem.link;
					}
					
				}
			});
		
		
		$(document).on('click','.close_section',function(e){
			e.stopPropagation();
			$('.bottom_section_area').slideUp(500);
			var all_video = $('.luna_player');
			all_video.attr('src','');
			$('.movie_area').css('border-bottom','none');
			});
			
		$(document).on('click','.search_area',function(e){
			e.stopPropagation();
			$('.comment_and_search_area').hide();
			$('.search_and_suggestion').show();
			var searchwidth;
			if(window.innerWidth<=1180&&window.innerWidth>1080){
				searchwidth = '200px';
				}
			else if(window.innerWidth<=1080&&window.innerWidth>=640){
				searchwidth = '90%';
				}
			else if(window.innerWidth<640&&window.innerWidth>=480){
				searchwidth = '85%';
				}
			else if(window.innerWidth<480&&window.innerWidth>=320){
				searchwidth = '80%';
				}
			else if(window.innerWidth<=320){
				searchwidth = '70%';
				}
			else{
				searchwidth = '250px';
				}
			$('.search_box_area').show().animate({width: searchwidth},200,function(){
				$('.suggestion_area').width($(this).width()+18);
				$('.search_box').show().focus();
				$(document).on('click',{'element': $('.search_and_suggestion')},function(e){
					if(click_out(e)!==false){
						$('.search_box').val('').hide();
						$('.search_box_area').css({'width':'20px'});
						$('.search_and_suggestion').hide();
						$('.comment_and_search_area').show();
						$('.suggestion_area').hide();
						//$(document).off('click',{'element': $('.search_box_area')});
						//e.stopPropagation();
						}
					});
				});
			});
			
	
	var searchbox=$('.search_box');
	$('.search_button').click(function(e){
		 $('.suggestion_area').hide();
						//$('#btn_search').click();
					if($.trim(searchbox.val())!=""){
						 if(history.pushState){
							History.replaceState({'position': position,'scrollpos' : $(window).scrollTop(), 'content' : content},null,'');
							History.pushState({},null,'explore.php?search='+searchbox.val());
							//$(document).focus();
							$('.search_box').val('').hide();
							$('.search_box_area').css({'width':'20px'});
							$('.search_and_suggestion').hide();
							$('.comment_and_search_area').show();
							$('.suggestion_area').hide();
							}
						  else{
							  window.location.href = 'explore.php?search='+searchbox.val();
							  }	
					}
					
    	});
	function click_out(e){
		var area = e.data.element;
		if(e.target!==area&&!area.has(e.target).length){
			return true;
			}
		else{return false;}
		}
	var h=0,tem,sug_length;
    $('.search_box').keydown(function(e){
		window.setTimeout(function(){
			if($.trim(searchbox.val())!=""){
			    $('.suggestion_area').show(); 
				if(e.keyCode==13){
					    $('.search_button').click();
					}
				else if(e.keyCode==38||e.keyCode==40){
					if(e.keyCode==40){
						if(h<sug_length){
						h++;
						$('.suggestion_individual_area').css('background','white');
						$('.suggestion_'+h+'_area').css('background','#E9E9E9');
						searchbox.val($('.suggestion_'+h+'_area').attr('data-name'));
						}
						}
					else{
						
						//alert(JSON.stringify(tem));
						//alert(h);
						h--;
						//alert($('.suggestion_'+h+'_area').html());
						if(h!=0){
							if(h<=0){h=sug_length;}
							searchbox.val($('.suggestion_'+h+'_area').attr('data-name'));
						}else{
							
							searchbox.val(tem);
							}
						$('.suggestion_individual_area').css('background','white');
						$('.suggestion_'+h+'_area').css('background','#E9E9E9');
						}
						
						
					}
				else{
					h=0;
					tem = searchbox.val();
					$('.suggestion_area_inner').html('');
					$.ajax({
						url: "LunaExperiment/movie_data.php",
						data:"scroll=true&limit=5&search="+searchbox.val(),
						type:"post",
						dataType:"json",
						cache:false,
						success: function(data){
							//alert(data.length);
							if(typeof data[0] !="undefined"){
							$('.suggestion_area_inner').html('');
							i=0;
							sug_length=data.length;
							$.each(data,function(ind,val){
								//alert(content[ind].name);
								//it++;
								i++;
								$('.suggestion_area_inner').append('<div class="suggestion_'+i+'_area suggestion_individual_area" data-sug="'+i+'" data-name="'+escapeHtml(val.name)+'"><p class="suggestion_'+i+'_word suggestion_individual_word">'+escapeHtml(val.name)+'</p></div>');
								});
								
							  }
							  else{
								  $('.suggestion_area_inner').append('<div class="suggestion_null_area suggestion_individual_area" data-sug="null" data-name="null"><p class="suggestion_null_word suggestion_individual_word">no results found</p></div>');
								  }
							}
						});
						
					}
			}
			else{
				$('.suggestion_area_inner').html('');
				$('.suggestion_area').hide();
			}
		},10);
	});
	$(document).on('hover','.suggestion_individual_area',function(e) {
		
						$('.suggestion_individual_area').css('background','white');
						$(this).css('background','#E9E9E9');
						h = $(this).attr('data-sug');
						//searchbox.val($(this).attr('data-name'));
						
		});
	$(document).on('click','.suggestion_individual_area',function(e) {
		//e.stopPropagation();
        var name = $(this).attr('data-name');
		//alert(name);
		if(name!='null'){
		if(history.pushState){
							history_lock=true;
							History.replaceState({'position': position,'scrollpos' : $(window).scrollTop(), 'content' : content},null,'');
							history_lock=false;
							History.pushState({},null,'explore.php?search='+name);
							//$(document).focus();
							$('.search_box').val('');
							$('.search_box_area').css({'width':'20px'}).hide();
							$('.comment_and_search_area').show();
							$('.suggestion_area').hide();
							$('.search_and_suggestion').hide();
							}
						  else{
							  window.location.href = 'explore.php?search='+name;
							  }	
		}
    });
	
	
	var comment_node = $('.comment_box_area').html();
	var comment_message, error_msg='please write something..';		
	$('.comment_area').click(function(e) {
         //alert('hello');
		$('.background_and_comment_area').fadeIn(200);
      });
	  
	$('.black_background, .comment_close_button_area').on('click',function(e) {
        $('.background_and_comment_area').fadeOut(200,function(){
			$('.comment_box_area').html(comment_node);
			});
		
    });
	$(document).on('click','.comment_close_button',function(e) {
		if($(this).attr('data-type')=='close'){
        $('.background_and_comment_area').fadeOut(200,function(){
			$('.comment_box_area').html(comment_node);
			});
		
		}
		else{
			$('.comment_box_area').html(comment_node);
			$('.comment_box').val(comment_message).focus();
			}
		
    });
	$(document).on('focus','.comment_box',function(){
		$('.comment_box').css({'border':'thin solid black', 'color':'black'});
		if($.trim($('.comment_box').val())==error_msg){
			$('.comment_box').val('');
			}
		
		});
	$(document).on('click','.comment_submit',function(e) {
        //e.preventDefault();
		//alert('hey');
		comment_message = $.trim($('.comment_box').val());
		if(comment_message!==""&&comment_message!=error_msg){
			$.ajax({
				url : 'LunaExperiment/comment.php',
				type: "post",
				data: "comment="+comment_message,
				success: function(){
					$('.comment_box_area_inner').html('<div class="comment_note"><p>Thank you for your feedback</p><button data-type="close" class="comment_close_button">Close</button></div>');
					
					},
				error: function(){
					$('.comment_box_area_inner').html('<div class="comment_note"><p>Oops! Sorry, but for some reason, we are not able to post the comment.<br><br> If it is urgent, you can message or call us at (+91) 7669678977.</p><button data-type="go_back" class="comment_close_button">go back</button></div>');

					}
			});
			
		}
		else{
			$('.comment_box').val(error_msg);
			$('.comment_box').css({'border':'thin solid red', 'color':'red'});
			}
    });
	
	function resize(ni,lm1,lm2){
		var i=1;
							$('.ct_inner').html('');
							no_of_item=ni; it = 0; row=0;
							if(position%no_of_item!=0){limit=lm1;}
							else{limit=lm2;}
									//var textToInsert = [];
							$.each(content,function(ind,val){
								//alert(content[ind].name);
								//it++;
								if(it%no_of_item==0){
									$('.ct_inner').append('<div class="row_'+(row+1)+'_area row_area" data-row="'+(row+1)+'"><div class="row_'+(row+1)+'_area_inner row_area_inner"></div></div><div class="bottom_section_area bottom_section_area_'+(row+1)+' bottom_section_area_'+(row+1)+'_1" data-row="'+(row+1)+'"><div class="bottom_section_area_inner bottom_section_area_inner_'+(row+1)+' bottom_section_area_inner_'+(row+1)+'_1"><div class="close_section"></div><div class="filler"><div class="video_panel"><video src="" class="luna_player" width="640" height="400" controls preload="none"  onloadedmetadata=\'loaded_metadata()\'></video><div class="video_messages"></div></div></div></div></div></div>');
									row++;
									}
									it++;
									if(i>no_of_item){i=1;}
									//$('.row_'+(row)+'_area_inner').append(it);
								 $('.row_'+(row)+'_area_inner').append('<div class="movie_'+(row)+'_'+i+'_area movie_area" data-id="'+val.id+'" data-row="'+(row)+'" data-item="'+it+'" data-type="'+val.type+'"><div class="movie_'+(row)+'_'+i+'_area_inner movie_area_inner" style=\'background:url(\" '+escapeHtml(val.image)+' \") center no-repeat; background-size:cover;\'><div class="play_area" data-id="'+val.id+'" data-row="'+(row)+'" data-item="'+it+'"><div class="play_area_inner"><div class="play_img_area"><div class="play_img"></div></div></div> </div><div class="details_area"><div class="details_area_inner"><div class="name_area">'+val.name+'</div><div class="dot_area">·</div><div class="tv_area">TV Series</div></div></div></div></div>');
								//alert(val.image);
									i++;
								});
		}
	function doOnOrientationChange(){
		if(window.innerWidth<=640&&window.innerWidth>400){
					if(no_of_item==3){
							resize(2,9,6);
						}
					else if(no_of_item==1){
							resize(2,9,6);
						}
					
					}
				else if(window.innerWidth>640){
						
						if(no_of_item==2){
							resize(3,8,9);
						}
						else if(no_of_item==1){
							resize(3,8,9);
							}
					}
				else if(window.innerWidth<=400){
					if(no_of_item==2){
							resize(1,4,4);
						}
					else if(no_of_item==3){
							resize(1,4,4);
						}
					}
		
		}

	if(typeof window.orientation!= 'undefined'){
		 window.addEventListener('orientationchange', doOnOrientationChange);
		}
		else{
			$(window).resize(function(e){
				if(window.innerWidth<=640&&window.innerWidth>400){
					if(no_of_item==3){
							resize(2,9,6);
						}
					else if(no_of_item==1){
							resize(2,9,6);
						}
					
					}
				else if(window.innerWidth>640){
						
						if(no_of_item==2){
							resize(3,8,9);
						}
						else if(no_of_item==1){
							resize(3,8,9);
							}
					}
				else if(window.innerWidth<=400){
					if(no_of_item==2){
							resize(1,4,4);
						}
					else if(no_of_item==3){
							resize(1,4,4);
						}
					}
				});
			}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
		
});