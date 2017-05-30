import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import ReDemo from 'redemo';
import { Switch } from 'antd';
import { HttpFlv } from './http-flv';
import { HLS } from './hls';
import { RTMP } from './rtmp';
import { FlvSupport } from '../support';
import '../index.scss';

// export const HOST = 'wuhaolin.cn';
export const HOST = 'localhost';

class ROOT extends PureComponent {

  state = {
    rtmp: true,
    flv: true,
    hls: true,
  }

  render() {
    const { rtmp, flv, hls } = this.state;
    return (
      <div className="reflv-wrap">
        <h1>常见直播方案延迟与性能对比</h1>

        <ReDemo doc={`
        - 传输协议 RTMP
        - 播放器 Flash
        `}>
          <Switch checked={rtmp} onChange={(checked) => {
            this.setState({
              rtmp: checked
            })
          }}/>
          {rtmp ? <RTMP/> : null}
        </ReDemo>

        <ReDemo doc={`
        - 传输协议 HTTP-FLV
        - 播放器 flv.js
        `}>
          <Switch checked={flv} onChange={(checked) => {
            this.setState({
              flv: checked
            })
          }}/>
          {flv ? <HttpFlv/> : null}
        </ReDemo>

        <ReDemo doc={`
        - 传输协议 HLS
        - 播放器 HTML5 Video
        `}>
          <Switch checked={hls} onChange={(checked) => {
            this.setState({
              hls: checked
            })
          }}/>
          {hls ? <HLS/> : null}
        </ReDemo>

        <FlvSupport/>
      </div>
    )
  }
}

render(<ROOT/>, window.document.getElementById('react-body'));
