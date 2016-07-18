$(document).ready(function(){
	$(".alllive li").lectures();
	
	//确定返回状态
	$(".conti div").removeClass("cjj");
	var status = window.location.hash;
	if(status == "#b"){
		$("div .playing").addClass("cjj");
		$(".ensss").siblings().hide();
		$(".ensss").show();
	}else{
		$("div .all").addClass("cjj");
		$(".ensn").siblings().hide();
		$(".ensn").show();
	}
	
	$(".conti div").bind({
		touchend:function(){
			$(".conti div").removeClass("cjj");
			$(this).addClass("cjj");

			var _p = $(this).index();

			if (_p == 0) {
				$(".ensn").siblings().hide();
				$(".ensn").show();
				window.location.hash = "#a";
			}else{
				$(".ensss").siblings().hide();
				$(".ensss").show();
				window.location.hash = "#b";
			}
		}
	});
});



var getvedioimg="";
gm.lecture = gm.lecture || {};

$.fn.lectures = function(){
	var _  = this;

	_.find("i.icon-redstars,i.icon-greystars").bind({
		touchend:function(){
			var _class = $(this).attr("class");

			if(_class == "icon-redstars"){
				_class = "icon-greystars";
			}else{
				_class = "icon-redstars";
			}
			
			$(this).attr("class",_class);
		}
	});
}

gm.lecture.bindVideoList = function(data){
	if(!data){
		$.alert("服务器出错!");
	}
	if(data.query.success=="1"){//(_sex == "1" ? window.___defaultImage_p_man : window.___defaultImage_p_woman)
		var arr = [];
		var arr1 = [];

		var tmp = '<li uuid="{uuid}" favid="{favoriteUuid}"><a href="/html/lecture/playing.shtml?vidoUuid={uuid}"><div class="live">\
			<img src="{img}"></div><div class="text">\
			<p>{userName}-{title}</p><p class="time"><span>{CoMmonCount}</span>评论&nbsp&nbsp&nbsp&nbsp&nbsp<span>{collectNum}</span>收藏</p>\
			</div></a><div class="ics star"><i class="icon-{sc}"></i><i id="mycollectiongray" class="icon-mycollection"></i>\
			</div></li>';
		$(data.relist).each(function(i,o){
			o["sc"] = (o["sc"] == "1"?"redstars":"greystars");//redstars表示已经收藏 ，greystars表示 未收藏
			o.img = o.img || window.___defaultImage;
			o.CoMmonCount=(o.CoMmonCount==undefined ||o.CoMmonCount==null)?"0":o.CoMmonCount;//判断评论字段是否存在
			arr1 : arr.push(gm.replace(tmp,o));
			if(o["videoHot"] == "1")arr1.push(gm.replace(tmp,o));
		});
		//缺失 点击收藏功能
		$(".alllive ul.ensss").html(arr.join(""));
		$(".alllive ul.ensn").html(arr1.join(""));
		//注册收藏
		$(".alllive .icon-redstars,.alllive .icon-greystars").ontouch(function(){
			//判断用户是否登录 
			if(!gm.user.isLoginDoctor()){
				gm.pul.toUrl('goodm://login');
				return;
			}
			var _this = this;
			var doctorname="";
			//取当前对象的父元素的兄弟元素的子元素
			var getdoctorname=$(this).parent().parent().find("a").find(".text").children().eq(0).html();
			var temp=getdoctorname.split('-');
			if(temp)
				doctorname=temp[0];
			if($(this).is(".icon-greystars")){//如果 未收藏 
				var _uuid = $(this).parent().parent().attr("uuid");
				gm.user.addFavorite(_uuid,2,function(favid){
					$(_this).parent().parent().attr("favid",favid);
					$(_this).attr("class","icon-redstars");
					console.log("gggg");
					var result=$(_this).parent().parent().find("a").find(".text").find(".time").find("span").eq(1).html();
					console.log(result);
					$(_this).parent().parent().find("a").find(".text").find(".time").find("span").eq(1).html(++result);
					//$(_this).parent().parent().find("a").find(".text").children("p").get(0).innerHTML = Number($(_this).children("p").get(0).innerHTML) + 1;
				});
			}else{
				var _favid = $(this).parent().parent().attr("favid");
				gm.user.delFavoriteNew(_favid,function(){
					$(_this).parent().parent().attr("favid","");
					$(_this).attr("class","icon-greystars");
					var result=$(_this).parent().parent().find("a").find(".text").find(".time").find("span").eq(1).html();
					console.log(result);
					$(_this).parent().parent().find("a").find(".text").find(".time").find("span").eq(1).html(--result);
				});
			}
			//友盟统计-讲堂收藏
			_czc.push(["_trackEvent","讲堂","收藏",doctorname,'','alllive .icon-greystars']);
		});
		//注册分享
		$(".alllive ul li div .icon-mycollectiongray,.alllive .icon-mycollection").ontouch(function(){
			//判断是否登录
			if(!gm.user.isLoginDoctor()){
				gm.pul.toUrl('goodm://login');
				return;
			}
				var _ = $(this);
				//友盟统计-讲堂分享
				_czc.push(["_trackEvent","讲堂","分享",'','','alllive .icon-mycollection']);
				var p = _.parent().parent();
				var _contentUuid = $(this).parents("li").attr("uuid");

				var obj = {
					title:p.find(".text p").html(),
					desc:p.find(".text p").html(),
					img:p.find("img").attr("src"),
					link:window._interfacePath + "/html/lecture/playing.shtml?vidoUuid=" + _contentUuid
				}
				
				gm.share(obj,function(){
					$.getDate({
						page:"doctor",
						inter:"addDoctorShare",
						data:{contentUuid:_contentUuid,doctorUuid:gm.user.getDoctor()},
						callback:function(data){	}
					});
				});
			}
		);
	}else{
		$.alert(data.query.message);
	}
}

