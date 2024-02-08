<template>
	<view>
		<view class="content-footer">
			<view class="btn-group">
				<button type="button" class="btn" @click="backPrePage">BACK</button>
				<button type="button" class="btn" @click="cleanAll">CLEAR</button>
				<button type="button" class="btn" :disabled="isCanNext" @click="goOptionPage">NEXT</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"footer-component",
		props:{
			formData:Array,
			stepsStatus:Number
		},
		data() {
			return {
				isCanNext:false,
			};
		},
		methods:{
			backPrePage(){
				uni.navigateBack()
			},
			goOptionPage(){
				this.stepsStatus += 1;
				console.log(this.stepsStatus);
				console.log(FormData);
				uni.navigateTo({
					url:'/pages/registercode/registercode'
				})
			},
			cleanAll(){
				this.$emit('update-formData');
			}
		}
	}
</script>

<style lang="scss">
	.content-footer{
		.btn-group{
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			box-sizing: border-box;
			.btn{
				width: 33.33%;
				background-color: #D52128;
				color: #fff;
				padding: 5px 0px;
				margin: 20px 40px;
				font-size: 25px;
				border-radius: 0px;
				&[disabled=true]{
					color: #ccc;
				}
			}
		}
	}
</style>