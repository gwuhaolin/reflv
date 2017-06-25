import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import ReDemo from 'redemo';
import { Input, Switch } from 'antd';
import { HttpFlv } from './http-flv';
import { HLS } from './hls';
import { RTMP } from './rtmp';
import { FlvSupport } from '../support';
import '../index.scss';

export const HOST = process.env.NODE_ENV === 'production' ? 'live.wuhaolin.cn' : 'localhost';
const LS_KEY = 'reflv-live-state';

class ROOT extends PureComponent {

  state = {
    id: 'reflv',
    flv: true,
    rtmp: false,
    hls: false,
  }

  constructor(props) {
    super(props);
    const state = JSON.parse(window.localStorage.getItem(LS_KEY) || '{}');
    Object.assign(this.state, state);
  }

  componentDidUpdate() {
    window.localStorage.setItem(LS_KEY, JSON.stringify(this.state));
  }

  componentDidMount() {
    // this is for chrome-render https://github.com/gwuhaolin/chrome-render unit test
    window.chromeRenderReady && window.chromeRenderReady();
  }

  render() {
    const { id, rtmp, flv, hls } = this.state;
    return (
      <div className="reflv-wrap">
        <h1>常见直播方案延迟与性能对比</h1>

        <div>
          <h3>推流说明</h3>
          <p>推流后才可以看到视频</p>
          <Input addonBefore="房间ID" defaultValue={id} onPressEnter={event => {
            const id = event.target.value;
            this.setState({ id }, () => {
              window.location.reload();
            })
          }}/>
          <p>使用<code>{`ffmpeg -re -i demo.flv -c copy -f flv rtmp://${HOST}/live/${id}`}</code>推流播放demo.flv</p>
          <p>使用
            <code>
              {`ffmpeg -f avfoundation -i "0" -vcodec h264 -acodec aac -f flv rtmp://${HOST}/live/${id}`}
            </code>
            推流播放你电脑的摄像头
          </p>
        </div>

        <ReDemo doc={`
        - 传输协议 HTTP-FLV
        - 播放器 flv.js
        `}>
          <Switch checked={flv} onChange={(checked) => {
            this.setState({
              flv: checked
            })
          }}/>
          {flv ? <HttpFlv id={id}/> : null}
        </ReDemo>

        <ReDemo doc={`
        - 传输协议 RTMP
        - 播放器 Flash
        `}>
          <Switch checked={rtmp} onChange={(checked) => {
            this.setState({
              rtmp: checked
            })
          }}/>
          {rtmp ? <RTMP id={id}/> : null}
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
          {hls ? <HLS id={id}/> : null}
        </ReDemo>

        <FlvSupport/>
      </div>
    )
  }
}

render(<ROOT/>, window.document.getElementById('react-body'));
