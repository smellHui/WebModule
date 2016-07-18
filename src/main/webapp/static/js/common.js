/*ajax({
        url: "./TestXHR.aspx",              //请求地址
        type: "POST",                       //请求方式
        data: { name: "super", age: 20 },        //请求参数
        dataType: "json",
        success: function (response, xml) {
            // 此处放成功后执行的代码
        },
        fail: function (status) {
            // 此处放失败后执行的代码
        }
    });
*/
    function ajax1(options) {
    	
    	var _option = {
    			page:"",
    			inter:"",
    			data:{},
    			method:"GET",
    			dataType:"json",
    			callback:function(){},
    			error:function(){}
    		}

    		//调用传参数覆盖原始参数
    		for(var k in options){
    			_option[k] = options[k];
    		}

    		//验证接口是否正确
    		var _url = _pageConfig[_option.page];
    		if(_url){
    			_url = _url[_option.inter];
    			if(_url){
    				
    			}else{
    				console.log("参数不对")
    			}
    		}else{
    			console.log("参数不对")
    		}

    		if(_option.loading){
    			window._loading = new mask("loading");
    			window._loading.show();
    		}
    	
        //options = options || {};
        //options.type = (options.type || "GET").toUpperCase();
        //options.dataType = options.dataType || "json";
        var params = formatParams(_option.data);

        //创建 - 非IE6 - 第一步
        if (window.XMLHttpRequest) {
            var xhr = new XMLHttpRequest();
        } else { //IE6及其以下版本浏览器
            var xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }

        //接收 - 第三步
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var status = xhr.status;
                if (status >= 200 && status < 300) {
                	_option.callback(JSON.parse(xhr.responseText));
                } else {
                	_option.error && _option.error(status);
                }
            }
        }

        //连接 和 发送 - 第二步
        if (_option.method == "GET") {
            xhr.open("GET", window._interfacePath + _url + "?" + params, true);
            xhr.send(null);
        } else if (_option.method == "POST") {
            xhr.open("POST", window._interfacePath + _url, true);
            //设置表单提交时的内容类型
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(params);
        }
    }
    //格式化参数
    function formatParams(data) {
        var arr = [];
        for (var name in data) {
            arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
        }
        arr.push(("v=" + Math.random()).replace(".",""));
        return arr.join("&");
    }


//基础类核心方法，数据交互
    function getDate(obj){
    	var _option = {
    		page:"",
    		inter:"",
    		data:{},
    		method:"GET",
    		dataType:"jsonp",
    		callback:function(){},
    		error:function(){}
    	}

    	//调用传参数覆盖原始参数
    	for(var k in obj){
    		_option[k] = obj[k];
    	}

    	//验证接口是否正确
    	var _url = _pageConfig[_option.page];
    	if(_url){
    		_url = _url[_option.inter];
    		if(_url){

    		}else{
    			console.log("参数不对")
    		}
    	}else{
    		console.log("参数不对")
    	}

    	if(_option.loading){
    		window._loading = new mask("loading");
    		window._loading.show();
    	}

    	//console.log(_option);
    	$.ajax({
    		url: window._interfacePath + _url,
    		data:_option.data,
    		method:_option.method,
    		dataType:_option.dataType,
    		cache:false,
            		success:function(data){
            			//console.log(data);
            			window._loading && window._loading.hide(); 
            			_option.callback(data);
            		},
            		complete:function(x){
            			var msg= "";
            			switch(x.status){
            				case 200:

            				break;
            				case 403:
            					msg= "服务器请求不可用，请稍后再试。";
            				break;
            				case 404:
            					msg= "抱歉，请求异常，请稍后再试。";
            				break;
            				case 500:
            					msg= "服务器内部错误，请与管理员取得联系，感谢。";
            				break;
            				case 12029:
            					msg= "您当前的网络不稳定，请稍后再试。";
            				break;
            				default:
            					msg= "网络不给力.请选择良好的网络.状态 " + x.status;
            				break;
            			}

            			if(msg){
            				window._loading && window._loading.hide(); 
    				$.alert({
    					val:msg,
    					type:"flash",
    					timer:6000
    				});

    				$.ajax({
    					url:"/app/pub/doctor/saveOperateLog",
    					data:{
    						ua:navigator.userAgent,
    						url:_url,
    						param:JSON.stringify( _option.data),
    						state:x.status
    					}
    				})
            			}
            		},
            		error:_option.error
    	});
    }


    function getDate1(obj){
    	var _option = {
    		page:"",
    		inter:"",
    		data:{},
    		method:"GET",
    		dataType:"json",
    		callback:function(){},
    		error:function(){}
    	}

    	//调用传参数覆盖原始参数
    	for(var k in obj){
    		_option[k] = obj[k];
    	}

    	//验证接口是否正确
    	var _url = _pageConfig[_option.page];
    	if(_url){
    		_url = _url[_option.inter];
    		if(_url){

    		}else{
    			console.log("参数不对")
    		}
    	}else{
    		console.log("参数不对")
    	}

    	if(_option.loading){
    		window._loading = new mask("loading");
    		window._loading.show();
    	}

    	$.ajax({
    		url: window._interfacePath + _url,
    		data:_option.data,
    		type:_option.method,
    		dataType:_option.dataType,
    		cache:false,
    		success:function(data){
    			window._loading && window._loading.hide(); 
    			_option.callback(data);
    		},
            fail:_option.error
    	});
    }




//核心方法，数据交互统一逻辑
$.getDate = getDate;
$.getDateAjax = getDate1;
$.getDateAjax1 = ajax1;

