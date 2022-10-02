/**
 * Notes: 活动/满意度调查实体
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY 1406842580@qq.com (wechat)
 * Date: 2020-10-14 19:20:00 
 */


const BaseModel = require('./base_model.js');

class ActivityModel extends BaseModel {}

// 集合名
ActivityModel.CL = "ax_activity";

ActivityModel.DB_STRUCTURE = {
	_pid: 'string|true',
	ACTIVITY_ID: 'string|true',
	ACTIVITY_ADD_TIME: 'int|true',
	ACTIVITY_EDIT_TIME: 'int|true',
	ACTIVITY_ADD_IP: 'string|false',
	ACTIVITY_EDIT_IP: 'string|false',
	ACTIVITY_TITLE: 'string|true|comment=活动名称',
	ACTIVITY_END_TIME: 'string|true|comment=结束时间',
	ACTIVITY_TYPE: 'int|true|comment=活动类型 1= 教练员水平评估 2=满意度调查',
	ACTIVITY_COMMENT_CNT: 'int|true|default=0|comment=参与数',
	ACTIVITY_DESCRIBE: 'string|false|comment=描述'
}

// 字段前缀
ActivityModel.FIELD_PREFIX = "ACTIVITY_";


module.exports = ActivityModel;