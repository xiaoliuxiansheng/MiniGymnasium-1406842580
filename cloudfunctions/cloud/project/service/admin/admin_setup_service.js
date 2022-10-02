/**
 * Notes: 设置管理
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY 1406842580@qq.com (wechat)
 * Date: 2021-07-11 07:48:00 
 */

const BaseAdminService = require('./base_admin_service.js');
const cloudBase = require('../../../framework/cloud/cloud_base.js');
const cloudUtil = require('../../../framework/cloud/cloud_util.js');
const SetupModel = require('../../model/setup_model.js');
const config = require('../../../config/config.js');

class AdminSetupService extends BaseAdminService {


	/** 关于我们 */
	async setupAbout({
		about,
		aboutPic
	}) {
		this.AppError('此功能暂不开放，如有需要请加作者微信：yjliuliu123');
	}

	/** 联系我们设置 */
	async setupContact({
		address,
		phone,
		officePic,
		servicePic,
	}) {

		this.AppError('此功能暂不开放，如有需要请加作者微信：yjliuliu123');
	}

	/** 小程序码 */
	async genMiniQr() {
		//生成小程序qr buffer
		this.AppError('此功能暂不开放，如有需要请加作者微信：yjliuliu123');
	}

}

module.exports = AdminSetupService;