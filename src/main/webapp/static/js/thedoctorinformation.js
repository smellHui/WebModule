$(function(){
var _suoyou_gj = ["全部","中国","美国","英国","国际","其他"]
var _aioerk = ["全部","精神分裂症","抑郁障碍","焦虑障碍","双相障碍","物质依赖","强迫症","睡眠障碍","其他"]
var _lclb = ["全部","精神病/分裂症","躁狂","抑郁","焦虑","恐惧/强迫","创伤后应激障碍","物质依赖","总评","其他"]
var arr = [];
var err = [];
window.___index = 0;

$(_aioerk).each(function(i,o){
	err.push('<span>'+_aioerk[i]+'</span>');
	$(".aioerk").html(err.join(""));
})
$(_suoyou_gj).each(function(i,o){
	arr.push('<span>'+_suoyou_gj[i]+'</span>');
	$(".suoyou_gj").html(arr.join(""));
});
//可不用
$(".alistodical li").bind({
	touchend:function(){
		$(this).siblings().removeClass("sanmslog");
		$(this).addClass("sanmslog");
		var _o = $(this).index();

		if (_o == 0) {
			$(".gj_countries").show();
			$(".categoryar_jb").show();
			$(".categoryar_jb .type span").html("疾病");
			var crr = [];
			var drr = [];
			$(_aioerk).each(function(i,o){
				crr.push('<span>'+_aioerk[i]+'</span>');
				$(".aioerk").html(crr.join(""));
			})
			$(_suoyou_gj).each(function(i,o){
				drr.push('<span>'+_suoyou_gj[i]+'</span>');
				$(".suoyou_gj ul").html(drr.join(""));
			});
			$(".categoryar_jb").css("border-bottom","1px solid#cdcdcd");
		}else if(_o == 1){
			$(".gj_countries").show();
			$(".categoryar_jb").show();
			$(".categoryar_jb .type span").html("医疗标准");
			$(".aioerk").html("<span>全部</span><span>DSM-5</span><span>ICD-10</span>");
			$(".gj_countries").hide();
			$(".categoryar_jb").css("border-bottom","0px solid#cdcdcd");
		}else if(_o == 2){
			$(".gj_countries").show();
			$(".categoryar_jb").show();
			$(".categoryar_jb .type span").html("类别");
			var crr = [];
			$(_lclb).each(function(i,o){
				crr.push('<span>'+_lclb[i]+'</span>');
				$(".aioerk").html(crr.join(""));
			})
			$(".gj_countries").hide();
			$(".categoryar_jb").css("border-bottom","0px solid#cdcdcd");
		}else{
			$(".categoryar_jb").hide();
			$(".gj_countries").hide();
			$(".categoryar_jb").css("border-bottom","0px solid#cdcdcd");
		}
	}
});

$(".aioerk,.suoyou_gj,.illness,.symptom,.entity").on("touchend","span",function(){
		$(this).siblings().removeClass("lan");
		$(this).addClass("lan");
});

$(window).on("hashchange",onHash);
//填充数据 
function bindData(data){
	var arr = [];
	var _isy = (window.location.href.indexOf("#b") > 0);
	var tmp = '<li class="{contentType}" contentUuid="{contentUuid}" favid="{favoriteUuid}"><div class="asbg"><div class="scvideo"><a href="{url}"><img style="background:url(../../static/imgs/loading.gif) no-repeat center;" class="lazy scrollLoading" src="{imgUrl}"></a></div><div class="videomz">\
		<h2><a href="{url}">{contentTitle}</a></h2>\
		<p class="contentcount"><span>{contentCount}</span>收藏</p></div><div class="clear"></div></div><div class="redmyu">\
		<i class="icon-{storeType}"></i><i class="icon-{shareType}"></i></div><div class="clear"></div></li>';
	$(data).each(function(i,o){
		o.url = (o.contentType=="3"?o.contentUrl:'informationfordetails.shtml?contentUuid='+o["contentUuid"]+(_isy?"&action=all":""));
		o.contentType = (o.contentType=="3"?"isopen":"");
		if(o.contentType == "isopen")console.log(o.url)
		o.storeType = (o.storeType == 1?"redstars":"greystars");
		//是否已经分享过
		o.shareType=o.shareType==0?"mycollection":"mycollection";
		o.imgUrl = o.imgUrl || "/static/imgs/spimg.png";
		//o.img="../../static/imgs/pixel.gif";
		if(o.contentCount==null ||o.contentCount==undefined)
			o.contentCount=0;
		else
			o.contentCount=o.contentCount;
		//o.creatime = o.creatime || "";
		arr.push(gm.replace(tmp,o));
	});

	// console.log(arr);
	return arr.join("");
}

function isOpenUrl(){
	$(".isopen").bind({
		touchend:function(e){
			e.preventDefault();
		}
	});
	$(".isopen").ontouch(function(){
			var href = $(this).find("a").attr("href");
			gm.pul.openurl(href,window._webBasePath+"html/thedoctorinformation/index.shtml");
		},true
	);
}
//保持后退后的状态
function onHash(){
    var _hash = window.location.hash.substr(1);
    if(_hash !== undefined &&_hash!="" &&_hash!=null){
    	var _arr = {
    			"a" : 0,
    			"b" : 1
    		},
    	_type = _hash.split("-");
        if(_arr[_type[0]] !== undefined){
        	if(_arr[_type[0]] == 0){
        		window.___index = 0;
        		if(!_type[1]){
	        		_type[1] = 0;
	        	}
	        	$(".btsr,.cvde").addClass("dmljs1");
				$(".btsr,.cvde").removeClass("dmljs");
				$(".fniortlist .thelatest_zixu").addClass("dospan");  
				//$(".fniortlist_au").find("div").removeClass("dospan");
				$(".sx1").show();
				$(".sx2").hide();
				// 修改应用标题
				gm.pul.setTitle("阅读");
        		$(".clinical_medical").find("span").removeClass("cur").eq(0).addClass("cur");
        		//$(".clinical_medical").find("b").removeClass("recmended");
        		/*setTimeout(function(){
        			fniortlist.call($(".menulist .cur")[_type[1]]);
        			
        		});*/
        		Refresh("D");
        	}else{
        		window.___index = 1;
        		$(".btsr,.cvde").removeClass("dmljs1");
				$(".btsr,.cvde").addClass("dmljs");
				//$(".fniortlist_au .thelatest_zixua").addClass("dospan");
				//$(".fniortlist").find("div").removeClass("dospan");
				$(".sx1").show();
				$(".sx2").hide();
				// 修改应用标题
				gm.pul.setTitle("阅读");
	        	$(".clinical_medical").find("span").removeClass("cur").eq(1).addClass("cur");
	        	$(".clinical_medical").find("b").addClass("recmended");
	        	//$("#read .fniortlist_au div").eq(_type[1]);
	        	if(!_type[1]){
	        		_type[1] = 0;
	        	}
	        	/*setTimeout(function(){
        			fniortlist_au.call($(".menulist .cur")[_type[1]]);
        		});*/
	        	Refresh("F");
	        }
	    }
    }else{
    	Refresh("D");//页面初始化调用
    }
   
};


/**分页功能**/



refresher.init({
	id:"wrapper",//<------------------------------------------------------------------------------------┐
	pullDownAction:Refresh,                                                            
	pullUpAction:Load 																			
});	

/**最新资讯**/
var generatedCount = 1;
var totalPage=0;
function Refresh(_contentCategoryUuid) {
    setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
    	if(_contentCategoryUuid==undefined){
    		if($(".clinical_medical").find("span").eq(1).hasClass("cur"))
    			_contentCategoryUuid="F";
    		else
    			_contentCategoryUuid="D";
    	}
    	var ____loading = new mask("loading");
    	____loading.show();
    	refreshdata(15,1,_contentCategoryUuid,function(data){
    		____loading.hide();
    		$(".gsid_1 ul").html(bindData(data.relist)).collectnews();
    		isOpenUrl();
    		$(".redmyu").show();
    		generatedCount=1;
    		totalPage=data.totalPage;
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
    		if($(".clinical_medical").find("span").eq(1).hasClass("cur"))
    			_contentCategoryUuid="F";
    		else
    			_contentCategoryUuid="D";
    		
    	}
    	if(generatedCount<=totalPage)
	    	refreshdata(15,generatedCount,_contentCategoryUuid,function(data){
	    			$(".gsid_1 ul").append(bindData(data.relist)).collectnews();
	        		$(".redmyu").show();
	        		isOpenUrl();
	        		if(generatedCount==data.totalPage)
	        			$(".pullUp").hide();
	        		wrapper.refresh();
	    	});
    	else
    		$(".pullUp").hide();
        //wrapper.refresh();/****remember to refresh after action completed！！！   ---id.refresh(); --- ****/
    }, 1000);
}
/**
 * 阅读页面加载更多时调用
 * @param page 当前页面有多少条记录
 * @param pageno 当前第几页面
 * @param _contentCategoryUuid
 * @param callback
 */
function refreshdata(page,pageno,_contentCategoryUuid,callbak){
	$.getDate({
		page:"content",
		inter:"getAllContentList",
		data:{doctorUuid:gm.user.getDoctor(),contentCategoryUuid:_contentCategoryUuid,pageCount:page,pageNo:pageno},
		callback:function(data){
			callbak && callbak(data);
		}
	});
}
//分页功能结束

function fniortlist(){
	
	var _contentCategoryUuid = $(this).attr("contentCategoryUuid");
	var ____loading = new mask("loading");
	____loading.show();
	gm.thedoctorinformation.getAllContentList(_contentCategoryUuid,function(data){
			if(!data){
				$.alert("服务器出错!");
			}
			if(data.query.success=="1"){
				$(".gsid_1 ul").html(bindData(data.relist)).collectnews();
				//$(".scrollLoading").scrollLoading({container: $(".gsid_1 ul")});
				
				isOpenUrl();
				//修改临床推荐的URL
				$(".gsid_1 ul a").each(function(i,o){
					var _o = $(this).attr("href");
					if(_o.indexOf("informationfordetails") > -1){
						_o = _o.split(".")
						$(this).attr("href","informationfordetails1."+_o[1]);
					}
				})
				// $(".pvdow").collectnews();
				____loading.hide();

				if (gm.user.getDoctor()) {
					$(".redmyu").show();
				}
				
			}else{
				$.alert(data.query.message);
			}
			
	});
}




function fniortlist_au(){
	
	var _contentCategoryUuid = $(this).attr("contentCategoryUuid");
	var ____loading = new mask("loading");
	____loading.show();
	gm.thedoctorinformation.getAllContentList(_contentCategoryUuid,function(data){
		if(!data){
			$.alert("服务器出错!");
		}
		if(data.query.success=="1"){
			$(".gsid_2 ul").html(bindData(data.relist)).collectnews();
			//$(".scrollLoading").scrollLoading({container: $(".gsid_2 ul")});
			
			isOpenUrl();

			____loading.hide();
			if (gm.user.getDoctor()) {
				$(".redmyu").show();
			}
		}else{
			$.alert(data.query.message);
		}
	});
}

onHash();

	//头部切换，内容替换
	$.fn.clinical_medical_tab = function(){
		var _ = this;
		_.find("span").on("touchend",function(e){
			e.preventDefault();

			_.find("span").removeClass("cur");
			$(this).addClass("cur");

			window.___index = $(this).index();
			var _class="recmended";

			if(window.___index==0){
				_class="";
				$(".btsr,.cvde").addClass("dmljs1");
				$(".btsr,.cvde").removeClass("dmljs");
				$(".fniortlist .thelatest_zixu").addClass("dospan");  
				$(".fniortlist_au").find("div").removeClass("dospan");
				$(".sx1").show();
				$(".sx2").hide();
                			window.location.hash = "#a";
				// 修改应用标题
				gm.pul.setTitle("阅读");
				//友盟统计-临床推荐 次数
				_czc.push(["_trackEvent","阅读","临床推荐",'','','0']);
			}else if (window.___index==1) {
				$(".btsr,.cvde").removeClass("dmljs1");
				$(".btsr,.cvde").addClass("dmljs");
				$(".fniortlist_au .thelatest_zixua").addClass("dospan");
				$(".fniortlist").find("div").removeClass("dospan");
				$(".sx2").show();
				$(".sx1").hide();
                			window.location.hash = "#b";
				// 修改应用标题
				gm.pul.setTitle("阅读");
				//友盟统计-医学医用 次数
				_czc.push(["_trackEvent","阅读","医学医用",'','','1']);
			};
			_.find("b").attr("class",_class);
		});
	}

	$("#my_task .filterlayer_a .cancely span").bind({
		touchend:function(){
			gm.pul.toUrl("/html/thedoctorinformation/index.shtml");
		}
	})
});

