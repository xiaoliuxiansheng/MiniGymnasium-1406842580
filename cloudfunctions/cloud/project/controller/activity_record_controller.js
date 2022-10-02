/**
 * Notes: 问卷调查
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY 1406842580@qq.com (wechat)
 * Date: 2020-09-29 04:00:00 
 */

const BaseController = require('./base_controller.js');
const ActivityRecordService = require('../service/activity_record_service.js');
const timeUtil = require('../../framework/utils/time_util.js');

class ActivityRecordController extends BaseController {
	/** 提交问卷调查*/
	async insertActivityRecord() {
			// 数据校验
			let rules = {
				score: 'int|name=分数',
				content: 'string|must|name=描述',
				type: 'mush|string|name=问卷类型 1 教练满意度 2 问卷调查',
				activityId: 'id|name=活动ID',
				coachId: 'id|name=被评价教练ID',
				coachName: 'string|name=被评价教练名称',
				userName: 'string|must|name=评价人姓名'
			};
			// 取得数据
		let input = this.validateData(rules);

		let service = new ActivityRecordService();
		let result = await service.insertActivityRecord(this._userId,{...input});

		return result;
	}
}

module.exports = ActivityRecordController;