/*
* @Author: Administrator
* @Date:   2017-10-28 22:27:15
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-30 16:37:18
*/
// 页面的行为：
// 1.点击左右按钮，图片切换，span标签切换
// 2.鼠标经过span标签，图片切换，span标签切换
// 3.自动轮播，图片切换，span标签切换
// 4.鼠标放在banner区域，banner图片不动，移出banner区域，banner图片继续切换，span标签切换

// 关于span标签切换效果：
// a.点击左右按钮，相应span标签加上背景色
// b.鼠标经过span，span标签加上背景色
// c.自动切换效果中span标签加上背景色			
// 因为多次调用span标签切换效果，将span标签加上背景色效果定义成公共函数
// 图片在点击左右按钮时。图片的切换方向不同，所以不能定义成公共函数
	$(function(){
		var w = $('.banner .img_box img').width();//图片宽度
		console.log(w);

		var i =1;
		var count = $('.banner .img_box img').length;
		console.log(count);

		// 1.定义span切换函数,函数内部规定span标签做的效果
		function change_span(n){
			$('.banner .points span').eq(n).addClass('current').siblings('span').removeClass('current');

		}
		change_span(0);

		// 2.点击右按钮：显示下一张图片，span标签状态切换
		$('.banner .right_btn').click(function(){
			// 盒子在上次移动基础上又往左移动盒子宽度
			// 左移：margin-left -= w;		(margin-left = margin-left -w;)
			if(!$('.banner .img_box').is(':animated')){
			if(i < count){
				$('.banner .img_box').animate({marginLeft:'-='+w});
				i++;
			}else{
				// 显示第四张
				$('.banner .img_box').animate({marginLeft:0});
				i =1;
			}
			document.title = i;
			change_span(i-1);
			}
		})
		
		// 3.点击左按钮：显示上一张图片，span状态切换
		$('.banner .left_btn').click(function(){
			// 盒子在上次基础上又多往右移动一个盒子宽度
			// 右移：margin-left += w;		(margin-left = margin-left +w;)
			if(!$('.banner .img_box').is(":animated")){
				if(i>1){
					// 显示第四张
					$('.banner .img_box').animate({marginLeft:'+='+w});
					i--;
				}else{
					// 第一张图，再点击左按钮，显示第四张，即img_box向左移动2000px,即margin-left:
					// $('.banner .img_box').animate({marginLeft:'-3000px'});
					$('.banner .img_box').animate({marginLeft:-(count-1)*w});
					i = 4;
				}
				document.title = i;
				change_span(i-1);
			}
		})

		// 4.自动轮播效果：计时器
		// 页面自动轮播：图片自动向后一张图片切换，
		// 即间隔一段时间后调用一次 点击右按钮 向后切换图片的事件
	 
		var t = setInterval("$('.banner .right_btn').click()", 3000);
		// setInterval(函数名/事件,间隔时间)
		

		// 5.鼠标放在banner中，图片不动;    鼠标进入：mouseover
		// 	 鼠标移出，图片继续切换;		移出鼠标：mouseout

		$('.banner').mouseover(function(event) {
			/* Act on the event */
			// 停止计时器
			clearInterval(t);
		});
		$('.banner').mouseout(function(event) {
			/* Act on the event */
			// 移出鼠标，图片轮播，将自动轮播效果重新再赋值给t，因为之前计时器被停止了
			t = setInterval("$('.banner .right_left').click()", 3000);
		});



	})
	
	

	