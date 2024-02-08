<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// #ifdef APP-PLUS
			function plusReady(){
				// 关闭程序启动界面
				plus.navigator.closeSplashscreen();
			}
			plusReady();
			//app启动时打开启动广告页
			var w = plus.webview.open(
				'hybrid/html/advertise/advertise.html',
				'advertise', {
					top: 0,
					bottom: 0,
					zindex: 999
				},
				'fade-in',
				0
			); 
			//设置定时器，4s后关闭启动广告页
			setTimeout(function() {
				plus.webview.close(w);
			}, 2000);
			// #endif 
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
