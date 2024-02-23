<template>
  <view>
    <view id="scanArea"></view>
  </view>
</template>

<script>
import Html5Qrcode from 'html5-qrcode';

export default {
  mounted() {
    const qrCodeScanner = new Html5Qrcode('scanArea');

    qrCodeScanner.start(
      (message) => {
        // 扫描成功的回调函数
        console.log('扫描结果:', message);
      },
      (error) => {
        // 扫描失败的回调函数
        console.error('扫描失败:', error);
      },
      {
        // 配置项，例如摄像头分辨率、扫描速度等
      }
    );
  },
  beforeDestroy() {
    qrCodeScanner.stop();
  }
};
</script>