var ___blconfig = {mainsuit:"主诉",assistCheck:"辅助检查",previous:"既往史",personal:"个人史",spiritCheck:"精神检查",illness:"现病史",somastate:"状况",attackNum:"发作次数",comorbidity:"共病",complication:"合并症",scaleAppraisal:"精神科量表测评","abnormal":"异常结果",diagnosis:"诊断",diagnosisImage:"主要诊断图片",assistCheckImage:"辅助检查图片",process:"治疗经过",preAssistCheck:"出院前检查"};
// 跳转
$(document).ready(function(){

	var _doctorUuid = gm.user.getDoctor();

	var _plan_management = gm.para.get(window.location.href,"plan_management");
	var _visitUuid = gm.para.get(window.location.href,"_visitUuid");
	var _add_patients = gm.para.get(window.location.href,"add_patients");
	var _contentCategoryUuid = gm.para.get(window.location.href,"getContentList");
	var _getMedicalImg = gm.para.get(window.location.href,"getMedicalImg");
	var _contentUuid = gm.para.get(window.location.href,"categoryId");
	var _hid = gm.para.get(window.location.href,"hid");
	var _medicalRecordUuid = gm.para.get(window.location.href,"medicalRecordUuid");
	
	if(_add_patients){
		$("#add_patients .tj_hzxx span").attr("customerUuid",localStorage.getItem("addMainsuit_customerUuid"));
		$("#add_patients .tj_hzxx span").attr("medicalRecordUuid",localStorage.getItem("addMainsuit_medicalRecordUuid"));
		$("#add_patients .tj_hzxx span p").html(localStorage.getItem("addMainsuit_customerName"));
		$("#add_patients .tj_hzxx span i").html(localStorage.getItem("addMainsuit_sex"));
		$("#add_patients .tj_hzxx span b").html(localStorage.getItem("addMainsuit_age"));
		$("#add_patients .tj_hzxx span h4").html(localStorage.getItem("addMainsuit_seeDoctorTime")+" 就诊");
	}

	// 随访方案管理-方案
	$("#follow_up_plan .sffa_box dd").bind({
		touchend:function(){
			var _visitUuid = $(this).attr("visitUuid");
			gm.pul.toUrl("/html/follow_up/toolbox/edit_plan.shtml?_visitUuid="+_visitUuid);
		}
	});

	$("#patient_education_1 li").bind({
		touchend:function(){
			gm.pul.toUrl("/html/follow_up/toolbox/patient_content.shtml");
		}
	});

	// 随访申请-详情
	$("#follow_up_application li").bind({
		touchend:function(){
			var _applyUuid =  $(this).attr("applyUuid");
			gm.pul.toUrl("/html/follow_up/followed_for_details.shtml?_applyUuid="+_applyUuid);
		}
	});
	
	// 患者基本信息
	$("#followed dd .head_portrait").bind({
		touchend:function(){
			var hid = $(this).attr("hid");
			gm.pul.toUrl("/html/follow_up/patient_details.shtml?hid="+hid);
		}
	});
	

	// 选择分组-单选框效果
	$(".xzfz_box li").bind({
		touchend:function(){
			$(".xzfz_box li").removeClass("csfsd");
			$(this).addClass("csfsd");
		}
	});



	// 随访申请详情  拒绝后 弹出层
	$("#follow_up_for_details .rtghrk").bind({
		touchend:function(){
			$("#follow_up_for_details .refuse_details").show();
		}
	});

	//获取病历详细信息
	$("#patient_details .sfsqxq_box ul li").bind({
		touchend:function(){

			var _medicalRecordUuid = $(this).attr("medicalRecordUuid");
			gm.pul.toUrl( "/html/follow_up/patient_case.shtml?medicalRecordUuid="+_medicalRecordUuid);
		}
	});

	// 妄想症随访方案管理
	$("#edit_scheme .bjs").bind({
		touchend:function(){
			$("#edit_scheme .d_cfnd").hide();
			$("#edit_scheme .bc_but").show();
			$(this).hide();
		}
	});

	// 选择患者-勾选
	$("#select_patients .select").bind({
		touchend:function(){
			//$("#select_patients .select-box").removeClass("_mz");
			//$(".newszu li .select-box").removeClass("_mz").toggleClass("_mz");
			$(".select .select-box").toggleClass("_mz");//是否有选中标记，如果有去掉，如果 没有加上
			if($(".select .select-box").hasClass("_mz")){//
				$(".newszu li .select-box").addClass("_mz");
				$("#isallselect").html("全不选");
			}else{
				$(".newszu li .select-box").removeClass("_mz");
				$("#isallselect").html("全选");
			}
			
		}
	});
	$("#select_patients .select .select-box").unbind("touchend");
	
	$("#select_patients .xzhz_box li .select-box").bind({
		touchend:function(){
			$("#select_patients .select .select-box").removeClass("_mz");
		}
	});

});

gm.follow_up = gm.follow_up || {};
// 随访
gm.follow_up.inde = function(){
	// 滑动 删除
	$("#followed dd").lrTouchMove();
}

gm.follow_up.gotoAdd = function(){
	gm.pul.toUrl("/html/follow_up/add_patients.shtml");
}

