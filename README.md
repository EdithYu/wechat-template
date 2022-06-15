# 小程序/h5规范

### 目录

<br>

+ pages ----页面
+ static 
   + image  ----图片
+ utils ----通用方法（全局封装请求等）
+ components ---组件
+ subcontract ---分包
   + pages ----分包页面
   + static 
      + image  ----图片
+ api
   + config.js --- 请求地址统一配置
+ main.js --- 全局配置
+ store
   + index.js --- 全局存储
  

### 组件
<br>
1.dateMonthSelection ---日期选择器（日历形式）
<br><br>
2.my-scroll-view ---可滑动区域和tab组合使用，具体可看示例代码
<br><br>
3.uQRCode ---二维码展示
<br><br>
4.tab ---tab切换，不可滑动


### h5调试
<br>
处理跨域
<br>
1.manifest.json--源码视图中对应h5位置配置代理

 ```ts
"devServer" : {
    "port" : 8086, //端口号
    "disableHostCheck" : true,
    "proxy" : {
        "/api" : {
            // "target" : "https://manager.parking.sk1111.cn", //目标接口域名
            "target" : "https://parkingh5tdev2.testproxy.sk1111.cn",
            "changeOrigin" : true, //是否跨域
            "secure" : true, // 设置支持https协议的代理
            "pathRewrite" : {
                "^/api" : ""
            }
        }
    }
}
```

2.config.js中对应配置
```ts
BASEURL: '/api',
```
