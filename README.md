##运行环境
开发工具：微信web开发者工具 </br>
版本： 微信web开发者工具 v0.12.130400 </br>
适配： 适用于所有微信web开发者工具中模拟器的机型 </br>
</br>


##demo介绍
1、本demo分为2个模块  首页模块+视频模块；</br>
2、首页模块比较复杂，有5种（3张小图+文本， 一张可以播放的大图+文本， 一张大图+文本， 左边文本+右边图片， 只有文本）；</br>
3、首页我先把用template 将这5种模型封装好，然后直接在scroll-view中放不同的模型就可以了；</br>
4、视频模块比较简单，没有抓到头条的视频数据，我用的是网易的视频接口，就一张大图+播放按钮+文本；</br>

</br>



##目前还没有解决的问题
这个demo由本人空闲所写，有些功能还没做好，我现在把问题都列举出来，希望热心大神能够帮忙，联系方式[brisy@foxmail.com]()；也可以直接在[小程序今日头条](https://github.com/BrisyIOS/WX-ToadyNews)上fork。</br>
1、下拉刷新只能在cell没有占满屏幕的时候，点击cell以外的空白区域才有效，我猜测应该是响应者链的问题；</br>
2、上啦加载更多，太过于灵敏，这个我猜测应该是小程序自身的问题。</br>
3、新闻详情页面是一个网页，但是小程序不支持HTML，所有我用的是wxParse 这个第三方，但是这个只能用在简单的HTML上，今日头条的详情HTML太过于复杂，所以展示内容比较杂乱，跪求热心大神帮忙；</br>
4、今日头条Swift版[Swift版今日头条](https://github.com/BrisyIOS/TodayNewsSwift3.0), 这个是我初学Swift的时候写的，可供新手学习；</br>
</br>


##运行效果
demo连接：[张旭github](https://github.com/BrisyIOS/WX-ToadyNews);</br>
![image text](https://dn-otjqboap.qbox.me/4ea23255b72eb9c0021a.gif);



