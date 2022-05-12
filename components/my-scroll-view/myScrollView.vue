<template>
	<!-- 	<view class="scroll">
		<slot  name="top"></slot>
		<scroll-view class="center" scroll-y="true" :scroll-with-animation="scrollWithAnimation"
			@refresherrefresh="onRefresh" :refresher-enabled='refresherEnabled' :refresher-triggered="triggered"
			:refresher-threshold="refresherThreshold"> -->
	<!-- <view v-for="index in 100" :key="index">
				<view style="height:100rpx;border:2rpx">{{index}}</view>
			</view> -->
	<!-- 		<slot name="inner"></slot>
		</scroll-view>
	</view> -->
	<view class="con">
		<view class="scroll">
			<scroll-view class="center" scroll-y="true" :scroll-with-animation="scrollWithAnimation"
				@refresherrefresh="onRefresh" :refresher-enabled='refresherEnabled' :refresher-triggered="triggered"
				:refresher-threshold="refresherThreshold" :refresher-default-style="refresherDefaultStyle"
				:refresher-background="refresherBackground" :enable-back-to-top="enableBackToTop"  @scrolltolower="lowerRefresh"
				:lower-threshold="1">
				<slot></slot>
			</scroll-view>
		</view>
	</view>
</template>
<!-- 自定义scrollview无法滚动，父亲使用下面第一行代码，自身使用下面.scroll类css代码 -->
<!-- style="height: 100%;display: flex;flex-direction: column;" 
.scroll {
		flex: 1;
		overflow: scroll;
	} -->
<script>
	export default {
		props: {
			// 是否开启下拉刷新
			refresherEnabled: {
				type: Boolean,
				default: true
			},
			// 设置自定义下拉刷新阈值
			refresherThreshold: {
				type: Number,
				default: 45,
			},
			// 在设置滚动条位置时使用动画过渡
			scrollWithAnimation: {
				type: Boolean,
				default: false
			},
			// 设置自定义下拉刷新默认样式，支持设置 black，white，none，none 表示不使用默认样式
			refresherDefaultStyle: {
				type: String,
				default: "black"
			},
			// 设置自定义下拉刷新区域背景颜色
			refresherBackground: {
				type: String,
				default: "#FFF"
			},
			// iOS点击顶部状态栏、安卓双击标题栏时，滚动条返回顶部，只支持竖向	
			enableBackToTop: {
				type: Boolean,
				default: true
			},
			
			
		},
		data() {
			return {
				triggered: false,
				height: ''
			}
		},
		created() {
			// const query = uni.createSelectorQuery().in(this);
			// query.select('.scroll').boundingClientRect(data => {
			// 	// console.log("得到布局位置信息" + JSON.stringify(data));
			// 	// console.log("节点离页面顶部的距离为" + data.top);
			// 	let screenHeight = uni.getSystemInfoSync().windowHeight;
			// 	console.log(screenHeight);
			// 	this.height = screenHeight - data.top
			// 	console.log(this.height, screenHeight, data.top);
			// }).exec();
		},
		methods: {
			// 触发下拉刷新
			onRefresh() {
				this.triggered = true;
				this.$emit("refresh");
			},
			lowerRefresh() {
				if(!this.triggered) {
					this.$emit("lowerRefresh");
					// console.log('到底了');
				}
				
			},
			// 关闭下拉刷新
			closeDropDown() {
				setTimeout(()=> {
					this.triggered = false;
				},300)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.scroll {
		/* height: 100%; */
		display: flex;
		flex-direction: column;
		overflow:hidden;
		white-space:nowrap;
	}

	// ::-webkit-scrollbar {
	// 	width: 0;
	// 	height: 0;
	// 	color: transparent;
	// }

	.center {
		flex: 1;
		// 滚动条样式
		// ::-webkit-scrollbar {
		// display: none;
		// width: 0 !important;
		// height: 0 !important;
		// -webkit-appearance: none;
		// background: transparent;
		// }
	}
	

	page {
		height: 100%;
	}

	.con {
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.top {
		height: 200rpx;
		line-height: 200rpx;
		text-align: center;
		font-size: 32rpx;
		color: white;
		background-color: lightgreen;
	}

	.scroll {
		flex: 1;
		overflow: scroll;
	}

	.center {
		height: 100%;
	}

	.bottom {
		height: 200rpx;
		line-height: 200rpx;
		text-align: center;
		font-size: 32rpx;
		color: white;
		background-color: lightsalmon;
	}
</style>
