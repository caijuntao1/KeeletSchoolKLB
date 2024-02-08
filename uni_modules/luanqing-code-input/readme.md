# luanqing-code-input

#### 参数说明
名称|说明|默认值
--|--|--
itemSpace|每个验证码输入框单元的间距，单位rpx| 20
codeNumber|验证码的位数，4，6| 4
autoFocus|自动获取焦点|false
passwordMode|密码模式，输入的数字会用*代替| false
itemBackgroundColor|每个验证码输入框单元的背景色|'#007FFF'
itemTextColor|每个验证码数值的文字颜色|'#FFFFFF'
itemBorderRadius|每个验证码输入框的圆角度| 12
itemWidth|每个验证码输入框的宽度，单位rpx|80
itemHeight|每个验证码输入框的高度，单位rpx|105

#### 示例代码

```
	<!-- 简单模式 -->
	<luanqing-code-input style="margin-top: 108rpx;" @finish="inputFinish" :autoFocus="true"></luanqing-code-input>
	
	<!-- 多配置模式 -->
	<luanqing-code-input 
		style="margin-top: 50rpx;"
		@finish="inputFinish" 
		@input="inputing" 
		:itemWidth="100"
		:itemHeight="120"
		:auto-focus="true" 
		:passwordMode="false">
	 </luanqing-code-input>
	

	inputFinish(e){
		console.log("输入的验证码",e);
	},
```