gm.thedoctorinformation = gm.thedoctorinformation || {};

//获取文章详情
gm.thedoctorinformation.init = function(){
	//gm.pul.returnurl = gm.pul.returnIndex;
	gm.isIndex = true;
	gm.pul.returnurl=function(){//退回首页
		if(!gm.isMobile){return;}
			gm.pul.toUrl("goodm://returnIndexPage");
	}
	//隐藏sdc
	//$(".quanzdp").removeClass("sdc");
	//$(".quanzdp").removeClass("sdc1");
	gm.setReturn = function(){
		hidesdc();
	}
	
	function showsdc(num){
		$(".quanzdp:eq("+num+")").addClass("sdc");
		$(".quanzdp:eq("+num+")").removeClass("sdc1");
		gm.pul.returnurl = gm.setReturn;	
	}

	function hidesdc(){
		$(".quanzdp").removeClass("sdc");
		$(".quanzdp").addClass("sdc1");
		//gm.pul.returnurl = gm.pul.returnIndex;
		gm.isIndex = true;
		gm.pul.returnurl=function(){//退回首页
			if(!gm.isMobile){return;}
				gm.pul.toUrl("goodm://returnIndexPage");
		}
	}
	
	var _index = 0;
	//临床推荐
	/*if(window.___isfirst==0){
		gm.thedoctorinformation.getAllContentList($(".fniortlist div").attr("contentCategoryUuid"),function(data){
			if(!data){
				$.alert("服务器出错!");
			}
			if(data.query.success=="1"){
				$(".gsid_1 ul").html(bindData(data.relist)).collectnews();
				isOpenUrl();
				//是否可以分享
				// $(".pvdow").collectnews();
				if (gm.user.getDoctor()) {
					$(".redmyu").show();
				}


			}else{
				$.alert(data.query.message);
			}
		});
		window.___isfirst=1;
	}*/
	
	//医生医用
	/*gm.thedoctorinformation.getAllContentList($(".fniortlist_au div").attr("contentCategoryUuid"),function(data){
		if(!data){
			$.alert("服务器出错!");
		}
		if(data.query.success=="1"){
			$(".gsid_2 ul").html(bindData(data.relist)).collectnews();
			//isOpenUrl();
			// $(".pvdow").collectnews();
			//是否可以收藏
			if (gm.user.getDoctor()) {
				$(".redmyu").show();
			}
		}else{
			$.alert(data.query.message);
		}
	});*/
	//填充数据 
	function bindData(data){
		var arr = [];
		var _isy = (window.location.href.indexOf("#b") > 0);
		var tmp = '<li class="{contentType}" contentUuid="{contentUuid}" favid="{favoriteUuid}"><div class="asbg"><div class="scvideo"><a href="{url}"><img src="{imgUrl}"></a></div><div class="videomz">\
			<h2><a href="{url}">{contentTitle}</a></h2>\
			<p class="contentcount"><span>{contentCount}</span>收藏</p></div><div class="clear"></div></div><div class="redmyu">\
			<i class="icon-{storeType}"></i><i class="icon-{shareType}"></i></div><div class="clear"></div></li>';
		$(data).each(function(i,o){
			o.url = (o.contentType=="3"?o.contentUrl:'informationfordetails.shtml?contentUuid='+o["contentUuid"]+(_isy?"&action=all":""));
			o.contentType = (o.contentType=="3"?"isopen":"");
			if(o.contentType == "isopen")console.log(o.url)
			o.storeType = (o.storeType == 1?"redstars":"greystars");
			//是否已经分享过
			o.shareType=o.shareType==0?"mycollection":"mycollection";
			o.imgUrl = o.imgUrl || "/static/imgs/spimg.png";
			if(o.contentCount==null || o.contentCount==undefined)
				o.contentCount=0;
			else
				o.contentCount = o.contentCount;
			arr.push(gm.replace(tmp,o));
		});

		// console.log(arr);
		return arr.join("");
	}

	function isOpenUrl(){
		$(".isopen").bind({
			touchend:function(e){
				e.preventDefault();
			}
		});
		$(".isopen").ontouch(function(){
				var href = $(this).find("a").attr("href");
				gm.pul.openurl(href,window._webBasePath+"html/thedoctorinformation/index.shtml");
			},true
		);
	}

var fniortlist = function(){
		
		var _contentCategoryUuid = $(this).attr("contentCategoryUuid");
		//友盟统计-临床推荐
		_czc.push(["_trackEvent","阅读","临床推荐",$(this).find("span").html(),'',_contentCategoryUuid]);
		
	};

	//绑定tab 的点击显示 列表
	$(".fniortlist div").bind({
		touchend:fniortlist
	});

	var fniortlist_au = function(){
		
		var _contentCategoryUuid = $(this).attr("contentCategoryUuid");
		//友盟统计-医学医用
		_czc.push(["_trackEvent","阅读","医学医用",$(this).find("span").html(),'',_contentCategoryUuid]);
	}

	$(".fniortlist_au div").bind({
		touchend:fniortlist_au
	});

	// var _newsid = $(this).parent().parent().attr("newsid");
	//筛选
	$(".cklamngy b").bind({
		touchend:function(){
			var _contentCategoryUuid = $(".menulist .cur").attr("contentcategoryuuid");
			var _contentName = $(this).prev().val();
			_czc.push(["_trackEvent","阅读","筛选条件",'','','cklamngy b']);
			gm.pul.toUrl( "/html/thedoctorinformation/searchresult.shtml?name="+_contentName+"&contentCategoryUuid="+_contentCategoryUuid);
			/*var _illnessId = "";
			var _symptomId = "";
			var _author = "";
			var _entity = "";
			var _country = "";
			// gm.thedoctorinformation.getSearchContentList(_contentCategoryUuid,contentName:_contentName,_illnessId,_symptomId,_author,_entity,_country);
			//友盟统计筛选
			_czc.push(["_trackEvent","阅读","筛选条件",'','','cklamngy b']);
			$.getDate({
				page:"content",
				inter:"getSearchContentList",
				data:{doctorUuid:gm.user.getDoctor(),contentCategoryUuid:_contentCategoryUuid,contentName:_contentName,illnessId:_illnessId,symptomId:_symptomId,entity:_entity,country:_country,callback:"gm.thedoctorinformation.getSearchContentList"},
				method:"POST",
				dataType:"script"
			});*/
		}
	});

	$(".cklamngy input").bind({
		keyup:function(e){
			var _event = window.event;
			if(event.keyCode == 13){
				var _contentCategoryUuid = $(".cvde .dospan").attr("contentcategoryuuid");
				var _contentName = $(this).val();
				var _illnessId = "";
				var _symptomId = "";
				var _author = "";
				var _entity = "";
				var _country = "";
				// gm.thedoctorinformation.getSearchContentList(_contentCategoryUuid,contentName:_contentName,_illnessId,_symptomId,_author,_entity,_country);
				//友盟统计-搜索
				_czc.push(["_trackEvent","阅读","搜索关键字",_contentName,'','cklamngy input']);
				$.getDate({
					page:"content",
					inter:"getSearchContentList",
					data:{doctorUuid:gm.user.getDoctor(),contentCategoryUuid:_contentCategoryUuid,contentName:_contentName,illnessId:_illnessId,symptomId:_symptomId,entity:_entity,country:_country,callback:"gm.thedoctorinformation.getSearchContentList"},
					method:"POST",
					dataType:"script"
				});
			}
		}
	});

	$(".alistodical li").bind({
		touchend:function(){
			$(this).siblings().removeClass("sanmslog");
			$(this).addClass("sanmslog");
		}
	});

	$("form").bind({
		submit:function(){
			return false;
		}
	})

/**
 * 分享调用
 */
/*$(".icon-mycollectiongray,.icon-mycollection").bind({
	touchend:function(){
		var _ = $(this);
		var p = _.parent().parent();
		var _shareUuid = $(this).parents("li").attr("contextuuid");
		var _shareType = $(this).parents("ul").attr("data");

		var obj = {
			title:p.find(".asbg .videomz h2 a").html(),//获取文章title
			desc:p.find(".asbg .videomz h2 a").html(),//获取文章desc
			img:p.find("img").attr("src"),//获取文章img
			link:window._interfacePath + "/html/thedoctorinformation/index.shtml?vidoUuid=" + p.attr("contentuuid")
		}
		
		

		gm.share(obj,function(){
			$.getDate({
				page:"patient",
				inter:"addShare",
				data:{customerUuid:gm.patient.getPatient(),shareUuid:_shareUuid,shareType:_shareType},
				callback:function(data){
					if(!data){
						$.alert("服务器出错!");
					}
					if(data.query.success=="1"){
						
					}else{
						$.alert(data.query.message);
					}
				}
			});
		});
	}
});*/
	
	
	//确定搜索
	$(".sds1 .sdnes b,#filter_btn_sure").bind({
		touchend:function(){
			$(this).siblings("button").removeClass("select_btn");
			$(this).addClass("select_btn");
			$(".fniortlist_au").find("div").removeClass("dospan");
			$(".fniortlist_au").find("div").eq($(".sanmslog").index()).addClass("dospan");
			hidesdc();
			
			var _contentCategoryUuid = $(".menulist .cur").attr("contentcategoryuuid");
			var _illnessId = ($(".illness .lan").length>0?$(".illness .lan").index() :0);
			//友盟统计-筛选条件
			if(_illnessId!=0)
				_czc.push(["_trackEvent","阅读","筛选条件",$(".illness .lan").html(),'','sds1 .sdnes b']);
			else
				_czc.push(["_trackEvent","阅读","筛选条件","全部",'','sds1 .sdnes b']);
			$.getDate({
				page:"content",
				inter:"getSearchContentList",
				data:{doctorUuid:gm.user.getDoctor(),contentCategoryUuid:_contentCategoryUuid,illnessId:_illnessId,callback:"gm.thedoctorinformation.getSearchContentList"},
				method:"POST",
				dataType:"script"
			});
		}
	});

	//搜索重置
	$("#filter_btn_reset").bind({
		touchend:function(){
			$(this).siblings("button").removeClass("select_btn");
			$(this).addClass("select_btn");
			//清除选中样式
			$(".aioerk,.suoyou_gj,.illness,.symptom,.entity").find("span").removeClass("lan");
		}
	});
	//确定搜索
	$(".sds2 .sdnes b").bind({
		touchend:function(){
			$(this).siblings("button").removeClass("select_btn");
			$(this).addClass("select_btn");
			$(".fniortlist_au").find("div").removeClass("dospan");
			$(".fniortlist_au").find("div").eq($(".sanmslog").index()).addClass("dospan");
			hidesdc();
			var _contentCategoryUuid = $(".menulist .cur").attr("contentcategoryuuid");
			// var _contentName = "";
			var _illnessId = $(".sds2 .aisieqer .lan").index();//疾病
			// var _symptomId = $(".sds2 .symptom .lan").index() + 1;//量表
			// var _entity = $(".sds2 .aioerk .lan").index() + 1;//医疗标准
			// var _author = "";
			// var _country = $(".sds2 .suoyou_gj .lan").index() + 1;//国家

			var _data = {
				doctorUuid:gm.user.getDoctor(),
				contentCategoryUuid:_contentCategoryUuid,
				illnessId:_illnessId,
				// symptomId:_symptomId,
				// entity:_entity,
				// country:_country,
				callback:"gm.thedoctorinformation.getSearchContentList"
			};
			var _illnessId=0;
			if(_contentCategoryUuid == "A"){
				_data.illnessId = ($(".sds2 .aioerk .lan").length>0?$(".sds2 .aioerk .lan").index() :0);
				_data.country = ($(".sds2 .suoyou_gj .lan").length>0?$(".sds2 .suoyou_gj .lan").index() :0);
			}else if(_contentCategoryUuid == "B"){
				_data.entity = $(".sds2 .aioerk .lan").index() ;
			}else if(_contentCategoryUuid == "C"){
				_data.symptomId = $(".sds2 .aioerk .lan").index() ;
			}
			//筛选后，确定筛选tab
			//友盟统计-医学医用-筛选条件
			
			if(_illnessId!=0)
				_czc.push(["_trackEvent","阅读","筛选条件",$(".sds2 .aioerk .lan").html(),'','sds1 .sdnes b']);
			else
				_czc.push(["_trackEvent","阅读","筛选条件","全部",'','sds1 .sdnes b']);
			window._loading = new mask("loading");
			_loading.show();
			$.getDate({
				page:"content",
				inter:"getSearchContentList",
				data:_data,
				method:"POST",
				dataType:"script"
			});
		}
	});

	//切换顶部
	$(".clinical_medical").clinical_medical_tab();

	// 显示遮罩层
	$(".cklamngy .sx1").bind({
		touchend:function(){
			showsdc(0);
			//友盟统计-打开搜索次数
			_czc.push(["_trackEvent","阅读","搜索","打开次数",'','cklamngy .sx1']);
		}
	});

	$(".cklamngy .sx2").bind({
		touchend:function(){
			showsdc(1);
			//友盟统计-打开搜索次数
			_czc.push(["_trackEvent","阅读","搜索","打开次数",'','cklamngy .sx2']);
		}
	});
	// 隐藏遮罩层
	$(".quanzdp .sdnes p").click(function(){
		hidesdc();
	});

	// 切换
	$("#read .fniortlist div").bind({
		touchend:function(){
//            console.log($(this).index());
            window.location.hash = "#a-" + $(this).index();
			$("#read .fniortlist div").removeClass("dospan");
			$(this).addClass("dospan");
			
		}
	});


	$("#read .fniortlist_au div").bind({
		touchend:function(){
            window.location.hash = "#b-" + $(this).index();
			$("#read .fniortlist_au div").removeClass("dospan");
			$(this).addClass("dospan");
			
		}
	});


}


