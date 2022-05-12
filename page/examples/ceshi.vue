<template>
	<view style="display: flex;flex-direction: column;height: 100%;overflow: hidden;">
		<view class="status-bar">
			<view style="flex: 1;position: relative;" v-for="(item,index) in statusList" :key="index"
				:class="current==index&&'active'" @click="statusClick(index)
			">{{item}}</view>
		</view>
		<swiper :current="current" @change="_handleChange" class="swiperHeight">
			<swiper-item v-for="(item , index) in cards" :key="index">
				<my-scroll-view class="scroll" ref="fresh" @refresh="onRefresh" @lowerRefresh="lowerRefresh">
					<view class="listContainer">
						<!-- 无数据背景 -->
						<view v-if="isNoData[current]" class="container">
							<view class="noCarStyle">
								<image src="../../static/image/noOrder.png" style="width: 100%;" mode="widthFix">
								</image>
								<view class="nocarText">暂无订单信息</view>
							</view>
						</view>
						<view v-else v-for="(item2,index2) in item" :key="index2">
							数据
						</view>
					</view>
				</my-scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import myScrollView from '@/components/my-scroll-view/myScrollView.vue';
	import * as util from '../../utils/util.js'
	export default {
		components: {
			myScrollView
		},
		data() {
			return {
				// 支付状态
				statusList: ['tab1', 'tab2'],
				orderStatus: ['tab1', 'tab2'],
				current: 0,
				cards: [
					[],
					[],
				],
				// 页码
				page: [0, 0],
				isNoData: [false, false],
				// 是否处于列表请求中
				isListReq: false,
				apiUrl:"",
			}
		},
		onShow() {
			
		},
		onLoad() {
		},
		methods: {
			// 初始切换数据
			statusClick(index) {
				this.current = index
			},
			onRefresh() {
				// 需要重置当前page的值
				this.page[this.current] = 0
				this.isNoData[this.current] = false
			},
			// 请求订单列表
			lowerRefresh() {
				// this.page[this.current] +=1
				// this.getOrderList('push')
			},
			_handleChange(e) {
				const eCurrent = e ? e.detail.current : this.current;
				this.current = eCurrent
				uni.showLoading({
					title: '加载中...',
					 mask:true   
				})
				setTimeout(() => {
					uni.hideLoading();
				}, 1000)
			},
		}
	}
</script>

<style>
	.status-bar {
		width: 100%;
		height: 96rpx;
		background-color: #FFFFFF;
		font-size: 28rpx;
		text-align: center;
		letter-spacing: -0.3px;
		color: #606060;
		display: flex;
		justify-content: space-around;
		align-items: center;
		position: absolute;
		top: 0;
		z-index: 998;
	}

	.active {
		font-family: 'PingFang SC';
		font-style: normal;
		font-weight: bold;
		font-size: 28rpx;
		line-height: 40rpx;
		text-align: center;
		color: #323232;
	}

	.active::after {
		content: '';
		position: absolute;
		bottom: -16rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 32rpx;
		height: 4rpx;
		background: linear-gradient(90.77deg, #F79235 2.28%, #F77518 102.29%);
		border-radius: 20rpx;
	}
</style>
