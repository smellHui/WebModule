
//滑动列表（左侧）
$.fn.lrTouchMove = function(){

	var _this = this,
		_touchStatus = false,
		_status = false,
		// _boxStatus = 0,
		_x = 0,
		_moveX = 0,
		_w,
		_hideW = 2.7;

	this.bind({
		"touchstart" : function(event){
			if(!this.dataset.boxStatus){
				this.dataset.boxStatus = 0;
			}
			$(this).css("transition","");
			_status = true;
			_w = $(this).width();
			_x = event.originalEvent.touches[0].clientX;
		},
		"touchmove" : function(event){
			var _n = Number(this.dataset.boxStatus);
			_moveX = (event.originalEvent.touches[0].clientX - _x) / _w;
			if(_status && (_n != 0 || _moveX < 0)){
				$(this).css("-webkit-transform","translate3d(" + (_n + (_hideW * _moveX * 2)) + "rem,0,0)");
				if(gm.isMI){
					return false;
				}
			}
		},
		"touchend" : function(event){
			$(this).css("transition","all .1s ease");
			var __x = 0;
			if(this.dataset.boxStatus == 0 && _moveX < -0.3){
				this.dataset.boxStatus = -_hideW;
			}else if(this.dataset.boxStatus < 0 && _moveX < 0.15){
				this.dataset.boxStatus = -_hideW;
			}else{
				this.dataset.boxStatus = 0;
			}
			$(this).css("-webkit-transform","translate3d(" + this.dataset.boxStatus + "rem,0,0)");
			_status = false;
		}
	});
	return this;
};

//触屏点击（无延迟）
$.fn.ontouch = function(callback,bool){

	var _x,_y,_s,
		_t = {
			s : function(event){
				var t = getTouch(event);
				_x = t.clientX;
				_y = t.clientY;
				_s = true;
			},
			m : function(event){
				if(_s){
					var t = getTouch(event);
					if(_x != t.clientX || _y != t.clientY){
						_s = false;
					}
				}
			},
			e : function(event){
				if(_s){
					callback.call(this);
					if(bool){
						event.preventDefault();
						return false;
					}
				}
			}
		};

	function getTouch(event){
		return event.originalEvent.touches[0] ? event.originalEvent.touches[0] : event;
	};

	this.bind({
		"touchstart" : _t.s,
		"touchmove" : _t.m,
		"touchend" : _t.e
	});

	return this;

};

$.fn.diySetText = function(){

	var _this = this,
		_ipt,
		$diyText = $("#diytext"),
		$diyTextarea,
		// $diyTextInput,
		$diyTextClose,
		$diyTextBtn;

	if(!$diyText.length){
		$diyText = $("<div id='diytext'>");
		$diyTextarea = $("<textarea id='diytextarea'>").appendTo($diyText);
		// $diyTextInput = $("<inout id='diytextinput'>").appendTo($diyText);
		$diyTextClose = $("<div id='diytextclose'>取消</div>").appendTo($diyText)
			.ontouch(function(){
				$diyText.removeClass("show");
			});
		$diyTextBtn = $("<div id='diytextbtn'>提交</div>").appendTo($diyText)
			.ontouch(function(){
				_ipt.value = $diyTextarea.val();
				$diyText.removeClass("show");
			});
	}else{
		$diyTextarea = $diyText.find("#diytextarea");
		// $diyTextInput = $diyText.find("#diytextinput");
		$diyTextClose = $diyText.find("#diyclose");
		$diyTextBtn = $diyText.find("#diytextbtn");
	}

	setTimeout(function(){
		$("body").append($diyText);
	});

	this.bind("touchend",function(event){
		_ipt = this;
		$diyTextarea.val(this.value).attr("placeholder",this.placeholder);
		$diyText.addClass("show");
		return false;
	});

	return this;
};

