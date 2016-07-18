$(document).ready(function(){
	$(".patients1").getcollectMeMSG(1);
	$(".patients2").getcollectMeMSG(0);
	$(".patients3").getcollectMeMSG(2);

	$(".patients1 dd,.patients2 dd,.patients3 dd").lrTouchMove();
	$("#mypatient .content").on("touchend","dt",function(){
			$(this).toggleClass("sydns");
	});
});

//发消息的患者
$.fn.getcollectMeMSG = function(_messageType){
	var _submitObj = $(this).parent();
	var _ = this;
	var _l = $("<div></div>").append($(this).find("dt").clone()).html();

	$.getDate({
		page:_submitObj.attr("page"),
		inter:_submitObj.attr("inter"),
		data:{messageType:_messageType,doctorUuid:gm.user.getDoctor()},
		callback:function(data){
			if(!data){
				$.alert("服务器出错!");
			}
			if(data.query.success){
				var arr = [];

				$(data.relist).each(function(i,o){
					arr.push('<dd customerUuid="'+o["customerUuid"]+'"><div class="newszu"><div class="head_portrait"><img src="'+o["image"]+'"></div><div class="nagent">\
					<div class="duof"><h3><b>'+o["sendName"]+'</b><i class="icon-boy"></i></h3><span>年龄：36岁</span><b class="date">'+o["sendTime"]+'</b>\
					</div><p class="comment">'+o["showContent"]+'</p></div></div><div class="kua_scnut">\
					<div class="ndh"><i class="icon-mycoltrash"></i></div>\
					<div class="ndh ndh2"><i class="icon-grxxn"></i></div>\
					</div></dd>');
				});

				// $("#mypatient .content dt").bind({
				// 	touchend:function(){
				// 		$(this).toggleClass("sydns");
				// 	}
				// });

				_.html(_l + arr.join(""));

				$(".patients1 dd,.patients2 dd,.patients3 dd").lrTouchMove();

				$("#mypatient .ndh2").bind({
					touchend:function(){
						var _o = $(this).parent().parent().attr("customerUuid");
						gm.pul.toUrl( "/html/follow_up/mobile_packet.shtml?customerUuid="+_o);
					}
				})
			}else{
				$.alert(data.query.message);
			}
			
			
		}
	});
}

