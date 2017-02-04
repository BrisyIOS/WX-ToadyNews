Page({

    // 数据源
    data: {

    },

    // 页面加载完毕之后执行
    onLoad: function(event) {
        console.log("--------onLoad--------");
        console.log(event.mp4_url);
        // 更新数据源
        this.setData({
            mp4_url: event.mp4_url
        });
    },

    // 页面显示完毕执行
    onShow: function() {
        console.log("---------onShow----------");
    },

    // 页面渲染完毕之后执行
    onReady: function() {
        console.log("-----------onReady-----------");
    },

    // 页面隐藏的时候执行
    onHide: function() {
        console.log("---------onHide-----------");
    },

    // 上啦加载更多执行
    onReachBottom: function() {
        console.log("------------onReachBottom-----------");
    },

    // 下拉刷新执行
    onPullDownRefresh: function() {
        console.log("----------onPullDownRefresh-----------");
    }
});