//获取讲堂列表信息
gm.lecture.getVideosByName = function(_name){
	
	$.getDate({
		page:"doctor",
		inter:"getVideosByName",
		data:{"doctorUuid":gm.user.getDoctor(),"name":_name||"","callback":"gm.lecture.bindVideoList"},
		method:"POST",
		dataType:"script"
	});
}


gm.lecture.all_course = function(){
	//获取焦点图
	$.getDateAjax({
		page:"doctor",
		inter:"getPlatformPic",
		data:{adUuid:"platformPicId"},
		callback:function(data){
			if(!data){
				$.alert("服务器出错!");
			}
			if(data.code==200){
				//绑定视频列表
				var arr = [];
				var tmp = '<li>\
					<a{url}><img src="{imageUrl}"></a>\
					<div class="des">\
						<p>{note}</p>\
					</div>\
				</li>';

				if (data.value.length > 0) {
					$(data.value).each(function(i,o){
						 if(o.url){
						 	o.url = ' href="'+o.url+'"'
						 }else{
						 	o.url=""
						 }
						arr.push(gm.replace(tmp,o));
					});
				};

				$(".atlas").html(arr.join(""));
				focusbind();
			}else{
				$.alert(data.message);
			}
		}
	});
}

$.fn.videoComment = function(){
	var _ = this;
	var list = _.find("li");

	var _length = list.length;
	var _index = 1;
	var _pageSize = 2;
	var pagec = Math.ceil(_length / _pageSize);

	function toPage(to){
		if(to == pagec){
			$(".load").hide();
		}

		for(var i=0;i<_pageSize;i++){
			$(list[to-i-0]).show();
			$(list[to-i-1]).show();
		}
	}

	_.find(".load").bind({
		"touchend":function(){
			to(_index++);
		}
	});

	toPage(_index++);
}

