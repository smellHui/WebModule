$(document).ready(function(){

	//  病例跳转
	$("#case li h3").bind({
		touchend:function(){
			gm.pul.toUrl("/patient/home/case_notes.shtml");
		}
	});
	gm.home = gm.home || {};
	//预约加号
	gm.home.appointment =  function(){
		//用户登录判断，没登录，跳转登录页面
		gm.user.vcLogin();

		var uid = gm.para.get(window.location.href,"doctorUuid");
		var _length = 0;
		var _ylen = 0;

		var _loading = new mask("loading");
		_loading.show();
		$.getDate({
			page:"patient",
			inter:"toPlusPage",
			data:{doctorUuid:uid,customerUuid:gm.patient.getPatient()},
			callback:function(data){
				_loading.hide();

				var tmp = '<div class="doctor">\
							<div class="icon1">\
								<img src="{doctorIcon}">\
							</div>\
							<div class="p_fbjn">\
								<h3>{doctorRealName}<i class="icon-{sex}"></i></h3>\
								<p>{hospitalName}</p>\
							</div>\
							<div class="p_yvbu">\
								<p class="p_hjf">{professional}</p>\
								<p>{departmentName}</p>\
							</div>\
						</div>';

				$(data.relist).each(function(i,o){
					o["sex"] = (o["customerSex"] ? "boy" : "girl");
					o.professional = window.___professional[o.professional*1];
					o.doctorIcon = o.doctorIcon || window.___defaultImage;

					$("#bacjkloa").html(gm.replace(tmp,o));

					for(var k in o){
						var str = o[k];
						if(k == "customerSex"){
							str = o[k] == "1" ? "男" : "女";
						}else{}
						$("." + k).html(str);
					}
				});

				if(!data.hvsList || data.hvsList.length == 0){
					$.alert({
						// val:data.relist[0].customerRealName + "，医生的就诊时间出现了拥挤情况,抱歉",
						val:$(".p_fbjn h3").text() + "，医生的就诊时间出现了拥挤情况,抱歉",
						timer:1500,
						type:"flash",
						callback:function(){
							gm.pul.toUrl("/patient/home/thedoctorlist.shtml");
						}
					});
					return;
				}else{
					_length = data.hvsList.length;
				}

				

				var __time = {
					"title" : "请选择时间",
					"lists" : [
						{ "id" : "0" , "val" : "选择时间" , "disabled" : "1" }
					],
					"backEvent" : null,
					"selectedCallback" : function(msg){
						var arr = msg.val.split(" ");
						$(".time").html(arr[0]);
						$(".timetype").html(arr[1]).attr("value",msg.id);

						__timeBar.close();
					}
				}

				var dname = ["","全天","上午","下午"];

		 		var _length = 7;
				var d = new Date();
				var _day = d.getDay();
				var days = {};

				for(var i=0;i<_length;i++,_day++){
					var n = d.getTime() + i * 24 * 60 * 60 * 1000;
					
					//获得7天数数组
					var result = new Date(n);

					//获得当前时间
					var _show = result.getFullYear() + "-" + (result.getMonth() + 1) + "-" + result.getDate();
					
					_day = _day%7;
					_day = (_day==0?7:_day);
					
					days[""+_day] = _show;
				}

				$(data.hvsList).each(function(i,o){
					var _show = days[o.weekDate] + " " + dname[o.timeType*1];
					__time.lists.push({
						id:o.timeType,
						val:_show
					})
				});


				//获取预约加号记录
				$.getDate({
					page:"doctor",
					inter:"getPlusConfs",
					data:{doctorUuid:uid},
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

							var arr = [];
							_ylen = data.plusNum;console.log(data,_length , _ylen)

							// if(_length >= _ylen){
							// 	$.alert({
							// 		val:$(".p_fbjn h3").text() + "医生的就诊时间出现了拥挤情况,请选择其他医生预约.",
							// 		timer:1500,
							// 		callback:function(){
							// 			gm.pul.toUrl("/patient/home/thedoctorlist.shtml");
							// 		}
							// 	});
							// }
						}else{
							$.alert(data.query.message);
						}
					}
						
				});

				window.__timeBar = new selectBar(__time);
			}
		});


		gm.n = function(data){
			if(!data){
				$.alert("服务器出错");
				return;
			}

			if(data.query.success == "1"){
				gm.pul.toUrl("url?doctorUuid=" + uid);
			}else{
				$.alert(data.query.message);
			}
		}

		$(".btn-radius").bind({
			touchend:function(){
				// if(_length >= _ylen){
				// 	$.alert({
				// 		val: $(".p_fbjn h3").text() + "医生的就诊时间出现了拥挤情况,请选择其他医生预约.",
				// 		timer:1500,
				// 		callback:function(){
				// 			gm.pul.toUrl("/patient/home/thedoctorlist.shtml");
				// 		}
				// 	});
				// 	return;
				// }

				gm.n = function(data){
					//服务器传输回应
					if(!data){
						$.alert("服务器出错!");
					}

					if(data.query.success=="1"){
						//操作
						$.alert({
							val:"预约加号成功",
							callback:function(){
								//gm.pul.returnurl();
								gm.pul.toUrl("/patient/my_doctor/index.shtml");
							}
						});
					}else{
						$.alert(data.query.message);
					}
				}

				// var plusNote = $(".elaborl textarea").val();
				var seeDoctorTime = $(".time").html();
				var timeType = $(".timetype").attr("value");
				var orderIllness = $("#jibing").val();
				var orderReason = $("#mudi").val();
				var illnessDescription = $(".il_ription input").val();

				// if(!plusNote){
				// 	$.alert({
				// 		val:"请填写加号说明"
				// 	});
				// 	return;
				// }

				if(!seeDoctorTime){
					$.alert({
						val:"请选择就诊时间"
					});
					return;
				}

				if(!orderIllness){
					$.alert({
						val:"请填写疾病"
					});
					return;
				}

				if(!orderReason){
					$.alert({
						val:"请填写预约目的"
					});
					return;
				}

				if(!illnessDescription){
					$.alert({
						val:"请填写病情描述"
					});
					return;
				}

				$.getDate({
					page:"patient",
					inter:"savePlus",
					method:"POST",
					dataType:"script",
					data:{
						customerUuid:gm.patient.getPatient(),
						doctorUuid:uid,
						//加号说明
						// plusNote:plusNote,
						//就诊时间
						seeDoctorTime:seeDoctorTime,//缺失 就诊时间来源
						//就诊时间类型
						timeType:timeType,
						//疾病
						orderIllness:orderIllness,
						//预约目的
						orderReason:orderReason,
						//病情描述
						illnessDescription:illnessDescription,
						//回调函数
						callback:"gm.n"
					}
				});
			}
		});
		
		$(".sarred").bind({
			touchend:function(){
				__timeBar.open();
			}
		})

	}

	gm.home.bindPersonal = function(data){
		if(!data){
			$.alert("服务器出错!");
		}
		if(data.query.success=="1"){
			gm.home.orderStatus = data.order.orderStatus;
			gm.home.orderMainUuid = data.order.orderUuid;
			console.log("订单保存成功",gm.home.orderMainUuid);
		}else{
			$.alert({
				val:data.query.message,
				timer:1500,
				callback:function(){
					history.back();
				}
			});

		}
	};

	gm.home.toPayment = function(){
		if(gm.home.orderStatus && gm.home.orderStatus == "1"){
			$.getDate({
				page:"patient",
				inter:"toPayment",
				data:{
					customerUuid:gm.patient.getPatient(),
					orderMainUuid:gm.home.orderMainUuid
				},
				callback : function(data){
					console.log(data);
					if(!data){
						$.alert("服务器出错!");
					}
					if(data.query.success == "1"){
						$.alert({
							"val" : "支付成功！",
							"callback" : function(){
								gm.pul.toUrl( "/patient/my/myorder.shtml");
							}
						});
					}else{
						$.alert(data.query.message);
					}
				}
			});
		}else if(gm.home.orderStatus == 2){
			$.alert("对不起，该订单已取消");
		}else {
			$.alert("对不起，该订单发生异常");
		}
	};

	//私人医生套餐详情
	gm.home.personal = function(){
		gm.user.vcLogin();
	    	window._loading = new mask("loading");
		window._loading.show();

		var _orderMainUuid = gm.para.get(window.location.href,"orderMainUuid");
		var uid = gm.para.get(window.location.href,"doctorUuid");

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
					var arr = [];
					var _o = "";
					var err = [];
					gm.home.orderMainUuid = _orderMainUuid;
					gm.home.orderStatus = data.orderInfo.orderState;
					var name = "";
					var desc = "";
					var money = 0;

					$(data.orderInfo).each(function(i,o){
						if (o["picTimes"] == 1) {
							_o = "无限";
						}else{
							_o = o["picTimes"]+"次";
						}
						arr.push('<div class="package_a">\
							<h2>'+o["packageName"]+'</h2>\
							<div class="price_a">\
							<i>'+o["orderPrice"]+'</i><span>元/月</span>\
							</div>\
							<p>图文咨询次数：'+_o+'</p>\
							<p>电话咨询次数：'+o["phoneTimes"]+'次</p>\
							<p>支持加号次数：'+o["plusTimes"]+'次</p>\
							</div>');

						desc = ''+o["packageName"]+' '+o["orderPrice"]+'</i><span>元/月 图文咨询次数：'+_o+'  电话咨询次数：'+o["phoneTimes"]+'次 支持加号次数：'+o["plusTimes"]+'次';
						name = o["packageName"];
						money = o["orderPrice"];

						o.professional = window.___professional[o.professional*1];

						$(".doctors_packagey").html(arr.join(""));
						
						gm.user.getDoctorDetail(uid,function(data){
							$(".doctor img").attr("src",data.relist[0].imgUrl || window.___defaultImage);
						});

						window._loading.hide();
					});

					$(data.doctorInfo).each(function(i,o){
						o["doctorSex"] = o["doctorSex"] || "1";

						if(o["doctorSex"] == "1"){
							o["doctorSex"] = "icon-boy";
						}else{
							o["doctorSex"] = "icon-girl";
						}

						name = o["doctorName"]  + " 医生 " + name;

						err.push('<a href="/patient/home/detailsofthedoctor.shtml?doctorUuid='+uid+'">\
							<div class="doctor">\
								<div class="icon1">\
								<img src="">\
								</div>\
								<div class="p_fbjn">\
									<h3>'+o["doctorName"]+'<i class="'+o["doctorSex"]+'"></i></h3>\
									<p>'+o["hospital"]+'</p>\
								</div>\
								<div class="p_yvbu">\
									<p class="p_hjf">'+___professional[o["professional"]-1]+'</p>\
									<p></p>\
								</div>\
							</div>\
						</a>');
						gm.user.getDoctorDetail(uid,function(data){
							$(".doctor img").attr("src",data.relist[0].imgUrl || window.___defaultImage);
						});
					});

					$("#bacjkloa").html(err.join(""));
					//支付
					$("#recharge li").each(function(i,o){
						$(this).ontouch(function(){
							if(i == 0){
								$("#home_doctor .mask_cen").show();
								return;
							}
							var data =  {
								orderUuid : gm.home.orderMainUuid,
								customerUuid : gm.patient.getPatient(),
								callback : {
									success:function(data){
										$.alert({
											val:"支付成功",
											type:"flash",
											callback:function(){
												gm.pul.toUrl("/patient/my/myorder.shtml");
											}
										})
									},
									failure:function(data){
										$.alert({
											val:"支付失败，如遇到问题，请联系客服 ： <a href='tel:400-135-8858'>客服电话 400-135-8858</a>",
											type:"flash"
										});
									},
									cancel:function(data){
										$.alert({
											val:"支付取消",
											type:"flash"
										});
									}
								},
								name : name,
								desc : desc,
								money : money,
								payType:i,
								userType:2
							};

							console.log(data);
							gm.toPay(data);
						});
					});
					// 确认支付
					$(".right_btn").bind({
						touchend:function(){
							var _password = $(".zf_box input").val();

							if(!_password){
								$.alert({
									val:"请输入支付密码",
									type:"flash"
								});
								return;
							}
							$.confirm("是否确定支付？",function(){

								$.getDate({
									page:"patient",
									inter:"checkPayPassWord",
									data:{customerUuid:gm.patient.getPatient(),password:_password,callback:"gm.home.getDsvjd"},
									method:"POST",
									dataType:"script"
								});
							});
						}
					});
				}else{
					$.alert(data.query.message);
				}
				____loading.hide();
			}
		});
	}

	gm.home.persona2 = function(){
		gm.user.vcLogin();
	    	window._loading = new mask("loading");
		window._loading.show();

		var pack = gm.para.get(window.location.href,"packageuuid");
		var uid = gm.para.get(window.location.href,"doctorUuid");

		$.getDate({
			page:"patient",
			inter:"toPersonnalPage",
			data:{packageManagementUuid:pack,doctorUuid:uid},
			callback:function(data){
				//服务器传输回应
				if(!data){
					$.alert("服务器出错!");
				}
				if(data.query.success=="1"){
					var arr = [];
					var _o = "";

					$(data.relist).each(function(i,o){
						if (o["netTimes"] == 1) {
							_o = "无限";
						}else{
							_o = o["netTimes"];
						}
						o["sex"] = o["sex"] || "1";

						if(o["sex"] == "1"){
							o["sex"] = "icon-boy";
						}else{
							o["sex"] = "icon-girl";
						}

						arr.push('<ul>\
							<li id="bacjkloa">\
								<div class="doctor">\
									<div class="icon1">\
										<img />\
									</div>\
									<div class="p_fbjn">\
										<h3>'+o["doctorRealName"]+'<i class="'+o["sex"]+'"></i></h3>\
										<p>'+o["hospitalName"]+'</p>\
									</div>\
									<div class="p_yvbu">\
										<p class="p_hjf">'+___professional[o["professional"]-1]+'</p>\
										<p>'+o["departmentName"]+'</p>\
									</div>\
								</div>\
							</li>\
						</ul>\
						<div class="Pd_service">\
							<span>私人医生服务</span>\
						</div>\
						<div class="doctors_packagey">\
							<div class="package_a">\
								<h2>'+o["packageName"]+'</h2>\
								<div class="price_a">\
									<i>'+o["packageMoney"]+'</i><span>元/月</span>\
								</div>\
								<p>图文咨询次数：'+_o+'</p>\
								<p>电话咨询次数：'+o["phoneTimes"]+'次</p>\
								<p>支持加号次数：'+o["plusTimes"]+'次</p>\
							</div>\
						</div>\
						<div class="doctori_remind">\
							<p>你需要支付<b>'+o["packageMoney"]+'</b>元<br>选择支付方式</p>\
						</div>\
						<div class="recharge1">\
				<ul>\
					<li><button class="give_money"><span>确认支付</span></button></li>\
    			</ul>\
			</div>');

						o.professional = window.___professional[o.professional*1];

						$("#thepls_start").html(arr.join(""));
						
						gm.user.getDoctorDetail(uid,function(data){
							$(".doctor img").attr("src",data.relist[0].imgUrl || window.___defaultImage);
						});

						window._loading.hide();
					});
					//支付
					$("#recharge li").each(function(i,o){
						$(this).ontouch(function(){
							if(i == 0){
								$("#home_doctor .mask_cen").show();
								return;
							}
							var data =  {
								orderUuid : gm.home.orderMainUuid,
								customerUuid : gm.patient.getPatient(),
								callback : {
									success:function(data){
										$.alert({
											val:"支付成功",
											type:"flash",
											callback:function(){
												gm.pul.toUrl("/patient/my/myorder.shtml");
											}
										})
									},
									failure:function(data){
										$.alert({
											val:"支付失败，如遇到问题，请联系客服 ： <a href='tel:400-135-8858'>客服电话 400-135-8858</a>"
										});
									},
									cancel:function(data){
										$.alert({
											val:"支付取消",
											type:"flash"
										});
									}
								},
								name : name,
								desc : desc,
								money : money,
								payType:i,
								userType:2
							};

							gm.toPay(data);
						});
					});
					// 确认支付
					$(".give_money").bind({
						touchend:function(){
							var _password = $(".zf_box input").val();
							window.location.href = "homeprivatedoctors.shtml?orderMainUuid="+gm.home.orderMainUuid+"&doctorUuid="+uid;
						}
					});

					var _customerUuid = gm.patient.getPatient();
					var _doctorUuid = gm.para.get(window.location.href,"doctorUuid");
					var _cost = $(".doctori_remind b").html();
					var _money = data.relist[0]["packageMoney"];
					var _packageUuid = gm.para.get(window.location.href,"packageuuid");

					$.getDate({
						page:"patient",
						inter:"orderSave",
						method:"POST",
						data:{
							customerUuid:_customerUuid,//*患者ID
							doctorUuid:_doctorUuid,//*医生ID
							orderAmount:_money,//*订单金额
							orderType:"2",//*订单类型1：电话咨询 2：私人套餐
							// payType:"",//支付方式 0:线上支付 1：线下支付 
							// orderNote:""//订单备注
							packageUuid:_packageUuid,//*套餐ID
							callback:"gm.home.bindPersonal"
						},
						dataType:"script"
					});
				}else{
					$.alert(data.query.message);
				}
				____loading.hide();
			}
		});
	}

	//私人医生套餐
	gm.home.pack = function(){
		gm.user.vcLogin();
		var doctorUuid = gm.para.get(window.location.href,"doctorUuid");
		if(!doctorUuid){
			$.alert("参数错误");
			return;
		}

		$.getDate({
			page:"patient",
			inter:"getPackageList",
			data:{doctorUuid:doctorUuid},
			callback:function(data){
				//服务器传输回应
				if(!data){
					$.alert("服务器出错!");
				}
				if(data.query.success=="1"){
					var arr = [];
					var _o = "";

					$(data.relist).each(function(i,o){
						if (o["netTimes"] == 1) {
							_o = "无限";
						}else{
							_o = o["netTimes"];
						}
						arr.push('<li packageUuid="'+o["packageUuid"]+'">\
							<a href="homeprivatedoctors_1.shtml?doctorUuid='+doctorUuid+'&packageuuid='+o["packageUuid"]+'"></a>\
							<div class="h_taocan">\
								<h4>套餐'+o["packageName"]+'</h4>\
								<p><b>'+o["money"]+'</b>元/月</p>\
							</div>\
							<div class="p_zhujie">\
								<p>图文咨询次数：'+_o+'</p>\
								<p>电话咨询次数：'+o["phoneTimes"]+'次</p>\
								<p>支持加号次数：'+o["plusTimes"]+'次</p>\
							</div>\
						</li>');

						$("#package div ul").html(arr.join(""));
					});
				}else{
					$.alert(data.query.message);
				}
			}
		});
	}

	gm.home.getDsvjd = function(data){
		if(!data){
			$.alert("服务器出错!");
		}
		if(data.query.success == "1"){
			gm.home.toPayment();
		}else{
			$.alert("密码错误！");
		}
	}	

	gm.home.teleconsult1 = function(){
		gm.user.vcLogin();
		window._loading = new mask("loading");
		window._loading.show();

		var orderMainUuid = gm.para.get(window.location.href,"orderMainUuid");
		var customerUuid = gm.patient.getPatient();
		var name = "";
		var desc = "";
		var money = 0;

		var _touchType = 0;//支付类型 0余额支付 1支付宝 2微信支付

		$("#recharge li").bind({
			touchend:function(){
				_touchType = $(this).index();
			}
		});

		$(".dsuuc .vd2,.vgtu_cs .vd2").bind({
			touchend:function(){
				$(".zez_box1,.zez_box2").hide();
			}
		});

		$(".vd2").bind({
			touchend:function(){
				$(".zez_box1").hide();
			}
		});

		$(".logo-xoj").ontouch(function(){
			gm.pul.toUrl("/patient/my/myorder.shtml");
		},true);

		$.getDate({
			page:"patient",
			inter:"toOrderMainDetail",
			data:{orderMainUuid:orderMainUuid},
			callback:function(data){console.log(data)
				//服务器传输回应
				if(!data){
					$.alert("服务器出错!");
				}
				if(data.query.success=="1"){
					var arr = [];
					var _o = "";
					var err = [];
					var uid = data.doctorInfo.doctorUuid;
					gm.home.orderMainUuid = orderMainUuid;
					gm.home.orderStatus = data.orderInfo.orderState;

					$(data.orderInfo).each(function(i,o){
						$(".aptime").html(o.bookTime + " " + o.receiveTime + "-" + o.endTime);
						$(".desc p").html(o.orderDescription || "");
						$(".doctori_remind b").html(o.orderPrice);

						o.professional = window.___professional[o.professional*1];

						gm.user.getDoctorDetail(uid,function(data){
							$(".doctor img").attr("src",data.relist[0].imgUrl || window.___defaultImage);
						});

						desc = ''+(o["packageName"] || "")+' '+o["orderPrice"]+' 电话咨询：' + o.bookTime + " " + o.receiveTime + "-" + o.endTime;
						name = o["packageName"] || "";
						money = o["orderPrice"];
					});

					//医生信息绑定
					$(data.doctorInfo).each(function(i,o){
						o["doctorSex"] = o["doctorSex"] || "1";

						if(o["doctorSex"] == "1"){
							o["doctorSex"] = "icon-boy";
						}else{
							o["doctorSex"] = "icon-girl";
						}

						name = o["doctorName"] + "医生 " + name + "";

						err.push('<a href="/patient/home/detailsofthedoctor.shtml?doctorUuid='+uid+'">\
							<div class="doctor">\
								<div class="icon1">\
								<img src="">\
								</div>\
								<div class="p_fbjn">\
									<h3>'+o["doctorName"]+'<i class="'+o["doctorSex"]+'"></i></h3>\
									<p>'+o["hospital"]+'</p>\
								</div>\
								<div class="p_yvbu">\
									<p class="p_hjf">'+ (o["professional"] > 0 ? ___professional[o["professional"]] : "") +'</p>\
									<p></p>\
								</div>\
							</div>\
						</a>');
						gm.user.getDoctorDetail(uid,function(data){
							$(".doctor img").attr("src",data.relist[0].imgUrl || window.___defaultImage);
						});
					});

					$("#bacjkloa").html(err.join(""));

					if(gm.home.orderStatus == "1"){
						// 确认支付
						$(".right_btn").bind({
							touchend:function(){
								var _password = $(".zf_box input").val();
								if(!_password){
									$.alert({
										val:"请输入支付密码",
										type:"flash"
									});
									return;
								}

								$.confirm("是否确定支付？",function(){
									$.getDate({
										page:"patient",
										inter:"checkPayPassWord",
										data:{customerUuid:customerUuid,password:_password,callback:"gm.home.getDsvjd"},
										method:"POST",
										dataType:"script"
									});
								});
							}
						});

						//支付
						$("#recharge li").each(function(i,o){
							$(this).ontouch(function(){
								if(i == 0){
									$.getDate({
										page:"patient",
										inter:"getPayPassWord",
										data:{customerUuid:customerUuid},
										callback:function(msg){
											if(msg.query.success == "1" && msg.hasPassword == "1"){
												$(".mask_cen").show();
											}else if(msg.query.success == "1" && msg.hasPassword == "0"){
												gm.pul.toUrl("/patient/my/instead_play_password.shtml?returnUrl=" + window.location.href);
											}else{
												$.alert(msg.query.message);
											}
										}
									});
								}
								else if(i == 1){
									console.log("支付宝");
									$(".zez_box1").show();
								}
								else if(i == 2){
									console.log("微信");
									$(".zez_box1").show();
								}else{}
							});
						});

						// 确认支付
						$(".right_btn").bind({
							touchend:function(){
								var _password = $(".zf_box input").val();

								$.confirm("是否确定支付？",function(){

									$.getDate({
										page:"patient",
										inter:"checkPayPassWord",
										data:{customerUuid:customerUuid,password:_password,callback:"gm.home.getDsvjd"},
										method:"POST",
										dataType:"script"
									});
								});
							}
						});	
					}else{
						$(".doctori_remind p:eq(1)").hide();
						$("#recharge ul").html('<li class="yichang" style="text-align:center;">'+window.___orderMsg[gm.home.orderStatus*1]+'</li>');
					}

					$(".vgtu_cs .vd1").bind({
						touchend:function(){
							var data =  {
								orderUuid : gm.home.orderMainUuid,
								customerUuid : gm.patient.getPatient(),
								callback : {
									success:function(data){
										$.alert({
											val:"支付成功",
											type:"flash",
											callback:function(){
												gm.pul.toUrl("/patient/my/myorder.shtml");
											}
										})
									},
									failure:function(data){
										$.alert({
											val:"支付失败，如遇到问题，请联系客服 ： <a href='tel:400-135-8858'>客服电话 400-135-8858</a>",
											type:"flash"
										});
									},
									cancel:function(data){
										$.alert({
											val:"支付取消",
											type:"flash"
										});
									}
								},
								name : name,
								desc : desc,
								money : money,
								payType:_touchType,
								userType:2
							};

							gm.toPay(data);
						}
					});
				}else{
					$.alert(data.query.message);
				}
				window._loading&&window._loading.hide();
			}
		});
	}

	gm.home.teleconsult = function(){
		gm.user.vcLogin();
		var doctorUuid = gm.para.get(window.location.href,"doctorUuid");
		var customerUuid = gm.patient.getPatient();
		var _touchType = 0;//支付类型 0余额支付 1支付宝 2微信支付

		function addTime(d,m){
			//兼容
			d = d.replace(/-/gi,"/");

			var d = new Date(d);
			if (d == "Invalid Date") {
				$.alert("非日期");
				return;
			}
			//当前日期的毫秒数 + 天数 * 一天的毫秒数
			var n = d.getTime() + m * 60 * 1000;

			var result = new Date(n),
				getMinutes = result.getMinutes();
			if(getMinutes < 10){
				getMinutes = "0" + getMinutes;
			}
			return result.getHours() + ":" + getMinutes;
		}

		function addDay(d){
			//兼容
			d = d.replace(/-/gi,"/");
			var d = new Date(d);

			if (d == "Invalid Date") {
				$.alert("非日期");
				return;
			}
			//当前日期的毫秒数 + 天数 * 一天的毫秒数
			var n = d.getTime() + 1 * 24 * 60 * 60 * 1000;
			var result = new Date(n);
			return (result.getFullYear() + "-" + (result.getMonth() + 1) + "-" + result.getDate());
		}


		var __date = new Date();
		__d = __date.getDay();
		var beginDate = (__date.getFullYear() + "-" + (__date.getMonth() + 1) + "-" + __date.getDate()),
		obj = {};

		//初始化
		for(var i=1;i<=7;i++){
			_t = (__d+i)%7;
			beginDate = addDay(beginDate);
			obj[_t + ""] = beginDate;
		}
		var __timeBar;

		$(".charge").on("touchend","div",function(){
			var _k = $(this).hasClass("kind");
			$(".doctori_remind b").html($(this).find("p").attr("data-telecost"));
			if (_k) {

			}else{
				$(this).siblings().attr("class","kind1");
				$(this).attr("class","kind");
			}
		});

		$("#recharge li").bind({
			touchend:function(){
				if($(".kind").length==0){
					$.alert("请选择咨询类型;")
					return;
				}
				//_touchType = $(this).index();
				// $(".zez_box1").show();

				var _o = $(".kind").attr("telepcounseuuid");
				var _time = $(".aptime").attr("time");
				var _timel = $(".kind span").html().replace("分钟","");
				var _w = $(".kind").attr("weekdate");
				var _date = obj[_w];
				var _money = $(".kind p").html().replace("元","");
				var _desc = $(".desc textarea").val();

				if(!_time){
					$.alert("请选择咨询时间");
					return;
				}else{
					_time = _time.split(" ")[1];
				}

				if(!_desc){
					$.alert("请填写咨询描述");
					return;
				}
				console.log(obj,_date,{
						customerUuid:customerUuid,//*患者ID
						doctorUuid:doctorUuid,//*医生ID
						orderAmount:_money,//*订单金额
						orderType:"1",//*订单类型1：电话咨询 2：私人套餐
						payType:"0",//支付方式 0:线上支付 1：线下支付 
						bookTime:_date,
						consultDuration:_timel,
						receiveTime:_time,
						orderDescription:_desc,
						// orderNote:""//订单备注
						callback:"gm.toOrderPay"
					});

				$.getDate({
					page:"patient",
					inter:"orderSave",
					method:"POST",
					data:{
						customerUuid:customerUuid,//*患者ID
						doctorUuid:doctorUuid,//*医生ID
						orderAmount:_money,//*订单金额
						orderType:"1",//*订单类型1：电话咨询 2：私人套餐
						payType:"0",//支付方式 0:线上支付 1：线下支付 
						bookTime:_date,
						consultDuration:_timel,
						receiveTime:_time,
						orderDescription:_desc,
						// orderNote:""//订单备注
						callback:"gm.toOrderPay"
					},
					dataType:"script"
				});
			}
		});

		gm.toOrderPay = function(data){
			if(!data){
				$.alert("服务器出错!");
			}

			if(data.query.success == "1"){
				gm.pul.toUrl("teleconsult.shtml?orderMainUuid=" + data.order.orderUuid);
			}else{
				$.alert(data.query.message);
			}
		}

		$.getDate({
			page:"patient",
			inter:"toPlusPage",
			data:{doctorUuid:doctorUuid,customerUuid:gm.patient.getPatient()},
			callback:function(data){
				data = data.relist[0];
				var _k = "";
				$(".icon1 img").attr("src",data.doctorIcon || window.___defaultImage);
				if (data.customerSex == "1") {
					_k = '<i class="icon-boy"></i>';
				}else{
					_k = '<i class="icon-girl"></i>';
				}
				$(".p_fbjn h3").html("<span>"+data.doctorRealName+"</span>"+_k);
				$(".p_fbjn p").html(data.hospitalName);
				$(".p_yvbu p").eq(0).html(window.___professional[data.professional*1]);
				$(".p_yvbu p").eq(1).html(data.departmentName);
			}
		});

		function getStartTime(_d,_time){
			_t = (_d == "7" ? "0" : _d);

			$.getDate({
				page:"doctor",
				inter:"getAllTelephoneTime",
				data:{doctorUuid:doctorUuid,weekDate:obj[_t],consultDuration:_time},
				callback:function(data){
					if(!data){
						$.alert("服务器出错");
					}
					if(data.query.success == "1"){
						var _date = new Date(obj[_t].replace(/-/gi,"/") + " " + data.startTime);
						var _enddate = new Date(obj[_t].replace(/-/gi,"/") + " " + data.endTime);
						console.log(_date);
						console.log(_enddate);
						var _ndate = _enddate - _date;

						var _length = _ndate/1000/60/_time;
						var __map = {};

						$(data.relist).each(function(i,o){
							__map[o.hasStartTime] = true;
						});

						var __times = {
							"title" : "请选择咨询时间",
							"lists" : [
								{ "id" : "0" , "val" : "选择开始咨询时间" , "disabled" : "1" }
							],
							"backEvent" : null,
							"selectedCallback" : function(msg){
								$(".aptime").html(msg.val  + " - " + addTime(msg.val,_time))
								.attr("time",msg.val);

								$(".u2 span:eq(0)").html(msg.val);
								$(".u2 span:eq(1)").html(obj[_t] + " " + addTime(msg.val,_time));
								__timeBar.close();
							}
						}

						for(var i=0;i<_length;i++){
							var _showtime = obj[_t] + " " + addTime(obj[_t] + " " +data.startTime,_time*i);
							__times.lists.push({
								id:_showtime,
								val:_showtime,
								disabled:(__map[addTime(obj[_t] + " " +data.startTime,_time*i)]?1:0)
							});
						}

						if(__timeBar){
							__timeBar.tab(__times);
						}else{
							__timeBar = new selectBar(__times);
						}
						__timeBar.open();
					}else{
						$.alert(data.query.message);
					}
				}
			});
		}
		

		$.getDate({
			page:"doctor",
			inter:"getAllTelephoneCounse",
			data:{doctorUuid:doctorUuid},
			callback:function(data){
				//服务器传输回应
				if(!data){
					$.alert("服务器出错!");
				}
				if(data.query.success=="1"){
					var arr = [];
					var _day = ["","一","二","三","四","五","六","日"];
					if(data.relist.length == 0){
						$.alert({
							val:"医生并没有开通任何套餐,请选择其他医生进行电话咨询.",
							timer:2000,
							callback:function(){
								gm.pul.toUrl("/patient/home/thedoctorlist.shtml");
							}
						});
						return;
					}
					$(data.relist).each(function(i,o){
						// arr.push('<div weekDate="'+o["weekDate"]+'" id="day'+o["weekDate"]+'" class="kind1" telepCounseUuid="'+o["telepCounseUuid"]+'">\
						// 		<h2 data-teletime="'+o["teleCost"]+'">'+o["teleTime"]+'分钟</h2>\
						// 		<p data-telecost="'+o["teleCost"]+'">'+o["teleCost"]+'元</p>\
						// 	</div>');

						o.day = "周" + _day[o.weekDate*1];

						o._d = (o.weekDate == "7"?"0":o.weekDate);
						o.date = obj[o._d];

						arr.push('<div weekDate="'+o["weekDate"]+'" id="day'+o["weekDate"]+'" class="kind1" telepCounseUuid="'+o["telepCounseUuid"]+'">\
								<h2 data-teletime="'+o["teleCost"]+'">'+o["date"] + " " + o["day"] +'</h2>\
								<p data-telecost="'+o["teleCost"]+'">'+o["teleCost"]+'元</p>\
								<p><span>'+o["teleTime"]+'</span>分钟</p>\
							</div>');
					});
					$(".charge").html(arr.join(""));
					var o = $(".kind1");
					o.bind({
						touchend:function(){
							var _o = $(this);

							var _w = _o.attr("weekDate");
							var _t = _o.find("span").html().replace("分钟","");
							getStartTime(_w,_t);
						}
					});

					// $(".charge div").eq(0).attr("class","kind");
					$(".doctori_remind b").html(data.relist[0]["teleCost"]);

					// var _w = o.attr("weekDate");
					// var _t = o.find("h2").html().replace("分钟","");
					// getStartTime(_w,_t);

					// $(".charge div").eq(0).attr("class","kind");
					$(".doctori_remind b").html($(".charge div").eq(0).find("p").html().replace("元",""));
				}else{
					$.alert(data.query.message);
				}
			}
		});
	}

	gm.home.health_guide = function(){
		$.getDate({
			page:"patient",
			inter:"getAllHealthGuide",
			data:{customerUuid:gm.patient.getPatient()},
			callback:function(data){
				//服务器传输回应
				if(!data){
					$.alert("服务器出错!");
				}
				if(data.query.success=="1"){
					var arr = [];

					$(data.relist).each(function(i,o){
						arr.push('<li doctorUuid="'+o["doctorUuid"]+'">\
						<a href="/patient/my_doctor/health_guide.shtml?doctorUuid='+o["doctorUuid"]+'"></a>\
						<h3>饮食指导</h3>\
						<p>'+o["diet"]+'</p>\
						<p class="p_docter">医生：<span>'+o["doctorName"]+'</span></p>\
						</li>');
					});
					$(".health_guide_list ul").html(arr.join(""));

					if(arr.length > 0)$("#dont_show").hide();
				}else{
					$.alert(data.query.message);
				}
			}
		});
	}
	
	gm.home.total_orders = function(){
		var doctorUuid = gm.para.get(window.location.href,"doctorUuid");
		$.getDate({
			page:"patient",
			inter:"getAllDoctorAdvice",
			data:{customerUuid:gm.patient.getPatient(),doctorUuid:doctorUuid},
			callback:function(data){
				//服务器传输回应
				if(!data){
					$.alert("服务器出错!");
				}
				if(data.query.success=="1"){
					// var arr = [];
					// var _gqarr = [];

					var tmp = '<li>\
							<a href="total_details.shtml?doctorUuid={doctorId}"></a>\
							<h3>{productName}</h3>\
							<p>{dosage}<span>{newstart}</span><span>{directions}</span></p>\
							<p class="p_docter">医生：<span doctorUuid="{doctorId}">{doctorName}</span></p>\
						</li>';

					// $(data.relist).each(function(i,o){
					// 	if(o.adivceType && o.adivceType == "0"){
					// 		_gqarr.push(gm.replace(tmp,o));
					// 	}else{
					// 		arr.push(gm.replace(tmp,o));
					// 	}
					// });

					// if(data.relist.length>0){
					// 	$("#dont_show").hide();
					// }
					// $(".total_orders_list ul").html(arr.join(""));
					// $(".total_orders_gq ul").html(_gqarr.join(""));
					var relist  =data.relist, html = '', arr= ['',"痊愈","好转","无效","其他"];
				                    
				                    if(!relist.length){
				                    	$("#dont_show").show();
				                        return
				                    }
				                    for(var i =0;i<relist.length;i++){
				                        var _l = "";
				                        var _k = "";
				                        if (relist[i].directions == "1") {
				                            _l = "饭前";
				                        }else if (relist[i].directions == "2") {
				                            _l = "饭后";
				                        }else if (relist[i].directions == "3") {
				                            _l = "随餐";
				                        }else{
				                            _l = "空腹";
				                        }
				                        var newstart = relist[i].frequency;
				                        re1 = new RegExp("1","g");
				                        re2 = new RegExp("2","g");
				                        re3 = new RegExp("3","g");
				                        newstart = newstart.replace(re1,"早");
				                        newstart = newstart.replace(re2,"中");
				                        newstart = newstart.replace(re3,"晚");
				                        var _directions = ["粒","袋","mg","ml"];

				                        relist[i].dosage = relist[i].dosage + (_directions[relist[i].directions-1] || "粒");
				                        relist[i].directions = _l;
				                        relist[i].newstart = newstart;
				                        relist[i].doctorName =relist[i].doctorName || "好心情";

				                        html +=gm.replace(tmp,relist[i]);
				                    }
				                    $(".total_orders_list ul").html(html)
				}else{
					$.alert(data.query.message);
				}
			}
		});
	}

	// 添加关注
	gm.home.detailsofthedoctor = function(){
		//用户登录判断，没登录，跳转登录页面
		//gm.user.vcLogin();
		//判断用户是否关注医生
		var flag = $("#hasconcern").hasClass("dynamic0");//表示没关注
		var num = (flag ? 1 : 0 );
		var action = gm.para.get(window.location.href,"action");
		if(action=="gz"){
			var cid = gm.patient.getPatient();
			var did = gm.para.get(window.location.href,"doctorUuid");
			if(!num){//已关注
				$.alert({
					"val" : "已关注",
					"type" : "flash",
					"timer":300
				});
			}else{//未关注
				gm.home.detailsofthe(cid,did,flag,function(data){//直接关注
					$("#hasconcern").attr("class","dynamic1");
					$(".start a").html("取消关注");
					$(".start a").css({"background-color":"#fff","color":"#a7a7a7","border":"1px solid #a7a7a7"});
					$.alert({
						"val" : "关注成功</br>请返回",
						"type" : "flash",
						"timer":300
					});
				});
			}
				
		}
		
		if(!num){//如果已经关注
			$(".start a").html("取消关注");
			$(".start a").css({"background-color":"#fff","color":"#a7a7a7","border":"1px solid #a7a7a7"});
		}

		// 关注医生 bind 关注
		$(".start,.dynamic1,.dynamic0").bind({
			"touchstart":function(e){
				e.preventDefault();
				flag = $("#hasconcern").hasClass("dynamic0");
				num = (flag ? 1 : 0 );
				var cid = gm.patient.getPatient();
				var did = gm.para.get(window.location.href,"doctorUuid");
				gm.home.detailsofthe(cid,did,flag,function(data){
					$(".dynamic0,.dynamic1").attr("class","dynamic" + num);
					if(num){
						$.alert({
							"val" : "关注成功",
							"type" : "flash"
						});
						$(".start a").html("取消关注");
						$(".start a").css({"background-color":"#fff","color":"#a7a7a7","border":"1px solid #a7a7a7"});
					}else{
						$.alert({
							"val" : "取消关注成功",
							"type" : "flash"
						});
						$(".start a").html("关注");
						$(".start a").css({"background":"#28c3b1","color":"#fff","border":"1px solid #28c3b1"});
					}
				});
				
			}
		});
	}

	// 添加|取消关注  flag true|false  1|0  回调
	gm.home.detailsofthe = function(customerUuid,doctorUuid,flag,callback){
		if(flag){
			gm.home.addAttentionDoctors(customerUuid,doctorUuid,callback);
		}else{
			gm.home.cancleAttentionDoctors(customerUuid,doctorUuid,callback);
		}
	}

	//添加关注
	gm.home.addAttentionDoctors = function(cid,did,callback){
		gm.home.binTjgz = callback || gm.home.binTjgz;
		$.getDate({
			page:"patient",
			inter:"addAttentionDoctors",
			data:{customerUuid:cid,doctorUuid:did,callback:"gm.home.binTjgz"},
			method:"POST",
			dataType:"script"
		});
	}

	// 取消关注
	gm.home.cancleAttentionDoctors = function(cid,did,callback){
		gm.home.binTjgz = callback || gm.home.binTjgz;
		$.getDate({
			page:"patient",
			inter:"cancleAttentionDoctors",
			data:{customerUuid:cid,doctorUuid:did,callback:"gm.home.binTjgz"},
			method:"POST",
			dataType:"script"
		});
	}
	gm.home.binTjgz = function(data){
	}

	// 总病历医生列表
	gm.home._case = function(){
		$.getDate({
			page:"patient",
			inter:"getAllMedicalRecord",
			data:{customerUuid:gm.patient.getPatient()},
			callback:function(data){
				//服务器传输回应
				if(!data){
					$.alert("服务器出错!");
				}
				if(data.query.success=="1"){
					var arr = [];
					if (data.relist.length >= 1) {
						$("#dont_show").hide();
					};
					$(data.relist).each(function(i,o){
						arr.push('<li>\
								<a href="/patient/home/case_notes.shtml?doctorUuid='+o.doctorUuid+'">\
								<h3>我的病例<i class="pts-thearrow"></i></h3>\
								<p>医生：<span>' + (o.doctorName || "暂无") + '</span></p></a>\
							</li>');
					});
					$("#case ul").html(arr.join(""));
				}else{
					$.alert(data.query.message);
				}
			}
		});
	}

	// 病例列表
	gm.home.case_notes = function(){
		var doctorUuid = gm.para.get(window.location.href,"doctorUuid");
		if(!doctorUuid){
			$.alert("没有医生ID！");
			return;
		}

		$.getDate({
			page:"patient",
			inter:"getMedicalRecordList",
			data:{customerUuid:gm.patient.getPatient(),doctorUuid:doctorUuid},
			callback:function(data){
				//服务器传输回应
				if(!data){
					$.alert("服务器出错!");
				}
				if(data.query.success=="1"){
					var arr = [];				
   				$(data.relist).each(function(i,o){
   					var caseCategoryType=o["createTime"];   					
   					caseCategoryType=caseCategoryType.substring(0,10);
   					if(o["caseCategoryType"]=="0"){
   						arr.push('<li>\
						<p>'+caseCategoryType+'<a href="/patient/my_doctor/my_records.shtml?medicalRecordUuid='+o.medicalRecordUuid+'"><i class="pts-myorder"></i>住院病例</a></p>\
						</li>\
						');

   					}else if(o["caseCategoryType"]=="1"){
   						arr.push('<li>\
						<p>'+caseCategoryType+'<a href="/patient/my_doctor/my_records.shtml?medicalRecordUuid='+o.medicalRecordUuid+'"><i class="pts-myorder"></i>门诊病例</a></p>\
						</li>\
						');
   					}
   					
   				});
				
				
					$("#case_notrs ul").html(arr.join(""));
				}else{
					$.alert(data.query.message);
				}
			}
		});
	}

	

});