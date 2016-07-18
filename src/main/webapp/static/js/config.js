window._interfacePath = "http://admin.hxqydyl.com";//http://admin.hxqydyl.com//http://172.168.1.46:8080
window._webBasePath = "http://"+window.location.host+"/";
window.___professional = ["职称","主任医师","副主任医师","主治医师","住院医师","助理医师","实习医师"];
window.___isStart=["不是首发","首发"];
window.___isMarry=["请选择婚姻状态","已婚","未婚","离异"];
window.___defaultImage = window._interfacePath+"/static/imgs/default_head1.png";
window.___defaultImage_d_woman=window._interfacePath+"/static/imgs/default_head1.png";
window.___defaultImage_p_man = window._interfacePath+"/static/imgs/man2.png";//http://app.hxqydyl.com
window.___defaultImage_p_woman = window._interfacePath+"/static/imgs/woman2.png";//
window.___dosage = ["粒","袋","mg","ml"];
window.___orderMsg = ["","等待买家付款","订单取消","已支付(待审核)","待执行（审核通过）","待回访","已完成","转动态订单","已拒绝"];

var _pageConfig = {
	"public":{
		//2.5.1.1 获取省
		"getProvince":"/app/service/doctor/getProvince",
		//2.5.1.2 获取城市
		"getCity":"/app/service/doctor/getCity",
		//2.5.1.3 获取区县
		"getRegion":"/app/service/doctor/getRegion",
		//2.6.1.1 获取医院
		"getHospital":"/app/service/doctor/2.0/getHospital",
		//2.6.1.2 获取科室
		"getDepartment":"/app/service/doctor/getDepartment",
		//2.14.1.1 意见反馈
		"saveFavorite":"/app/pub/doctor/1.0/saveOpinion",
		//根据关键字获取药品列表
		"getProductMainListByName":"/app/supports/1.0/getProductMainList",
		//获取药品详情
		"getProductMainByid":"/app/supports/1.0/getProductMain",
		//3.1.1.8 获取医生详情的接口
		"getDoctorDetail":"/app/service/customer/getDoctorDetail",
		//发送消息
		"saveConsultRecord":"/app/customer/patient/saveConsultRecord"
	},
	"user":{
		//2.3.1.4 完善用户图片信息
		"saveUserIconList":"/app/service/doctor/saveUserIconList",
		//2.3.1.1 手机获取验证码 ok
		"verification": "/app/pub/doctor/getVerificationCode",
		//2.3.1.2 注册新用户  ok
		"reg": "/app/pub/doctor/registerOne",
		//2.3.1.3 注册新用户第二步 ok
		"infoup": "/app/pub/doctor/registerTwo",
		//2.3.1.4 注册第三步 ok
		"registerThree":"/app/pub/doctor/registerThree",
		//2.2.1.2 退出接口
		"logout": "/app/pub/doctor/staffOutOf",
		//2.2.1.1 登录接口
		"login": "/app/pub/doctor/2.0/gotoLogin",
		//2.3.1.6 上传图片到服务器
		"uploadIcon":"/app/pub/doctor/uploadIconCallback?callback=gm.pul.upimgbind",
		//2.4.1 修改密码
		"uppwd":"/app/pub/doctor/updatePassword",
		//2.15.1.9 查询患者常用项列表接口
		"getCustomerCommonList":"/app/service/customer/getCustomerCommonList",
		//2.15.1.10 添加患者常用项的接口
		"addCustomerCommon":"/app/service/customer/addCustomerCommon",
		//2.15.1.11 删除患者常用项的接口
		"deleteCustomerCommon":"/app/service/customer/deleteCustomerCommon",
		//2.15.2.1 通过手机号获得患者信息
		"getCustomerByMobile":"/app/service/customer/getCustomerByMobile",
		//2.15.2.2 添加患者,并返回创建的病历,及患者信息
		"addCustomer":"/app/service/customer/addCustomer",
		//2.15.2.3 添加主诉
		"addMainsuit":"/app/service/customer/addMainsuit",
		//2.15.2.4 添加基本检查
		"addBasicCheck":"/app/service/customer/addBasicCheck",
		//2.15.2.5 添加诊断
		"addDiagnosis":"/app/service/customer/addDiagnosis",
		//2.15.2.6 修改患者分组
		"updateCustomerGroup":"/app/service/customer/updateCustomerGroup",
		//2.15.2.7 删除患者分组
		"deleteCaseGroup":"/app/service/customer/deleteCaseGroup",
		//2.15.2.8 添加患者分组信息
		"addCaseGroup":"/app/service/customer/addCaseGroup",
		//2.15.2.9 患者分组列表获取
		"getCaseGroupByDoctorId":"/app/service/customer/1.0/getCaseGroupByDoctorId",
		//2.15.3.3 根据图片库分类id获取图片list
		"getMedicalImg":"/app/service/customer/getMedicalImg",
		//2.15.3.4 获取患教分类
		"getCustomerTeachType":"/app/service/tools/getCustomerTeachType",
		//2.15.3.5 获根据患教id获取患教文章信息
		"getCustomerTeach":"/app/service/tools/getCustomerTeach",
		//2.15.3.6 医生推荐文章给患者
		"createDocCusCon":"/app/service/tools/createDocCusCon",
		//2.16.1.1 通过医生id和分组id获取患者列表
		"getCustomerListByDoctorUuidAndGroupId":"/app/service/customer/getCustomerListByDoctorUuidAndGroupId",
		//2.16.1.2 通过医生id获取患者列表
		"getCustomerListByDoctorUuid":"/app/service/customer/getCustomerListByDoctorUuid",
		//2.16.1.3 获取患者信息
		"getCustomerByCostomerUuid":"/app/service/customer/getCustomerByCostomerUuid",
		//2.16.1.4 删除患者信息
		"deleteCustomerByCostomerUuidAndGid":"/app/service/customer/deleteCustomerByCostomerUuidAndGid",
		//2.16.1.5 获取病历详细信息
		"getMedicalRecordByMedicalRecordUuid":"/app/service/customer/getMedicalRecordByMedicalRecordUuid",
		//2.16.1.6 创建病历信息
		"addOutHallMedicalRecord":"/app/service/customer/addOutHallMedicalRecord",
		//2.17.1.1 获取积分
		"getNowIntegral":"/app/service/doctor/getNowIntegral",
		//用户修改头像 callback=&doctorUuid=&image=
		"updateImg":"/app/service/doctor/updateImg",
		//用户邀请同行 mobiles doctorUuid
		"invitePeer":"/app/pub/doctor/invitePeer",
		//获取患者信息
		"getCustomer":"/app/service/customer/getCustomer",
		//2.17.3.13根据医生的id获取医生的邮箱
		"getDoctorEmail":"/app/pub/doctor/1.0/getDoctorEmail",
		//2.17.3.14添加获取全文接口
		"addContentList":"/app/pub/doctor/addContentList",
		//忘记密码获取验证码 - 医生端
		"getForgetPassword":"/app/pub/doctor/getForgetPassword"
	},
	"content":{
		//2.19.1 获取资讯列表
		"getAllContentList":"/mobile/doctor/content/1.0/getAllContentList",
		//2.20.1 获取阅读搜索列表
		"getSearchContentList":"/mobile/doctor/content/1.0/getSearchContentList",
		//2.15.3.1 根据分类id获取文章列表
		"getContentList":"/app/service/tools/1.0/getContentList",
		//2.15.3.2 根据文章id获取文章信息
		"getContent":"/mobile/doctor/content/1.0/getContent",
		//上传图像
		"uploadimg":"/app/support/common/1.0/uploadimg",
		"getFeedback":"/app/customer/patient/2.0/getMobile"
	},
	"doctor":{
		//2.4.1.1 获取医生轮播图广告的接口 
		"getDoctorPlatAd":"/app/pub/doctor/getDoctorPlatAd",
		//2.17.1.2 获取积分明细
		"getNowIntegralDetail":"/app/service/doctor/getNowIntegralDetail",
		
		//2.21.1 讲堂首页焦点图
		"getPlatformPic":"/app/pub/doctor/2.0/getPlatformPic",
		//2.21.2 获取讲堂列表信息
		"getVideosByName":"/app/service/doctor/1.0/getVideosByName",
		//2.21.3 获取讲堂详细信息
		"getVideoByUuid":"/app/service/doctor/1.0/getVideoByUuid",
		//2.21.4 添加视频评论
		"addPlatformCommunication":"/app/service/doctor/1.0/addPlatformCommunication",
		//2.21.5 获取视频评论
		"getCommunicationList":"/app/service/doctor/1.0/getCommunicationList",

		
		//获取医生信息
		"getDoctorInfo":"/app/service/doctor/getDoctorInfo",
		// 获取医生信息2.0
		"getDoctorDetail":"/app/customer/patient/2.0/getDoctorDetail",
			
		//2.7.1.1 获取未读消息数量
		"getServiceStaffMessage":"/app/service/doctor/getServiceStaffMessage",
		//2.7.1.2 获取消息列表
		"getcollectMeMSG":"/app/service/doctor/getcollectMeMSG",
		//2.8.1.1 获取任务（咨询）数量
		"getServiceStaffMission":"/app/service/doctor/getServiceStaffMission",
		//2.8.1.2 获取任务（咨询）列表
		"getConsultRecordMSG":"/app/service/doctor/getConsultRecordMSG",
		//2.9.1.1 系统信息开关设置
		"updateDoctorRight":"/app/pub/doctor/updateDoctorRight",
		//2.10.1.1 获取我的收藏
		"getFavoriteModelList":"/app/pub/doctor/1.0/getFavoriteModelList",
		//2.11.1.1 设置收藏
		"addFavorite":"/app/pub/doctor/1.0/addFavorite",
		//2.12.1.1 删除收藏
		"delFavorite":"/app/pub/doctor/1.0/delFavorite",
		//2.13.1.1 更改手机号码
		"updateServicestaffMobile":"/app/pub/doctor/updateServicestaffMobile",
		//2.15.1.1 获取随访列表
		"getVisitApplyList":"/app/pub/doctor/getVisitApplyList",
		//2.15.1.2 获取随访详细信息
		"getApplyDetail":"/app/pub/doctor/getApplyDetail",
		//2.15.1.3 获取所有医生的随访列表方案
		"getAllVisitPreceptList":"/app/pub/doctor/getAllVisitPreceptList",
		//2.15.1.4 医生同意并关联患者
		"addVisitRecord":"/app/pub/doctor/addVisitRecord",
		//医生修改患者 随访方案 customerUuid visitPreceptUuid doctorUuid
		"updateVisitRecord":"/app/pub/doctor/updateVisitRecord",
		//2.15.1.5 医生拒绝关联患者
		"refuseVivistApply":"/app/pub/doctor/refuseVivistApply",
		//2.15.1.6 医生添加方案接口
		"addVisitPrecept":"/app/pub/doctor/addVisitPrecept",
		//2.15.1.7 查看随访方案详情接口
		"visitPreceptDetail":"/app/pub/doctor/visitPreceptDetail",
		//2.15.1.8 医生编辑方案接口
		"editVisitPrecept":"/app/pub/doctor/editVisitPrecept",
		//2.22.1 获取医生绑定的所有的银行卡信息
		"getAllDoctorBank":"/app/pub/doctor/getAllDoctorBank",
		//2.22.2 删除绑定医生的银行卡的接口
		"delDoctorBank":"/app/pub/doctor/delDoctorBank",
		//2.22.3 编辑绑定医生的银行卡的接口
		"updateDoctorBank":"/app/pub/doctor/updateDoctorBank",
		//2.22.4 绑定医生的银行卡接口
		"addDoctorBank":"/app/pub/doctor/addDoctorBank",
		//2.22.5 获取医生公告列表的接口
		"getAllDoctorNoticeList":"/app/pub/doctor/getAllDoctorNoticeList",
		//2.22.6 查看医生公告详情的接口
		"getDoctorNoticeDetail":"/app/pub/doctor/getDoctorNoticeDetail",
		//2.22.7 添加医生公告的接口
		"addDoctorNotice":"/app/pub/doctor/addDoctorNotice",
		//2.22.8 医生权限修改
		"updateDoctorRight":"/app/pub/doctor/updateDoctorRight",
		//2.22.9 医生权限查看
		"getDoctorRight":"/app/service/doctor/getDoctorRight",
		//2.22.10 查看私人医生权限
		"getPackageDoctor":"/app/service/doctor/getPackageDoctor",
		//2.22.11 私人医生权限修改
		"updatePackageDoctor":"/app/service/doctor/updatePackageDoctor",
		//获取我的预约课程
		"getAllDoctorPlatformApplyList":"/app/pub/doctor/getAllDoctorPlatformApplyList",
		//查看医生提取账单
		"getWithdraApply":"/app/service/doctor/getWithdraApply",
		//查看医生收入账单
		"getOrderRouting":"/app/service/doctor/getOrderRouting",
		//医生收入 余额
		"getAllDoctorIncomeList":"/app/pub/doctor/getAllDoctorIncomeList",
		//获取诊所的收入
		"getAllTelephoneCounse":"/app/pub/doctor/getAllTelephoneCounse",
		//保存电话咨询设置
		"saveOrUpdateTelephoneCounse":"/app/pub/doctor/saveOrUpdateTelephoneCounse",
		//删除电话咨询
		"deleteTelephoneCounse":"/app/pub/doctor/deleteTelephoneCounse",
		//获取所有咨询费用
		"getAllTeleCost":"/app/pub/doctor/getAllTeleCost",
		//这是获取所有咨询时长
		"getAllTeleTime":"/app/pub/doctor/getAllTeleTime",
		//出诊时间列表
		"getHomeVisitSet":"/app/service/doctor/getHomeVisitSet",
		//删除出诊时间
		"deleteHomeVisitSet":"/app/service/doctor/deleteHomeVisitSet",
		//删除随访方案
		"delPreceptDetail":"/app/pub/doctor/delPreceptDetail",
		//修改出诊状态
		"updateHomeVisitSet":"/app/service/doctor/updateHomeVisitSet",
		//添加出诊时间
		"addHomeVisitSet":"/app/service/doctor/addHomeVisitSet",
		//服药记录
		"getDoctorAdviceModelByVisitRecordUuid":"/app/service/customer/getDoctorAdviceModelByVisitRecordUuid",
		//睡眠情况，进食情况，其他情况，其他检查结果
		"getVisitPreceptExtendList":"/app/pub/doctor/getVisitPreceptExtendList",
		//群发通知
		"addInnerMessage":"/app/service/customer/addInnerMessage",
		//获取医生手机号，根据医生ID
		"getMobileByCustomerUuid":"/app/service/doctor/getDoctorMobile",
		//获取所有标签的接口
		"getTags":"/app/service/doctor/getTags",
		//添加标签接口
		"addTag":"/app/service/doctor/addTag",
		//查询出诊时间
		"getPlusConfs":"/app/service/doctor/getPlusConfs",
		//"修改预约加号
		"updatePlusHome":"/app/service/doctor/updatePlusHome",
		//"修改预约加号类型
		"updateDoctorTag":"/app/service/doctor/updateDoctorTag",
		//获取医生资质认证图片
		"getIconList":"/app/service/doctor/getIconList",
		//获取电话咨询详细信息
		"getAllTelephoneTime":"/app/pub/doctor/getAllTelephoneTime",
		//医生结束图文咨询
		"overConsultRecord":"/app/customer/patient/overConsultRecord",
		//病历关联随访方案
		"addMedicalRecord":"/app/pub/doctor/addMedicalRecord",
		//预约加号详情
		"getConsultRecord":"/app/service/doctor/getConsultRecord",
		//修改患者申请的预约加号的状态 
		"updateConsultRecordPlusState":"/app/service/customer/updateConsultRecordPlusState",
		//更新私人医生、电话咨询是否托管给好心情审核接口  doctorid：医生id  state：私人医生托管审核 0：未开通 1：开通 type  1：电话咨询  2：私人套餐
		"updatePersonalExam":"/app/pub/doctor/updatePersonalExam",
		//获取私人医生，电话咨询是否托管给好心情审核接口 doctorid：医生id  ：开通 type  1：电话咨询  2：私人套餐  return state：私人医生托管审核 0：未开通 1
		"getExam":"/app/pub/doctor/getExam",
		//获取随访的医生健康医嘱
		"getHealthGuides":"/app/customer/patient/getHealthGuides",
		//获取电话咨询列表
		"getOrderList":"/app/service/doctor/getOrderList",
		//电话咨询审核&拒绝
		"checkOrder":"/app/customer/order/checkOrder",
		//重要医嘱
		"updateDoctorAdvice":"/app/service/customer/updateDoctorAdvice",
		//2.20.2 医生添加分享的接口
		"addDoctorShare":"/app/pub/doctor/addDoctorShare",
		//获取随访中诊断信息. 参数customerUuid 
		"getIllnessDescription":"/app/customer/patient/getIllnessDescription",
		//保存随访中诊断信息 参数customerUuid illnessDescription
		"saveIllnessDescription":"/app/customer/patient/saveIllnessDescription",
		//我的患者列表
		"getPatientGrops":"/app/service/customer/2.0/getPatientGrops",
		//医生端通过订单主键查看订单详情
		"getOrderMainDetail":"/app/customer/order/getOrderMainDetail",
		//医生端获取医生详细信息
		"getServiceStaffInfo":"/app/pub/doctor/2.0/getServiceStaffInfo",
		//修改医生个人信息
		"insertServiceStaffMessage":"/app/pub/doctor/2.0/insertServiceStaffMessage",
		//已读消息 记录减1
		"getConsultRecord":"/app/service/customer/2.0/getConsultRecord"
			
	},
	"clinic":{
	},
	//患者端
	"patient":{
		//2.1.3 患者端手机获取验证码
		"getVerificationCode":"/app/customer/user/getVerificationCode",
		//2.1.5 患者端注册第一步
		"registerOne":"/app/customer/user/registerOne",
		//2.1.6 患者端注册第二步
		"registerTwo":"/app/customer/user/registerTwo",
		//2.1.4 患者端患者登录接口
		"gotoLogin":"/app/customer/user/gotoLogin",
		//3.1.1.6 获取患者首页今日推荐接口
		"getTodayContent":"/app/customer/patient/getTodayContent",
		//2.2.1.4 获取所有的健康指导
		"getAllHealthGuide":"/app/customer/patient/getAllHealthGuide",
		//获取全部重要医嘱
		"getAllDoctorAdvice":"/app/customer/patient/getAllDoctorAdvice",
		//2.2.1.1 获取患者的重要医嘱列表
		"getDoctorAdviceList":"/app/customer/patient/getDoctorAdviceList",
		//2.2.1.19 跳转到患者详情的接口
		"toCustomerInfo":"/app/customer/user/toCustomerInfo",
		//2.2.1.21 跳转到个人账户页面列表页面
		"toPersonAccountList":"/app/customer/patient/toPersonAccountList",
		//2.2.1.14 获取患者积分列表接口
		"getVipclubIntegralLogList":"/app/customer/patient/getVipclubIntegralLogList",
		//2.2.1.18 获取消息列表的接口
		"getAllInnerMessageList":"/app/customer/patient/getAllInnerMessageList",
		//2.2.1.16 保存会员的意见反馈信息接口
		"addCustomerAdvice":"/app/customer/patient/addCustomerAdvice",
		//2.2.1.23 获取患者的订单的列表的接口
		"getCustomerOrderList":"/app/customer/order/getCustomerOrderList",
		//3.6.3.2 患者端通过订单主键查看订单详情
		"toOrderMainDetail":"/app/customer/order/toOrderMainDetail",
		//2.2.1.20 编辑患者个人信息详情的接口
		"editCustomerInfo":"/app/customer/user/editCustomerInfo",
		//快速提问
		"saveQuickQuestion":"/app/customer/patient/saveQuickQuestion",
		// 3.6.4.1获取患者的收藏列表
		"getAllCustomerFavoriteList":"/app/customer/patient/getAllCustomerFavoriteList",
		// 3.4.1我的医生服务记录
		"getConsultRecords":"/app/customer/patient/getConsultRecords",
		//2.1.1.5获取健康指导详情接口
		"getHealthGuideList":"/app/customer/patient/getHealthGuideList",
		//获取医生筛选的所有标签
		"getTags":"/app/customer/patient/getTags",
		//找医生，筛选医生
		"getDoctorsBySelect":"/app/customer/patient/getDoctorsBySelect",
		//获取医生列表，可以根据关键字查询  doctorConditon
		"getDoctors":"/app/customer/patient/getDoctors",
		//获取医生列表，
		"getDoctorsBySelect":"/app/customer/patient/2.0/getDoctorsBySelect",
		// 3.2.7.2.1获取总病例的接口
		"getAllMedicalRecord":"/app/customer/patient/getAllMedicalRecord",
		// 3.2.7.2.2获取病例详情接口
		"getMedicalRecordDetail":"/app/customer/patient/getMedicalRecordDetail",
		//3.6.3.3 患者端取消订单
		"cancelOrder":"/app/customer/order/cancelOrder",
		//3.1.1.7 获取所有的私人套餐接口
		"getAllPackage":"/app/service/customer/getAllPackage",
		//1.1.1 患者端获取心灵自助资讯列表
		"getHeartContentList":"/app/customer/patientOfHeart/2.0/getHeartContentList",
		//患者端收藏
		"addFavorite":"/app/customer/patientOfHeart/addFavorite",
		//患者端在线视频
		"getVideos":"/app/customer/patientOfHeart/2.0/getVideos",
		//获取医生详情
		"getDoctorDetail":"/app/customer/patient/getDoctorDetail",
		//3.2.3.1跳转到预约加号的页面接口
		"toPlusPage":"/app/customer/patient/toPlusPage",
		//保存预约加号
		"savePlus":"/app/customer/patient/savePlus",
		"getDoctorDetail":"/app/customer/patient/getDoctorDetail",
		//3.7.1通过患者id得到患者手机号
		"getMobileByCustomerUuid":"/app/service/customer/getMobileByCustomerUuid",
		//3.7.7 患者端登录后修改密码
		"updatePassword":"/app/customer/user/updatePassword",
		//3.7.6患者端通过手机号和验证码找回密码
		"retrievePassword":"/app/customer/user/retrievePassword",
		//3.2.4.2跳转到私人套餐详情页面接口
		"toPersonnalPage":"/app/customer/patient/toPersonnalPage",
		"retrievePassword":"/app/customer/user/retrievePassword",
		//3.3.1.1 获取所有测试分类的接口
		"getAllQuizCategory":"/app/pub/quiz/getAllQuizCategory",
		//3.3.1.5 获取测试题分类说明的接口
		"getQuizCategory":"/app/pub/quiz/getQuizCategory",
		//3.3.1.4 获取分类下所有的测试题的接口
		"getAllQuiz":"/app/pub/quiz/getAllQuiz",
		//3.3.1.3 获取测试分类下测试结果的接口
		"getQuizResult":"/app/pub/quiz/getQuizResult",
		// 添加关注
		"addAttentionDoctors":"/app/customer/patient/addAttentionDoctors",
		// 取消关注
		"cancleAttentionDoctors":"/app/customer/patient/cancleAttentionDoctors",
		//3.2.5.1创建随访记录的接口
		"toVisitRecord":"/app/customer/patient/toVisitRecord",
		//保存随访记录
		"toUpdateVisit":"/app/customer/patient/toUpdateVisit",
		//获取患者随访列表 customerUuid  doctorUuid get
		"getVisitRecordByCusAndDoc":"/app/customer/patient/getVisitRecordByCusAndDoc",
		//根据customerUuid doctorUuid 获取病例列表
		"getMedicalRecordList":"/app/customer/patient/getMedicalRecordList",
		//修改支付密码
		"updatePayPassword":"/app/customer/user/updatePayPassword",
		//3.2.5.1.4 患者端随访记录睡眠情况、进食情况、其他情况 、其他检查结果的接口
		"addVisitRecordExtend":"/app/customer/patient/addVisitRecordExtend",
		//获取病情记录的列表接口（和医生端共用一个接口）
		"getIllnessRecordByVisitRecordUuid":"/app/service/customer/getIllnessRecordByVisitRecordUuid",
		//获取服药记录列表的接口（和医生端共用一个接口）
		"getDoctorAdviceModelByVisitRecordUuid":"/app/service/customer/getDoctorAdviceModelByVisitRecordUuid",
		//获取不良反应列表的接口（和医生端共用一个接口）
		"getDrugReactionList":"/app/pub/doctor/getDrugReactionList",
		///app/pub/doctor/getVisitPreceptExtendList
		"getVisitPreceptExtendList":"/app/pub/doctor/getVisitPreceptExtendList",
		//3.2.4.3余额支付接口
		"toPayment":"/app/customer/patient/toPayment",
		//添加服药提醒的接口
		"addDrugNotice":"/app/customer/patient/addDrugNotice",
		//获取患者信息（少有信息）
		"toQuickQuestion":"/app/customer/patient/toQuickQuestion",
		"addDrugNotice":"/app/customer/patient/addDrugNotice",
		//获取服药提醒的列表的接口
		"getDrugNoticeList":"/app/customer/patient/getDrugNoticeList",
		//保存订单
		"orderSave":"/app/customer/order/orderSave",
		//获取医生的私人医生套餐
		"getPackageList":"/app/customer/patient/getPackageList",
		//支付密码验证
		"checkPayPassWord":"/app/customer/user/checkPayPassWord",
		//查询是否设置支付密码
		"getPayPassWord":"/app/customer/user/getPayPassWord",
		//患者充值接口
		"balance":"/app/customer/user/balance",
		//获取重要医嘱信息，根据医生和患者ID
		"getDoctorAdvicesByDoctorUuid":"/app/customer/patient/getDoctorAdvicesByDoctorUuid",
		//3.5.6 患者端分享接口
		"addShare":"/app/customer/patient/addShare",
		//判断用户是否和医生存在关系  doctorUuid customerUuid | applyState 1：已接受 0：未接受 visitRecordUuid
		"getVisitRecord":"/app/customer/patient/getVisitRecord",
		//忘记密码获取验证码 - 患者端
		"getForgetPassword":"/app/customer/user/getForgetPassword",
		//患者退出登录
		"logout":"/usercenter/customer/logout"
	},
	"index":{
		//3.1.1.1 患者首页获得名医风采列表
		"getFamousDoctors":"/app/customer/patient/getFamousDoctors"
	},
	"follow_up":{
		// 2.2.1.6创建随访记录的接口
		"toVisitRecord":"/app/customer/patient/toVisitRecord",
		//2.1.1.7患者端随访记录添加病情变化接口
		"addIllnessRecord":"/app/customer/patient/addIllnessRecord",
		//2.1.1.8患者端随访记录添加服药记录接口
		"addMedicationRecord":"/app/customer/patient/addMedicationRecord",
		//2.1.1.9患者端随访记录添加药物不良反应的接口
		"addDrugReaction":"/app/customer/patient/addDrugReaction",
		//添加治疗方案
		"addDoctorAdviceModel":"/app/service/customer/addDoctorAdviceModel",
		//2.17.1.16 添加或者修改医生健康指导的接口
		"saveOrUpdateHealthGuide":"/app/pub/doctor/saveOrUpdateHealthGuide"
	},
	"refer":{
		// 2.1.10患者端获取心灵自助资讯列表
		"getServicesByCustomerUuid":"/app/customer/patient/getServicesByCustomerUuid",
		// 2.1.11更新视频收藏操作
		"updateFavorite":"/app/customer/patientOfHeart/updateFavorite"
	},
	"my_doctor":{
		//2.1.12患者端关注的医生
		"getAttentionDoctors":"/app/customer/patient/getAttentionDoctors",
		//2.1.13患者端随访的医生
		"getVisitDoctors":"/app/customer/patient/getVisitDoctors",
		//用药查询
		"getProductMainListByName":"/app/service/tools/getProductMainListByName"
	},
	"test":{
		//3.3.1.3获取测试分类下测试结果的接口
		"getQuizResult":"/app/pub/quiz/getQuizResult",
		"test":"/app/pub/quiz/getQuizResult1",
		//写错误日志
		"submit":"/app/pub/doctor/saveOperateLog"
	}
};

var ___msgGotoUrl = {
	//重要医嘱
	"2":{
		url:"http://admin.hxqydyl.com/patient/home/total_details.shtml?doctorUuid={0}",
		msg:"您有医生给您的重要医嘱信息，需要现在查看吗？"
	},
	//健康指导
	"3":{
		url:"/patient/my_doctor/health_guide.shtml?doctorUuid={0}",
		msg:"您有医生给您的健康指导信息，需要现在查看吗？"
	}
}