//定义全局对象
var gm = {
	doctorid:0,
	basePath:"http://admin.hxqydyl.com",
	n:function(){},
	upimgmaxwidth:960,
	isMobile:navigator.userAgent.toLocaleLowerCase().indexOf("mobile") >= -1,
	isMI:navigator.userAgent.toLocaleLowerCase().indexOf("mi") >= -1,
	isIhpone:navigator.userAgent.toLocaleLowerCase().indexOf("iphone") > -1,
	pul:{
		//页面路径返回
		returnurl:function(){
			if(!gm.isIndex)history.go(-1);
		},
		upimgbind:function(data){
			window._loading && window._loading.hide();
			gm.pul.upimg(data);
		},
		upimg:function(data){
		},
		//设置页面主题
		setTitle : function(name){
			if(!gm.isMobile){return;}
			document.title = name;
			var goto2 = 'goodm://setTitle/' +name;
			gm.pul.toUrl(goto2);
		},
		getmodels:function(callback){
			if(!gm.isMobile){return;}
			gm.pul.toUrl("goodm://openContacts");
		},
		returnIndex : function(){
			if(!gm.isMobile){return;}
			gm.pul.toUrl( "../index/page.shtml");
		},
		saveImage:function(img,callback){
			window.___saveImageSuccess = callback || function(data){
				if(data.success == "1"){
					// $.alert("保存成功");
				}else{
					$.alert(data.message);
				}
			}
			gm.pul.toUrl(  "goodm://saveImage/" + img);
		},
		sys:function(){
			if(window.location.href.indexOf("/html/")>0){
				gm.menu.setLeft("http://app.hxqydyl.com/imgs/udni_img.png","(function(){window.location.href=('"+window._webBasePath+"/html/index/page.shtml');})");
			}else{
				gm.menu.setLeft("http://app.hxqydyl.com/imgs/udni_img.png","(function(){window.location.href=('"+window._webBasePath+"/patient/index/page.shtml');})");
			}
			setTimeout(function(){gm.pul.toUrl("goodm://openScan");},200);					
		},
		openurl:function(href,returnurl){
			if(!href)return;
			var doctorUuid = gm.user.getDoctor();
			var customrUuid = gm.patient.getPatient();
			href = gm.para.set(href,"doctorUuid",doctorUuid || 0);
			href = gm.para.set(href,"customrUuid",customrUuid || 0);
			if(/Android/gi.test(navigator.userAgent)){
			    	window._loading = new mask("loading");
				window._loading.show();
				gm.menu.setLeft("http://app.hxqydyl.com/imgs/udni_img.png",'(function(){history.go(-1)})');
				setTimeout(function(){
					window.location.href=href;
				},500);
			}else{
				gm.pul.toUrl( "goodm://openUrl/" + href.replace("http://","")); 
			}
		},
		sendMsg:function(_data){
			gm.getMsg = function(data){
				
			}

			_data.callback = "gm.getMsg";

			$.getDate({
				page:"public",
				inter:"saveConsultRecord",
				method:"POST",
				dataType:"script",
				data:_data,
			});
		},
		toUrl:function(url,g){
			var href = "";
			if(!g || url.indexOf("#")>-1){
				href = url;
			}else{
				href = gm.para.set(url,"rnd",window.______version || Math.random());
			}
			window.location.href = href;
		},
		topay:function(op){
			var _op = {
				"order":"",
				"money":"0.01",
				"user":"",
				"name":"",
				"desc":"",
				"userType":2,
				"payType":0
			}

			for(var k in op){
				_op[k] = op[k];
			}

			if(!_op["order"]){
				$.alert({
					val:"请先选择商品提交"
				})
				return;
			}

			if(!_op["user"]){
				$.alert({
					val:"没有用户"
				})
				return;
			}

			gm.pul.toUrl('goodm://payment/' + JSON.stringify(_op));
		}
	},
	ad:{
		//获取焦点图
		get:function(aduid,callback){
			$.getDateAjax({
				page:"doctor",
				inter:"getPlatformPic",
				data:{adUuid:aduid || "customerLunBoTuId"},
				callback:function(data){
					if(!data){
						$.alert("服务器出错!");
					} 
					if(data.code==200){
						callback && callback(data);
					}else{
						$.alert(data.message);
					}
				}
			});
		}
	},
	menu:{
		//设置应用按钮
		setLeft : function(img,ev){
			gm.pul.toUrl('goodm://setLeftMenu/{"menuimg":"'+img+'","menuevent":"'+ev+'"}');
		},
		//设置应用按钮
		setRight:function(img,ev){
			gm.pul.toUrl('goodm://setRightMenu/{"menuimg":"'+img+'","menuevent":"'+ev+'"}');
		},
		clearRight:function(){
			if($("#______goodmoodrightmenu").length==0)	{gm.pul.toUrl('goodm://setRightMenu/{"menuimg":"http://app.hxqydyl.com/imgs/nullmenu.png","menuevent":"gm.n"}');}
		},
		//设置应用按钮列表
		setRightList:function(img,list){
			var obj = {
				"menuimg":img,
				"list":list
			}
			var go2 = 'goodm://setRightMenu/' + JSON.stringify(obj);
			console.log(go2);
			gm.pul.toUrl(go2);
		},
		//设置隐藏底部菜单
		hiddenBottomBar:function(){
			gm.pul.toUrl('goodm://hiddenBottomBar');
		},
		//设置显示底部菜单
		showBottomBar:function(){
			gm.pul.toUrl('goodm://showBottomBar');
		}
	},
	user:{
		getDoctorEmail:function(){
			$.getDate({
				page:"user",
				inter:"getDoctorEmail",
				data:{doctorUuid:gm.user.getDoctor()},
				callback:function(data){
					// window._loading.hide();
					if(!data){
						$.alert("服务器出错!");
					} 
					if(data.query.success=="1"){
						$(".yxzzc .tjob input").val(data.doctorEmail);
					}else{
						$.alert(data.query.message);
					}
				}
			});
		},
		addContentList:function(_contentUuid,_doctorEmail){
			$.getDate({
				page:"user",
				inter:"addContentList",
				data:{doctorUuid:gm.user.getDoctor(),contentUuid:_contentUuid,doctorEmail:_doctorEmail,callback:"gm.user.addContentListyx"},
				method:"POST",
				dataType:"script"
			});
		},
		addContentListyx:function(data){
			if(!data){
				$.alert("服务器出错!");
			}
			if(data.query.success=="1"){
				$.alert("已发送到邮箱，请注意查看!");
				$(".yxzzc").hide();
				$("button").hide();
			}else{
				$.alert(data.query.message);
			}
		},
		EmailContentList:function(){
			gm.user.getDoctorEmail();
			
			$(".tjob .qx").bind({
				touchend:function(){
					$(this).parents(".yxzzc").hide();
				}
			});

			$(".tjob .qr").bind({
				touchend:function(){
					var _contentUuid = gm.para.get(window.location.href,"contentUuid");
					if (!_contentUuid) {
						var _contentUuid = gm.para.get(window.location.href,"contextUuid");
					};
					var _doctorEmail = $(this).parents(".yxzzc").find(".tjob input").val();
					gm.user.addContentList(_contentUuid,_doctorEmail);
				}
			})
		},
		vcLogin:function(){
			//未登录用户跳转  患者端
			if(!gm.patient.getPatient() || gm.patient.getPatient() == "0"){
				gm.pul.toUrl("/patient/reg/index.shtml?returnurl=" + window.location.href);
			}
		},
		getDoctorDetail:function(doctorid,callback){
			$.getDate({
				page:"patient",
				inter:"getDoctorDetail",
				callback:callback,
				data:{customerUuid:gm.patient.getPatient(),doctorUuid:doctorid}
			});
		},
		loginGo:function(data){
			if(!data){
				$.alert("服务器出错!");
			}
			if(data.code==200){
				gm.user.setDoctor(data.value.doctorUuid);
				gm.user.setUserInfo(data.value);

				if (data.value.doctorName) {
					setTimeout(function(){gm.pul.toUrl( "/html/index/page.shtml");},500);
				}else{
					setTimeout(function(){gm.pul.toUrl( "/html/reg/addreginfo.shtml");},500);
				}
			}else{
				switch(data.message){
					case "对不起，医生未审核成功，无法登陆！":

					break;
					default:
						$.alert(data.message);
					break;
				}
			}
		},
		//用户配置
		setting:function(){
			gm.pul.toUrl("/html/index/index.shtml");
		},
		//用户
		tiaoz:function(){
			gm.pul.toUrl("/html/user/set.shtml");
		},
		//设置医生身份
		setDoctor:function(id){
			setTimeout(function(){
				gm.pul.toUrl('goodm://setUserInfo/{"userType":"1","user":"'+id+'"}');
			},500);
			localStorage.setItem("___doctorid",id);
		},
		//获取当前医生身份
		getDoctor:function(){
			return localStorage.getItem("___doctorid");
		},
		//判断医生用户是否登录
		isLoginDoctor:function(){
			var getdoctor=gm.user.getDoctor();
			if(!getdoctor||getdoctor=="0")
				return false;
			else
				return true;
		},
		//清除医生身份
		clearDoctor:function(){
			gm.user.setDoctor(0);
		},
		//登录
		login:function(_mobile,_password){
		    	window._loading = new mask("loading");
			window._loading.show();
			
			$.getDateAjax({
				page:"user",
				inter:"login",
				data:{mobile:_mobile,password:_password},
				method:"POST",
				callback:function(date){
					gm.user.loginGo(date)	
				}
			});
		},
		//设置医生状态
		setUserInfo:function(_data){
			gm.pul.toUrl('goodm://setUserInfo/{"userType":"1","user":"'+_data.doctorUuid+'"}');
			gm.user.setDoctor(_data.doctorUuid);
			//设置医生名称
			localStorage.setItem("_doctorName",_data.doctorName);
			//设置医生头像
			localStorage.setItem("_doctorIcon",_data.doctorIcon);
			localStorage.setItem("_visitNum",_data.visitNum);
			localStorage.setItem("_customerNum",_data.customerNum);
			localStorage.setItem("_income",_data.income);
			localStorage.setItem("_professional",_data.professional);
		},
		getUserInfo:function(uid,callback){
			if(!uid || !gm.user.getDoctor()){
				return;
			}
		    	window._loading = new mask("loading");
			window._loading.show();
			
			$.getDate({
				page:"doctor",
				inter:"getDoctorInfo",
				data:{doctorUuid:uid || gm.user.getDoctor()},
				callback:function(_data){
					window._loading.hide();
					if(!_data){
						$.alert("服务器出错!");
					} 
					if(_data.query.success=="1"){
						if(_data.noDoctor && _data.noDoctor == "1"){
							gm.user.clearDoctor();
							return;
						}
						if (_data.doctorInfo.sate == 1) {
							$(".rzimg_box .certified").attr("class","certified certified1");
						};
						_data.doctorInfo.professionalName = window["___professional"][_data.doctorInfo.professional*1];
						var getDefaultImage=_data.doctorInfo.sex=="1"?window.___defaultImage:window.___defaultImage_d_woman;
						_data.doctorInfo.doctorIcon = _data.doctorInfo.doctorIcon || getDefaultImage;
						gm.user.setUserInfo(_data.doctorInfo);
						callback && callback(_data);
					}else{
						switch(_data.query.message){
							//未登录状态
							case "无医生信息":
								gm.user.clearDoctor();
							break;
							default:
							break;
						}
					}
				}
			});
		},
		getUser_infomation:function(uid,callback){
			if(!uid || !gm.user.getDoctor()){
				return;
			}
		    window._loading = new mask("loading");
			window._loading.show();
			
			$.getDateAjax({
				page:"doctor",
				inter:"getServiceStaffInfo",
				data:{doctorUuid:uid},
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
			
		},
		
		getCustomerByCostomerUuid:function(customerUuid,callback){
			if(customerUuid==0 && gm.patient.getPatient() ==0){
				return;
			}
		    window._loading = new mask("loading");
			window._loading.show();
			$.getDate({
				page:"user",
				inter:"getCustomerByCostomerUuid",
				data:{hid:customerUuid},
				callback:function(_data){
					window._loading.hide();

					if(!_data){
						$.alert("服务器出错!");
					} 
					if(_data.query.success=="1"){
						callback && callback(_data);
					}else{
						$.alert(_data.query.message);
						switch(_data.query.message){
							//未登录状态
							case "无患者信息":
							break;
							default:
							break;
						}
					}
				}
			});
		},
		//注册第一步
		regOne:function(data){

		},
		//注册第二步
		regTwo:function(data){
			window._loading && window._loading.hide();
			if(!data){
				$.alert("服务器出错!");
			}
			if(data.query.success=="1"){
				gm.pul.toUrl( "/html/reg/addreginfo_qt.shtml?doctorUuid=" + data.doctorUuid);
			}else{
				$.alert(data.query.message);
			}
		},
		//注册第三步
		regThree:function(data){
			window._loading && window._loading.hide();
			if(!data){
				$.alert("服务器出错!");
			}
			if(data.query.success=="1"){
				gm.pul.toUrl( "/html/reg/addreginfo_license.shtml");
			}else{
				$.alert(data.query.message);
			}
		},
		//完善用户图片信息
		saveUserIconList:function(data){
			data.callback = "gm.n";
			$.getDate({
				page:"user",
				inter:"saveUserIconList",
				data:data,
				method:"POST",
				dataType:"script"
			});	
		},
		//意见反馈
		saveFavorite:function(data){
			if(!data){
				$.alert("服务器出错!");
			}
			if(data.query.success=="1"){
				$.alert({
					val : "反馈成功！",
					type : "flash",
					callback : function(){
						gm.pul.toUrl("/html/user/index.shtml");
					}
				});
				
			}else{
				$.alert(data.query.message);
			}
		},
		//获取未读消息数量
		getServiceStaffMessage:function(data){
			$.getDate({
				page:"doctor",
				inter:"getServiceStaffMessage",
				data:{doctorUuid:gm.user.getDoctor()},
				callback:function(data){
					if(!data){
						$.alert("服务器出错!");
					} 
					if(data.query.success=="1"){
						_visitpreceptNum = data.visitpreceptNum;
						_collectMeNum = data.collectMeNum;
						_onlineConsultNum = data.onlineConsultNum;
						
						$(".mypatient .patients1 b span").html("["+_visitpreceptNum+"]");
						$(".mypatient .patients2 b span").html("["+_collectMeNum+"]");
						$(".mypatient .patients3 b span").html("["+_onlineConsultNum+"]");
					}else{
						$.alert(data.query.message);
					}
				}
			});
		},
		//获取消息列表
		getcollectMeMSG:function(data){

		},
		//系统信息开关设置
		updateDoctorRight:function(conf){
			var _data = {
				doctorid:gm.user.getDoctor()
			};
			_data = $.extend(_data,conf);
			console.log(111,_data)
			//消息设置
			$.getDate({
				page:"doctor",
				inter:"updateDoctorRight",
				data:_data,
				callback:function(data){
					if(!data){
						$.alert("服务器出错!");
					}
					if(data.query.success=="1"){
						$.alert({
							val : "修改成功！",
							type : "flash"
						});
					}else{
						$.alert(data.query.message);
					}
				}
			});
		},
		//设置收藏
		addFavorite:function(_newsid,type,callback){
			var _type = type ? type : 1;
			$.getDate({
				page:"doctor",
				inter:"addFavorite",
				data:{doctorid:gm.user.getDoctor(),newsid:_newsid,favoriteType:_type},
				callback:function(data){
					if(!data){
						$.alert("服务器出错!");
					}
					if(data.query.success=="1"){
						$.alert({
							val : "收藏成功！",
							type : "flash",
							callback : function(){
								callback && callback(data.favoriteUuid);
							}
						});
					}else{
						$.alert(data.query.message);
					}
				}
			});
		},
		//取消收藏
		delFavoriteNew : function(favid,callback){
			$.getDate({
				page:"doctor",
				inter:"delFavorite",
				data:{favoriteUuid:favid},
				callback:function(data){
					if(!data){
						$.alert("服务器出错!");
					}
					if(data.query.success=="1"){
						$.alert({
							val : "取消收藏！",
							type : "flash",
							callback : callback
						});
					}else{
						$.alert(data.query.message);
					}
				}
			});
		},
		//删除收藏（唉）
		delFavorite:function(data){
			$("#my_collection .varioustype ul li .ndh").bind({
				touchend:function(){
					var _submitObj = $(this).parent();
					var _favoriteUuid = $(this).parent().parent().parent();
					$.getDate({
						page:_submitObj.attr("page"),
						inter:_submitObj.attr("inter"),
						data:{favoriteUuid:_favoriteUuid.attr("data")},
						callback:function(data){
							if(!data){
								$.alert("服务器出错!");
							}
							if(data.query.success=="1"){
								$.alert({
									val : "取消成功！",
									type : "flash"
								});
							}else{
								$.alert(data.query.message);
							}
						}
					});

				}
			});
		},
		//阅读删除收藏
		delFavorites:function(_newsid){
			$.getDate({
				page:"doctor",
				inter:"delFavorite",
				data:{favoriteUuid:_newsid},
				callback:function(data){
					if(!data){
						$.alert("服务器出错!");
					}
					if(data.query.success=="1"){
						$.alert({
							val : "取消收藏!",
							type : "flash"
						});
					}else{
						$.alert(data.query.message);
					}
				}
			});
		},
		//个人中心修改密码
		change_password:function(){

		},
		//缺失 更改手机号码
		updateServicestaffMobile:function(data){
			//没有页面
		},
		//获取随访列表
		getVisitApplyList:function(){
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

						$(data.relist).each(function(i,o){
							arr.push('<li applyUuid="'+o["applyUuid"]+'"><div class="newszu"><div class="head_portrait"><img src="'+o["image"]+'"></div>\
							<div class="nagent"><div class="duof"><h3>'+o["realName"]);
							if (o["sex"] == 1) {
								arr.push('<i class="icon-boy"></i>');
							}else{
								arr.push('<i class="icon-girl"></i>');
							}
							arr.push('</h3><span>年龄：'+o["age"]+'岁</span><b class="date">'+o["createTime"]+'</b></div>\
							<p class="comment">'+o["showContent"]+'</p></div></div></li>');
						});

						$("#follow_up_application .sfsq_box ul").html(arr.join(""));

						$("#follow_up_application .sfsq_box ul li").bind({
							touchend:function(){
								var applyUuid = $(this).attr("applyUuid");
								gm.pul.toUrl( "/html/follow_up/followed_for_details.shtml?applyUuid="+applyUuid);
							}
						})
					}else{
						$.alert(data.query.message);
					}
				}
			});
		},
		//获取随访详细信息
		getApplyDetail:function(_applyUuid){
			$.getDate({
				page:"doctor",
				inter:"getApplyDetail",
				data:{applyUuid:_applyUuid},
				callback:function(data){
					if(!data){
						$.alert("服务器出错!");
					}
					if(data.query.success=="1"){
						$("#follow_up_for_details .gercnsd i").html(data.relist[0].realName);

						$(".gercnsd p").html('<span>病情描述：'+data.relist[0].diagnose+'</span>');

						if (data.relist[0].sex == 1) {
							$("#follow_up_for_details .gercnsd b").html("男");
						}else{
							$("#follow_up_for_details .gercnsd b").html("女");
						}

						$("#follow_up_for_details .gercnsd div span").html(data.relist[0].age);

						$("#follow_up_for_details .sfsqxq_box ul").attr("customerUuid",data.relist[0].customerUuid);
					}else{
						$.alert(data.query.message);
					}
				}
			});
		},
		//获取所有医生的随访列表方案
		getAllVisitPreceptList:function(data){
			var _k = '<dt class="_xzfa"><a href="increase_plan.shtml"></a><i class="logo-xzfa"></i>新增方案\
			  <i class="icon-thearrowx"></i></dt><dt class="_wdfa">我的方案</dt>';

			$.getDate({
				page:"doctor",
				inter:"getAllVisitPreceptList",
				data:{doctorUuid:gm.user.getDoctor()},
				callback:function(data){
					if(!data){
						$.alert("服务器出错!");
					}
					if(data.query.success=="1"){
						var arr = [];
						var err = [];

						$(data.relist).each(function(i,o){
							arr.push('<dd class="dsasw" visitUuid="'+o["visitUuid"]+'"><div class="kua"><div class="newszu"><p>'+o["preceptName"]+'</p>\
								<i class="sdsv">已关联<span>'+o["num"]+'</span>人</i></div></div><div class="kua_scnut"></div>\
								<div class="ndh"><i class="icon-mycoltrash"></i></div></dd>');
							err.push('<li visitUuid="'+o["visitUuid"]+'"><i class="radio"></i><span>'+o["preceptName"]+'</span></li>');
						});

						$("#follow_up_plan .sffa_box dl").html(_k + arr.join(""));
						$("#selective_up_progra .xzfz_box ul").html(err.join(""));

						$("#follow_up_plan .sffa_box dd").lrTouchMove();
						// $("#selective_up_progra .xzfz_box ul").lrTouchMove();
						$(".xzfz_box li").bind({
							touchend:function(){
								$(".xzfz_box li").removeClass("csfsd");
								$(this).addClass("csfsd");
							}
						});

					}else{
						$.alert(data.query.message);
					}
				}
			});
		},
		//医生同意并关联患者
		addVisitRecord:function(_customerUuid,_applyUuid){
			$(".hzfz_box dl").on("touchend","dd .ndh",function(){
				var _submitObj = $(this).parent();
				var _id = $(this).parent().attr("visitUuid");
			});
			var _medicalRecordUuid =  gm.para.get(window.location.href,"medicalRecordUuid");
			var applyUuid = gm.para.get(window.location.href,"applyUuid");
			var customerUuid = gm.para.get(window.location.href,"customerUuid");

			$("#selective_up_progra .xzfz_but").on("touchend","button",function(){
				var _visitUuid = $(".xzfz_box li.csfsd").attr("visitUuid");
				if (!_visitUuid) {
					$.alert("请选择随访方案!");
				}else{
					if(applyUuid){
						$.getDate({
							page:"doctor",
							inter:"addVisitRecord",
							data:{visitPreceptUuid:_visitUuid,visitUuid:applyUuid},
							callback:function(data){
								if(!data){
									$.alert("服务器出错!");
								}
								if(data.query.success=="1"){
									$.alert({
										val:"关联成功",
										timer:1500,
										type:"flash",
										callback:function(){
											gm.pul.toUrl("/html/follow_up/followed_up_for.shtml");
										}
									})	
								}else{
									$.alert(data.query.message);
								}
							}
						});
					}else{
						$.getDate({
							page:"doctor",
							inter:"updateVisitRecord",
							data:{visitPreceptUuid:_visitUuid,customerUuid:customerUuid,doctorUuid:gm.user.getDoctor()},
							callback:function(data){
								if(!data){
									$.alert("服务器出错!");
								}
								if(data.query.success=="1"){
									gm.pul.toUrl( "/html/follow_up/index.shtml");
								}else{
									$.alert(data.query.message);
								}
							}
						});
					}
					
				}
			});
		},
		//医生拒绝关联患者
		refuseVivistApply:function(_applyUuid){
			$("#follow_up_for_details .refuse_details textarea").diySetText();
			$("#follow_up_for_details .refuse_details .btn-zyradius").bind({
				touchend:function(){
					var _submitObj = $(this).parent();
					var _customerUuid = $("#follow_up_for_details .sfsqxq_box ul").attr("customerUuid");
					var _refuseReason = $("#follow_up_for_details .refuse_details textarea").val();

					$.getDate({
						page:_submitObj.attr("page"),
						inter:_submitObj.attr("inter"),
						data:{customerUuid:_customerUuid,refuseReason:_refuseReason,applyUuid:_applyUuid},
						callback:function(data){
							if(!data){
								$.alert("服务器出错!");
							}
							if(data.query.success=="1"){
								$.alert("拒绝成功！");
							}else{
								$.alert(data.query.message);
							}
						}
					});
					$("#follow_up_for_details .refuse_details").hide();
				}
			});
		},
		//通过手机号获得患者信息
		getCustomerByMobile:function(mobile,callback){
			$.getDate({
				page:"user",
				inter:"getCustomerByMobile",
				data:{mobile:mobile},
				callback:callback
			})
		},
		//添加患者,并返回创建的病历,及患者信息 有问题 404
		addCustomer:function(data){
			$("#k").getDepartment();
			
			$("#patient_information .hzxx_but .btn-zyradius").bind({
				touchend:function(){
					var _submitObj = $(this).parent();

					var _name = $("#patient_information .hzxx_box .name input").val();
					var _sex = $("#patient_information .hzxx_box .sex select").val();
					var _birthday = $("#patient_information .hzxx_box .birthday option:selected").text();
					var _IDNum = $("#patient_information .hzxx_box .IDNum input").val();
					var _mobile = $("#patient_information .hzxx_box .mobile input").val();
					var _email = $("#patient_information .hzxx_box .email input").val();
					var _industry = $("#patient_information .hzxx_box .industry input").val();
					var _address = $("#patient_information .hzxx_box .address input").val();
					var _introduceName = $("#patient_information .hzxx_box .introduceName input").val();
					var _alternativeName = $("#patient_information .hzxx_box .alternativeName input").val();
					var _alternativePhone = $("#patient_information .hzxx_box .alternativePhone input").val();
					var _seeDoctorTime = $("#patient_information .hzxx_box .seeDoctorTime input").val();
					var _divisionUuid = $("#patient_information .hzxx_box .divisionUuid input").val();
					var _caseCategoryType = $("#patient_information .hzxx_box .caseCategoryType option:selected").val();
					var _medicalNum = $("#patient_information .hzxx_box .medicalNum input").val();

					if(!_mobile){
						$.alert("请填写手机号.");
						return;
					}

					if(!_name){
						$.alert("请填写姓名.");
						return;
					}

					if(!_sex){
						$.alert("请选择性别.");
						return;
					}

					if(!_birthday){
						$.alert("请填写生日.");
						return;
					}

					if (_name && _IDNum && _mobile && _email && _industry && _address && _introduceName && _alternativeName && _birthday && _sex && _alternativePhone && _seeDoctorTime && _divisionUuid && _caseCategoryType && _medicalNum) {
						$.getDate({
							page:_submitObj.attr("page"),
							inter:_submitObj.attr("inter"),
							data:{
								doctorUuid:gm.user.getDoctor(),
								name:_name,sex:_sex,
								birthday:_birthday,
								IDNum:_IDNum,
								mobile:_mobile,
								email:_email,
								industry:_industry,
								address:_address,
								introduceName:_introduceName,
								alternativeName:_alternativeName,
								alternativePhone:_alternativePhone,
								seeDoctorTime:_seeDoctorTime,
								divisionUuid:_divisionUuid,
								caseCategoryType:_caseCategoryType,
								medicalNum:_medicalNum,
								callback:"gm.user.addCustomerCallback"},
							method:"POST",
							dataType:"script"
						});
					}else{
						$.alert("请填写完整信息！");
					}
				}
			});
		},
		addCustomerCallback:function(data){
			if(!data){
				$.alert("服务器出错!");
			}
			if(data.query.success=="1"){

				localStorage.setItem("addMainsuit_customerName",data.customerName);
				localStorage.setItem("addMainsuit_sex",data.sex);
				localStorage.setItem("addMainsuit_age",data.age);
				localStorage.setItem("addMainsuit_seeDoctorTime",data.seeDoctorTime);
				localStorage.setItem("addMainsuit_medicalRecordUuid",data.medicalRecordUuid);
				localStorage.setItem("addMainsuit_customerUuid",data.customerUuid);

				gm.pul.toUrl( "/html/follow_up/add_patients.shtml");
			}else{
				$.alert(data.query.message);
			}
		},
		//添加主诉
		addMainsuit:function(data){
			$("#patient_description .xzfz_but .btn-zyradius").bind({
				touchend:function(){
					var _submitObj = $(this).parent();
					var _mainsuit = $("#patient_description .hzxx_box .vebng textarea").val();

					$.getDate({
						page:_submitObj.attr("page"),
						inter:_submitObj.attr("inter"),
						data:{mainsuit:_mainsuit,medicalRecordUuid:localStorage.getItem("addMainsuit_medicalRecordUuid")},
						callback:function(data){
							if(!data){
								$.alert("服务器出错!");
							}
							if(data.query.success=="1"){

								$.alert("操作成功!");
								gm.pul.toUrl( "/html/follow_up/add_patients.shtml");
							}else{
								$.alert(data.query.message);
							}
						}
					});
				}
			});
		},
		//添加基本检查
		addBasicCheck:function(data,callback){
			gm.fonc = callback;
			$.getDate({
				page:"user",
				inter:"addBasicCheck",
				data:{callback:"gm.fonc",jsonString:JSON.stringify(data)},
				method:"POST",
				dataType:"script"
			});
		},
		//添加诊断
		addDiagnosis:function(data,callback){
			gm.func = callback;
			data.callback = "gm.func";
			$.getDate({
				page:"user",
				inter:"addDiagnosis",
				data:data,
				method:"POST",
				dataType:"script"
			});
		},
		//修改患者分组
		updateCustomerGroup:function(data){
			$("#select_group .xzfz_box .fnonne li").bind({
				touchend:function(){
					var _submitObj = $(this).parent();
					var _gid = $(this).attr("groupid");

					$.getDate({
						page:_submitObj.attr("page"),
						inter:_submitObj.attr("inter"),
						data:{gid:_gid,hid:localStorage.getItem("addMainsuit_customerUuid")},
						callback:function(data){
							if(!data){
								$.alert("服务器出错!");
							}
							if(data.query.success=="1"){
								$.alert("操作成功!");
								gm.pul.toUrl( "/html/follow_up/add_patients.shtml");
							}else{
								$.alert(data.query.message);
							}
						}
					});
				}
			});
		},
		bindCaseGroup:function(data){
			if(!data){
				$.alert("服务器出错!");
			}
			if(data.query.success=="1"){
				$.alert({
					"val" : "新增分组成功",
					"type" : "flash",
					"callback" : function(){
						window.location.href = window.location.href;
					}
				})
				// var _groupName = $("#patient_grouping .tcsjob input").val();
				// $("#patient_grouping .tcsjob").hide();
				// $("#patient_grouping .hzfz_box dl").append('<dd>'+_groupName+'<div class="ndh scnut"><i class="icon-mycoltrash"></i></div></dd>');
			}else{
				$.alert(data.query.message);
			}
		},
		//添加患者分组信息
		addCaseGroup:function(){
			var _groupName = $(".tcsjob input").val();
			if(!_groupName){
				$.alert({
					"val" : "请填写患者分组信息",
					"callback" : function(){
						window.__mask && __mask.hide();
					}
				});
				return false;
			}
			$.getDate({
				page:"user",
				inter:"addCaseGroup",
				data:{doctorUuid:gm.user.getDoctor(),groupName:_groupName,callback:"gm.user.bindCaseGroup"},
				method:"POST",
				dataType:"script"
			});
			//gm.pul.toUrl( window.location.href);
		},
		//患者分组列表获取
		getCaseGroupByDoctorId:function(data){
			$.getDate({
				page:"user",
				inter:"getCaseGroupByDoctorId",
				data:{doctorUuid:gm.user.getDoctor()},
				callback:function(data){
					if(!data){
						$.alert("服务器出错!");
					}
					if(data.query.success=="1"){
						var arr = [];
						var qrr = [];
						var err = [];

						$(data.relist).each(function(i,o){
							arr.push('<dd groupId="'+o["groupId"]+'">'+o["groupName"]+'<div class="ndh"><i class="icon-mycoltrash"></i></div></dd>');
							qrr.push('<li groupId="'+o["groupId"]+'"><i class="radio"></i><span>'+o["groupName"]+'</span></li>');
							err.push('<dl><dt groupId="'+o["groupId"]+'"><i class="logo-triangle"></i><b>'+o["groupName"]+'<span></span></b></dt></dl>');
						});

						$("#patient_grouping .hzfz_box dt").after(arr.join(""));
						$("#select_group .xzfz_box ul").html(qrr.join(""));
						$("#followed .sf_box #content").append('<dl><dt><i class="logo-triangle"></i><b>默认分组</b><span></span></dt></dl>');
						$("#followed .sf_box #content").append(err.join(""));

						$("#patient_grouping dd").lrTouchMove();
						// $("#select_group li").lrTouchMove();
						$("#followed dd").lrTouchMove();

						$("#patient_grouping .hzfz_box dd").on("touchend",".ndh",function(){
							var _gid = $(this).parent().attr("groupid");
							var _gname = $(this).parent().text();

							// var _hzi = $()
							$.getDate({
								page:"user",
								inter:"getCustomerListByDoctorUuidAndGroupId",
								data:{doctorUuid:gm.user.getDoctor(),groupId:_gid},
								callback:function(data){
									if(!data){
										$.alert("服务器出错!");
									}
									if(data.query.success=="1"){
										var arr = [];
										$(data.relist).each(function(i,o){
											arr[i] = o.customerUuid;
										});
										if (arr.length > 0) {
											$.confirm(_gname + "分组下存在随访患者，删除分组后，该分组下的随访患者将移至默认分组，确认删除"+_gname+"分组吗？",function(){
												$("#followed .sf_box #content dl dt").after(arr.join(""));
												gm.user.deleteGroup(_gid);
											});
										}else{
											$.confirm("确认删除吗？",function(){
												$("#followed .sf_box #content dl dt").after(arr.join(""));
												gm.user.deleteGroup(_gid);
											});
										}
									}else{
										$.alert(data.query.message);
									}
								}
							});

							
							
						});
					}else{
						$.alert(data.query.message);
					}
				}
			});
		},

		//删除患者分组管理
		deleteGroup:function(_gid){
			$.getDate({
				page:"user",
				inter:"deleteCaseGroup",
				data:{gid:_gid,callback:"gm.user.bindDelete"},
				method:"POST",
				dataType:"script"
			});
			// window.location.href = window.location.href;
		},
		bindDelete : function(data){
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
						window.location.href = window.location.href;
					}
				});
			};
		},
		
		//删除患者分组
		deleteCaseGroup:function(_gid){
			$.getDate({
				page:"user",
				inter:"deleteCaseGroup",
				data:{gid:_gid,callback:"gm.user.bindDeleteCaseGroup"},
				method:"POST",
				dataType:"script"
			});
			// window.location.href = window.location.href;
		},
		bindDeleteCaseGroup : function(data){
			if(!data){
				$.alert("服务器出错!");
			}
			if(data.query.success=="1"){
				window.location.href = window.location.href;
			}else{
				$.alert(data.query.message);
			}
		},
		
		//根据图片库分类id获取图片list
		getMedicalImg:function(data){
			$.getDate({
				page:"user",
				inter:"getMedicalImg",
				data:{categoryUuid:1},
				callback:function(data){
					if(!data){
						$.alert("服务器出错!");
					}
					if(data.query.success=="1"){
						var arr = [];

						$(data.relist).each(function(i,o){
							arr.push('<img src="'+o["img"]+'" imgUuid="'+o["imgUuid"]+'">');
						});

						$("#medical_img .img_box").html(arr.join(""));

					}else{
						$.alert(data.query.message);
					}
				}
			});
		},
		//获取患教分类
		getCustomerTeachType:function(callback){
			$.getDate({
				page:"user",
				inter:"getCustomerTeachType",
				data:{},
				callback:callback
			});
		},
		//获根据患教id获取患教文章信息
		getCustomerTeach:function(_contentUuid,callback){
			gm.content.getContent(_contentUuid,callback);
		},
		//医生推荐文章给患者 有问题 没有页面
		createDocCusCon:function(_contentUuid,_customerUuids){
			$.getDate({
				page:"user",
				inter:"createDocCusCon",
				data:{contentUuid:_contentUuid,doctorUuid:gm.user.getDoctor(),customerUuids:_customerUuids.join(","),callback:"gm.user.createDocCusCons"},
				method:"POST",
				dataType:"script"
			});
		},
		createDocCusCons:function(data){
			if(!data){
				$.alert("服务器出错!");
			}
			if(data.query.success=="1"){
				$.alert("发送成功！");
			}else{
				$.alert(data.query.message);
			}
		},
		//通过医生id和分组id获取患者列表 有问题 缺少患者ID
		getCustomerListByDoctorUuidAndGroupId:function(data){
			$("#followed .sf_box #content").on("touchend","dt",function(){

				var state = $(this).parent().hasClass("sydns");
				        if(state){
				            $(this).parent().removeClass("sydns");
				        }else{
				        	// $(".content dl").removeClass("sydns");
				            $(this).parent().addClass("sydns");
				        }

				var _submitObj = $(this).parent().parent();
				var _groupId = $(this).attr("groupId") || "";
				var _ = $(this).parent();
				var _cja = '<dt groupId="'+_groupId+'">'+$(this).html()+'</dt>';

				$.getDate({
					page:_submitObj.attr("page"),
					inter:_submitObj.attr("inter"),
					data:{doctorUuid:gm.user.getDoctor(),groupId:_groupId},
					callback:function(data){
						if(!data){
							$.alert("服务器出错!");
						}
						if(data.query.success=="1"){
							var arr = [];

							$(data.relist).each(function(i,o){
								arr.push('<dd><div class="newszu" customerUuid="'+o["customerUuid"]+'"><div class="head_portrait"><img src="'+(o["customerImg"]||(o.sex == "1" ? window.___defaultImage_p_man : window.___defaultImage_p_woman))+'"></div>\
								<div class="nagent"><div class="duof"><h3>'+o["customerName"]);
								if (o["sex"] == 1) {
									arr.push('<i class="icon-boy"></i>');
								}else{
									arr.push('<i class="icon-girl"></i>');
								}
								arr.push('</h3><span>年龄：'+o["age"]+'岁</span></div>\
									<p class="comment">'+o["customerMessage"]+'</p></div></div><div class="kua_scnut" page="user" inter="deleteCustomerByCostomerUuidAndGid">\
									<div class="ndh ndh2"><i class="icon-mycoltrash"></i></div>\
									<div class="ndh movegroup"><i class="icon-grxxn"></i></div>\
									</div></dd>');
							});

							_.html(_cja + arr.join(""));
							_.find("dd .newszu").lrTouchMove().ontouch(function(){
								var _o = $(this).attr("customerUuid");
								gm.pul.toUrl( "/html/follow_up/patient_details.shtml?customerUuid="+_o);
							});
							$("#followed .sf_box dd .ndh2").ontouch(function(){
								var _gid = $(this).closest("dt").attr("groupId") || 0,
								_customerUuid = $(this).closest("dd").find("div").attr("customerUuid");

								$.confirm("确定要删除吗？",function(){
									gm.user.deleteCustomerByCostomerUuidAndGid(_gid,_customerUuid);
								});
							},true);
							$("#followed .sf_box dd .movegroup").ontouch(function(){
								var _customerUuid = $(this).closest("dd").find(".newszu").attr("customerUuid");
								window.location.href = "/html/follow_up/mobile_packet.shtml?customerUuid=" + _customerUuid + "&returnurl=" + window.location.href;
							},true);
						}else{
							$.alert(data.query.message);
						}
					}
				});
			});
		},
		//通过医生id获取患者列表
		getCustomerListByDoctorUuid:function(data){
			$.getDate({
				page:"user",
				inter:"getCustomerListByDoctorUuid",
				data:{doctorUuid:gm.user.getDoctor()},
				callback:function(data){
					if(!data){
						$.alert("服务器出错!");
					}
					if(data.query.success=="1"){
						var arr =[];
						$(data.relist).each(function(i,o){
							arr.push('<li customerUuid="'+o["customerUuid"]+'">\
							<div class="select-box"></div>\
							<div class="head_portrait"><img src="'+(o["customerImg"]||(o.sex == "1" ? window.___defaultImage_p_man : window.___defaultImage_p_woman))+'"></div>\
							<div class="nagent">\
								<div class="duof">\
									<h3>'+o["customerName"]);
							if (o["sex"] == 1) {
								arr.push('<i class="icon-boy"></i></h3>')
							}else{
								arr.push('<i class="icon-girl"></i></h3>')
							}
								arr.push('<span>年龄：'+o["age"]+'岁</span>\
									<b class="date">'+(o["time"] && o["time"].split(" ")[0]||"")+'</b>\
								</div>\
								<p class="comment">'+o["customerMessage"]+'</p>\
							</div>\
						</li>');
						})
						$(".xzhz_box ul").html(arr.join(""));

						$(".newszu li").bind({
							touchend:function(){
					    		$(this).find(".select-box").toggleClass("_mz");
							}
						});
					}else{
						$.alert(data.query.message);
					}
				}
			});
		},
		//获取患者信息
		getCustomerByCostomerUuid:function(_hid,callback){
			$.getDate({
				page:"user",
				inter:"getCustomerByCostomerUuid",
				data:{hid:_hid},
				callback:callback
			})
		},
		bindDeleteCustomerByCostomerUuidAndGid:function(data){
			if(!data){
				$.alert("服务器出错!");
			}
			if(data.query.success=="1"){
				$.alert({
					"val" : "操作成功!",
					"type" : "flash",
					"callback" : function(){
						if(__deleteCustomerByCostomerUuidAndGid_hid)
							$(".newszu[customeruuid=" + __deleteCustomerByCostomerUuidAndGid_hid + "]").fadeOut();
						// window.location.href = window.location.href;
					}
				});
			}else{
				$.alert(data.query.message);
			}
		},
		//删除患者信息
		deleteCustomerByCostomerUuidAndGid:function(_gid,_customerUuid){

			window.__deleteCustomerByCostomerUuidAndGid_hid = _customerUuid;console.log(__deleteCustomerByCostomerUuidAndGid_hid);return false;
			
			$.getDate({
				page:"user",
				inter:"deleteCustomerByCostomerUuidAndGid",
				method:"POST",
				data:{doctorUuid:gm.user.getDoctor(),gid:_gid,customerUuid:_customerUuid,callback:"gm.user.bindDeleteCustomerByCostomerUuidAndGid"},
				dataType:"script"
			});

		},
		//获取病历详细信息 有问题 还没测试
		getMedicalRecordByMedicalRecordUuid:function(_medicalRecordUuid,callback){
			$.getDate({
				page:"user",
				inter:"getMedicalRecordByMedicalRecordUuid",
				data:{medicalRecordUuid:_medicalRecordUuid},
				callback:callback
			});
		},
		//获取积分
		getNowIntegral:function(data){

		},
		//获取积分明细
		getNowIntegralDetail:function(data){

		},
		//获取资讯列表
		getAllContentList:function(_contentCategoryUuid,callback){
			$.getDate({
				page:"content",
				inter:"getAllContentList",
				data:{doctorUuid:gm.user.getDoctor(),contentCategoryUuid:_contentCategoryUuid},
				callback:function(data){
					callback && callback(data);
				}
			});
		},
		//获取资讯搜索列表
		getSearchContentList:function(data){
			// $.getDate({
			// 	page:"content",
			// 	inter:"getSearchContentList",
			// 	data:{doctorUuid:gm.user.getDoctor(),contentCategoryUuid:_contentCategoryUuid,contentName:_contentName,illnessId:_illnessId,symptomId:_symptomId,entity:_entity,country:_country,callback:"jQuery210036572362342849374_1450349442622"},
			// 	method:"POST",
			// 	dataType:"JSON",
			// 	callback:function(data){
					if(!data){
						$.alert("服务器出错!");
					}
					if(data.query.success=="1"){
						var arr = [];

						$(data.relist).each(function(i,o){
							arr.push('<li contentUuid="'+o["contentUuid"]+'" favid="'+ o["favoriteUuid"] +'"><div class="asbg"><div class="scvideo"><a href="informationfordetails.shtml"><img src="'+o["imgUrl"]+'"></a></div><div class="videomz">\
							<h2><a href="informationfordetails.shtml">'+o["contentTitle"]+'</a></h2>\
							<p>'+o["creatime"]+'</p></div></div><div class="redmyu">');

							if (o["storeType"] == 0) {
								arr.push('<i class="icon-greystars"></i><i class="icon-mycollection"></i></div><div class="clear"></div></li>');
							}else{
								arr.push('<i class="icon-redstars"></i><i class="icon-mycollection"></i></div><div class="clear"></div></li>');
							}
						});
						$(".gsid_1 ul").html(arr.join(""));
						$(".redmyu").collectnews();
					}else{
						$.alert(data.query.message);
					}
			// 	}
			// });
		},
		//获取讲堂列表信息
		getVideosByName:function(_name){
			$.getDate({
				page:"doctor",
				inter:"getVideosByName",
				data:{name:_name},
				method:"POST",
				dataType:"JSON",
				callback:function(data){
					if(!data){
						$.alert("服务器出错!");
					}
					if(data.query.success=="1"){
						var arr = [];
						$(data.relist).each(function(i,o){
							arr.push('<li uuid="'+o["uuid"]+'"><a href="/html/lecture/playing.shtml?vidoUuid='+o["uuid"]+'"><div class="live">\
							<img src="'+o["img"]+'"></div><div class="text">\
							<p>'+o["userName"]+'-'+o["title"]+'</p><p class="time">'+o["createTime"]+'</p>\
							</div></a><div class="ics"><i class="icon-care"><p class="care">'+o["collectNum"]+'</p></i>\
							<i class="icon-mycollection"></i></div></li>');

							// if (o["storeType"] == 0) {
							// 	arr.push('<i class="icon-greystars"></i><i class="icon-mycollection"></i></div><div class="clear"></div></li>');
							// }else{
							// 	arr.push('<i class="icon-redstars"></i><i class="icon-mycollection"></i></div><div class="clear"></div></li>');
							// }
						});
						$(".alllive ul").html(arr.join(""));
					}else{
						$.alert(data.query.message);
					} 
				}
			});
		}
	},
	clinic:{
		sheizhi3:function(){
			gm.pul.toUrl( "/html/clinic/sheizhi4.shtml");
		}
	},
	patient:{
		//设置患者身份
		setPatient:function(id){
			setTimeout(function(){
				gm.pul.toUrl('goodm://setUserInfo/{"userType":"2","user":"'+id+'"}');
			},100);
			localStorage.setItem("___Patient",id);
		},
		//获取当前患者身份
		getPatient:function(){
			return localStorage.getItem("___Patient");
		},
		clearPatient:function(){
			gm.patient.setPatient(0);
		},
		//未登录用户跳转  患者端
		isLogin:function(){
			if(!gm.patient.getPatient() || gm.patient.getPatient() == "0"){
				return flase;
			}
			return true;
		}
	},
	img:{},
	my_task:{
		tanchu:function(){
			/*$("#my_task .ftollcas").toggleClass("scdkiw");
			var _contentUuid = gm.para.get(window.location.href,"contentUuid");
			
			if (_contentUuid) {
//				gm.user.addFavorite(_contentUuid);
			};*/
		},
		quick_reply:function(){
			
		}
	},
	follow_up:{
		d_cfnd:function(){
			$("#edit_scheme .d_cfnd").hide();
			$("#edit_scheme .bc_but").show();
			$(this).hide();
		}
	},
	content:{

		//根据分类id获取文章列表
		getContentList:function(_contentCategoryUuid,callback){
			$.getDate({
				page:"content",
				inter:"getContentList",
				data:{contentCategoryUuid:_contentCategoryUuid},
				callback:function(data){
					callback && callback(data);
				}
			});
		},
		//根据文章id获取文章信息
		getContent:function(_contentUuid,callback){
			$.getDate({
				page:"content",
				inter:"getContent",
				data:{contentUuid:_contentUuid,doctorUuid:gm.user.getDoctor()},
				callback:callback
			});
		},
		getContentScale:function(_contentUuid,callback){
			
			$.getDate({
				page:"content",
				inter:"getAllContentList",
				data:{contentCategoryUuid:_contentUuid,doctorUuid:gm.user.getDoctor()},
				callback:function(data){
					callback && callback(data);
				}
			});
		},
		//两端共用，获取用户电话号码
		getFeedback:function(state,uuid,callback){
			if(!uuid){
				return;
			}
		    window._loading = new mask("loading");
			window._loading.show();
			
			$.getDateAjax({
				page:"content",
				inter:"getFeedback",
				data:{"uuid":uuid,"type":state},
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
	},
	para :{
		set : function(url,para,value){
			var paras = para + "=" + value;
			var v = gm.para.get(url,para);
			var _url = "";
			if(v == ""){
				if(url.substring(url.length-1) == "?"){
					_url = url + paras;
				}else{
					_url = url + (url.indexOf("?") == -1 ? "?" : "&") + paras;
				}
			}else{
				_url = url.replace("&"+para+"="+v,"&"+paras);
				_url = _url.replace("?"+para+"="+v,"?"+paras);
			}
			return _url;
		},
		get : function(url,para){
			var value = "",_p = para + "=";
			var url = url.split("#!")[0] || "";
			if(url.indexOf("&"+_p) > -1){
				value = url.split("&"+_p)[1].split("&")[0];
			}	
			if(url.indexOf("?"+_p) > -1){
				value = url.split("?"+_p)[1].split("&")[0];
			}
			if(url.indexOf("#">-1)){
				value = value.split("#")[0];
			}
			return value;
		},
		remove : function(url,para){
			if(!para){return url;}
			var v = gm.para.get(url,para);
			if(url.indexOf('&' + para + '=' + v)>-1){
				url = url.replace('&' + para + '=' + v,'');
			}else if(url.indexOf('?' + para + '=' + v + '&')>-1){
				url = url.replace(para + '=' + v + '&','');
			}else{
				url = url.replace('?' + para + '=' + v,'');
			}
			return url;
		}
	},
	replace : function(temp, data, regexp){
		if(!(Object.prototype.toString.call(data) === "[object Array]")) data = [data];
		var ret = [];
		for(var i=0,j=data.length;i<j;i++){
			ret.push(replaceAction(data[i]));
		}
		return ret.join("");
		function replaceAction(object){
			return temp.replace(regexp || (/\\?\{([^}]+)\}/g), function(match, name){
				if (match.charAt(0) == '\\') return match.slice(1);
				return (object[name] != undefined) ? object[name] : '';
			});
		}
	},
	share:function(op,callback){
		window.___shareOver = function(data){
			//alert(data.success);
			if(data.success == "1"){
				callback && callback();
				$.alert({
					val:"分享成功",
					type:"flash",
					callback:callback || function(){}
				});
			}else{
				$.alert({
					val:"分享取消",
					type:"flash",
					timer:1500
				});
			}
		}
		var _op = {
			"title":"好心情",
			"desc":"",
			img:"http://app.hxqydyl.com/imgs/yishengduan.png",
			link:"http://101.201.150.149:8080/html/index/index.shtml"
		}
		
		op.img = op.img || _op.img;
		
		//某部分图片造成异常
		//op.img = op.img.replace("3001","");

		for(var k in op){
			_op[k] = op[k];
		}
		
		var go2 = 'goodm://share/' + JSON.stringify(_op);
		// var go2 = 'goodm://share/{"title":"Cell%EF%BC%9A%E5%A4%A7%E8%84%91%E4%B8%AD%E2%80%9C%E5%AD%A4%E7%8B%AC%E2%80%9D%E7%9A%84%E7%A5%9E%E7%BB%8F%E7%BB%86%E8%83%9E","desc":"Cell%EF%BC%9A%E5%A4%A7%E8%84%91%E4%B8%AD%E2%80%9C%E5%AD%A4%E7%8B%AC%E2%80%9D%E7%9A%84%E7%A5%9E%E7%BB%8F%E7%BB%86%E8%83%9E","img":"http://101.201.150.49:7500/dev1/0/000/002/0000002751.fid","link":"http://admin.hxqydyl.com/html/thedoctorinformation/informationfordetails.shtml?contentUuid=eae89cb620a74495b05ed6646682d928"}';
		gm.pul.toUrl(go2);
	}
};

//触屏点击（无延迟）
function ontouch(){
	if(!arguments && !this.tagName)
		return false;

	var _x,_y,_s,
		args = arguments,
		_t = {
			s : function(e){
				var t = getTouch(e);
				_x = t.clientX;
				_y = t.clientY;
				_s = true;
			},
			m : function(e){
				if(_s){
					var t = getTouch(e);
					if(_x != t.clientX || _y != t.clientY){
						_s = false;
					}
				}
			},
			e : function(e){
				if(_s){
					args[0] && args[0].constructor == Function && args[0].call(this,e);
					//e.preventDefault ? e.preventDefault() : e.returnValue = false;
					//e.stopPropagation();
				}
			}
		};

	function getTouch(e){
		return e.touches && e.touches[0] || event;
	};

	this.addEventListener("touchstart",_t.s,false);
	this.addEventListener("touchmove",_t.m,false);
	this.addEventListener("touchend",_t.e,false);
};

//触屏滑动切换：支持水平、垂直方向滑动，通过回调方法反馈业务结果
function touchTab(op){
	//切换 方法
	var status,start,client,dateOld,
		pct = op.pct || 20,
		touchClient = op.type ? "clientX" : "clientY",
		maxLength = op.maxLength || $(window).height(),
		getTouch = function(event){
			return event.originalEvent.targetTouches && event.originalEvent.targetTouches[0];
		},
		touchMoev = {
			//开始
			start : function (event){
				//重置
				client = 0;
				//滑动激活
				status = true;
				//记录开始时间
				dateOld = new Date();
				//记录初始坐标
				start = getTouch(event)[touchClient];
				op.startCallback && op.startCallback.call(op.obj,event);
			},
			//移动
			move : function (event){
				var _y = getTouch(event)[touchClient] - start;
				if(status){
					client = parseInt(_y/maxLength * 100);
					op.moveCallback && op.moveCallback.call(op.obj,_y,client);
					console.log("滑动进度：" + client + "%");
				}
				event.stopPropagation();
				event.preventDefault();
			},
			//结束
			end : function (event){
				var _re = 0,
					_client = client > 0 ? client : -(client),
					nd = new Date() - dateOld;
				//滑动激活
				if(status){
					if(_client >= pct || (nd < 300 && _client >= pct/2)){
						if(client > 0){
							_re = 1;
						}else{
							_re = 0;
						}
					}
					else{
						_re = 2;
						console.log("放弃切换");
					}
					op.endCallback && op.endCallback.call(op.obj,_re);
					status = false;
				}
				// event.stopPropagation();
				// event.preventDefault();
			}
		};

	op.obj.bind({
		"touchstart" : touchMoev.start,
		"touchmove" : touchMoev.move,
		"touchend" : touchMoev.end
	});
};

//翻页：支持上下左右四个方向，使用css3处理动画过渡
function pageCore(op){
	//定义基础参数配置
	var that = this,
		//场景预置
		scene = {
			"x" : 0,
			"y" : 0,
			"now" : {}
		},
		sceneArr = [],
		sceneIndex = 0;

	for(var k in op){
		if(op[k]){
			sceneArr.push(k);
			scene[k] = op[k];
		}
	}

	this.getSceneName = function(){
		return scene.now.name || "";
	};

	this.next = function(type,callback){
		var _index = sceneIndex + 1;
		if(_index < sceneArr.length){
			this.tabScene(sceneArr[_index],type,callback);
		}
	};

	this.prev = function(type,callback){
		var _index = sceneIndex - 1;
		if(_index >= 0){
			this.tabScene(sceneArr[_index],type,callback);
		}
	};

	this.replay = function(type,callback){
		this.tabScene(sceneArr[0],type,callback);
	};

	this.goto1 = function(index,type,callback){
		this.tabScene(sceneArr[index],type,callback);
	};

	this.length = function(){
		return sceneArr.length;
	};

	this.index = function(){
		return sceneIndex;
	};

	//切换场景
	this.tabScene = function(name,type,callback){
		if(name && typeof name === "string" && name in scene){

			var tab = {
				"top" : ["top","↑"],
				"bottom" : ["bottom","↓"],
				"left" : ["left","→"],
				"right" : ["right","←"]
			};

			TabSceneAn(name,tab[type][0],callback);

			for(var i = 0; i < sceneArr.length; i++){
				if(sceneArr[i] == name){
					sceneIndex = i;
				}
			}

			console.log("切换场景：" + scene[name].name,tab[type][1]);

		}
	};

	//切换场景过程动画
	function TabSceneAn(name,type,callback){
		var obj = scene[name].obj;

		if(scene.now && scene.now.name == name){
			return false;
		}
		
		switch (type) {
			case "left" : scene.x = 100; scene.y = 0; break;
			case "right" : scene.x = -100; scene.y = 0; break;
			case "top" : scene.y = -100; scene.x = 0; break;
			case "bottom" :	scene.y = 100; scene.x = 0; break;
			default : scene.x = 0; scene.y = 0;
		}

		obj.removeClass("transition").css("-webkit-transform","translate3d(" + scene.x + "%," + scene.y + "%,0)");

		setTimeout(function(){
		
			if(scene.now.name){
				obj.addClass("transition show").css("-webkit-transform","translate3d(0,0,0)");
				scene[scene.now.name].obj.removeClass("show").css("-webkit-transform","translate3d(" + -scene.x + "%," + -scene.y + "%,0)");
			}else{
				obj.css("-webkit-transform","translate3d(0,0,0)");
				setTimeout(function(){
					obj.addClass("transition show");
				},100);
			}
			
			scene.now = {
				"name" : name,
				"type" : type
			};

			callback && callback();

		},100);
	};
};

window.______payEvent = {
	success:function(data){
		//支付成功

	},
	failure:function(data){
		//失败

	},
	cancel:function(data){
		//取消

	},
	networkerrors:function(data){
		//网络错误
		$.alert({
			val:"网络错误",
			type:"flash"		
		})
	},

}
window.______overPay = function(data){
	data.success +="";
	switch(data.success){
		case "9000":
		//成功
		window.______payEvent.success();
		break;
		case "8000":
		//正在处理中
		window.______payEvent.success();
		break;
		case "4000":
		//支付失败
		window.______payEvent.failure();
		break;
		case "6001":
		//取消
		window.______payEvent.cancel();
		break;
		case "6002":
		//网络连接出错
		window.______payEvent.networkerrors();
		break;
		case "0":
		//成功
		window.______payEvent.success();
		break;
		case "-1":
		//普通错误类型
		window.______payEvent.failure();
		break;
		case "-2":
		//取消
		window.______payEvent.cancel();
		break;
		case "-3":
		//发送失败
		window.______payEvent.networkerrors();
		break;
		case "-4":
		//授权失败
		window.______payEvent.failure();
		break;
		case "-5":
		//微信不支持
		window.______payEvent.failure();
		break;
	}
}

gm.toPay = function(op){
	var _op = {
		orderUuid : 0,
		paytype : 0,
		customerUuid : "0",
		callback : {},
		name : "",
		desc : "",
		money : 0.01,
		payType:1,
		userType:1
	};

	for(var k in op){
		_op[k] = op[k];
	}

	for(var k in _op.callback){
		window.______payEvent[k] = _op.callback[k];
	}

	// window.______overPay = _op.callback;
	gm.pul.topay({
		user:_op.customerUuid,
		order:_op.orderUuid,
		name:_op.name,
		desc:_op.desc,
		payType:_op.payType,
		userType:_op.userType,
		money:_op.money  //项目测试使用，上线必须打开
	});		
}

//消息落地
function ______msgCallback(data){
	var ids = data.universalUuid.split("|");
	var idp = {};
	for(var i=0;i<ids.length;i++){
		idp[i+""] = ids[i];
	}

	$.confirm(___msgGotoUrl[data.universalType].msg,function(){
		gm.pul.toUrl(gm.replace(___msgGotoUrl[data.universalType].url,idp));	
	});	
}


// 跳转~
$(document).ready(function(){
	$(".p0_figure1").click(function(){
		page.tabScene("p3","bottom");
		$("#p3").jsq(6,function(){
			page.tabScene("p8","bottom");
		});
	});	
	$(".p0_figure2").click(function(){
	  	page.tabScene("p1","bottom");
	  	$("#p1").jsq(6,function(){
			page.tabScene("p8","bottom");
		});
	});
	$(".p0_figure3").click(function(){
	  	page.tabScene("p6","bottom");
	  	$("#p6").jsq(6,function(){
			page.tabScene("p8","bottom");
		});
	});
	$(".p0_figure4").click(function(){
	  	page.tabScene("p5","bottom");
	  	$("#p5").jsq(6,function(){
			page.tabScene("p8","bottom");
		});
	});
	$(".p0_figure5").click(function(){
	  	page.tabScene("p7","bottom");
	  	$("#p7").jsq(6,function(){
			page.tabScene("p8","bottom");
		});
	});
	$(".p0_figure6").click(function(){
	  	page.tabScene("p2","bottom");
	  	$("#p2").jsq(6,function(){
			page.tabScene("p8","bottom");
		});
	});
	$(".p0_figure7").click(function(){
	  	page.tabScene("p4","bottom");
	  	$("#p4").jsq(6,function(){
			page.tabScene("p8","bottom");
		});
	});
});