/*gm.lecture.videoComment = function(data){
	if(!data){
		$.alert("服务器出错!"); 
	}
	if(data.query.success=="1"){
		$(".load").hide();
		if(data.videoComment){
			var _tmp = '<li class="comcon">\
					<p>{questionerName}<span class="time">{questionerTime}</span></p>\
					<p class="content">{questionerContext}</p>\
				</li>';
			var _arr = [];
			$(data.videoComment).each(function(i,o){
				_arr.push(gm.replace(_tmp,o));
			});
			$(".comment ul").html(_arr.join(''));
		}else{
			// $(".load").hide();
		}
	}else{
		$.alert(data.query.message);
	}
}*/
var pageno=0;
var totalpage=0;
//添加评论
gm.lecture.videoComment = function(){
	var vidoUuid = gm.para.get(window.location.href,"vidoUuid");
	$.getDate({
		page:"doctor",
		inter:"getCommunicationList",
		data:{videoUuid:vidoUuid,userType:1,Uuid:gm.user.getDoctor()},
		callback:function(data){
			if(!data){
				$.alert("服务器出错!"); 
			}
			if(data.query.success=="1"){
				if(data.videoComment){
					var _tmp = '<li class="comcon">\
								<div class="comcon_content">\
									<div class="comcon_header">\
										<img src={image} />\
									</div>\
									<div class="comcon_text">\
										<span class="">{questionerTime}</span>\
										<p class="">{questionerContext}</div>\
								</div>\
							</li>';
					var _arr = [];
					$(data.videoComment).each(function(i,o){
						if(o.headImg != ""){
							if(o.headImg.small.length > 0){
								o.image = o.headImg.small;
							}else if(o.headImg.large.length > 0){
								o.image = o.headImg.large;
							}else{
								o.image = "../../static/imgs/man.jpg";
							}
						}else{
							o.image = "../../static/imgs/man.jpg";
						}
						
						_arr.push(gm.replace(_tmp,o));
					});
					$(".lecture_comment ul").html(_arr.join(''));
					totalpage=data.totalPage;//总页数
					pageno=data.pageNo;//当前页面数
					if(parseInt(totalpage)==parseInt(pageno)){//没有内容了
						$("#play_loadMoreComment").html();
						$(".lecture_comment ul").css({"padding-bottom":"1rem"});
						$(".load").hide();
					}else{
						loadMoreComment(vidoUuid,20,parseInt(pageno));
					}
				}else{
					$(".load").hide();
				}
			}else{
				$.alert(data.query.message);
			}
		}
	})
}
/**
 * 加载更多评论
 * 
 */
