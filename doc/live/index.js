import React from 'react';
import { render } from 'react-dom';
import ReDemo from 'redemo';
import { FLV } from './flv';
import { HLS } from './hls';
import { RTMP } from './rtmp';
import { FlvSupport } from '../support';
import '../index.scss';

const ROOT = (
  <div className="reflv-wrap">
    <h1>常见直播方案对比</h1>
    <div>

      <ReDemo doc="RTMP">
        <RTMP/>
      </ReDemo>

      <ReDemo doc="HTTP-FLV">
        <FLV/>
      </ReDemo>

      <ReDemo doc="HLS">
        <HLS/>
      </ReDemo>

    </div>

    <FlvSupport/>
  </div>
)

render(ROOT, window.document.getElementById('react-body'));
