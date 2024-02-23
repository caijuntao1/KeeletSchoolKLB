<template>
	<view>
		<div id="reader" width="600px">1234</div>
	</view>
</template>
<script>
	// To use Html5QrcodeScanner (more info below)
	import {Html5QrcodeScanner} from "html5-qrcode";
	// To use Html5Qrcode (more info below)
	import {Html5Qrcode} from "html5-qrcode";
	export default {
		name:"scan-code",
		data() {
			return {
				scanResult: ''
			};
		},
		mounted() {
			console.log(1);
		    setTimeout(function(){
				let html5QrcodeScanner = new Html5Qrcode("reader", {
				  fps: 10,
				  qrbox: { width: 250, height: 250 },
				});
				Html5Qrcode.getCameras().then(devices => {
				  /**
				   * devices would be an array of objects of type:
				   * { id: "id", label: "label" }
				   */
				  if (devices && devices.length) {
					var cameraId = devices[0].id;
					console.log(cameraId);
					// .. use this to start scanning.
				  }
				}).catch(err => {
				  // handle err
				});
				html5QrcodeScanner.start(
				  { facingMode: "environment" },
				  (decodedText, decodedResult) => {
				    // handle the scanned code as you like, for example:
				    console.log(`Code matched = ${decodedText}`, decodedResult);
				  },
				  (errorMessage) => {
				    // handle scan failure, usually better to ignore and keep scanning.
				    // for example:
				    console.warn(`Code scan error = ${errorMessage}`);
				  }
				);
			},2000)
		},
	}
</script>

<style>

</style>