// window.alert = 
$.alert = function(val){

	var op = {
		"type" : "alert",
		"timer" : 2000,
		"className" : {
			"type" : "",
			"flash" : "alertFlash"
		}
	};

	if(val.constructor === Object){
		$.extend(op,val);
	}else{
		op.val = val;
	}
	if(op.val.constructor !== String){
		op.val = op.val.toString();
	}
	if(!op.val || (op.val.constructor !== String  && op.val.constructor !== String))
		return "not value";

	var $alert = $("<div class='alertBox'>").addClass(op.className[op.type]),
		$text = $("<div class='alertText'>").html(op.val).appendTo($alert),
		$ok = $("<div class='alertBtn'>").html("确定").appendTo($alert),
		_mask;
		if(op.type == "flash"){
			_mask = new mask("mask_flash");
		}else{
			_mask = new mask();
		}
		_mask.show();

	function closeAlert(){
		$alert.remove();
		_mask.hide();
		delete _mask;
		op.callback && op.callback();
	};

	$ok.on("touchend",function(){
		$alert.on("webkitTransitionEnd",closeAlert).removeClass("alertShow");
	});

	$alert.appendTo("body");
	setTimeout(function(){
		$alert.addClass("alertShow");
		if(op.type && op.type == "flash"){
			setTimeout(closeAlert,op.timer);
		}
	});

};

/* 
	$.confirm({
		"val" : "提示内容", //必填项
		"passCallback" : function(){}, //必填项
		"passText" : "确认",
		"cancelCallback" : function(){}
		"cancelText" : "取消"
	});
 */
$.confirm = function(val,callback,cancelCallback){

	var op = {
		"passText" : "确认",
		"cancelText" : "取消"
	};

	if(val.constructor === Object){
		$.extend(op,val);
	}else{
		op.val = val;
		op.passCallback = callback;
		op.cancelCallback = cancelCallback;
	}
	if(op.val.constructor !== String){
		op.val = op.val.toString();
	}

	if(!op.val || op.val.constructor !== String || !op.passCallback || op.passCallback.constructor !== Function)
		return "not value or callback";

	var $confirm = $("<div class='confirmBox'>"),
		$text = $("<div class='confirmText'>").html(op.val).appendTo($confirm),
		$ok = $("<div class='confirmOk'>").html(op.passText).appendTo($confirm),
		$cancel = $("<div class='confirmCancel'>").html(op.cancelText).appendTo($confirm),
		_mask = new mask();
		_mask.show();

	$ok.on("touchend",function(){
		$confirm.on("webkitTransitionEnd",function(){
			$(this).remove();
			delete _mask;
			_mask.hide();
			op.passCallback && op.passCallback();
		}).removeClass("confirmShow");
	});
	$cancel.on("touchend",function(){
		$confirm.on("webkitTransitionEnd",function(){
			$(this).remove();
			delete _mask;
			_mask.hide();
			op.cancelCallback && op.cancelCallback();
		}).removeClass("confirmShow");
	});

	$confirm.appendTo("body");
	setTimeout(function(){
		$confirm.addClass("confirmShow");
	});

};

//自定义遮罩
function mask(type,callback){

	var timer,
		that = this,
		$mask = $("<div class='maskBar'><i></i></div>").appendTo("body");

	if(type && type.constructor === Function){
		callback = type;
	}else{
		$mask.addClass(type);
	}

	this.show = function(){
		$mask.addClass("show");
		if(type == "loading"){
			timer = setTimeout(function(){
				$.alert({
					"val" : "网络不给力<br>请重试",
					"type" : "flash",
					"callback" : function(){
						that.hide();
					}
				});
			},15000);
		}
	};

	this.hide = function(){
		if(type == "loading"){
			clearTimeout(timer);
		}
		$mask.on("webkitTransitionEnd",function(){
			$(this).remove();
			callback && callback();
		}).removeClass("show");
	};

};

//自定义多选列表
	// checkboxBar({
	// 	"data" : [
	// 			{ "id" : "1" , "val" : "标签内容" , "selected" : "1" },
	// 			{ "id" : "2" , "val" : "Background" },
	// 			{ "id" : "3" , "val" : "叶良辰" }
	// 		],
	// 	"callback" : function(data){
	// 		console.log(data.id,data.val);
	// 	},
	// 	"maxlength" : 2
	// });
