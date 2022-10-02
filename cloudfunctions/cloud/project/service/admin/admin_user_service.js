/**
 * Notes: 用户管理
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY 1406842580@qq.com (wechat)
 * Date: 2022-01-22y 07:48:00 
 */

const BaseAdminService = require('./base_admin_service.js');

const util = require('../../../framework/utils/util.js');
const timeUtil = require('../../../framework/utils/time_util.js');
const UserModel = require('../../model/user_model.js');
const JoinModel = require('../../model/join_model.js');
const MeetModel = require('../../model/meet_model.js');
const DayModel = require('../../model/day_model.js');
const config = require('../../../config/config.js');

class AdminUserService extends BaseAdminService {
 

	/** 获得某个用户信息 */
	async getUser({
		userId,
		fields = '*'
	}) {
		let where = {
			USER_MINI_OPENID: userId,
		}
		return await UserModel.getOne(where, fields);
	}

	/** 取得用户分页列表 */
	async getUserList({
		search, // 搜索条件
		sortType, // 搜索菜单
		sortVal, // 搜索菜单
		orderBy, // 排序
		whereEx, //附加查询条件 
		page,
		size,
		oldTotal = 0,
		userType
	}) {

		orderBy = orderBy || {
			USER_ADD_TIME: 'desc'
		};
		let fields = '*';


		let where = {};
		where.and = {
			_pid: this.getProjectId() //复杂的查询在此处标注PID
		};

		if (userType) {
			where.and = {
				USER_TYPE: userType
			}
		}
		if (util.isDefined(search) && search) {
			where.or = [{
					USER_NAME: ['like', search]
				},
				{
					USER_MOBILE: ['like', search]
				}, 
				{
					USER_MEMO: ['like', search]
				},
				{
					USER_PLACE_NAME: ['like', search]
				}
			];

		} else if (sortType && util.isDefined(sortVal)) {
			// 搜索菜单
			switch (sortType) {
				case 'status':
					where.and.USER_STATUS = Number(sortVal); 
					break;
				case 'companyDef':
					// 单位性质 
					where.and.USER_COMPANY_DEF = (sortVal);
					break;

				case 'sort':
					// 排序
					if (sortVal == 'newdesc') { //最新
						orderBy = {
							'USER_ADD_TIME': 'desc'
						};
					}
					if (sortVal == 'newasc') {  
						orderBy = {
							'USER_ADD_TIME': 'asc'
						};
					}
			}
		}
		let result = await UserModel.getList(where, fields, orderBy, page, size, true, oldTotal, false);

		// 为导出增加一个参数condition
		result.condition = encodeURIComponent(JSON.stringify(where));

		return result;
	} 
 
	/** 获取对应类型用户 */
	async getUserListByType({type}) {
		let result = await UserModel.getAll({USER_TYPE: type})
		return result
	}

	/** 获取生日为对应日期的用户*/
	async getUserByBirth({date}) {
		this.AppError('此功能暂不开放，如有需要请加作者微信：yjliuliu123');
	}

	/**删除用户 */
	async delUser(id) {
		let whereUser = {
			USER_MINI_OPENID: id
		}

		// ** 删除用户记录
		await UserModel.del(whereUser);


		// ** 删除报名
		let whereJoin = {
			JOIN_USER_ID: id
		}
		JoinModel.del(whereJoin);

		// TODO 重新统计各时段人数

	}

	async modifyUserCanUse({USER_MINI_OPENID, USER_CANUSE_COUNT}) {
		let where = {
			USER_MINI_OPENID
		}
		let data = {
			USER_CANUSE_COUNT
		}

		const info = await UserModel.edit(where, data);

		return info
	}

	async modifyUserClassType({USER_MINI_OPENID, USER_CLASS_TYPE}) {
		let where = {
			USER_MINI_OPENID
		}
		let data = {
			USER_CLASS_TYPE
		}

		const info = await UserModel.edit(where, data);

		return info
	}
	
	async modifyCoachPlace({USER_MINI_OPENID, USER_PLACE_ID, USER_PLACE_NAME}) {
		let where = {
			USER_MINI_OPENID
		}
		let data = {
			USER_PLACE_ID,
			USER_PLACE_NAME
		}

		const info = await UserModel.edit(where, data);

		return info
	}
	// 获取教练考勤
	async getCoachAttendance({coachId, time}) {
		this.AppError('此功能暂不开放，如有需要请加作者微信：yjliuliu123');
	}
}

module.exports = AdminUserService;