gm.follow_up.patient_case = function(){
	window._loading = new mask("loading");
	window._loading.show();

	var _customerUuid = gm.para.get(window.location.href,"customerUuid");
	var _medicalRecordUuid = gm.para.get(window.location.href,"medicalRecordUuid");

	gm.user.getCustomerByCostomerUuid(_customerUuid,function(data){
			// _loading.hide();
			if(!data){
				$.alert("服务器出错!");
			}
			if(data.query.success=="1"){
				var d = new Date();
				$(".newszu a").attr("href",$(".newszu a").attr("href") + "?customerUuid="+_customerUuid);
				//日期
				$(".newszu .date").html(data.info.time || (d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate()));
				//头像
				$(".newszu .head_portrait img").attr('src', (data.info.customerImg || (data.info.sex == "1" ? window.___defaultImage_p_man : window.___defaultImage_p_woman)));
				//名称
				$(".newszu .nagent h3").html(data.info.customerName + '<i></i>');
				//性别
				if (data.info.sex ==1) {
					$(".nagent h3 i").attr("class","icon-boy");
				}else{
					$(".nagent h3 i").attr("class","icon-girl");
				}
				$(".nagent span").html((data.info.age || 0)+"岁");//年龄
				$(".comment").html(data.info.customerMessage);//留言
			}else{
				$.alert(data.query.message);
			}
		});

		$.getDate({
			page:"user",
			inter:"getMedicalRecordByMedicalRecordUuid",
			data:{medicalRecordUuid:_medicalRecordUuid},
			callback:function(data){
				if(!data){
					$.alert("服务器出错!");
				}
				if(data.query.success=="1"){
					var info = data.info;
					if(info.caseCategoryType == "1"){
					//门诊

						//图片
						$(".mz_record .gn_dgh i").each(function(i){
							var url = data.info["img"+(i+1)+"Url"];
							if(url)$(this).html("<img src='"+url+"' upsrc='"+ data.info["image" + (i+1) ] +"'>");
							if(url)$(this).find("img").showWallpaper();
						});

						// //主述
						// $(".mz_record dd p").eq(2).html(data.info.mainsuit);
						// //现病史
						// $(".mz_record dd p").eq(3).html(data.info.illness);
						// //即往史
						// $(".mz_record dd p").eq(4).html(data.info.previous);
						// //个人史
						// $(".mz_record dd p").eq(5).html(data.info.personal);
						// //需要关注的躯体情况
						// $(".mz_record dd p").eq(6).html(data.info.somastate);

						$(".mz_record").show();
						$(".zy_record").hide();
					}else{
					//住院
						//住院时间
						$(".zy_record .ssddo .frequency_tetx p").eq(1).html(data.info.startTime);
						//出院时间
						$(".zy_record .ssddo .frequency_tetx p").eq(2).html(data.info.endTime);

						//就诊医院
						$(".zy_record .ssddo .frequency_tetx p").eq(3).html(data.info.hospitalUuid);
						//医生
						$(".zy_record .ssddo .frequency_tetx p").eq(4).html(data.info.doctorName);
						
						// //精神检查
						// $(".zy_record .ssddo dd p").eq(1).html(data.info.spiritCheck);
						// //辅助检查
						// $(".zy_record .ssddo dd p").eq(2).html(data.info.assistCheck);
						// //病程
						// $(".zy_record .ssddo dd p").eq(3).html(data.info.process);
						
						//发作次数
						$(".zy_record .ssddo dd p").eq(4).html(data.info.attackNum);
						// //个人史
						// $(".zy_record .ssddo dd p").eq(5).html(data.info.personal);

						//服药记录
							//药物名称
							$(".zy_record .ssddo .hzxx_box p").eq(0).html(data.info.productName);
							//单量
							$(".zy_record .ssddo .hzxx_box p").eq(1).html(___dosage[data.info.dosage]);
							//频率
							$(".zy_record .ssddo .hzxx_box p").eq(2).html(data.info.frequency);
							//用法
							$(".zy_record .ssddo .hzxx_box p").eq(3).html(data.info.directions);

						//其他治疗
						$(".zy_record .ssddo .other p").html(data.info.cureNote);

						$(".zy_record").show();
						$(".mz_record").hide();

					}

					var arr = [];
					for(var k in ___blconfig){
						if(data.info[k]){
							arr.push('<dd><h2>'+___blconfig[k]+'</h2><p>'+data.info[k]+'</p></dd>');
						}
					}

					$(".mz_record dl").append(arr.join(""));
					$(".zy_record dl").append(arr.join(""));



					$(".ssddo .time").find("p").html(data.info.createTime);
					$(".ssddo .site").find("p").html(data.info.hospitalUuid);
					$(".ssddo .doctor").find("p").html(data.info.createTime);

					window._loading && window._loading.hide();
				}else{
					$.alert(data.query.message);
				}
			}
		});
}

gm.follow_up.add_important = function(){
	var _applyUuid = gm.para.get(window.location.href,"applyUuid") || 0;
	var medicalRecordUuid = gm.para.get(window.location.href,"medicalRecordUuid") || 0;

	$(".btn-zyradius").bind({
		touchend:function(){
			var _medicineUuid = $(".sheet2 tr").eq(0).find("input").val();
			var _dosage = $(".sheet2 tr").eq(1).find("input").val();
			var _unit = $(".sheet2 tr").eq(1).find(".yz_pl").val();
			var _o = "";
		            $(".sheet2 tr").eq(2).find(".mzzt").each(function(i,o){
		                _o = _o + $(this).attr("frequency")+",";
		            });
		            var _frequency = _o.substring(0,_o.length-1);
		            var _directions = $(".sheet2 tr").eq(3).find(".yz_yf").val();

		            var data = {
				type:"0",
				medicineUuid:_medicineUuid,
				doctorUuid:gm.user.getDoctor(),
				dosage:_dosage,
				frequency:_frequency,
				directions:_directions,
				unit:_unit,
				callback:"gm.follow_up.addDoctorAdviceModel"
			};

			if(_applyUuid){
				data.visitRecordUuid = _applyUuid;
			}

			if(medicalRecordUuid){
				data.medicalRecordUuid = medicalRecordUuid;
			}

		            if (_medicineUuid && _dosage && _unit && _frequency && _directions) {
				$.getDate({
					page:"follow_up",
					inter:"addDoctorAdviceModel",
					data:data,
					method:"POST",
					dataType:"script"
				});
			}else{
				$.alert("请填写完整！");
			}
		}
	})
}

gm.follow_up.addDoctorAdviceModel = function(data){
	var _applyUuid = gm.para.get(window.location.href,"applyUuid");
	if(!data){
		$.alert("服务器出错!");
	}
	if(data.query.success=="1"){
		gm.pul.returnurl();
		// window.location.href = "remain.shtml?applyUuid="+_applyUuid;
	}else{
		$.alert(data.query.message);
	}
}

// 选择随访方案
gm.follow_up.selective_up_program = function(){
	// 新增分组
	// $("#selective_up_progra button").bind({
	// 	touchend:function(){
	// 		$("#selective_up_progra .tcsjob").show();
	// 	}
	// });
}
// 选择分组
gm.follow_up.mobile_packet = function(_customerUuid){
	// 新增分组
	$("#select_group .xzfz_but button").bind({
		touchend:function(){
			window.__mask = new mask();
			__mask.show();
			$("#select_group .tcsjob").show();
		}
	});
	$("#select_group .xzfz_box .fnonne").on("touchend","li",function(){
		$(".xzfz_box li").removeClass("csfsd");
		$(this).addClass("csfsd");
		var _gid = $(this).attr("groupid"),
			_doctorUuid = gm.user.getDoctor();

		$.getDate({
			page:"user",
			inter:"updateCustomerGroup",
			data:{gid:_gid,hid:_customerUuid,doctorUuid:_doctorUuid,callback:"gm.follow_up.updateCustomerGroup"},
			method:"POST",
			dataType:"script"
		});
	})
}

