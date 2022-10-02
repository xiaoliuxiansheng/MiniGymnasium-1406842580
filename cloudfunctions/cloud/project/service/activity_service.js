/**
 * Notes: 问卷调查
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY 1406842580@qq.com (wechat)
 * Date: 2020-10-29 07:48:00 
 */

const BaseService = require('./base_service.js');
const util = require('../../framework/utils/util.js');
const timeUtil = require('../../framework/utils/time_util.js');
const ActivityModel = require('../model/activity_model.js');
const ActivityRecordModel = require('../model/activity_record_model.js');

class ActivityService extends BaseService {

	/**取得资讯分页列表 */
	async getActivitysList() {

		let fields = 'ACTIVITY_END_TIME, ACTIVITY_TYPE, ACTIVITY_TITLE, ACTIVITY_CREATE_TIME, ACTIVITY_DESCRIBE, ACTIVITY_ADD_TIME';

		let where = {};
		const orderBy = {
			'ACTIVITY_ADD_TIME': 'desc'
		};
		const time = timeUtil.timestamp2Time(new Date().getTime(), 'Y-M-D')
		const result =  await ActivityModel.getAll(where, fields, orderBy);
		for (let index = 0; index < result.length; index++) {
			const isCompleted = await this.isCompleteActivity(result[index]._id)
			const status = isCompleted ? 3 : time > result[index].ACTIVITY_END_TIME ? 2 : 1
			result[index].status = status
			result[index].ACTIVITY_ADD_TIME = timeUtil.timestamp2Time(result[index].ACTIVITY_ADD_TIME)
		}
		// const list = result.map(item => async ({...item, ACTIVITY_ADD_TIME: timeUtil.timestamp2Time(item.ACTIVITY_ADD_TIME), status: await this.isCompleteActivity(item._id) ? 3 : time > item.ACTIVITY_END_TIME ? 2 : 1}))
		return result
	}
	/** 判断问查调卷是否已填写 */
	async isCompleteActivity(id) {
		const result = await ActivityRecordModel.getOne({ACTIVITY_RECORD_RELATION_ID: id, ACTIVITY_RECORD_USER_ID: this._userId})
		return result
	}
}

module.exports = ActivityService;