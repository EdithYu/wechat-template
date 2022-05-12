<template>
	<view class="tabs">
		<scroll-view class="active-switch" scroll-x :scroll-into-view="id" scroll-with-animation>
			<view class="switch-container">
				<view v-for="(item,index) in TabList" :key="index" :class="['active-item',currentTab==index&&'focus']"
					@tap="tabChange(index)" :id='`tab_${index}`'>
					<view class="item">{{item.title}}</view>
					<view :class="[currentTab==index&&'focus-line']">
					</view>
				</view>

			</view>
		</scroll-view>
		<view class="tab-pane-view" @touchstart='touchstart' @touchend='touchend'>
			<view class="tab-pane-group" :style="{transform:transformXx}">
				<slot></slot>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: 'Tabs',
		data() {
			return {
				id: 'tab_0',
				start: 0
			}
		},
		props: {
			TabList: {
				default: () => {
					return []
				},
				type: Array
			},
			currentTab: {
				default: 0,
				type: Number
			}
		},
		computed: {
			transformX() {
				let currentTab = this.currentTab;
				return `translate3d(${currentTab*100}%, 0px, 0px)`
			},
			transformXx() {
				let currentTab = this.currentTab;
				return `translate3d(-${currentTab*100}%, 0px, 0px)`
			}
		},
		methods: {
			tabChange(index) {
				if (this.currentTab != index) {
					console.log(index)
					this.$emit('tabs', index);
					//this.bus.$emit('tabs', index) //事件，这里触发tabs事件
					this.id = `tab_${index}`
				}
			},
			touchstart(e) {
				this.start = e.touches[0].clientX;
			},
			touchend(e) {
				let end = e.changedTouches[0].clientX;
				if (end - this.start > 100 && this.currentTab >= 1) {
					this.tabChange(this.currentTab - 1)
				} else if (this.start - end > 100 && this.currentTab < this.TabList.length - 1) {
					this.tabChange(this.currentTab + 1)
				}
			}
		}
	}
</script>
<style scoped lang="scss">
	.tabs {
		position: relative;
		height: 250px;
		display: flex;
		flex-direction: column;

		.active-switch {
			overflow-x: scroll;
			overflow-y: hidden;

			.switch-container {
				position: relative;
				display: flex;
				flex-direction: row;
				width: 680rpx;
				height: 70rpx;
				overflow-x: scroll;
				border-bottom: 1px solid #F0F2F5;
				scrollbar-width: none;
				-ms-overflow-style: none;
				transform: translateX(10rpx);

				&::-webkit-scrollbar {
					display: none;
					/* Chrome Safari */
				}


			}

			.active-item {
				position: relative;
				margin-right: 20rpx;
			     font-size: 28rpx;
				height: 70rpx;
				transition: .3s;
				background-color: #fff;
				color: #000;

				display: flex;
				flex-direction: column;
				justify-content: space-around;


				&.focus {
					background: #fff;
				color: #323232;
					transition-duration: .3s
				}

				&.fix {
					width: 24rpx;
				}

				.focus-line {
					width: 30rpx;
					height: 4rpx;
					margin: 0 auto;
					border-radius: 3px;
					background: #43BB79;
					transform: translateY(4rpx);

				}

				.item {
					padding: 0 5rpx;
					overflow: hidden;
					font-size: 28rpx;
				}
			}
		}

		.tab-pane-view {
			overflow: hidden;
			height: 244rpx;
			background-color: #FFFFFF;
			flex: 1;

			.tab-pane-group {
				display: block;
				white-space: nowrap;
				-webkit-transition: all .3s;
				transition: all .3s;
				width: 100%;
				overflow: visible;
				will-change: transform, left, top;
				min-height: 100rpx;
				height: 100%;

				.tab-pane-item {
					width: 100%;
					min-height: 100rpx;
					display: inline-block;
					white-space: initial;
					vertical-align: top;
					font-size: 24rpx;
					box-sizing: border-box;
					// overflow: auto
				}
			}

		}
	}



	// position relative
	// height 100vh
	// display flex
	// flex-direction column
	// .active-switch
	//     overflow scroll
	//     .switch-container
	//         position relative
	//         display flex
	//         flex-direction row
	//         .focus-line
	//             flex 1
	//             width 160upx
	//             position absolute
	//             bottom 0
	//             border-bottom 4upx solid #f07
	//             transition 0.3s
	//             &.fix
	//                 width 250upx
	//     .active-item
	//         position relative
	//         min-width 160upx
	//         width 160upx
	//         flex 1
	//         height 100upx
	//         transition .3s
	//         background-color: #fff
	//         color #000
	//         text-align: center
	//         display: flex 
	//         flex-direction: column
	//         justify-content: space-around
	//         border-bottom 1upx solid rgba(0,0,0,0.5)
	//         &.focus
	//             background #fff
	//             color #f07
	//             transition-duration: .3s
	//         &.fix
	//             width 250upx
	//         .item
	//             // width: 220upx
	//             padding: 0 5upx
	//             overflow hidden
	//             font-size: 28upx
	// .tab-pane-view
	//     overflow hidden
	//     background-color: #f7f7f7
	//     flex 1 
	//     .tab-pane-group
	//         display: block;
	//         white-space: nowrap;
	//         -webkit-transition: all .3s;
	//         transition: all .3s;
	//         width: 100%;
	//         overflow: visible;
	//         will-change: transform,left,top;
	//         min-height 100upx
	//         height 100%
	//         .tab-pane-item
	//             width: 100%;
	//             min-height 100upx
	//             display: inline-block
	//             white-space: initial;
	//             vertical-align: top;
	//             font-size: 24upx;
	//             box-sizing: border-box;
	//             overflow: auto
</style>
