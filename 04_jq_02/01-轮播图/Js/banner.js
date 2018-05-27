/*
* @Author: Administrator
* @Date:   2017-06-22 16:02:45
* @Last Modified by:   Administrator
* @Last Modified time: 2017-12-01 10:34:18
*/


$(function(){
	// 获取banner图宽度
	var w = $(".imgs img").width();console.log(w);
	var i = 1;//图片序号
	var count = $(".imgs img").length;//图片的总数
	document.title = i;
	// 切换原点状态 写成函数,因为多次被使用
	function points(n){
		// 给下标为n的span添加current类,给兄弟节点span移除current类
		$(".points span").eq(n).addClass('current').siblings('span').removeClass('current');
	}
	points(0);




	// 右按钮 ：显示后一张图
	// 每次让 .imgs往左移动1000px
	// 以第一张图片作为观察对象，发现第一张图片最开始在0的位置，点击右按钮，第一张图片到了-1000的位置;
	// 在之前的基础上，第二次点击一次右按钮，第一张图片又从-1000到了-2000,
	// 在上次的基础上，再第三次点击右按钮，第一张图片又从-2000的位置到了-3000的位置
	// 因此，综上可知，（-1000-0）或者[-2000-（-1000）]或者[-3000-（-2000)]
	// 也就是：margin-left = margin-left-1000，即margin-left-=1000
	// 0     -1000
	// -1000 -2000
	// -2000  -3000
	// 在原来基础上又减少1000
	// 第四张图，切换第一张图
	$(".right_btn").click(function(){
		// 现在没有动画在进行 is(":animated") true/false
		if(!$(".imgs").is(":animated")){
			if(i<count){
				$(".imgs").animate({"margin-left":"-="+w});//在上次移动的基础上又向左移动w,写法：-= 
				i++;//图片序号+1
			}else{
				$(".imgs").animate({"margin-left":0});
				i = 1;
			}

			document.title = i;
			points(i-1);
		}

	})





	// 1.左按钮：显示前一张图
	// 以最后一张图片为观察对象，点击左按钮
	// 最开始，第一张图片的位置是0，点击第一次左按钮，最后一张图片的位置变成了1000
	// 在此基础上，再次点击左按钮，最后一张图片从1000变成了2000
	// 在上面基础上，再点击左按钮，最后一张图片从2000变成了3000
	
	// 最后一张图片位置：
	// 0   		1000
	// 1000		2000
	// 2000     3000
	// 在原来基础上加1000
	// 即margin-left=margin-left+1000,也就是margin-left+=1000
	$(".left_btn").click(function(){
		// 现在没有动画在进行 is(":animated") true/false
		if(!$(".imgs").is(":animated")){
			if(i>1){
				$(".imgs").animate({"margin-left":"+="+w});
				i--;//图片序号+1
			}else{
				$(".imgs").animate({"margin-left":-(count-1)*w});
				i = count;
			}

			document.title = i;
			points(i-1);
		}

	})

	// 2.原点：鼠标经过  mouseover
	// 切换原点状态和图片
	$(".points span").mouseover(function(event) {
		if(!$(".imgs").is(":animated")){
			console.log($(this).index());
			// 0 0
			// 1 -1000px,点击第一个原点，显示第一张图片, .imgs盒子向左移1000
			// 2 -2000px,点击第二个原点，显示第二张图片，.imgs盒子向左移2000
			// 3 -3000px,点击第二个原点，显示第二张图片，.imgs盒子向左移3000
			$(".imgs").animate({"margin-left":-w*$(this).index()});
			i = $(this).index() + 1; 
			document.title = i;
			points(i-1);
		}

	});

	// 3.自动轮播效果
		// --刚打开页面，banner图片向右轮播；所以调用向右轮播的函数，即点击右按钮的函数
		// --->调用匿名函数的方法，直接写 $('right_btn').click(),作为常量输出，所以要加引号
	var t = setInterval("$('.right_btn').click()",3000)
	
	// 4.鼠标进入盒子停止轮播	mouseover
	//   移出继续轮播效果		mouseout
	$(".banner_box").mouseover(function(event) {
		clearInterval(t);
	}).mouseout(function(event) {
		t = setInterval("$('.right_btn').click()",3000);
	});
	

})
