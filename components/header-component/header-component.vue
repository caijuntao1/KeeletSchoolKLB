<template>
	<view>
		<view class="content-header">
			<view class="header-logo" @click="goHomePage"></view>
			<view class="steps-box">
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"header-component",
		props:{
			stepsStatus:Number
		},
		data() {
			return {
				
			};
		},
		watch:{
			stepsStatus(newValue,oldValue){
				console.log(newValue,oldValue);
			}
		},
		methods:{
			goHomePage:function(){
				uni.redirectTo({
					url:'/pages/index/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	.content-header{
		padding-top: 30px;
		padding-bottom: 30px;
		width: 100%;
		.header-logo{
			border-top: 1px solid #ccc;
			height: 250px;
			width: 100%;
			background-image: url('../../static/images/img_logo_b.png');
			background-size: contain;
			background-position: center;
			background-repeat: no-repeat;
		}
		.steps-box{
			height: 150px;
			width: 100%;
			background-image: url('../../static/images/form-step1.png');
			background-size: contain;
			background-position: center;
			background-repeat: no-repeat;
		}
	}
</style>