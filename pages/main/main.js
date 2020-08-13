// pages/main/main.js
Page({

  /**
   * 页面的初始数据
  */
  data: {
    mapWidth: 10,
    mapHeight: 15,
    minnerCnt: 25,
    minnerFlags: [0][0],   //地图数组，0：非雷未操作，1：雷未操作  
    //2：非雷标雷  3：雷标雷   4：非雷被打开  5：雷被打开
    minnerTexts: ['&nbsp;&nbsp;&nbsp;', '&nbsp;&nbsp;&nbsp;', '🚩', '🚩', '&nbsp;&nbsp;&nbsp;', '💣', , , , , , '💣', '❌', '💣']

    //，0：非雷未操作，1lei：雷未操作     2：非雷标雷  3：雷标雷 🚩  4：非雷被打开  5：雷被打开
    //雷未操作1，11💣       非雷标雷2，12 ❌       雷被打开5，13 😡 
  },


  //初始化数据
  initMinner: function () {

    //初始化雷标记数组
    var len = this.data.mapHeight * this.data.mapWidth;
    var minnerLeft = this.data.minnerCnt;
    var flags = new Array(len).fill(0);

    while (minnerLeft > 0) {
      var randPos = Math.floor(Math.random() * (len));
      if (flags[randPos] == 0) {
        flags[randPos] = 1;
        minnerLeft--;
      } else {
        continue;
      }

    }
    //console.log(flags);
    this.setData({ minnerFlags: this.transformArray(flags, this.data.mapWidth) });
    console.log(this.data.minnerFlags);
  },

  //数组操作：1维转2维
  transformArray: function (oneDivArray, width) {

    var len = oneDivArray.length / width;
    var twoDivArray = [width];
    for (var i = 0; i < len; i++) {
      twoDivArray[i] = oneDivArray.slice(i * width, (i + 1) * width);
    }
    return twoDivArray;

  },

  //标记、取消标记地雷
  markMinner: function (btn) {
    //console.log(btn);
    var i = btn.target.dataset.posx;
    var j = btn.target.dataset.posy;
    var status = this.data.minnerFlags[i][j];

    //第二版
    var statusMap = new Map();
    statusMap.set(0, 2);
    statusMap.set(1, 3);
    statusMap.set(2, 0);
    statusMap.set(3, 1);

    var targetStatus = statusMap.get(status);

    if (targetStatus != null) {
      this.data.minnerFlags[i][j] = targetStatus;
      this.setData({ minnerFlags: this.data.minnerFlags });
    }


    //第一版
    // switch(status){
    //   case 0: 
    //     this.data.minnerFlags[i][j] =2;
    //     //this.setData({});
    //     break;
    //   case 1:
    //     this.data.minnerFlags[i][j] =3;
    //     break;
    //   case 2:
    //     this.data.minnerFlags[i][j] =0;
    //     break;
    //   case 3:
    //     this.data.minnerFlags[i][j] =1;
    //     break;
    //   case 4:break;
    //   case 5:break;
    //   default:break;

    // }

    //this.setData({minnerFlags:this.data.minnerFlags});
  },

  //打开空白区域时，标注数字（周围9宫格的雷数目）
  markMinnerCnt:function(x,y){
    var cnt =0;
    for (var i = x > 0 ? x - 1 : 0; i <= x + 1 && i < this.data.mapHeight; i++) {
      for (var j = y > 0 ? y - 1 : 0; j <= y+ 1 && j < this.data.mapWidth; j++) {
        //if ( i == posX && j == posY) continue;
        if ([1 ,2, 5, 11, 13].includes( this.data.minnerFlags[i][j] ) ) //1 2 5 11 13
          cnt ++;
      }
    }
    return cnt;

  },


  //打开联通区域
  openRange: function (posX, posY) {
    function Point(i, j) {
      this.x = i;
      this.y = j;
    }
    //取当前位置为中心的其他八个方位
    var points = [];

    //四个方位的
    if (posX>0)
      points.push(new Point(posX-1, posY));
    if (posX + 1<this.data.mapHeight )
      points.push(new Point(posX+1, posY));
    if (posY>0)
      points.push(new Point(posX,posY-1));
    if (posY +1 < this.data.mapWidth)
      points.push(new Point(posX,posY+1));
    
    //过滤出有效位置 八个方位的
    // for (var i = posX > 0 ? posX - 1 : 0; i <= posX + 1 && i < this.data.mapHeight; i++) {
    //   for (var j = posY > 0 ? posY - 1 : 0; j <= posY+ 1 && j < this.data.mapWidth; j++) {
    //     if ( i == posX && j == posY) continue;
    //     points.push(new Point(i, j));
    //   }
    // }

    
    var point;
    while ( (point= points.pop()) != undefined ){
      //仅循环是未标记状态的    已打开状态的不要处理，会死循环    
      if (this.data.minnerFlags[point.x][point.y] >0 )continue;
      //伪装btn事件数据
      var btn ={target:{dataset:{posx:point.x,posy:point.y}}};
      this.openMinner(btn,true);//调用openMinner 
    }

  },

  //双击打开此按钮、双击打开周围9宫格区域
  openMinner: function (btn,iterator) {
    //console.log(btn);
    var i = btn.target.dataset.posx;
    var j = btn.target.dataset.posy;
    var status = this.data.minnerFlags[i][j];


    //第二版
    var statusMap = new Map();
    statusMap.set(0, 4);//打开非雷区，变成空白
    statusMap.set(1, 5);//打开雷区，爆炸GG
    statusMap.set(4,4);//双击空白(已打开区域)
    //statusMap.set(5,5);//

    var targetStatus = statusMap.get(status);

    if (targetStatus != null) {
      this.data.minnerFlags[i][j] = targetStatus;
      this.setData({ minnerFlags: this.data.minnerFlags });

      //GG判断
      if (status == 1) {
        this.gameOver();
      }

      //打开空白后，计数周围雷数目
      if (status==0){
        var  minnerCnt = this.markMinnerCnt(i,j);
       //TOODOOOOOOOOOOOOOO





      }
      //双击空白，打开周围9宫格 TODO
      if (status == 4 || status==0 && iterator) {
        this.openRange(i, j);
      }
      
    }
  },

  //game over
  gameOver: function () {

    //    
    var statusMap = new Map();
    statusMap.set(1, 11);//打开非雷区，变成空白
    statusMap.set(2, 12);
    statusMap.set(5, 13);//打开雷区，爆炸GG lei

    //循环标记出所有错误。禁止点击
    for (var i = 0; i < this.data.mapHeight; i++) {
      for (var j = 0; j < this.data.mapWidth; j++) {
        //全部按钮置为 禁用 TODO 
        //打标记
        var statusCode = this.data.minnerFlags[i][j];
        var newStatusCode = statusMap.get(statusCode);
        if (newStatusCode != null) {
          this.data.minnerFlags[i][j] = newStatusCode;
        }
      }
    }

    this.setData({ minnerFlags: this.data.minnerFlags });


  },


  // 触摸开始时间
  touchStartTime: 0,
  // 触摸结束时间
  touchEndTime: 0,
  // 最后一次单击事件点击发生时间
  lastTapTime: 0,

  //自定义的单击、双击
  multipleTap: function (e) {
    var that = this
    // 控制点击事件在350ms内触发，加这层判断是为了防止长按时会触发点击事件
    if (that.touchEndTime - that.touchStartTime < 350) {
      var currentTime = e.timeStamp
      var lastTapTime = that.lastTapTime
      that.lastTapTime = currentTime

      // 如果两次点击时间在300毫秒内，则认为是双击事件
      if (currentTime - lastTapTime < 300) {
        //console.log("double tap")
        // 成功触发双击事件时，取消单击事件的执行
        clearTimeout(that.lastTapTimeoutFunc);
        //todo 
        that.openMinner(e);


      } else {
        //单击事件延时300毫秒执行
        that.lastTapTimeoutFunc = setTimeout(function () {
          //console.log("tap")
          //todo
          that.markMinner(e);
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
      mapHeight: app.globalData.mapHeight,
      mapWidth: app.globalData.mapWidth,
      minnerCnt: app.globalData.minnerCnt
    });

    this.initMinner();
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