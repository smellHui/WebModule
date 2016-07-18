$(document).ready(function(){


gm.my_doctor = gm.my_doctor || {};


//随访医生信息
gm.my_doctor.establish = function(){
	
	
	$(".btn-zyradius").bind({
		touchend:function(){
			
		}
	})
}

gm.my_doctor.bindbqjl = function(data){
	console.log(data);

	if(!data){
		$.alert("服务器出错!");
	}
	if(data.query.success == "1"){
		$.alert("填写成功！");
	}else{
		$.alert(data.query.message);
	}
}

//随访病情记录
gm.my_doctor.change = function(){
	$(".btn-zyradius").bind({
		touchend:function(){
			var _previons = $(".condition dt h2 span").html();
			var _pre = "";
			var _note = $(".reason textarea").val();
			var visitRecordUuid = gm.para.get(window.location.href,"visitRecordUuid");

			if(_note == ""){
				$.alert("请输入原因");
				return false;
			}
			if(!visitRecordUuid){
				$.alert("参数错误");
				return;
			}

			if (_previons  == "痊愈") {
				_pre = 1;
			}else if (_previons  == "好转") {
				_pre = 2;
			}else if (_previons  == "无效") {
				_pre = 3;
			}else{
				_pre = 4;
			}

			$.getDate({
				page:"follow_up",
				inter:"addIllnessRecord",
				data:{previons:_pre,note:_note,visitRecordUuid:visitRecordUuid,callback:"gm.my_doctor.bindbqjl"},
				method:"POST",
				dataType:"script"
			});
		}
	});
}

// gm.my_doctor.bindfyjl = function(data){
// 	console.log(data);

// 	if(!data){
// 		$.alert("服务器出错!");
// 	}
// 	if(data.query.success == "1"){
// 		$.alert("填写成功！");
// 	}else{
// 		$.alert(data.query.message);
// 	}
// };
	
// //随访服药记录
// gm.my_doctor.medicine = function(){
// 	$(".btn-zyradius").bind({
// 		touchend:function(){
// 			var visitRecordUuid = gm.para.get(window.location.href,"visitRecordUuid");
// 			var customerUuid = gm.para.get(window.location.href,"customerUuid");
// 			var doctorUuid = gm.para.get(window.location.href,"doctorUuid");

// 			if(!visitRecordUuid){
// 				$.alert("参数错误");
// 				return;
// 			}
// 			if(!customerUuid){
// 				$.alert("参数错误");
// 				return;
// 			}
// 			if(!doctorUuid){
// 				$.alert("参数错误");
// 				return;
// 			}

// 			$.getDate({
// 				page:"follow_up",
// 				inter:"addDrugReaction",
// 				data:{customerUuid:customerUuid,doctorUuid:doctorUuid,visitRecordUuid:visitRecordUuid,callback:"gm.my_doctor.bindfyjl"},
// 				method:"POST",
// 				dataType:"script"
// 			});
// 		}
// 	})
// }
gm.my_doctor.getDrugNoticeList = function(){
    $.getDate({
        page:"patient",
        inter:"getDrugNoticeList",
        data:{customerUuid:gm.patient.getPatient()},
        callback:function(r){
            var relist  = r.relist, html = '<div class="sysd"><tr>\
                <th>药品名称</th>\
                <th>提醒时间</th>\
                <th>次数</th>\
                <th>剂量</th>\
            </tr></div>', arr= ['',"痊愈","好转","无效","其他"];
            var _directions = ["粒","袋","mg","ml"];
            if(!relist.length){
                return
            }
            for(var i =0;i<relist.length;i++){
                // var _l = "";
                // var _k = "";
                // if (relist[i].directions == "1") {
                //     _l = "饭前";
                // }else if (relist[i].directions == "2") {
                //     _l = "饭后";
                // }else if (relist[i].directions == "3") {
                //     _l = "随餐";
                // }else{
                //     _l = "空腹";
                // }
                // var newstart = relist[i].frequency;
                // re1 = new RegExp("1","g");
                // re2 = new RegExp("2","g");
                // re3 = new RegExp("3","g");
                // newstart = newstart.replace(re1,"早");
                // newstart = newstart.replace(re2,"中");
                // newstart = newstart.replace(re3,"晚");
                
                html+= '<tr>\
                    <td>'+relist[i].medicineName+'</td>\
                    <td>'+relist[i].noticeTime  +'</td>\
                    <td>'+relist[i].frequency+'</td>\
                    <td>'+relist[i].dosage + _directions[relist[i].directions-1] +'</td>\
            </tr>'
            }
            $("#list").show().html(html)
        }
    })
}
//服药提醒
gm.my_doctor.remind = function(){
	gm.my_doctor.getDrugNoticeList()
	$(".add").bind({
		touchend:function(){
			var _medicineName = $("#list2 tr").eq(0).find("input").val();
			var _frequency = $("#list2 tr").eq(1).find("input").val();
			var _dosage = $("#list2 tr").eq(2).find("input").val();
			var _directions = $("#list2 tr").eq(2).find(".selectage").val();
			var _noticeTime = $("#list2 tr").eq(4).find("input").val()+","+$("#list2 tr").eq(5).find("input").val()+","+$("#list2 tr").eq(6).find("input").val();
			
			if(!_medicineName){
				$.alert("请填写药物名称");
				return false;
			}
			if(!_frequency){
				$.alert("请填写服药次数");
				return false;
			}
			if(!_dosage){
				$.alert("请填写服药剂量");
				return false;
			}
			if(!$("#list2 tr").eq(4).find("input").val() || !$("#list2 tr").eq(5).find("input").val() || !$("#list2 tr").eq(6).find("input").val()){
				$.alert("请填写提醒时间");
				return false;
			}
			$.getDate({
				page:"patient",
				inter:"addDrugNotice",
				data:{
					customerUuid:gm.patient.getPatient(),
					medicineName:_medicineName,
					dosage:_dosage,
					frequency:_frequency,
					directions:_directions,
					noticeTime:_noticeTime,
					callback:"gm.my_doctor.addDrugNotice"
				},
				method:"POST",
				dataType:"script"
			});
		}
	})
	
	$(".fanhui").bind({
		touchend:function(){
			history.back()
		}
	});
}

gm.my_doctor.addDrugNotice = function(data){
	if(!data){
		$.alert("服务器出错!");
	}
	if(data.query.success == "1"){
		$.alert("填写成功！");
		gm.my_doctor.getDrugNoticeList();
	}else{
		$.alert(data.query.message);
	}
}

gm.my_doctor.bindblfy = function(data){
	if(!data){
		$.alert("服务器出错!");
	}
	if(data.query.success == "1"){
		$.alert("填写成功！");
	}else{
		$.alert(data.query.message);
	}
};

//随访药物不良反应
gm.my_doctor.bad_reaction = function(){
	$(".btn-zyradius").bind({
		touchend:function(){
			var _occurrenceTime = $(".sheet table tr td input").val();
			var _dosageTime = $(".sheet table tr td input").val();
			var _frequency = $(".influence textarea").val();
			var _impact = $(".influence textarea").val();
			var visitRecordUuid = gm.para.get(window.location.href,"visitRecordUuid");

			if(!visitRecordUuid){
				$.alert("参数错误");
				return;
			}

			$.getDate({
				page:"follow_up",
				inter:"addDrugReaction",
				data:{occurrenceTime:_occurrenceTime,dosageTime:_dosageTime,visitRecordUuid:visitRecordUuid,frequency:_frequency,impact:_impact,callback:"gm.my_doctor.bindblfy"},
				method:"POST",
				dataType:"script"
			});
		}
	})
};

//健康指导列表
gm.my_doctor.health_guide_list = function(){
	var doctorUuid = gm.para.get(window.location.href,"doctorUuid");

	$.getDate({
		page:"patient",
		inter:"getHealthGuideList",
		data:{customerUuid:gm.patient.getPatient(),doctorUuid:doctorUuid},
		callback:function(data){
			//服务器传输回应
			if(!data){
				$.alert("服务器出错!");
			}
			if(data.query.success=="1"){
				var tmp = '<li class="{state}">\
						<div><i class="logo-dswsa"></i><h2>饮食指导</h2><span>{createTime}</span></div>\
						<p>{diet}</p>\
					</li>\
					<li class="{spState}">\
						<div><i class="logo-fdioa"></i><h2>运动指导</h2><span>{createTime}</span></div>\
						<p>{sports}</p>\
					</li>\
					<li class="{reState}">\
						<div><i class="logo-vsdfa"></i><h2>睡眠指导</h2><span>{createTime}</span></div>\
						<p>{rest}</p>\
					</li>';

				$(data.relist).each(function(i,o){
					//o.guideType = (o.guideType == "0"?"":"");
					o.state =  (o.state == "1" ? 'adivce' : '');
					o.spState =  o.state;
					o.reState =  o.state;
					$("#health_guide div ul").append(gm.replace(tmp,o));
				});
			}else{
				$.alert(data.query.message);
			}
		}
	});
};

//关注的医生
gm.my_doctor.attention = function(){
	
	//用户登录判断，没登录，跳转登录页面
	gm.user.vcLogin();

	$.getDate({
		page:"refer",
		inter:"getServicesByCustomerUuid",
		data:{customerUuid:gm.patient.getPatient()},
		callback:function(data){
			if(!data){$.alert("服务器出错")}
			if(data.query.success == "1"){console.log(data)
				var tmp = '<dd>\
					<a href="{url}"></a>\
					<div class="vnuds">\
						<div class="user_avatar">\
							<img src="{img}">\
						</div>\
						<span>\
							<h2>{doctorName}</h2>\
							<p>{professional}</p>\
							<i>{hospitalName}</i>\
							<b>{departmentName}</b>\
						</span>{opeTime}\
					</div>\
				</dd>';

				$(data.picList).each(function(i,o){
					o.opeTime = "";
					o.professional = window.___professional[o.professional*1];				
					o.url = '/patient/my_doctor/communicate_patient.shtml?doctorUuid='+o.doctorUuid;
					o.img = o.img || window.___defaultImage;
					$(".os_twzx").append(gm.replace(tmp,o));
				});

				if(data.picList.length == 0){
					$(".os_twzx").append("<dd class='no'>您没有图文咨询过任何医生</dd>");
				}

				$(data.telList).each(function(i,o){
					o.opeTime = '<div class="i_zxsj"><p>'+(o.opeTime || "")+'</p><button>再次咨询</button></div>';					
					o.url = '/patient/my/payment_order.shtml?orderMainUuid='+o.orderUuid;
					// o.url = '/patient/home/teleconsult_1.shtml';
					o.professional = window.___professional[o.professional*1];
					o.img = o.img || window.___defaultImage;
					$(".os_dhzx").append(gm.replace(tmp,o));
				});

				if(data.telList.length == 0){
					$(".os_dhzx").append("<dd class='no'>您没有电话咨询过任何医生</dd>");
				}

				$(data.plusList).each(function(i,o){
					o.opeTime = "";
					o.url = '/patient/home/thedoctorappointmentplus.shtml?doctorUuid='+o.doctorUuid;					
					o.professional = window.___professional[o.professional*1];
					o.img = o.img || window.___defaultImage;
					$(".os_yyjh").append(gm.replace(tmp,o));
				});

				if(data.plusList.length == 0){
					$(".os_yyjh").append("<dd class='no'>您没有向医生提交过预约加号</dd>");
				}

				$(data.privateList).each(function(i,o){
					o.opeTime = "";
					o.url = '/patient/my_doctor/personal.shtml?doctorUuid='+o.doctorUuid;
					o.professional = window.___professional[o.professional*1];
					o.img = o.img || window.___defaultImage;
					$(".os_srys").append(gm.replace(tmp,o));
				});

				if(data.privateList.length == 0){
					$(".os_srys").append("<dd class='no'>没有私人医生服务</dd>");
				}


			}else{

			}
		}
	});

	// 我的医生
	$("#my_doctor .cnda li").bind({
		touchend:function(){
			gotab($(this).index());
		}
	});

	function gotab(index){
		$("#my_doctor .cnda li").removeClass("sfro");
		$("#my_doctor .cnda li:eq("+index+")").addClass("sfro");
		$("#my_doctor article").hide();
	}

	// 服务纪律
	$("#my_doctor .ck_li1").bind({
		touchend:function(){
			$("#my_doctor .dvcn").show();
		}
	});

	// 关注
	$("#my_doctor .ck_li2").bind({
		touchend:guanzhu
	});

	function guanzhu(){
		gm.my_doctor.getAttentionDoctors(gm.patient.getPatient(),function(data){
			//服务器传输回应
			if(!data){
				$.alert("服务器出错!");
			}
			if(data.query.success=="1"){
				var tmp = '<li>\
					<a href="/patient/home/detailsofthedoctor.shtml?doctorUuid={doctorUuid}"></a>\
					<div class="vnuds">\
						<div class="user_avatar">\
							<img src="{img}">\
						</div>\
						<span>\
							<h2>{doctorName}</h2>\
							<p>{professional}</p>\
							<i>{hospitalName}</i><b>{departmentName}</b>\
						</span>\
						<div class="p_jlfk">\
					                    <p>服务人次:</p>\
					                    <p>{totalNum}</p>\
					                </div>\
					</div>\
				</li>';
				var arr = [];

				$(data.reList).each(function(i,o){
					o.professional = window.___professional[o.professional*1];
					o.img = o.img || window.___defaultImage;
					arr.push(gm.replace(tmp,o));
				});

				if(arr.length==0){
					$("#guanzhu_show").show();
				}

				$(".duwr ul").html(arr.join(""));
				$("#my_doctor .duwr").show();
			}else{
				$.alert(data.query.message);
			}
		});
	}

	// 随访
	$("#my_doctor .ck_li3").bind({
		touchend:suifang
	});

	function suifang(){
		gm.my_doctor.getFollow_upDoctors(gm.patient.getPatient(),function(data){
			if(!data){$.alert("服务器出错")}

			if(data.query.success == "1"){
				var tmp = '<li>\
				<a href="/patient/my_doctor/follow_doctor.shtml?doctorUuid={doctorUuid}"></a>\
				<div class="vnuds">\
					<div class="user_avatar">\
						<img src="{img}">\
					</div>\
					<span>\
						<h2>{doctorName}</h2>\
						<p>{professional}</p>\
						<i>{hospitalName}</i><b>{departmentName}</b>\
					</span>\
				</div>\
			</li>';
			var arr = [];
				$(data.reList).each(function(i,o){
					o.professional = window.___professional[o.professional*1];
					o.img = o.img || window.___defaultImage;

					arr.push(gm.replace(tmp,o));
				});

				if(arr.length==0){
					$("#suifang_show").show();
				}

				$(".ngtuo ul").html(arr.join(""));
			}else{
				$.alert(data.query.message);
			}
			$("#my_doctor .ngtuo").show();
		});
	}

	var tab = gm.para.get(window.location.href,"tab");
	if(tab){
		switch(tab){
			case "0":
				$("#my_doctor .dvcn").show();
			break;
			case "1":
				guanzhu();
			break;
			case "2":
				suifang();
			break;
		}
		gotab(tab);
	}
};

//获取患者关联的随访医生
gm.my_doctor.getAttentionDoctors = function(customerUuid,callback){
	if(!customerUuid){return;}//如果没有患者，返回


    window._loading = new mask("loading");
	window._loading.show();

	$.getDate({
		page:"my_doctor",
		inter:"getAttentionDoctors",
		data:{customerUuid:customerUuid},
		callback:function(data){callback(data);window._loading.hide();}
	});
}

//获取患者关联的随访医生
gm.my_doctor.getFollow_upDoctors = function(customerUuid,callback){
	if(!customerUuid){return;}//如果没有患者，返回

    window._loading = new mask("loading");
	window._loading.show();

	$.getDate({
		page:"my_doctor",
		inter:"getVisitDoctors",
		data:{customerUuid:customerUuid},
		callback:function(data){callback(data);window._loading.hide();}
	});
}

//提交 患者端随访记录睡眠情况、进食情况、其他情况 、其他检查结果的接口
// type 类型1代表睡眠情况2代表进食情况3其他情况4其他检查情况
gm.my_doctor.submitState = function(data,callback){
	gm.callback = callback || function(){};

	data.callback = "gm.callback";
	$.getDate({
		page:"my_doctor",
		inter:"getVisitDoctors",
		method:"POST",
		dateType:"script",
		data:data
	});
}


//随访医生1
gm.my_doctor.follow_doctor = function(){
	var doctorUuid = gm.para.get(window.location.href,"doctorUuid");
	window._loading = new mask("loading");
	window._loading.show();
	
	$.getDate({
		page:"patient",
		inter:"getDoctorDetail",
		data:{customerUuid:gm.patient.getPatient(),doctorUuid:doctorUuid},
		callback:function(data){
			//服务器传输回应
			if(!data){
				$.alert("服务器出错!");
			}
			if(data.query.success=="1"){
				$(data.relist).each(function(i,o){
					var tmp = '<div class="vnuds">\
							   <div class="user_avatar">\
									<img src="{imgUrl}">\
								</div>\
								<span>\
									<h2>{realName}</h2>\
									<p>{hospitalName}</p>\
									<i>{professional}</i>\
									<b>{departmentName}</b>\
								</span>\
								</div>\
								<i class="pts-thearrow"></i>';		
				o.professional = window.___professional[o.professional*1];
				o.imgUrl = o.imgUrl || window.___defaultImage;

				$(".wecoto").html("<a href='/patient/home/thedoctorlistdetails.shtml?doctorUuid="+doctorUuid+"'>" + gm.replace(tmp,o)) + "</a>";

				// 随访医生
				$(function(){
					var _hdfv = $("#follow_doctor .sfsqxq_box li").length;
					// if (_hdfv >= 5) {
						$("#follow_doctor .hzxx_but").css({
							"position":"relative"
						});
					// }else{
					// 	$("#follow_doctor .hzxx_but").css({
					// 		"position":"absolute"
					// 	});
					// }
				});

				$(".hzxx_but a").each(function(i,o){
					$(o).attr("href",$(o).attr("href") + "?doctorUuid=" + doctorUuid);
				});

				$(".hzxx_but a:eq(0)").on("touchend",function(e){
					e.preventDefault();
					var $this = $(this);
					$.getDate({
						page:"patient",
						inter:"toVisitRecord",
						data:{customerUuid:gm.patient.getPatient(),doctorUuid:doctorUuid},
						callback:function(r){
							gm.pul.toUrl( gm.para.set($this.attr("href"),"visitRecordUuid",r.visitRecordUuid));							
						}
					});
				});
				window._loading.hide();
			});
			}else{
				$.alert(data.query.message);
			}
		}
	});

	$.getDate({
		page:"patient",
		inter:"getVisitRecordByCusAndDoc",
		data:{customerUuid:gm.patient.getPatient(),doctorUuid:doctorUuid},
		callback:function(data){
			//服务器传输回应
			if(!data){
				$.alert("服务器出错!");
			}
			if(data.query.success=="1"){
				$(data.relist).each(function(i,o){
					var _name = o.visitRecordUuid ? "随访表单" : o.caseCategoryType == "0" ? "住院病历" : "门诊病历",
						_iconClass = o.visitRecordUuid ? "logo-sfbdn" : o.caseCategoryType == "0" ? "logo-zybln" : "logo-mzbln",
						_id = o.visitRecordUuid ? "follow_up_list.shtml?visitRecordUuid=" + o.visitRecordUuid : "my_records.shtml?medicalRecordUuid=" + o.medicalRecordUuid;
					var tmp ='<li>{createTime}<a href="/patient/my_doctor/'+ _id + '&doctorUuid='+doctorUuid + '&action=edit"><b><i class="'+ _iconClass +'"></i>'+ _name +'</b></a></li>';
					o.professional = window.___professional[o.professional*1];

					$(".sfsqxq_box ul").append(gm.replace(tmp,o));
					window._loading && window._loading.hide();
				});
			}else{
				$.alert(data.query.message);
			}
		}
	});	
}
//用药查询
gm.my_doctor.query = function(){
	$.getDate({
		page:"my_doctor",
		inter:"getProductMainListByName",
		data:{},
		callback:function(data){
			//服务器传输回应
			if(!data){
				$.alert("服务器出错!");
			}
			if(data.query.success=="1"){
				$(data.relist).each(function(i,o){
					var tmp = '<dt>\
						<div class="yp_img">\
							<img src="{imageUrl}">\
						</div>\
						<div class="yp_name">\
							<h2>药品名称：<span>{productName}</span></h2>\
							<p>英文名称：<span>{productEnName}</span></p>\
						</div>\
					</dt>';

					$(".ypxq_box dl").append(gm.replace(tmp,o));
					});
			}else{
				$.alert(data.query.message);
			}
		}
	});
};

// 病例详情
gm.my_doctor.my_records = function(){
	
	var medicalRecordUuid = gm.para.get(window.location.href,"medicalRecordUuid");
	if(!medicalRecordUuid){
		$.alert("没有病例ID！");
		return;
	}

	$.getDate({
		page:"patient",
		inter:"getMedicalRecordDetail",
		data:{customerUuid:gm.patient.getPatient(),medicalRecordUuid:medicalRecordUuid},
		callback:function(data){
			if(!data){
				$.alert("服务器出错!");
			}

			if(data.query.success=="1"){
				data = data.relist[0];
				$(".botbut a").attr("href","/patient/my_doctor/communicate_patient.shtml?doctorUuid=" + data.doctorUuid);
				//console.log(data["caseCategoryType"],111);
				if (data["caseCategoryType"] == "1") {


					var tmp2 = '<dd class="ssddo"><ul><li><h3>就诊类型</h3><p>门诊</p></li><li><h3>就诊时间</h3><p>{seeDoctorTime}</p></li><li><h3>就诊医院</h3><p>{hospitalName}</p></li></ul></dd>\
								<dd class="vnireh_io">\
								<!--<p><span>病历记录</span>请至少选择下面的一种方式</p>-->\
							</dd>{photo}\
							<dd>\
								<h2>主述</h2>\
								<p>{mainsuit}</p>\
							</dd>\
							<dd>\
								<h2>现病史</h2>\
								<p>{illness}</p>\
							</dd>\
							<dd>\
								<h2>即往史</h2>\
								<p>{previous}</p>\
							</dd>\
							<dd>\
								<h2>个人史</h2>\
								<p>{personal}</p>\
							</dd>\
							<dd>\
								<h2>需要关注的躯体情况</h2>\
								<p>{somastate}</p>\
							</dd>';
					if(data.image1 || data.image2 || data.image3 || data.image4 || data.image5){
						data.photo = gm.replace('<dd class="gn_dgh">\
								<p>拍照（&lt;=5张)</p>\
								<ul>\
									<li><i class="logo-tjzpn"><img src="{image1}"></i></li>\
									<li><i class="logo-tjzpn"><img src="{image2}"></i></li>\
									<li><i class="logo-tjzpn"><img src="{image3}"></i></li>\
									<li><i class="logo-tjzpn"><img src="{image4}"></i></li>\
									<li><i class="logo-tjzpn"><img src="{image5}"></i></li>\
								</ul>\
							</dd>',data);
					}

					$(".dl1").append(gm.replace(tmp2,data));
				}else if (data["caseCategoryType"] == "0") {
					
					// 住院
					// $("#my_records .dl2 dd").eq(0).find("ul li").eq(1).html(data.startTime);
					// $("#my_records .dl2 dd").eq(0).find("ul li").eq(2).html(data.endTime);
					// $("#my_records .dl2 dd").eq(0).find("ul li").eq(3).html(data.hospitalName);
					// $("#my_records .dl2 dd").eq(0).find("ul li").eq(4).html(data.doctorName);
					// // 精神检查
					// $("#my_records .dl2 dd").eq(1).find("p").html(data.spiritCheck);
					// // 辅助检查
					// $("#my_records .dl2 dd").eq(2).find("p").html(data.assistCheck);
					// // 病程
					// $("#my_records .dl2 dd").eq(3).find("p").html(data.process);
					// // 发作次数
					// $("#my_records .dl2 dd").eq(4).find("p").html(data.attackNum);
					// // 个人史
					// $("#my_records .dl2 dd").eq(5).find("p").html(data.personal);
					// $("#my_records .dl2 dd").eq(6).find("p").html(data.personal);
					// $("#my_records .dl2 dd").eq(7).find("p").html(data.personal);
					// // 服药记录
					// 	// 药品名
					// 	$("#my_records .dl2 dd").eq(8).find("ul li").eq(1).find("p").html(data.productName);
					// 	// 单量
					// 	$("#my_records .dl2 dd").eq(8).find("ul li").eq(2).find("p").html(data.dosage);
					// 	// 频率
					// 	$("#my_records .dl2 dd").eq(8).find("ul li").eq(3).find("p").html(data.frequency);
					// 	// 用法
					// 	$("#my_records .dl2 dd").eq(8).find("ul li").eq(4).find("p").html(data.directions);
					// // 其他治疗
					// $("#my_records .dl2 dd").eq(9).find("p").html(data.cureNote)
					var tmp = '<dd class="ssddo"><ul><li><h3>就诊类型</h3><p>住院</p>\
						</li><li><h3>住院时间</h3><p>{startTime}</p></li>\
						<li><h3>出院时间</h3><p>{endTime}</p></li>\
						<li><h3>就诊医院</h3><p>{hospitalName}</p></li>\
						<li><h3>医　　生</h3><p>{doctorName}</p></li>\
						</ul>\
					</dd>\
					<dd>\
						<h2>精神检查</h2>\
						<p>{spiritCheck}</p>\
					</dd>\
					<dd>\
						<h2>辅助检查</h2>\
						<p>{assistCheck}</p>\
					</dd>\
					<dd>\
						<h2>病程</h2>\
						<p>{process}</p>\
					</dd>\
					<dd class="ssddo">\
						<ul>\
							<li>\
								<h3>发作次数</h3>\
								<p>{attackNum}次</p>\
							</li>\
						</ul>\
					</dd>\
					<dd>\
						<h2>个人史</h2>\
						<p>{personal}</p>\
					</dd>\
					// <dd class="hzxx_box">\
					// 	<ul>\
					// 		<li class="dt"><h2>服药记录</h2></li>\
					// 		<li><h2>药物名称</h2><p>{productName}</p></li>\
					// 		<li><h2>单　　量</h2><p>{dosage}</p></li>\
					// 		<li><h2>频　　率</h2><p>{frequency}次/日</p></li>\
					// 		<li><h2>用　　法</h2><p>{directions}</p></li>\
					// 	</ul>\
					// </dd>\
					<dd>\
						<h2>其他治疗</h2>\
						<p>{cureNote}</p>\
					</dd>';

					$(".dl2").append(gm.replace(tmp,data));
				};
			}else{
				$.alert(data.query.message);
			}
		}
	});
}

// 列表下拉
$(".condition dt").bind({
	touchend:function(){
		$(".condition").toggleClass("_djsuc")	
	}
});
$(".condition dd").bind({
	touchend:function(){
		var _o = $(this).html();
		var _p = $(".condition dt h2 span").html();
		$(this).html(_p);
		$(".condition dt h2 span").html(_o);
		$(".condition").toggleClass("_djsuc");
	}
});




// 健康指导_已过期
	$(function(){
		var _scb = $("#health_guide li").hasClass('yguq_ioi');

		if(_scb){
			$("#health_guide .yguq_ioi").append("<b></b>");
			$("#health_guide .yguq_ioi b").addClass("logo-ygqs");
			
		}else if (!_scb){
			$("#health_guide li b").removeClass("logo-ygqs");
		}	
	})


// 跳转
	// 我的医生跳转随访
		$("#my_doctor .ngtuo li").bind({
			touchend:function(){
				gm.pul.toUrl("/patient/my_doctor/follow_doctor.shtml");	
			}
		});

	// 用药查询 跳转 药品详情
		$("#use_query .glass").bind({
			touchend:function(){
				gm.pul.toUrl("/patient/my_doctor/druails.shtml");	
			}
		});
	// 我的医生—— 服务记录——图文咨询-咨询记录详情
		$("#my_doctor .os_twzx dd").bind({
			touchend:function(){
				gm.pul.toUrl("/patient/my_doctor/consultation_record.shtml");	
			}
		});
	// 我的医生—— 服务记录——电话咨询-
		$("#my_doctor .os_dhzx .i_zxsj button").bind({
			touchend:function(){
				gm.pul.toUrl("/patient/home/teleconsult_1.shtml");	
			}
		});

		var action = gm.para.get(window.location.href,"action");
		if(action == "edit"){
			$("#dsdm,.btn-zyradius").hide();
		}


});