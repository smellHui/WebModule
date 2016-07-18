$(document).ready(function(){

	//获得任务列表
		
	
	// 跳转到在线咨询
	$("#zkcoll").bind({
		touchend:function(){
			var _xx = $("#my_task #zkcoll span").html();
			gm.pul.toUrl("/html/task/online_consultation.shtml?type=0&unread="+_xx);
		}
	});
	// 跳转到电话咨询
	$("#sfxx").bind({
		touchend:function(){
			var _xx = $("#my_task #sfxx span").html();
			gm.pul.toUrl("/html/task/phone_consultation.shtml?type=1&unread="+_xx);
		}
	});
	// 跳转到预约加号
	$("#hjyy").bind({
		touchend:function(){
			var _xx = $("#my_task #hjyy span").html();
			gm.pul.toUrl("/html/task/booking_plus.shtml?type=2&unread="+_xx);
		}
	});
	// 跳转到私人医生
	$("#srys").bind({
		touchend:function(){
			var _xx = $("#my_task #srys span").html();
			gm.pul.toUrl("/html/task/private_doctor.shtml?type=2&unread="+_xx);
		}
	});
// -----------------------------------------------------
	// 预约加号 未处理
	$("#reservation .no_answer li").bind({
		touchend:function(){
			gm.pul.toUrl("/html/task/plus_details.shtml");
		} 
	});


	// 进入咨询页面
	$("#online_advisory li").bind({
		touchend:function(){
			gm.pul.toUrl("/html/task/consultation_page.shtml");
		}
	});
});
gm.task = gm.task || {};

// 快捷回复.
gm.task.quick_reply = function(){
	// 添加新的快捷回复
	$("#quick_reply dt.tj_kjhf").bind({
		touchend:function(){
			$(".tcsjob").show();
		} 
	});
	$("#quick_reply .tcsjob .icon-xxx").bind({
		touchend:function(){
			$(".tcsjob").hide();
		} 
	});
}
// 在线咨询.
gm.task.online_consultation = function(){
	// 列表切换
	$("#online_advisory .no_reply p").bind({
		touchend:function(){
			var r = $(this).index();
			console.log(r);

			$("#online_advisory .state p").removeClass("scjs");
			$(this).addClass("scjs");

			var _type = gm.para.get(window.location.href,"type");
			var _unread = gm.para.get(window.location.href,"unread");
			gm.user.getConsultRecordMSG(_type,0);
		}
	});
	$("#online_advisory .off_reply p").bind({
		touchend:function(){
			$("#online_advisory .state p").removeClass("scjs");
			$(this).addClass("scjs");

			var _type = gm.para.get(window.location.href,"type");
			var _unread = gm.para.get(window.location.href,"unread");
			gm.user.getConsultRecordMSG(_type,1);
		} 
	});
}
// 在线咨询-咨询聊天页面
gm.task.consultation_page = function(){

}
// 预约加号.
gm.task.booking_plus = function(){
	// 电话咨询&预约加号  列表切换
	$(".no_handle p").bind({
		touchend:function(){
			$(".state p").removeClass("scjs");
			$(this).addClass("scjs");
			$(".message ul").hide();
			$("ul.no_answer").show();


			gm.user.getConsultRecordMSG(2,0);
		} 
	});
	$(".off_handle p").bind({
		touchend:function(){
			$(".state p").removeClass("scjs");
			$(this).addClass("scjs");
			$(".message ul").hide();
			$("ul.has_answer").show();
			gm.user.getConsultRecordMSG(2,1);
		} 
	});

	$(".finish p").bind({
		touchend:function(){
			$(".state p").removeClass("scjs");
			$(this).addClass("scjs");
			$(".message ul").hide();
			$("ul.doucuns").show();
			gm.user.getConsultRecordMSG(2,3);
		} 
	});
};

