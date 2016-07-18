$(function(){
	$("#my_task .ftollcas .setthefontsize").bind({
		touchend:function(){
			$("#my_task .zhuenqw").show();
		}
	});
	$("#my_task .zhuenqw").bind({
		touchend:function(){
			$(this).hide();
		}
	})
});

gm.clinic = gm.clinic || {};

gm.clinic.getWithdraApply = function(){
	$.getDate({
		page:"doctor",
		inter:"getWithdraApply",
		data:{doctorid:gm.user.getDoctor()},
		callback:function(data){
			if(!data){
				$.alert("服务器出错!");
			}
			var arr = [];
			if(data.query.success=="1"){
				

				$(data.relist).each(function(i,o){
					arr.push('<li class="the_remaining" uuid="'+o["uuid"]+'"><div class="geeril"><strong>金额: <i>'+o["applyMoney"]+'</i>元</strong>\
					<p>提现时间:'+o["createTime"]);
					if (o["state"] == 0) {
						arr.push('<i>状态:未处理</i></p></div></div>');
					}else if(o["state"] == 1){
						arr.push('<i>状态:提现成功</i></p></div></div>');
					}else{
						arr.push('<i>状态:提现失败</i></p></div></li>');
					}
				})
			}else if(data.query.success=="0"){
				arr.push('<li class="the_noremaining">'+data.query.message+'</li>');
			}else{
				$.alert(data.query.message);
			}
			$(".kinl_package .ucvnd").html(arr.join(""));
		}
	});
}

gm.clinic.getOrderRouting = function(){
	$.getDate({
		page:"doctor",
		inter:"getOrderRouting",
		data:{doctorid:gm.user.getDoctor()},
		callback:function(data){
			if(!data){
				$.alert("服务器出错!");
			}
			var arr = [];
			if(data.query.success=="1"){
				

				$(data.relist).each(function(i,o){
					arr.push('<li class="the_remaining" uuid="'+o["uuid"]+'"><div class="geeril"><strong>金额: <i>'+o["routPrice"]+'</i>元</strong>\
					<p>收入时间:'+o["routTime"]);
					if (o["incomeType"] == 0) {
						arr.push('<i>类型:电话咨询</i></p></div></div>');
					}else if(o["state"] == 1){
						arr.push('<i>类型:私人医生</i></p></div></div>');
					}else if(o["incomeType"] == 2){
						arr.push('<i>类型:加号</i></p></div></div>');
					}else{
						arr.push('<i>类型:图文咨询</i></p></div></li>');
					}
				})
				
			}else if(data.query.success=="0"){
				arr.push('<li class="the_noremaining">'+data.query.message+'</li>');
			}else{
				$.alert(data.query.message);
			}
			$(".kinl_package ul").html(arr.join(""));
		}
	});
}

$.fn.billnav = function(){
	var _ = this;

	_.find(".incomestasy").bind({
		touchend:function(){
			_.removeClass("r");
			//医生收入接口
			gm.clinic.getOrderRouting();
		}
	});

	_.find(".toextractthestate").bind({
		touchend:function(){
			if(!$(this).hasClass("r")){
				_.addClass("r");
				//医生提取接口
				gm.clinic.getWithdraApply();
			}
		}
	});
}



//用户账单
gm.clinic.bill = function(){
	var action = gm.para.get(window.location.href,"action");

	console.log(action);

	if(action=="tx"){
		$(".theparcellayer").addClass("r");
		//获取提现数据接口
		gm.clinic.getWithdraApply();
	}

	$(".theparcellayer").billnav();
}

//医生公告
gm.clinic.announcement = function(){
	//获取公告列表

	$.getDate({
		page:"doctor",
		inter:"getAllDoctorNoticeList",
		data:{doctorUuid:gm.user.getDoctor()},
		callback:function(data){
			if(!data){
				$.alert("服务器出错！")
				return;
			}

			if (data.query.success) {
				var arr = [];

				$(data.relist).each(function(i,o){
					arr.push('<li class="tingzhen"><div class="tingzhen_tz">\
						<h2><a href="announcement_details.shtml?noticeUuid='+o["noticeUuid"]+'">'+o["line"]+'</a></h2>\
						<span>'+o["createTime"]+'</span></div><div class="tingzhen_zy">\
						<p>'+o["content"]+'</p>\
						</div></li>');
				});
				$(".thene_cement ul").html(arr.join(""));
			};
		}
	});
}

//医生公告添加
gm.clinic.announcement_add = function(){

	$(".btn-radius").bind({
		"touchend":function(e){
			e.preventDefault();

			var title = $(".cement_tetx input").val();
			var content = $(".contentof_the textarea").val();
			var time = $(".tminsc input").val();

			if(!title){
				$.alert("请填写公告标题");
				return;
			}

			if(!content){
				$.alert("请填写公告内容");
				return;
			}

			if(!time){
				$.alert("请选择公告时间");
				return;
			}

			var data = {
				title:title,
				content:content,
				time:time
			}

			console.log(data);

			//公告添加
			$.getDate({
				page:"doctor",
				inter:"addDoctorNotice",
				data:{doctorUuid:gm.user.getDoctor(),line:data.title,content:data.content,createTime:data.time},
				method:"POST",
				dataType:"JSON",
				callback:function(data){
					if(!data){
						$.alert("服务器出错！")
						return;
					}

					if (data.query.success) {
						$.alert("添加公告成功");

						//发布完成
						// window.location.href = window.location.href;
						history.back();
					};
				}
			});
		}
	})
}

//医生公告详情
gm.clinic.announcement_details = function(){
	//获取公告详情接口
	var _noticeUuid = gm.para.get(window.location.href,"noticeUuid");

	$.getDate({
		page:"doctor",
		inter:"getDoctorNoticeDetail",
		data:{noticeUuid:_noticeUuid},
		callback:function(data){
			if(!data){
				$.alert("服务器出错！")
				return;
			}

			if (data.query.success) {
				$(".tingzhen_tz h2").html(data.relist[0].line);
				$(".tingzhen_tz span").html(data.relist[0].createTime);
				$(".tingztz_notice p").html(data.relist[0].content);
			};
		}
	});

}

