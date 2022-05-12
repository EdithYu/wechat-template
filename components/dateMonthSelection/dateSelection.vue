<template>
	<view>
		<view class="dateTitle">
			<p v-for="(item,index) in dateAlert" :key="index">
				{{item}}
			</p>
		</view>
		<view style="margin-top: 80rpx;">
			<scroll-view  scroll-y="true" class="scroll-Y" :scroll-with-animation="true"
			 :scroll-into-view="scrollTo" style="height: calc(100vh - 80rpx)">
				<view class="date-view" :id="'d'+item.year+'_'+item.month" v-for="(item,index) in dateSelectList" >
					<div class="operLine-title">
						<span class="line">{{item.year}}年{{item.month}}月</span>
					</div>
					<view class="date-view-date">
						<view v-for="(item2,index2) in item.dateList" :key="index2" class="date-view-date-list" >
							<p @click="chooseDate(item,item2)" 
							:class="(item.isChoose && defalueDateDay == item2)?'date-view-date-choose':''">
								{{item2}}
							</p>
						</view>
					</view>
				</view>
				<view style="min-height: 4vh;"></view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import moment from 'moment';
	export default {
		components: {},
		props: {
			defalueDate:{
				default: moment(new Date()).format('YYYY-MM-DD'),
				type: String
			}
		},
		data() {
			return {
				dateSelectList:[
					
				],
				defalueDateDay:0,
				dateAlert:["日","一","二","三","四","五","六"],
				dateList:[1,2,3,4,5,6,7,8,9,10,11],
				scrollTo:'d2022_',
			}
		},
		mounted(){
			this.initDate();
			this.$forceUpdate()
		},
		methods: {
			//初始化日期
			initDate(){		
				let defalueDate = this.defalueDate.split("-");
				this.defalueDateDay = Number(defalueDate[2]) ;
				let defalueDateYear = defalueDate[0];
				let defalueDateMonth = defalueDate[1];
				let date = new Date().getTime()-(60*60*24*1000);
				let month = new Date().getMonth();
				let year = new Date().getFullYear();
				for(let i=2;i<=13;i++){
					let data = {
						dateList:[]
					};
					if(month + i<13){
						data.year = year -1;
						data.month = month + i;
					}
					else{
						data.year = year;
						data.month = month + i-12;
					}
					let day=new Date(data.year + "/" + data.month + "/" + "1");
					var week=day.getDay();
					data.week = week;
					if(week != 0){
						for(let j=1;j<=Number(week);j++){
							data.dateList.push("");
						}
					}
					if(i == 13){
						let day = (moment(date).format('YYYY-MM-DD')).split("-")[2];
						for(let j=1;j<=Number(day);j++){
							data.dateList.push(j);
						}
					}
					else{
						if(data.month == 2){
							if(data.year % 4 == 0){
								for(let j=1;j<=29;j++){
									data.dateList.push(j);
								}
							}
							else{
								for(let j=1;j<=28;j++){
									data.dateList.push(j);
								}
							}
						}
						else{
							let month1 = data.month
							if(month1 == 1 || month1 == 3 || month1 == 5 || month1 == 7 || month1 == 8 || month1 == 10 || month1 == 12){
								for(let j=1;j<=31;j++){
									data.dateList.push(j);
								}
							}
							else{
								for(let j=1;j<=30;j++){
									data.dateList.push(j);
								}
							}
						}
					}
					if(Number(data.year) == Number(defalueDateYear) && Number(data.month) == Number(defalueDateMonth)){
						data.isChoose = true;
						this.$nextTick(() => {
							this.scrollTo = 'd'+Number(defalueDateYear)+'_'+Number(defalueDateMonth);
						})
						this.$forceUpdate()
					}
					else{
						data.isChoose = false;
					}
					this.dateSelectList.push(data)
				}
			},
			chooseDate(item,item2){
				console.log(item)
				console.log(item2)
				if(Number(item2)<10){
					item2 = "0"+item2;
				}
				let pages = getCurrentPages();
				let prevPage = pages[pages.length - 2]; //上一个页面
				prevPage.$vm.apiSelectDate=item.year + "-" +item.month + "-" +item2; //重点$vm
				prevPage.$vm.showDate=item.month + "-" +item2; //重点$vm
				uni.navigateBack();
			}
		}
	}
</script>
<style>
	page{
		background: #FFFFFF !important;
	}
</style>
<style lang="scss" scoped>
	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}
	.calendar-button {
		flex: 1;
		font-weight: bold;
		font-size: 32rpx;
	}
	.dateTitle{
		height: 64rpx;
		background: #F6F5FA;
		display: flex;
		position: fixed;
		width: -webkit-fill-available;
		top: var(--window-top);
		z-index: 998;
		
		p{
			width: 20%;
			text-align: center;
			font-family: 'PingFang SC';
			font-style: normal;
			font-weight: normal;
			font-size: 32rpx;
			line-height: 64rpx;
			color: #828282;
		}
	}
	.date-view{
		
	}
	.operLine-title{
		width:100%;
		height:80rpx;
		text-align:center;
		line-height:80rpx;
		margin:20rpx auto;
	}
	.operLine-title .line{
		position:relative;
		display:inline-block;
		padding:0rpx 60rpx;
		font-family: 'PingFang SC';
		font-style: normal;
		font-weight: normal;
		font-size: 32rpx;
		line-height: 44rpx;
		text-align: center;
		color: #4F4F4F;
	}
	.operLine-title .line::after{
			content:'';
			width:80rpx;
			position:absolute;
			top:20rpx;
			right:-40rpx;
			border-bottom:2rpx solid rgba(0, 0, 0, 0.1);
	}
	.operLine-title .line::before{
		content:'';
		width:80rpx;
		position:absolute;
		top:20rpx;
		left:-40rpx;
		border-bottom:2rpx solid rgba(0, 0, 0, 0.1);
	}
	.date-view-date{
		display: flex;
		flex-wrap: wrap;
		
		.date-view-date-list{
			width: 14%;
			text-align: center;
			
			p{
				font-family: 'PingFang SC';
				font-style: normal;
				font-weight: bold;
				font-size: 32rpx;
				line-height: 44rpx;
				color: #333333;
			}
		}
		
		.date-view-date-list:nth-child(n + 8){
			margin-top: 32rpx;
		}
	}
	.date-view-date-choose{
		color: #3874F6 !important;
	}
</style>