function loadMoreComment(vidoUuid,pageCount,pageNo){
	$("#play_loadMoreComment").bind({
		touchend:function(){
			++pageNo;
			var doctorUuid ="";
			var userType = 1;
			var from=gm.para.get(window.location.href,"from");
			if(from=="refer_soul"){//是否为患者
				doctorUuid=gm.patient.getPatient();
				userType = 2;
			}else{//医生
				doctorUuid=gm.user.getDoctor();
				userType = 1;
			}
			$.getDate({
				page:"doctor",
				inter:"getCommunicationList",
				data:{videoUuid:vidoUuid,userType:userType,Uuid:doctorUuid,pageCount:pageCount,pageNo:pageNo},
				callback:function(data){
					if(!data){
						$.alert("服务器出错!"); 
					}
					if(data.query.success=="1"){
						if(data.videoComment){
							var _tmp = '<li class="comcon">\
								<div class="comcon_content">\
								<div class="comcon_header">\
									<img src={image} />\
								</div>\
								<div class="comcon_text">\
									<span class="">{questionerTime}</span>\
									<p class="">{questionerContext}</div>\
							</div>\
						</li>';
							var _arr = [];
							$(data.videoComment).each(function(i,o){
								if(o.headImg != ""){
									if(o.headImg.small.length > 0){
										o.image = o.headImg.small;
									}else if(o.headImg.large.length > 0){
										o.image = o.headImg.large;
									}else{
										o.image = "../../static/imgs/man.jpg";
									}
								}else{
									o.image = "../../static/imgs/man.jpg";
								}
								_arr.push(gm.replace(_tmp,o));
							});
							$(".lecture_comment ul").append(_arr.join(''));
						}else{
							//$(".load").hide();
						}
						var totalPage=data.totalPage;
						if(totalPage!=undefined && totalPage!=null){
							if(pageNo>=parseInt(totalPage)){//没有内容了
								$("#play_loadMoreComment").unbind();
								$(".load").hide();
								$(".lecture_comment ul").css({"padding-bottom":"1rem"});
							}else{
								pageNo++;
							}
						}else
							pageNo++;
					}else{
						$.alert(data.query.message);
					}
				}
			});
		}
	});
}
//获取视频信息
gm.lecture.playing = function(){
	var vidoUuid = gm.para.get(window.location.href,"vidoUuid");
	var doctorUuid ="";
	var userType = 1;
	var from=gm.para.get(window.location.href,"from");
	if(from=="refer_soul"){//是否为患者
		doctorUuid=gm.patient.getPatient();
		userType = 2;
	}else{//医生
		doctorUuid=gm.user.getDoctor();
		userType = 1;
	}
	$.getDate({
		page:"doctor",
		inter:"getVideoByUuid",
		data:{videoUuid:vidoUuid,userType:userType,doctorUuid:doctorUuid},
		callback:function(data){
			if(!data){
				$.alert("服务器出错!"); 
			}
			if(data.query.success=="1"){
				//绑定视频列表
				var arr = [];
				getvedioimg=data.videoInfo.img;
				var tmp = '<h2>{title}</h2>\
						<p>时间： <span class="color">{createTime}</span></p>\
						<p>主讲人：<span class="color">{userName}</span></p>\
						<p><span class="color">{userSynopsis}</span></p>\
						<p>课程简介：<span class="color">{videoIntroduction}</span></p>';

				var mp4,videoBox,isAndroid = navigator.userAgent.toLocaleLowerCase().indexOf('android') > -1 || navigator.userAgent.toLocaleLowerCase().indexOf('adr') > -1;
				//友盟统计-视频播放量
				_czc.push(["_trackEvent","讲堂","视频播放量",data.videoInfo.userName,'','playing']);
				if(data.videoInfo.videoUrl){
					videoBox = document.createElement("div");
					videoBox.className = "videoBox";
					if(isAndroid &&!isWeiXin()){
						videoBox.style.cssText = "background:#000 url(" + data.videoInfo.img + ") no-repeat;background-size:100%;";
						mp4 = document.createElement("div");
						mp4.style.cssText = "position:absolute;left:50%;top:50%;margin:-.83rem 0 0 -.83rem;width:1.66rem;height:1.66rem;background:url(http://app.hxqydyl.com/imgs/video_play.png) no-repeat;background-size:100%;";
						$(mp4).on("touchend",function(){
							gm.pul.toUrl("goodm://fullPage/"+data.videoInfo.videoUrl+"|"+ window.___currentTime);
							return false;
						});
					}else{
						mp4 = document.createElement("video");
						mp4.id = "video";
						mp4.setAttribute("poster",data.videoInfo.img);
						mp4.setAttribute("src",data.videoInfo.videoUrl);
						mp4.setAttribute("preload",false);
					}
					videoBox.appendChild(mp4);
					// mp4.onplay = function(){
					// 	$.alert(11);
					// 	$(mp4).css({
					// 		"-webkit-transform":"translate3d(0, 0, 0)"
					// 	});
					// };
					// mp4.onloadstart = function(e){
					// 	$.alert("视频开始加载")
					// 	// $.alert(e)
					// };
					// mp4.ondurationchange = function(){
					// 	$.alert("视频的时长已改变");
					// };
					// mp4.onloadedmetadata = function(){
					// 	$.alert("视频的元数据已加载");
					// };
					// mp4.onloadeddata = function(){
					// 	$.alert("前帧的数据是可用的");
					// };
					// mp4.onprogress = function(){
					// 	// $.alert("视频正在下载中");
					// };
					mp4.oncanplay = function(){
						// $.alert("视频已准备好开始播放");
						mp4.controls = true;
						$(mp4).css({
							"-webkit-transform":"translate3d(0, 0, 0)"
						});
					};
					// mp4.oncanplaythrough = function(){
					// 	$.alert("视频能够不停顿地一直播放")
					// };

					window.beforeunload = function(){
						mp4.setAttribute("src","");
						$(videoBox).remove();
						return true;
					};
				}

				$(".video2").html(videoBox);
				$(".intro").html(gm.replace(tmp, data.videoInfo));

				/*gm.lecture.videoComment(data);*/
				

				//gm.pul.setTitle("讲堂-" + data.videoInfo.title);
			}else{
				$.alert(data.query.message);
			}
		}
	});
}

