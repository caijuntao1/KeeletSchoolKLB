<template>
	<!-- 验证码输入框 -->
	<view class="code-box">
		<view class="flex-box">
			<input :value="inputValue" type="number" :adjust-position="false"  :focus="autoFocus" :maxlength="codeNumber" class="hide-input" @input="getVal" />
			<block v-for="(item, index) in ranges" :key="index">
				<view :class="['item', { active: codeIndex === item, middle: type === 'middle', bottom: type === 'bottom', box: type === 'box' }]" 
					:style="'margin-right:'+(index >= ranges.length ? 0:itemSpace)+'rpx;color:'+itemTextColor+';background:'+itemBackgroundColor+';border-radius:'+itemBorderRadius+';width:'+itemWidth+'rpx;height:'+itemHeight+'rpx;'">
					<view class="line" v-if="type !== 'middle'"></view>
					<view v-if="type === 'middle' && codeIndex <= item" class="bottom-line"></view>
					<block v-if="passwordMode && codeArr.length >= item">
						<text class="dot">*</text>
					</block>
					<block v-else> {{ codeArr[index] ? codeArr[index] : ''}}</block>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			itemWidth:{
				type: Number,
				default: 80
			},
			itemHeight:{
				type: Number,
				default: 105
			},
			itemBorderRadius:{
				type: Number,
				default: 12
			},
			itemBackgroundColor:{
				type: String,
				default: '#007FFF'
			},
			itemTextColor: {
				type: String,
				default: '#FFFFFF'
			},
			// 验证码值
			value: {
				type: String,
				default: ''
			},
			// 4 | 6
			codeNumber: {
				type: Number,
				default: 4
			},
			autoFocus: {
				type: Boolean,
				default: false
			},
			// 密码模式，用.替代
			passwordMode: {
				type: Boolean,
				default: false
			},
			// middle-middle line, bottom-bottom line, box-square box
			type: {
				type: String,
				default: "box"
			},
			itemSpace:{
				type: Number,
				default: 20
			}
		},
		watch: {
			codeNumber: {
				immediate: true,
				handler: function(newV) {
					if (newV === 6) {
						this.ranges = [1, 2, 3, 4, 5, 6]
					} else {
						this.ranges = [1, 2, 3, 4]
					}
				}
			},
			value: {
				immediate: true,
				handler: function(newV) {
					if (newV !== this.inputValue) {
						this.inputValue = newV
						this.toMakeAndCheck(newV)
					}
				}
			}
		},
		data() {
			return {
				inputValue: '',
				codeIndex: 1,
				codeArr: [],
				ranges: [1, 2, 3, 4]
			}
		},
		methods: {
			getVal(e) {
				const val = e.detail.value
				this.inputValue = val
				this.$emit('input', val)
				this.toMakeAndCheck(val)
			},
			toMakeAndCheck(val) {
				const arr = val.split('')
				this.codeIndex = arr.length + 1
				this.codeArr = arr
				if (this.codeIndex > Number(this.codeNumber)) {
					this.$emit('finish', this.codeArr.join(''))
				}
			},
			// refs 时不再提供 v-model 支持
			// 支持使用refs来设置value
			// 没有提供数据保护与检测，自己在外面对数据进行检测保护
			set(val) {
				this.inputValue = val
				this.toMakeAndCheck(val)
			},
			// 支持使用refs来清空
			clear() {
				this.inputValue = ''
				this.codeArr = []
				this.codeIndex = 1
			}
		}
	}
</script>

<style scoped>
	@keyframes twinkling {
		0% {
			opacity: 0.2;
		}

		50% {
			opacity: 0.5;
		}

		100% {
			opacity: 0.2;
		}
	}

	.code-box {
		text-align: center;
	}

	.flex-box {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		position: relative;
	}

	.flex-box .hide-input {
		position: absolute;
		top: 0;
		left: -100%;
		width: 200%;
		height: 100%;
		text-align: left;
		z-index: 9;
		opacity: 1;
	}

	.flex-box .item {
		position: relative;
		width: 80rpx;
		height: 105rpx;
		font-size: 64rpx;
		font-weight: bold;
		color: #333333;
		line-height: 105rpx;
	}

	.flex-box .item:last-child {
		margin-right: 0;
	}

	.flex-box .middle {
		border: none;
	}

	.flex-box .box {
		box-sizing: border-box;
		border: 2upx solid #cccccc;
		border-radius: 6rpx;
	}

	.flex-box .bottom {
		box-sizing: border-box;
	}

	.flex-box .active {
	}

	.flex-box .active .line {
		display: block;
	}

	.flex-box .line {
		display: none;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 2upx;
		height: 40upx;
		background: #333333;
		animation: twinkling 1s infinite ease;
	}

	.flex-box .dot {
		font-size: 80upx;
		line-height: 40upx;
	}

	.flex-box .bottom-line {
		height: 2rpx;
		background: #000000;
		width: 80%;
		position: absolute;
		border-radius: 4rpx;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50% );
	}
</style>
