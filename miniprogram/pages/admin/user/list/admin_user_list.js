const AdminBiz = require('../../../../biz/admin_biz.js');
const pageHelper = require('../../../../helper/page_helper.js');
const cloudHelper = require('../../../../helper/cloud_helper.js');

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		modifyInfo: {},
		showModifykModal: false,
		classTypes: [
			{
				label: '基础',
				val: '1'
			},
			{
				label: '提高',
				val: '2'
			},
			{
				label: '竞技',
				val: '3'
			}
		],
		classTypeId: '',
		coachPlaceId: '',
		placeOptions: [],
		showModifyClassTypeModal: false,
		showModifyPlaceModal: false
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
		wx.pageScrollTo({
			scrollTop: 0
		})
		this.setData({
			showModifykModal: true,
			modifyInfo: e.currentTarget.dataset.info
		})
	},
	// 修改课程类型
	bindOpenClassTypeModel: async function (e) {
		wx.pageScrollTo({
			scrollTop: 0
		})
		const {USER_CLASS_TYPE, USER_MINI_OPENID} = e.currentTarget.dataset.info
		this.setData({
			classTypeId: USER_CLASS_TYPE,
			showModifyClassTypeModal: true,
			modifyUserId: USER_MINI_OPENID
		})
	},
	selectClassType: async function(e) {
		this.setData({
			classTypeId: e.detail
		})
	},
	selectPlaceType: async function(e) {
		this.setData({
			coachPlaceId: e.detail
		})
	},
	// 修改场地
	bindOpenPlaceModel: async function (e) {
		wx.pageScrollTo({
			scrollTop: 0
		})
		const {USER_PLACE_ID, USER_MINI_OPENID} = e.currentTarget.dataset.info
		if (!this.data.placeOptions.length) {
			const data = await await cloudHelper.callCloudSumbit('meet/list', {page: 1, typeId: '1', size: 999})
			this.setData({
				placeOptions: data.data.list.map(item => ({label: item.title, val: item._id}))
			})
		}
		this.setData({
			coachPlaceId: USER_PLACE_ID,
			showModifyPlaceModal: true,
			modifyUserId: USER_MINI_OPENID,
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
	},
	bindModifyClassType: async function(e) {
		const {classTypeId, modifyUserId} = this.data
		let params = {
			USER_CLASS_TYPE: classTypeId,
			USER_MINI_OPENID: modifyUserId
		}
		try {
			await cloudHelper.callCloudSumbit('admin/user_edit_class_type', params).then(res => {
				pageHelper.modifyListNode(modifyUserId, this.data.dataList.list, 'USER_CLASS_TYPE', classTypeId, 'USER_MINI_OPENID');
				this.setData({
					dataList: this.data.dataList,
					showModifyClassTypeModal: false
				});
				pageHelper.showSuccToast('设置成功');
			});
		} catch (e) {
			console.log(e);
		}
	},
	bindModifyPlaceType: async function(e) {
		const {coachPlaceId, modifyUserId, placeOptions} = this.data
		const USER_PLACE_NAME = placeOptions.find(item => item.val == coachPlaceId).label
		let params = {
			USER_PLACE_ID: coachPlaceId,
			USER_MINI_OPENID: modifyUserId,
			USER_PLACE_NAME
		}
		try {
			await cloudHelper.callCloudSumbit('admin/user_edit_coach_place', params).then(res => {
				pageHelper.modifyListNode(modifyUserId, this.data.dataList.list, 'USER_PLACE_NAME', USER_PLACE_NAME, 'USER_MINI_OPENID');
				this.setData({
					dataList: this.data.dataList,
					showModifyPlaceModal: false
				});
				pageHelper.showSuccToast('设置成功');
			});
		} catch (e) {
			console.log(e);
		}
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
			},

		]
		this.setData({
			sortItems,
			sortMenus
		})


	}

})