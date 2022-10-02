// projects/A00/my/activity/edit/activity_edit.js
const pageHelper = require('../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../helper/cloud_helper.js');
const validate = require('../../../../../helper/validate.js');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		formDesc: '',
		formCoachId: '',
		formScore: '',
		formContent: '',
		params: {
			type: null
		},
		coachList: [],
		scoreList: [],
		userInfo: []
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	async onLoad(options) {
		this.setData({
			params: {...options}
		})
		const scoreArr  = []
		for (let index = 1; index <= 10; index++) {
			scoreArr.push({
				label: index + '分',
				val: index
			})
		}
		this.setData({
			scoreList: scoreArr
		})
		if (+options.type === 1) {
			let opts = {
				title: 'bar'
			}
			const list = await cloudHelper.callCloudData('passport/get_all_coach', {}, opts);
			this.setData({
				coachList: list.map(item => ({...item, label: item.USER_NAME, val: item.USER_MINI_OPENID}))
			})
			let user = await cloudHelper.callCloudData('passport/my_detail', {});
			this.setData({
				userInfo: user
			})
		}
	},

	/***
	 * 选择教练
	 */
	bindSelectCoach: function(e) {
		this.setData({
			formCoachId: e.detail
		})
	},
	/**
	 * 选分
	 */
	bindSelectScore: function(e) {
		this.setData({
			formScore: e.detail
		})
	},
	/** 
	 * 数据提交
	 */
	bindFormSubmit: async function () {
		console.log(this.data)
		let {formCoachId, formScore, formContent} = this.data;
		const {type} = this.data.params
		if(+type === 1 && !formCoachId) {
			return pageHelper.formHint(this, 'formCoachId', '请选择「教练」');
		}

		if(+type === 1 && !formScore) {
			return pageHelper.formHint(this, 'formScore', '请选择「评分」');
		}

		if(!formContent) {
			return pageHelper.formHint(this, 'formContent', '请填写「描述」');
		}

		let params = {
			content: formContent,
			activityId: this.data.params.id,
			type,
			userName: this.data.userInfo.USER_NAME
		}

		if (+type === 1) {
			params.coachId = formCoachId
			params.coachName = this.data.coachList.find(coach => formCoachId === coach.val).label
			params.score = formScore
		} 
		console.log(params)
		try {
		
			wx.showLoading({
				title: '提交中...',
				mask: true
			});
			await cloudHelper.callCloudSumbit('activity/activity_submit', params);
			pageHelper.showSuccToast('添加成功', 2000, () => wx.navigateBack());

		} catch (err) {
			console.log(err);
		}

	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage() {

	}
})