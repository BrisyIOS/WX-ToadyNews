Page({
    
    data: {
       
    },

    
    // 时间戳转日期
    formatMsgTime: function(timespan) {
        var dateTime = new Date(timespan);
    
        var year = dateTime.getFullYear();
        var month = dateTime.getMonth() + 1;
        var day = dateTime.getDate();
        var hour = dateTime.getHours();
        var minute = dateTime.getMinutes();
        var second = dateTime.getSeconds();
        var now = new Date();
        var now_new = Date.parse(now.toDateString());  //typescript转换写法

        var milliseconds = 0;
        var timeSpanStr;

        milliseconds = now_new - timespan;

        if (milliseconds <= 1000 * 60 * 1) {
            timeSpanStr = '刚刚';
        }
        else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
            timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
        }
        else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
            timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
        }
        else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
            timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
        }
        else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
            timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute;
        } else {
            timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
        }
        return timeSpanStr;
    },

    tapEventHandle: function(event) {
        console.log(event.currentTarget.dataset.url);
        wx.navigateTo({
          url: '../HomeDetail/homedetail?url=' + event.currentTarget.dataset.url,
          success: function(res){
            // success
            console.log("-----success---------");
          },
          fail: function() {
            // fail
            
          },
          complete: function() {
            // complete
          }
        })
    },

    // 页面加载完毕的时候调用
    onLoad: function() {
        console.log("页面加载完毕");

        wx.showToast({
        title: '刷新中',
        icon: 'loading',
        duration: 1000
        });

        var that = this;
        // 请求网络数据
        this.fetchDataFromServer(function successCallBack(results) {
            console.log(results.length);

            if (results.length <= 1) {
                wx.showToast({
                title: '⚠️ 刷新失败',
                icon: 'loading',
                duration: 500
                });
                return;
            }
            // 拼接数据
            that.setData({
                items: results
            });
            // 刷新成功
            wx.showToast({
            title: '刷新成功!!!',
            icon: 'success',
            duration: 500
            });
        }, function failureCallBack(error) {
            console.log(error);
            wx.showToast({
            title: '⚠️ 刷新失败',
            icon: 'loading',
            duration: 500
            });
        });
    },

    // 从网络请求数据
    fetchDataFromServer: function(successCallBack, failureCallBack) {

        var that = this;
        // 请求数据
        wx.request({
        url: 'https://lf.snssdk.com/api/news/feed/v39/?iid=5034850950&device_id=6096495334&category',
        data: {},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
            // success
            var results = [];
            res.data.data.map(function(dict) {
                var json = JSON.parse(dict.content);
                results.push(json);
            });
           
            // 修改publish_time
            results.map(function(item) {
                var date = that.formatMsgTime(parseInt(item.publish_time) * 1000);
                item.publish_time = date;
                if (typeof(item.image_list) != 'undefined' && item.image_list.length > 0) {
                    item.image_list.map(function(dict) {
                        var temString = dict.url;
                        var suffix = ".webp";
                        var index = temString.indexOf(suffix, temString);
                        var url = temString.substring(0, index);
                        dict.url = url;
                        return dict;
                    });
                }
                
                // 3张小图
                if (typeof(item.image_list) != 'undefined' && item.image_list.length != 0) {
                    item.cellType = 'threeImageType';
                } else {
                    if (typeof(item.middle_image) != 'undefined' && typeof(item.middle_image.height) != 'undefined') {
                        if (typeof(item.video_detail_info) != 'undefined' && typeof(item.video_detail_info.video_id) != 'undefined' || (typeof(item.large_image_list) != 'undefined' && item.large_image_list.length > 0)) {
                            if (typeof(item.video_detail_info.video_id) != 'undefined') {
                                item.cellType = 'bigVideoImageType';
                            } else {
                                item.cellType = 'oneBigImageType';
                            }
                        } else {
                            item.cellType = 'rightImageType';
                            if (typeof(item.middle_image) == 'undefined' || (typeof(item.middle_image) != 'undefined' && typeof(item.middle_image.url) == 'undefined')) {
                                item.cellType = 'noImageType';
                            }
                        }
                    } else {
                        item.cellType = 'noImageType';
                    }
                }
                return item;
            });
            // 保存数据
            successCallBack(results);
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
    },

    // 上啦刷新
    upperEventHandle: function() {
        // 显示loading
        wx.showToast({
        title: '刷新中',
        icon: 'loading',
        duration: 1000
        });
        var that = this;
        // 请求网络数据
        this.fetchDataFromServer(function successCallBack(results) {
            console.log(results.length);

            if (results.length <= 1) {
                wx.showToast({
                title: '⚠️ 刷新失败',
                icon: 'loading',
                duration: 500
                });
                return;
            }
            // 拼接数据
            that.setData({
                items: results
            });
            // 显示loading
            wx.showToast({
            title: '刷新成功!!!',
            icon: 'success',
            duration: 500
            });
            

        }, function failureCallBack(error) {
            console.log(error);
            // 显示loading
            wx.showToast({
            title: '⚠️ 刷新失败',
            icon: 'success',
            duration: 500
            });
        });
    },

    lowerEventHandle: function() {
        wx.showToast({
        title: '刷新中',
        icon: 'loading',
        duration: 3000
        });

        var that = this;

        // 请求网络数据
        this.fetchDataFromServer(function successCallBack(results) {
            
            var datalist = that.data.items;
            if (results.length <= 1) {
                wx.showToast({
                title: '⚠️ 刷新失败',
                icon: 'loading',
                duration: 500
                });
                return;
            } else {
                results.shift();
            }
            var items = datalist.concat(results);
            console.log("results:", results,  "items:", items);

            // 拼接数据
            that.setData({
                items: items
            });

            wx.showToast({
            title: '刷新成功!!!',
            icon: 'success',
            duration: 500
            });

        }, function failureCallBack(error) {
            console.log(error);
            wx.showToast({
            title: '⚠️ 刷新失败',
            icon: 'loading',
            duration: 500
            });
            return;
        });

    }
    
});