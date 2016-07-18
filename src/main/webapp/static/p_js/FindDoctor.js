var totalPage=0;
//gm.pul.returnurl = gm.pul.returnIndex;
gm.isIndex = true;
gm.pul.returnurl=function(){//退回首页
	if(!gm.isMobile){return;}
		gm.pul.toUrl("goodm://returnIndexPage");
}
gm.setReturn = function(){
	hidesdc();
}

function showsdc(num){
	$(".quanzdp").addClass("sdc1");
	$(".quanzdp").removeClass("sdc");
	gm.pul.returnurl = gm.setReturn;
}

function hidesdc(){
	$(".quanzdp").removeClass("sdc1");
	$(".quanzdp").addClass("sdc");
	gm.isIndex = true;
	gm.pul.returnurl =function(){
		if(!gm.isMobile){return;}
		gm.pul.toUrl("goodm://returnIndexPage");
	}
	___select_province.hide();
	___select_city.hide();
	___select_county.hide();
	$(".maskBar").removeClass("show");
	$(".cur").removeClass("cur");
}

//获取医院
$.fn.getHospital = function(obj){
	var _option = {
		showi : ".yiyuan"
	}
	var _ = this;
	var _province = $("#select_province p").attr("val");
	var _city = $("#select_city p").attr("val");
	var _county = $("#select_county p").attr("val");
	var _loading = new mask("loading");
	_loading.show();
	$.getDate({
		page:"public",
		inter:"getHospital",
		data:{provinceUuid:_province,cityUuid:_city,regionUuid:_county},
		callback:function(data){
			_loading.hide();
			if(!data){
				$.alert("服务器出错！")
				return;
			}

			if (data.query.success) {
				var arr = [];

				if(data.relist.length > 0){
					arr.push("<ul>");
					$(data.relist).each(function(i,o){
						arr.push('<li><a id="'+o["id"]+'">'+o["hospitalName"]+'</a></li>');
					});
					arr.push("</ul>");
					_.html(arr.join(""));

					_.find("li").bind({
						touchend:function(){
							var _ = $(this);

							if(_.hasClass("cur")){
								_.removeClass("cur");
							}else{
								_.addClass("cur");
							}
						}
					});
				}else{
					_.html("该地区没有医院信息");
				}
			};
		}
	});
};

//选择省份
function cearSelect_province(){
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
					"title" : "请选择省/直辖市",
					"lists" : [
						{ "id" : "0" , "val" : "选择省/直辖市" , "disabled" : "1" }
					],
					"backEvent" : null,
					"selectedCallback" : function(msg){
						$("#select_province p").html(msg.val).attr("val",msg.id);
						// $("#select_city p").attr("val");
						// $("#select_county p").attr("val");
						cearSelect_city(msg);
						$("#select_city p").html("选择市").attr("val","");
						$("#select_county p").html("选择区/县").attr("val","");
						$("#select_county").attr("event","0");
						$(".yiyuan").getHospital();
						___select_province.close();
					}
				}

				//获取成功
				$(data.relist).each(function(i,o){
					// var selected = (o["code"] == _id ? 1 : 0);
					__province.lists.push({
						"id":o["code"],
						"val":o["provinceName"]
						// "selected":selected
					})
					//arr.push('<option value="'+o["code"]+'">'+o["provinceName"]+'</option>');
				});
				window.___select_province = new selectBar(__province);
				$("#select_province").bind({
					touchend:function(){
						window.___select_province.open(__province);
					}
				});
			}else{
				//出错了
				$.alert(data.query.message);
			}
		}
	});
};

