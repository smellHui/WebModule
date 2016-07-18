$(document).ready(function(){

	gm.refer = gm.refer || {};

	gm.refer.index = function(){
	    	window._loading = new mask("loading");
		window._loading.show();
		$.getDate({
			page:"patient",
			inter:"getAllQuizCategory",
			data:{},
			callback:function(data){
				//服务器传输回应
				if(!data){
					$.alert("服务器出错!");
				}
				if(data.query.success=="1"){
					window._loading.hide();

					var arr = [];
					$(data.relist).each(function(i,o){
						arr.push('<li><a href="/patient/refer/intheheart.shtml?quizCategoryUuid='+o["quizCategoryUuid"]+'" style="height:100%;width:100%;display:block"><i class="pts-depressiontest"></i><span>'+o["quizCategoryName"]+'</span></a></li>');
					})
					$(".shecndmya ul").html(arr.join(""));
					gm.pul.returnurl = function(){
						gm.pul.toUrl('/patient/index/page.shtml')					
					}
				}else{
					$.alert(data.query.message);
				}
			}
		});
	}

	gm.refer.intheheart = function(){
	    	window._loading = new mask("loading");
		window._loading.show();

		var _quizCategoryUuid = gm.para.get(window.location.href,"quizCategoryUuid");
		$.getDate({
			page:"patient",
			inter:"getQuizCategory",
			data:{quizCategoryUuid:_quizCategoryUuid},
			callback:function(data){
				window._loading.hide();
				//服务器传输回应
				if(!data){
					$.alert("服务器出错!");
				}
				if(data.query.success=="1"){
					$(".tenamethead .yiyu h2").html(data.categoryName);

					gm.pul.setTitle(data.categoryName);

					$(".questionumber p").html("填写说明：" + (data.fillExplain || ""))

					$(".the_titlea p").html(data.note);
					$(".questionumber i").html("题数: "+data.quizNum+"题");
					$(".dvimg img").attr("src",data.imageUrl);
					$(".start a").attr("href","/patient/refer/testsubjectsa.shtml?quizCategoryUuid="+_quizCategoryUuid);
					gm.pul.returnurl = function(){
						gm.pul.toUrl('/patient/refer/index.shtml')
					}
				}else{
					$.alert(data.query.message);
				}
			}
		});
	}

	gm.refer.testsubjectsa = function(){
		var _quizCategoryUuid = gm.para.get(window.location.href,"quizCategoryUuid");
		var _o = 0;
		var _i = 1;
		var _num = 0;
		$.getDate({
			page:"patient",
			inter:"getAllQuiz",
			data:{quizCategoryUuid:_quizCategoryUuid},
			callback:function(data){
				//服务器传输回应
				if(!data){
					$.alert("服务器出错!");
				}
				if(data.query.success=="1"){
					var arr = [];
					$(".ask_questions span").html(_i+"."+data.relist[_o].quizTitle);
					$(".dig_device i span").html(_i);
					$(".dig_device i b").html(data.relist.length);
					var _arr = ["A","B","C","D","E","F","G","H","I","J","K","M"];
					$(data.relist[_o].options).each(function(i,o){
						var _l = _arr[i];
						arr.push('<li optionValue="'+o["optionValue"]+'" optionUuid="'+o["optionUuid"]+'"><a>'+_l+'.  '+o["optionTitle"]+'</a></li>');
					})
					$(".options ul").html(arr.join(""));
					gm.pul.returnurl = function(){
						gm.pul.toUrl('/patient/refer/index.shtml')
					}
				}else{
					$.alert(data.query.message);
				}
			}
		});

		$(".options").on("touchend","li",function(){
				_o += 1;
				_i += 1;
				_num = _num*1 + $(this).attr("optionValue")*1;
				$.getDate({
					page:"patient",
					inter:"getAllQuiz",
					data:{quizCategoryUuid:_quizCategoryUuid},
					callback:function(data){
						//服务器传输回应
						if(!data){
							$.alert("服务器出错!");
						}
						if(data.query.success=="1"){
							if (data.relist.length == _o) {
								gm.pul.toUrl( "/patient/tools/test_results.shtml?quizCategoryUuid="+_quizCategoryUuid+"&score="+_num);
							};

							var arr = [];
							$(".dig_device i span").html(_i);
							$(".dig_device i b").html(data.relist.length);
							$(".ask_questions span").html(_i+"."+data.relist[_o].quizTitle);

							var _arr = ["A","B","C","D","E","F","G","H","I","J","K","M"];
							$(data.relist[_o].options).each(function(i,o){
								var _l = _arr[i];
								arr.push('<li optionValue="'+o["optionValue"]+'" optionUuid="'+o["optionUuid"]+'"><a>'+_l+'.  '+o["optionTitle"]+'</a></li>');
							});

							$(".options ul").html(arr.join(""));
						}else{
							$.alert(data.query.message);
						}
					}
				});
		});
	}

	//测试结果
	gm.refer.results = function(){
		var quizCategoryUuid = gm.para.get(window.location.href,"quizCategoryUuid");
		var score = gm.para.get(window.location.href,"score");
		// var _customerUuid = gm.para.get(window.location.href,"customerUuid");

		if(quizCategoryUuid){
			$("#reset").attr("href","/patient/refer/intheheart.shtml?quizCategoryUuid=" + quizCategoryUuid);
			$.getDate({
				page:"test",
				inter:"getQuizResult",
				data:{customerUuid:gm.patient.getPatient(),quizCategoryUuid:quizCategoryUuid,score:score},
				callback:function(data){
					if(!data){
						$.alert("服务器出错!");
					}
					if(data.query.success=="1"){
						var tmp = '<li>\
								<div class="doctor">\
									<a href="/patient/home/thedoctorlistdetails.shtml?doctorUuid={doctorUuid}"></a>\
									<div class="icon1">\
										<img src="{img}">\
									</div>\
									<div class="p_fbjn">\
										<h3><span>{doctorName}</span><i class="pts-figureinsets"></i></h3>\
										<p>{hospitalName}</p>\
									</div>\
									<div class="p_yvbu">\
										<p class="p_hjf">{professional}</p>\
										<p>{departmentName}</p>\
									</div>\
									<div class="p_jlfk">\
					                    <p>服务人次:</p>\
					                    <p>{serviceCount}</p>\
					                </div>\
								</div>\
								<div class="menu">\
									<a href="/patient/home/teleconsult_1.shtml?doctorUuid={doctorUuid}"><i class="zys-phone{telState}"></i><span>电话咨询</span></a>\
									<a href="/patient/my_doctor/communicate_patient.shtml?doctorUuid={doctorUuid}"><i class="zys-wndsx{teletext}"></i><span>图文咨询</span></a>\
									<a href="/patient/home/thedoctorappointmentplus.shtml?doctorUuid={doctorUuid}"><i class="zys-dcsos{plus}"></i><span>预约加号</span></a>\
									<a href="/patient/home/package.shtml?doctorUuid={doctorUuid}"><i class="zys-grqxs{personal}"></i><span>私人医生</span></a>\
								</div>\
							</li>';

						$(".p_dfdf span").html(score);
						$(".p_bnjv b").html(data.quizResult);
						$("._fjb0 .p_nfjd").html(data.quizResultNote);

						$(data.relist).each(function(i,o){
							o.telState = (o.telState || 0)*1 + 1;
							o.teletext = (o.teletext || 0)*1 + 1;
							o.plus = (o.plus || 0)*1 + 1;
							o.personal = (o.personal || 0)*1 + 1;
							o.img = o.img || window.___defaultImage;

							o.professional = window.___professional[o.professional*1];

							$("#test_results div ul").append(gm.replace(tmp,o));
						});
					}else{
						$.alert(data.query.message);
					}
				}
			});
		}else{
			$.alert("参数错误");
			return;
		}
		
	}

	gm.refer.refer_soul = function(){
		//用户登录判断，没登录，跳转登录页面
		//gm.user.vcLogin();
		
		/*$(".help .dserfa").bind({
			touchend:function(){
				$(".xlybtcc").show();
			}
		});
*/
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
		function onhash(){
		    var _hash = window.location.hash.substr(1);
		    $(".conti div h2").removeClass("dserfa");
		    if(_hash=="b"){//在线视频
		    	$(".all").find("h2").addClass("dserfa");
		    	$(".list1").hide();
				$(".list2").show();
		    	getVideos();
		    }else{//心理自助
		    	$(".help").find("h2").addClass("dserfa");
		    	$(".list2").hide();
				$(".list1").show();
		    	getHeartContextList();
		    }
		}
		onhash();
		$(window).on("hashchange",onhash);
		

		

		function getHeartContextList(){
			//获取心灵自助
			$.getDateAjax({
				page:"patient",
				inter:"getHeartContentList",
				data:{customerUuid:gm.patient.getPatient(),contentCategoryUuid:"c36daf82d7ff43ab847f2ecef5a8f03e"},
				callback:function(data){
					//服务器传输回应
					if(!data){
						$.alert("服务器出错!");
					}
					if(data.code==200){
						var arr = [];
						$(data.value).each(function(i,o){
							arr.push('<li contextUuid="'+o["uuid"]+'" author="'+o["author"]+'" favoriteUuid="'+o["favoriteUuid"]+'" provenance="'+o["provenance"]+'">\
									<a class="dsu" href="/html/thedoctorinformation/informationfordetails.shtml?contentUuid='+o["uuid"]+'&from=patientrefer"></a>\
									<div class="asbg">\
										<div class="scvideo">\
											<img src="'+(o.img.large)+'">\
										</div>\
										<div class="videomz text">\
											<h2>'+o["contentTitle"]+'</h2>\
										</div>\
										<div class="clear"></div>\
									</div>\
									<div class="ics">');
							if (o["foucsState"] == "1") {
								arr.push('<i class="icon-redstars">\
										</i><i class="pts-greencollection"></i>');
							}else{
								arr.push('<i class="icon-greystars"></i><i class="pts-greencollection"></i>');
							}
							arr.push('</div>\
									<div class="clear"></div>\
								</li>');
						});
						$(".list1").html(arr.join(""));

						$(".list1 .pts-greencollection").bind({
							touchend:function(){
								var _ = $(this);
								var p = _.parent().parent();
								var _shareUuid = $(this).parents("li").attr("contextuuid");
								var _shareType = $(this).parents("ul").attr("data");

								var obj = {
									title:p.find(".text h2").html(),
									desc:p.find(".text h2").html(),
									img:p.find("img").attr("src"),
									link:window._interfacePath + "/html/thedoctorinformation/informationfordetails.shtml?contentUuid=" + p.attr("contextuuid")
								}

//								gm.share(obj,function(){
//									$.getDate({
//										page:"patient",
//										inter:"addShare",
//										data:{customerUuid:gm.patient.getPatient(),shareUuid:_shareUuid,shareType:1},
//										callback:function(data){
//											if(!data){
//												$.alert("服务器出错!");
//											}
//											
//											if(data.query.success=="1"){
//												
//											}else{
//												$.alert(data.query.message);
//											}
//										}
//									});
//								});
								gm.share(obj,function(){
									
								});
							}
						});
					}else{
						$.alert(data.query.message);
					}
				}
			});
		}
		function getVideos(){
			//获取在线视频
			$.getDateAjax({
				page:"patient",
				inter:"getVideos",
				data:{customerUuid:gm.patient.getPatient()},
				method:"POST",
				callback:function(_data){
					gm.refer.getVideos(_data);
				}
			});
		}
		
		// 列表切换
		$(".conti div").bind({
			touchend:function(){
				$(".conti div h2").removeClass("dserfa");
				$(this).find("h2").addClass("dserfa");

				var _s = $(".conti .help").find("h2").hasClass("dserfa");
				if (!_s) {
					$(".list1").hide();
					$(".list2").show();
					window.location.hash = "#b";
				}else{
					$(".list2").hide();
					$(".list1").show();
					window.location.hash = "#a";
				};
			}
		});
		
		//收藏
		$(".alllive ul").on("touchend",".icon-greystars,.icon-redstars",function(){
			var _o = $(this).hasClass("icon-redstars");
			if (_o) {
				$(this).attr("class","icon-greystars");
				//$(this).siblings().attr("class","pts-greencollection");
				var _p = $(this).parents("li").attr("favoriteUuid");
				//$(this).find("p").hide();
				//var _k = $(this).find("p").attr("foucsNum");
				//$(this).find("p").html(parseInt(_k));
				$.getDate({
					page:"doctor",
					inter:"delFavorite",
					data:{favoriteUuid:_p},
					callback:function(data){
						//服务器传输回应
						if(!data){
							$.alert("服务器出错!");
						}
						if(data.query.success=="1"){
							console.log("删除成功!");
						}else{
							$.alert(data.query.message);
						}
					}
				});
			}else{
				$(this).attr("class","icon-redstars");
				var _p = $(this).parents("li").attr("contextUuid");
				var _k = $(this);
				var _f = $(this).parents("ul").attr("class");
				_f = _f.substr(_f.length-1,1)
				$(this).find("p").show();
				//var _s = _k.find("p").text();
				//_k.find("p").html(parseInt(_s)+1);
				$.getDate({
					page:"patient",
					inter:"addFavorite",
					data:{customerUuid:gm.patient.getPatient(),newsid:_p,favoriteType:_f},
					callback:function(data){
						//服务器传输回应
						if(!data){
							$.alert("服务器出错!");
						}
						if(data.query.success=="1"){
							// $(this).attr("favoriteUuid",data.favoriteUuid);
							_k.parents("li").attr("favoriteUuid",data.favoriteUuid);
						}else{
							$.alert(data.query.message);
						}
					}
				});
			}
		})
		
		
	}
	//在线视频回调
	gm.refer.getVideos = function(data){
		//服务器传输回应
		if(!data){
			$.alert("服务器出错!");
		}
		if(data.code==200){
			var arr = [];
			var _p = "";
//			<p class="care">{collectNum}</p>\
			var tmp='<li contextUuid="{uuid}" favoriteUuid="{favoriteUuid}">\
				<a class="dsu" href="/html/lecture/playing.shtml?from=refer_soul&vidoUuid={uuid}"></a>\
				<div class="live">\
					<img src="{img}">\
				</div>\
				<div class="text">\
					<p>{_p}:{title}</p>\
				</div>\
				<div class="ics">\
				<i class="icon-{storeType}">\
				</i>\
				<i class="pts-greencollection"></i>\
				</div>\
			</li>';
			$(data.value.relist).each(function(i,o){
				o._p=o.videoType=="1"?"预告":"正在直播";
				o.storeType=o.sc=="1"?"redstars":"greystars";
				arr.push(gm.replace(tmp,o));
			});
			$(".list2").html(arr.join(""));
			var setT = null;
			//分享
			$(".list2 .pts-greencollection").bind({
				touchend:function(){
					var _ = $(this);
					var p = _.parent().parent();
					var _shareUuid = $(this).parents("li").attr("contextuuid");
					var _shareType = $(this).parents("ul").attr("data");

					var obj = {
						title:p.find(".text p").html(),
						desc:p.find(".text p").html(),
						img:p.find("img").attr("src"),
						link:window._interfacePath + "/html/lecture/playing.shtml?vidoUuid=" + p.attr("contextuuid")
					}

					gm.share(obj,function(){
//						$.getDate({
//							page:"patient",
//							inter:"addShare",
//							data:{customerUuid:gm.patient.getPatient(),shareUuid:_shareUuid,shareType:_shareType},
//							callback:function(data){
//								if(!data){
//									$.alert("服务器出错!");
//								}
//								if(data.query.success=="1"){
//									
//								}else{
//									$.alert(data.query.message);
//								}
//							}
//						});
					});
				}
			});
		}else{
			$.alert(data.message);
		}
	}
});