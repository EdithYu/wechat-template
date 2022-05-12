<template>
    <view>
         <view class="my-tabs">
        <!-- 展示的第一行的所有tabbarlist内容 -->
       <view class="tabs-list" >
          <view class="tabs"  style="flex: 1;"  v-for="(item,index) in tabList" :key="item.index">
            <view @click="changeTab(item)"  :class="[tabIndex == item.index ? 'selectTab': 'unselectTab']">{{item.name}}</view>
            <view class="tabs-line" :class="[tabIndex == item.index ? '.tabs-line': '.tabs-lines']"></view>
          </view>
       </view>
          </view> 
    <!-- tab 下面的内容 -->
    <view  class="tabs-content">
      <slot></slot>
    </view>
    </view>
 
</template>

<script>
    export default {
        // 获取父组件传递过来的值
        props:{
            tabList:Array,
            tabIndex:Number,
        } ,
     
        methods:{
            changeTab(tab){
                this.$emit('changeTab',tab)
            }
        }
        
    }
</script>

<style lang="scss" scoped>
		/* #ifdef H5 */
		.my-tabs{
			position: fixed;
			top:40px !important;
		}
		/* #endif */
   .my-tabs{
       width: 100%;
       height: 76rpx;
       position: fixed;
       left: 0px;
       top: 0px;
       z-index: 99;
       background-color: #ffffff;
       .tabs-list{
           // width: 750rpx;
          display: flex;
          justify-content: space-around;
          align-items: center;
           height: 100rpx;
           background-color: #ffffff;
        //    justify-content: space-evenly;
        //    align-items: center;
          view{
              // width: 250rpx;
               height: 100rpx;
               line-height: 100rpx;
              text-align: center;
          }
          .tabs-line{
              width: 16px;
              height: 2px;
              background: #43BB79;
              border-radius: 10px;
              margin: 0 auto;
            
          }
           .tabs-lines{
               display: none;
           }
            .selectTab{
              font-size: 30rpx;  
			  // line-height: 42rpx;
			  font-weight: 500;
			  color: #323232;
          }
           .unselectTab{
				font-weight:400;
				font-size: 30rpx;
				// line-height: 42rpx;
				color: #606060;
          }

       }
     
   }
     .tabs-content{
           padding-top: 77rpx;
       }


</style>