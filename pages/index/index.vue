<template>
	<view class="content">
		<view class="content-header">
			<view class="header-logo"></view>
			<view class="header-title">Please choose your option！</view>
		</view>
		
		<view id="scanArea"></view>
		<view class="content-body">
			<view class="nav-box">
				<ul>
					<li class="nav-item" @click="signIn"></li>
					<li class="nav-item" @click="showTips('guardHouse')"></li>
					<li class="nav-item" @click="goRegisterPage"></li>
					<li class="nav-item" @click="scanCodeWithFrontCamera"></li>
				</ul>
			</view>
		</view>
		
		<view class="content-footer">
			<p>Kowloon Bay Campus</p>
		</view>
		<uni-popup ref="guardHousePopup">
			<view class="popup-content guard-house-popup">
				<view class="popup-photo"></view>
				<view class="popup-text">Please go to Guard House.</view>
			</view>
		</uni-popup>
		
		<uni-popup ref="receptionCounterPopup">
			<view class="popup-content reception-counter-popup">
				<view class="popup-photo"></view>
				<view class="popup-text">Please go to Reception Counter.</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import httpApi from '@/common/api.js';
	export default {
		data() {
			return {
				src:''
			}
		},
		onLoad() {
			
		},
		mounted() {
			// #ifdef APP-PLUS
		    // 强制竖屏
			//"portrait-primary", 
			//"portrait-secondary"
		    plus.screen.lockOrientation( 'portrait-primary');
			// #endif 
			let that = this;
			uni.$on('submitSuccess',function(data){
				that.showReceptionCounterPopup();
			});
		},
		methods: {
			scanCodeWithFrontCamera() {
				uni.navigateTo({
					url:'/pages/scancode/scancode'
				})
			},
			signIn:function(){
				uni.navigateTo({
					url:'/pages/signin/signin',
				})
			},
			showTips:function(){
				this.$refs.guardHousePopup.open('center')
				let that = this;
				setTimeout(function(){
					that.$refs.guardHousePopup.close();
				},3000)
			},
			showReceptionCounterPopup:function(){
				this.$refs.receptionCounterPopup.open('center')
				uni.clearStorage();
				let that = this;
				setTimeout(function(){
					that.$refs.receptionCounterPopup.close();
				},3000)
			},
			goRegisterPage(){
				uni.navigateTo({
					url:'/pages/registercode/registercode',
				})
			},
			scanCode(){
				let that = this;
				// 允许从相机和相册扫码
				uni.scanCode({
					success: function (res) {
						console.log('code type：' + res.scanType);
						console.log('code content：' + res.result);
						if(res.scanType == 'QR_CODE' && res.result != '' && res.result.length == 4){
							uni.showLoading({
								title: 'LOADING...'
							})
							let registration_code = res.result
							httpApi.searchCode({
								registration_code:registration_code
							}).then(res => {
								console.log('response：', res)
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
										throw new Error('Request failed, please try again');
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
									content:'Loading failed, please try again'
								});
							});
						}else{
							uni.showModal({
								showCancel:false,
								confirmText:'OK',
								// content:'Please agree the Terms And Conditions and Declaration！'
								content:'Scancode failed, please try again'
							});
						}
					},
					fail:function(err){
						console.log(err);
					}
				});
			},
			
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.content-header{
			padding-top: 40px;
			padding-bottom: 40px;
			width: 100%;
			.header-logo{
				height: 250px;
				width: 100%;
				background-image: url('../../static/images/img_logo_b.png');
				background-size: contain;
				background-position: center;
				background-repeat: no-repeat;
			}
			.header-title{
				text-align: center;
				font-size: 30px;
				font-style: oblique;
			}
		}
		
		.content-body{
			width: 100%;
			.nav-box{
				ul{
					padding: 0;
					margin: 0;
					list-style: none;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-wrap: wrap;
					.nav-item{
						min-width: calc(50% - 20px);
						min-height: 280px;
						margin: 10px;
						padding: 15px;
						box-sizing: border-box;
						background-size: contain;
						background-position: center;
						background-repeat: no-repeat;
						&:nth-child(1){
							background-image: url('../../static/images/btn_signin_1.png');
						}
						&:nth-child(2){
							background-image: url('../../static/images/btn_parent_pickup_1.png');
						}
						&:nth-child(3){
							background-image: url('../../static/images/btn_sign_reservation_v2.png');
						}
						&:nth-child(4){
							background-image: url('../../static/images/btn_qrscany_1_v2.png');
						}
					}
				}
			}
		}
		.content-footer{
			font-size: 14px;
			color: #da2128;
			position: fixed;
			bottom: 10px;
		}
	}
	.popup-content{
		width: calc(100vw - 150px);
		padding: 30px 20px 30px;
		box-shadow: 0px 3px 6px #00000029;
		border-radius: 12px;
		background-color: #fff;
		position: relative;
		box-sizing: border-box;
		
		.popup-photo{
			width: 100%;
			height: 350px;
			padding: 15px;
			box-sizing: border-box;
			background-image: url('../../static/images/img_gurard-house.png');
			background-size: contain;
			background-position: center;
			background-repeat: no-repeat;
		}
		.popup-text{
			font-size: 45px;
			text-align: center;
		}
	}
	.reception-counter-popup{
		.popup-photo{
			background-image: url('../../static/images/img_reception.png');
		}
		.popup-text{
			font-size: 38px;
		}
	}
	::v-deep .uni-popup__wrapper{
		width: 100%;
		height: 100%;
	}
</style>
