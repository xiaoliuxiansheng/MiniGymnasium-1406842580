/**
 * Notes: 支付记录表
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY 1406842580@qq.com (wechat)
 * Date: 2022-09-14 19:20:00 
 */


const BaseModel = require('./base_model.js');
class PaymentRecordModel extends BaseModel {}

// 集合名
PaymentRecordModel.CL = "ax_payment_record";

PaymentRecordModel.DB_STRUCTURE = {
	_pid: 'string|true',
	PARMENT_USER_ID: 'string|true|comment=付款人ID',
	PAYMENT_TYPE: 'int|true|default=1|comment=支付类型 1=预约支付,2=充值',
	PAYMENT_AMOUNT: 'int|true|comment=支付金额',
	PAYMENT_MEET_ID: 'string|false|comment=关联预约',
	PAYMENT_EDIT_TIME: 'int|true',
	PAYMENT_RECORD_NUM: 'string|true|comment=微信支付订单号',
	PARMENT_STATUS: 'string|false|default=padding|comment=支付状态'
}

// 字段前缀
PaymentRecordModel.FIELD_PREFIX = "PAYMENT_TYPE_";


module.exports = PaymentRecordModel;