<template>	
	<scroll-view style="background: #FFFFFF;" @refresherrefresh="refresherrefresh"   :refresher-enabled="true" :refresher-triggered="topLoading"  :scroll-top="scrollTop" @scroll="scroll"  :scroll-y="true" @scrolltolower="scrolltolower" 
		class="list">
		<slot />
<!-- 	<uni-list>	
	<uni-list-item class="parkItem" v-for="(item,index) in parkList" :key="index">
		<template slot="body" style="display: flex;">
			<div class="parkInfo">
				<h1>{{item.parkName}}</h1>
				<p> <span style="margin-right: 10rpx;">{{item.parkType?'道路':'场库'}}</span><span
						style="margin-right: 10rpx;">||</span><span>{{item.address}}</span> </p>
				<div class="tagList">
					<span v-if="item.isGov===1" class='newEnergy'>新能源·惠</span>
					<span
						v-show="(item.dataSource&&item.dataSource !== undefined)&&item.parkingLotType===0">余位：{{(item.parkRemainNum===undefined||item.parkRemainNum<0)?0:item.parkRemainNum}}</span>
					<span
						v-if="(item.parkingLotType===0&&item.dataSource===0||item.dataSource===undefined)&&item.setTideRuleFlag"
						class='floor'>总车位数：{{item.parkTotalNum===undefined?'--':item.parkTotalNum}}</span>
					<span
						v-if="(!item.dataSource||item.dataSource === undefined)&&!item.setTideRuleFlag&&!item.placeSpaceStatus">余位:充足</span>
					<span class='moon'
						v-if="(!item.dataSource||item.dataSource === undefined)&&!item.setTideRuleFlag&&item.placeSpaceStatus">余位:紧张</span>
					<span v-show="item.parkingLotType===0&&item.floorInfoList"
						class='floor'>{{item.floorInfoList.length===2?'地面 | 地下':item.floorInfoList[0]==1?'地下':'地面'}}</span>
					<span
						v-if="item.allowMonthlySubscription===0&&(item.dataSource !== 0&&item.dataSource !== undefined)"
						class='moon'>包月</span>
					<span v-if="item.allowAppointment===0&&(item.dataSource !== 0&&item.dataSource !== undefined)"
						class='moon'>预约</span>
				</div>
			</div>
			<div class="navigation">
				<image @click.stop="test(item)" src="../../static/image/navigation.png"></image>
				<p>{{item.distance<1000?parseInt(item.distance):(item.distance/1000).toFixed(1)}}
					{{item.distance<1000?'米':'公里'}}
				</p>
			</div>
		</template>
		
	</uni-list-item>

		
	</uni-list> -->
	<uni-load-more   v-if="loading&&parkList.length!==0" status="loading"></uni-load-more>
	</scroll-view>
</template>

<script>
	export default {
		name: "listLoadMore",
		data() {
			return {
				scrollTop:0,
				page: 0,
				pageSize: 10,
			    loading:true,
				topLoading:false,
				parkList: []
			};
		},
        created() {
        	console.log(66666666666)
			let data = {
				latitude: 31.286881,
				longitude: 121.464872,
				parkType: 0,
				page: 0,
				pageSize: 10
			}
			
			this.searchPark(data)
        },

		methods: {
			refresherrefresh(){
				console.log('下拉加载')
			this.topLoading=true
			let data = {
				latitude: 31.286881,
				longitude: 121.464872,
				parkType: 0,
				page: 0,
				pageSize: 10
			}
				this.parkList=[]
			this.searchPark(data)
			},
			scrolltolower(e){
			
				this.loading=true
				this.page=this.page+1
				let data = {
					latitude: 31.286881,
					longitude: 121.464872,
					parkType: 0,
					page: this.page,
					pageSize: 10
				}
				
				this.searchPark(data)
				
			},
			scroll(e){
				//console.log(e)
			},
			searchPark(data) { //寻找附近停车场
				let that = this
				
				this.$utils.request(this.$god.map.getNearbyCarParkList, data, 'get').then(
					res => {
						
						that.topLoading=false
						if(res.data.data.length<10){
							that.loading=false
						}
						// that.loading=false
						res.data.data.forEach((item, index) => {
							item.parkingLotType = 0
							if (item.latitude !== '' && item.longitude !== '') {
								if (item.latitude >= 0 && item.latitude <= 90 && item.longitude >= 0 &&
									item.longitude <= 180) {
									that.parkList.push(item)
								}
							}


						})

					}).catch(error => {
					uni.showModal({
						title: '提示',
						content: '请求失败',
						showCancel: false,

					})

				})


			},
		}


	}
</script>

<style scoped lang="scss">
	.list{
		height: 100%;
	}

	
	


</style>
