<template>
	<view class="content">
		<view class="content-header">
			<view class="header-logo" @click="goHomePage"></view>
		</view>
		<view class="content-body">
			<web-view id="web-view" class="uni-flex-item" src="https://blog.minhazav.dev/research/html5-qrcode.html" @loading="loading">
			</web-view>
		</view>
		<view class="content-footer">
			<view class="btn-group">
				<button type="button" class="btn" @click="backPrePage">BACK</button>
				<button type="button" class="btn" @click="cleanAll">CLEAR</button>
				
				<button type="button" class="btn" @click="submitForm" :disabled="!isCanSubmit">SUBMIT</button>
			</view>
		</view>
	</view>
</template>

<script>
	import httpApi from '@/common/api.js';
	export default {
		data() {
			return {
				isCanSubmit:false,
				code:''
			}
		},
		watch:{
			code(newValue,oldValue){
				if(newValue.length >= 4){
					this.isCanSubmit = true;
					uni.hideKeyboard();
				}else{
					this.isCanSubmit = false;
				}
			}
		},
		methods:{
			goHomePage:function(){
				uni.redirectTo({
					url:'/pages/index/index'
				})
			},
			backPrePage(){
				uni.redirectTo({
					url:'/pages/index/index'
				})
			},
			cleanAll(){
				this.$refs.luanqingCodeInput.clear();
			},
			submitForm(){
				uni.showLoading({
					title: 'LOADING...'
				})
				let registration_code = this.code;
				httpApi.searchCode({
					registration_code:registration_code
				}).then(res => {
					console.log('response:', res)
					console.log(res.data.data[0]);
					uni.hideLoading();
					let result = res.data || {}
					try{
						if(result.error_code === '0') {
							uni.showToast({
								title: "succeed",
								icon: 'success'
							});
							
							// 页面A 跳转到页面B，并通过Storage传递数据
							let data = res.data.data[0];
							uni.setStorage({
								key: 'register_code_'+registration_code,
								data: data,
								success: function () {
									uni.navigateTo({
										url:'/pages/signin/signin?code='+registration_code
									})
								}
							});
						}else{
							throw new Error('Request failed, please try again.');
						}
					}catch(err){
						uni.showModal({
							showCancel:false,
							confirmText:'OK',
							// content:'Please agree the Terms And Conditions and Declaration！'
							content:err.message
						});
					}
				}).catch(err => {
					uni.hideLoading()
					console.error(err);
					uni.showModal({
						showCancel:false,
						confirmText:'OK',
						// content:'Please agree the Terms And Conditions and Declaration！'
						content:'Loading failed, please try again.'
					});
				});
			},
			inputFinish(e){
				console.log("code:",e);
				this.code += e
			},
			inputing(e){
				console.log("code:",e);
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
	}
	.content-body{
		height: calc(100vh - 430px);
		overflow-y: auto;
		border-bottom: 1px solid #ccc;
		
		/deep/ .item {
			background-color: #fff!important;
			color: #000!important;
		}
	}
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