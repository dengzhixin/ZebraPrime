# 斑马会员电商系统的设计与实现

## 简介

会员积分制斑马购物场所相比于传统电商应用的不同在于会员制，把会员体系抽象出来，构建成熟会员积分制体系，提升用户粘性，促进用户增长。

微信小程序是一种全新的连接用户与服务的方式，它可以在微信内被便捷地获取和传播，同时具有出色的使用体验。相比于传统的android和ios原生应用，微信小程序具有使用方便、潜在用户多、功能齐全、即用即走、内存占用小、开发入门门槛低的特点，故本次项目采用微信小程序开发。

---
#### 技术栈

- WXML：微信标记语言，用于展示UI模板，类似HTML

- WXSS：WeiXin Style Sheets，用于规定UI样式，具有 CSS 大部分特性。在CSS基础上扩展了尺寸单位和样式导入

-  JS：普通的JavaScrpt，用于控制页面逻辑

- JSON：项目配置文件

- wux-weapp：微信小程序 UI 组件库

- 微信小程序云开发（云数据库、云存储、云函数）

## 项目模块
![](https://dengzhixin-halo.oss-cn-shenzhen.aliyuncs.com/halo/image_1582136100559.png?x-oss-process=style/pic)

## 系统页面详细设计
### 首页
页面结构：
- 支持动态更新的首页海报 
- 支持动态更新的首页菜单  
- 商品展示

页面功能：为用户提供界面良好、分类清晰的商品展示，在商品展示列表中，通过页面的触底事件从网络获取更多的商品，减少请求过多不必要的数据，增加了页面加载的速度。
![首页](https://dengzhixin-halo.oss-cn-shenzhen.aliyuncs.com/halo/image_1582136259966.png?x-oss-process=style/pic)
### 权益页面
页面结构：
- 积分页面海报 
- 积分产品列表

页面功能：
为用户提供筛选出可以使用积分兑换的产品
![权益](https://dengzhixin-halo.oss-cn-shenzhen.aliyuncs.com/halo/image_1582136297333.png?x-oss-process=style/pic)

### 购物车页面
页面结构：
- 用户购物车列表 
- 底部购物车功能面板

页面功能：
显示用户购物车管理，结算等功能
![购物车](https://dengzhixin-halo.oss-cn-shenzhen.aliyuncs.com/halo/image_1582136322589.png?x-oss-process=style/pic)

### 个人中心页面
页面结构：
- 用户信息面板 
- 加入斑马会员面板（已经是会员不显示） 
- 个人信息功能面板

页面功能：
显示用户的基本信息（积分，总积分，等级），为用户提供查看订单、管理收货地址、给小程序评分和联系客服的功能。

会员等级规则：
|等级|总积分|
|-------|-------|
|Level6	|> 2400|
|Level5	|> 1200|
|Level4	|> 900|
|Level3	|> 600|
|Level2	|> 300|
|Level1	|<=300|
![个人中心页面](https://dengzhixin-halo.oss-cn-shenzhen.aliyuncs.com/halo/image_1582136586983.png?x-oss-process=style/pic)

### 商品详情页面
页面结构：
- 商品封面图 
- 商品基本信息
- 商品SKU选择面板 
- 商品详情（富文本解析）
- 底部加入购物车和立即购买面板

页面功能：
显示商品信息，并提供将商品加入购物车和立即购买的功能
![](https://dengzhixin-halo.oss-cn-shenzhen.aliyuncs.com/halo/image_1582136642046.png?x-oss-process=style/pic)

![](https://dengzhixin-halo.oss-cn-shenzhen.aliyuncs.com/halo/image_1582136648260.png?x-oss-process=style/pic)

### 订单提交页面

页面结构：
- 订单收货信息面板 
- 订单购买的商品信息面板
- 买家留言板
- 底部合计金额（产品总价-积分抵扣）、确认订单信息提交订单面板

页面功能：
用户核对订单信息，选择收货信息，确认提交订单

![订单提交](https://dengzhixin-halo.oss-cn-shenzhen.aliyuncs.com/halo/image_1582136704952.png?x-oss-process=style/pic)

### 收货地址管理页面
页面结构：
- 添加新地址按钮
- 用户已添加的地址管理

页面功能：
管理用户地址、跳转到添加新地址页面、根据选中的地址跳转回下单页面
![收货地址管理页面](https://dengzhixin-halo.oss-cn-shenzhen.aliyuncs.com/halo/image_1582136756194.png?x-oss-process=style/pic)

### 添加新地址页面
页面结构：
- 地址信息填写面板
页面功能：
填写新的地址
填写规范：
1. 手机号码满足正则表达式：^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$
2. 收件人姓名、手机号码、详细地址均不能为空
![添加新地址页面](https://dengzhixin-halo.oss-cn-shenzhen.aliyuncs.com/halo/image_1582136792971.png?x-oss-process=style/pic)

### 用户订单管理页面
页面结构：
- 用户订单列表

页面功能：
显示用户订单列表，提供查看订单详情功能
![用户订单管理页面](https://dengzhixin-halo.oss-cn-shenzhen.aliyuncs.com/halo/image_1582136848748.png?x-oss-process=style/pic)

### 用户订单详情页面
页面结构：
- 用户订单状态
- 用户订单收货信息
- 用户订单商品信息

页面功能：
实时更新用户订单的状态，显示订单详情。
订单状态：（0订单已创建 1订单已付款 2订单配货中 3订单已发货 4订单已完成 5订单退款中 6订单已关闭）

![用户订单详情页面](https://dengzhixin-halo.oss-cn-shenzhen.aliyuncs.com/halo/image_1582136887301.png?x-oss-process=style/pic)

### 用户评分反馈页面
页面结构：
- 斑马Logo
- 建议内容
- 打分

页面功能：
用户可以根据用户体验对小程序进行打分，也可以写下对小程序的优化建议和鼓励。
![用户评分反馈页面](https://dengzhixin-halo.oss-cn-shenzhen.aliyuncs.com/halo/image_1582136924666.png?x-oss-process=style/pic)

## 收获与体会
1. 写代码之前要先构思好这个项目的模块划分，把项目分为多个功能点，逐个功能点开发，会起到事半功倍的效果，大大提高开发效率
2. 边写边调试，切记不要等所有功能都写完再调试，及时发现问题，防治BUG出现连锁反应，最终导致整个项目进度被影响。
3. 注意封装与简化，代码并不是越长约到，也不是越短越好，提升代码的可读性，可拓展性，可维护性，减少代码的耦合性。
