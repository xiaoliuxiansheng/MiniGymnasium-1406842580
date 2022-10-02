/** 
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY 1406842580@qq.com (wechat)
 * Date: 2020-10-29 07:48:00 
 */

const pageHelper = require('../helper/page_helper.js');
const cloudHelper = require('../helper/cloud_helper.js');
const validate = require('../helper/validate.js');

module.exports = Behavior({

	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: false,
		userTypes: [ // 人员类型
			{
				label: '学员',
				val: 1
			},
			{
				label: '教练',
				val: 2
			}
		],
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
		placeOptions: [],
		imgList:[],
	},

	methods: {
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: async function (options) {
			await this._loadDetail();
		},

		_loadDetail: async function (e) {

			let opts = {
				title: 'bar'
			}
			let user = await cloudHelper.callCloudData('passport/my_detail', {}, opts);
			await cloudHelper.callCloudSumbit('meet/list', {page: 1, typeId: "1", size: 999}, opts).then(res => {
				const placeOptions = res.data.list.map(item => ({label: item.title, val: item._id}))
		
				this.setData({
					placeOptions
				})
			});
			if (!user) {
				this.setData({
					isLoad: true,
					formName: '',
					formMobile: '',
					formCity: '',
					formWork: '',
					formTrade: '',
					formUserIcon: [],
					formUserType: 0,
					formUserBrith: '',
					formUserPlaceId: '',
					formUserPlaceName: '',
					formUserCoachType: false,
					formClassType: ''
				});
				wx.setNavigationBarTitle({
					title: '注册'
				});
				return;
			};
			this.setData({ 
				isLoad: true,
				formName: user.USER_NAME,
				formMobile: user.USER_MOBILE,
				formTrade: user.USER_TRADE,
				formWork: user.USER_WORK,
				formCity: user.USER_CITY,
				formUserType: user.USER_TYPE,
				formUserPlaceId: user.USER_PLACE_ID,
				formUserIcon: user.USER_ICON,
				formUserBrith: user.USER_BRITH,
				formUserCoachType: user.USER_COACH_TYPE,
				formUserPlaceName: user.USER_PLACE_NAME,
				formClassType: user.USER_CLASS_TYPE
			})
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function () {

		},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function () {

		},

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

		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: async function () {
			await this._loadDetail();
			wx.stopPullDownRefresh();
		},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function () {

		},

		bindGetPhoneNumber: async function (e) {
			if (e.detail.errMsg == "getPhoneNumber:ok") {

				let cloudID = e.detail.cloudID;
				let params = {
					cloudID
				};
				let opt = {
					title: '手机验证中'
				};
				await cloudHelper.callCloudSumbit('passport/phone', params, opt).then(res => {
					let phone = res.data;
					if (!phone || phone.length < 11)
						wx.showToast({
							title: '手机号码获取失败，请重新绑定手机号码',
							icon: 'none',
							duration: 4000
						});
					else {
						let idx = pageHelper.dataset(e, 'idx');
						this._setForm(idx, phone);
					}
				});
			} else
				wx.showToast({
					title: '手机号码获取失败，请重新绑定手机号码',
					icon: 'none'
				});
		},
		bindGetPhoneNumber: async function (e) {
			if (e.detail.errMsg == "getPhoneNumber:ok") {

				let cloudID = e.detail.cloudID;
				let params = {
					cloudID
				};
				let opt = {
					title: '手机验证中'
				};
				await cloudHelper.callCloudSumbit('passport/phone', params, opt).then(res => {
					let phone = res.data;
					if (!phone || phone.length < 11)
						wx.showToast({
							title: '手机号码获取失败，请重新填写手机号码',
							icon: 'none',
							duration: 2000
						});
					else {
						this.setData({
							formMobile: phone
						});
					}
				});
			} else
				wx.showToast({
					title: '手机号码获取失败，请重新填写手机号码',
					icon: 'none'
				});
		},


		bindSubmitTap: async function (e) {
			try {
				let data = this.data;
				let mobile = data.formMobile;
				if (mobile.length != 11) return pageHelper.showModal('请填写正确的手机号码');

				let CHECK_FORM = {
					name: 'formName|must|string|min:1|max:20|name=姓名',
					mobile: 'formMobile|must|len:11|name=手机',
					city: 'formCity|string|max:100|name=所在城市',
					work: 'formWork|string|max:100|name=所在单位',
					trade: 'formTrade|string|max:100|name=行业领域',
					userType: 'formUserType|number|must|name=人员类型',
					userPlaceId: 'formUserPlaceId|string|name=教练关联场地',
					userIcon: 'formUserIcon|must|array|name=头像',
					userBrith: 'formUserBrith|must|string|name=生日',
					userCoachType: 'formUserCoachType|boolean|name=教练类型',
					userPlaceName: 'formUserPlaceName|string|name=教练关联场地名称',
					userClassType: 'formClassType|string|name=课程类型'
				};
				// 数据校验 
				data = validate.check(data, CHECK_FORM, this);
				if (!data) return;
				if (data.userType == 2 && !data.userPlaceName) {
					wx.showToast({
					  title: '请选择场地！',
					  icon: 'none'
					})
					return
				} else if (data.userType == 1 && !data.userClassType) {
					wx.showToast({
						title: '请选择课程类型！',
						icon: 'none'
					  })
					  return
				}
				let opts = {
					title: '提交中'
				}
				await cloudHelper.callCloudSumbit('passport/edit_base', data, opts).then(res => {
					let callback = () => {
						wx.navigateBack();
					}
					pageHelper.showSuccToast('提交成功', 1500, callback);
				});
			} catch (err) {
				console.error(err);
			}
		},
		handleUserType: function(e) {
			this.setData({
				formUserType: e.detail
			})
		},
		handleUserPlace: function(e) {
			const formUserPlaceName = (this.data.placeOptions.find(item => item.val === e.detail) || {}).label
			this.setData({
				formUserPlaceId: e.detail,
				formUserPlaceName
			})
		},
		handleClassType: function(e) {
			console.log(e)
			this.setData({
				formClassType: e.detail,
			})
		},
		bindImgUploadCmpt: function(e) {
			this.setData({
				formUserIcon: e.detail
			});
		},
		bindDateChange: function(e) {
			this.setData({
				formUserBrith: e.detail.value
			});
		},
		switch1Change: function(e) {
			this.setData({
				formUserCoachType: e.detail.value
			});
		}
	}
})