/**
 * Notes: 活动/满意度记录调查实体
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY 1406842580@qq.com (wechat)
 * Date: 2020-10-14 19:20:00 
 */


const BaseModel = require('./base_model.js');

class ActivityRecordModel extends BaseModel {}

// 集合名
ActivityRecordModel.CL = "ax_activity_record";

ActivityRecordModel.DB_STRUCTURE = {
	_pid: 'string|true',
	ACTIVITY_RECORD_RELATION_ID: 'string|true|comment=活动id',
	ACTIVITY_RECORD_TYPE: 'int|true|comment=活动类型 1= 教练员水平评估 2=满意度调查',
	ACTIVITY_RECORD_SOCRE: 'int|false|comment=分数',
	ACTIVITY_RECORD_CONTENT: 'string|true|comment=备注',
	ACTIVITY_RECORD_USER_ID: 'string|true|comment=评价用户USER_MINI_OPENID',
	ACTIVITY_RECORD_USER_NAME: 'string|true|comment=评价用户名称',
	ACTIVITY_RECORD_COACH_ID: 'string|false|comment=评价教练USER_MINI_OPENID',
	ACTIVITY_RECORD_COACH_NAME: 'string|false|comment=评价教练名称',
	ACTIVITY_RECORD_TYPE: 'string|true|comment=问卷调查类型',
	ACTIVITY_RECORD_ID: 'string|true',
	ACTIVITY_RECORD_ADD_TIME: 'int|true',
	ACTIVITY_RECORD_EDIT_TIME: 'int|true',
	ACTIVITY_RECORD_ADD_IP: 'string|false',
	ACTIVITY_RECORD_EDIT_IP: 'string|false',
}

// 字段前缀
ActivityRecordModel.FIELD_PREFIX = "ACTIVITY_RECORD_";


module.exports = ActivityRecordModel;