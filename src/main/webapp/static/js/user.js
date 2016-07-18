$(document).ready(function(){
	$(".on,.off").settingOnOff(function(d){
		console.log(this);
		//缺失 开通加号,开通图文咨询,开通电话咨询,开通私人信息等设置接口
		// console.log($(this).attr("class"));
	});
	//绑定个人信息

	// 返回首页
	$(".user .fh").bind({
		touchend:function(){
			$(this).parent().parents().removeClass("curpage");
			$("#personal_center").addClass("curpage");
		}
	});

	//退出登录
	$("#set .anbox .btn-zyradius").bind({
		touchend:function(){
			var _submitObj = $(this).parent();
			var _doctorUuid = gm.user.getDoctor();

			$.confirm("您确定要退出登录吗？",function(){
				$.getDate({
					page:_submitObj.attr("page"),
					inter:_submitObj.attr("inter"),
					data:{doctorUuid:_doctorUuid,callback:"gm.user.getout"},
					method:"POST",
					dataType:"json",
					callback:function(data){
						/*if(!data){
							$.alert("服务器出错!");
						}
						if(data.query.success=="1"){
							//$.alert("退出成功！");
							gm.menu.showBottomBar();//显示菜单
							setTimeout(function(){gm.pul.toUrl("goodm://logout");},100);//退出登录 
							localStorage.clear();
						}else{
							$.alert(data.query.message);
						}*/
						gm.menu.showBottomBar();//显示菜单
						setTimeout(function(){gm.pul.toUrl("goodm://logout");},100);//退出登录 
						localStorage.clear();
					}
				});
			});
		}
	});

	//用户提交人个信息
	$("#personal_information #persion_info_bottom button").bind({
		touchend:function(){
			var p_image=$("#persion_image").attr("value");//得到图像 的id
			var persion_state=$("#persion_state").attr("value");//得到状态值
			var nickName=$.trim($("#nickName").val());//真实姓名
			var tem_sex=$("#person_sex .btn-checkbox-a").attr("class").split(' ');//性别
			var person_sex="";
			if(tem_sex[1])
				person_sex="1";
			else
				person_sex="2";
			var person_province=$("#person_city .p").val();//省
			var person_city=$("#person_city .c").val();//城市
			var person_region=$("#person_city .q").val();//区
			var person_hospital=$("#person_hospital span").attr("value");//医院
			var persion_department=$("#persion_department span").attr("value");//科室
			var person_professional=$("#person_professional span").html();//职称
			var tel=$.trim($("#tel").val());//电话号码
			var email=$.trim($("#email").val());//邮箱 
			var person_territory=$("#person_territory").val();//擅长
			var person_synopsis=$("#person_synopsis").val();//个人简介
			var person_certImage=$("#person_certImage").attr("value");//证件id
			//验证必填项
			if(!nickName){
				$.alert("真实姓名不能为空");
				return false;
			}
			var _person_c=$("#person_city span").html();
			if(_person_c=="选择城市"){
				$.alert("城市不能为空");
				return false;
			}
			var _person_hospital=$("#person_hospital span").html();
			if(_person_hospital=="选择医院"){
				$.alert("医院不能为空");
				return false;
			}
			var _persion_department=$("#persion_department span").html();
			if(_persion_department=="选择科室"){
				$.alert("科室不能为空");
				return false;
			}
			var _person_professional=$("#person_professional span").html();
			if(_person_professional=="职称"){
				$.alert("职称不能为空");
				return false;
			}
			if(!tel){
				$.alert("号码不能为空");
				return false;
			}
			/**验证信息**/
			if(email!="")
				if(email && !CheckMail(email)){
					$.alert("请输入有效邮箱");
					return false;
				}
			
			if(person_certImage==undefined ||person_certImage==null){
				$.alert("证件或胸牌不能为空");
				return false;
			}
			//校验用户修改信息是否需要审核7项
			//得到对比真实姓名
			var t_nickName=$("#nickName").attr("data-value");
			var t_sex=$("#person_sex").attr("data-value");
			//对比 所在城市
			var t_p=$("#person_city .p").attr("data-value");
			var t_c=$("#person_city .c").attr("data-value");
			var t_q=$("#person_city .q").attr("data-value");
			//对比 医院
			var t_hospital=$("#person_hospital span").attr("data-value");
			//对比科室
			var t_department=$("#persion_department span").attr("data-value");
			//对比称职
			var t_professional=$("#person_professional span").attr("data-value");
			//对比科室电话
			var t_tel=$("#tel").attr("data-value");
			//对比医生证件
			var t_certImage=$("#person_certImage").attr("data-value");
			
			//原始类型
			var n_sex=$("#person_sex").attr("value");
			//原 所在城市
			var n_p=$("#person_city .p").attr("value");
			var n_c=$("#person_city .c").attr("value");
			var n_q=$("#person_city .q").attr("value");
			//原医院
			var n_hospital=$("#person_hospital span").attr("value");
			//原科室
			var n_department=$("#persion_department span").attr("value");
			//原医生证件
			var n_certImage=$("#person_certImage").attr("value");
			if(persion_state==3)//如果为认证中
				if(nickName==t_nickName && t_sex==n_sex && t_p==n_p && t_c==n_c && 
						t_q==n_q && t_hospital==n_hospital && t_department==n_department &&t_professional==$("#person_professional span").html()&& t_tel==tel &&t_certImage==n_certImage){
					//persion_state=1;//不改变状态
					ServiceStaffMessage();
				}else{
					persion_state=3;//改变状态
					//提示用户信息//您提交了新的资料，需要1-3个工作日重新审核
					$.confirm({
						"val" : "您提交了新的资料，需要1-3个工作日重新审核", //必填项
						"passCallback" : function(){ServiceStaffMessage()}, //必填项
						"passText" : "确认",
						"cancelCallback" : function(){return false;},
						"cancelText" : "取消"
					});
				}
			else
				if(nickName==t_nickName && t_sex==n_sex && t_p==n_p && t_c==n_c && 
						t_q==n_q && t_hospital==n_hospital && t_department==n_department &&t_professional==$("#person_professional span").html()&& t_tel==tel &&t_certImage==n_certImage){
					//persion_state=1;//不改变状态
					ServiceStaffMessage();
				}else{
					persion_state=3;//改变状态
					//提示用户信息//您提交了新的资料，需要1-3个工作日重新审核
					$.confirm({
						"val" : "您提交了新的资料，需要1-3个工作日重新审核", //必填项
						"passCallback" : function(){ServiceStaffMessage()}, //必填项
						"passText" : "确认",
						"cancelCallback" : function(){return false;},
						"cancelText" : "取消"
					});
				}
			function ServiceStaffMessage(){
				$.getDateAjax({
					page:"doctor",
					inter:"insertServiceStaffMessage",
					data:{"uuid":gm.user.getDoctor(),
		    			"sate":persion_state,
		    			"realName":nickName,
		    			"sex":person_sex,
		    			"province":person_province,
		    			"city":person_city,
		    			"region":person_region,
		    			"hospital":person_hospital,
		    			"department":persion_department,
		    			"departmentLine":tel,
		    			"email":email,
		    			"territory":person_territory,
		    			"synopsis":person_synopsis,
		    			"professional":person_professional,
		    			"image":p_image,
						"certImage":person_certImage
		    		},
		    		method:'POST',
		    		callback:function(_data){
		    			window._loading && window._loading.hide(); 
		    			if(_data.code==200){
		    				if(_data.value==1){
		    					$.alert({
		                            "val" : "修改成功",
		                            "callback" : function(){
		                                gm.pul.toUrl('/html/user/index.shtml');
		                            }
		                        });
		    				}
							
						}else if(_data.code==500){
							$.alert(_data.message);
						}else{
							$.alert(_data.message);
						}
		    		}
				});
			}
			
			
		
		}
	})


	// 点击进入 我的收藏
	$("#dmvnw").bind({
		touchend:function(){
			// var _submitObj = $(this).parent();
			// var _doctorUuid = localStorage.getItem("_doctorUuid");

			//获取我的收藏
			
			$("#personal_center").removeClass("curpage");
			$("#my_collection").addClass("curpage");
		}
	});


//验证码
$.fn.verify = function(){
	var _this = this;

	_this.each(function(i,o){
		var _o = o;
		$(o).on("touchend","button",function(){
				//判断有没有填写手机号码
				var _mobile = $("#change_password .nusbag h2 span").text();

				if(_mobile){
					//填写过手机号码，判断手机号码格式
					if(/[\d+]{11}/.test(_mobile)){
						var _submitObj = $(this).parent().parent();

						var _num = 60;
						var timer1 = setInterval(num, 1000);

						function num(){
							_num--;
							if (_num == 0) {
								$(".baobe").html('<button class="btn-def" id="mobilev">获取手机验证码</button>');
								clearInterval(timer1);
							}else{
								$(".baobe").html('<div class="btn-def">等待验证('+_num+')</div>');
							}
						}
						
						$.getDate({
							page:_submitObj.attr("page"),
							inter:_submitObj.attr("inter"),
							data:{mobile:_mobile},
							callback:function(data){
								if(!data){
									$.alert("服务器出错!");
								}
								if(data.query.success){
									window.____captcha = data.captcha;
								}else{
									$.alert(data.query.message);
								}
							}
						})
					}else{
						//失败，手机验证不通过
						$.alert("失败，手机验证不通过")
					}
				}else{
					//没有填写手机号码
						$.alert("没有填写手机号码")
				}
		});		
	});
}



gm.user = gm.user || {};

// 我的收藏
gm.user.my_collection = function(){
	$(".varioustype dd").ontouch(function(){
		if($(this).attr("favtype") == "1"){
			if(gm.para.get(window.location.href,"from")=="collection")
				gm.pul.toUrl( "/html/thedoctorinformation/informationfordetails.shtml?from=collection&contentUuid="+$(this).attr("contentuuid"));
			else
				gm.pul.toUrl( "/html/thedoctorinformation/informationfordetails.shtml?contentUuid="+$(this).attr("contentuuid"));
		}else{
			if(gm.para.get(window.location.href,"from")=="collection")
				gm.pul.toUrl( "/html/thedoctorinformation/informationfordetails.shtml?from=collection&contentUuid="+$(this).attr("contentuuid"));
			else
				gm.pul.toUrl( "/html/thedoctorinformation/informationfordetails.shtml?contentUuid="+$(this).attr("contentuuid"));
		}
	});
}


gm.user.collection_my = function(){
	$.getDate({
		page:"doctor",
		inter:"getcollectMeMSG",
		data:{doctorUuid:gm.user.getDoctor(),messageType:"0"},
		callback:function(data){
			if(!data){
				$.alert("服务器出错!");
			}
			if(data.query.success=="1"){
                if(!data.relist[0]){
                    $.alert({
                        "val" : "暂时没有关注您的人",
                        "callback" : function(){
                            window.history.back();
                        }
                    });
                }
				var arr = [];
				$(data.relist).each(function(i,o){
					arr.push('<li customerUuid="'+o["customerUuid"]+'">\
						<div class="head_portrait"><img src="'+o["image"]+'"></div>\
						<div class="nagent">\
							<div class="duof">\
								<h3>'+o["sendName"]+'<i class="icon-boy"></i></h3>\
								<span>年龄：'+(o["age"] || 0)+'岁</span>\
								<b class="date">'+o["sendTime"]+'</b>\
							</div>\
							<p class="comment">'+o["showContent"]+'</p>\
						</div>\
					</li>');
				})
				$(".newszu").html(arr.join(""));
			}else{
				$.alert(data.query.message);
			}
		}
	});
}

gm.user.online_consult = function(){
	$.getDate({
		page:"doctor",
		inter:"getcollectMeMSG",
		data:{doctorUuid:gm.user.getDoctor(),messageType:"2"},
		callback:function(data){
			if(!data){
				$.alert("服务器出错!");
			}
			if(data.query.success=="1"){
				if(!data.relist || data.relist.length == 0){
					$.alert({
						"val" : "暂时没有系统通知",
						"callback" : function(){
							window.history.back();
						}
					});
				}else{
					var arr = [];
					$(data.relist).each(function(i,o){
						arr.push('<li customerUuid="'+o["customerUuid"]+'">\
							<div class="head_portrait"><img src="'+o["image"]+'"></div>\
							<div class="nagent">\
								<div class="duof">\
									<h3>'+o["sendName"]+'<i class="icon-boy"></i></h3>\
									<span>年龄：'+(o["age"] || 0)+'岁</span>\
									<b class="date">'+o["sendTime"]+'</b>\
								</div>\
								<p class="comment">'+o["showContent"]+'</p>\
							</div>\
						</li>');
					});
					$(".newszu").html(arr.join(""));
				}
			}else{
				$.alert(data.query.message);
			}
		}
	});
}

gm.user.visit_news = function(){
	window._loading = new mask("loading");
	window._loading.show();

	$.getDate({
		page:"doctor",
		inter:"getcollectMeMSG",
		data:{doctorUuid:gm.user.getDoctor(),messageType:"1"},
		callback:function(data){
			if(!data){
				$.alert("服务器出错!");
			}
			if(data.query.success=="1"){
			                if(!data.relist[0]){
			                    $.alert({
			                        "val" : "您暂时没有随访消息",
			                        "callback" : function(){
			                            window.history.back();
			                        }
			                    });
			                }
				var arr = [];
				$(data.relist).each(function(i,o){
					arr.push('<li customerUuid="'+o["customerUuid"]+'">\
						<a href="/html/follow_up/patient_details.shtml?customerUuid='+o["customerUuid"]+'"></a>\
						<div class="head_portrait"><img src="'+o["image"]+'"></div>\
						<div class="nagent">\
							<div class="duof">\
								<h3>'+o["sendName"]+'<i class="icon-boy"></i></h3>\
								<span>年龄：36岁</span>\
								<b class="date">'+o["sendTime"]+'</b>\
							</div>\
							<p class="comment">'+o["showContent"]+'</p>\
						</div>\
					</li>');
				});
				$(".newszu").html(arr.join(""));
				window._loading&&window._loading.hide();
			}else{
				$.alert(data.query.message);
			}
		}
	});
}
//手机端邀请同行的调用，参数为数组
window.___getFriendAddressList = function(data){
	var arr = [];
	$(data).each(function(i,o){
		o = o.replace(/\+86/gi,"");
		o = o.replace(/\s+/gi,"");
		if(o.length == 11){
			arr.push(o);
		}
	});

	$.confirm("确认邀请"+arr.join(",")+"加入好心情吗？",function(){
			$.getDate({
				page:"user",
				inter:"invitePeer",
				data:{doctorUuid:gm.user.getDoctor(),mobiles:arr.join(","),callback:"gm.user.getInvite_peer"},
				method:"POST",
				dataType:"script"
			});
		}
	);
}

gm.user.getInvite_peer = function(data){
	if(!data){
		$.alert("服务器出错!");
	}
	if(data.query.success=="1"){
		$.alert({
			val:"邀请成功.",
			type:"flash",
			timer:1500,
			callback:function(){
				gm.pul.toUrl( "/html/user/index.shtml");
			}
		})
	}else{
		$.alert(data.query.message);
	}
}

//邀请同行
gm.user.invite_peer = function(){
	$(".header_tou").bind({
		touchend:function(){
			gm.pul.toUrl("goodm://openContacts");

			//gm.pul.toUrl("goodm://setTitle/测试");
			//gm.pul.toUrl("goodm://openContacts");
			//缺失 邀请同行
			 /*gm.pul.getmodels(function(data){
			 	$.alert(data);
			 });*/
		}
	})
}

gm.user.message_center = function(){
	$.getDate({
		page:"doctor",
		inter:"getServiceStaffMessage",
		data:{doctorUuid:gm.user.getDoctor()},
		callback:function(data){
			if(!data){
				$.alert("服务器出错!");
			}
			if(data.query.success=="1"){
				if(data.collectMeNum){
					if (data.collectMeNum) {
						$("#zkcoll h2 span").html(data.collectMeNum);
						$("#zkcoll h2 span").show();
					};
					if (data.visitpreceptNum) {
						$("#sfxx h2 span").html(data.visitpreceptNum);
						$("#sfxx h2 span").show();
					};

					if (data.onlineConsultNum) {
						$("#zxzx h2 span").html(data.onlineConsultNum);
						$("#zxzx h2 span").show();
					};
				}
			}else{
				$.alert(data.query.message);
			}
		}
	});
}

gm.user.reservation_course = function(){
	$.getDate({
		page:"doctor",
		inter:"getAllDoctorPlatformApplyList",
		data:{doctorUuid:gm.user.getDoctor()},
		callback:function(data){
			if(!data){
				$.alert("服务器出错!");
			}
			if(data.query.success=="1"){

				var tmp = '<li class="{guoqi}">\
						<a href="/html/lecture/playing.shtml?vidoUuid={vidoUuid}"></a>\
						<span>{vidoName}</span>\
						<i>开讲时间：{startTime}</i>\
						<div class="course_expired">\
							<i class="icon-expired"></i>\
						</div>\
					</li>';
				var arr = [];

				$(data.relist).each(function(i,o){

					o.guoqi = (o.vidoType == 0?"zhezhao":"");

					arr.push(gm.replace(tmp,o));
				});

				$("#reservation_course ul").html(arr.join(''));
			}else{
				$.alert(data.query.message);
			}
		}
	})
}

//获取我的收藏
gm.user.getFavoriteModelList = function(){
	$.getDate({
		page:"doctor",
		inter:"getFavoriteModelList",
		data:{doctorid:gm.user.getDoctor()},
		callback:function(data){
			if(!data){
				$.alert("服务器出错!");
			}
			if(data.relist.length==0){
				$("#my_collection .varioustype dl").html('<p style=font-size:1.0rem>这里是空的，去别去看看.</p>');
				return ;
			}
			if(data.query.success=="1"){
				var arr = [];
					
//				var tmp='<dd contentUuid="{contentUuid}" favoriteUuid="{favoriteUuid}" favType="{favoriteType}"><div class="kua scnut"  page="doctor" inter="delFavorite"><div class="kua_cvnfus"><div class="asbg">\
//				<div class="scvideo"><img src="{imaUrl}"></div><div class="videomz">\
//				<h2>{contentTitle}</h2><p><span>{CoMmonCount}</span>评论&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{collectNum}</span>收藏</p></div><div class="fxicon">\
//					</div></div></div></div>\
//				<div class="kua_scnut" page="doctor" inter="delFavorite"><div class="ndh"><i class="icon-mycoltrash"></i></div></div><a></a></dd>'
				
				$(data.relist).each(function(i,o){
					o.imgUrl = o.imgUrl || "/static/imgs/spimg.png";
					o.creatime = o.creatime || "";
//					arr.push(gm.replace(tmp,o));
					
					var results1 = '<span>'+o.CoMmonCount+'</span>评论&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>'+o.collectNum+'</span>收藏';
					var results2 = '<span>'+o.ContentNum+'</span>收藏';
					var results = o.favoriteType=="2"?results1:results2;
					
					arr.push('<dd contentUuid='+o.contentUuid+' favoriteUuid='+o.favoriteUuid+' favType='+o.favoriteType+'><div class="kua scnut"  page="doctor" inter="delFavorite"><div class="kua_cvnfus"><div class="asbg">\
						<div class="scvideo"><img src='+o.imaUrl+'></div><div class="videomz">\
						<h2>'+o.contentTitle+'</h2><p>'+results+'</p></div><div class="fxicon">\
							</div></div></div></div>\
						<div class="kua_scnut" page="doctor" inter="delFavorite"><div class="ndh"><i class="icon-mycoltrash"></i></div></div><a></a></dd>')
						
				});
				$("#my_collection .varioustype dl").html(arr.join(""));

				$("#my_collection .varioustype dd > div:nth-child(1)").lrTouchMove();
				// 分享
				$("#my_collection").collectnews();
				$(".fxicon .icon-care").ontouch(function(){
					var e = window.event || event; 

					if ( e.stopPropagation ){ //如果提供了事件对象，则这是一个非IE浏览器 
						e.stopPropagation(); 
					}else{ 
					//兼容IE的方式来取消事件冒泡 
						window.event.cancelBubble = true; 
					}
					var obj = $(this).parent().parent().parent().parent().parent();
					var type = "cancel";
					deleteCollect(obj,type);
				});
				$("#my_collection .varioustype dd .ndh").ontouch(function(e){
					var obj = $(this).parent().parent();
					var type = "delete";
					deleteCollect(obj,type);
				},true);
				function deleteCollect(obj,type){
					
					$.confirm("确定要删除吗？",function(){
						$.getDate({
							page:"doctor",
							inter:"delFavorite",
							data:{favoriteUuid:obj.attr("favoriteUuid")},
							callback:function(data){
								if(!data){
									$.alert("服务器出错!");
								}
								if(data.query.success=="1"){
									$.alert({
									    "val" : "删除成功", "type" : "flash" , "callback" : function(){ obj.fadeOut(500); }
									});
								}else{
									$.alert(data.query.message);
								}
							}
						});
					});
					return false;
				}
				
				$(".varioustype dd > div:nth-child(1)").ontouch(function(e){
					var _obj = $(this).parent();
					if($(_obj).attr("favType") == "2"){
						if(gm.para.get(window.location.href,"from")=="collection")
							gm.pul.toUrl("/html/lecture/playing.shtml?from=collection&vidoUuid=" + _obj.attr("contentuuid"));
						else
							gm.pul.toUrl("/html/lecture/playing.shtml?vidoUuid=" + _obj.attr("contentuuid"));
					}else{
						if(gm.para.get(window.location.href,"from")=="collection")
							gm.pul.toUrl("/html/thedoctorinformation/informationfordetails.shtml?from=collection&contentUuid="+_obj.attr("contentuuid"));	
						else
							gm.pul.toUrl("/html/thedoctorinformation/informationfordetails.shtml?contentUuid="+_obj.attr("contentuuid"));	
					}
				},false);
			}else{
				$.alert(data.query.message);
			}
		}
	});
}

});