gm.follow_up.addcases = function(data){
	var _customerUuid = gm.para.get(window.location.href,"customerUuid");
	if(!data){
		$.alert("服务器出错!");
	}
	if(data.query.success=="1"){
		if(gm.go2){
			gm.pul.returnurl();
			//gm.pul.toUrl( $(".manual div").attr("href") + "?medicalRecordUuid=" + data.medicalRecordUuid+"&customerUuid="+_customerUuid);
		}else{
			gm.pul.returnurl();
			//gm.pul.toUrl('/html/follow_up/patient_details.shtml?customerUuid=' + _customerUuid);
		}
	}else{
		$.alert(data.query.message);
	}
}

gm.follow_up.updateCustomerGroup = function(data){
	if(!data){
		$.alert("服务器出错!");
	}
	if(data.query.success=="1"){
		var _customerUuid = gm.para.get(window.location.href,"customerUuid");
		$.alert({
			"val" : "分组成功",
			"type" : "flash",
			"callback" : function(){
				var returnurl = gm.para.get(window.location.href,"returnurl");
				if(returnurl){
					gm.pul.toUrl(returnurl);
				}else{
					gm.pul.toUrl( "/html/follow_up/add_patients.shtml?customerUuid="+_customerUuid);
				}
			}
		});
	}else{
		$.alert(data.query.message);
	}
}

// 创建病历
gm.follow_up.add_outpatient_cases = function(_customerUuid){
	//获取患者ID
	var _customerUuid = gm.para.get(window.location.href,"customerUuid");
	var medicalRecordUuid = gm.para.get(window.location.href,"medicalRecordUuid");
	//当前上传图片区域
	var curImgIndex,curPageIndex=1;//住院0 门诊1
	window._loading = new mask("loading");
	window._loading.show();

	gm.go2 = false;

	$(".manual").bind({
		touchend:function(){
			gm.go2 = true;
		}
	});

	$("body").on(".manual a","touchend",
		function(e){
			e.preventDefault();
		}
	);

	$(".btn-zyradius").bind({
		touchend:function(){
			gm.go2 = false;
		}
	});

	$(".manual,.btn-zyradius").ontouch(
		function(e){
			var yy = $("._jy input").val();
			var ys = $("._ys input").val();
			var jz = $("._jz input").val();
			var ry = $("._ry input").val();
			var cy = $("._cy input").val();

			if(curPageIndex == "1" && !jz){
				$.alert("请填写就诊时间");
				return;
			}
			if(curPageIndex == "0" && !ry){
				$.alert("请填写入院时间");
				return;
			}
			if(curPageIndex == "0" && !cy){
				$.alert("请填写出院时间");
				return;
			}

			if(!yy){
				$.alert("请填写就诊医院信息");
				return;
			}
			if(!ys){
				$.alert("请填写医生信息");
				return;
			}

			var data = {
				customerUuid:_customerUuid,
				doctorUuid:gm.user.getDoctor(),
				caseCategoryType:curPageIndex,
				seeDoctorTime:jz,
				startTime:ry,
				endTime:cy,
				hospitalUuid:yy,
				visitRecordUuid:""
			}

			$(".photos i").each(function(i,o){
				var obj = $(o).find("img");
				if(obj.length>0){
					data["img" + (i+1)]=obj.attr("upsrc");
				}
			});

			$.getDate({
				page:"user",
				inter:"addOutHallMedicalRecord",
				data:{callback:"gm.follow_up.addcases",jsonString:JSON.stringify(data)},
				dataType:"script"
			});
			return false;
		}
	)

	// 点击 门诊&住院
	$(".information .char div").bind({
		touchend:function(){
			curPageIndex = $(this).index();
			var _l = '<p>手动输入<i class="icon-thearrowx"></i></p>';
			$(this).siblings().removeClass("coind");
			$(this).addClass("coind");
			if (curPageIndex == 1) {
				$("._cy,._ry").hide();
				$("._jz").show();
				$(".manual").html('<div href="/html/follow_up/record_patient_detail.shtml"></div>'+ _l);
			}else if (curPageIndex == 0){
				$("._cy,._ry").show();
				$("._jz").hide();
				$(".manual").html('<div href="/html/follow_up/outpatient_records.shtml"></div>' + _l);
			}
		}
	});
	
	//
	$.getDate({
		page:"patient",
		inter:"toCustomerInfo",
		data:{customerUuid:_customerUuid},
		callback:function(data){
			$(".name .na").html(data.realName);
			window._loading&&window._loading.hide();
		}
	});

	$(".photos i").bind({
		touchend:function(){
			curImgIndex = $(this).index();
		}
	});

	$(".photos i").upimage(function(data){
		if(!data){
			$.alert("服务器出错!");
		}
		if(data.query.success=="1"){
			$($(".photos i")[curImgIndex]).html('<img upsrc="'+data.icon+'" src="'+data.smallUrl+'" />');
		}else{
			$.alert(data.query.message);
		}
	});


	$.getDate({
		page:"user",
		inter:"getMedicalRecordByMedicalRecordUuid",
		data:{medicalRecordUuid:medicalRecordUuid},
		callback:function(data){
			if(!data){
				$.alert("服务器出错!");
			}
			if(data.query.success=="1"){
				var info = data.info;
				//图片
				$(".photos i").each(function(i){
					var url = data.info["img"+(i+1)+"Url"];
					if(url)$(this).html("<img src='"+url+"' upsrc='"+ data.info["image" + (i+1) ] +"'>");
					if(url)$(this).find("img").showWallpaper();
				});

				$(".inhos").removeClass("coind");

				curPageIndex = info.caseCategoryType;
				if(info.caseCategoryType == 0){
					$("._ry,._cy").show();
					$("._jz").hide();
				}else{
					$("._ry,._cy").hide();
					$("._jz").show();
				}
				$(".inhos:eq("+info.caseCategoryType+")").addClass("coind");
								
				//住院时间
				$("._ry input").val(data.info.startTime);
				//出院时间
				$("._cy input").val(data.info.endTime);

				//就诊医院
				$("._jy input").val(data.info.hospitalUuid);
				$("._ys input").val(data.info.doctorName);


				window._loading && window._loading.hide();
			}else{
				$.alert(data.query.message);
			}
		}
	});
}
//创建病历信息 有问题 参数作用不明
gm.follow_up.addOutHallMedicalRecord = function(data){
	
},
// 随访方案管理
gm.follow_up.plan_management = function(){
	// 添加滑动 删除
	
}
// 患者分组管理
gm.follow_up.patient_group = function(){
	$("#patient_grouping dt").bind({
		touchend:function(){
			window.__mask = new mask();
			__mask.show();
			$("#patient_grouping .tcsjob").show();
		}
	});
}

