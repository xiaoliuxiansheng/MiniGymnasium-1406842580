/**
 * Notes: 用户控制模块
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY 1406842580@qq.com
 * Date: 2022-01-22 10:20:00 
 */

const BaseAdminController = require('./base_admin_controller.js');

const UserModel = require('../../model/user_model.js');
const LogModel = require('../../model/log_model.js');
const AdminUserService = require('../../service/admin/admin_user_service.js');
const timeUtil = require('../../../framework/utils/time_util.js');

class AdminUserController extends BaseAdminController { 


	/** 用户信息 */
	async getUserDetail() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'required|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminUserService();
		let user = await service.getUser({
			userId: input.id
		});

		if (user) {
			// 显示转换  
			user.USER_ADD_TIME = timeUtil.timestamp2Time(user.USER_ADD_TIME);
			user.USER_LOGIN_TIME = user.USER_LOGIN_TIME ? timeUtil.timestamp2Time(user.USER_LOGIN_TIME) : '未登录';
		}

		return user;
	}


	/** 用户列表 */
	async getUserList() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			search: 'string|min:1|max:30|name=搜索条件',
			sortType: 'string|name=搜索类型',
			sortVal: 'name=搜索类型值',
			orderBy: 'object|name=排序',
			whereEx: 'object|name=附加查询条件',
			page: 'required|int|default=1',
			size: 'int',
			isTotal: 'bool',
			oldTotal: 'int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminUserService();
		let result = await service.getUserList(input);

		// 数据格式化
		let list = result.list;
		for (let k in list) {
			list[k].USER_STATUS_DESC = UserModel.getDesc('STATUS', list[k].USER_STATUS);
			list[k].USER_ADD_TIME = timeUtil.timestamp2Time(list[k].USER_ADD_TIME);
			list[k].USER_LOGIN_TIME = list[k].USER_LOGIN_TIME ? timeUtil.timestamp2Time(list[k].USER_LOGIN_TIME) : '未登录';

		}
		result.list = list;
		return result;
	} 

	/** 教练列表 */
	async getCoachList() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			search: 'string|min:1|max:30|name=搜索条件',
			sortType: 'string|name=搜索类型',
			sortVal: 'name=搜索类型值',
			orderBy: 'object|name=排序',
			whereEx: 'object|name=附加查询条件',
			page: 'required|int|default=1',
			size: 'int',
			isTotal: 'bool',
			oldTotal: 'int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminUserService();
		let result = await service.getUserList({...input, userType: 2});

		// 数据格式化
		let list = result.list;
		for (let k in list) {
			list[k].USER_STATUS_DESC = UserModel.getDesc('STATUS', list[k].USER_STATUS);
			list[k].USER_ADD_TIME = timeUtil.timestamp2Time(list[k].USER_ADD_TIME);
			list[k].USER_LOGIN_TIME = list[k].USER_LOGIN_TIME ? timeUtil.timestamp2Time(list[k].USER_LOGIN_TIME) : '未登录';

		}
		result.list = list;
		return result;
	} 

	/** 教练考勤 */
	async getCoachAttendance() {
		await this.isAdmin();
		// 数据校验
		let rules = {
			coachId: 'required|id',
			time: 'required|string'
		};
		// 取得数据
		let input = this.validateData(rules);
		let service = new AdminUserService();
		let result = await service.getCoachAttendance({...input});
		return result
	}
	/** 获取用户列表 */
	async getUserListByType() {
		await this.isAdmin();
		let rules = {
			type: 'required|int|default=1'
		}
		let input = this.validateData(rules);

		let service = new AdminUserService();
		let result = await service.getUserListByType(input);
		return result
	}
	/** 删除用户 */
	async delUser() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'required|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let name = await this.getNameBeforeLog('user', input.id);

		let service = new AdminUserService();
		await service.delUser(input.id);

		this.log('删除了客户「' + name + '」', LogModel.TYPE.USER);

	}


	/** 修改用户积分卡数 */
	async modifyUserCanUse() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			USER_MINI_OPENID: 'required|id',
			USER_CANUSE_COUNT: 'must|number|name=积分剩余数'
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminUserService();
		return await service.modifyUserCanUse(input);
	}

	/** 修改学员课程类型 */
	async modifyUserClassType() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			USER_MINI_OPENID: 'required|id',
			USER_CLASS_TYPE: 'must|number|name=课程类型'
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminUserService();
		return await service.modifyUserClassType(input);
	}

	/** 修改教练教学场地 */
	async modifyCoachPlace() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			USER_MINI_OPENID: 'required|id',
			USER_PLACE_ID: 'must|string|name=场地ID',
			USER_PLACE_NAME: 'must|string|name=场地名称'
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminUserService();
		return await service.modifyCoachPlace(input);
	}
	/** 查询是本月生日的用户*/
	async getToMonthIsBirthDay() {
		await this.isAdmin();
		let service = new AdminUserService();
		const thisMonth = timeUtil.timestamp2Time(new Date().getTime(), 'M')
		return await service.getUserByBirth({date: thisMonth});
	}
}

module.exports = AdminUserController;