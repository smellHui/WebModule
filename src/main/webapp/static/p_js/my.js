$(document).ready(function(){
	// 患者基本信息
	$("#account_balance dd").bind({
		touchend:function(){
			gm.pul.toUrl("/patient/my/bill_detailed.shtml");
		}
	});

	gm.my = gm.my || {};

	gm.my.index = function(){

		//用户登录判断，没登录，跳转登录页面
		//gm.user.vcLogin();
		var  customerUuid=gm.para.get(window.location.href,"customerUuid");
		console.log(customerUuid);
		if(customerUuid=="" ||customerUuid==undefined)
			customerUuid=gm.patient.getPatient();
		else
			gm.patient.setPatient(customerUuid);
		if(customerUuid == "0"){
			$(".zzc_dl a").show();
			$("#my .options .zevnd h4").html(0 + "<span>元</sapn>");
			$("#my .options dd").eq(1).find("b").html(0);
			$(".zzc_dl a").css({
				"zIndex":5
			})
			return;
		}

		//查询患者个人信息
		$.getDate({
			page:"patient",
			inter:"toCustomerInfo",
			data:{customerUuid:customerUuid},
			callback:function(data){
				//服务器传输回应
				if(!data){
					$.alert("服务器出错!");
				}
				if(data.query.success=="1"){
					$("#my dt .ydl").show();
					$("#my dt .wdl").hide();
					$("#my .zzc_dl").hide();

					$(".ydl .user_avatar img").attr("src",data.imgUrl || (!data.sex || data.sex == 1 ? window.___defaultImage_p_man : window.___defaultImage_p_woman));
					$(".user_unpv h2").html(data.realName);
					$(".sdogpan .p_vkdamd").html(data.illnessDescription);
					$("#my .options dd").eq(1).find("b").html(data.availableIntegral);
					$("#my .options .zevnd h4").html(data.accountAmount + "<span>元</sapn>");
					
					if (data.sex == "2") {
						$(".sex i").attr("class","icon-girl");
						$(".sex i").attr("sex","2");
					}
					
					var nowdate = new Date();
					var brithday = data.birthday;
					var age =nowdate.getFullYear() - brithday.substr(0,4);
					$(".sdogpan .sex span").html(age+"岁");
				}else{
					// $.alert(data.query.message);
				}
			}
		});
	}

	gm.my.editCustomerInfo = function(data){
		//服务器传输回应
		if(!data){
			$.alert("服务器出错!");
		}
		if(data.query.success=="1"){
			/**
			$(".options").attr("customerUuid",data.customerUuid);
			$(".feng_avatar img").attr("src",data.imgUrl);
			$(".options dd").eq(0).find("input").val(data.customerName);
			$(".options dd").eq(1).find("input").val(data.realName);
			if (data.sex == 1) {
				$(".options dd").eq(2).find("select").val(1);
			}else{
				$(".options dd").eq(2).find("select").val(2);
			}
			$(".options dd").eq(3).find("input").html(data.birthday);
			$(".options dd").eq(4).find("textarea").html(data.illnessDescription);
			 **/
			$.alert({
				val:"修改成功",
				type : "flash",
				timer:1500,
				callback:function(){
					//gm.pul.returnurl();
					gm.pul.toUrl("/patient/my/index.shtml");
				}
			});
		}else{
			$.alert(data.query.message);
		}
	}

	
	gm.my.personal_information = function(){
		if(/android/gi.test(navigator.userAgent)){//暂时隐藏上传图像功能
			$(".options .gnents").css("display","none");
		}
		$(".gnents i").upimage(function(data){
			if(!data){
				$.alert("服务器出错!");
			}

			if(data.query.success){
				$(".feng_avatar img").attr("src",data.smallUrl);
				$(".feng_avatar img").attr("upsrc",data.icon);
			}else{
				$.alert(data.query.message);
			}
		});
		
		//日期失去焦点后判断是否为空，为空的话，显示默认文本
		$("#firstDiagnosis").blur(function(){
			var temp=$(this).html();
			if(temp==""){
				$(this).attr("placeholder","就诊时间");
			}
		});
		$("#birthday").blur(function(){
			var temp=$(this).html();
			if(temp==""){
				$(this).attr("placeholder","出生日期");
			}
		});

		gm.my.save = function(){//修改保存用户信息
			var _imgUrl = $(".feng_avatar img").attr("upsrc");
			/*var _customerName = $(".options dd").eq(0).find("input").val();
			var _realName = $(".options dd").eq(1).find("input").val();
			var _sex = $(".options dd").eq(2).find("select").val();
			var _birthday = $(".options dd").eq(3).find("input").val();
			var _illnessDescription = $(".options dd").eq(4).find("textarea").val();*/
			/**获取参数**/
			var _nickName=$.trim($("#nickName").val());
			var _realName=$("#realName").val();
			var tem_sex=$(".editSex .btn-checkbox-a").attr("class").split(' ');
			var _sex="";
			if(tem_sex[1])
				_sex="1"
			else
				_sex="2"
			var _birthday=$("#birthday").html();
			var _certCode=$.trim($("#certCode").val());
			var _marryState=$("#marryState").html();//婚姻状况
			if(_marryState=="请选择婚姻状态")
				_marryState="";
			var _industry=$("#industry").val();
			var _email=$("#email").val();
			var _address=$("#address").val();
			var _diseaseTime=$.trim($("#diseaseTime").val());
			var _firstDiagnosis=$("#firstDiagnosis").html();
			var _ifStart=$("#ifStart").attr("value");//首发
			var _seizureTimes=$("#seizureTimes").val();
			var _height=$.trim($("#height").val());
			var _weight=$.trim($("#weight").val());
			var _nearlyDrugs=$("#nearlyDrugs").val();
			var _illnessDescription=$("#illnessDescription").val();
			//昵称
			if(!_nickName){
				$.alert("昵称不能为空");
				return false;
			}
			//病程
			if(!_diseaseTime){
				$.alert("病程不能为空");
				return false;
			}
			//首次就诊时间
			if(!_firstDiagnosis){
				$.alert("首次就诊不能为空");
				return false;
			}
			//是否首发
			if(!_ifStart){
				$.alert("首发不能为空");
				return false;
			}
			//复发次数
			if($("#seizureTimes").parent().css("display")!="none");
				if(!_seizureTimes){
					$.alert("复发次数不能为空");
					return false;
				}
			//身高
			if(!_height){
				$.alert("身高不能为空");
				return false;
			}
			//体重
			if(!_weight){
				$.alert("体重不能为空");
				return false;
			}
			//病情描述
			if(!_illnessDescription){
				$.alert("病情描述不能为空");
				return false;
			}
			/**验证信息**/
			if(_email!="")
				if(_email && !CheckMail(_email)){
					$.alert("请输入有效邮箱");
					return false;
				}
			if(_certCode!=""){//验证身份证号码
				if(_certCode){
					var tem=IdentityCodeValid(_certCode);
					if(!tem['pass']){
						$.alert(tem['tip']);
						return false;
					}	
				}
			}
			/**检验参数**/
			
			
			$.getDateAjax({
				page:"patient",
				inter:"editCustomerInfo",
				data:{
					customerUuid:gm.patient.getPatient(),
					image:_imgUrl,
					customerName:_nickName,
					realName:_realName,
					sex:_sex,
					birthday:_birthday,
					certCode:_certCode,
					marryState:_marryState,
					industry:_industry,
					email:_email,
					address:_address,
					diseaseTime:_diseaseTime,
					firstDiagnosis:_firstDiagnosis,
					ifStart:_ifStart,
					seizureTimes:_seizureTimes,
					height:_height,
					weight:_weight,
					nearlyDrugs:_nearlyDrugs,
					illnessDescription:_illnessDescription},
				method:"POST",
				dataType:"json",
				callback:function(data){
					window._loading && window._loading.hide(); 
					if(data.query.success=="1"){
						
						$.alert({
							val:"修改成功",
							type : "flash",
							timer:1500,
							callback:function(){
								//gm.pul.returnurl();
								gm.pul.toUrl("/patient/my/index.shtml");
							}
						});
					}else{
						$.alert(data.query.message);
					}
				}
			});
			
		}

		//编辑患者个人信息
		$("#personal_save").bind({
			touchend:gm.my.save
		});
		
		//查询患者个人信息
		$.getDate({
			page:"patient",
			inter:"toCustomerInfo",
			data:{customerUuid:gm.patient.getPatient()},
			callback:function(data){
				//服务器传输回应
				if(!data){
					$.alert("服务器出错!");
				}
				if(data.query.success=="1"){
					$(".options").attr("customerUuid",data.customerUuid);
					$(".feng_avatar img").attr("src",data.imgUrl || (!data.sex || data.sex == 1 ? window.___defaultImage_p_man : window.___defaultImage_p_woman));

					//完善对应项目
					$(".options #nickName").val(data.nickName);
					$(".options #realName").val(data.realName);
					//性别
					var sex=data.sex;
					var _sex=data.sex;
					if(_sex!=undefined && _sex!=null) $(".editSex span").html(data.sex=="1"?"男":"女");
					$(".options #birthday").html(data.age);
					$(".options #certCode").val(data.certCode);
					//婚姻状况
					var marraystate=data.marryState;
					if(marraystate=="" ||marraystate==null)
						marraystate="请选择婚姻状况";
					$("#spanmarryState").getIsMarry(marraystate);
					//$(".options #marryState").html(marraystate);
					$(".options #industry").val(data.industry);
					$(".options #email").val(data.email);
					$(".options #address").val(data.address);
					//病程
					$(".options #diseaseTime").val(data.diseaseTime);
					//首次就诊时间
					var firstDiag=data.firstDiagnosis;
					if($.trim(firstDiag)!="" || firstDiag!=null){
						firstDiag=firstDiag.split(" ");
						$(".options #firstDiagnosis").html(firstDiag[0]);
					}
					
					
					//是否着发
					var ifStart=data.ifStart;
					if(ifStart=="1")
						$("#seizureTimes").parent().hide();
					$("#spanisStart").getIsStart(ifStart);//
					//$(".options #ifStart").html(ifStart);
					$(".options #seizureTimes").val(data.seizureTimes);
					$(".options #height").val(data.height);
					$(".options #weight").val(data.weight);
					$(".options #nearlyDrugs").val(data.nearlyDrugs);
					$(".options #illnessDescription").val(data.illnessDescription);
				}else{
					$.alert(data.query.message);
				}
			}
		});
	}

	gm.my.account_balance = function(){
		gm.user.vcLogin();

		//查询患者个人信息
		$.getDate({
			page:"patient",
			inter:"toCustomerInfo",
			data:{customerUuid:gm.patient.getPatient()},
			callback:function(data){
				//服务器传输回应
				if(!data){
					$.alert("服务器出错!");
				}
				if(data.query.success=="1"){
					$("h4").html(data.accountAmount + '<span>元</span>')
				}else{
					$.alert(data.query.message);
				}
			}
		});

		$.getDate({
			page:"patient",
			inter:"toPersonAccountList",
			data:{customerUuid:gm.patient.getPatient()},
			callback:function(data){
				//服务器传输回应
				if(!data){
					$.alert("服务器出错!");
				}
				if(data.query.success=="1"){
					var arr = [];
					var _operType = "";
					var _orderType = "";
					var _k = data.relist.length;

					$(data.relist).each(function(i,o){
						if (o["operType"] == 0) {
							_operType = "+";
						}else{
							_operType = "-";
						}
						arr.push('<dd>\
							<h2>'+o["orderTime"]+'</h2>\
							<span>\
								<i class="fe_js">'+_operType+o["operAmount"]+'</i>');

						if (o["orderType"] == 1) {
							_orderType = "电话咨询";
						}else{
							_orderType = "私人医生";
						}
						arr.push('<p>'+_orderType+'</p>\
							</span>\
						</dd>')
					});
					$("#account_balance dl").append(arr.join(""));
				}else{
					$.alert(data.query.message);
				}
			}
		});
	}
	//得到系统消息的数量
	gm.my.getsystem_value=function(){
		/*$.getDate({
			page:"doctor",
			inter:"getServiceStaffMessage",
			data:{doctorUuid:gm.user.getDoctor()},
			callback:function(data){
				if(!data){
					$.alert("服务器出错!");
				}
				if(data.query.success=="1"){
					if(data.collectMeNum){
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
		});*/
	}
	//获取消息列表
	gm.my.my_system = function(_messageType){

		//用户登录判断，没登录，跳转登录页面
		//gm.user.vcLogin();
		$.getDate({
			page:"patient",
			inter:"getAllInnerMessageList",
			data:{customerUuid:gm.patient.getPatient(),messageType:_messageType},
			callback:function(data){
				//服务器传输回应
				if(!data){
					$.alert("服务器出错!");
				}
				if(data.query.success=="1"){
					var arr = [];
					$(data.relist).each(function(i,o){
						arr.push('<li InnerMessageUuid="'+o["InnerMessageUuid"]+'" sendUser="'+o["sendUser"]+'">\
						<div class="share">\
							<h2>'+o["title"]+'<span class="time">'+o["sendTime"]+'</span></h2>\
							<p>'+o["content"]+'</p>\
						</div>\
					</li>')
					});

					$("#my_system ul").html(arr.join(""));
				}else{
					$.alert(data.query.message);
				}
			}
		});
	}

	gm.my.addCustomerAdvice = function(data){
		if(!data){
			$.alert("服务器出错!");
		}
		if(data.query.success=="1"){
			$.alert({
				"val" : "提交反馈成功",
				"callback" : function(){
					gm.pul.toUrl( "/patient/my/index.shtml");
				}
			})
			console.log(data);
		}else{
			$.alert(data.query.message);
		}
	}
	//保存会员的意见反馈信息接口
	gm.my.my_opinion = function(){
		$(".btn-zyradius").bind({
			touchend:function(){
				var _adviceContent = $(".inputbox textarea").val();
				var _customerMobile = $(".inputbox .customerMobile").val();
				var _customerEmail = $(".inputbox .customerEmail").val();
				var _customerQQ = $(".inputbox .customerQQ").val();

				// var _doctorUuid = localStorage.getItem("_doctorUuid");
				var reg =/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;

				//如果没有内容
				if (!_adviceContent) {
					$.alert("请输入反馈内容！");
					return;
				}

				//三选一输入
				if(_customerMobile || _customerEmail || _customerQQ){
					//验证手机
					if(_customerMobile && !/^1\d{10}/.test(_customerMobile)){
						$.alert("失败，手机验证不通过");
						return;
					}

					//验证邮箱
					if(_customerEmail && !reg.test(_customerEmail)){
						$.alert("请输入有效邮箱！");
						return;
					}

					//验证QQ号码
					if(_customerQQ && !/^\d{5}/.test(_customerQQ)){
						$.alert("请输入有效QQ号码！");
						return;
					}

					$.getDate({
						page:"patient",
						inter:"addCustomerAdvice",
						data:{customerUuid:gm.patient.getPatient(),adviceContent:_adviceContent,customerMobile:_customerMobile,customerEmail:_customerEmail,customerQQ:_customerQQ,callback:"gm.my.addCustomerAdvice"},
						method:"POST",
						dataType:"script"
					});
				}else{
					$.alert("请输入至少一种联系方式!");
				}
			}
		});
	}
	var _o = $(this).attr("asfas");
	
	//我的收藏
	gm.my.my_collection = function(){
		//用户登录判断，没登录，跳转登录页面
		//gm.user.vcLogin();
		$.getDate({
			page:"patient",
			inter:"getAllCustomerFavoriteList",
			data:{customerUuid:gm.patient.getPatient()},
			callback:function(data){
				//服务器传输回应
				if(!data){
					$.alert("服务器出错!");
				}
				if(data.query.success=="1"){
					var arr = [];
					$(data.relist).each(function(i,o){
						arr.push('<li favoriteUuid="'+o["favoriteUuid"]+'" contentUuid="'+o["contentUuid"]+'" favoriteType="'+o["favoriteType"]+'"><div>');
						if (o["favoriteType"] == 1) {
							arr.push('<a class="dsu" href="/html/thedoctorinformation/informationfordetails.shtml?contentUuid='+o["contentUuid"]+'"></a>');
						}else{
							arr.push('<a class="dsu" href="/html/lecture/playing.shtml?vidoUuid='+o["contentUuid"]+'"></a>');
						}
							
						arr.push('<div class="live">\
							<img src="'+o["imageUrl"]+'">\
						</div>\
						<div class="text">\
							<p>'+o["contentTitle"]+'</p>\
							<p class="time">'+o["createTime"]+'</p>\
						</div>\
						<div class="ics">\
							<i class="icon-redstars">\
							</i>\
							<i class="pts-greencollection"></i>\
						</div></div>\
						<div class="kua_scnut"><div class="ndh"><i class="icon-mycoltrash"></i></div></div></li>');
					});
					if(arr.length>0){
						$("#dont_show").hide();
					}
					$(".alllive ul").html(arr.join(""));
					$(".alllive ul li > div:nth-child(1)").lrTouchMove();
					$(".alllive ul li .ics").on("touchend",".icon-redstars",function(){//删除收藏 
						var _o = $(this).parents("li").attr("favoriteUuid");
						$.getDate({
							page:"doctor",
							inter:"delFavorite",
							data:{favoriteUuid:_o},
							callback:function(data){
								//服务器传输回应
								if(!data){
									$.alert("服务器出错!");
								}
								if(data.query.success=="1"){
									window.location.href = window.location.href;
								}else{
									$.alert(data.query.message);
								}
							}
						});
						return false;
					});
					//分享
					$(".ics .pts-greencollection").bind({
						touchend:function(){
							var _ = $(this);
							var p = _.parent().parent().parent();
							var _shareUuid = $(this).parents("li").attr("contextuuid");
							var _shareType = $(this).parents("ul").attr("data");
							var _link="";
							var uuid="";
							var favoritetype=p.attr("favoritetype");
							if(favoritetype=="1"){
								uuid=p.attr("contentuuid");
								_link=window._interfacePath + "/html/thedoctorinformation/informationfordetails.shtml?contentUuid=" + uuid;
							}else{
								uuid=p.attr("contentuuid");
								_link=window._interfacePath + "/html/lecture/playing.shtml?vidoUuid=" + uuid;
							}
								
							var obj = {
								title:p.find(".text p").html(),
								desc:p.find(".text p").html(),
								img:p.find("img").attr("src"),
								link:_link
							}
							

							gm.share(obj,function(){
//								$.getDate({
//									page:"patient",
//									inter:"addShare",
//									data:{customerUuid:gm.patient.getPatient(),shareUuid:_shareUuid,shareType:_shareType},
//									callback:function(data){
//										if(!data){
//											$.alert("服务器出错!");
//										}
//										if(data.query.success=="1"){
//											
//										}else{
//											$.alert(data.query.message);
//										}
//									}
								});
							}
						});

					// $(".alllive ul").on("touchend",".dsu",function(){
					// 	var _o = $(this).parents("li").attr("contentUuid");
					// 	var _f = $(this).parents("li").attr("favoriteType");
					// 	if (_f == 1) {
					// 		gm.pul.toUrl( "/html/thedoctorinformation/informationfordetails.shtml?contentUuid="+_o);
					// 	}else{
					// 		gm.pul.toUrl( "/html/lecture/playing.shtml?vidoUuid="+_o);
					// 	}
					// })
				}else{
					$.alert(data.query.message);
				}
			}
		});
	}

	//积分明细
	gm.my.my_integral = function(){
		window._loading = new mask("loading");
		window._loading.show();
		//用户登录判断，没登录，跳转登录页面
		gm.user.vcLogin();

		//查询患者个人信息
		$.getDate({
			page:"patient",
			inter:"toCustomerInfo",
			data:{customerUuid:gm.patient.getPatient()},
			callback:function(data){
				//服务器传输回应
				if(!data){
					$.alert("服务器出错!");
				}
				if(data.query.success=="1"){
					$(".right").html(data.availableIntegral + '<span class="record">积分</span>')
					// $("#my .options .zevnd h4").html(data.accountAmount)
				}else{
					$.alert(data.query.message);
				}
			}
		});

		$.getDate({
			page:"patient",
			inter:"getVipclubIntegralLogList",
			data:{customerUuid:gm.patient.getPatient()},
			callback:function(data){
				//服务器传输回应
				if(!data){
					$.alert("服务器出错!");
				}
				if(data.query.success=="1"){
					var arr = [];
					var _itgt = "";
					var _k = data.relist.length;
					$(data.relist).each(function(i,o){
						arr.push('<li VirtualAccountCustomerLogUuid="'+o["VirtualAccountCustomerLogUuid"]+'">\
							<div class="share">');
						// if (o["intergralType"] == 11 || o["intergralType"] == 12 || o["intergralType"] == 13) {
							_itgt = "+";
						// }else{
						// 	_itgt = "-";
						// }
						arr.push('<h2>'+o["intergralType"]+'<span class="time">'+_itgt+o["intergralCount"]+'</span></h2>\
								<p>'+o["intergralType"]+' '+o["createTime"]+'</p>\
							</div>\
						</li>');
					});
					$(".integral ul").html(arr.join(""));
					
					window._loading&&window._loading.hide();
				}else{
					$.alert(data.query.message);
				}
			}
		});
	}

	//修改密码
	gm.my.instead_password = function(){
		$.getDate({
			page:"patient",
			inter:"getMobileByCustomerUuid",
			data:{customerUuid:gm.patient.getPatient()},
			callback:function(data){
				//服务器传输回应
				if(!data){
					$.alert("服务器出错!");
				}
				if(data.query.success=="1"){
					$(".nusbag h2 span").html(data.mobile)
				}else{
					$.alert(data.query.message);
				}
			}
		});

		//个人中心修改密码
		$(".anbox .btn-zyradius").bind({
			touchend:function(){
				var _submitObj = $(this).parent();
				var _mobile = $(".nusbag h2 span").text();
				var _v = $(".nusbag .login_box2 .verify_code input").val();
				var _password = $(".nusbag .login_box2 .dsnmion input").val();

				$.getDateAjax({
					page:"patient",
					inter:"retrievePassword",
					data:{mobile:_mobile,password:_password,captcha:_v},
					method:"POST",
					callback:function(_data){
						gm.my.editUserPassword(_data);
					}
				});
			}
		});
	}

	//修改支付密码
	gm.my.instead_play_password = function(){
		$.getDate({
			page:"patient",
			inter:"getMobileByCustomerUuid",
			data:{customerUuid:gm.patient.getPatient()},
			callback:function(data){
				//服务器传输回应
				if(!data){
					$.alert("服务器出错!");
				}
				if(data.query.success=="1"){
					$(".nusbag h2 span").html(data.mobile)
				}else{
					$.alert(data.query.message);
				}
			}
		});

		//个人中心修改密码
		$(".anbox .btn-zyradius").ontouch(function(){
			var _submitObj = $(this).parent();
			var _mobile = $(".nusbag h2 span").text();
			var _v = $(".nusbag .login_box2 .verify_code input").val();
			var _password = $(".nusbag .login_box2 .dsnmion input").val();

			$.getDate({
				page:"patient",
				inter:"updatePayPassword",
				data:{mobile:_mobile,payPassword:_password,captcha:_v,callback:"gm.my.editpassword"},
				method:"POST",
				dataType:"script"
			});
		});
	}	
	//用户修改个人密码
	gm.my.editUserPassword=function(data){
		var data=eval("("+data+")");
		if(!data){
			$.alert("服务器出错!");
		}
		if(data.value){
			$.alert({ "val" : "修改成功", "type" : "flash" , "callback" : function(){
				gm.pul.toUrl("/patient/my/my_more.shtml");
			}});
		}else{
			$.alert(data.message);
		}
	}
	gm.my.editpassword = function(data){
			if(!data){
				$.alert("服务器出错!");
			}
			if(data.query.success=="1"){
				$.alert({ "val" : "修改成功", "type" : "flash" , "callback" : function(){ 
					var returnUrl = gm.para.get(window.location.href,"returnUrl");
					if(returnUrl){
						gm.pul.toUrl(returnUrl);
					}else{
						gm.pul.toUrl("/patient/my/my_more.shtml");
					}
				}});
			}else{
				$.alert(data.query.message);
			}
		}

	//退出登录
	gm.my.my_more = function(){
		$(".btn-zyradius").bind({
			touchend:function(){
				$.confirm("确定需要退出登录吗？",
					function(){
					    	window._loading = new mask("loading");
						window._loading.show();
						//$.alert("退出成功！");
						localStorage.clear();
						gm.pul.toUrl("goodm://logout");
						setTimeout(function(){
							window._loading.hide();
							gm.pul.toUrl("/patient/my/index.shtml");
						},100);
						
					}
				);
			}
		})
	}

	gm.my.getCustomerOrderList = function(sc){
		var _p = sc || "0";
		var _loading = new mask("loading");
		_loading.show();
			$.getDate({
			page:"patient",
			inter:"getCustomerOrderList",
			data:{customerUuid:gm.patient.getPatient(),stateType:_p},
			callback:function(data){
				_loading.hide();
				//服务器传输回应
				if(!data){
					$.alert("服务器出错!");
				}
				if(data.query.success=="1"){
					var arr = [];

					var _state = "";
					var _orderType = "";
					$(data.relist).each(function(i,o){
						_state = window.___orderMsg[o["state"]*1];

						if (o["orderType"] == "1") {
							_orderType = "电话咨询";
						}else{
							_orderType = "私人套餐";
						}

						arr.push('<div class="thesecond_part" orderMainUuid="'+o["orderMainUuid"]+'" orderType="'+o["orderType"] +'" doctorUuid="'+o["doctorUuid"]+'">\
								<div class="detailed_introduction">\
									<div class="asdmdmnc">\
										<div class="the_doctor">\
											<div class="blasf">\
												<span>医生:'+o["doctorName"]+'</span>\
											</div>\
											<div class="fanhei">');
						if (o["sex"] == "1") {
							arr.push('<i class="icon-boy"></i>');
						}else{
							arr.push('<i class="icon-girl"></i>');
						}

						arr.push('</div>\
											<div class="havetopay">\
												<i class="dcxza">'+_state+'</i>\
											</div>\
										</div>\
									</div>\
									<div class="rintro">\
										<div class="toux">\
											<img src="'+o["imgUrl"]+'">\
										</div>\
										<div class="the_xpansion">\
											<div class="renwu">\
												<span>'+o["realName"]+'</span>\
												<div class="toub">\
													<i class="' + ((o["sex"] == 1) ? "icon-boy" : "icon-girl") + '"></i>\
												</div>\
												<span>'+o["age"]+'岁</span>\
												<div class="phone">\
													<span>'+_orderType+'</span>');

						if (o["orderType"] == "1") {
							arr.push(' <i class="pts-lvthephone"></i>');
						}else{
							// arr.push('<i class="pts-lvthephone"></i>');
						}

						arr.push('</div>\
									<p>价格:'+o["totalMoney"]+'元</p>');

						if(o["orderType"] == 1){
							arr.push('<p>预约时间: '+o["bookTime"]+ " " + o["startTime"]+'</p>\
									<p>预约时长:'+o["consultDuration"]+'分钟</p>\
									</div>\
							</div>\
							<div class="cancellation_charge">\
							<div class="cancel_ast" style="width:auto;">');
						}else{
							arr.push('<p>&nbsp;</p><p>&nbsp;</p></div>\
							</div>\
							<div class="cancellation_charge">\
							<div class="cancel_ast" style="width:auto;">');
						}

						if (o["state"] == "1") {
							arr.push('<button class="btn-def qxdd">取消订单</button>');
						}else if(o["state"] == "3"){
							arr.push('<button class="btn-def qxdd">取消订单</button>');
						}else if(o["state"] == "6"){
							arr.push('<button class="btn-def zczx">再次咨询</button>');
						}

						if (o["state"] == "1") {
							arr.push('</div><div class="topayfor">\
											<a href="/patient/home/'+(o["orderType"] == 1?"teleconsult":"homeprivatedoctors")+'.shtml?orderMainUuid='+o["orderMainUuid"] + '&doctorUuid='+o["doctorUuid"]+'">\
											<button class="btn-radius">去支付</button></a>\
										</div>\
										</div>\
										<div class="cost">\
												<strong>费用:￥ '+o["totalMoney"]+'元</strong>\
											</div>\
										</div>\
									</div>\
								</div>\
							</div>');
						}else{
							arr.push('</div></div>\
										<div class="cost">\
												<strong>费用:￥ '+o["totalMoney"]+'元</strong>\
											</div>\
										</div>\
									</div>\
								</div>\
							</div>');
						}
					});

					$(".dd_jos").html(arr.join(""));

					$(".cancel_ast button.zczx").ontouch(function(){
						var obj = $(this).parent().parent().parent().parent().parent();
						var doctorid = obj.attr("doctorUuid");
						var orderType = obj.attr("orderType");
						
						gm.pul.toUrl("/patient/home/"+(orderType == "1"?"teleconsult_1":"package")+".shtml?doctorUuid=" +doctorid);
					});

					$(".dd_jos .the_xpansion").ontouch(function(){
						var orderMainUuid = $(this).parent().parent().parent().attr("orderMainUuid");
						gm.pul.toUrl( "/patient/my/payment_order.shtml?orderMainUuid="+orderMainUuid);
					});
					
					$(".cancel_ast button.qxdd").ontouch(function(){
						var _orderMainUuid = $(this).parent().parent().parent().parent().parent().attr("orderMainUuid");
						var _  = this;
						$.confirm("您确定取消订单吗？",function(){
							$.getDate({
								page:"patient",
								inter:"cancelOrder",
								data:{orderMainUuid:_orderMainUuid},
								callback:function(data){
									//服务器传输回应
									if(!data){
										$.alert("服务器出错!");
									}
									if(data.query.success=="1"){
										$.alert({
											val:"取消订单成功！",
											timer:1500,
											type:"flash",
											callback:function(){
												$(_).hide();

												$(_).parent().parent().parent().parent().find(".dcxza").html("订单取消");
												$(_).parent().parent().parent().parent().find(".topayfor").hide();
											}
										});
									}else{
										$.alert(data.query.message);
									}
								}
							});
						});
					});
				}else{
					$.alert(data.query.message);
				}
			}
		});
	}

	// 我的订单
	gm.my.myorder = function(){

		//用户登录判断，没登录，跳转登录页面
		gm.user.vcLogin();
		// 列表切换

		gm.my.getCustomerOrderList();

		$(".my_state ul li").ontouch(function(){

				$(".my_state li span").removeClass("dserf");
				$(this).find("span").addClass("dserf");

				var _stateType = $(this).attr("stateType");
				gm.my.getCustomerOrderList(_stateType);

		});

		// $(".dd_jos").on("touchend",".btn-def",function(){
		// 	var orderMainUuid = $(this).parent().parent().parent().attr("orderMainUuid");
		// 	$.getDate({
		// 		page:"patient",
		// 		inter:"cancelOrder",
		// 		data:{orderMainUuid:_orderMainUuid},
		// 		callback:function(data){
		// 			//服务器传输回应
		// 			if(!data){
		// 				$.alert("服务器出错!");
		// 			}
		// 			if(data.query.success=="1"){
		// 				$.alert("取消订单成功！");
		// 			}else{
		// 				$.alert(data.query.message);
		// 			}
		// 		}
		// 	});
		// });


	}
	
	gm.my.payment_order = function(){
		var _orderMainUuid = gm.para.get(window.location.href,"orderMainUuid");

		$.getDate({
			page:"patient",
			inter:"toOrderMainDetail",
			data:{orderMainUuid:_orderMainUuid},
			callback:function(data){
				//服务器传输回应
				if(!data){
					$.alert("服务器出错!");
				}
				if(data.query.success=="1"){
					var _o = "";
					$(".doctor .icon1 img").attr("src",data.doctorInfo.doctorImg||window.___defaultImage);
					if (data.doctorInfo.doctorSex == "1") {
						_o = '<i class="icon-boy"></i>';
					}else{
						_o = '<i class="icon-girl"></i>'
					}
					$(".p_fbjn h3").html(data.doctorInfo.doctorName +_o);
					$(".p_fbjn p").html(data.doctorInfo.hospital);
					// $(".p_yvbu .p_hjf").html(data.doctorInfo.professional);
					$(".p_yvbu .asfg").html(data.doctorInfo.Department);
					$(".doctor").append('<a href="/patient/home/detailsofthedoctor.shtml?doctorUuid=' + (data.doctorInfo.doctorUuid || 0) +'"></a>');
					// alert(gm.user.getDoctor());
					//患者
					$(".patient .icon2 img").attr("src",(data.customerInfo.customerImg||(data.customerInfo.customerSex == "1" ? window.___defaultImage_p_man : window.___defaultImage_p_woman)));
					if (data.customerInfo.customerSex == "1") {
						$(".patient h4").html(data.customerInfo.customerName+'<i class="icon-boy"></i><span>'+data.customerInfo.customerAge+'岁</span>');
					}else{
						$(".patient h4").html(data.customerInfo.customerName+'<i class="icon-girl"></i><span>'+data.customerInfo.customerAge+'岁</span>');
					}
					$(".patient .p_fcxkj .sdopj").html("价格："+data.orderInfo.orderPrice+"元");
					$(".patient .p_fcxkj .oepsjpoj").html("问题描述:"+data.customerInfo.descript);

					var tmp="";
					 switch(data.orderInfo.orderState){
					 	// * 1.等待买家付款 - 取消订单
					 	case "1":
					 		
					 	break;
					 	// * 2.订单取消 - 已取消
					 	case "2":
					 		
					 	break;
						// * 3.已支付(待审核)
					 	case "3":

					 	break;
						// * 4.待执行（审核通过） - 等待执行
					 	case "4":

					 	break;
						// * 5.待回访
					 	case "5":

					 	break;
						// * 6.已完成 - 再次下单（私人医生2） | 再次咨询（电话咨询1）
					 	case "6":

					 	break;
						// * 7.转动态订单
					 	case "7":

					 	break;
						// * 8.已拒绝
					 	case "8":

					 	break;
					 }

					 if(data.orderInfo.orderType == "1"){
					 	tmp = '<p>价格：{orderPrice}元</p><p>预约时间：{bookTime}</p><p>预约时长：{consultDuration}分钟</p>';
					 }else if(data.orderInfo.orderType == "2"){
					 	tmp = '<h2>{packageName}</h2><p>价格：{orderPrice}元</p><p>电话咨询：{phoneTimes}次</p><p>预约加号：{plusTimes}个</p>';
					 }
					 $(".text").html(gm.replace(tmp,data.orderInfo));			

					switch(data.orderInfo.orderState){
						case "1":
							$(".scsv .btn-qxdd").css("display","block");
							$(".p_ufvnb p span").html();
							$(".p_ufvnb p span").show();
						break;
						case "2":

						break;
						case "3":

						break;
						case "4":

						break;
						case "5":

						break;
						case "6":
							if(data.orderInfo.orderType == "1"){
								$(".scsv .btn-zczx").css("display","block");
								$(".scsv .btn-zczx").bind({
									touchend:function(){
										gm.pul.toUrl('/patient/home/teleconsult_1.shtml?doctorUuid=' +(data.doctorInfo.doctorUuid || 0));
									}
								})
							}else if(data.orderInfo.orderType == "2"){
								$(".scsv .btn-zcxd").css("display","block");

								$(".scsv .btn-zcxd").bind({
									touchend:function(){
										gm.pul.toUrl('/patient/home/package.shtml?doctorUuid=' +(data.doctorInfo.doctorUuid || 0));
									}
								})

							}
						break;
						case "7":
						
						break;
						case "8":							
							$(".p_ufvnb span").show();
							$(".p_ufvnb a").show();
						break;
						default:
							$(".p_yhfcb button").css("display","block");
						break;
					}

					$(".p_ufvnb span").html(window.___orderMsg[data.orderInfo.orderState*1]).show();

					$(".p_djsdh .p_hgvhn").html(data.orderInfo.note);
				}else{
					$.alert(data.query.message);
				}
			}
		});

		$(".btn-qxdd").ontouch(function(){
			var _orderMainUuid = gm.para.get(window.location.href,"orderMainUuid");
			var _ = this;
			$.confirm("您确定取消订单吗？",function(){
				$.getDate({
					page:"patient",
					inter:"cancelOrder",
					data:{orderMainUuid:_orderMainUuid},
					callback:function(data){
						//服务器传输回应
						if(!data){
							$.alert("服务器出错!");
						}
						if(data.query.success=="1"){
							$.alert({
								val:"取消订单成功！",
								timer:1500,
								type:"flash",
								callback:function(){
									//window.location.href = window.location.href;
									$(_).hide();
									$(_).parent().parent().parent().parent().find(".dcxza").html("订单取消");
								}
							});
						}else{
							$.alert(data.query.message);
						}
					}
				});
			});
		});

		$(".p_yhfcb").on("touchend",".b-def",function(){
			$.getDate({
				page:"patient",
				inter:"cancelOrder",
				data:{orderMainUuid:_orderMainUuid},
				callback:function(data){
					//服务器传输回应
					if(!data){
						$.alert("服务器出错!");
					}
					if(data.query.success=="1"){
						$.alert({
							val:"取消订单成功！",
							callback:function(){
								gm.pul.toUrl("/patient/my/myorder.shtml");
							}
						});
					}else{
						$.alert(data.query.message);
					}
				}
			});
		})
	}

	//分享
	$(".icon-care .pts-greencollection").bind({
		touchend:function(){
			console.log("gg");
			var _ = $(this);
			var p = _.parent().parent();
			var _shareUuid = $(this).parents("li").attr("contextuuid");
			var _shareType = $(this).parents("ul").attr("data");

			var obj = {
				title:p.find(".text p").html(),
				desc:p.find(".text p").html(),
				img:p.find("img").attr("src"),
				link:gm.basePath + "/html/lecture/playing.shtml?vidoUuid=" + p.attr("contextuuid")
			}

			gm.share(obj,function(){
//				$.getDate({
//					page:"patient",
//					inter:"addShare",
//					data:{customerUuid:gm.patient.getPatient(),shareUuid:_shareUuid,shareType:_shareType},
//					callback:function(data){
//						if(!data){
//							$.alert("服务器出错!");
//						}
//						if(data.query.success=="1"){
//							
//						}else{
//							$.alert(data.query.message);
//						}
//					}
				});
			}
		});
	
	
	
//验证码
$.fn.verify = function(){
	var _this = this;

	_this.each(function(i,o){
		var _o = o;
		$(o).on("touchend","button",function(){
				//判断有没有填写手机号码
				var _mobile = $(".nusbag h2 span").text();

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
});