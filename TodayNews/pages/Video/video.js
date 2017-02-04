Page({
    data: {

    },

    // 页面加载完毕的时候调用
    onLoad: function() {
        console.log("页面加载完毕的时候调用");
        
        var that = this;
        this.fetchDataFromServer(function successCallBack(results) {
            console.log(results);
            that.setData({
                items: results
            });
        }, function failureCallBack(error) {
            console.log(error);
        });
    },

    // 请求网络数据
    fetchDataFromServer: function(successCallBack, failureCallBack) {

        wx.request({
          url: 'https://dn-otjqboap.qbox.me/aff267dce74711099f7c.json',
          data: {},
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function(res){
            // success
            successCallBack(res.data);
          },
          fail: function(error) {
            // fail
            failureCallBack(error);
          },
          complete: function() {
            // complete
          }
        })
    },

    // 点击跳转至详情页面
    tapEventHandle: function(event) {
        wx.navigateTo({
          url: '../VideoDetail/videodetail?mp4_url=' + event.currentTarget.dataset.url,
          success: function(res){
            // success
            console.log("------success--------");
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
    },

    // 页面显示的时候调用
    onShow: function() {
        console.log("页面显示的时候调用");
    },

    // 页面渲染完毕的时候调用
    onReady: function() {
        console.log("页面渲染完毕的时候调用");
    },

    // 页面隐藏的时候调用
    onHide: function() {
        console.log("页面隐藏的时候调用");
    }
});