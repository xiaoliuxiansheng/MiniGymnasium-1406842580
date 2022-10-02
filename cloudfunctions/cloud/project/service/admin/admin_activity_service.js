/**
 * Notes: 资讯后台管理
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY 1406842580@qq.com (wechat)
 * Date: 2021-07-11 07:48:00 
 */

const BaseAdminService = require('./base_admin_service.js');

const dataUtil = require('../../../framework/utils/data_util.js');
const util = require('../../../framework/utils/util.js');
const cloudUtil = require('../../../framework/cloud/cloud_util.js');
const timeUtil = require('../../../framework/utils/time_util.js');
const ActivityModel = require('../../model/activity_model.js');
const ActivityModelRecord = require('../../model/activity_record_model.js');

class AdminActivityService extends BaseAdminService { 

	/**添加问卷 */
	async insertActivity(adminId, {
		title,
		type = 1, //分类
		endTime,
		describe = ''
	}) {
		this.AppError('此功能暂不开放，如有需要请加作者微信：yjliuliu123');
	}

	/**删除问卷数据 */
	async delActivity(id) {
		let where = {
			_id: id
		}
		await ActivityModel.del(where);
		await ActivityModelRecord.del({ACTIVITY_RECORD_RELATION_ID: id})
	}

	/**获取资讯信息 */
	async getNewsDetail(id) {
		let fields = '*';

		let where = {
			_id: id
		}
		let news = await ActivityModel.getOne(where, fields);
		if (!news) return null;

		return news;
	}

	async getActivityRecord({
		search, // 搜索条件
		sortType, // 搜索菜单
		sortVal, // 搜索菜单
		orderBy, // 排序
		whereEx, //附加查询条件
		page,
		size,
		isTotal = true,
		oldTotal
	}) {
		orderBy = orderBy || {
			'ACTIVITY_RECORD_ADD_TIME': 'desc'
		};
		let fields = '*';
		let where = {
			ACTIVITY_RECORD_RELATION_ID: whereEx.id
		}
		if (util.isDefined(search) && search) {
			where.or = [{
				ACTIVITY_TITLE: ['like', search]
			}, ];

		} else if (sortType && util.isDefined(sortVal)) {
			// 搜索菜单
			switch (sortType) {
				case 'sort':
					// 排序
					if (sortVal == 'newdesc') { //最新
						orderBy = {
							'ACTIVITY_ADD_TIME': 'desc'
						};
					}
					if (sortVal == 'newasc') {  
						orderBy = {
							'ACTIVITY_ADD_TIME': 'asc'
						};
					}
			}
		}
		const result =  await ActivityModelRecord.getList(where, fields, orderBy, page, size, isTotal, oldTotal);
		return result
	}
	/**取得资讯分页列表 */
	async getActivitysList({
		search, // 搜索条件
		sortType, // 搜索菜单
		sortVal, // 搜索菜单
		orderBy, // 排序
		whereEx, //附加查询条件
		page,
		size,
		isTotal = true,
		oldTotal
	}) {

		orderBy = orderBy || {
			'ACTIVITY_END_TIME': 'desc'
		};
		let fields = 'ACTIVITY_END_TIME,ACTIVITY_TYPE,ACTIVITY_TITLE, _pid, ACTIVITY_CREATE_TIME, ACTIVITY_COMMENT_CNT, ACTIVITY_DESCRIBE, ACTIVITY_ADD_TIME';

		let where = {};

		if (util.isDefined(search) && search) {
			where.or = [{
				ACTIVITY_TITLE: ['like', search]
			}, ];

		} else if (sortType && util.isDefined(sortVal)) {
			// 搜索菜单
			switch (sortType) {
				case 'sort':
					// 排序
					if (sortVal == 'newdesc') { //最新
						orderBy = {
							'ACTIVITY_ADD_TIME': 'desc'
						};
					}
					if (sortVal == 'newasc') {  
						orderBy = {
							'ACTIVITY_ADD_TIME': 'asc'
						};
					}
			}
		}

		const time = timeUtil.timestamp2Time(new Date().getTime(), 'Y-M-D')
		const result =  await ActivityModel.getList(where, fields, orderBy, page, size, isTotal, oldTotal);
			result.list = result.list.map(item => ({...item, ACTIVITY_ADD_TIME: timeUtil.timestamp2Time(item.ACTIVITY_ADD_TIME), status: time > item.ACTIVITY_END_TIME ? 2 : 1}))
		return result
	}
}

module.exports = AdminActivityService;