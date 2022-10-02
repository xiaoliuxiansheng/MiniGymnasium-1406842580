/**
 * Notes: 预约后台管理
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY 1406842580@qq.com (wechat)
 * Date: 2021-12-08 07:48:00 
 */

const BaseAdminService = require('./base_admin_service.js');
const TempModel = require('../../model/temp_model.js');

class AdminTempService extends BaseAdminService {

	/**添加模板 */
	async insertTemp({
		name,
		times,
	}) {
		this.AppError('此功能暂不开放，如有需要请加作者微信：yjliuliu123');
	}

	/**更新数据 */
	async editTemp({
		id,
		limit,
		isLimit
	}) {

		this.AppError('此功能暂不开放，如有需要请加作者微信：yjliuliu123');
	}


	/**删除数据 */
	async delTemp(id) {
		let where = {
			_id: id
		}

		await TempModel.del(where);
		return;
	}


	/**分页列表 */
	async getTempList() {
		let orderBy = {
			'TEMP_ADD_TIME': 'desc'
		};
		let fields = 'TEMP_NAME,TEMP_TIMES';

		let where = {};
		return await TempModel.getAll(where, fields, orderBy);
	}
}

module.exports = AdminTempService;