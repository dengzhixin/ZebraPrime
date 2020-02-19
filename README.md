## Face-api
> 　Face-api.js 是一个 JavaScript API，是基于 tensorflow.js 核心 API 的人脸检测和人脸识别的浏览器实现。它实现了一系列的卷积神经网络（CNN），针对网络和移动设备进行了优化。

## face-api的一些概念
![](https://user-images.githubusercontent.com/31125521/57224752-ad3dc080-700a-11e9-85b9-1357b9f9bca4.gif)
#### 人脸检测模型
```
faceapi.nets.ssdMobilenetv1.loadFromUri("models");
```
#### 人脸地标模型
标记人脸的眼睛-耳朵-嘴巴等标记点的位置的模型，常见的有68个点坐标模型
```
faceapi.nets.faceLandmark68Net.loadFromUri("models");
```

#### 人脸识别模型
对人脸的内容进行识别，如人的年龄、心情、性别等

### 给人物戴口罩在线预览
<iframe src="https://dengzhixin.github.io/some-html-css-js-demo/%E4%BA%BA%E8%84%B8%E8%AF%86%E5%88%AB%E6%88%B4%E5%8F%A3%E7%BD%A9/" width=100% height="600px"  frameborder="0"></iframe>

[GitHub仓库](https://github.com/dengzhixin/some-html-css-js-demo/tree/master/%E4%BA%BA%E8%84%B8%E8%AF%86%E5%88%AB%E6%88%B4%E5%8F%A3%E7%BD%A9)

## js代码实现
```
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
async function wearMask() {
  //初始化canvas
  const loading = document.querySelector(".loading");
  loading.style.display = "flex";

  // 人脸检测模型
  await faceapi.nets.ssdMobilenetv1.loadFromUri("models");
  // 人脸地标模型
  await faceapi.nets.faceLandmark68Net.loadFromUri("models");

  // // 开始人脸识别，先识别脸，只返回一个最接近的人脸数据
  // // 再识别眼、嘴、鼻的位置，使用68个点坐标模型
  // // 最后获取脸部描述
  const detection = await faceapi.detectSingleFace(canvas).withFaceLandmarks();;
  console.log(detection)

  const {
    landmarks
  } = detection;
  const {
    imageWidth: faceWidth,
    positions
  } = landmarks;
  console.log(landmarks)
  // 左耳附近
  const {
    _x: x,
    _y: y
  } = positions[1];
  // 获取鼻子上部到下巴的长度
  const height = Math.sqrt(
    Math.pow(positions[1]._x - positions[8]._x, 2) +
    Math.pow(positions[1]._y - positions[8]._y, 2)
  );
  let mask = document.getElementById("mask")
  ctx.drawImage(mask, x + faceWidth * 0.06, y - height * 0.08, faceWidth, height * 0.8)
  loading.style.display = "none";

}

function reset() {
  let faceImg = new Image()
  faceImg.onload = () => {
    canvas.width = faceImg.width
    canvas.height = faceImg.height
    ctx.drawImage(faceImg, 0, 0)
  }
  faceImg.src = "https://dengzhixin-halo.oss-cn-shenzhen.aliyuncs.com/halo/face_1582134025604.jpg"
}
window.onload = () => {
  reset()

}
```





## 参考文献
[face-api.js](https://github.com/justadudewhohacks/face-api.js)