//添加银行卡
gm.clinic.card_add = function(){
	//银行卡添加接口
	var _car = "";
	var _b = gm.para.get(window.location.href,"bankCode");

	var _l = "addDoctorBank";

	if (_b) {
		_l = "updateDoctorBank";
	};

	$.getDate({
		page:"doctor",
		inter:"getAllDoctorBank",
		data:{doctorUuid:gm.user.getDoctor()},
		callback:function(data){
			if(!data){
				$.alert("服务器出错！")
				return;
			}

			if (data.query.success) {
				$(data.relist).each(function(i,o){
					if (o["bankCode"] == _b) {
						$(".add_pake .realName input").val(o["realName"]);
						$(".add_pake .ID input").val(o["ID"]);
						$(".add_pake .bankUuid strong").val(o["bankUuid"]);
						$(".add_pake .bankCode input").val(o["bankCode"]);
					};
				})
			};
		}
	});

	var _carselect = {
		"title" : "请选择银行储蓄卡",
		"lists" : [
			{ "id" : "1" , "val" : "农业银行储蓄卡" ,selected:1},
			{ "id" : "2" , "val" : "中国建行银行储蓄卡"},
			{ "id" : "3" , "val" : "工商银行储蓄卡"}
		],
		"backEvent" : null,
		"selectedCallback" : function(msg){
			$(".aidoi strong").html(msg.val);
			$(".aidoi strong").attr("bank",msg.id);
			aidoi.close();
		}
	}

	var aidoi = new selectBar(_carselect); 

	$(".aidoi strong").bind({
		touchend:function(){
			aidoi.open();
		}
	})

	$(".btn-radius").bind({
		touchend:function(e){
			e.preventDefault();

			var cardholder = $(".cardholder").val();
			var identity = $(".identity").val();
			var bank = $(".bank").attr("bank");
			var dank = $(".bank").html();
			var car = $(".car").val();

			//身份证验证
			var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

			//银行卡验证
			var yhk = /^[0-9]*$/;
			if(!cardholder){
				$.alert("请填写持卡人");
				return;
			}

			if(!identity){
				$.alert("请填写身份证号码");
				return;
			}else if(!reg.test(identity)){
				$.alert("请输入正确的身份证号码！");
				return
			}

			if(!bank){
				$.alert("请选择银行");
				return;
			}

			if(!car){
				$.alert("请填写持卡卡号");
				return;
			}else if(!yhk.test(car)){
				$.alert("请输入正确的银行卡号！");
				return
			}

			var data = {
				cardholder:cardholder,
				identity:identity,
				bank:bank,
				car:car,
				dank:dank
			}

			console.log(data);
			//添加银行卡
			$.getDate({
				page:"doctor",
				inter:_l,
				data:{doctorUuid:gm.user.getDoctor(),realName:data.cardholder,ID:data.identity,cardType:data.bank,bankCode:data.car,bankUuid:data.dank,callback:"gm.clinic.asf"},
				method:"POST",
				dataType:"script",
				callback:function(data){
					// console.log(123);
					// history.back();
				}
			});

		}
	});
}

gm.clinic.asf = function(data){
	if(!data){
		$.alert("服务器出错！")
		return;
	}

	if (data.query.success) {
		$.alert("添加银行卡成功");

		//成功后跳转
		// gm.pul.toUrl( this.href);
		history.back();
	};
}

//我的银行卡
gm.clinic.card_select = function(){
	//获取银行卡列表
	$.getDate({
		page:"doctor",
		inter:"getAllDoctorBank",
		data:{doctorUuid:gm.user.getDoctor()},
		callback:function(data){
			if(!data){
				$.alert("服务器出错！")
				return;
			}

			if (data.query.success) {
				var arr = [];
				var cardType_1 = "http://app.hxqydyl.com/imgs/nyyh.jpg";
				var cardType_2 = "http://app.hxqydyl.com/imgs/jsyh.jpg";
				var cardType_3 = "http://app.hxqydyl.com/imgs/gongsyh.jpg";

				if (data.relist.length) {
					$(data.relist).each(function(i,o){

						var str = o["bankCode"];
						str = str.substr(str.length-4);

						arr.push('<li bankCode="'+o["bankCode"]+'" ID="'+o["ID"]+'" cardType="'+o["cardType"]+'" realName="'+o["realName"]+'">\
							<div class="wd_bankcard"><div class="commercial_logo">');

							if (o["cardType"] == 1) {
								arr.push('<img src="'+cardType_1+'">');
							}else if (o["cardType"] == 2) {
								arr.push('<img src="'+cardType_2+'">');
							}else if (o["cardType"] == 3) {
								arr.push('<img src="'+cardType_3+'">');
							}

							arr.push('</div><p>'+o["bankUuid"]+'(尾号'+str+'');
							if (o["cardType"] == 1) {
								arr.push('信用卡)</p>');
							}else{
								arr.push('储蓄卡)</p>');
							}
							arr.push('<i class="icon-gouxuan"></i><div class="kua_s">\
							<div class="ndh ndh1"><i class="icon-grxxn"></i></div>\
							<div class="ndh ndh2"><i class="icon-mycoltrash"></i></div>\
						</div></div></li>');
					});

					$(".liensbalo").html(arr.join(""));
					$(".liensbalo li > div").lrTouchMove();
					$(".addacopy").hide();

					$(".liensbalo li").bind({
						touchend:function(){
							$(".liensbalo li").removeClass("sjs");
							$(this).addClass("sjs");
						}
					});

					$(".liensbalo li .ndh2").bind({
						touchend:function(){
							var _o = $(this).parent().parent().parent().attr("bankCode");

							$.getDate({
								page:"doctor",
								inter:"delDoctorBank",
								data:{doctorUuid:gm.user.getDoctor(),bankCode:_o},
								callback:function(data){
									window.location.href = window.location.href;
								}
							});
						}
					});

					$(".liensbalo li .ndh1").bind({
						touchend:function(){
							var _o = $(this).parent().parent().parent().attr("bankCode");
							gm.pul.toUrl( "card_add.shtml?bankCode="+_o);
						}
					});
				}else{
					$(".dsusa button").hide();
				}
				
				//成功后跳转
				// gm.pul.toUrl( this.href);
			};
		}
	});
	//如果获取银行卡列表为空
	//gm.pul.toUrl("card_null.shtml");

	//选择银行卡后，确定
	$("button.btn-radius").bind({
		touchend:function(e){
			e.preventDefault();
			var _o = $(".liensbalo li.sjs").attr("bankCode");
			if(!_o){
				$.alert("请选择银行卡");
				return false;
			}
			//选择成功后跳转
			gm.pul.toUrl("card_list.shtml?bankCode="+_o);
		}
	});	
}

