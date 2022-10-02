const AdminBiz = require('../../../../biz/admin_biz.js');
const pageHelper = require('../../../../helper/page_helper.js');
const cloudHelper = require('../../../../helper/cloud_helper.js');
const timeHelper = require('../../../../helper/time_helper.js');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		modifyInfo: {},
		showModifykModal: false
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		if (!AdminBiz.isAdmin(this)) return;

		//设置搜索菜单
		await this._getSearchMenu();
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: async function () {},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	url: async function (e) {
		pageHelper.url(e, this);
	},


	bindCommListCmpt: function (e) {
		pageHelper.commListListener(this, e);
	},

	bindDelTap: async function (e) {
		if (!AdminBiz.isAdmin(this)) return;
		let id = pageHelper.dataset(e, 'id');

		let params = {
			id
		}

		let callback = async () => {
			try {
				let opts = {
					title: '删除中'
				}
				await cloudHelper.callCloudSumbit('admin/user_del', params, opts).then(res => {
					
					pageHelper.delListNode(id, this.data.dataList.list, 'USER_MINI_OPENID');
					this.data.dataList.total--;
					this.setData({
						dataList: this.data.dataList
					});
					pageHelper.showSuccToast('删除成功');
				});
			} catch (e) {
				console.log(e);
			}
		}
		pageHelper.showConfirm('确认删除？删除不可恢复', callback);

	},

	bindOpenModel: async function (e) {
		this.setData({
			showModifykModal: true,
			modifyInfo: e.currentTarget.dataset.info
		})
	},
	bindCanUseInput(e) {
		this.setData({
			modifyInfo: {...this.data.modifyInfo, USER_CANUSE_COUNT: +e.detail.value}
		})
	},
	bindModifyCanUse: async function(e) {
		if (!AdminBiz.isAdmin(this)) return;
		const {USER_MINI_OPENID, USER_CANUSE_COUNT} = this.data.modifyInfo
		let params = {
			USER_MINI_OPENID,
			USER_CANUSE_COUNT
		}
		try {
			await cloudHelper.callCloudSumbit('admin/user_can_use_num', params).then(res => {
				pageHelper.modifyListNode(USER_MINI_OPENID, this.data.dataList.list, 'USER_CANUSE_COUNT', USER_CANUSE_COUNT, 'USER_MINI_OPENID');
				this.setData({
					dataList: this.data.dataList,
					showModifykModal: false
				});
				pageHelper.showSuccToast('设置成功');
			});
		} catch (e) {
			console.log(e);
		}
		// this.setData({
		// 	showModifykModal: true,
		// 	modifyInfo: e.currentTarget.dataset.info
		// })
	},
	bindStatusTap: async function (e) {
		if (!AdminBiz.isAdmin(this)) return;
		let id = pageHelper.dataset(e, 'id');
		let status = pageHelper.dataset(e, 'status');

		let params = {
			id,
			status
		}
		try {
			await cloudHelper.callCloudSumbit('admin/user_status', params).then(res => {
				pageHelper.modifyListNode(id, this.data.dataList.list, 'USER_STATUS', status, 'USER_MINI_OPENID');
				this.setData({
					dataList: this.data.dataList
				});
				pageHelper.showSuccToast('设置成功');
			});
		} catch (e) {
			console.log(e);
		}
	},

	_getSearchMenu: async function () {
		const now = new Date()
		const localMonth = timeHelper.timestamp2Time(now.getTime(), 'Y-M')
		let year = localMonth.split('-')[0]
		let month = +localMonth.split('-')[1]
		if (month > 10) {
			month--
		} else if (month > 1) {
			month = '0' + month - 1
		} else {
			year = year--
			month = 12
		}
		const frontMonth = year + '-' + month // 上一月
		// console.log(localMonth)
		let sortItems = [];
		let sortMenus = [{
			label: '全部',
			type: '',
			value: ''
		}, {
			label: '正常',
			type: 'status',
			value: 1
		}, 
		{
			label: '注册时间正序',
			type: 'sort',
			value: 'newasc'
		},
		{
			label: '注册时间倒序',
			type: 'sort',
			value: 'newdesc'
		}]
		// let sortMenus = [
		// 	{
		// 		label: '全部',
		// 		type: 'time',
		// 		value: 'all'
		// 	},
		// 	{
		// 		label: '本月',
		// 		type: 'time',
		// 		value: localMonth
		// 	},
		// ]
		this.setData({
			sortItems,
			sortMenus
		})


	}

})