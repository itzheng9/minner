//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '单击：标记、取消标记地雷\r\n双击按钮：打开区域\r\n双击空白区域：打开周围九宫格未标记区域',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },  
  onLoad: function () {
    if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    }
  },
  getUserInfo: function(e) {
    //console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  play:function(e){
      wx.navigateTo({
        url: '../logs/logs',
      })
  },
  settings:function(e){
    wx.navigateTo({
      url: '../settings/settings',
    })
}
})