gm.clinic.card_list = function(){
	var _b = gm.para.get(window.location.href,"bankCode");
	var balance = 0;

	//获取余额
	$.getDate({
		page:"doctor",
		inter:"getAllDoctorIncomeList",
		data:{doctorUuid:gm.user.getDoctor()},
		callback:function(data){
			if(!data){
				$.alert("服务器出错！")
				return;
			}

			if (data.query.success) {
				balance = data.relist[0].accountAmount;
				$(".thebalanceofy span i").html(balance);
			};
		}
	});

	//获取当前银行卡信息
	$.getDate({
		page:"doctor",
		inter:"getAllDoctorBank",
		data:{doctorUuid:gm.user.getDoctor()},
		callback:function(data){
			if(!data){
				$.alert("服务器出错！")
				return;
			}

			if (data.query.success) {
				var cardType_1 = "http://app.hxqydyl.com/imgs/nyyh.jpg";
				var cardType_2 = "http://app.hxqydyl.com/imgs/jsyh.jpg";
				var cardType_3 = "http://app.hxqydyl.com/imgs/gongsyh.jpg";

				$(data.relist).each(function(i,o){

					if (o["bankCode"] == _b) {

						var str = o["bankCode"];
						str = str.substr(str.length-4);
						var _o = "";

						if (o["cardType"] == 1) {
							$(".commercial_logo img").attr("src",cardType_1);
						}else if (o["cardType"] == 2) {
							$(".commercial_logo img").attr("src",cardType_2);
						}else if (o["cardType"] == 3) {
							$(".commercial_logo img").attr("src",cardType_3);
						}

						if (o["cardType"] == 1) {
							_o = "信用卡";
						}else{
							_o = "储蓄卡";
						}
						$(".china_commercial p").html(o["bankUuid"]+"尾号("+str+_o+")");
					};
				});
			};
		}
	});

	//提交提现操作
	$(".clinic_withdrawal button").ontouch(function(){
		var money = $("#money").val();
		if(!money){
			$.alert("请填写提现金额");
			return false;
		}
		if(money < 50){
			$.alert("提现不能低于50￥");
			return false;
		}
		if(money > balance){
			$.alert("余额不足");
			return false;
		}
		//ajax
	});
}

