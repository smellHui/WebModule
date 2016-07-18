$(document).ready(function(){
	// 首页-立即注册
	$(".ljzc").bind({
		touchend:function(){
			$(".login").removeClass("curpage");
			$(".reg").addClass("curpage");
		}
	});

	// 注册页
	$(".dl").bind({
		touchend:function(){
			$(".login_forget").removeClass("curpage");
			$(".login").addClass("curpage");
		}
	});

		//获取省市区
	$.fn.getProvince = function(obj){
		var _ = this;
		_.append('<input class="p" name="p" type="hidden" /><input class="c" name="c" type="hidden" /><input class="q" name="q" type="hidden" />')

		$.getDate({
			page:"public",
			inter:"getProvince",
			callback:function(data){
				if(!data){
					$.alert("服务器出错！")
					return;
				}

				if(data.query.success === "1"){
					var arr = [];

					var __province = {
						"title" : "请选择省",
						"lists" : [
							{ "id" : "0" , "val" : "选择省" , "disabled" : "1" }
						],
						"backEvent" : function(){
							__provinceBar.close(__province);
						},
						"selectedCallback" : function(msg){
							_.find(".p").val(msg.id);
							_.find(".p").attr("name",msg.val);

							//绑定城市
							$.getDate({
								page:"public",
								inter:"getCity",
								data:{provinceUuid:msg.id},
								callback:function(data){
									var __city = {
										"title" : "请选择城市",
										"lists" : [
											{ "id" : "0" , "val" : "选择城市" , "disabled" : "1" }
										],
										"backEvent" : function(){
											__provinceBar.tab(__province);
										},
										"selectedCallback" : function(msg){
											_.find(".c").val(msg.id);
											_.find(".c").attr("name",msg.val);

											$.getDate({
												page:"public",
												inter:"getRegion",
												data:{cityUuid:msg.id},
												callback:function(data){
													var __qu = {
														"title" : "请选择区",
														"lists" : [
															{ "id" : "0" , "val" : "选择区" , "disabled" : "1" }
														],
														"backEvent" : function(){
															__provinceBar.tab(__city);
														},
														"selectedCallback" : function(msg){
															_.find(".q").val(msg.id);
															_.find(".q").attr("name",msg.val);

															__provinceBar.close();

															_.find("span").html(_.find(".p").attr("name") + " " + _.find(".c").attr("name") + " " +_.find(".q").attr("name"));

															$("#i").getHospital();
														}
													}

													//获取成功
													$(data.relist).each(function(i,o){
														__qu.lists.push({
															"id":o["code"],
															"val":o["regionName"]
														});
														//arr.push('<option value="'+o["code"]+'">'+o["provinceName"]+'</option>');
													});

													__provinceBar.tab(__qu);
												}
											});
										}
									};

									//获取成功
									$(data.relist).each(function(i,o){
										__city.lists.push({
											"id":o["code"],
											"val":o["cityName"]
										})
										//arr.push('<option value="'+o["code"]+'">'+o["provinceName"]+'</option>');
									});

									__provinceBar.tab(__city);
								}
							});
						}
					}

					//获取成功
					$(data.relist).each(function(i,o){
						// var selected = (o["code"]=="110000" ? 1 : 0);
						__province.lists.push({
							"id":o["code"],
							"val":o["provinceName"]
							// "selected":selected
						})
						//arr.push('<option value="'+o["code"]+'">'+o["provinceName"]+'</option>');
					});
					var __provinceBar = new selectBar(__province);
					
					_.bind({
						touchend:function(){
							__provinceBar.open(__province);
						}
					});
				}else{
					//出错了
					$.alert(data.query.message);
				}
			}
		})
	}

	//获取医院
	$.fn.getHospital = function(obj){
		var _option = {
			showi : "#person_hospital"
		}
		var _ = this;
		var _l = $("#person_city .q").attr("value");
		var _c=$("#person_city .c").attr("value");
		var _p=$("#person_city .p").attr("value");
		$.getDateAjax({
			page:"public",
			inter:"getHospital",
			data:{regionUuid:_l,cityUuid:_c,provinceUuid:_p},
			callback:function(data){
				if(!data){
					$.alert("服务器出错！")
					return;
				}
				console.log("data:"+data);
				if (data.code==200) {
					var arr = [];
					var _getHospital = '<option value="0">选择医院</option>';

					$(data.value).each(function(i,o){
						arr.push('<option value="'+o["id"]+'">'+o["hospitalName"]+'</option>');
					});

					_.html(_getHospital + arr.join(""));

					_.bind({
						change:function(){
							var pid = $(_).val();
							var arr = [];

							$("#person_hospital span").html($($(_).find("option")[$("#i")[0].selectedIndex]).html());
							$("#person_hospital span").attr("value",$($(_).find("option")[$("#i")[0].selectedIndex]).attr("value"));
						}
					});
				};
			}
		});
	}

	// //性别女
	// $(".addreginfo .btn-checkbox-b").bind({
	// 	touchend:function(){
	// 		$(".btn-checkbox-a").removeClass("btn-checkbox-a-on");
	// 		$(".btn-checkbox-b").addClass("btn-checkbox-b-on");
	// 		var arr = $(".btn-checkbox-b").attr("class").split(" ");
	// 	}
	// });

	// //性别男
	// $(".addreginfo .btn-checkbox-a").bind({
	// 	touchend:function(){
	// 		$(".btn-checkbox-b").removeClass("btn-checkbox-b-on");
	// 		$(".btn-checkbox-a").addClass("btn-checkbox-a-on");
	// 	}
	// });


	//注意事项
	$(".zcxy").bind({
		touchend:function(){
			$(".reg").removeClass("curpage");
			$(".addreginfo_amet").addClass("curpage");
		}
	});

	//取消注意事项
	$(".zc_fh").bind({
		touchend:function(){
			$(".addreginfo_amet").removeClass("curpage");
			$(".reg").addClass("curpage");
		}
	});

	// 都不是_点击跳转
	$(".atz1_but").bind({
		touchend:function(){
			$(".addreginfo_qt").addClass("curpage");
			$(".addreginfo_name").removeClass("curpage");
		}
	});

	// 上传照片后，点击注册按钮跳转
	$(".addreginfo_license .tz1_zc").bind({
		touchend:function(){
			$(".login").addClass("curpage");
			$(".addreginfo_license").removeClass("curpage");
		}
	});
	

	//获取省信息
	// $("#p").getProvince();

});

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
								if(data.query.success == "1"){
									window.____captcha = data.captcha;
									console.log(data.captcha);
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
						});
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