function checkboxBar(op){

	var _this = this,
		selectMask,
		result,
		len = 0,
		$checkbox = $("<div id='checkboxBar'>"),
		$checkboxBox = $("<ul class='checkboxBarBox'>").appendTo($checkbox),
		$checkboxBtn = $("<div class='checkboxBarBtn'>").appendTo($checkbox),
		$checkboxBtnOk = $("<i class='checkboxBarBtnOk'>确认</i>").appendTo($checkboxBtn),
		$checkboxBtnCancel = $("<i class='checkboxBarBtnCancel'>取消</i>").appendTo($checkboxBtn);

	$checkboxBtnOk.ontouch(function(){
		_this.complete()
	});
	$checkboxBtnCancel.ontouch(function(){
		_this.boxClose()
	});
	setTimeout(function(){
		$("body").append($checkbox);
	});

	function formatData(){
		var i = 0,
			_id = [],
			_val = [];
		for(;i < result.length; i++){
			_id.push(result[i].id);
			_val.push(result[i].val);
		}
		return {
			"id" : _id.join(","),
			"val" : _val.join(",")
		}
	};

	function onSelectedEvent(){
		$(this).ontouch(function(){
			if($(this).attr("data-selected") != "1"){
				if(op.maxlength && len >= op.maxlength){
					$.alert({
						"val" : "仅可选择" + op.maxlength + "项",
						"type" : "flash",
						"timer" : 1500
					});
				}else{
					len ++;
					$(this).attr("data-selected","1");
				}
			}else{
				len --;
				$(this).attr("data-selected","0");
			}
		});
	};

	this.boxClose = function(){
		setTimeout(function(){
			setTimeout(function(){
				$checkbox.remove();
				selectMask.hide();
			},200);
			$checkbox.removeClass("show");
		},200);
	};

	this.complete = function(){
		result = [];
		if(op.callback){
			$checkboxBox.find("li[data-selected='1']").each(function(){
				result.push({
					"id" : this.dataset.val,
					"val" : this.innerHTML
				});
			});
			op.callback(formatData());
		}
		_this.boxClose();
	};

	$.each(op.data,function(i){
		var _li = $("<li data-val='" + this.id + "'>" + this.val + "</li>").get(0);
		onSelectedEvent.call(_li);
		if(this.selected){
			len ++;
			_li.dataset.selected = 1;
		}
		$checkboxBox.append(_li);
	});

	selectMask = new mask();
	selectMask.show();
	setTimeout(function(){
		$checkbox.addClass("show");
	},200);

	console.log("初始化多选菜单完毕");

};

