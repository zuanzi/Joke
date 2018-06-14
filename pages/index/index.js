//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    array: [],
    searchLoading: false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
      this.getJoke()
  },
  onPullDownRefresh: function(){
      console.log("refresh.....")
      this.getJoke()
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getJoke: function () {
    var that = this
    wx.request({
      url: 'https://v.juhe.cn/joke/randJoke.php?key=fac993ec4783b96ad018efe7e763914c', 
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        //console.log(res.data.result)
        var extract_info = res.data.result
        that.setData({
          array: extract_info
        })
      }
    })
  },
  onReachBottom: function(){
    this.setData({
      searchLoading: true
    })
    this.AddJoke()
    this.setData({
      searchLoading: true
    })
  },
  AddJoke: function(){
    var that = this
    wx.request({
      url: 'https://v.juhe.cn/joke/randJoke.php?key=fac993ec4783b96ad018efe7e763914c', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //console.log(res.data)
        //console.log(res.data.result)
        var extract_info = res.data.result
        //console.log(that.data.array)
        that.setData({
          array: that.data.array.concat(extract_info)
        })
      }
    })    
  }
})
