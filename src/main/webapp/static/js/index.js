function focusbind(){
	//对象&变量 缓存
	var $tab = $("#tabs"),
		$ul = $tab.find("ul"),
		$li = $ul.children(),
		$nav = $("<nav>"),
		li_len = $li.length,
		li_w = $li.eq(0).width();

	//容器 初始化
	$li.css({
		"float" : "left",
		"width" : li_w
	})
	.each(function(i){
		var str = i == 0 ? "<i class=\"cur\">" : "<i>";
		$nav.append(str);
	});
	$nav.appendTo($tab);
	$li.eq(0).clone().appendTo($ul);
	$li.eq(-1).clone().css("marginLeft",-li_w).prependTo($ul);
	$ul.css("float","left").width(li_w * $ul.children().length);

	//切换 方法
	var eventOff,startX,clientX,
		index = 0,
		eventMaxWidth = li_w,
		objStatus = {},
		eventTo,
		time=5000,
		tab = {
			//开始
			start : function (event){
				//重置水平位置
				clientX = 0;
				//滑动激活
				eventOff = true;
				//获取鼠标||触点水平坐标
				var touch = event.touches && event.touches[0] || event;
				//记录初始坐标
				startX = touch.clientX;
				//记录切换前对象状态
				objStatus.left = $ul.get(0).style.marginLeft;
				//阻止对象默认行为
				// event.preventDefault();
				console.log("准备切换");
				clearInterval(eventTo);
			},
			//移动
			move : function (event){
				var touch = event.touches && event.touches[0] || event,
					_x = touch.clientX - startX;
				if(eventOff){
					clientX = parseInt(_x/eventMaxWidth * 100);
					$ul.get(0).style.marginLeft = (li_w * clientX / 100) - li_w * index + "px";
					//console.log("滑动进度：" + clientX + "%");
				}
				event.preventDefault();
			},
			//结束
			end : function (event){
				var _clientX = clientX > 0 ? clientX : -(clientX);
				//滑动激活，且滑动百分比超过50
				if(eventOff){
					if(_clientX >= 30){
						index = clientX > 0 ? index - 1 : index + 1;
						tab.to();
						console.log("切换完成");
					}
					else{
						console.log("放弃切换");

						$ul.animate({
							"marginLeft" : objStatus.left
						});
					}
					
					eventOff = false;
				}
				eventTo = setInterval(function(){
					index++;
					tab.to();
				},time);
				// event.preventDefault();
			},
			to:function(){
				var moveCallback;
				objStatus.left = -(li_w * index) + "px";
				//复位
				if(index >= li_len){
					index = 0;
					moveCallback = function(){
						$ul.get(0).style.marginLeft = -(li_w * index) + "px";
					};
				}
				else if(index < 0){
					index = li_len - 1;
					moveCallback = function(){
						$ul.get(0).style.marginLeft = -(li_w * index) + "px";
					};
				}
				$nav.children().eq(index).addClass("cur").siblings().removeClass("cur");
				$ul.animate({
					"marginLeft" : objStatus.left
				},moveCallback);
			}
		};

		eventTo = setInterval(function(){
			index++;
			tab.to();
		},time);

	//触摸事件 注册
	$tab.get(0).addEventListener("touchstart",tab.start,false);
	$tab.get(0).addEventListener("touchmove",tab.move,false);
	$tab.get(0).addEventListener("touchend",tab.end,false);
}

gm.user = gm.user || {};

gm.user.getfocus = function(){
	gm.ad.get("customerLunBoTuId",function(data){
			if(!data){
				$.alert("服务器出错!");
			}
			if(data.code==200){
				var arr = [];

				//如果无数据，则出现默认数据
				if(data.value.length == 0){
					focusbind();
					return;
				}

				$(data.value).each(function(i,o){
					if(o.url){
						o.url =  ' href="'+o["url"]+'"';
					}
					arr.push('<li><b'+o.url+'><img src="'+o["imageUrl"]+'"></b></li>');
				});

				$(".atlas").html(arr.join(""));

				$(".atlas b").ontouch(function(e){
					var href = $(this).attr("href");
					gm.pul.openurl(href);
				},true);
				
				focusbind();
			}else{
				$.alert(data.message);
			}
		});
}

gm.user.closeFrame = function(){

}

$(function(){
	var timer,
		click = 0,
		isDev = gm.para.get(window.location.href,"dev"),
		hostname = window.location.hostname != "admin.hxqydyl.com";

	if(isDev == "1"){
		window.localStorage.setItem("dev","1");
		$.alert("已切换到预发布环境");
	}else if(isDev == "0"){
		window.localStorage.setItem("dev","0");
		$.alert("已切换到正式环境");
	}

	var dev = window.localStorage.getItem("dev");
	if(dev == "1" && !hostname){
		gm.pul.toUrl("http://101.201.150.23:8080/html/index/page.shtml");
	}

	if(hostname){
		$(".in_sf a").attr("href","/html/follow_up/index.shtml");
	}else{
		$(".in_sf").addClass("in_sf_off");
	}
	
	$(".foot a").eq(0).attr("href","javascript:;").ontouch(function(){
		click ++;
		if(click > 10){
			clearTimeout(timer);
			if(hostname){
				$.confirm("切换 - 正式环境",function(){
					window.localStorage.setItem("dev","0");
					gm.pul.toUrl("http://admin.hxqydyl.com/html/index/page.shtml?dev=0");
				});
			}else{
				$.confirm("切换 - 预发布环境",function(){
					window.localStorage.setItem("dev","1");
					gm.pul.toUrl("http://101.201.150.23:8080/html/index/page.shtml?dev=1");
				});
			}
		}
		clearTimeout(timer);
		timer = setInterval(function(){
			if(click > 0){
				click --;
			}else{
				clearTimeout(timer);
			}
		},2000);
	},true);
});