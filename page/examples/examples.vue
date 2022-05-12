<template>
	<view>
		<!-- 图表-->
		<view class="echars-card-first">
			<qiun-data-charts
			type="column" :opts="optionRevenueStatistics" 
			:chartData="optionRevenueStatisticsCD"
			errorMessage="加载失败，点击重新加载"
			:ontouch="true"
			:dataLabel="false"
			:dataPointShape="false"
			@getIndex="getRevenueStatisticsIndex"
			/>
		</view>
	</view>
</template>

<script>
	import * as util from '../../utils/util.js';
	import moment from 'moment';
	
	export default {
		components:{
		},
		data() {
			return {
				//点击
				revenueStatisticsIndex:-1,
				//柱状图
				optionRevenueStatistics:{
					padding: [15,15,0,5],
					touchMoveLimit: 24,
					enableScroll: true,
					dataLabel:false,
					errorReload:true,
					legend: {},
					background:"#5470c6",
					echartsH5:true,
					enableMarkLine:true,
					dataPointShape:false,
					xAxis: {
						scrollShow: false,
						itemCount: 9,
						axisLineColor:"#8E94A0",
						fontColor:"#8E94A0",
						fontSize:8,
						disableGrid:false,
						gridColor:"#E7E7E7",
						// calibration:true,
					},
					yAxis: {
						data: [
							{
								min: 0,
								fontColor:"#8E94A0",
								fontSize:10,
								splitNumber:2,
							}
						]
					},
					legend:{
						show:false
					},
					extra: {
						column: {
							type: "group",
							width: 8,
							// categoryGap:10,
							activeBgColor: "#256FFF",
							activeBgOpacity: 0.08,
							linearType: "custom",
							seriesGap: 5,
							// colorStop:0.8,
							linearOpacity: 0.8,
							customColor: [
								"#22AEFD",
								"#256FFF",
							]
						},
						markLine:{
							type:"dash",
							dashLength:2,
							data:[
								{
									// value:0,
									// labelText:"历史均值",
									// lineColor:"#BDBDBD",
									// labelFontColor:"#121A52",
									// labelAlign:"center",
									// showLabel:true,
									// labelBgColor:"#ffffff",
									// labelBgOpacity:0,
									// labelOffsetX:-62,
								}
							]
						},
						tooltip:{
							showBox:false
						}
					}
				},
				//chartData
				optionRevenueStatisticsCD:{},
				//是否上滑滚动
				scrallTopShow:false,
			};
		},
		watch: {
		},
		onLoad(options) {
			//初始化时间
			this.initDate();
			// 动态引入类库
			const script = document.createElement('script')
			script.src = '../../static/echarts.min.js'
			script.onload = this.init
			document.head.appendChild(script);
		},
		onShow(){
			this.logstatrt();
		},
		onPullDownRefresh(){
			this.logstatrt();
		},
		onPageScroll(e) {
			//nvue暂不支持滚动监听，可用bindingx代替
			// console.log("滚动距离为：" + e.scrollTop);
			if(e.scrollTop>0){
				this.scrallTopShow = true;
			}
			else{
				this.scrallTopShow = false;
			}
		},
		methods: {
			//营收分析日报点击
			getRevenueStatisticsIndex(event){
				// var index = uChartsInstance[e.target.id].getCurrentDataIndex(e);
				let index = event.currentIndex.index;
				this.revenueStatisticsIndex = index;
				console.log(this.optionRevenueStatisticsCD.series[0].data[index]);
			},
			initDate(){
				let date = new Date().getTime()-(60*60*24*1000);
				let month = new Date().getMonth();
				let year = new Date().getFullYear();
				this.showMonth = year + "年" + month+"月" ;
				this.apiSelectMonth = year + "-" + month ;
				this.apiSelectDate = moment(date).format('YYYY-MM-DD');
				this.showDate = moment(date).format('MM-DD');
			},
			//日报营收分析
			incomeStatisticsByDay(){
				// const _that = this;
				// const data ={
				// 	date:this.apiSelectDate,
				// 	parkCode:this.parkCode,
				// }
				// _that.$utils.request(_that.$god.operationalAnalysis.incomeStatisticsByDay, data, 'GET')
				// .then(res => {	
					let res = {
						data:[
							{
								timeIncome:2
							},
							{
								timeIncome:5
							},
							{
								timeIncome:7
							},
							{
								timeIncome:2
							},
							{
								timeIncome:9
							}
						]
					}
					this.optionRevenueStatisticsCD = {
					    categories: [],
					    series: [
							{
								name:"营收",
								data:[],
								show:true,
							}
					    ]
					};
					for(let i=1;i<=5;i++){
						let data;
						if(i<10){
							data = "0"+i+"时";
						}
						else{
							data = i+"时";
						}
						this.optionRevenueStatisticsCD.categories.push(data)
					}
					let total=0;
					res.data.forEach((item,index)=>{
						this.optionRevenueStatisticsCD.series[0].data.push(item.timeIncome+Math.ceil(Math.random()*10));
					})	
				// })
				// .catch(err => {
				// 	console.log(err)
				// 	uni.showModal({
				// 		title: '提示',
				// 		content: err.data.msg,
				// 		showCancel: false
				// 	})
				// });
			},
			//月报营收分析
			incomeStatisticsByMonth(){
				const _that = this;
				console.log(this.apiSelectMonth)
				const data ={
					yearMonth:this.apiSelectMonth,
					parkCode:this.parkCode,
				}
				_that.$utils.request(_that.$god.operationalAnalysis.incomeStatisticsByMonth, data, 'GET')
				.then(res => {	
					let chartDataRevenueStatisticsMonth = {
					    categories: [],
					    series: [
							{
								name:"出流量",
								data:[]
							},
							{
								name:"入流量",
								data:[]
							}
					    ]
					};
					for(let i=1;i<=res.data.monthDataList.length;i++){
						let data;
						if(i<10){
							data = "0"+i+"日";
						}
						else{
							data = i + "日";
						}
						chartDataRevenueStatisticsMonth.categories.push(data)
					}
					//本月
					res.data.monthDataList.forEach((item,index)=>{
						chartDataRevenueStatisticsMonth.series[0].data.push(item.timeIncome+Math.ceil(Math.random()*10));
						// this.statisticsCountShow.out+=item.timeCount;
					})
					//上月
					res.data.lastMonthDataList.forEach((item,index)=>{
						chartDataRevenueStatisticsMonth.series[1].data.push(item.timeIncome+Math.ceil(Math.random()*10));
						// this.statisticsCountShow.in+=item.timeCount;
					})
					this.chartDataRevenueStatisticsMonth=chartDataRevenueStatisticsMonth
					this.chartDataRevenueStatisticsMonth.avgIncome = res.data.avgIncome;
					this.chartDataRevenueStatisticsMonth.increaseRate = res.data.increaseRate;
				})
				.catch(err => {
					console.log(err)
					uni.showModal({
						title: '提示',
						content: err.data.msg,
						showCancel: false
					})
				});
			},
			//停车流量-日报
			getStatisticsCountVOByDay(){
				const _that = this;
				const data ={
					date:this.apiSelectDate,
					parkCode:this.parkCode,
				}
				_that.$utils.request(_that.$god.operationalAnalysis.statisticsCountVOByDay, data, 'GET')
				.then(res => {	
					this.chartDataParkingFlow = {
					    categories: [],
					    series: [
							{
								name:"出流量",
								data:[]
							},
							{
								name:"入流量",
								data:[]
							}
					    ]
					};
					for(let i=1;i<=24;i++){
						let data;
						if(i<10){
							data = "0"+i+":00";
						}
						else{
							data = i+":00";
						}
						this.chartDataParkingFlow.categories.push(data)
					}
					//出流量
					res.data.outLineChartList.forEach((item,index)=>{
						this.chartDataParkingFlow.series[0].data.push(item.timeCount+Math.ceil(Math.random()*10));
						this.statisticsCountShow.out+=item.timeCount;
					})
					//入流量
					res.data.inLineChartList.forEach((item,index)=>{
						this.chartDataParkingFlow.series[1].data.push(item.timeCount+Math.ceil(Math.random()*10));
						this.statisticsCountShow.in+=item.timeCount;
					})
				})
				.catch(err => {
					uni.showModal({
						title: '提示',
						content: err.data.msg,
						showCancel: false
					})
				});
			},
			//停车流量月报
			getStatisticsCountVOByMonth(){
				const _that = this;
				const data ={
					yearMonth:this.apiSelectMonth,
					parkCode:this.parkCode,
					// yearMonth:3,
				}
				_that.$utils.request(_that.$god.operationalAnalysis.statisticsCountVOByMonth, data, 'GET')
				.then(res => {	
					let chartDataParkingFlowMonth = {
					    categories: [],
					    series: [
							{
								name:"出流量",
								data:[]
							},
							{
								name:"入流量",
								data:[]
							}
					    ]
					};
					let length = res.data.outLineChartList.length>res.data.inLineChartList.length?res.data.outLineChartList.length:res.data.inLineChartList.length;
					for(let i=1;i<=length;i++){
						let data;
						if(i<10){
							data = "0"+i + "日";
						}
						else{
							data = i + "日";
						}
						chartDataParkingFlowMonth.categories.push(data)
					}
					let out = 0;
					let parkIn =0;
					//出流量
					res.data.outLineChartList.forEach((item,index)=>{
						chartDataParkingFlowMonth.series[0].data.push(item.timeCount)+Math.ceil(Math.random()*10);
						out+=item.timeCount;
					})
					out= out/(res.data.outLineChartList.length);
					this.statisticsCountMonthShow.out= out.toFixed(2)
					//入流量
					res.data.inLineChartList.forEach((item,index)=>{
						chartDataParkingFlowMonth.series[1].data.push(item.timeCount+Math.ceil(Math.random()*10));
						parkIn+=item.timeCount;
					})
					parkIn= parkIn/(res.data.inLineChartList.length)
					this.statisticsCountMonthShow.in= parkIn.toFixed(2)
					this.chartDataParkingFlowMonth = chartDataParkingFlowMonth
					this.chartDataParkingFlowMonth.inIncreaseRate = res.data.inIncreaseRate;
					this.chartDataParkingFlowMonth.outIncreaseRate = res.data.outIncreaseRate;
				})
				.catch(err => {
					console.log(err)
					uni.showModal({
						title: '提示',
						content: err.data.msg,
						showCancel: false
					})
				});
			},
			//周转率 - 日报
			parkTurnoverRateByDay(){
				const _that = this;
				const data ={
					date:this.apiSelectDate,
					parkCode:this.parkCode,
				}
				_that.$utils.request(_that.$god.operationalAnalysis.parkTurnoverRateByDay, data, 'GET')
				.then(res => {	
					this.chartDataTurnoverRate = {
					    categories: [],
					    series: [
							{
								name:"周转率",
								data:[],
								pointShape:"none",
							},
					    ]
					};
					for(let i=1;i<=30;i++){
						let data;
						if(i<10){
							data = "0"+i+":00";
						}
						else{
							data = i+":00";
						}
						this.chartDataTurnoverRate.categories.push(data)
					}
					let total = 0;
					//出流量
					res.data.forEach((item,index)=>{
						total+=Number(item.value);
						this.chartDataTurnoverRate.series[0].data.push(item.value+Math.ceil(Math.random()*10));
					})
					this.chartDataTurnoverRate.historyData = (total/24).toFixed(2);
	
				})
				.catch(err => {
					console.log(err)
					uni.showModal({
						title: '提示',
						content: err.data.msg,
						showCancel: false
					})
				});
			},
			//周转率 -月报
			parkTurnoverRateByMonth(){
				const _that = this;
				const data ={
					yearMonth:this.apiSelectMonth,
					parkCode:this.parkCode,
				}
				_that.$utils.request(_that.$god.operationalAnalysis.parkTurnoverRateByMonth, data, 'GET')
				.then(res => {	
					let chartDataTurnoverRateMonth = {
					    categories: [],
					    series: [
							{
								name:"周转率",
								data:[],
								pointShape:"none",
							},
					    ]
					};
					for(let i=1;i<=res.data.turnoverList.length;i++){
						let data;
						if(i<10){
							data = "0"+i + "日";
						}
						else{
							data = i + "日";
						}
						chartDataTurnoverRateMonth.categories.push(data)
					}
					//出流量
					res.data.turnoverList.forEach((item,index)=>{
						chartDataTurnoverRateMonth.series[0].data.push(item.value+Math.ceil(Math.random()*10));
					})
					this.chartDataTurnoverRateMonth = chartDataTurnoverRateMonth;
					this.chartDataTurnoverRateMonth.avgDayRate = res.data.avgDayRate;
					this.chartDataTurnoverRateMonth.incrDayRate = res.data.incrDayRate;
				})
				.catch(err => {
					uni.showModal({
						title: '提示',
						content: err.data.msg,
						showCancel: false
					})
				});
			},
			//日报利用率
			parkUseRateByDay(){
				const _that = this;
				const data ={
					date:this.apiSelectDate,
					parkCode:this.parkCode,
				}
				_that.$utils.request(_that.$god.operationalAnalysis.parkUseRateByDay, data, 'GET')
				.then(res => {	
					this.optionUtilizationRate.title.name =res.data.value*10+"%"
					this.chartDataUtilizationRate = {
					    series: [
					      {
					        name: "正确率",
					        color: "#2fc25b",
					        data: res.data.value,
							// data: 0.8,
					      }
					    ]        
					};
					this.$forceUpdate();
				})
				.catch(err => {
					console.log(err)
					uni.showModal({
						title: '提示',
						content: err.data.msg,
						showCancel: false
					})
				});
			},
			//月报利用率
			parkUseRateByMonth(){
				const _that = this;
				const data ={
					yearMonth:this.apiSelectMonth,
					parkCode:this.parkCode,
				}
				_that.$utils.request(_that.$god.operationalAnalysis.parkUseRateByMonth, data, 'GET')
				.then(res => {	
					this.chartDataUtilizationRateMonth = {
					    categories: [],
					    series: [
							{
								name:"利用率",
								data:[],
								pointShape:"none",
							},
					    ]
					};
					for(let i=1;i<=res.data.useList.length;i++){
						let data;
						if(i<10){
							data = "0"+i + "日";
						}
						else{
							data = i + "日";
						}
						this.chartDataUtilizationRateMonth.categories.push(data)
					}
					//出流量
					res.data.useList.forEach((item,index)=>{
						this.chartDataUtilizationRateMonth.series[0].data.push(item.value+Math.ceil(Math.random()*10));
					})
					this.chartDataUtilizationRateMonth.avgDayRate = res.data.avgDayRate;
					this.chartDataUtilizationRateMonth.incrDayRate = res.data.incrDayRate;
				})
				.catch(err => {
					uni.showModal({
						title: '提示',
						content: err.data.msg,
						showCancel: false
					})
				});
			},
			logstatrt() {
				//默认数据
				this.incomeStatisticsByDay();
			},
		},
		
	};
</script>
<style>
	page{
		width: 100%;
	}
</style>
<style scoped lang="scss">
	.echars-card-first{
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 16rpx 8rpx rgba(0, 0, 0, 0.02);
		border-radius: 12rpx;
		// width: 686rpx;
		// height: 544rpx;
		padding: 122rpx 32rpx 32rpx 32rpx;
		height: auto;
		padding-bottom: 32rpx;
		
		.echars-card-title{
			font-family: 'PingFang SC';
			font-style: normal;
			font-weight: bold;
			font-size: 32rpx;
			line-height: 36rpx;
			letter-spacing: -0.6rpx;
			color: #121A52;
			padding-top: 28rpx;
			padding-left: 20rpx;
		}
	}
</style>
