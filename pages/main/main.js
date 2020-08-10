// pages/main/main.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mapWidth:10,
        mapHeight:15,
        minnerCnt:25,
        minnerFlags :[]
    },

    //初始化数据
    initMinner:function(){

    },

    //标记、取消标记地雷
    markMinner:function(btn){
        
    },

    //双击打开此按钮、双击打开周围9宫格区域
    openMinner:function(btn){

    },

    // 触摸开始时间
    touchStartTime: 0,
    // 触摸结束时间
    touchEndTime: 0,  
    // 最后一次单击事件点击发生时间
    lastTapTime: 0, 

     /// 单击、双击
  multipleTap: function(e) {
    var that = this
    // 控制点击事件在350ms内触发，加这层判断是为了防止长按时会触发点击事件
    if (that.touchEndTime - that.touchStartTime < 350) {
      // 当前点击的时间
      var currentTime = e.timeStamp
      var lastTapTime = that.lastTapTime
      // 更新最后一次点击时间
      that.lastTapTime = currentTime
      
      // 如果两次点击时间在300毫秒内，则认为是双击事件
      if (currentTime - lastTapTime < 300) {
        console.log("double tap")
        // 成功触发双击事件时，取消单击事件的执行
        clearTimeout(that.lastTapTimeoutFunc);
        wx.showModal({
          title: '提示',
          content: '双击事件被触发',
          showCancel: false
        })
      } else {
        // 单击事件延时300毫秒执行，这和最初的浏览器的点击300ms延时有点像。
        that.lastTapTimeoutFunc = setTimeout(function () {
          console.log("tap")
          wx.showModal({
            title: '提示',
            content: '单击事件被触发',
            showCancel: false
          })
        }, 300);
      }
    }
},


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        //this.setData({mapWidth:10,mapHeight:15});
        var app = getApp();
        this.setData({
            mapHeight:app.globalData.mapHeight,
            mapWidth:app.globalData.mapWidth,
            minnerCnt : app.globalData.minnerCnt
        });
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

    }
})