//诊所首页数据绑定
gm.clinic.index = function(){
	//缺失 医生信息接口

	//缺失 医生收入 余额等
	// $(".on,.off").settingOnOff(function(d){
	// 	console.log(this);
	// 	//缺失 开通加号,开通图文咨询,开通电话咨询,开通私人信息等设置接口
	// 	// console.log($(this).attr("class"));

	// 	var _o = $(this).siblings("i").attr("class");
		// if (_o == "icon-byconsulting") {
		// 	$(this).siblings(".icon-byconsulting").attr("class","icon-byconsulting_off")
		// }else if (_o == "icon-byconsulting_off") {
		// 	$(this).siblings(".icon-byconsulting_off").attr("class","icon-byconsulting")
		// }
		// if (_o == "icon-makeanappointment") {
		// 	$(this).siblings(".icon-makeanappointment").attr("class","icon-makeanappointment_off")
		// }else if (_o == "icon-makeanappointment_off") {
		// 	$(this).siblings(".icon-makeanappointment_off").attr("class","icon-makeanappointment")
		// }
		// if (_o == "icon-thephonebyconsulting") {
		// 	$(this).siblings(".icon-thephonebyconsulting").attr("class","icon-thephonebyconsulting_off")
		// }else if (_o == "icon-thephonebyconsulting_off") {
		// 	$(this).siblings(".icon-thephonebyconsulting_off").attr("class","icon-thephonebyconsulting")
		// }
		// if (_o == "icon-privatedoctors") {
		// 	$(this).siblings(".icon-privatedoctors").attr("class","icon-privatedoctors_off")
		// }else if (_o == "icon-privatedoctors_off") {
		// 	$(this).siblings(".icon-privatedoctors_off").attr("class","icon-privatedoctors")
		// }
	// });

	$.getDate({
		page:"doctor",
		inter:"getAllDoctorIncomeList",
		data:{doctorUuid:gm.user.getDoctor()},
		callback:function(data){
			if(!data){
				$.alert("服务器出错！")
				return;
			}

			if (data.query.success) {
				$(".thelist_of .allIncome span").html(data.relist[0].allIncome);
				$(".thelist_of .yesterdayIncome span").html(data.relist[0].yesterdayIncome);
				$(".thelist_of .accountAmount span").html(data.relist[0].accountAmount);
			};
		}
	});

	$.getDate({
		page:"doctor",
		inter:"getDoctorRight",
		data:{doctorid:gm.user.getDoctor()},
		callback:function(data){
			if(!data){
				$.alert("服务器出错！")
				return;
			}

			if (data.query.success) {
				if (data.plus == 1) {
					$(".openthecolumn dl dd").eq(1).find(".off").attr("class","on");
					$(".openthecolumn dl dd").eq(1).find(".icon-makeanappointment_off").attr("class","icon-makeanappointment");
				}
				if (data.teletext == 1) {
					$(".openthecolumn dl dd").eq(0).find(".off").attr("class","on");
					$(".openthecolumn dl dd").eq(0).find(".icon-byconsulting_off").attr("class","icon-byconsulting");
				}
				if (data.phone == 1) {
					$(".openthecolumn dl dd").eq(2).find(".off").attr("class","on");
					$(".openthecolumn dl dd").eq(2).find(".icon-thephonebyconsulting_off").attr("class","icon-thephonebyconsulting");
				}
				if (data.personal == 1) {
					$(".openthecolumn dl dd").eq(3).find(".off").attr("class","on");
					$(".openthecolumn dl dd").eq(3).find(".icon-privatedoctors_off").attr("class","icon-privatedoctors");
				}
			};
		}
	});

	var _pp = {};

	function _setDate(){
		$.getDate({
			page:"doctor",
			inter:"updateDoctorRight",
			data:{doctorid:gm.user.getDoctor(),plus:_pp.plus,teletext:_pp.teletext,phone:_pp.phone,personal:_pp.personal},
			callback:function(data){
				if(!data){
					$.alert("服务器出错！")
					return;
				}

				if (data.query.success) {
					//成功后跳转
					// window.location.href = window.location.href;
				};
			}
		});
	}

	function _zenmewan(){
		$(".on,.off").each(function(i){

			var _o = $(this).parent().parent().attr("packageUuid");
			var _P = $(this).attr("class");
			var pp = "";

			if (_P == "on") {
				pp = 1;
			}else{
				pp = 0;
			}

			_pp[_o] = pp;
		});
		_setDate();
	}

	$(".on,.off").bind({
		touchend:function(){
			var _this = $(this);
			var _o = _this.siblings("i").attr("class");
			if($(this).hasClass("off")){
				if ($(this).attr("data") == 1) {
					_this.attr("class","on");
					$(this).siblings(".icon-byconsulting_off").attr("class","icon-byconsulting");
					gm.user.updateDoctorRight({
						teletext : 1
					});
				}else if($(this).attr("data") == 2) {
					$.getDate({
						page:"doctor",
						inter:"getPlusConfs",
						data:{doctorUuid:gm.user.getDoctor()},
						callback:function(data){
							if(!data){
								$.alert("服务器出错！")
								return;
							}

							if (data.query.success) {
								if (data.retlist.length > 0){
									_this.attr("class","on");
									_this.siblings(".icon-makeanappointment_off").attr("class","icon-makeanappointment")
									_zenmewan();
								}else{
									$.alert("尚未设置!",function(){
										gm.pul.toUrl( '/html/clinic/sheizhi2.shtml');
									});
								}
							}
						}
					});
				}else if($(this).attr("data") == 3){
					$.getDate({
						page:"doctor",
						inter:"getAllTelephoneCounse",
						data:{doctorUuid:gm.user.getDoctor()},
						callback:function(data){
							if(!data){
								$.alert("服务器出错！")
								return;
							}

							if (data.query.success) {
								if (data.relist.length > 0){
									_this.attr("class","on");
									_this.siblings(".icon-thephonebyconsulting_off").attr("class","icon-thephonebyconsulting")
									_zenmewan();
								}else{
									$.alert("尚未设置!");
									setTimeout(function(){gm.pul.toUrl( '/html/clinic/sheizhi4.shtml')},3000);
								}
							}
						}
					});
				}else if($(this).attr("data") == 4){
					$.getDate({
						page:"doctor",
						inter:"getPackageDoctor",
						data:{doctorUuid:gm.user.getDoctor()},
						callback:function(data){
							if(!data){
								$.alert("服务器出错！")
								return;
							}

							if (data.query.success) {
								var arr = 0;
								$(data.reList).each(function(i,o){
									if (o["state"] == "Y") {
										arr ++;
									};
								})
								if (arr > 0){
									_this.attr("class","on");
									_this.siblings(".icon-privatedoctors_off").attr("class","icon-privatedoctors")
									_zenmewan();
								}else{
									$.alert("尚未设置!");
									setTimeout(function(){gm.pul.toUrl( '/html/clinic/kaitong.shtml')},3000);
								}
							}
						}
					});
				}
			}else{
				_this.attr("class","off");
				if (_o == "icon-byconsulting") {
					_this.siblings(".icon-byconsulting").attr("class","icon-byconsulting_off");
					gm.user.updateDoctorRight({
						teletext : 0
					});
				}else{
					if (_o == "icon-makeanappointment") {
						_this.siblings(".icon-makeanappointment").attr("class","icon-makeanappointment_off")
					}
					if (_o == "icon-thephonebyconsulting") {
						_this.siblings(".icon-thephonebyconsulting").attr("class","icon-thephonebyconsulting_off")
					}
					if (_o == "icon-privatedoctors") {
						_this.siblings(".icon-privatedoctors").attr("class","icon-privatedoctors_off")
					}
					_zenmewan();
				}
			}
		}
	})
}

