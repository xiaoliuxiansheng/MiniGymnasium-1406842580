/**
 * Notes: 教练场地关联表
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY 1406842580@qq.com (wechat)
 * Date: 2020-10-14 19:20:00 
 */


const BaseModel = require('./base_model.js');
class PlaceUserModel extends BaseModel {}

// 集合名
PlaceUserModel.CL = "ax_place_user";

PlaceUserModel.DB_STRUCTURE = {
	_pid: 'string|true',
	USER_ID: 'string|true',
	PLACE_ID: "string|true",
	ADD_TIME: 'int|true',
	EDIT_TIME: 'int|true'
}

// 字段前缀
PlaceUserModel.FIELD_PREFIX = "PLACE_USER_";


module.exports = PlaceUserModel;