//选择城市
function cearSelect_city(msg){
	$.getDate({
		page:"public",
		inter:"getCity",
		data:{provinceUuid:msg.id},
		callback:function(data){
			if(!data){
				$.alert("服务器出错！")
				return;
			}

			if(data.query.success === "1"){
				var arr = [];

				var __province = {
					"title" : "请选择市",
					"lists" : [
						{ "id" : "0" , "val" : "选择市" , "disabled" : "1" }
					],
					"backEvent" : null,
					"selectedCallback" : function(msg){
						$("#select_city p").html(msg.val).attr("val",msg.id);
						cearSelect_county(msg);
						$("#select_county p").html("选择区/县").attr("val","");
						$(".yiyuan").getHospital();
						___select_city.close();
					}
				}

				//获取成功
				$(data.relist).each(function(i,o){
					// var selected = (o["code"] == _id ? 1 : 0);
					__province.lists.push({
						"id":o["code"],
						"val":o["cityName"]
						// "selected":selected
					})
					//arr.push('<option value="'+o["code"]+'">'+o["provinceName"]+'</option>');
				});
				$("#select_city").attr("event","1");
				if(window.___select_city){
					___select_city.reUI();
					___select_city.resetData(__province);
					window.___select_county && ___select_county.reUI();
				}else{
					window.___select_city = new selectBar(__province);
					$("#select_city").bind({
						touchend:function(){
							if($(this).attr("event") == "1"){
								window.___select_city.open();
							}
						}
					});
				}
			}else{
				//出错了
				$.alert(data.query.message);
			}
		}
	});
};
//选择县区
function cearSelect_county(msg){
	$.getDate({
		page:"public",
		inter:"getRegion",
		data:{cityUuid:msg.id},
		callback:function(data){
			if(!data){
				$.alert("服务器出错！")
				return;
			}

			if(data.query.success === "1"){
				var arr = [];

				var __province = {
					"title" : "请选择区/县",
					"lists" : [
						{ "id" : "0" , "val" : "选择区/县" , "disabled" : "1" }
					],
					"backEvent" : null,
					"selectedCallback" : function(msg){
						$("#select_county p").html(msg.val).attr("val",msg.id);
						$(".yiyuan").getHospital();
						___select_county.close();
					}
				}

				//获取成功
				$(data.relist).each(function(i,o){
					// var selected = (o["code"] == _id ? 1 : 0);
					__province.lists.push({
						"id":o["code"],
						"val":o["regionName"]
						// "selected":selected
					})
					//arr.push('<option value="'+o["code"]+'">'+o["provinceName"]+'</option>');
				});
				$("#select_county").attr("event","1");
				if(window.___select_county){
					___select_county.reUI();
					___select_county.resetData(__province);
				}else{
					window.___select_county = new selectBar(__province);
					$("#select_county").bind({
						touchend:function(){
							if($(this).attr("event") == "1"){
								window.___select_county.open();
							}
						}
					});
				}
			}else{
				//出错了
				$.alert(data.query.message);
			}
		}
	});
};

//获取医生专长
$.getDate({
	page:"patient",
	inter:"getTags",
	callback:function(data){
		if(!data){
			$.alert("服务器出错!");
			return;
		}
		if(data.query.success == "1"){
			var arr = [];
			arr.push('<ul>');
			$(data.reList).each(function(i,o){
				arr.push(gm.replace('<li><a id="{tagUuid}">{tagName}</a></li>',o));
			});				
			arr.push('</ul>');
			$(".tags").html(arr.join(""));

			$(".tags li").bind({
				touchend:function(){
					var _ = $(this);

					if(_.hasClass("cur")){
						_.removeClass("cur");
					}else{
						_.addClass("cur");
					}
				}
			})
		}else{
			$.alert(data.query.message);
		}
	}
});

	
	
	// 筛选遮罩层滑动

