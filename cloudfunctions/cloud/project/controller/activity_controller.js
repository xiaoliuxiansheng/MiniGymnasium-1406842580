/**
 * Notes: 问卷调查
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY 1406842580@qq.com (wechat)
 * Date: 2020-09-29 04:00:00 
 */

const BaseController = require('./base_controller.js');
const ActivityService = require('../service/activity_service.js');
const timeUtil = require('../../framework/utils/time_util.js');

class ActivityController extends BaseController {
	/** 调查列表 */
	async getActivityList() {
		// 数据校验
		let rules = {};

		// 取得数据
		let input = this.validateData(rules);

		let service = new ActivityService();
		let result = await service.getActivitysList(input);

		return result;
	}

	/** 提交问卷调查*/
	async inserActivityRecord() {
			// 数据校验
			let rules = {
				score: 'int|name=分数',
				content: 'string|must|name=描述',
				activityId: 'id|活动ID'
			};
			// 取得数据
		let input = this.validateData(rules);

		let service = new AdminActivityService();
		let result = await service.getActivitysList(input);

		return result;
	}
}

module.exports = ActivityController;