//获取资讯列表
gm.thedoctorinformation.getAllContentList = function(_contentCategoryUuid,callback){
	gm.user.getAllContentList(_contentCategoryUuid,callback);
},
//获取资讯搜索列表
gm.thedoctorinformation.getSearchContentList = function(data){
	window._loading && _loading.hide();
	if(!data){
		$.alert("服务器出错!");
	}
	if(data.query.success=="1"){
		var arr = [];
		var box = $(".gsid_1 ul");
		var _isy = (window.location.href.indexOf("#b") > 0);
		$(data.relist).each(function(i,o){
			o.url = (o.contentType=="3" ? o.contentUrl : 'informationfordetails.shtml?contentUuid='+o["contentUuid"]+(_isy ? "&action=all" : ""));
			o.contentType = (o.contentType=="3"?"isopen":"");

			arr.push('<li class="'+o.contentType+'" contentUuid="'+o["contentUuid"]+'" favid="' + o["favoriteUuid"] + '"><div class="asbg"><div class="scvideo"><a href="'+o.url+'"><img src="'+(o["imgUrl"] || "/static/imgs/spimg.png")+'"></a></div><div class="videomz">\
			<h2><a href="'+o.url+'">'+o["contentTitle"]+'</a></h2>\
			<p class="contentcount"><span>'+(o["contentCount"]||"0")+'</span>收藏</p></div><div class="clear"></div></div><div class="redmyu">');
			if (o["storeType"] == 1) {
				arr.push('<i class="icon-redstars"></i><i class="'+(o["shareType"]==0?"icon-mycollection":"icon-mycollection")+'"></i></div><div class="clear"></div></li>');
			}else{
				arr.push('<i class="icon-greystars"></i><i class="'+(o["shareType"]==0?"icon-mycollection":"icon-mycollection")+'"></i></div><div class="clear"></div></li>');
			}
		});

		box.html(arr.join("")).collectnews();
		$(".redmyu").show();

		$(".isopen").bind({
			touchend:function(e){
				e.preventDefault();
			}
		});
		$(".isopen").ontouch(function(){
				var href = $(this).find("a").attr("href");
				gm.pul.openurl(href);
			},true
		);
	}else{
		$.alert(data.query.message);
	}
}