gm.clinic.sheizhi1 = function(){
	//缺失 医生收入 余额等
	$(".on,.off").settingOnOff(function(d){
		console.log(d);
		//缺失 开通加号,开通图文咨询,开通电话咨询,开通私人信息等设置接口

	});

	var _carselect = {
		"title" : "添加出诊时间",
		"lists" : [
			{ "id" : "1" , "val" : "周一" ,selected:1},
			{ "id" : "2" , "val" : "周二"},
			{ "id" : "3" , "val" : "周三"},
			{ "id" : "4" , "val" : "周四"},
			{ "id" : "5" , "val" : "周五"},
			{ "id" : "6" , "val" : "周六"},
			{ "id" : "7" , "val" : "周日"}
		],
		"backEvent" : function(){
			aidoi.close();
		},
		"selectedCallback" : function(msg){

			var _qt = {
				"title" : "添加出诊时间",
				"lists" : [
					{ "id" : "1" , "val" : "全天" ,selected:1},
					{ "id" : "2" , "val" : "上午"},
					{ "id" : "3" , "val" : "下午"}
				],
				"backEvent" : function(){
					aidoi.close();
				},
				"selectedCallback" : function(kdj){
					

					$.getDate({
						page:"doctor",
						inter:"addHomeVisitSet",
						data:{doctorUuid:gm.user.getDoctor(),weekDate:msg.id,timeType:kdj.id,state:"0"},
						callback:function(data){
							if(!data){
								$.alert("服务器出错！")
								return;
							}
							if (data.query.success) {
								gm.clinic.getDoctorClinicDate();
							};
						}
					});
					aidoi.close();
				}
			}
			aidoi.tab(_qt);
		}
	}

	var aidoi = new selectBar(_carselect); 

	$(".cvenpas").bind({
		touchend:function(){
			aidoi.open(_carselect);
		}
	});

	gm.clinic.getDoctorClinicDate();
}

gm.clinic.getDoctorClinicDate = function(){
	$.getDate({
		page:"doctor",
		inter:"getHomeVisitSet",
		data:{doctorUuid:gm.user.getDoctor()},
		callback:function(data){
			if(!data){
				$.alert("服务器出错！")
				return;
			}

			if (data.query.success) {
				var arr = [];

				$(data.relist).each(function(i,o){
					var _d = "";

					if (o["weekDate"] == "1") {
						_d = "一";
					}else if(o["weekDate"] == "2"){
						_d = "二";
					}else if(o["weekDate"] == "3"){
						_d = "三";
					}else if(o["weekDate"] == "4"){
						_d = "四";
					}else if(o["weekDate"] == "5"){
						_d = "五";
					}else if(o["weekDate"] == "6"){
						_d = "六";
					}else{
						_d = "日";
					}

					arr.push('<li homeVisitSetuuid="'+o["homeVisitSetuuid"]+'"><div>\
						<strong>周'+_d+'</strong>');

						if (o["timeType"] == 1) {
							arr.push('<span>全天</span>');
						}else if(o["timeType"] == 2){
							arr.push('<span>上午</span>');
						}else{
							arr.push('<span>下午</span>');
						}
						arr.push('<div class="tz_saeq">');
						if (o["state"] == 1) {
							arr.push('<b>开诊</b>');
							arr.push('<div class="on">');

						}else{
							arr.push('<b>停诊</b>');
							arr.push('<div class="off">');
						}
						arr.push('<i class="switch"></i><span class="off-font">OFF</span><span class="on-font">ON</span></div></div></div><div class="kua_scnut"><div class="ndh"><i class="icon-mycoltrash"></i></div></div></li>');

				});

				$(".thene_cement ul").html(arr.join(""));

				$(".thene_cement ul li > div:nth-child(1)").lrTouchMove();

				$(".on,.off").settingOnOff(function(d){
					//缺失 开通加号,开通图文咨询,开通电话咨询,开通私人信息等设置接口
					var _f = $(this).hasClass("off");
					var state = 0;
					if (_f) {
						$(this).prev().html("停诊");
						state = 0;
					}else{
						$(this).prev().html("开诊");
						state = 1;
					}

					var _id = $(this).closest("li").attr("homevisitsetuuid");
					
					//修改状态
					$.getDate({
						page:"doctor",
						inter:"updateHomeVisitSet",
						data:{doctorUuid:gm.user.getDoctor(),homeVisitSetuuid:_id,state:state},
						callback:function(data){}
					});

				});

				$(".thene_cement ul li .ndh").ontouch(function(){
					var obj = $(this).parent().parent();
					var _homeVisitSetuuid = $(this).parent().parent().attr("homeVisitSetuuid");
					
					$.confirm("确定要删除吗?",function(){
						$.getDate({
							page:"doctor",
							inter:"deleteHomeVisitSet",
							data:{homeVisitSetuuid:_homeVisitSetuuid},
							callback:function(data){
								if(!data){
									$.alert({
										val:"服务器出错！",
										timer:1500
									});
									return;
								}
								if (data.query.success) {

									$.alert({
										val:"删除成功",
										timer:1500,
										type:"flash",
										callback:function(){
											obj.fadeOut(500);
										}
									});
								};
							}
						});
					});
				},true);
			};
		}
	});	
}

//删除出诊时间
gm.clinic.deleteHomeVisitSet = function(_homeVisitSetuuid){
	$.getDate({
		page:"doctor",
		inter:"deleteHomeVisitSet",
		data:{homeVisitSetuuid:_homeVisitSetuuid},
		callback:function(data){
			if(!data){
				$.alert("服务器出错！")
				return;
			}

			if (data.query.success) {
				$.alert("删除成功！");
				//成功后跳转
				window.location.href = window.location.href;
			};
		}
	});
}

