var WxParse = require('../../wxParse/wxParse.js');

Page({

    data: {
        
    },

    // 页面加载完毕之后执行
    onLoad: function(event) {
        console.log("--------onLoad-----------");
        console.log(event.url);
        var that = this;
        wx.request({
          url: event.url,
          data: {},
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function(res){
            // success
            var article = res.data;
            
            console.log(article);
            WxParse.wxParse('article', 'html', article, that, 5);
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
        
    },

    // 页面显示的时候执行
    onShow: function() {
        console.log("-------onShow--------");
    },

    // 页面渲染完毕之后执行
    onReady: function() {
        console.log("---------onReady-----------");
    },

    // 页面隐藏的时候执行
    onHide: function() {
        console.log("--------onHide-------");
    }
});