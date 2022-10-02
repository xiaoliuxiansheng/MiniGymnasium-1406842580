/** 
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY 1406842580@qq.com (wechat)
 * Date: 2020-10-29 07:48:00 
 */

const MeetBiz = require('../biz/meet_biz.js');
const pageHelper = require('../helper/page_helper.js');
const cloudHelper = require('../helper/cloud_helper.js');
const timeHelper = require('../helper/time_helper.js');

module.exports = Behavior({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	methods: {
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function (options) {
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
		onPullDownRefresh: function () {

		},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function () {

		},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function () {

		},

		url: async function (e) {
			pageHelper.url(e, this);
		},

		bindCommListCmpt: function (e) {
			pageHelper.commListListener(this, e);
		},

		/** 搜索菜单设置 */
		getSearchMenu: function (skin, that) {

			wx.setNavigationBarTitle({
				title: '我的' + skin.MEET_NAME
			});

			let sortItem1 = [{
				label: '排序',
				type: '',
				value: ''
			}, {
				label: '按时间倒序',
				type: 'timedesc',
				value: ''
			}, {
				label: '按时间正序',
				type: 'timeasc',
				value: ''
			}];

			let sortItems = [sortItem1];
			let sortMenus = [{
					label: '全部',
					type: '',
					value: ''
				}, {
					label: '今日',
					type: 'today',
					value: ''
				}, {
					label: '明日',
					type: 'tomorrow',
					value: ''
				}, {
					label: '已预约',
					type: 'succ',
					value: ''
				},
				{
					label: '已取消',
					type: 'cancel',
					value: ''
				}
			]

			that.setData({
				sortItems,
				sortMenus
			});

		},
		bindCancelTap: async function (e) {
			const {JOIN_MEET_TIME_START, JOIN_MEET_DAY} = e.currentTarget.dataset.info
			const str = JOIN_MEET_DAY.split(" ")[0] + ' ' + JOIN_MEET_TIME_START
			const year = str.split('年')[0]
			let month = str.split('月')[0].split('年')[1]
			month = month > 9 ? month : '0' + month
			let day = str.split('月')[1].split('日')[0]
			day = day > 9 ? day : '0'+day
			const time = year+'-'+month+'-'+day + ' ' + JOIN_MEET_TIME_START
			const timetamp = timeHelper.time2Timestamp(time)
			const nowTimetamp = new Date().getTime()
			if ( timetamp > nowTimetamp && (timetamp - nowTimetamp) < 24 * 60 * 60 * 1000) {
				wx.showToast({
					title: '离开课时间不超过24小时，不能取消',
					icon: 'none',
					duration: 2000
				  })				  
				return
			}
			let callback = async () => {
				let joinId = pageHelper.dataset(e, 'id');
				try {
					let params = {
						joinId
					}
					let opts = {
						title: '取消中'
					}

					await cloudHelper.callCloudSumbit('my/my_join_cancel', params, opts).then(res => {
						pageHelper.modifyListNode(joinId, this.data.dataList.list, 'JOIN_STATUS', 10, '_id');
						this.setData({
							dataList: this.data.dataList
						});
						pageHelper.showNoneToast('已取消');
					});
				} catch (err) {
					console.log(err);
				}
			}

			pageHelper.showConfirm('确认取消该预约?', callback);
		}
	}
})