//电话咨询页面效果绑定
gm.task.phone_consultation = function(_type){

	// 电话咨询&预约加号  列表切换
	$(".no_handle p").bind({
		touchend:function(){
			$(".state p").removeClass("scjs");
			$(this).addClass("scjs");
			$(".message ul").hide();
			$("ul.no_answer").show();
		} 
	});
	$(".off_handle p").bind({
		touchend:function(){
			$(".state p").removeClass("scjs");
			$(this).addClass("scjs");
			$(".message ul").hide();
			$("ul.has_answer").show();
		} 
	});
	$(".finish p").bind({
		touchend:function(){
			$(".state p").removeClass("scjs");
			$(this).addClass("scjs");
			$(".message ul").hide();
			$("ul.doucuns").show();
		} 
	});
	var _loading = new mask("loading");
	_loading.show();
	$.getDate({
		page:"doctor",
		inter:"getOrderList",
		data:{orderType:_type,stateType:"0",doctorUuid:gm.user.getDoctor()},
		callback:function(data){
			_loading.hide();
			if(!data){
				$.alert("服务器出错!");
			}
			if(data.query.success=="1"){
				$("#phone_advisory .soofmut .no_handle .jshd").html(data.relist.length);
				addhtml_0(data,$("#phone_advisory .soofmut .no_answer"));
			}else{
				$.alert(data.query.message);
			}
		}
	});
	$.getDate({
		page:"doctor",
		inter:"getOrderList",
		data:{orderType:_type,stateType:"1",doctorUuid:gm.user.getDoctor()},
		callback:function(data){
			if(!data){
				$.alert("服务器出错!");
			}
			if(data.query.success=="1"){
				addhtml_1(data,$("#phone_advisory .soofmut .has_answer"));
			}else{
				$.alert(data.query.message);
			}
		}
	});
	$.getDate({
		page:"doctor",
		inter:"getOrderList",
		data:{orderType:_type,stateType:"2",doctorUuid:gm.user.getDoctor()},
		callback:function(data){
			if(!data){
				$.alert("服务器出错!");
			}
			if(data.query.success=="1"){
				addhtml_1(data,$("#phone_advisory .soofmut .doucuns"));
			}else{
				$.alert(data.query.message);
			}
		}
	});

	function addhtml_0(data,obj){
		var arr = [];
		if (data.relist.length > 0) {
			$("#phone_advisory .soofmut .no_handle .jshd").css("opacity",1);
		}
		$(data.relist).each(function(i,o){
			o.imgUrl = (o.imgUrl || (o.sex == "1" ? window.___defaultImage_p_man : window.___defaultImage_p_woman));
			o.sex = (o["sex"] == 1?'<i class="icon-boy"></i>':'<i class="icon-girl"></i>');
			o.button = (o["state"] == 3 ? '<button>审核</button></div>' : '');
			var tmp = '<li>\
				<div class="newszu" orderMainUuid="{orderMainUuid}"><p class="date">{bookTime} {startTime}</p><div class="head_portrait"><img src="{imgUrl}"></div>\
			<div class="nagent"><div class="duof"><h3>{realName} {sex}<span>年龄：{age}岁</span>{button}<p class="comment">{illnessDescription}</p></div></div></li>';
			// o.startTime = o.startTime < 10 ? "0" + o.startTime : o.startTime;console.log(o.startTime)
			arr.push(gm.replace(tmp,o));
		});
		obj.html(arr.join(""))
			.find(".newszu").ontouch(function(){
				// var _tourl = _type == 2 ? "private_doctor_details" : "to_consult_why";
				// gm.pul.toUrl("/html/task/" + _tourl + ".shtml?orderMainUuid=" + $(this).attr("orderMainUuid") + "&returnurl=" + window.location.href);
			})
			.find("button").ontouch(function(){
				var _orderMainUuid = $(this).closest(".newszu").attr("orderMainUuid");
				$.confirm({
					"val" : "确定通过审核么？",
					"passText" : "通过",
					"passCallback" : function(){
						$.getDate({
							page:"doctor",
							inter:"checkOrder",
							data:{state:1,orderMainUuid:_orderMainUuid},
							callback:function(data){
								if(!data){
									$.alert("服务器出错!");
								}
								if(data.query.success=="1"){
									$.alert({
										"val" : "已通过审核成功",
										"type" : "flash",
										"callback" : function(){
											window.location.href = window.location.href;
										}
									});
								}else{
									$.alert(data.query.message);
								}
							}
						});
					},
					"cancelText" : "不通过",
					"cancelCallback" : function(){
						var _tourl = _type == 2 ? "private_doctor_details" : "to_consult_why";
						gm.pul.toUrl("/html/task/" + _tourl + ".shtml?orderMainUuid=" + _orderMainUuid + "&returnurl=" + window.location.href);
					}
				});
			},true);
	};

	function addhtml_1(data,obj){
		var arr = [];
		$(data.relist).each(function(i,o){
			o.imgUrl = (o.imgUrl || (o.sex == "1" ? window.___defaultImage_p_man : window.___defaultImage_p_woman));
			o.sex = (o["sex"] == 1?'<i class="icon-boy"></i>':'<i class="icon-girl"></i>');
			o.button = (o["state"] == 3 ? '<button>审核</button></div>' : '');
			var tmp = '<li>\
				<div class="newszu" orderMainUuid="{orderMainUuid}">\
					<p class="date">{bookTime} {startTime}</p>\
					<div class="head_portrait"><img src="{imgUrl}"></div>\
					<div class="nagent">\
						<div class="duof">\
							<h3>{realName}{sex}<span>年龄：{age}岁</span></h3>\
						</div>\
						<p class="comment">{illnessDescription}</p>\
					</div>\
				</div>\
				</li>';
			arr.push(gm.replace(tmp,o));
		});
		obj.html(arr.join(""));
	};
};

