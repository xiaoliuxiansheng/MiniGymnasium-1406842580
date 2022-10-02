const AdminBiz = require('../../../../biz/admin_biz.js');
const pageHelper = require('../../../../helper/page_helper.js');
const cloudHelper = require('../../../../helper/cloud_helper.js');
const timeHelper = require('../../../../helper/time_helper.js');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		sortMenusDefaultIndex: null
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		if (!AdminBiz.isAdmin(this)) return;
		pageHelper.getOptions(this, options, 'userId');
		console.log(this.data.userId)
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

	bindSortTap: function (e) {
		this.setData({
			sortMenusDefaultIndex: e.currentTarget.dataset.value
		})
		this.loadData()
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
		let sortMenus = [
			{
				label: '本月',
				type: 'time',
				value: localMonth
			},
			{
				label: '全部',
				type: 'time',
				value: 'all'
			}
		]
		this.setData({
			sortMenus,
			sortMenusDefaultIndex: sortMenus[0].value
		})
		this.loadData()
	},

	loadData: async function() {
		try {
			await cloudHelper.callCloudSumbit('admin/coach_attendance', {coachId: this.data.userId,time: this.data.sortMenusDefaultIndex, }).then(res => {
				this.dealData(res.data)
			});
		} catch (e) {
			console.log(e);
		}
	},
	dealData: function(data) {
		//signStatus 1 已签到 2 可签到 3 未签到 4 待签到未到签到时间
		const obj = {
			yes: 0, //已签到
			can: 0, //待签到
			no: 0, //未签到
			await: 0, //未到签到时间
			total: 0
		}
		data.forEach(item => {
			item.times.forEach(time => {
				obj.total++
				switch (time.signStatus) {
					case 1:
						obj.yes++;
						break;
					case 2:
						obj.can++;
						break;
					case 3:
						obj.no++
						break;
					case 4:
						obj.await ++;
						break;			
				}
			})
		})
		this.setData({
			attendanceInfo: obj
		})
	}

})