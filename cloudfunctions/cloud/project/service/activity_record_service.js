/**
 * Notes: 资讯后台管理
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY 1406842580@qq.com (wechat)
 * Date: 2021-07-11 07:48:00 
 */

const BaseService = require('./base_service.js');

const dataUtil = require('../../framework/utils/data_util.js');
const util = require('../../framework/utils/util.js');
const cloudUtil = require('../../framework/cloud/cloud_util.js');
const timeUtil = require('../../framework/utils/time_util.js');
const ActivityRecordModel = require('../model/activity_record_model.js');
const ActivityModel = require('../model/activity_model.js');

class ActivityRecordService extends BaseService { 

	/**添加问卷 */
	async insertActivityRecord(userId, {
		score = '',
		content, 
		activityId,
		coachId = '',
		coachName = '',
		userName,
		type
	}) {
		this.AppError('此功能暂不开放，如有需要请加作者微信：yjliuliu123');
	}


}

module.exports = ActivityRecordService;