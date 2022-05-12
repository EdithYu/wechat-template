<template>
	<view>
		<view >
			<view class="date-view"  v-for="(item,index) in dateSelectList" >
				<div class="operLine-title">
					<span class="line">{{item.year}}年</span>
				</div>
				<view class="date-view-date">
					<view v-for="(item2,index2) in item.monthList" :key="index2" class="date-view-date-list" >
						<p @click="chooseDate(item,item2)" 
						:class="item2.ifShow?'date-view-date-disable':item.isChoose&&defalueDateMonth == item2.month?'date-view-date-choose':''">
							{{item2.month}}月
						</p>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import moment from 'moment';
	export default {
		components: {},
		props: {
			defalueDate:{
				default: moment(new Date()).format('YYYY-MM'),
				type: String
			}
		},
		data() {
			return {
				nowDate:"",
				dateSelectList:[
					
				],
				defalueDateMonth:0,
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
				this.defalueDateMonth = Number(defalueDate[1]);
				let defalueDateYear = defalueDate[0];
				let month = new Date().getMonth();
				let year = new Date().getFullYear()-1;
				for(let i=0;i<2;i++){
					let data = {
						monthList:[
							
						]
					};
					data.year = year+i;
					for(let j=1;j<=12;j++){
						let monthData = {
							month:j,
							ifShow:true,
						}
						if(i==0 && j>month+1){
							monthData.ifShow = false;
						}
						else if(i==1 && j<month+1){
							monthData.ifShow = false;
						}
						data.monthList.push(monthData)
					}
					if(Number(data.year) == Number(defalueDateYear)){
						data.isChoose = true;
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
				// if(Number(item2.month)<10){
				// 	item2.month = "0"+item2.month;
				// }
				let pages = getCurrentPages();
				let prevPage = pages[pages.length - 2]; //上一个页面
				prevPage.$vm.apiSelectMonth=item.year + "-" +item2.month //重点$vm
				prevPage.$vm.showMonth=item.year + "年" + item2.month+"月" ; //重点$vm
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
	.date-view{
		margin-bottom: 96rpx;
	}
	.operLine-title{
		width:100%;
		height:80rpx;
		text-align:center;
		line-height:80rpx;
		margin:40rpx auto;
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
			width: 25%;
			text-align: center;
			
			p{
				font-family: 'PingFang SC';
				font-style: normal;
				font-weight: normal;
				font-size: 32rpx;
				line-height: 44rpx;
				text-align: center;
				color: #333333;
			}
		}
		
		.date-view-date-list:nth-child(n + 5){
			margin-top: 48rpx;
		}
	}
	.date-view-date-disable{
		color: #4F4F4F !important;
		opacity: 0.3 !important;
	}
	.date-view-date-choose{
		color: #3874F6 !important;
	}
</style>