//自定义下拉列表
function selectBar(options){

	var op,
		_this,
		_result = [],
		_op = {
			"title" : "请选择"
		};

	var $selectTitle,
		$selectBox,
		$selectBack,
		$select = $("#selectBar"),
		selectMask;

		if(!$select.length){
			$select = $("<div id='selectBar'>");
			$selectTitle = $("<div class='selectBarTitle'>").appendTo($select);
			$selectBox = $("<ul class='selectBarBox'>").appendTo($select);
		}else{
			$selectTitle = $select.find(".selectBarTitle");
			$selectBox = $select.find(".selectBarBox");
		}

		setTimeout(function(){
			$("body").append($select);
		});

	function onBackEvent(){
		if(op.backEvent){
			$selectBack = $("<div class='selectBarBack'><i class='icon-thearrowx'></i></div>")
				.ontouch(function(){
					_result.pop();
					op.backEvent();
				})
				.appendTo($select);
			setTimeout(function(){
				$selectBack.addClass("show");
			},300);
		}
	};

	function onSelectedEvent(){
		if(op.selectedCallback){
			$(this).ontouch(function(){

				_result.push({
					"id" : this.dataset.selectval,
					"val" : this.innerText,
					"obj" : this
				});

				$(this).attr("data-selected","1").siblings().attr("data-selected","0");

				op.selectedCallback(formatData(_result));

			});
		}
	};

	function formatData(vals){
		var i = 0,
			_id = "",
			_val = "";
		for(;i < vals.length; i++){
			_id = vals[i].id;
			_val = vals[i].val;
		}
		return {
			"id" : _id,
			"val" : _val
		}
	};

	this.show = function(){
		onBackEvent();
		$select.addClass("show");
	};

	this.hide = function(){
		$select.removeClass("show");
		$selectBack && $selectBack.remove();
	};

	this.tab = function(op){
		var _that = this;
		setTimeout(function(){
			_that.hide();
			setTimeout(function(){
				_that.reUI();
				_that.resetData(op);
				_that.show();
			},200);
		},200);
	};

	this.open = function(ops){
		var _that = this;
		this.resetData(ops || op);
		selectMask = new mask();
		selectMask.show();
		setTimeout(function(){
			_result.pop();
			_that.show();
		},200);
	};

	this.close = function(){
		var _that = this;
		setTimeout(function(){
			setTimeout(function(){
				_that.reUI();
				selectMask.hide();
			},200);
			_that.hide();
		},200);
	};

	this.resetData = function(options){
		op = $.extend(_op,options);
		$selectTitle.html(op.title);
		$.each(op.lists,function(i){
			var _li = $("<li data-selectVal='" + this.id + "'>" + this.val + "</li>").get(0);
				$(_li).append("<i class='icon-gouxuan'>");
			if(this.disabled){
				_li.dataset.disabled = 1;
			}else{
				onSelectedEvent.call(_li);
			}
			if(this.selected){
				_li.dataset.selected = 1;
			}
			$selectBox.append(_li);
		});
	};

	this.reUI = function(){
		$selectTitle.html("");
		$selectBox.html("");
	};

	op = $.extend(_op,options);

	console.log("初始化菜单完毕：" + op.title);
};

//预载静态资源
function loadImgs(url,callback,maxlen){
	var maxlength = false;
	if(url.constructor === Array){
		if(!maxlen){
			maxlength = url.length;
		}else{
			maxlength = maxlen;
		}
		var that = this,
			urls = url;
		url = urls.pop();
	}
	var img = new Image();
	img.onload = function () {
		callback.call(this,maxlength - (urls && urls.length || 0),maxlength);
		if(urls && urls.length >= 1){
			loadImgs(urls,callback,maxlength);
		}
		else{
			this.onload = null;
		}
	};
	img.src = url;
};

//注册touchend事件显示全屏图
$.fn.showWallpaper = function(){

	if(this.get(0).tagName != "IMG"){
		return "object type not IMG";
	}
	
	$(this).each(function(){
		$(this).ontouch($.onShowPic);
	});

	
};

