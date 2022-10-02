const AdminBiz = require('../../../../biz/admin_biz.js');
const pageHelper = require('../../../../helper/page_helper.js');
const bizHelper = require('../../../../biz/biz_helper.js');
const cloudHelper = require('../../../../helper/cloud_helper.js');
const validate = require('../../../../helper/validate.js');
const AdminNewsBiz = require('../../../../biz/admin_news_biz.js');

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		id: null,

		contentDesc: '',

		// 分类
		cateIdOptions: [
			{
				label: '教练员水平评估',
				val: 1,
			},
			{
				label: '问卷调查',
				val: 2,
			}
		],

		// 图片数据 
		imgList: [],
		// 表单数据 
		formType: 1, //类型 
		formOrder: 9999,
		formTitle: '',
		formDesc: '',
		formUrl: '',
		formContent: [],
		formEndTime: ''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		if (!AdminBiz.isAdmin(this)) return;

		this.setData({
			isLoad: true
		});

		this._setContentDesc();
	},

	_setContentDesc: function () {
		AdminBiz.setContentDesc(this);
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

	model: function (e) {
		pageHelper.model(this, e);
	},

	/** 
	 * 数据提交
	 */
	bindFormSubmit: async function () {
		if (!AdminBiz.isAdmin(this)) return;
		console.log(this.data)
		let {formEndTime, formDesc, formTitle, formType} = this.data;
		if(!formTitle) {
			return pageHelper.formHint(this, 'formTitle', '请填写「标题」');
		}

		if(!formType) {
			return pageHelper.formHint(this, 'formType', '请选择「类型」');
		}

		if(!formEndTime) {
			return pageHelper.formHint(this, 'formType', '请选择「结束时间」');
		}

		const params = {
			title: formTitle,
			type: formType,
			endTime: formEndTime,
			describe: formDesc
		}

		console.log(params)
		try {
		
			wx.showLoading({
				title: '提交中...',
				mask: true
			});
			await cloudHelper.callCloudSumbit('admin/activity_insert', params);
			pageHelper.showSuccToast('添加成功', 2000, () => wx.navigateBack());

		} catch (err) {
			console.log(err);
		}

	},

	bindDateChange: function(e) {
		this.setData({
			formEndTime: e.detail.value
		})
		console.log(e)
	},
	bindSelectType: function(e) {
		this.setData({
			formType: e.detail
		})
	},
	bindImgUploadCmpt: function (e) {
		this.setData({
			imgList: e.detail
		});
	},

	switchModel: function (e) {
		pageHelper.switchModel(this, e);
	},

	url: function (e) {
		pageHelper.url(e, this);
	}
})