gm.reg = gm.reg || {};

//注册第一步
gm.reg.reg = function(){
	$(".reg_protocol i").click(function(){
		if(this.className == "gou"){
			this.className = "";
		}else{
			this.className = "gou";
		}
	});

	//添加事件，为获取注册手机验证码绑定
	$(".login_box2").verify();

	$(".zcxy").bind({
		touchend:function(e){
			e.preventDefault();

			$(".addreginfo_amet").addClass("show");
		}
	});

	$(".addreginfo_amet").bind({
		touchend:function(){
			$(".addreginfo_amet").removeClass("show");
		}
	});

	//手机获取验证码后，下一步验证
	$("#logon_register .reg .btn-radius").bind({
		touchend:function(){
			var _gou = $(".reg_protocol i").attr("class");

			if(!_gou){
				$.alert("请阅读协议，并同意才能进行注册操作.")
				return;
			}

			var _mobile = $("#logon_register .login_box2 .mobile").val();
			var _password = $("#logon_register .login_box2 .password").val();
			var _v = $(".reg .verify_code input").val();
			var _submitObj = $(this).parent();

			if(/[\d+]{11}/.test(_mobile)){
				if(_v){
					//输入验证码正确
					$.getDate({
						page:_submitObj.attr("page"),
						inter:_submitObj.attr("inter"),
						data:{mobile:_mobile,password:_password,captcha:_v},
						method:"POST",
						dataType:"JSON",
						callback:function(data){
							if(!data){
								$.alert("服务器出错!");
							}
							if(data.query.success === "1"){
								gm.pul.toUrl( "/html/reg/addreginfo.shtml?doctorUuid=" + data.doctorUuid);
							}else{
								$.alert(data.query.message);
							}
						}
					});
				}else{
					//输入验证码错误
					$.alert("请输入验证码");
				}
			}else{
				$.alert("请输入完整手机号码！");
			}
		}
	});
}

