$(document).ready(function(){

gm.reg = gm.reg || {};

gm.reg.gotoLogin = function(data){
	window._loading&&window._loading.hide();
	if(!data){
		$.alert("服务器出错!");
	}
	if(data.value){
		gm.patient.setPatient(data.message.customerUuid);
		var returnRul = gm.para.get(window.location.href,"returnurl") || "/patient/index/page.shtml";
		setTimeout(function(){gm.pul.toUrl( returnRul);},500);
	}else{
		$.alert(data.message);
	}
	
}
//登录
gm.reg.login = function(){
	$(".btn-radius").bind({
		touchend:function(){
			var _mobile = $(".mobile").val();
			var _password = $(".password").val();
			if(!_mobile){
				$.alert("手机不能为空");
				return false;
			}
			if(!_password){
				$.alert("密码不能为空");
				return false;
			}
		    	window._loading = new mask("loading");
			window._loading.show();
			
			$.getDateAjax({
				page:"patient",
				inter:"gotoLogin",
				data:{mobile:_mobile,password:_password},
				method:"POST",
				dataType:"json",
				callback:function(data){
					data = eval("("+data+")");
					window._loading && window._loading.hide(); 
					if(data.value){
						gm.patient.setPatient(data.message.customerUuid);
						var returnRul = gm.para.get(window.location.href,"returnurl") || "/patient/index/page.shtml";
						setTimeout(function(){gm.pul.toUrl( returnRul);},500);
					}else{
						$.alert(data.message);
					}
				}
			});

			
		}
	});
}

gm.reg.registerOne = function(data){
	if(!data){
		$.alert("服务器出错!");
	}
	if(data.query.success == "1"){
		gm.patient.setPatient(data.customerUuid);
		setTimeout(function(){gm.pul.toUrl( "/patient/reg/perfect_data.shtml");},500);
	}else{
		$.alert(data.query.message);
	}
}

//注册
gm.reg.reg = function(){
	$(".login_box2").verify();
	$(".btn-radius").bind({
		touchend:function(){
			var _gou = $(".reg_protocol i").attr("class");

			if(!_gou){
				$.alert("请阅读协议，并同意才能进行注册操作.")
				return;
			}

			var _mobile = $(".mobile").val();
			var _password = $(".password").val();
			var _v = $(".verify_code input").val();
			if(!_mobile){
				$.alert("请输入手机号");
			}else if(!/^1\d{10}$/.test(_mobile)){console.log(_mobile,/^1\d{10}$/.test(_mobile))
				$.alert("请输入正确格式的手机号");
			}else if(!_password){
				$.alert("请输入密码");
			}else if(!/^\S{6}/.test(_password)){
				$.alert("请输入至少6位数密码<br>（且不含有空格）");
			}else if(!_v){
				$.alert("请输入验证码");
			}else if(!/^\d{6}$/.test(_v)){
				$.alert("请输入正确格式的验证码");
			}else{
				$.getDate({
					page:"patient",
					inter:"registerOne",
					data:{mobile:_mobile,password:_password,captcha:_v},
					method:"POST",
					callback:gm.reg.registerOne
				});
			}
		}
	});
}
gm.reg.registerOne = function(data){
	if(!data){
		$.alert("服务器出错!");
	}
	if(data.query.success == "1"){
		gm.patient.setPatient(data.customerUuid);
		setTimeout(function(){gm.pul.toUrl( "/patient/reg/perfect_data.shtml");},500);
	}else{
		$.alert(data.query.message);
	}
}
gm.reg.registerTwo = function(data){
	if(!data){
		alert("服务器出错!");
	}
	if(data.query.success == "1"){
		gm.pul.toUrl("goodm://toComplete");
	}else{
		alert(data.query.message);
	}
}
//注册第二步
gm.reg.perfect = function(){
	//添加上传头像绑定事件
	gm.upimgmaxwidth = 200;
	$(".upload_photo").upimage(function(data){
			if(!data){
				$.alert("服务器出错!");
			}
			if(data.query.success == "1"){
				var img = $(".upload_photo img");
				if(img.length == 0){
					img = $("<img />");

					$(".upload_photo").append(img);
				}
				$(".upload_photo img").attr("upsrc",data.icon);
				$(".upload_photo img").attr("src",data.smallUrl);
			}else{
				$.alert(data.query.message);
			}
		// console.log(url);
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
	

	$(".datebox,.datebox input").bind({
		touchend:function(){
			$(".datebox span").hide();
		},
		change:function(){
			$(".datebox span").hide();
		},
		touchstart:function(){
			$(".datebox span").hide();
		}
	})
	$(".datebox2,.datebox2 input").bind({
		touchend:function(){
			$(".datebox2 span").hide();
		},
		change:function(){
			$(".datebox2 span").hide();
		},
		touchstart:function(){
			$(".datebox2 span").hide();
		}
	})
	//完成
	/*$(".login_but button").eq(0).bind({
		touchend:function(){
			var _customerUuid = gm.patient.getPatient();
			var _customerName = $(".login_box2 input").eq(0).val();
			var _realName = $(".login_box2 input").eq(1).val();
			var _birthday = $(".login_box2 input").eq(2).val();
			var _illnessDescription = $(".login_box2 input").eq(3).val();
			var _wee = $(".btn-checkbox .btn-checkbox-a").attr("class").split(' ');
			var _sex = "";
			//判断性别
			if (_wee[1]){
				_sex = "1";
			}else{
				_sex = "2";
			}
			var _icon = $(".upload_photo img").attr("upsrc") || (_sex == "1" ? window.___defaultImage_p_man : window.___defaultImage_p_woman);

			if(!_customerName){
				$.alert("请填写昵称");
				return false;
			}
			if(!_realName){
				$.alert("请填写姓名");
				return false;
			}
			if(!_birthday){
				$.alert("请选择出生日期");
				return false;
			}
			// if(!_illnessDescription){
			// 	$.alert("请填写病情描述");
			// 	return false;
			// }
			// if(!_icon){
			// 	$.alert("请上传头像");
			// 	return false;
			// }
			if(!_sex){
				$.alert("请选择性别");
				return false;
			}
			$.getDate({
				page:"patient",
				inter:"registerTwo",
				data:{customerUuid:_customerUuid,customerName:_customerName,illnessDescription:_illnessDescription,birthday:_birthday,sex:_sex,icon:_icon,realName:_realName,callback:"gm.reg.registerTwo"},
				method:"POST",
				dataType:"script"
			});
		}
	})
	//跳过此步
	$(".login_but button").eq(1).ontouch(function(){
		
		gm.pul.toUrl( "/patient/index/page.shtml");
	});*/
	
	//完善用户信息
	$(".login_but button").eq(0).bind({
		touchend:function(){
			var _customerUuid =gm.patient.getPatient();
			var _customerName = $("#customerName").val();//昵称
			var _realName = $("#realName").val();//真实姓名
			var _birthday = $("#birthday").val();//出生日期
			var _illnessDescription = $("#illnessDescription").val();//病情描述 
			var _diseaseTime=$("#diseaseTime").val();//病程
			var _firstDiagnosis=$("#firstDiagnosis").val();//首次就诊时间
			var _seizureTimes=$("#seizureTimes").val();//复发次数
			var _height=$("#patient_height").val();//身高
			var _weight=$("#patient_weight").val();//体重
			var _ifStart=$('#ifStart option:selected').val();//首发
			var _marryState=$('#marryState option:selected').text();
			console.log(_marryState);
			var _industry=$("#industry").val();//职业
			var _email=$("#email").val();//email
			var _address=$("#address").val();//地址
			var _certCode=$("#idcard").val();//身份证
			var _nearlyDrugs=$("#nearlyDrugs").val();//近三个月使用的药物
			var _wee = $(".btn-checkbox .btn-checkbox-a").attr("class").split(' ');
			var _sex = "";
			//判断性别
			if (_wee[1]){
				_sex = "1";
			}else{
				_sex = "2";
			}
			if(!_customerName){
				alert("请填写昵称");
				return false;
			}
			if(!_realName){
				alert("请填写姓名");
				return false;
			}
			if(!_birthday){
				alert("请选择出生日期");
				return false;
			}
			if(!_sex){
				alert("请选择性别");
				return false;
			}
			if(!_illnessDescription){
				alert("请输入病情描述 ");
				return false;
			}
			if(!_diseaseTime){
				alert("请输入病程 ");
				return false;
			}
			if(!_firstDiagnosis){
				alert("请输入首次就诊时间 ");
				return false;
			}
			if(!_seizureTimes){
				alert("请输入复发次数");
				return false;
			}
			if(!_height){
				alert("请输入身高");
				return false;
			}
			if(!_weight){
				alert("请输入体重");
				return false;
			}
			if(_ifStart=="首发")
				_ifStart=1;
			else
				_ifStart=0;
			
			
			//非必传
			if(_email!=""){
				if(!CheckMail(_email)){
					alert("邮箱格式错误");
					return false;
				}
			}
			if(_certCode!=""){
				if(!IdentityCodeValid(_certCode)){
					alert("身份证输入有误");
					return false;
				}
			}
			if($("#marryState").get(0).selectedInde<=0)
				_marryState="";
				
			
			//编辑患者个人信息详情
			$.getDate({
				page:"patient",
				inter:"editCustomerInfo",
				data:{customerUuid:_customerUuid,customerName:_customerName,illnessDescription:_illnessDescription,birthday:_birthday,sex:_sex,ifStart:_ifStart,realName:_realName,diseaseTime:_diseaseTime,firstDiagnosis:_firstDiagnosis,seizureTimes:_seizureTimes,height:_height,marryState:_marryState,weight:_weight,industry:_industry,email:_email,address:_address,certCode:_certCode,nearlyDrugs:_nearlyDrugs,callback:"gm.reg.registerTwo"},
				method:"POST",
				dataType:"script"
			});
		}
	});
}

	
	//登录页修改密码
	$(".login_forget .btn-radius").bind({
		touchend:function(){
			var _submitObj = $(this).parent();
			var _mobile = $(".login_forget .login_box2 .mobile").val();
			var _v = $(".login_forget .verify_code input").val();
			var _password = $(".login_forget .login_box2 .password").val();

			if(_v == ____captcha){
				//输入验证码正确
				$.getDate({
					page:_submitObj.attr("page"),
					inter:_submitObj.attr("inter"),
					data:{mobile:_mobile,password:_password,captcha:_v},
					callback:function(data){
						if(!data){
							$.alert("服务器出错!");
						}
						if(data.query.success){
							$.alert({
								val : "修改成功！",
								type : "flash"
							});
						}else{
							$.alert(data.query.message);
						}
					}
				});
			}else{
				//输入验证码错误
				$.alert("输入验证码错误");
			}

		}
	});


	// 完善其他信息_点击下一步
	// $(".addreginfo_qt .login_but button").bind({
	// 	touchend:function(){
	// 		var _submitObj = $(this).parent();

	// 		var _doctorUuid = localStorage.getItem("_doctorUuid");
	// 		var _province = $("#selectp p").attr("value");
	// 		var _city = $("#selectc p").attr("value");
	// 		var _area = $("#selectq p").attr("value");
	// 		var _infirmary = $("#selecti p").attr("value");
	// 		var _departments = $("#selectk p").attr("value");
	// 		var _telephone = $("#selectd p").val();
	// 		var _speciality = $(".addreginfo_qt .li_fe").val();

	// 		$.getDate({
	// 			page:_submitObj.attr("page"),
	// 			inter:_submitObj.attr("inter"),
	// 			data:{doctorUuid:_doctorUuid,province:_province,city:_city,area:_area,infirmary:_infirmary,departments:_departments,telephone:_telephone,speciality:_speciality},
	// 			callback:function(data){
	// 				if(!data){
	// 					$.alert("服务器出错!");
	// 				}
	// 				if(data.query.success){

	// 					$(".addreginfo_license").addClass("curpage");
	// 					$(".addreginfo_qt").removeClass("curpage");
	// 				}else{
	// 					$.alert(data.query.message);
	// 				}
	// 			}
	// 		});
	// 		$(".addreginfo_license").addClass("curpage");
	// 					$(".addreginfo_qt").removeClass("curpage");
	// 	}
	// });

	
	//添加事件，为获取注册手机验证码绑定
	// $("#registration").verify();

	//添加上传头像绑定事件
	// $(".upload_photo").upimage(function(url){
	// 	// console.log(url);
	// });

});
window.____captcha = "";
gm.getVerificationCode = function(data){
	if(!data){
		$.alert("服务器出错!");
	}
	if(data.query.success){
		window.____captcha = data.captcha;
	}else{
		$.alert(data.query.message);
	}
}
//获取验证码
$.fn.verify = function(){
	var _this = this;

	_this.each(function(i,o){
		var _o = o;
		$(o).on("touchend","button",function(){
				//判断有没有填写手机号码
				var _mobile = $(_o).find(".mobile").val();
				
				if(_mobile){
					//填写过手机号码，判断手机号码格式
					if(/^[1][0-9]{10}$/.test(_mobile)){
						var _submitObj = $(this).parent();

						var _num = 60;
						function num(){
							_num--;
							if (_num == 0) {
								$(".baobe").html('<button class="btn-def" id="mobilev">获取手机验证码</button>');
								clearInterval(timer1);
							}else{
								$(".baobe").html('<div class="btn-def">等待验证('+_num+')</div>');
							}
						}
						var timer1 = setInterval(num, 1000);

						$.getDate({
							page:"patient",
							inter:"getVerificationCode",
							data:{mobile:_mobile},
							// method:"POST",
							// dataType:"script"
							callback:function(data){
								if(!data){
									$.alert("服务器出错!");
								}
								if(data.query.success == "1"){
									window.____captcha = data.captcha;
								}else{
									$.alert({
										val : data.query.message,
										callback : function(){
											clearInterval(timer1);
											$(".baobe").html('<button class="btn-def" id="mobilev">获取手机验证码</button>');
										}
									});
								}
							}
						})
					}else{
						//失败，手机验证不通过
						$.alert("手机号码格式不正确，请重新填写")
					}
				}else{
					//没有填写手机号码
					$.alert("请填写手机号码")
				}
		});		
	});
}
function IdentityCodeValid(code) { 
    var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
    var tip = "";
    var pass= true;
    
    if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
        tip = "身份证号格式错误";
        pass = false;
    }
    
   else if(!city[code.substr(0,2)]){
        tip = "地址编码错误";
        pass = false;
    }
    else{
        //18位身份证需要验证最后一位校验位
        if(code.length == 18){
            code = code.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
            //校验位
            var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++)
            {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
            }
            var last = parity[sum % 11];
            if(parity[sum % 11] != code[17]){
                tip = "校验位错误";
                pass =false;
            }
        }
    }
    if(!pass) alert(tip);
    return pass;
}
function CheckMail(mail) {
	 var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	 if (filter.test(mail)) 
		 return true;
	 else {
		 return false;
	 }
}