$.onShowPic= function(cousattr){
	var _this = this,
		_devicePixelRatio = window.devicePixelRatio || 1,
		_mask = new mask(),
		_downbtn = $("<div id='downbtn'>下载美图</div>"),
		_src;
		if(cousattr){
			_src = $(this).attr(cousattr);
		}else{
			_src = _this.src;
		}
	_mask.show();
	_downbtn.ontouch(function(){console.log(_src);
		gm.pul.saveImage(_src);
	},true);

	loadImgs(_src,function(){
		var that = $(this),
			_s = true,
			_css = "position:fixed;left:0;top:0;z-index:99999;";
		if(this.width >= this.height){
			this.style.width = "100%";
		}else{
			_s = false;
			this.style.height = "100%";
		}

		$("body").one("touchend",function(){
			that.remove();
			_downbtn.remove();
			_mask.hide();
		});

		$(this).appendTo("body");

		setTimeout(function(){
			
			var _p  = that.parent();
			that[0].style.cssText += _css;

			if(_s){
				that.css({
					top:"50%"
				});
			}else{
				that.css({
					left:"50%"
				});					
			}

			var w = that.width();
			var h = that.height();

			if(_s){
				h = -h/2;
				w = 0;
			}else{
				w = -w/2;
				h = 0;
			}

			that.css({
				"margin-left":w,
				"margin-top":h
			});

			$("body").append(_downbtn);

		},20);
	});
}
//获取科室
$.fn.getDepartment = function(obj){
	var _option = {
		showk : "#selectk p"
	}
	var _ = this;

	$.getDate({
		page:"public",
		inter:"getDepartment",
		callback:function(data){
			if(!data){
				$.alert("服务器出错！")
				return;
			}

			if (data.query.success) {
				var arr = [];
				var _getHospital = '<option value="0">选择科室</option>';

				$(data.relist).each(function(i,o){
					arr.push('<option value="'+o["id"]+'">'+o["departmentName"]+'</option>');
				});

				_.find("select").html(_getHospital + arr.join(""));

				_.bind({
					change:function(){
						var pid = $(_).val();
						var arr = [];

						$("#persion_department span").html($($(_).find("option")[$("#k")[0].selectedIndex]).html());
						$("#persion_department span").attr("value",$($(_).find("option")[$("#k")[0].selectedIndex]).attr("value"));
					}
				});
			};
		}
	});
}
//获取职称列表变化的值
$.fn.getChangeVal = function(code){
	var temp=0;
	code = code || 0;
	var _this = this,
		_showk = $(this).find("span");
	_showk.html(___professional[code]).attr("value",code);

	for(var i = 0; i < ___professional.length; i++){
		$(this).find("select").append('<option value="'+i+'">'+___professional[i]+'</option>');
		if(___professional[i]==code)
			temp=i;
	}
	if(!isNaN(parseInt(code)))
		temp=parseInt(code);
	//初始select 数据
	$(this).find("select").find("option[value="+temp+"]").attr("selected",true);
	
	_showk.html(___professional[temp]).attr("value",___professional[temp]);
	//_showk.attr("value",___professional[temp]);
	
	console.log("创建职称列表完成");
	$(this).find("select").on("change",function(){
		_showk.html($(this)[0].selectedOptions[0].innerHTML);
		_showk.attr("value",$(this).val());
	});
	console.log("注册职称列表事件完成");
}
//获取 是否首发
$.fn.getIsStart=function(code){
	code=parseInt(code)||0;
	var _this=this,
		_showk=$(this).find("span");
	_showk.html(___isStart[code]).attr("value",code);
	for(var i=0;i<___isStart.length;i++){
		$(this).find("select").append('<option value="'+i+'">'+___isStart[i]+'</option>');
	}
	console.log("创建职称列表完成");
	$(this).find("select").on("change",function(){
		_showk.html($(this)[0].selectedOptions[0].innerHTML);
		_showk.attr("value",$(this).val());
		if($(this)[0].selectedOptions[0].innerHTML=="首发")
			$("#seizureTimes").parent().hide();
		else
			$("#seizureTimes").parent().show();
	});
	console.log("注册职称列表事件完成");
}
//获取婚姻信息
$.fn.getIsMarry=function(code){
	var temp=0;
	code = code || 0;
	var _this = this,
		_showk = $(this).find("span");
	if(isNaN(parseInt(code)))//code 非数字
		_showk.html(code);
	
	for(var i = 0; i < ___isMarry.length; i++){
		$(this).find("select").append('<option value="'+i+'">'+___isMarry[i]+'</option>');
		if(___isMarry[i]==code)
			_showk.attr("value",i);
	}
	
	console.log("创建职称列表完成");
	$(this).find("select").on("change",function(){
		_showk.html($(this)[0].selectedOptions[0].innerHTML);
		_showk.attr("value",$(this).val());
	});
	console.log("注册职称列表事件完成");
}
//获取时间
$.fn.getSelectTime=function(t_time){
	
	
}
$(document).ready(function(){
	// 打开列表
	$(function(){
	    $(".content dt,.laung dt").ontouch(function(){
	        var state = $(this).parent().hasClass("sydns");
	        if(state){
	            $(this).parent().removeClass("sydns");
	        }else{
	        	// $(".content dl").removeClass("sydns");
	            $(this).parent().addClass("sydns");
	        }
	    });
	});

	// 勾选框按钮
	$(".select-box").bind({
		touchend:function(){
    		$(this).toggleClass("_mz");
		}
	});

	// 药品详情-文章点开
	$(function(){
		$(".tisfccb").parent().addClass("text_pshou");
	    $(".tisfccb").click(function(){
	        var state = $(this).parent().hasClass("text_pshou");
	        if(state){
	            $(this).parent().removeClass("text_pshou");
	        }else{
	            $(this).parent().addClass("text_pshou");
	        }
	    });
	})

	// 点击关闭弹出框
	$(".tcsjob i.icon-xxx").bind({
		touchend:function(){
			window.__mask && __mask.hide();
			$(this).parent().hide();
		}
	});

	$.fn.collectnews = function(){
		// if(window.___collectnews_over){
		// 	return;
		// }
		// window.___collectnews_over = true;
		var _  = this;
		//收藏
		_.find("i.icon-redstars,i.icon-greystars").ontouch(function(){
			//判断是否登录
			if(!gm.user.isLoginDoctor()){
				gm.pul.toUrl('goodm://login');
				return;
			}
			var _this = this;
			var _class = $(this).attr("class");
			var _newsid = $(this).parent().parent().attr("contentuuid");

			if(_class == "icon-redstars"){
				_class = "icon-greystars";
				var _favid = $(this).parent().parent().attr("favid");
				//删除收藏 
				gm.user.delFavorites(_favid,function(data){
					var result=$(_this).parent().siblings(".asbg").find(".videomz").find(".contentcount").children().html();
					$(_this).parent().siblings(".asbg").find(".videomz").find(".contentcount").children().html(--result);
				});
			}else{
				_class = "icon-redstars";
				//添加收藏
				gm.user.addFavorite(_newsid,1,function(data){
					$(_this).parent().parent().attr("favid",data)
					var result=$(_this).parent().siblings(".asbg").find(".videomz").find(".contentcount").children().html();
					$(_this).parent().siblings(".asbg").find(".videomz").find(".contentcount").children().html(++result);
				});
			}
			_czc.push(["_trackEvent","阅读","收藏","",'','i.icon-redstars,i.icon-greystars']);
			$(this).attr("class",_class);
		},true);

		//分享
		_.find(".icon-mycollection,.icon-mycollectiongray").ontouch(function(){
			//判断是否登录
			if(!gm.user.isLoginDoctor()){
				gm.pul.toUrl('goodm://login');
				return;
			}
			var _ = $(this);
			var _contentUuid = $(this).parents("li").attr("contentuuid");
			
			if (!_contentUuid) {
				_contentUuid = $(this).parents("dd").attr("contentuuid");
			};
			var p = _.parent().parent();

			var obj = {
				"title":p.find(".videomz h2").text(),
				"desc":p.find(".videomz h2").text(),
				"img":p.find("img").attr("src"),
				"link":window._interfacePath + "/html/thedoctorinformation/" + p.find(".videomz h2 a").attr("href")
			}

			gm.share(obj,function(){
				$.getDate({
					page:"doctor",
					inter:"addDoctorShare",
					data:{contentUuid:_contentUuid,doctorUuid:gm.user.getDoctor()},
					callback:function(data){
						_czc.push(["_trackEvent","阅读","分享","",'','addDoctorShare']);
					}
				});
			});
		},true);

		return _;
	}

	//设置开关
	$.fn.settingOnOff=function(callback){
		$(this).bind({
			"touchend":function(){
				if($(this).hasClass("off")){
					$(this).attr("class","on");
				}else{
					$(this).attr("class","off");
				}
				callback.call(this,this.className);
			}
		});
		return this;
	}


	//性别女
	$(".addreginfo .btn-checkbox-b").bind({
		touchend:function(){
			$(".btn-checkbox-a").removeClass("btn-checkbox-a-on");
			$(".btn-checkbox-b").addClass("btn-checkbox-b-on");
			var arr = $(".btn-checkbox-b").attr("class").split(" ");
		}
	});

	//性别男
	$(".addreginfo .btn-checkbox-a").bind({
		touchend:function(){
			$(".btn-checkbox-b").removeClass("btn-checkbox-b-on");
			$(".btn-checkbox-a").addClass("btn-checkbox-a-on");
		}
	});

	//点击其他区域，收起键盘（如果已弹出）
	$("body").on("touchend",function(){
		$("input,textarea").blur();
	});
	$("input,textarea").on("touchend",function(event){
		event.stopPropagation();
	});


	window.___getPhotoStr = function(data){
		var arr = data.split(",");
		window._loading = new mask("loading");
		window._loading.show();

		if(arr.length > 1){
			data = arr[1];
		}
		$.getDate({
			page:"user",
			inter:"uploadIcon",
			data:{icon:data},
			method:"POST"
		});
	}

	//上传图片
	$.fn.upimage = function(callback,timer){
		var _ = this;
		gm.pul.upimg = function(data){
			window._loading && window._loading.hide();
			callback&&callback(data);
		};
		// gm.pul.upimg = window.___getPhotoStr;
		if(/android/gi.test(navigator.userAgent)){
			console.log("/android/gi");
			this.bind({
				touchend:function(){
					//$("#___upfile").click();
					setTimeout(function(){gm.pul.toUrl("goodm://takephoto");},timer||100);
				}
			});
		}else{
			bindEvent();
		}

		// gm.pul.toUrl("goodm://takephoto");
		function bindEvent(){
			console.log("bindEvent");
			var uf = $("#___upfile");
			if(uf.length == 0){
				$("body").append('<input type="file" name="___upfile" id="___upfile" />');

				$("#___upfile").bind({
					change:fOnChange
				});
			}

			_.append(uf);
			_.bind({
				touchend:function(){
					$("#___upfile").click();
					//gm.pul.toUrl("goodm://takephoto");
				}
			});
		}

		return this;
	}
	
	//上传图片
	$.fn.uploadimage = function(callback,timer,params){
		var _ = this;
		console.log(params);
		gm.pul.upimg = function(data){
			window._loading && window._loading.hide();
			callback&&callback(data);
		};
		// gm.pul.upimg = window.___getPhotoStr;
		if(/android/gi.test(navigator.userAgent)){
			console.log("/android/gi");
			this.bind({
				touchend:function(){
					if(params!=null)
						setTimeout(function(){gm.pul.toUrl("goodm://takephoto/"+params);},timer||100);
					else
						setTimeout(function(){gm.pul.toUrl("goodm://takephoto");},timer||100);
				}
			});
		}else{
			if(params=="2")
				bindEvent1(callback,params);
			else
				bindEvent(callback,params);
		}

		// gm.pul.toUrl("goodm://takephoto");
		function bindEvent(callback,params){
			console.log("bindEvent");
			var uf = $("#___upfile");
			if(uf.length == 0){
				$("body").append('<form id="userup_file" enctype="multipart/form-data"><input type="file" name="files" id="___upfile" /></form>');

				$("#___upfile").bind({
					change:fimgOnChange
				});
			}

			_.append(uf);
			_.bind({
				touchend:function(){
					$("#___upfile").click();
					//gm.pul.toUrl("goodm://takephoto");
				}
			});
		}
		function bindEvent1(callback,params){
			console.log("bindEvent1");
			var uf = $("#___upfile1");
			if(uf.length == 0){
				$("body").append('<form id="userup_file1" enctype="multipart/form-data"><input type="file" name="files" id="___upfile1" /></form>');

				$("#___upfile1").bind({
					change:fimgOnChange1
				});
			}

			_.append(uf);
			_.bind({
				touchend:function(){
					$("#___upfile1").click();
					//gm.pul.toUrl("goodm://takephoto");
				}
			});
		}

		return this;
	}

	function fimgOnChange(callback,params){
		window._loading = new mask("loading");
		window._loading.show();
		var file = this.files[0];
	    if(!file && !window.FileReader){
	    	window._loading.hide();
	    }
	    	
	   
		var formData = new FormData($("#userup_file")[0]);
		formData.append("files",this.files[0]);
		formData.append("thumbnail","true");
	     $.ajax({  
	          url: window._interfacePath+""+_pageConfig.content.uploadimg,
	          type: 'POST',
	          data: formData,
	          async: true,
	          cache: false,
	          contentType: false,
	          processData: false,
	          dataType:'json',
	          success: function (returndata) {
	        	  //window._loading && window._loading.hide(); 
	        	  setTimeout(function(){
	        		  if(returndata.code==200){
		        		  var data=returndata.value;
		        		  if(data!=null){
		      				var id=data[0].id;
		      				var thumbnail=data[0].thumbnail;
		      				$("#persion_image img").attr("src",thumbnail);//用户图像
		      				$("#persion_image").attr("value",id);
		      			} 
		        	  }else{
		        		  $.alert(returndata.message);
		        	  }
	        	  }, 400);
	        	  window._loading && window._loading.hide(); 
	        	  
	        	  
	        	 
	          }
	     });
	    
	}
	function fimgOnChange1(callback,params){
		var file = this.files[0];
	    if(file && window.FileReader) 
	    	window._loading = new mask("loading");
	    window._loading.show();
		var formData = new FormData($("#userup_file1")[0]);
		formData.append("files",this.files[0]);
		formData.append("thumbnail","true");
	     $.ajax({  
	          url: window._interfacePath+""+_pageConfig.content.uploadimg,
	          type: 'POST',
	          data: formData,
	          async: true,
	          cache: false,
	          contentType: false,
	          processData: false,
	          dataType:'json',
	          success: function (returndata) {
	        	  window._loading.hide();
	        	  if(returndata.code==200){
	        		  var data=returndata.value;
	        		  gm.pul.upimg(data);
	        	  }else{
	        		  $.alert(returndata.message);
	        	  }
	          }
	     });
	    
	}
	
	function fOnChange(){
	    var file = this.files[0];
	    if(file && window.FileReader) {
	    	window._loading = new mask("loading");
		window._loading.show();

		localStorage.removeItem("user_src");
	        	var fr = new FileReader();
	        	fr.onloadend = function(e) {
	        		console.log("result:"+e.currentTarget.result);
	        	var icon = e.currentTarget.result;
	        	icon = compress({file:icon,quality:65,maxWidth:gm.upimgmaxwidth,callback:function(data){
	        		var icon = data.split(",")[1];
	        		console.log("icon="+icon);
		        	var data = {icon:icon,"callback":"gm.pul.upimgbind"};

	        		$.getDate({
						page:"user",
						inter:"uploadIcon",
						data:data,
						method:"POST"
					});
	        	}});
	        };
	        console.log("upimgbind");
	        fr.readAsDataURL(file);
	    }
	}

	function compress(option){
	    var k,
	        ctx,
	        cvs = document.createElement("canvas"),
	        img = document.createElement("img"),
	        config = {
	            quality : 60,
	            maxWidth : 720,
	            format : "image/jpeg"
	        };
	    //载入自定义参数
	    for(k in option){
	        if(option[k])
	            config[k] = option[k];
	    }
	    //载入图片数据到内存
	    if(config.file && config.file.tagName && config.file.tagName == "IMG"){
	        img = config.file;
	        laodBase64();
	    }
	    else{
	        img.onload = laodBase64;
	        img.src = config.file;
	    }                
	    function laodBase64(){
	        if(img.naturalWidth > config.maxWidth){
	            //计算等比压缩图片尺寸
	            config.width = config.maxWidth;
	            config.height = config.maxWidth * img.naturalHeight / img.naturalWidth;
	        }
	        else{
	            config.width = img.naturalWidth;
	            config.height = img.naturalHeight;
	            config.quality = 100;
	        }
	        //打印调试信息
	        delete config.file;
	        console.log(config);
	        //设置图片尺寸
	        cvs.width = config.width;
	        cvs.height = config.height;
	        //按照指定尺寸进行缩放处理
	        ctx = cvs.getContext("2d").drawImage(img, 0, 0, config.width, config.height);
	        //按照指定比例进行品质压缩处理
	        config.newImageData = cvs.toDataURL(config.format, config.quality/100);
	        config.callback && config.callback(config.newImageData);
	    }
	};

	//适配器
	window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", ___resize, false);
	function ___resize(){
		var __w = $(window).width();
		if(__w>480){
			__w=480
		}

		if(__w<320){
			__w=320;
		}

		$("html").css({
			"fontSize":__w/960*100+"px"
		});
	}

	___resize();
});