gm.task.plus_details = function(){
	var _customerUuid = gm.para.get(window.location.href,"customerUuid");
	var _consultRecordUuid = gm.para.get(window.location.href,"consultRecordUuid");
	$(".right_but").bind({
		touchend:function(){
			$.getDate({
				page:"doctor",
				inter:"updateConsultRecordPlusState",
				data:{consultRecordUuid:_consultRecordUuid,state:"1"},
				callback:function(data){
					if(!data){
						$.alert("服务器出错!");
					}
					if(data.query.success=="1"){
						$.alert({
							val:"同意加号成功!",
							timer:1500,
							type:"flash",
							callback:function(){
								gm.pul.returnurl();
								//gm.pul.toUrl( '/html/task/booking_plus.shtml?type=2&unread=0')
							}
						});
					}else{
						$.alert(data.query.message);
					}
				}
			})
		}
	});

	$(".left_but").bind({
		touchend:function(){
			$.confirm("您确定拒绝加号吗？",function(){
				$.getDate({
					page:"doctor",
					inter:"updateConsultRecordPlusState",
					data:{consultRecordUuid:_consultRecordUuid,state:"2"},
					callback:function(data){
						if(!data){
							$.alert("服务器出错!");
						}
						if(data.query.success=="1"){
							$.alert({
								val:"拒绝加号成功!",
								timer:1500,
								type:"flash",
								callback:function(){
									gm.pul.returnurl();
									//gm.pul.toUrl( '/html/task/booking_plus.shtml?type=2&unread=0')
								}
							});
						}else{
							$.alert(data.query.message);
						}
					}
				})
			})
		}
	})
	
	$.getDate({
		page:"doctor",
		inter:"getConsultRecord",
		data:{consultRecordUuid:_consultRecordUuid,customerUuid:_customerUuid},
		callback:function(data){
			if(!data){
				$.alert("服务器出错!");
			}
			if(data.query.success=="1"){
				$(".jbxx dd").eq(0).find("span").html(data.customerName);
				if (data.sex == "1") {
					$(".jbxx dd").eq(1).find("span").html("男");
				}else{
					$(".jbxx dd").eq(1).find("span").html("女");
				}
				$(".jbxx dd").eq(2).find("span").html(data.age);

				$(".jzxx dd").eq(0).find("span").html(data.orderIllness);
				$(".jzxx dd").eq(1).find("span").html(data.orderReason);
				$(".jzxx dd").eq(2).find("span").html(data.orderIllness);

				$(".jbms dd").html(data.illnessDescription);
			}else{
				$.alert(data.query.message);
			}
		}
	});
};

// 预约加号-同意加号-删除
gm.task.agreed_plus_delete = function(){
	$(".on,.off").settingOnOff(function(d){
		console.log(d);

		//缺失 加号 提醒我开关设置

		//缺失 加号 提醒患者

	});
	
	//缺失 加号 提醒时间设定
}

gm.user = gm.user || {};


//获取任务（咨询）数量
gm.user.getServiceStaffMission = function(data){
	$.getDate({
		page:"doctor",
		inter:"getServiceStaffMission",
		data:{doctorUuid:gm.user.getDoctor()},
		callback:function(data){
			if(!data){
				$.alert("服务器出错!");
			}
			if(data.query.success=="1"){
				if (data.onlineNum) {
					$("#my_task .uziop #zkcoll span").html(data.onlineNum);
					$("#my_task .uziop #zkcoll span").show();
				};
				if (data.telNum) {
					$("#my_task .uziop #sfxx span").html(data.telNum);
					$("#my_task .uziop #sfxx span").show();
				};
				if (data.orderNum) {
					$("#my_task .uziop #hjyy span").html(data.orderNum);
					$("#my_task .uziop #hjyy span").show();
				};
				if (data.perNum) {
					$("#my_task .uziop #srys span").html(data.perNum);
					$("#my_task .uziop #srys span").show();
				};
			}else{
				$.alert(data.query.message);
			}
		}
	})
}

