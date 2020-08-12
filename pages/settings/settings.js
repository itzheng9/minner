// pages/settings.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mapHeight:11,
        mapWidth:6,
        minnerCnt:21
    },

    difficultChange:function(e){
        //将单选按钮的值 转换为 宽 高 和雷数目，赋值给全局变量 TODO
        if (e.detail.value=='r1'){
            this.setData({mapHeight:15,mapWidth:8,minnerCnt:45});
        }
        if (e.detail.value=='r2'){
            this.setData({mapHeight:20,mapWidth:12,minnerCnt:75});
        }
        if (e.detail.value=='r3'){
            this.setData({mapHeight:25,mapWidth:15,minnerCnt:180});
        }

        var app = getApp();
        app.globalData.mapHeight = this.data.mapHeight;        
        app.globalData.mapWidth = this.data.mapWidth;
        app.globalData.minnerCnt = this.data.minnerCnt;
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var app = getApp();
        this.setData({mapHeight:app.globalData.mapHeight,
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