// 资讯详情
gm.thedoctorinformation.informationfordetails = function(){
	var _height = $(".thearticley").height();
	var _wh = $(window).height();
	var _h = $(".payatten_tiondetailed").height();
	var _b = $(".dsds").height();

	var _db = _wh - _h - _b - _wh*0.03;

	if(_height > _db){
		$(".thearticley").height(_db);
		$(".thearticley").css({
			overflow:"hidden"
		});
		$(".dsds button").css({
			display:"block"
		});
	}else{
		
	}

	// 文字详情显示
	$(".dsds button").bind({
		touchend:function(){
			$(".yxzzc").show();
		}
	});

	// 设置字体大小
	$(".mediationz-zhez .dazxinao li").bind({
		touchend:function(){
			$(".mediationz-zhez .dazxinao li").removeClass("bghs")
			$(this).addClass("bghs");

			localStorage.setItem("fontsize","");

			if ($(".mediationz-zhez .dazxinao .bghs").hasClass("shenh")){
				$(".theauthor_introduce .payatten_tiondetailed .js_introduce h2").css('font-size','.50rem');
				$(".theauthor_introduce .payatten_tiondetailed p").css('font-size','.42rem');
				$(".theauthor_introduce .thearticley p,.theauthor_introduce .thearticley span").css('font-size','.42rem');
				localStorage.setItem("fontsize",".42rem");
			}else if ($(".mediationz-zhez .dazxinao .bghs").hasClass("danh")) {
				$(".theauthor_introduce .payatten_tiondetailed .js_introduce h2").css('font-size','.54rem');
				$(".theauthor_introduce .payatten_tiondetailed p").css('font-size','.46rem');
				$(".theauthor_introduce .thearticley p,.theauthor_introduce .thearticley span").css('font-size','.46rem');
				localStorage.setItem("fontsize",".46rem");
			}else if ($(".mediationz-zhez .dazxinao .bghs").hasClass("baml")) {
				$(".theauthor_introduce .payatten_tiondetailed .js_introduce h2").css('font-size','.58rem');
				$(".theauthor_introduce .payatten_tiondetailed p").css('font-size','.50rem');
				$(".theauthor_introduce .thearticley p,.theauthor_introduce .thearticley span").css('font-size','.50rem');
				localStorage.setItem("fontsize",".50rem");
			}else{
				$(".theauthor_introduce .payatten_tiondetailed .js_introduce h2").css('font-size','.54rem');
				$(".theauthor_introduce .payatten_tiondetailed p").css('font-size','.46rem');
				$(".theauthor_introduce .thearticley p,.theauthor_introduce .thearticley span").css('font-size','.46rem');
				localStorage.setItem("fontsize",".46rem");
			};
		}
	});

    $(".shouc_set").on("touchend",function(){
        var _contentUuid = gm.para.get(window.location.href,"contentUuid");
        gm.user.addFavorite(_contentUuid,function(data){
        	
        	$.alert({
        		val:"收藏成功",
        		timer:1500,
        		type:"flash"	
        	})
        });
    });



	var contentUuid = gm.para.get(window.location.href,"contentUuid");

	if(contentUuid){
		gm.content.getContent(contentUuid,function(data){
			if(!data){
				$.alert("服务器出错!");
			}
			if(data.query.success=="1"){
				// gm.pul.setTitle(data.contentTitle)

				var obj = {
					"title":data.contentTitle,
					"desc":data.contentTitle,
					"link":gm.basePath + "/html/thedoctorinformation/informationfordetails.shtml?contentUuid=" + contentUuid
				}
				
				$(".js_introduce").html("<h2>"+data.contentTitle + "</h2>");

				$(".js_introduce").append("<p>作者：" + (data.author || "好心情") + " <b>来源：" + (data.provenance || "未知") +"</b></p>");
				$(".js_introduce").append('<p class="ond"><i class="sj">'+data.createTime+'</i><b></b></p>');
				$(".js_introduce").append('<p>'+data.contentNote+'</p>');

				// $(".thearticley p").html(data.contentNote);

				$(".thearticley").html(data.introduction || "");

				$(".thearticley table").css({
					width:"100%"
				});

				var fontsize = localStorage.getItem("fontsize") || ".46rem";
				$(".theauthor_introduce .thearticley p,.theauthor_introduce .thearticley span").css('font-size',fontsize);

				$(".fx_share").bind({
					touchend:function(){
						gm.share(obj,function(){
							$.getDate({
								page:"doctor",
								inter:"addDoctorShare",
								data:{contentUuid:contentUuid,doctorUuid:gm.user.getDoctor()},
								callback:function(data){	}
							});
						});
					}
				});
			}else{
				$.alert(data.query.message);
			}
		});
	}else{
		// gm.pul.toUrl("index.shtml");
	}
}

// 搜索
gm.thedoctorinformation.searchs = function(){
	// 遮罩层
		// 临床推荐
		$("#search1 .sx1").bind({
			touchend:function(){
				$(".sds1").addClass("sdc");
			}
		});
		// 医学医用
		$("#search2 .sx1").bind({
			touchend:function(){
				$(".sds2").addClass("sdc");
			}
		});
		// 隐藏遮罩层
		$(".quanzdp .sdnes p").click(function(){
			$(this).parent().parent().parent().parent().removeClass("sdc");
			$(this).parent().parent().parent().parent().addClass("sdc1");
		});
}