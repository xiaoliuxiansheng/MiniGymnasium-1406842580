/**
 * Notes: 支付模块业务逻辑
 * Date: 2021-03-15 04:00:00 
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY 1406842580@qq.com (wechat)
 */

const BaseService = require('./base_service.js');

const PaymentModel = require('../model/payment_record.js');
const dataUtil = require('../../framework/utils/data_util.js');
const config = require('../../config/config.js');

class PaymentService extends BaseService {
	/**
	 * 创建支付记录
	 * @param {*} param0 
	 */
	async creatRecord(userId, type, amount, meetId = '',editTime, recordNum) {
		let data = {
			PARMENT_USER_ID: userId,
			PAYMENT_TYPE: type,
			PAYMENT_AMOUNT: amount,
			PAYMENT_MEET_ID: meetId,
			PAYMENT_EDIT_TIME: editTime,
			PAYMENT_RECORD_NUM: recordNum
		}
		await PaymentModel.insert(data);
	}
}

module.exports = PaymentService;