$(function(){	
		$(".sx1").bind({
			touchend:function(){
				showsdc();
			}
		});
		$(".quanzdp .shuaixfnea span").bind({
			touchend:function(){
				hidesdc();
			}
		});

		var list = $("#test_results .addreginfo_qt ul li").slice(3);
		list.bind({
			touchend:function(){
				var _ = $(this);

				list.removeClass("cur");
				_.addClass("cur");

				$(".baijinzi").hide();

				var _for = _.attr("for");
				$("." + _for).show();
			}
		});

		// $("#selectp").getProvince();
		cearSelect_province();

		//确定筛选
		$(".determine").bind({
			touchend:function(){
				var hospital = "";
				var territory = "";
				var arr = [];
			    window._loading = new mask("loading");
				window._loading.show();

				$(".yiyuan li.cur a").each(function(i,o){
					arr.push($(o).attr("id"));
				});
				hospital = arr.join(",");

				arr = [];

				$(".tags li.cur a").each(function(i,o){
					arr.push($(o).attr("id"));
				});
				territory = arr.join(",");
				var city = $("#select_province p").attr("val") || $("#select_city p").attr("val") || $("#select_county p").attr("val");
				$.getDateAjax({
					page:"patient",
					inter:"getDoctorsBySelect",
					method:"POST",
					data:{
						city:city,
						hospitalUuids:hospital,
						territorys:territory
					},
					callback:function(_data){
						//window._loading && window._loading.hide(); 
		    			if(_data.code==200){
							bindData(_data.value);
						}else if(_data.code==500){
							$.alert(_data.message);
						}else{
							$.alert(_data.message);
						}
						$(".sdc1").removeClass("sdc1").addClass("sdc");
					}
				});
			}
		});
		
		
		function searchDoctor(doctorConditon,callback){
			doctorConditon = doctorConditon || " ";	
			
			$.getDateAjax({
				page:"patient",
				inter:"getDoctorsBySelect",
				method:"POST",
				data:{
					"doctorConditon":doctorConditon,
				},
				callback:function(_data){
						window._loading && window._loading.hide(); 
		    			if(_data.code==200){
							callback(_data.value);
							
						}else if(_data.code==500){
							$.alert(_data.message);
						}else{
							$.alert(_data.message);
						}
					}
				});
		}
		//防止表单提交
		$(".cklamngy form").bind({
			submit:function(e){
				return false;
			}
		});
		//input 键盘事件
		$(".cklamngy input").bind({
			keyup:function(e){
				var _event = window.event;
				if(event.keyCode == 13){
					var key = $(".cklamngy .ipt-def").val();
					searchDoctor(key);
				}
			}
		});

		searchDoctor("",function(data){
			bindData(data);
			
			if(data.reList.length>=20){
				refresher.init({
					id:"wrapper",//<------------------------------------------------------------------------------------┐
					pullDownAction:Refresh,                                                            
					pullUpAction:Load 																			
				});
				
				wrapper.refresh();
				totalPage=data.totalPage;
			}
			
		});
		//绑定数据 
		function bindData(data){
			//var obj = $(".looking_tofindthe ul");
			var arr = [];
			if(data.reList.length == 0){
				$(".findDoctorList ul").html("<li style='text-align:center;padding:1rem;'>无医生信息<li>");
				return false;
			}
			var tmp = "<li id='bacjkloa'>"+
				"<div class='doctor'>"+
					"<a href='/patient/home/thedoctorlistdetails.shtml?return=tolist&doctorUuid={doctorUuid}'></a>"+
					"<div class='icon1'>"+
						"<img src='{img}'>"+
					"</div>"+
					"<div class='p_fbjn'>"+
						"<h3>{doctorName}<i class='{sexType}'></i></h3>"+
						"<p>{professional}</p>"+
					"</div>"+
					"<div class='p_yvbu'>"+
						"<p class='p_hjf'>{hospitalName}</p>"+
						"<p>{departmentName}</p>"+
					"</div>"+
					"<div class='p_jlfk'>"+
						"<p>服务人次:</p>"+
						"<p>{serviceCount}</p>"+
					"</div>"+
				"</div>"+
				"<div class='menu'>"+
				"<a href='/patient/home/teleconsult_1.shtml?doctorUuid={doctorUuid}'>"+
					"<i class='zys-phone{telState}'></i><span>电话咨询</span>"+
				"</a>"+
				"<a href='/patient/my_doctor/communicate_patient.shtml?doctorUuid={doctorUuid}'>"+
					"<i class='zys-wndsx{teletext}'></i><span>图文咨询</span>"+
				"</a>"+
				"<a href='/patient/home/thedoctorappointmentplus.shtml?doctorUuid={doctorUuid}'>"+
				"<i class='zys-dcsos{plus}'></i><span>预约加号</span>"+
				"</a>"+
				"<a href='/patient/home/package.shtml?doctorUuid={doctorUuid}'>"+
					"<i class='zys-grqxs{personal}'></i><span>私人医生</span>"+
				"</a>"+
				"</div>"+
				"</li>";

			$(data.reList).each(function(i,o){
				o.professional = window.___professional[o.professional*1];

				o.telState = (o.telState || 0)*1 + 1;
				o.teletext = (o.teletext || 0)*1 + 1;
				o.plus = (o.plus || 0)*1 + 1;
				o.personal = (o.personal || 0)*1 + 1;
				o.img = o.img ? (o.img.small ? o.img.small : (o.img.large ? o.img.large : window.___defaultImage)) : window.___defaultImage;
				o.sexType = (!o.sex || o.sex == 1) ? "icon-boy" : "icon-girl";
				arr.push(gm.replace(tmp,o));
			});
			$(".findDoctorList ul").html(arr.join(""));//此处填写空格，否则默认为逗号
			$(".findDoctorList .menu i").each(function(i,o){
				if ($(this).hasClass("zys-phone1") || $(this).hasClass("zys-dcsos1") || $(this).hasClass("zys-wndsx1") || $(this).hasClass("zys-grqxs1")) {
					$(this).parent("a").attr("href","###");
					$(this).next().css({"color":"#b1b1b1"});//区分颜色
				};
			});
		}
		
		//分页操作开始
		

		/**最新资讯**/
		var generatedCount = 1;
		//refreshdata(20,1,"",bindData);
		function Refresh(_contentCategoryUuid) {
		    setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
		    	var ____loading = new mask("loading");
		    	____loading.show();
		    	if(_contentCategoryUuid==undefined){
		    			_contentCategoryUuid="";
		    	}
		    	refreshdata(20,1,_contentCategoryUuid,function(data){
		    		____loading.hide();
		    		$(".findDoctorList ul").html(bindData(data.value));
		    		generatedCount=1;
		    		totalPage=data.value.totalPage;
		    		$(".pullUp").show();
		    		wrapper.refresh();
		    		
		    	});
		        //wrapper.refresh();/****remember to refresh after  action completed！ ---yourId.refresh(); ----| ****/
		    }, 1000);

		}

		function Load(_contentCategoryUuid) {
		    setTimeout(function () {// <-- Simulate network congestion, remove setTimeout from production!
		    	++generatedCount;
		    	if(_contentCategoryUuid==undefined){
	    			_contentCategoryUuid="";
		    	}
		    	if(generatedCount<=totalPage)
			    	refreshdata(20,generatedCount,_contentCategoryUuid,function(data){
		    			$(".findDoctorList ul").append(bindData(data.value));
		        		if(generatedCount==data.value.totalPage)
		        			$(".pullUp").hide();
		        		wrapper.refresh();
			    	});
		    	else
		    		$(".pullUp").hide();
		        //wrapper.refresh();/****remember to refresh after action completed！！！   ---id.refresh(); --- ****/
		    }, 1000);
		}
		/**
		 * 找医生加载更多时调用
		 * @param page 当前页面有多少条记录
		 * @param pageno 当前第几页面
		 * @param doctorConditon
		 * @param callback
		 */
		function refreshdata(page,pageno,doctorConditon,callback){
			$.getDateAjax({
				page:"patient",
				inter:"getDoctorsBySelect",
				method:"POST",
				data:{"doctorConditon":doctorConditon,pageCount:page,pageNo:pageno},
				callback:function(_data){
					if(_data.code==200){
						callback(_data);
					}else if(_data.code==500){
						$.alert(_data.message);
					}else{
						$.alert(_data.message);
					}
				}
			});
		}
		
		//分页操作结束 
		
		
		
		//查找 
		$(".cklamngy .icon-fdjn").bind({
			touchend:function(){
				var key = $(".cklamngy .ipt-def").val();
				searchDoctor(key,function(data){
					var obj = $(".looking_tofindthe ul");
					var arr = [];
					setTimeout(function(){
						window._loading.hide();
					},100);
					if(data.reList.length == 0){
						obj.html("<li style='text-align:center;padding:1rem;'>无医生信息<li>");
						return false;
					}
					var tmp = '<li id="bacjkloa"><div class="doctor"><a href="/patient/home/thedoctorlistdetails.shtml?return=tolist&doctorUuid={doctorUuid}"></a><div class="icon1"><img src="{img}"></div><div class="p_fbjn"><h3>{doctorName}<i class="{sexType}"></i></h3><p>{professional}</p></div><div class="p_yvbu"><p class="p_hjf">{hospitalName}</p><p>{departmentName}</p></div><div class="p_jlfk"><p>服务人次:</p><p>{serviceCount}</p></div></div><div class="menu">\
					<a href="/patient/home/teleconsult_1.shtml?doctorUuid={doctorUuid}"><i class="zys-phone{telState}"></i><span>电话咨询</span></a>\
					<a href="/patient/my_doctor/communicate_patient.shtml?doctorUuid={doctorUuid}"><i class="zys-wndsx{teletext}"></i><span>图文咨询</span></a>\
					<a href="/patient/home/thedoctorappointmentplus.shtml?doctorUuid={doctorUuid}"><i class="zys-dcsos{plus}"></i><span>预约加号</span></a>\
					<a href="/patient/home/package.shtml?doctorUuid={doctorUuid}"><i class="zys-grqxs{personal}"></i><span>私人医生</span></a></div></li>,';

					$(data.reList).each(function(i,o){
						o.professional = window.___professional[o.professional*1];

						o.telState = (o.telState || 0)*1 + 1;
						o.teletext = (o.teletext || 0)*1 + 1;
						o.plus = (o.plus || 0)*1 + 1;
						o.personal = (o.personal || 0)*1 + 1;
						o.img = o.img ? (o.img.small ? o.img.small : (o.img.large ? o.img.large : window.___defaultImage)) : window.___defaultImage;
						o.sexType = (!o.sex || o.sex == 1) ? "icon-boy" : "icon-girl";
						arr.push(gm.replace(tmp,o));
					});
					
					$(".findDoctorList ul").html(arr.join(""));
					$(".findDoctorList .menu i").each(function(i,o){
						if ($(this).hasClass("zys-phone1") || $(this).hasClass("zys-dcsos1") || $(this).hasClass("zys-wndsx1") || $(this).hasClass("zys-grqxs1")) {
							$(this).parent("a").attr("href","###");
							$(this).next().css({"color":"#b1b1b1"});//区分颜色
						};
					});
				});
			}
		});
		//点击进入个人医生
		gm.bindDoctorList = function(data){
			if(!data){
				$.alert("服务器出错");
				return;
			}

			if(data.code == "1"){
				var obj = $(".findDoctorList ul");
				var arr = [];
				setTimeout(function(){
					window._loading.hide();
				},100);
				if(!data.value.reList.length){
					obj.html("<li style='text-align:center;padding:1rem;'>无医生信息<li>");
					return false;
				}
				var tmp = '<li id="bacjkloa"><div class="doctor"><a href="/patient/home/thedoctorlistdetails.shtml?return=tolist&doctorUuid={doctorUuid}"></a><div class="icon1"><img src="{img}"></div><div class="p_fbjn"><h3>{doctorName}<i class="{sexType}"></i></h3><p>{professional}</p></div><div class="p_yvbu"><p class="p_hjf">{hospitalName}</p><p>{departmentName}</p></div><div class="p_jlfk"><p>服务人次:</p><p>{serviceCount}</p></div></div><div class="menu">\
				<a href="/patient/home/teleconsult_1.shtml?doctorUuid={doctorUuid}"><i class="zys-phone{telState}"></i><span>电话咨询</span></a>\
				<a href="/patient/my_doctor/communicate_patient.shtml?doctorUuid={doctorUuid}"><i class="zys-wndsx{teletext}"></i><span>图文咨询</span></a>\
				<a href="/patient/home/thedoctorappointmentplus.shtml?doctorUuid={doctorUuid}"><i class="zys-dcsos{plus}"></i><span>预约加号</span></a>\
				<a href="/patient/home/package.shtml?doctorUuid={doctorUuid}"><i class="zys-grqxs{personal}"></i><span>私人医生</span></a></div></li>';

				$(data.value.reList).each(function(i,o){
					o.professional = window.___professional[o.professional*1];

					o.telState = (o.telState || 0)*1 + 1;
					o.teletext = (o.teletext || 0)*1 + 1;
					o.plus = (o.plus || 0)*1 + 1;
					o.personal = (o.personal || 0)*1 + 1;
					o.img = o.img || window.___defaultImage;
					o.sexType = (!o.sex || o.sex == 1) ? "icon-boy" : "icon-girl";
					arr.push(gm.replace(tmp,o));
				});
				obj.html(arr.join(""));
				$(".findDoctorList .menu i").each(function(i,o){
					if ($(this).hasClass("zys-phone1") || $(this).hasClass("zys-dcsos1") || $(this).hasClass("zys-wndsx1") || $(this).hasClass("zys-grqxs1")) {
						$(this).parent("a").attr("href","###");
						$(this).next().css({"color":"#b1b1b1"});//区分颜色
					};
				});
			}else{
				$.alert(data.message);
				setTimeout(function(){
					window._loading.hide();
				},100);
			}
		}
});
		