gm.reg.addreginfo_qt = function(){
	var s;

	function clearRight(){
		gm.pul.returnurl = function(){
			history.go(-1);
		};
		gm.n = function(){};
		gm.pul.toUrl('goodm://setRightMenu/{"menuimg":"http://app.hxqydyl.com/imgs/nullmenu.png","menuevent":"gm.n"}');
	}
	function setRight(){
		gm.pul.returnurl = function(){
			s.boxClose();
		};
		gm.n = function(){
			s.complete();
		}
		gm.pul.toUrl('goodm://setRightMenu/{"menuimg":"http://app.hxqydyl.com/imgs/wc_img.png","menuevent":"gm.n"}');
	}

	$("body").on("touchend",".checkboxBarBtnCancel",function(){
		clearRight();
	});

	$(".li_fe span").bind({
		touchend:function(){
			var _k = [];
			setRight();
			$.getDate({
				page:"patient",
				inter:"getTags",
				data:{},
				callback:function(data){
					if(!data){
						$.alert("服务器出错!");
					}
					if(data.query.success){
						$(data.reList).each(function(i,o){
							_k.push({ "id" : o["tagUuid"] , "val" : o["tagName"] });
						});
						s = new checkboxBar({
						    "data" : _k,
						    "callback" : function(data){
						        $(".li_fe span").html(data.val);
						        clearRight();
						    },
						    "maxlength" : 5
						});
					}else{
						$.alert(data.query.message);
					}
				}
			});
			
		}
	})
	$("#selectp").getProvince();

	$("#k").getDepartment();

	var gsfa = gm.para.get(window.location.href,"gsfa");
	var _p = "gm.reg.regThree";

	if (gsfa) {
		gm.pul.returnurl = function(){
			gm.pul.toUrl('/html/user/personal_information.shtml')
		}
		gm.pul.setTitle("修改个人信息");
		$("title,h2").html("修改个人信息");
		$(".login_but button").html("保存");
		_p = "gm.reg.regThrees"
		$.getDate({
			page:"doctor",
			inter:"getDoctorInfo",
			data:{doctorUuid:gm.user.getDoctor()},
			callback:function(data){
				if(!data){
					$.alert("服务器出错!");
				}
				if(data.query.success){console.log(data)
					$(".login_box2 li").eq(0).find("p").html((data.doctorInfo.provinceName || "选择省市县/区") + " " + (data.doctorInfo.cityName || "") + " " + (data.doctorInfo.regionName || ""));
					$("#selectp .p").attr("value",data.doctorInfo.province);
					$("#selectp .c").attr("value",data.doctorInfo.city);
					$("#selectp .q").attr("value",data.doctorInfo.region);
					$(".login_box2 li").eq(1).find("p").html(data.doctorInfo.hospital || "选择执业医院").attr("value",data.doctorInfo.hospitalUuid);
					$("#i").getHospital();
					$(".login_box2 li").eq(2).find("p").html(data.doctorInfo.department || "选择科室").attr("value",data.doctorInfo.departmentUuid);
					$("#k option").each(function(i,o){
						if(data.doctorInfo.department == $(o).html()){
							$("#k")[0].selectedIndex = i;
						}
					});

					$(".login_box2 li").eq(3).find("input").val(data.doctorInfo.departmentLine || "");//科室电话
					
					// $(".login_box2 li").eq(4).find("p").html(___professional[data.doctorInfo.professional*1] || "");//职称

					$(".li_fe span").html(data.doctorInfo.territory || "");//输入专长
					$(".login_box2 li").eq(6).find("input").val(data.doctorInfo.synopsis || "");//输入个人简介

					$("#doctor_title").getChangeVal(data.doctorInfo.professional);

					$("#doctor_title select")[0].selectedIndex = data.doctorInfo.professional*1;
				}else{
					$.alert(data.query.message);
				}
			}
		});
	}else{
		$("#doctor_title").getChangeVal(0);
	}

	$(".addreginfo_qt .login_but .button1").bind({
		touchend:function(){
			var _submitObj = $(this).parent();


			var _province = $("#selectp .p").attr("value");
			var _city = $("#selectp .c").attr("value");
			var _area = $("#selectp .q").attr("value");
			var _infirmary = $("#selecti p").attr("value");
			var _departments = $("#selectk p").attr("value");
			var _telephone = $("#selectd input").val();
			var _professional = $("#doctor_title p").attr("value");
			var _speciality = $(".addreginfo_qt .li_fe span").html();
			var _synopsis = $(".addreginfo_qt .li_fes input").val();

			var _doctorUuid = gm.para.get(window.location.href,"doctorUuid") || gm.user.getDoctor();

			if (!_province || !_city || !_area) {
				$.alert({ "val" : "请选择省市区", "type" : "flash" , "callback" : function(){}});
				return;
			}
			if (!_infirmary) {
				$.alert({ "val" : "请选择执业医院", "type" : "flash" , "callback" : function(){}});
				return;
			}
			if (!_departments) {
				$.alert({ "val" : "请选择科室", "type" : "flash" , "callback" : function(){}});
				return;
			}
			if (!_speciality) {
				$.alert({ "val" : "请选择个人专长", "type" : "flash" , "callback" : function(){}});
				return;
			}
			window._loading = new mask("loading");
			_loading.show();
			$.getDate({
				page:_submitObj.attr("page"),
				inter:_submitObj.attr("inter"),
				data:{doctorUuid:_doctorUuid,province:_province,professional:_professional,city:_city,area:_area,infirmary:_infirmary,departments:_departments,telephone:_telephone,speciality:_speciality,synopsis:_synopsis,callback:_p},
				method:"POST",
				dataType:"script"
			});
		}
	});
	$(".login_but .button2").bind({
		touchend:function(){
			gm.pul.toUrl( "/html/index/page.shtml");
		}
	});
}
//注册第三步
gm.reg.regThree = function(data){
	window._loading && window._loading.hide();
	if(!data){
		$.alert("服务器出错!");
	}
	if(data.query.success=="1"){
		gm.user.setDoctor(data.uuid);
		gm.pul.toUrl( "/html/reg/addreginfo_license.shtml");
	}else{
		$.alert(data.query.message);
	}
}

gm.reg.regThrees = function(data){
	window._loading && window._loading.hide();
	if(!data){
		$.alert("服务器出错!");
	}
	if(data.query.success=="1"){
		gm.pul.toUrl( "/html/user/personal_information.shtml");
	}else{
		$.alert(data.query.message);
	}
}