gm.clinic.sheizhi2 = function(){
	$(".on,.off").settingOnOff(function(d){
	});
	
	//设置预约加号
	$(".rernelkal").on("touchend","li",function(){
		var _ = $(this);

		if(_.hasClass("gotal")){
			_.removeClass("gotal");
			$(".abvccanplu i").html("全部选择").get(0).dataset.status = 0;
		}else{
			_.addClass("gotal");
			if($(".abvccanplu li").length == $(".abvccanplu li.gotal").length){
				$(".abvccanplu i").html("取消全部选择").get(0).dataset.status = 1;
			}
		}
	});

	//获取预约加号标签
	$.getDate({
		page:"doctor",
		inter:"getTags",
		data:{callback:"gm.clinic.getTags"},
		method:"POST",
		dataType:"script"
			
	});
	

	$(".tcsjob button").bind({
		touchend:function(){
			window.__mask && __mask.hide();
			var _p = $(".tcsjob input").val();
			$(".tcsjob").hide();
			if(!_p){
				$.alert({
					"val" : "请填写类型名称",
					"type" : "flash"
				});
				return false;
			}
			$.getDate({
				page:"doctor",
				inter:"addTag",
				data:{tag:_p,callback:"gm.clinic.addTag"},
				method:"POST",
				dataType:"script"
			});
		}
	});

	$(".queding_a button").bind({
		touchend:function(){
			var arr = "",tags = [];
			var _f = $(".increase_rshu input").val();
			$(".onmonday_two dd .on").each(function(i,o){
				arr = arr + $(this).parent().parent().attr("homeVisitSetuuid")+',';
			})

			$(".abvccanplu li.gotal").each(function(){
				tags.push($(this).attr("taguuid"));
			});

			tags = tags.join(",");

			arr = arr.substring(0,arr.length-1);

			if(!tags){
				$.alert("请选择加号类型");
				return false;
			}
			if(!arr){
				$.alert("请确认加号时间");
				return false;
			}
			if(!_f){
				$.alert("请设置加号人数");
				return false;
			}

			window._loading = new mask("loading");
			window._loading.show();
			//保存预约加号
			$.getDate({
				page:"doctor",
				inter:"updatePlusHome",
				data:{
					doctorUuid:gm.user.getDoctor(),
					homeVisitSetuuid:arr,
					plusState:"1",
					plusNum:_f
				},
				callback:function(data){
					submitTags();
				}
			});

			//保存选中类型
			function submitTags(){
				//保存预约加号
				$.getDate({
					page:"doctor",
					inter:"updateDoctorTag",
					data:{
						doctorUuid:gm.user.getDoctor(),
						tagList:tags
					},
					callback:function(data){
						window._loading&&window._loading.hide();
						$.alert({
							"val" : "保存成功",
							"type" : "flash",
							callback:function(){
								if(gm.para.get(window.location.href,"from")=="user")
									gm.pul.toUrl("/html/clinic/index.shtml?from=user");
								else
									gm.pul.toUrl("/html/clinic/index.shtml");
							}
						});
					}
				});
			}
		}
	})
}

gm.clinic.addTag = function(data){
	if(!data){
		$.alert("服务器出错！");
		return;
	}
	if (data.query.success == "1") {
		$.alert({
			"val" : "手录类型成功",
			"type" : "flash",
			"callback" : function(){
				window.location.href = window.location.href;
			}
		});
	}else{
		$.alert(data.query.message);
	}
}

//预约加号标签载入处理
gm.clinic.getTags = function(data){
	if(!data){
		$.alert("服务器出错！")
		return;
	}
	if (data.query.success == "1") {
		var arr = [];
		$(data.reList).each(function(i,o){
			arr.push('<li tagUuid="'+o["tagUuid"]+'"><span>'+o["tagName"]+'</span></li>');
			if (i >= 12) {
				$(".queding_a").css({
					"margin-top":"0%",
					"margin-bottom" : "0",
					"padding-bottom":"1rem",
					"position":"relative",
					"top":".5rem"
				});
			};
		});

		$(".abvccanplu ul").html(arr.join(""));
		//获取预约加号记录
		$.getDate({
			page:"doctor",
			inter:"getPlusConfs",
			data:{doctorUuid:gm.user.getDoctor()},
			callback:function(data){
				if(!data){
					$.alert("服务器出错！")
					return;
				}
				if (data.query.success == "1") {

					//处理已选中分类标签
					var otherRelistLength = 0;
					$.each(data.otherRelist,function(i,o){
						$(".abvccanplu li[taguuid=" + o.tagUuid + "]").addClass("gotal");
						otherRelistLength ++;
					});
					if(otherRelistLength == $(".abvccanplu li").length){
						$(".abvccanplu i").html("取消全部选择").attr("data-status","1");
					}

					var arr = [];
					$(data.retlist).each(function(i,o){
						var _d = "";
						var _l = "";

						if (o["weekDate"] == "0") {
							_d = "一";
						}else if(o["weekDate"] == "2"){
							_d = "二";
						}else if(o["weekDate"] == "3"){
							_d = "三";
						}else if(o["weekDate"] == "4"){
							_d = "四";
						}else if(o["weekDate"] == "5"){
							_d = "五";
						}else if(o["weekDate"] == "6"){
							_d = "六";
						}else{
							_d = "日";
						}

						if (o["timeType"] == "1") {
							_l = "全天";
						}else if(o["timeType"] == "2"){
							_l = "下午";
						}else{
							_l = "上午";
						}
						arr.push('<dd homeVisitSetuuid="'+o["homeVisitSetuuid"]+'"><h2>周'+_d+'</h2>\
							<div class="onmonday_off">\
							<i>'+_l+'</i><b>是否提供加号</b>\
							<div class="' + (o['plusState'] == 1 ? 'on' : 'off') + '"><i class="switch"></i><span class="off-font">OFF</span><span class="on-font">ON</span></div>\
							</div>\
						</dd>');
					});

					$(".increase_rshu input").val(data.plusNum);

					$(".thene_cement dl").html(arr.join(""));
					$(".on,.off").settingOnOff(function(d){
						console.log(d);
					});
				}else{
					$.alert(data.query.message);
				}
			}
				
		});
	};
}

