<template>
	<view class="code-style" :style="{marginTop:extraStyle.marginTop}">
		<view class="soncode">
			<view class="border-style">
				<uqrcode ref="uQRCode" :text="codeContent"
					:foregroundColor="isUsed&&usedForegroundColor||foregroundColor" :size="130" />
			</view>
			<view class="line-style"></view>
			<view class="code-text"><text :class="isUsed&&'usedStyle'">{{codeContent}}</text>
				<!-- <text v-if="isUsed" class="usetext">已使用</text> -->
			</view>
			<view class="tips-style">为保障您的权益，未到店前请不要将券号提供给商家</view>
		</view>
	</view>
</template>

<script>
	import uqrcode from '@/components/uQRCode/components/uqrcode/uqrcode.vue';
	export default {
		components: {
			uqrcode
		},
		props: {
			codeContent: {
				type: [String, Number],
				default: ''
			},
			foregroundColor: {
				type: String,
				default: '#000000'
			},
			usedForegroundColor: {
				type: String,
				default: '#666666'
			},
			isUsed: {
				type: Boolean,
				default: false,
			},
			extraStyle: {
				type: Object,
				default: {
					marginTop: ''
				}
			}
		},
		data() {
			return {}
		}
	}
</script>

<style scoped>

	.code-style {
		background-color: #FFFFFF;
		border-radius: 8rpx;
		margin: 0 16px;
		padding: 44rpx 16px 16px;
	}

	.soncode {
		/* border: 2rpx solid #eeeeee; */
		margin: 0 auto;
		border-top: 0;
		text-align: center;
		padding-top: 20rpx;
	}

	.border-style {
		display: flex;
		justify-content: center;
	}

	.line-style {
		border: 2rpx dashed #e1e1e1;
		margin: 20rpx 0;
		position: relative;
	}

	/* .line-style::before {
		content: '';
		position: absolute;
		left: 0;
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		background: #FFFFFF;
		transform: translate(-50%, -50%) rotate(135deg);
		border-top: 2rpx solid #eeeeee;
		border-left: 2rpx solid #eeeeee;
	}

	.line-style::after {
		content: '';
		position: absolute;
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		background: #FFFFFF;
		right: 0;
		transform: translate(50%, -50%) rotate(-45deg);
		border-top: 2rpx solid #eeeeee;
		border-left: 2rpx solid #eeeeee;
	} */

	.tips-style {
		font-weight: 400;
		font-size: 20rpx;
		line-height: 1;
		padding: 20rpx 0;
		color: #4F4F4F;

	}

	.code-text {
		font-weight: 400;
		font-size: 24rpx;
		line-height: 34rpx;
		color: #606060;
	}

	.code-text text {
		font-weight: 500;
		font-size: 40rpx;
		line-height: 1;
		color: #323232;
		padding-left: 5px;
	}

	.usedStyle {
		color: #898E91 !important;
		text-decoration: line-through;
	}

	.code-text .usetext {
		font-weight: 400;
		font-size: 26rpx;
		color: #F2994A;
	}
</style>
