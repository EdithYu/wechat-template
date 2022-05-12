<template>
	<view>
		<button style="margin-top: 32rpx;" @click="goToOperationalAnalysis">示例</button>
		<button style="margin-top: 32rpx;" @click="goToEcharts">图表示例</button>
		<button style="margin-top: 32rpx;" @click="goToDate">选择时间日历示例</button>
	</view>
</template>

<script>
	import * as util from '../../utils/util.js'
	export default {
		data() {
			return {
				
			};
		},
		watch: {
		},
		computed:{
		},
		onLoad(options) {
			
		},
		onShow(){
		},
		methods: {
			goToOperationalAnalysis(){
				uni.navigateTo({
					url:'../examples/ceshi'
				})
			},
			goToDate(){
				uni.navigateTo({
					url:"../examples/dateMonthlySearch"
				})
			},
			goToEcharts(){
				uni.navigateTo({
					url:"../examples/examples"
				})
			}
		},
		
	};
</script>
<style>
	page{
		background: #F0F3F4 !important;
		height: 100%;
	}
</style>
<style scoped lang="scss">
	
</style>