gm.clinic.sheizhi3 = function(){
	$(".on,.off").settingOnOff(function(d){
	});
	
	$(".sett .on,.sett .off").bind({
		touchend:function(){
			$.getDate({
				page:"doctor",
				inter:"updatePersonalExam",
				data:{doctorUuid:gm.user.getDoctor(),state:($(".sett .on").length>0?1:0),type:1},
				callback:function(data){
					console.log(data);
				}
			})
		}
	});

	$.getDate({
		page:"doctor",
		inter:"getExam",
		data:{doctorUuid:gm.user.getDoctor(),type:1},
		callback:function(data){
			if(!data){
				$.alert("服务器错处！");
			}

			if(data.query.success == "1"){
				$(".sett .on,.sett .off").attr("class",(data.state == "1"?"on":"off"))
			}else{
				$.alert(data.query.message);
			}
		}
	})
	$.getDate({
		page:"doctor",
		inter:"getAllTelephoneCounse",
		data:{doctorUuid:gm.user.getDoctor()},
		callback:function(data){
			if(!data){
				$.alert("服务器出错！")
				return;
			}

			if (data.query.success) {
				var arr = [];
				if (data.relist.length > 0){
					$(data.relist).each(function(i,o){
						var _d = "";

						if (o["weekDate"] == "1") {
							_d = "一";
						}else if(o["weekDate"] == "2"){
							_d = "二";
						}else if(o["weekDate"] == "3"){
							_d = "三";
						}else if(o["weekDate"] == "4"){
							_d = "四";
						}else if(o["weekDate"] == "5"){
							_d = "五";
						}else if(o["weekDate"] == "6"){
							_d = "六";
						}else{
							_d = "日";
						}
						arr.push('<li telepCounseUuid="'+o["telepCounseUuid"]+'">\
							<div>\
								<h2>周'+_d+'</h2>\
								<span class="sj_span">'+o["startTime"]+'-'+o["endTime"]+'</span>\
								<div class="cay">\
									<span>时间 :'+o["teleTime"]+'</span>\
									<span>费用:<b>'+o["teleCost"]+'</b>元</span>\
								</div>\
							</div>\
							<div class="kua_scnut"><div class="ndh"><i class="icon-mycoltrash"></i></div></div>\
						</li>');

					});

					$(".thene_cement ul").html(arr.join(""));
					$(".thene_cement ul li > div:nth-child(1)").lrTouchMove();

					$(".thene_cement ul li").on("touchend",".ndh",function(){
						var obj = $(this).parent().parent();

						if($.confirm("确定删除吗？",function(){
							var _telepCounseUuid = obj.attr("telepCounseUuid");
							gm.clinic.deleteTelephoneCounse(_telepCounseUuid);

							obj.fadeOut(300);
						}));

						return false;
					});
				}else{
					$(".nfsu_1").show();
				}
			}
		}
	});
}
//删除电话咨询
gm.clinic.deleteTelephoneCounse = function(_telepCounseUuid){
	$.getDate({
		page:"doctor",
		inter:"deleteTelephoneCounse",
		data:{telepCounseUuid:_telepCounseUuid},
		callback:function(data){
			if(!data){
				$.alert("服务器出错！")
				return;
			}

			if (data.query.success) {
				$.alert({
					val : "删除成功！",
					type : "flash",
					timer:1500,
					callback:function(){
						//gm.pul.toUrl("sheizhi3.shtml");
					}
				});

				//成功后跳转
				//window.location.href = window.location.href;
			};
		}
	});
}
//设置私人医生
gm.clinic.kaitong = function(){
	$(".on,.off").settingOnOff(function(d){
		console.log(d);
	});

	$(".queding_a").bind({
		touchend:function(){
			gm.pul.toUrl( "/html/clinic/index.shtml");
		}
	});

	$(".sett .on,.sett .off").bind({
		touchend:function(){
			$.getDate({
				page:"doctor",
				inter:"updatePersonalExam",
				data:{doctorUuid:gm.user.getDoctor(),state:($(".sett .on").length>0?1:0),type:2},
				callback:function(data){
					console.log(data);
				}
			})
		}
	});

	$.getDate({
		page:"doctor",
		inter:"getExam",
		data:{doctorUuid:gm.user.getDoctor(),type:2},
		callback:function(data){
			if(!data){
				$.alert("服务器错处！");
			}

			if(data.query.success == "1"){
				$(".sett .on,.sett .off").attr("class",(data.state == "1"?"on":"off"))
			}else{
				$.alert(data.query.message);
			}
		}
	})
	

	$.getDate({
		page:"doctor",
		inter:"getPackageDoctor",
		data:{doctorUuid:gm.user.getDoctor()},
		callback:function(data){
			if(!data){
				$.alert("服务器出错！")
				return;
			}

			if (data.query.success) {
				var arr = [];
				
				$(data.reList).each(function(i,o){
					arr.push('<li packageUuid="'+o["packageUuid"]+'"><h2>'+o["packageName"]+'</h2><div class="price_a"><i>'+o["money"]+'</i>\
					<span>元/月</span>');

					if (o["state"] == "N") {
						arr.push('<div class="off">');
					}else{
						arr.push('<div class="on">');
					}

					arr.push('<i class="switch"></i>\
					<span class="off-font">OFF</span><span class="on-font">ON</span></div>\
					</div><p>图文咨询次数：'+o["phoneTimes"]+'次</p><p>电话咨询次数：'+o["phoneTimes"]+'次</p><p>支持加号次数：'+o["plusTimes"]+'次</p>\
					</li></div>');
				});

				$(".thene_cement ul").html(arr.join(""));
				//成功后跳转
				// gm.pul.toUrl( this.href);

				$(".package_a .on,.package_a .off").bind({
					touchend:function(){
						var _o = $(this).parent().parent().attr("packageUuid");
						var _P = $(this).attr("class");
						var pp = "";

						if (_P == "on") {
							pp = 1;
							$(this).attr("class","off");
						}else{
							pp = 0;
							$(this).attr("class","on");
						}

						$.getDate({
							page:"doctor",
							inter:"updatePackageDoctor",
							data:{doctorid:gm.user.getDoctor(),packageUuid:_o,state:pp},
							callback:function(data){
								if(!data){
									$.alert("服务器出错！")
									return;
								}

								if (data.query.success) {
									//成功后跳转
									// window.location.href = window.location.href;
								};
							}
						});
					}
				});

			};
		}
	});
}

