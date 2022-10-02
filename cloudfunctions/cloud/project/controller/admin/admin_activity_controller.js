/**
 * Notes: 资讯模块后台管理-控制器
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY 1406842580@qq.com
 * Date: 2021-07-11 10:20:00 
 */

const BaseAdminController = require('./base_admin_controller.js');

const AdminActivityService = require('../../service/admin/admin_activity_service.js');

const timeUtil = require('../../../framework/utils/time_util.js');
const contentCheck = require('../../../framework/validate/content_check.js');
const LogModel = require('../../model/log_model.js');

class AdminActivityController extends BaseAdminController {


	/** 调查列表 */
	async getActivityList() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			search: 'string|min:1|max:30|name=搜索条件',
			sortType: 'string|name=搜索类型',
			sortVal: 'name=搜索类型值',
			orderBy: 'object|name=排序',
			whereEx: 'object|name=附加查询条件',
			page: 'must|int|default=1',
			size: 'int',
			isTotal: 'bool',
			oldTotal: 'int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminActivityService();
		let result = await service.getActivitysList(input);

		return result;

	}

	/** 发布调查 */
	async insertActivity() {
		await this.isAdmin();

		let rules = {
			title: 'must|string|min:4|max:50|name=标题',
			type: 'must|int|in:1,2|name=活动类型 1= 教练员水平评估 2=满意度调查',
			endTime: 'string|must|name=结束时间',
			describe: 'string|name=描述'
		};
		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminActivityService();
		let result = await service.insertActivity(this._adminId, input);

		return result;

	}

	/**
	 * 查看问卷调查记录
	 */
	async getActivityDetail() {
		await this.isAdmin();
		let rules = {
			search: 'string|min:1|max:30|name=搜索条件',
			sortType: 'string|name=搜索类型',
			sortVal: 'name=搜索类型值',
			orderBy: 'object|name=排序',
			whereEx: 'object|name=附加查询条件',
			page: 'must|int|default=1',
			size: 'int',
			isTotal: 'bool',
			oldTotal: 'int',
		};
		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminActivityService();
		let result = await service.getActivityRecord(input);

		return result;
	}
	/** 删除调查 */
	async delActivity() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);
		let service = new AdminActivityService();
		await service.delActivity(input.id);

	}

}

module.exports = AdminActivityController;