// 药品详情。
gm.follow_up.drugs_details = function(_id){
	var kv = {
		//"productName":"商品名称",
		//"productEnglishName":"英文名称",
		"adviceNote":"推荐语",
		"categoryUuid":"所属分类",
		"categoryName":"分类名称",
		//"productNo":"商品ID",
		"productType":"药品类别",
		"indication":"中国适用症",
		"commonremedy":"常用治疗适用症状",
		"mechanismAction":"作用机制",
		"laboratorExamination":"应该做的化验检查",
		"direction":"用法",
		"renalFunctionDamage":"肾功能损害患者",
		"liverFunctionDamage":"肝功能损害患者",
		"cardiacDysfunction":"心功能损害患者",
		"oldPeople":"老年人",
		"youngsters":"儿童和青少年",
		"conception":"妊娠",
		"suckle":"哺乳",
		"dosage":"用量",
		"drugReaction":"药物导致的不良反应机制",
		"mildDrugReaction":"值得注意的不良反应机制",
		"dangerousDrugReaction":"危险的不良反应机制",
		"forbidden":"禁用",
		"attention":"注意事项",
		"specialPopulations":"特殊人群",
		"drugInteractio":"药物相互作用",
		"overDose":"药物过量",
		"targets":"主治症状",
		"longRun":"长期使用",
		"addiction":"成瘾性",
		"stopMedicine":"如何停药",
		"pharmacokinetics":"药代动力学",
		"storge":"储藏"
	}

	$.getDate({
		page:"public",
		inter:"getProductMainByid",
		data:{productUuid:_id},
		callback:function(data){
			if(!data){
				$.alert("服务器出错!");
			}
			if(data.query.success=="1"){
				var arr = [];
				var _obj = data.productMainModel;

				for(var k in _obj){
					var more = _obj[k].length > 60 ?'<div class="tisfccb"><i class="icon-thearrowx"></i></div>':'';
					if(kv[k] && _obj[k]){
						arr.push('<dd><h2>'+kv[k]+'</h2><div><p>'+_obj[k].replace(/\//gi,"</p><p>")+'</p></div>'+more+'</dd>');
					}
				}

				$(".yp_img img").attr("src",_obj["imageUrl"] || "/static/imgs/yp_img.jpg");
				$(".yp_name h2 span").html(_obj["productName"]);
				$(".yp_name p span").html(_obj["productEnglishName"]);
				$(".ypxq_box dl").append(arr.join(''));

				// 药品详情-文章点开
				$(".tisfccb").parent().addClass("text_pshou");
				$(".tisfccb").click(function(){
				        	var state = $(this).parent().hasClass("text_pshou");
				        	if(state){
				            		$(this).parent().removeClass("text_pshou");
				        	}else{
				            		$(this).parent().addClass("text_pshou");
				        	}
				    });
			}else{
				$.alert(data.query.message);
			}
		}
	});
}

gm.follow_up.addrecord = function(){
	var curIndexImg;
	$(".logo-xj").bind({
		touchend:function(){
			curIndexImg = $(this);
		}
	});

	$(".logo-xj").upimage(function(data){
		//console.log(data);
		var _p = curIndexImg.parent();
		var img = _p.find("img");

		if(img.length == 0){
			img = $("<img />");
			_p.append(img);
		}

		img.attr("src",data.smallUrl);
		img.attr("upsrc",data.icon);
		curIndexImg.hide();
	});

	$(".zhz p").bind({
		touchend:function(){
			var _ = $(this).parent();
			if(_.hasClass("zk")){
				_.removeClass("zk");
			}else{
				_.addClass("zk");
			}
		}
	});

	$(".zhz .selectlist span").bind({
		touchend:function(){
			var _ = $(this);
			if(_.hasClass("cur")){
				_.removeClass("cur");
			}else{
				_.addClass("cur");
			}

			$(".zhz .selectlist b").removeClass("cur");
			$(".zhz .selectlist input").val("");
		}
	});

	$(".zhz .selectlist b,.zhz .selectlist input").bind({
		touchend:function(){
			// $(".zhz .selectlist span").removeClass("cur");
			// $(".zhz .selectlist b").attr("class","cur");
		}
	});

	gm.follow_up.addbl = function(data){
		console.log(data);
		// window
	}

	var __cishu = {
		"title" : "选择次数",
		"lists" : [
			{ "id" : "0" , "val" : "选择次数" , "disabled" : "1" }
		],
		"backEvent" : null,
		"selectedCallback" : function(msg){
			$(".fabingcishu").attr("cishu",msg.id);
			$(".fabingcishu strong").html(msg.id);
			__cishuBar.close();
		}
	}

	for (var i = 1; i <=10; i++) {
		__cishu.lists.push({"id":i,"val":i});
	};

	var __cishuBar = new selectBar(__cishu);

	$(".fabingcishu").ontouch(
		function(){
			__cishuBar.open();
			gm.pul.returnurl = function(){
				__cishuBar.close();

				var customerUuid = gm.para.get(window.location.href,"customerUuid");
				gm.pul.returnurl = function(){
					gm.pul.toUrl('/html/follow_up/add_outpatient_cases.shtml?customerUuid='+customerUuid)
				}
			}
		}
	);
		
	var medicalRecordUuid = gm.para.get(window.location.href,"medicalRecordUuid");
	var to2 = false;

	if(!medicalRecordUuid){
		$.alert("参数错误");
	}

	$(".zlfa").bind({
		touchend:function(){
			to2 = true;
		}
	})

	$(".btn-zyradius,.zlfa").ontouch(
		function(){
			var data = {
				medicalRecordUuid:medicalRecordUuid,//病历
				mainsuit:$(".zhusu textarea").val(),//主诉
				assistCheck:$(".fuzhu textarea").val(),//辅助检查
				previous:$(".jiwangshi textarea").val(),//既往史
				personal:$(".gerenshi textarea").val(),//个人史
				spiritCheck:$(".jingshen textarea").val(),//精神检查
				illness:$(".xianbingshi textarea").val(),//现病史
				somastate:$(".zhuangkuang textarea").val(),//状况
				attackNum:$(".fabingcishu").attr("cishu"),//发作次数
				comorbidity:$(".gongbing textarea").val(),//共病
				complication:"",//合并症
				scaleAppraisal:"", //精神科量表测评
				abnormal :$(".yichang textarea").val(),//异常结果 
				diagnosis :$(".zhuyao textarea").val(),//诊断
				diagnosisImage :$(".zhuyao img").attr("upsrc"),//主要诊断图片
				assistCheckImage:$(".fuzhu img").attr("upsrc"),//辅助检查图片
				process:$(".zhiliaojingguo textarea").val(),//治疗经过
				cureCourseImage:$(".zhiliaojingguo img").attr("upsrc"),
				preAssistCheck:$(".chuyuanjiancha textarea").val(), //出院前检查
				preAssistCheckImage:$(".chuyuanjiancha img").attr("upsrc")
			}


			var _arr = [];

			if($(".selectlist b").hasClass("cur")){

			}else{
				$(".selectlist span.cur").each(function(i,o){
					_arr.push($(o).html());
				});
				var _more = $(".selectlist input").val();
				data.complication = _arr.join(",") + (_more?("," + _more):"");
			}

			$.getDate({
				page:"user",
				inter:"addBasicCheck",
				data:{callback:"gm.follow_up.addblb",jsonString:JSON.stringify(data)},
				dataType:"script",
				method:"POST"
			});
		}
	);

	gm.follow_up.addblb = function(data){
		var _customerUuid = gm.para.get(window.location.href,"customerUuid");
		if(!data){
			$.alert("服务器出错!");
		}
		if(data.query.success=="1"){
			if(to2){
				gm.pul.toUrl('/html/follow_up/treatment_plan.shtml?medicalRecordUuid='+medicalRecordUuid+"&customerUuid="+_customerUuid);
			}else{
				gm.pul.toUrl('/html/follow_up/patient_details.shtml?customerUuid='+_customerUuid);
			}
		}else{
			$.alert(data.query.message);
		}
	}
}

// 选择患者
gm.follow_up.choice_patient = function(){
	
}

gm.follow_up.saveOrUpdateHealthGuide = function(data){
	if(!data){
		$.alert("服务器出错!");
	}
	if(data.query.success=="1"){
		history.back();
	}else{
		$.alert(data.query.message);
	}
}

gm.follow_up.submitincrease_plan = function(data){
	window._loading && window._loading.hide();
	if(!data){
		$.alert("服务器出错!");
	}
	if(data.query.success=="1"){
		$.alert({
			"val" : "保存随访方案成功",
			"callback" : function(){
				var returnurl = gm.para.get(window.location.href,"returnurl");
				if(returnurl){
					gm.pul.toUrl(returnurl);
				}else{
					gm.pul.toUrl('plan_management.shtml?plan_management=plan_management');
				}
			}
		});
	}else{
		$.alert(data.query.message);
	}
}

gm.follow_up.delPreceptDetailId = 0;

gm.follow_up.delPreceptDetail = function(_data){

	if(!_data){
		$.alert({
			val:"服务器出错！",
			timer:1500
		});
		return;
	}
	if (_data.query.success=="1") {
		$.alert({
			val:"删除成功",
			timer:1500,
			type:"flash",
			callback:function(){      
				$("#follow_up_plan .sffa_box dd").eq(gm.follow_up.delPreceptDetailId).fadeOut(500);
			}
		});
	}else{
		$.alert(data.query.message);
	}
}

gm.follow_up.visitBind = function(data){
	if(!data){
		$.alert("服务器出错!");
	}
	if(data.query.success=="1"){
		var _o = data;

		$("#edit_scheme .xzfa_box .tx_xang .xzfa_famc h3").html(_o.preceptName);
		$("#edit_scheme .xzfa_box .tx_xang .xzfa_ywzk p").html(_o.drugTherapy);
		$("#edit_scheme .xzfa_box .tx_xang .xzfa_ywbnfy p").html(_o.sideEffects);
		$("#edit_scheme .xzfa_box .tx_dsvba .period p").text(_o.period ? _o.period + "周" : "无");
		$("#edit_scheme .xzfa_box .tx_dsvba .electrocardiogram p").text(_o.electrocardiogram ? _o.electrocardiogram + "周" : "无");
		$("#edit_scheme .xzfa_box .tx_dsvba .bloodRoutine p").text(_o.bloodRoutine ? _o.bloodRoutine + "周" : "无");
		$("#edit_scheme .xzfa_box .tx_dsvba .hepatic p").text(_o.hepatic ? _o.hepatic + "周" : "无");


		$("#edit_scheme .xzfa_box .tx_xang .xzfa_jkzd textarea").html(_o.sleep);
		$("#edit_scheme .xzfa_box .tx_xang .xzfa_yszd textarea").html(_o.dietGuide);
		$("#edit_scheme .xzfa_box .tx_xang .xzfa_ydzd textarea").html(_o.sport);



		if(data.preceptExtend.length > 0){
			for(var i = 0; i < data.preceptExtend.length; i++){
				$("#edit_scheme .xzfa_box .tx_dsvba").append("<li data-vpeid='" + data.preceptExtend[i].visitPreceptExtendUuid + "'><h2>"+ data.preceptExtend[i].preceptExtendName +"</h2><p>"+ data.preceptExtend[i].preceptExtendPeriod +"</p></li>");
			}
		}
	}else{
		$.alert(data.query.message);
	}
}

//查看随访方案详情接口
gm.follow_up.visitPreceptDetail=function(_visitUuid){
	$.getDate({
		page:"doctor",
		inter:"visitPreceptDetail",
		data:{visitUuid:_visitUuid,callback:"gm.follow_up.visitBind"},
		method:"POST",
		dataType:"script"
	});
}

//缺失 医生编辑方案接口
gm.follow_up.editVisitPrecept = function(data){
	var _visitUuid = gm.para.get(window.location.href,"visitUuid");
	gm.pul.toUrl( "increase_plan.shtml?visitUuid=" + _visitUuid);
}

//医生添加方案接口
gm.follow_up.addVisitPrecept = function(data){
	$("#increase_scheme .bc_but .btn-zyradius").ontouch(function(){
		var _submitObj = $(this).parent();
		var visitUuid = gm.para.get(window.location.href,"visitUuid") || 0;

		var inter = (visitUuid?"editVisitPrecept":"addVisitPrecept");

		var _preceptName = $("#increase_scheme .tx_xang .xzfa_famc input").val();
		var _drugTherapy = $("#increase_scheme .tx_xang .xzfa_ywzk textarea").val();
		var _sideEffects = $("#increase_scheme .tx_xang .xzfa_ywbnfy textarea").val();
		var _period = $("#increase_scheme .tx_dsvba .period select option:selected").val();
		var _electrocardiogram = $("#increase_scheme .tx_dsvba .electrocardiogram select option:selected").val();
		var _bloodRoutine = $("#increase_scheme .tx_dsvba .bloodRoutine select option:selected").val();
		var _hepatic = $("#increase_scheme .tx_dsvba .hepatic select option:selected").val();
		//var _ortherMap = $("#increase_scheme .tx_dsvba .ortherMap select option:selected").text();

		var _sleep = $("#increase_scheme .tx_xang .xzfa_jkzd textarea").val();
		var _dietGuide = $("#increase_scheme .tx_xang .xzfa_yszd textarea").val();
		var _sport = $("#increase_scheme .tx_xang .xzfa_ydzd textarea").val();

		var __ortherMap = {},
			__ortherStatus = false;
		$(".tx_dsvba li").each(function(i,o){
			if(i>3){
				__ortherStatus = true;
				__ortherMap[$(o).find("h2").html()] = $(o).find("p").html();
			}
		});

		if(!_preceptName){
			$.alert("请填写方案名称");
		}else if(!_drugTherapy){
			$.alert("请填写治疗方案");
		}else if(!_sideEffects){
			$.alert("请填写不良反应处理");
		}else{
			window._loading = new mask("loading");
			_loading.show();
			$.getDate({
				page:"doctor",
				inter:inter,
				data:{
					visitUuid:visitUuid,
					doctorUuid:gm.user.getDoctor(),
					preceptName:_preceptName,
					drugTherapy:_drugTherapy,
					sideEffects:_sideEffects,
					period:_period,
					electrocardiogram:_electrocardiogram,
					bloodRoutine:_bloodRoutine,
					hepatic:_hepatic,
					sleep:_sleep,
					dietGuide:_dietGuide,
					sport:_sport,
					ortherMap:__ortherStatus ? JSON.stringify(__ortherMap) : "{}",
					callback:"gm.follow_up.submitincrease_plan"
				},
				method:"POST",
				dataType:"script"
			});
		}
	});
}

//获取随访列表
gm.follow_up.getVisitApplyList = function(){
	$.getDate({
		page:"doctor",
		inter:"getVisitApplyList",
		data:{doctorid:gm.user.getDoctor()},
		callback:function(data){
			if(!data){
				$.alert("服务器出错!");
			}
			if(data.query.success=="1"){
				var arr = [];

				if (data.relist.length > 0){
					$(".nullfont").hide();
				}

				$(data.relist).each(function(i,o){
					arr.push('<li applyUuid="'+o["applyUuid"]+'"><a href="followed_for_details.shtml?applyUuid='+o.applyUuid+'"></a><div class="newszu"><div class="head_portrait">');
						if (o["imgUrl"]) {
							arr.push('<img src="'+o["imgUrl"]+'">');
						}else{
							arr.push('<img src="'+(o.sex == "1" ? window.___defaultImage_p_man : window.___defaultImage_p_woman)+'">');
						}
					arr.push('</div><div class="nagent"><div class="duof"><h3>'+o["realName"]);
					if (o["sex"] == "1") {
						arr.push('<i class="icon-boy"></i>');
					}else{
						arr.push('<i class="icon-girl"></i>');
					}
					arr.push('</h3><span>年龄：'+o["age"]+'岁</span><b class="date">'+o["createTime"]+'</b></div>\
					<p class="comment">'+o["illnessDescription"]+'</p></div></div></li>');
				});

				$("#follow_up_application .sfsq_box ul").html(arr.join(""));

			}else{
				$.alert(data.query.message);
			}
		}
	});
}

//获取随访详细信息
gm.follow_up.getApplyDetail = function(_applyUuid){
	$.getDate({
		page:"doctor",
		inter:"getApplyDetail",
		data:{applyUuid:_applyUuid},
		callback:function(data){
			if(!data){
				$.alert("服务器出错!");
			}
			if(data.query.success=="1"){
				var _obj = data.relist[0];

				if(!_obj){alert("服务出错!"); return;}
				$("#follow_up_for_details .gercnsd i").html(_obj.realName);

				if (_obj.sex == "1") {
					$("#follow_up_for_details .gercnsd b").html("男");
				}else{
					$("#follow_up_for_details .gercnsd b").html("女");
				}

				$("#follow_up_for_details .gercnsd div span").html(_obj.age);

				$(".gercnsd p span").html("病情描述：" + _obj.diagnose)

				$("#follow_up_for_details .sfsqxq_box ul").attr("customerUuid",_obj.customerUuid);
			}else{
				$.alert(data.query.message);
			}
		}
	});
}

//医生拒绝关联患者
gm.follow_up.refuseVivistApply = function(_applyUuid){
	//$("#follow_up_for_details .refuse_details textarea").diySetText();
	$("#follow_up_for_details .refuse_details .btn-zyradius").bind({
		touchend:function(){
			var _submitObj = $(this).parent();
			//var _customerUuid = $("#follow_up_for_details .sfsqxq_box ul").attr("customerUuid");
			var _refuseReason = $("#follow_up_for_details .refuse_details textarea").val();

			$.getDate({
				page:_submitObj.attr("page"),
				inter:_submitObj.attr("inter"),
				data:{refuseReason:_refuseReason,applyUuid:_applyUuid},//customerUuid:_customerUuid,
				callback:function(data){
					if(!data){
						$.alert("服务器出错!");
					}
					if(data.query.success=="1"){
						gm.pul.toUrl( "/html/follow_up/followed_up_for.shtml");
					}else{
						$.alert(data.query.message);
					}
				}
			});
			$("#follow_up_for_details .refuse_details").hide();
		}
	});
}

//获取结果绑定
gm.follow_up.addCustomerBind=function(data){
	window._loading && window._loading.hide();
	if(!data){
		$.alert("服务器出错!");
	}
	if(data.query.success=="1"){
		// console.log(data);
		//更变原因：添加患者时，不创建病历
		// gm.pul.toUrl( "add_patients.shtml?customerUuid=" + data.customerUuid + "&medicalRecordUuid=" + data.medicalRecordUuid);
		gm.pul.toUrl( "add_patients.shtml?customerUuid=" + data.customerUuid);
	}else{
		$.alert(data.query.message);
	}
}

gm.follow_up.bindAddCustomer = function(data){
	if(!data){
		$.alert("服务器出错!");
	}
	if(data.query.success=="1"){
		var o = data.medicalRecord;

		//姓名
		 $("#patient_information .hzxx_box .name input").val(data.name);
		//性别
		 $("#patient_information .hzxx_box .sex select").val(data.sex);
		//生日
		 $("#patient_information .hzxx_box .birthday input").val(data.birthday);
		//身份证号码
		 $("#patient_information .hzxx_box .IDNum input").val(data.IDNum);
		//患者职业
		 $("#patient_information .hzxx_box .industry input").val(data.industry);
		//手机号
		 $("#patient_information .hzxx_box .mobile input").val(data.mobile);
		//邮箱
		 $("#patient_information .hzxx_box .email input").val(data.email);
		//住址
		 $("#patient_information .hzxx_box .address input").val(data.address);
		//介绍人
		 $("#patient_information .hzxx_box .introduceName input").val(data.introduceName);
		//紧急联系人
		 $("#patient_information .hzxx_box .alternativeName input").val(data.alternativeName);
		//紧急联系电话
		 $("#patient_information .hzxx_box .alternativePhone input").val(data.alternativePhone);
		//就诊时间
		 $("#patient_information .hzxx_box .seeDoctorTime input").val(o.seeDoctorTime);
		//科室
		 $("#patient_information .hzxx_box .departmentName option[value=" + o.divisionUuid + "]").attr("selected","selected");
		//编号类型
		 $("#patient_information .hzxx_box .caseCategoryType option").eq(o.caseCategoryType).attr("selected","selected");
		//编号
		 $("#patient_information .hzxx_box .medicalNum input").val(o.medicalNum);

		$(".tj_hzxx span").html(data.customerName);
		$(".tj_hzxx b").html(data.age);
		if (data.sex == 1) {
			$(".tj_hzxx .sex").html("男");
		}else{
			$(".tj_hzxx .sex").html("女");
		}

		var _ =  new Date();
		$(".tj_hzxx strong").html(_.getFullYear()+"-"+_.getMonth()+"-"+_.getDate())
	}
};


// //获取科室
// $.fn.getDepartment = function(){
// 	var _ = this;

// 	// $.getDate({
// 	// 	page:"public",
// 	// 	inter:"getDepartment",
// 	// 	callback:function(data){
// 	// 		if(!data){
// 	// 			$.alert("服务器出错！")
// 	// 			return;
// 	// 		}

// 	// 		if (data.query.success) {
// 	// 			var arr = [];
// 	// 			var _getHospital = '<option value="0">选择科室</option>';

// 	// 			$(data.relist).each(function(i,o){
// 	// 				arr.push('<option value="'+o["id"]+'">'+o["departmentName"]+'</option>');
// 	// 			});

// 	// 			_.html(_getHospital + arr.join(""));

// 	// 		};
// 	// 	}
// 	// });
// }

//添加患者,并返回创建的病历,及患者信息
gm.follow_up.addCustomer=function(data){
	var _customerUuid = gm.para.get(window.location.href,"_customerUuid"),
		_doctorUuid = gm.user.getDoctor();
	
	$("#k").getDepartment();

	if(_customerUuid){
		$.getDate({
			page:"user",
			method:"POST",
			inter:"getCustomer",
			data:{customerUuid:_customerUuid,doctorUuid:_doctorUuid,callback:"gm.follow_up.bindAddCustomer"},
			dataType:"script",
			callback:function(data){
				
			}
		});
	}


	$("#patient_information .hzxx_but .btn-zyradius").bind({
		touchend:function(){
			var _submitObj = $(this).parent();

			//姓名
			var _name = $("#patient_information .hzxx_box .name input").val();
			//性别
			var _sex = $("#patient_information .hzxx_box .sex select").val();
			//生日
			var _birthday = $("#patient_information .hzxx_box .birthday input").val();
			//身份证号码
			var _IDNum = $("#patient_information .hzxx_box .IDNum input").val();
			//患者职业
			var _industry = $("#patient_information .hzxx_box .industry input").val();
			//手机号
			var _mobile = $("#patient_information .hzxx_box .mobile input").val();
			//邮箱
			var _email = $("#patient_information .hzxx_box .email input").val();
			//住址
			var _address = $("#patient_information .hzxx_box .address input").val();
			//介绍人
			var _introduceName = $("#patient_information .hzxx_box .introduceName input").val();
			//紧急联系人
			var _alternativeName = $("#patient_information .hzxx_box .alternativeName input").val();
			//紧急联系电话
			var _alternativePhone = $("#patient_information .hzxx_box .alternativePhone input").val();
			//就诊时间
			var _seeDoctorTime = $("#patient_information .hzxx_box .seeDoctorTime input").val();
			//科室
			var _departmentName = $("#patient_information .hzxx_box .departmentName select").val();
			//编号类型
			var _caseCategoryType = $("#patient_information .hzxx_box .caseCategoryType option:selected").val();
			//编号
			var _medicalNum = $("#patient_information .hzxx_box .medicalNum input").val();
			if (_name && _IDNum && _mobile && _email && _industry && _address && _introduceName && _alternativeName && _birthday && _sex && _alternativePhone && _seeDoctorTime && _departmentName && _caseCategoryType && _medicalNum) {
				window._loading = new mask("loading");
				_loading.show();
				$.getDate({
					page:_submitObj.attr("page"),
					inter:_submitObj.attr("inter"),
					data:{
						callback:"gm.follow_up.addCustomerBind",
						doctorUuid:gm.user.getDoctor(),
						name:_name,
						sex:_sex,
						birthday:_birthday,
						IDNum:_IDNum,
						divisionUuid:_departmentName,
						mobile:_mobile,
						email:_email,
						industry:_industry,
						address:_address,
						introduceName:_introduceName,
						alternativeName:_alternativeName,
						alternativePhone:_alternativePhone,
						seeDoctorTime:_seeDoctorTime,
						caseCategoryType:_caseCategoryType,
						medicalNum:_medicalNum
					},
					method:"POST",
					dataType:"script"
				});
			}else{
				$.alert("请填写完整信息！");
			}
		}
	});
}

//获取所有医生的随访列表方案
gm.follow_up.getAllVisitPreceptList = function(callback){

	$.getDate({
		page:"doctor",
		inter:"getAllVisitPreceptList",
		data:{doctorUuid:gm.user.getDoctor()},
		callback:callback
	});
}

 gm.user.getCustomerByCostomerUuid = function(customerUuid,callback){
	$.getDate({
		page:"user",
		inter:"getCustomerByCostomerUuid",
		data:{hid:customerUuid,doctorUuid:gm.user.getDoctor()},
		callback:callback || function(data){}
	});
}

//添加患者
gm.follow_up.add_patients = function(){
	var _customerUuid = gm.para.get(window.location.href,"customerUuid");

	if(_customerUuid){
		 gm.user.getCustomerByCostomerUuid(_customerUuid,function(data){
			if(!data){
				$.alert("服务器出错!");
			}
			if(data.query.success=="1"){
				$(".tj_hzxx span").html(data.info.customerName);
				$(".tj_hzxx b").html(data.info.age);
				if (data.info.sex == 1) {
					$(".tj_hzxx .sex").html("男");
				}else{
					$(".tj_hzxx .sex").html("女");
				}
				var _ =  new Date();
				$(".tj_hzxx strong").html(_.getFullYear()+"-"+_.getMonth()+"-"+_.getDate())
				//更变原因：添加患者时，不创建病历
				// var m = data.medicalRecordList[0] || {};
				// if(m["uuid"]){

				// }else{
				// 	return;
				// }
			}
		})
	}	
}

//服药记录
gm.follow_up.getDoctorAdviceModelByVisitRecordUuid = function(_applyUuid){
	$.getDate({
		page:"doctor",
		inter:"getDoctorAdviceModelByVisitRecordUuid",
		data:{visitRecordUuid:_applyUuid},
		callback:function(data){
			if(!data){
				$.alert("服务器出错!");
			}
			if(data.query.success=="1"){
				var arr = [];
				var _frequency = ["早","中","晚"];
				var _directions = ["饭前","饭后","随餐","空腹"]
				$(data.relist).each(function(i,o){
					if(o["frequency"]){
						var _frequency_arr = o["frequency"].split(","),
							_frequency_str = [];
						for(var _i = 0; _i < _frequency_arr.length; _i++){
							_frequency_str.push(_frequency[(_frequency_arr[_i]-1)]);
						}
					}
					arr.push('<table>\
								<tr>\
									<th class="header">药品名称</th>\
									<td class="header">'+o["medicineName"]+'</td>\
								</tr>\
								<tr>\
									<th>单　　量</th>\
									<td>'+o["dosage"]+'Mg</td>\
								</tr>\
								<tr>\
									<th>频　　率</th>\
									<td>'+ (_frequency_str && _frequency_str.join() || '')+'</td>\
								</tr>\
								<tr>\
									<th>用　　法</th>\
									<td>'+_directions[o["directions"]-1]+'</td>\
								</tr>\
							</table>');
				})

				$(".cbox .sheet2").html(arr.join(""));

				$(".fyjl dd .sheet2").html(data.relist.length ? arr.join("") : "<p style='text-align:center;padding:.3rem 0;'>患者并没有提交服药记录信息</p>");

				if (data.relist.length > 0){
					$(".nullfont").hide();
				}
			}else{
				$.alert(data.query.message);
			}
		}
	});
}

//睡眠情况，进食情况，其他情况，其他检查结果
gm.follow_up.getVisitPreceptExtendList = function(applyUuid,type,o){
	$.getDate({
		page:"doctor",
		inter:"getVisitPreceptExtendList",
		data:{preceptUuid:applyUuid,type:type},
		callback:function(data){
			if(!data){
				$.alert("服务器出错!");
			}
			if(data.query.success=="1"){
				var arr = [],
					_state = ["良好","一般","异常","其他"];
				$(data.relist).each(function(i,o){
					if (type == 3) {
						arr.push(o["result"]);
					}else{
						var _a = o["name"];
						var _b = o["period"];
						var _c = o["result"];
						if(type == 1 || type == 2){
							_b = _state[o["state"]-1];
						}
						if(type == 4){
							_b = _a;
						}
						arr.push('<tr>\
							<th>'+ (_b || '') +'</th>\
							<td>'+ (_c || '') +'</td>\
						</tr>');
					}
				});

				$sheet = $(".sheet");

				if (type == 1) {
					if(data.relist.length == 0){
						if(o)
							$sheet = o.find(".sheet");
						$sheet.html("<div id='dont_show' style='padding:.3rem 0;'>患者并没有提交任何睡眠情况</div>")
						return;
					}
					arr.unshift('<tr><th>' + data.relist[0]["name"] + '</th><td>原因描述</td></tr>');
					$(".smqk dd table").html(arr.join(""));
					$(".sheet table").html(arr.join(""));
				}else if(type == 2){
					if(data.relist.length == 0){
						if(o)
							$sheet = o.find(".sheet");
						$sheet.html("<div id='dont_show' style='padding:.3rem 0;'>患者并没有提交任何进食情况</div>")
						return;
					}
					arr.unshift('<tr><th>' + data.relist[0]["name"] + '</th><td>原因描述</td></tr>');
					$(".jsqk dd table").html(arr.join(""));
					$(".sheet table").html(arr.join(""));
				}else if(type == 3){
					if(data.relist.length == 0){
						if(o)
							$sheet = o.find(".down");
						$sheet.html("<div id='dont_show' style='padding:.3rem 0;'>患者并没有提交任何其他情况</div>")
						return;
					}
					$(".qtqk dd .desc p").html(arr.join(""));
					$(".desc p").html(arr.join("<br>"));
				}else{
					if(o)
						$sheet = o.find(".sheet");
					if(data.relist.length == 0){
						$sheet.html("<div id='dont_show' style='padding:.3rem 0;'>患者并没有提交任何其他检查结果</div>")
						return;
					}
					// $(".qtjcjg dd table").html(arr.join(""));console.log($(".qtjcjg dd table").html())
					// if(o)
					arr.unshift('<tr><th style="white-space: nowrap;">检查结果</th><td>结果</td></tr>');
					$sheet.find("table").html(arr.join(""));
					// else
						// $sheet.find("table").html(arr.join(""));

				}
			}else{
				$.alert(data.query.message);
			}
		}
	});
}

//病情变化
gm.follow_up.disease_change = function(_applyUuid){
	$.getDate({
		page:"patient",
		inter:"getIllnessRecordByVisitRecordUuid",
		data:{visitRecordUuid:_applyUuid},
		callback:function(data){
			if(!data){
				$.alert("服务器出错!");
			}
			if(data.query.success=="1"){
				var arr = [],
					_previons = ["痊愈","好转","一般","其他"];
				$(data.relist).each(function(i,o){
					arr.push('<tr>\
						<th>'+o["createTime"]+'</th>\
						<td>'+_previons[o["previons"]-1]+'</td>\
						<td>'+o["note"]+'</td>\
					</tr>');
				});
				console.log(data.relist)
				if(data.relist[0] != undefined){
					$(".bqbh .down table,.sheet tbody").html(arr.join(""));
				}else{
					$(".bqbh .down,.sheet").html("<p style='text-align:center;padding:.3rem 0;'>患者并没有提交病情变化信息</p>");
				}
			}else{
				$.alert(data.query.message);
			}
		}
	});
}

//药物导致的不良反
gm.follow_up.adverseArugReactions = function(visitRecordUuid){
	$.getDate({
        page: "patient",
        inter: "getDrugReactionList",
        data: {
            preceptUuid: visitRecordUuid
        },
        callback: function(r) {
            var relist = r.relist,
                _dosageTime = ["一周","两周","三周","四周"];
            if (relist.length == 0) {
                $(".ywblfy .sheet").html('<p style="text-align:center;padding:.3rem 0;">患者没有填写任何信息</p>');
                return false;
            }
            
            html = '';
            for (var i = 0; i < relist.length; i++) {
                html += '<div><p>时间：' + relist[i]['occurrenceTime'] + ' 周期：' + _dosageTime[relist[i]['dosageTime']-1] +'</p>\
				<p>症状描述:' + relist[i]['frequency'] + '</p>\
				<p>影响:' + relist[i]['impact'] + '</p>\
			</div>'
            }

            console.log(html)
            $(".ywblfy .sheet3").html(html);
        }
    });
};