gm.clinic.addshezhi = function(){
	gm.pul.toUrl("sheizhi4.shtml");
}

gm.clinic.sheizhi4 = function(){
	var _selectTimeBtn;
	var _callback = function(){}

	var ___time = {
		"title" : "请选择时段",
		"lists" : [
			{ "id" : "-1" , "val" : "选择时段" , "disabled" : "1" },
			{ "id" : "0" , "val" : "00:00"},
			{ "id" : "1" , "val" : "01:00"},
			{ "id" : "2" , "val" : "02:00"},
			{ "id" : "3" , "val" : "03:00"},
			{ "id" : "4" , "val" : "04:00"},
			{ "id" : "5" , "val" : "05:00"},
			{ "id" : "6" , "val" : "06:00"},
			{ "id" : "7" , "val" : "07:00"},
			{ "id" : "8" , "val" : "08:00"},
			{ "id" : "9" , "val" : "09:00"},
			{ "id" : "10" , "val" : "10:00"},
			{ "id" : "11" , "val" : "11:00"},
			{ "id" : "12" , "val" : "12:00"},
			{ "id" : "13" , "val" : "13:00"},
			{ "id" : "14" , "val" : "14:00"},
			{ "id" : "15" , "val" : "15:00"},
			{ "id" : "16" , "val" : "16:00"},
			{ "id" : "17" , "val" : "17:00"},
			{ "id" : "18" , "val" : "18:00"},
			{ "id" : "19" , "val" : "19:00"},
			{ "id" : "20" , "val" : "20:00"},
			{ "id" : "21" , "val" : "21:00"},
			{ "id" : "22" , "val" : "22:00"},
			{ "id" : "23" , "val" : "23:00"}
		],
		"backEvent" : null,
		"selectedCallback" : function(msg){
			_selectTimeBtn.html(msg.val);
			_selectTimeBtn.attr("v",msg.id);

			_callback(msg);
			timeBar.close();
		}
	}

	var timeBar = new selectBar(___time);

	$("#start span").bind({
		touchend:function(){
			var _len = $(".twelvey span").html().split(":")[0] * 1;

			$(___time.lists).each(function(i,o){
				if(i == 0)return;
				o.disabled = i>_len;
			});

			timeBar.open(___time);
			_selectTimeBtn = $(this);
			_callback = function(){

			};
		}
	});

	$("#end span").bind({
		touchend:function(){
			var _len = $(".fourteen span").html().split(":")[0] * 1;

			$(___time.lists).each(function(i,o){
				if(i == 0)return;
				o.disabled = i<=_len+1;
			});

			timeBar.open(___time);
			_selectTimeBtn = $(this);
			_callback = function(){

			};
		}
	});
	//费用选择跳转！
	$(".sm li").ontouch(function(){
			var _ = this;

			$(".sm li.lansdink").removeClass("lansdink");
			$(this).addClass("lansdink");
		}
	);
	//咨询时长
	$(".stl li").ontouch(function(){
			var _ = $(this);

			$(".stl li").attr("class","fourteen_a");
			$(this).attr("class","twelvey");
		}
	);
	//选择日期
		//名下属性
	$(".selectadate_rq li").ontouch(function(){
		var _ = $(this);

		if(_.hasClass("lanse")){
			_.removeClass("lanse");
		}else{
			_.addClass("lanse");
		}
	});

	$.getDate({
		page:"doctor",
		inter:"getAllTeleCost",
		data:{},
		callback:function(data){
			if(!data){
				$.alert("服务器出错！")
				return;
			}
			if (data.query.success) {
				var arr = [];

				$(data.relist).each(function(i,o){
					arr.push('<li teleCostUuid="'+o["teleCostUuid"]+'"><span>'+o["teleCost"]+'</span></li>');
				})

				$(".zx_costl ul").html(arr.join(""));

				$(".sm li").ontouch(function(){
						var _ = this;

						$(".sm li.lansdink").removeClass("lansdink");
						$(this).addClass("lansdink");
					}
				);
			};
		}
	});

	$.getDate({
		page:"doctor",
		inter:"getAllTeleTime",
		data:{},
		callback:function(data){
			if(!data){
				$.alert("服务器出错！")
				return;
			}
			if (data.query.success) {
				var arr = [];
				var _o = '<h2>咨询时长</h2>';

				$(data.relist).each(function(i,o){
					arr.push('<li class="fourteen_a" teleTimeUuid="'+o["teleTimeUuid"]+'"><span>'+o["teleTime"]+'分钟</span></li>');
				})

				$(".stl").html(_o + arr.join(""));
				
				$(".stl li").ontouch(function(){
						var _ = $(this);

						$(".stl li").attr("class","fourteen_a");
						$(this).attr("class","twelvey");
					}
				);
			};
		}
	});


	//设置电话咨询保存接口
	$(".btn-radius").bind({
		touchend:function(){
			var _o = [{}];
			var _p = $("#start span").html();
			var _s = $("#end span").html();
			var _z = $(".stl .twelvey").attr("teletimeuuid");
			var _q = $(".zx_costl .lansdink").attr("telecostuuid");

			$(".selectadate_rq ul .lanse").each(function(i,o){
				_o[i] = $(".selectadate_rq ul .lanse").eq(i).attr("xqj");
			});

			$.getDate({
				page:"doctor",
				inter:"saveOrUpdateTelephoneCounse",
				data:{doctorUuid:gm.user.getDoctor(),weekDate:_o.join(","),startTime:_p,endTime:_s,teleTimeUuid:_z,teleCostUuid:_q},
				callback:function(data){
					if(!data){
						$.alert("服务器出错！")
						return;
					}

					if (data.query.success) {
						$.alert({
							val : "修改成功！",
							type : "flash",
							callback:function(){
								gm.pul.toUrl("sheizhi3.shtml");
							}
						});
						//成功后跳转
					};
				}
			});
			history.back();
		}
	})
}
