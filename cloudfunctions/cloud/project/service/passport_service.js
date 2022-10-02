/**
 * Notes: passport模块业务逻辑 
 * Date: 2020-10-14 07:48:00 
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY 1406842580@qq.com (wechat)
 */

const BaseService = require('./base_service.js');

const cloudBase = require('../../framework/cloud/cloud_base.js');
const UserModel = require('../model/user_model.js');
const MeetModel = require('../model/meet_model.js');
class PassportService extends BaseService {

	// 插入用户
	async insertUser(userId, mobile, name = '', joinCnt = 0,city = '',  trade = '', work='',userType = 0, userPlaceId='', userPlaceName = '', userIcon, userBrith, userCoachType, userClassType) {
		// 判断是否存在
		let where = {
			USER_MINI_OPENID: userId
		}
		let cnt = await UserModel.count(where);
		if (cnt > 0) return;

		// 入库
		let data = {
			USER_MINI_OPENID: userId,
			USER_MOBILE: mobile,
			USER_NAME: name,
			USER_TYPE: userType,
			USER_CITY: city,
			USER_TRADE: trade,
			USER_WORK: work,
			USER_PLACE_ID: userPlaceId,
			USER_PLACE_NAME: userPlaceName,
			USER_ICON: userIcon,
			USER_BRITH: userBrith,
			USER_COACH_TYPE: userCoachType,
			USER_CLASS_TYPE: userClassType
		}
		await UserModel.insert(data);
	}

	/** 获取手机号码 */
	async getPhone(cloudID) {
		let cloud = cloudBase.getCloud();
		let res = await cloud.getOpenData({
			list: [cloudID], // 假设 event.openData.list 是一个 CloudID 字符串列表
		});
		if (res && res.list && res.list[0] && res.list[0].data) {

			let phone = res.list[0].data.phoneNumber;

			return phone;
		} else
			return '';
	}

	/** 取得我的用户信息 */
	async getMyDetail(userId, showPlace = true) {
		let where = {
			USER_MINI_OPENID: userId
		}
		let fields = 'USER_MOBILE,USER_NAME,USER_CITY,USER_TRADE,USER_WORK, USER_TYPE, USER_PLACE_ID, USER_PLACE_NAME, USER_ICON, USER_BRITH, USER_COACH_TYPE, USER_CLASS_TYPE, USER_CANUSE_COUNT'
		const userInfo = await UserModel.getOne(where, fields)
		if (userInfo&&userInfo.USER_PLACE_ID && showPlace) {
			const placeInfo = await MeetModel.getOne({_id: userInfo.USER_PLACE_ID}, 'MEET_TITLE')
			userInfo.placeInfo = placeInfo
		}
		return userInfo;
	}

	/** 修改用户资料 */
	async editBase(userId, {
		mobile,
		name,
		trade,
		work,
		city,
		userType,
		userPlaceId,
		userPlaceName,
		userBrith,
		userIcon,
		userCoachType,
		userClassType
	}) {
		let where = {
			USER_MINI_OPENID: userId
		};
		// 判断是否存在
		let cnt = await UserModel.count(where);
		if (cnt == 0) {
			await this.insertUser(userId, mobile, name, 0,city, trade,  work, userType, userPlaceId, userPlaceName, userIcon, userBrith, userCoachType, userClassType);
			return;
		}

		let data = {
			USER_MOBILE: mobile,
			USER_NAME: name,
			USER_CITY: city,
			USER_WORK: work,
			USER_TRADE: trade,
			USER_TYPE: userType,
			USER_PLACE_ID: userPlaceId,
			USER_PLACE_NAME: userPlaceName,
			USER_ICON: userIcon,
			USER_BRITH: userBrith,
			USER_COACH_TYPE: userCoachType,
			USER_CLASS_TYPE: userClassType
		};

		await UserModel.edit(where, data);

	}

	/** 修改用户积分数 */
	async updateCanuseCount(userId, num, reduce) {
		this.AppError('此功能暂不开放，如有需要请加作者微信：yjliuliu123');

	}

	/** 获取所有教练 */
	async getAllCoach() {
		let where = {
			USER_TYPE: 2
		};
		const list = await UserModel.getAll(where, 'USER_MINI_OPENID, USER_NAME');
		return list
	}
}

module.exports = PassportService;