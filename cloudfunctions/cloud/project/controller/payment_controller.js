/**
 * Notes: payment 支付模块
 * Date: 2022-09-15 19:20:00 
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY 1406842580@qq.com (wechat)
 */
const BaseController = require('./base_controller.js');
const PaymentService = require('../service/payment_service.js');
const timeUtil = require('../../framework/utils/time_util.js');
const config = require('../../config/config.js');

class PaymentRecordController extends BaseController {

	/** 创建支付 */
	async creatPayRecord() {

		// 数据校验
		let rules = {
			type: 'must|int|comment=支付类型 1=预约支付,2=充值',
			amount: 'must|int|comment=支付金额',
			meetId: 'string|comment=关联预约',
			editTime: 'must|int|comment=支付时间',
			recordNum: 'must|string|comment=微信支付订单号'
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new PaymentService();
		let result = await service.creatRecord({...input, userId: this._userId});

		return result;

	}
}

module.exports = PaymentRecordController;