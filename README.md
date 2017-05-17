## flv.js 简介
使用原生HTML5 Video标签播放FLV格式的音视频数据，去掉对Flash的依赖。由于浏览器对原生Video标签采用了硬件加速，支持高清，性能很好。支持录播和直播。

## flv.js 限制
- FLV里所包含的视频编码必须是H.264，音频编码必须是AAC或MP3， IE11和Edge浏览器不支持MP3音频编码，所以FLV里采用的编码最好是H.264+AAC，这个让后端兼容不是问题。
- 对于录播，依赖 `原生HTML5 Video标签` 和 [Media Source Extensions](https://w3c.github.io/media-source/) API。
- 对于直播，依赖录播所需要的播放技术，同时依赖 `HTTP FLV` 或者 `WebSocket` 中的一种协议来传输FLV。其中`HTTP FLV`需通过流式IO去拉取数据，支持流式IO的有[fetch](https://fetch.spec.whatwg.org)或者[stream](https://streams.spec.whatwg.org)
- flv.min.js 文件大小 164Kb，gzip后
## 浏览器特性兼容列表
- [HTML5 Video](http://caniuse.com/#feat=webm)
- [Media Source Extensions](http://caniuse.com/#feat=mediasource)
- [WebSocket](http://caniuse.com/#feat=websockets)
- HTTP FLV: [fetch](http://caniuse.com/#feat=fetch) 或 [stream](http://caniuse.com/#feat=http-live-streaming)


## 常见直播协议
- **RTMP**: 底层基于TCP，在浏览器端依赖Flash，延迟1.5秒。
- **HTTP-FLV**: 基于HTTP传输FLV，依赖浏览器支持播放FLV，延迟在1秒。
- **WebSocket-FLV**: 基于WebSocket传输FLV，依赖浏览器支持播放FLV，延迟1秒。WebSocket建立在HTTP之上，建立WebSocket连接前还要先建立HTTP连接。
- **HLS**: Http Live Streaming，苹果提出基于HTTP的流媒体传输协议，延迟10秒。HTML5可以直接打开播放。
- **RTP**: 基于UDP，延迟1秒，浏览器不支持。

在支持浏览器的协议里，延迟排序是： 
HTTP-FLV < WebSocket-FLV < RTMP < HLS

可以看出在浏览器里做直播，使用HTTP-FLV协议是不错的，但是HTTP-FLV协议浏览器拿到的是FLV格式的音视频数据，在浏览器里播放FLV在很久之前需要依赖Flash，flv.js的出现让使用原始video标签播放flv成为了可能。

## flv.js 原理
flv.js只做了一件事，在获取到FLV格式的音视频数据后通过原生的JS去解码FLV数据，再通过[Media Source Extensions](https://w3c.github.io/media-source/) API 喂给原生HTML5 Video标签。
HTML5 原生仅支持播放 mp4/webm 格式，不支持 FLV。
flv.js 为什么要绕一圈，从服务器获取FLV再解码转换后再喂给Video标签呢？原因在于它想利用FLV格式。
FLV格式最大的优点是适合直播领域，因为FLV格式编码把视频拆分成许多很小的片段，而不是像MP4格式那样一个视频必须是一个完整的文件。
通过流式IO去拉取很小的片段能做到很小的延迟。
