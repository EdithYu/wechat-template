
<script>
// import { mapMutations } from 'vuex'
export default {
 

  onLaunch: function (options) {
		// #ifdef H5
			var ua = navigator.userAgent.toLowerCase();
				try{
					if(ua.match(/MicroMessenger/i)=="micromessenger") {
					    //ios的ua中无miniProgram，但都有MicroMessenger（表示是微信浏览器）
						//在微信浏览器
						localStorage.setItem("source","wxopen");
					}
					else if(ua.match(/AlipayClient/i)=="alipayclient"){
						localStorage.setItem("source","alipay");
					}
					else if(ua.match(/iflytek_mmp/i)=="iflytek_mmp"){
						localStorage.setItem("source", "wst");
					}
					else{
						const getCookie = (name) => {
						  if (name) {
						    const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
						    const r = document.cookie.match(reg);
						    if (r != null) return unescape(r[2]);
						  }
						  return null;
						};
						let userdata = getCookie('userToken') || 'userToken';
						//拿到版本号
						let version = getCookie('version') || 'version';
						localStorage.setItem("version",version);
						const isIOS = () => {
							const ua = window.navigator.userAgent.toLowerCase();
							if (/iphone|ipad|ipod|macintosh/.test(ua)) {
								return true;
							}
							return false;
						};			 
						// ios中注入方法到nerv，安卓是app注入 如此 环境检测使用window.nerv
						if (isIOS() && window?.webkit?.messageHandlers?.nerv) {
							localStorage.setItem("source", "iosApp");
							localStorage.setItem('os', "ios")
							if(version !== "version"){
								let versionNumber = version.split('.')[2];
								if(parseInt(versionNumber)>=5){
									localStorage.setItem("alipay",true);
								}
								else{
									localStorage.setItem("alipay",false);
								}
							}
							else{
								localStorage.setItem("alipay",false);
							}
							window.nerv = new Proxy({}, {
								get(target, propKey) {
								  return (params) => {
								    if (!window.webkit.messageHandlers[propKey]) return undefined;
								    window.webkit.messageHandlers[propKey].postMessage(params || {});
								  };
								},
							});
						}
						else{
							switch(uni.getSystemInfoSync().platform){
							    case 'android':
							       	localStorage.setItem('os', "android")
									localStorage.setItem("source", "androidApp");
									if(version !== "version"){
										let versionNumber = version.split('.')[2];
										if(versionNumber>10){
											localStorage.setItem("alipay",true);
										}
										else{
											localStorage.setItem("alipay",false);
										}
									}
									else{
										localStorage.setItem("alipay",false);
									}
							       break;
							    case 'ios':
							       	break;
							    default:
							      	localStorage.setItem('os', "else")
									localStorage.setItem("source", "H5");
							       break;
							}
						}	
						if(userdata == "userToken"){
							window.toNative('toLogin')
						}
						else{
							localStorage.setItem("userToken",userdata);
						}
					}   			
				}catch(e){
						// window.alert(JSON.stringify(e));
					
				}									
				switch(uni.getSystemInfoSync().platform){
				    case 'android':
				       localStorage.setItem('os', "android")
				       break;
				    case 'ios':
				       localStorage.setItem('os', "ios")
				       break;
				    default:
				      	localStorage.setItem('os', "else")
				       break;
				}
			
		// #endif
  },
  onTabItemTap(e) {
  	  console.log(e);
  },
  onShow: function () {
	
  },
  onLoad:function(){
	   // #ifdef  H5
	  // this.getWstLoction();
	  // #endif
  },
  onHide: function () {
    console.log('App Hide')
  },
 
 globalData: {
	test: '',
 	// wstBaseUrl:'wst.whcsbc.com',
 	// wxAppid:'wx69a4aafeab6fb5ad',
 	// alipayAppid:'2021002195604436',
	wstBaseUrl:'parkingh5tdev2.testproxy.sk1111.cn',
	wxAppid:'wxc5f3c7eeb248ba42',
	alipayAppid:'2021002192634559',
	version:'2.0.7',
 },
  methods: {
	  //下载最新版本
		download(){
			uni.showModal({
			    title: '发现新版本',
			    content: '该版本有重大升级，为了您的正常使用，请更新到最新版本',
				// cancelText: "重新支付", // 取消按钮的文字  
				confirmText: "立即更新", // 确认按钮文字
				showCancel: false, // 是否显示取消按钮，默认为 true						
			    success: function (res) {
					const self =this;
					let source =  localStorage.getItem('source');
			        if (res.confirm) {
						if(source == "androidApp"){
							this.androidAppConfigDetail();
						}
						else if(source == "iosApp"){
							window.location.href = "https://itunes.apple.com/cn/app/id1597232148"
						}
			        } else if (res.cancel) {
						//取消了就关闭订单 可以继续点击支付
			        }
			    }.bind(this)
			});	  
		},
		androidAppConfigDetail(){
			uni.showLoading({
				title:"下载中"
			})
			const data = {
				platformId:1,
				uniqueCode:"com.yidingyun.WitParking",
			}
			const _that = this;
			_that.$utils.request(_that.$god.parkingPay.queryVersionUp, data, 'GET')
			.then(res => {
				var src = res.data.downUrl;
				var form = document.createElement('form');
				form.action = src;
				document.getElementsByTagName('body')[0].appendChild(form);
				form.submit();
				this.clearLoading();
			})
			.catch(err => {
				this.clearLoading();
				uni.showModal({
					title: '提示',
					content: err.data.msg,
					showCancel: false
				})
			})
		},
	  
	  
  },
}
</script>

