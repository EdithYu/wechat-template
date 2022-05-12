<template>
	<view>
		<dateSearch v-if="statusDayOrMonthly == 'day'" :defalueDate="defalueDate"></dateSearch>
		<monthSelech v-if="statusDayOrMonthly == 'monthly'" :defalueDate="defalueDate"></monthSelech>
	</view>
</template>

<script>
	import dateSearch from '@/components/dateMonthSelection/dateSelection.vue'
	import monthSelech from '@/components/dateMonthSelection/monthSelection.vue'
	
	export default {
		components:{
		    dateSearch,
			monthSelech
		},
		data() {
			return {
				statusDayOrMonthly:"day",
				defalueDate:"",
			}
		},
		onLoad(options){
			if(options.statusDayOrMonthly){
				this.statusDayOrMonthly = options.statusDayOrMonthly;
			}
			if(options.defalueDate){
				this.defalueDate = options.defalueDate;
			}
			// let pages = getCurrentPages();
			// let prevPage = pages[pages.length - 2]; //上一个页面
			// prevPage.$vm.showDate='2-12'; //重点$vm
			// prevPage.$vm.showMonth='2022-1'; //重点$vm
			// uni.navigateBack();
		},
		onShow(){
			
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
