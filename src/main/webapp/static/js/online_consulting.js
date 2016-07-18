/**
 *我的患者-在线咨询 
 */

function getConsultRecord(_customerUuid){
	$.getDateAjax({
		page:"doctor",
		inter:"getConsultRecord",
		data:{customerUuid:_customerUuid},
		callback:function(data){
			
		}
	});
}