<style>
/* #ifndef APP-PLUS-NVUE */
/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
@import './common/uni.css';

/* H5 兼容 pc 所需 */
/* #ifdef H5 */
@media screen and (min-width: 768px) {
  body {
    overflow-y: scroll;
  }
}
/* 导航栏字体大小 */
uni-page-head .uni-page-head__title {
    font-weight: 500!important;
    font-size: 18px!important;
	color: #212121!important;
    line-height: 30px;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
/* swiper的点样式 */

/* tabbar样式 */
/* #ifdef H5 */
uni-tabbar .uni-tabbar .uni-tabbar__item {
	transform:translateY(-10px);
}
uni-tabbar .uni-tabbar {
	height: 80px!important;
}
.uni-tabbar-bottom {
	position: fixed;
	bottom: 0!important;
}
uni-tabbar .uni-placeholder {
	height: 0px!important;
}
uni-tabbar .uni-tabbar-border {
	background: #d3c6c6!important;
}
uni-tabbar .uni-tabbar__item {
	transform: translateY(-1px)
}
/* uni-tabbar .uni-tabbar__item .uni-tabbar__bd  .uni-tabbar__icon__diff img {
	    width: 38px!important;
	    height: 38px!important;
		transform: translateY(-2px);
} */
uni-tabbar .uni-tabbar__item .uni-tabbar__bd .uni-tabbar__icon {
	width: 32px!important;
	height: 32px!important;
}
uni-tabbar .uni-tabbar .uni-tabbar__item.newClass .uni-tabbar__icon img{
  width: 45px !important;
  height: 45px !important;
  margin-left: -7px;
  margin-top: -7px;
}
uni-tabbar .uni-tabbar .uni-tabbar__item.newClass .uni-tabbar__label{
  display: none
  
}

/* #endif */

/* #ifdef H5 */
.swiperContainer swiper-item {
  display: flex;
  justify-content: center;
  align-items: center;
}
uni-swiper .uni-swiper-dots-horizontal {
	bottom: 15px!important;
}
.swiperContainer .uni-swiper-dot {
  display: inline-flex;
  justify-content: space-between;
  height: 4rpx !important;
  background: #D0D0D0;
  width: 6px !important;
  border-radius: 0;
}

.swiperContainer .uni-swiper-dot-active {
  width: 12px !important;
  height: 4rpx !important;
  background: #FF8D46;
}
/* #endif */

/* radio的样式 */
/* #ifdef H5 */
uni-radio {
  transform: translateY(-5rpx);
}

/* 自定义 radio 样式 */
uni-radio .uni-radio-input {
  border-radius: 50%;
  width: 24rpx;
  height: 24rpx;
}

/* 选中后的样式 （可根据需求自己修改） */
uni-radio .uni-radio-input.uni-radio-input-checked::before {
  border-radius: 50%;
  width: 40rpx;
  height: 40rpx;
  line-height: 40rpx;
  text-align: center;
  font-size: 24rpx;
  /* 对勾大小 */
  color: #fff;
  /* 对勾颜色 */
  background: #FF8D46;
 border-color: #FF8D46;
}

uni-radio:not([disabled]) .uni-radio-input:hover {
   border-color: #E0E0E0;
}

uni-radio .uni-radio-wrapper .uni-radio-input-checked {
	    background-color: #FF8D46!important;
	    border-color: #FF8D46!important;
}

/* #endif */

/* 顶栏通栏样式 */
/* .uni-top-window {
	    left: 0;
	    right: 0;
	} */

uni-page-body {
  background-color: #F0F3F4 !important;
  min-height: 100% !important;
  height: auto !important;
}

.uni-top-window uni-tabbar .uni-tabbar {
  background-color: #fff !important;
}

.uni-app--showleftwindow .hideOnPc {
  display: none !important;
}

/* #endif */

/* 以下样式用于 hello uni-app 演示所需 */
page {
  background-color: #efeff4;
  height: 100%;
  font-size: 28rpx;
  line-height: 1.8;
}
/* .uni-tabbar{
	
} */
.fix-pc-padding {
  padding: 0 50px;
}

.uni-header-logo {
  padding: 30rpx;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10rpx;
}

.uni-header-image {
  width: 100px;
  height: 100px;
}

.uni-hello-text {
  color: #7a7e83;
}

.uni-hello-addfile {
  text-align: center;
  line-height: 300rpx;
  background: #fff;
  padding: 50rpx;
  margin-top: 10px;
  font-size: 38rpx;
  color: #808080;
}

/* #endif*/
li {
	list-style: none;
}

.backPress{
		width: 110rpx;
		height: 86rpx;
		position: fixed;
		top: 0px;
		background: transparent;
		/* background: #000000; */
		z-index: 100000;  	
}					
</style>
