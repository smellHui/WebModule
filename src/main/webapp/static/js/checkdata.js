/***校验data,校验所有的信息js qq，手机，邮箱 身份证信息等***/
/**
 * 邮箱校验
 */
function CheckMail(mail){
	var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	 if (filter.test(mail)) 
		 return true;
	 else {
		 return false;
	 }
}
/**
 * 校验身份证信息
 */
function IdentityCodeValid(code){
	var returnarr={};
	 var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
	    var tip = "";
	    var pass= true;
	    
	    if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
	        tip = "身份证号格式错误";
	        pass = false;
	    }
	    
	   else if(!city[code.substr(0,2)]){
	        tip = "地址编码错误";
	        pass = false;
	    }
	    else{
	        //18位身份证需要验证最后一位校验位
	        if(code.length == 18){
	            code = code.split('');
	            //∑(ai×Wi)(mod 11)
	            //加权因子
	            var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
	            //校验位
	            var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
	            var sum = 0;
	            var ai = 0;
	            var wi = 0;
	            for (var i = 0; i < 17; i++)
	            {
	                ai = code[i];
	                wi = factor[i];
	                sum += ai * wi;
	            }
	            var last = parity[sum % 11];
	            if(parity[sum % 11] != code[17]){
	                tip = "校验位错误";
	                pass =false;
	            }
	        }
	    }
	    returnarr['tip']=tip;
	    returnarr['pass']=pass;
	    return returnarr;
}
/**
 * 校验qq
 * @param qq
 */
function checkqq(qq){
	if(qq && !/^\d{5}/.test(qq)){
		return;true;
	}
	return false;
}
/**
 * 校验手机号
 * @param number
 */
function mobileNum(number){
	if(!/^1\d{10}/.test(number)){
		return true;
	}
	return false;
	
}