//获取任务（咨询）列表
gm.user.getConsultRecordMSG = function(_type,reply){
	window._loading = new mask("loading");
	window._loading.show();
	var data = {type:_type,doctorUuid:gm.user.getDoctor()};
	if(reply != undefined){data.reply = reply;}
	$.getDate({
		page:"doctor",
		inter:"getConsultRecordMSG",
		data:data,
		callback:function(data){
			if(!data){
				$.alert("服务器出错!");
			}
			setTimeout(function(){window._loading&&window._loading.hide();},200);
			if(data.query.success=="1"){
				var arr = [];
				var darr = [];
				var oarr = [];
				if(_type == 0) {

					var arr = [];
					var tmp = '<li>\
							<a href="/html/task/consultation_page.shtml?from=online_consultation&customerUuid={customerUuid}"></a>\
							<div class="newszu"><p class="date">{createTime}</p>\
							<div class="head_portrait"><img src="{iconImage}"></div><div class="nagent"><div class="duof">\
							<h3>{realName} {sex}</h3><span>{age}</span></div><p class="comment">{content}</p></div></div></li>';

					$(data.relist).each(function(i,o){
						o.iconImage = (o.iconImage || (o.sex == "1" ? window.___defaultImage_p_man : window.___defaultImage_p_woman));
						o.sex = (o["sex"] == 1?'<i class="icon-boy"></i>':'<i class="icon-girl"></i>');
						o.age = (o.age==""?"":"年龄：" + o.age + "岁");

						arr.push(gm.replace(tmp,o));
					});
					
					if (data.relist.length > 0 && reply==0) {
						$("#online_advisory .soofmut .no_reply .jshd").html(data.relist.length);
						$("#online_advisory .soofmut .no_reply .jshd").css("opacity",1);
					};

					$("#online_advisory .soofmut .no_answer").html(arr.join(""));
				}else if(_type == 1){
					var arr = [];

					$(data.relist).each(function(i,o){
						o.iconImage = (o.iconImage || (o.sex == "1" ? window.___defaultImage_p_man : window.___defaultImage_p_woman));
						o.sex = (o["sex"] == 1?'<i class="icon-boy"></i>':'<i class="icon-girl"></i>');

						var tmp = '<li>\
							<a href="/html/task/consultation_page.shtml?from=online_consultation&customerUuid={customerUuid}"></a>\
							<div class="newszu"><p class="date">{createTime}</p><div class="head_portrait"><img src="{iconImage}"></div>\
						<div class="nagent"><div class="duof"><h3>{realName} {sex}<span>年龄：{age}岁</span><button>审核</button></div><p class="comment">{content}</p></div></div></li>';

						switch(o.reply){
							case "0":
								arr.push(gm.replace(tmp,o));
							break;
							case "1":
								darr.push(gm.replace(tmp,o));
							break;
							case "2":
								oarr.push(gm.replace(tmp,o));
							break;
						}
					});
					if (arr.length > 0) {
						$("#phone_advisory .soofmut .no_handle .jshd").html(arr.length);
						$("#phone_advisory .soofmut .no_handle .jshd").css("opacity",1);
					}
					$("#phone_advisory .soofmut .no_answer").html(arr.join(""));
					$("#phone_advisory .soofmut .has_answer").html(darr.join(""));
					$("#phone_advisory .soofmut .doucuns").html(oarr.join(""));
				}else{
					var arr = [];
					$(data.relist).each(function(i,o){
						o.iconImage = (o.iconImage || (o.sex == "1" ? window.___defaultImage_p_man : window.___defaultImage_p_woman));
						o.sex = (o["sex"] == 1?'<i class="icon-boy"></i>':'<i class="icon-girl"></i>');

						var tmp = '<li consultRecordUuid={consultRecordUuid}>\
							<a href="/html/task/plus_details.shtml?from=online_consultation&customerUuid={customerUuid}&consultRecordUuid={consultRecordUuid}"></a>\
							<div class="newszu"><p class="date">{createTime}</p><div class="head_portrait"><img src="{iconImage}"></div>\
							<div class="nagent"><div class="duof"><h3>{realName} {sex}</h3>\
							<span>年龄：{age}岁</span></div><p class="comment">{content}</p></div></div></li>';
						// 未填写名字
						o.realName = (!o["realName"]?'未命名' : o["realName"]);

						switch(o.reply){
							case "":
							case "0":
								arr.push(gm.replace(tmp,o));
							break;
							case "1":
							case "2":
								darr.push(gm.replace(tmp,o));
							break;
							case "3":
								oarr.push(gm.replace(tmp,o));
							break;
						}
					});

					if (arr.length > 0) {
						$("#phone_advisory .soofmut .no_handle .jshd").html(arr.length);
						$("#phone_advisory .soofmut .no_handle .jshd").css("opacity",1);
					}
					
					if(reply == 0){
						$("#reservation .soofmut .no_answer").html(arr.join(""));
					}else if(reply == 1){
						$("#reservation .soofmut .has_answer").html(darr.join(""));
					}else{
						$("#reservation .soofmut .doucuns").html(oarr.join(""));
					}
				}
			}else{
				$.alert(data.query.message);
			}
		}
	});
}
