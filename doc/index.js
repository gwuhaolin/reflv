import React from 'react';
import { render } from 'react-dom';
import ReDemo from 'redemo';
import { Basic } from './demo/basic';
import { FlvSupport } from './support';
import './index.scss';

// load propTypes by docgen-loader from button component source code
const docgen = require('!!docgen-loader!../src');

const ROOT = (
  <div className="reflv-wrap">
    <h1>react component wrap flv.js</h1>
    <ReDemo
      docgen={docgen}
      code={require('!!raw-loader!./demo/basic')}
      doc={`play flv video`}
    >
      <Basic/>
    </ReDemo>
    <FlvSupport/>
    <a href="/live.html">常见直播方案延迟与性能对比</a>
  </div>
)

render(ROOT, window.document.getElementById('react-body'));