window.___currentTime = 0;
window.___returnfullPage = function(data){
	___currentTime = data.time;
}
function isWeiXin(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}
gm.lecture.getVideoList = function(t,name){
	$.getDate({
		page:"doctor",
		inter:"getVideosByName",
		data:{name:name||""},
		method:"POST",
		dataType:"script",
		callback:function(data){
			if(!data){
				$.alert("服务器出错!");
			}
			if(data.query.success=="1"){
				//绑定视频列表
				var arr = [];
				var arr1 = [];

				var tmp = '<li>\
					<a href="/html/lecture/playing.shtml">\
						<div class="live">\
							<img src="{img}">\
						</div>\
						<div class="text">\
							<p>{text}</p>\
							<p class="time">{createTime}</p>\
						</div>\
					</a>\
					<div class="ics">\
						<i class="icon-care{gz}">\
							<p class="care">{collectNum}</p>\
						</i>\
						<i class="icon-mycollection"></i>\
					</div>\
				</li>';

				if (data.relist.length > 0) {
					$(data.relist).each(function(i,o){
						if(o["videoHot"]=="1"){
							arr1.push
						}else{
							arr.push('<li>\
								<a href="/html/lecture/playing.shtml?id='+o["url"]+'"><img src="'+o["imageUrl"]+'"></a>\
								<div class="des">\
									<p>'+o[""]+'</p>\
								</div>\
							</li>');
						}
					});
				};
			}else{
				$.alert(data.query.message);
			}
		}
	});
}
//添加评论的回调
gm.lecture.addCommunication = function(data){
	if(!data){
		$.alert("服务器出错!");
	}
	if(data.query.success=="1"){
		$.alert({
			"val" : "提交成功!",
			"type" : "flash",
			"callback" : function(data){
				window._loading && window._loading.hide();
			}
		});
		$(".receive input").val("");

		var vidoUuid = gm.para.get(window.location.href,"vidoUuid");
		$.getDate({
			page:"doctor",
			inter:"getVideoByUuid",
			data:{videoUuid:vidoUuid,userType:1,doctorUuid:gm.user.getDoctor()},
			callback:function(data){
				/*gm.lecture.videoComment(data);*/
				gm.lecture.videoComment();
			}
		});
	}else{
		$.alert(data.query.message);
	}
}
//添加评论
gm.lecture.addPlatformCommunication = function(context,platformUuid){
	var vidoUuid = gm.para.get(window.location.href,"vidoUuid");
	var doctorUuid ="";
	var userType = 1;
	var from=gm.para.get(window.location.href,"from");
	if(from=="refer_soul"){//是否为患者
		doctorUuid=gm.patient.getPatient();
		if(doctorUuid && doctorUuid != "0"){
			doctorUuid = gm.patient.getPatient();
			userType = 2;
		}
	}else{//医生评论
		doctorUuid=gm.user.getDoctor();
		if(doctorUuid && doctorUuid != "0"){
			doctorUuid = gm.patient.getPatient();
			userType = 1;
		}
	}
		
	//alert(vidoUuid);
	$.getDate({
		page:"doctor",
		inter:"addPlatformCommunication",
		data:{doctorUuid:doctorUuid,context:context,platformUuid:vidoUuid,callback:"gm.lecture.addCommunication",userType:userType},
		method:"POST",
		dataType:"script"
	});
}

function focusbind(){
	//对象&变量 缓存
	var $tab = $("#tabs"),
		$ul = $tab.find("ul"),
		$li = $ul.children(),
		$nav = $("<nav>"),
		li_len = $li.length,
		li_w = $li.eq(0).width();console.log(li_w)

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
				// event.preventDefault();
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