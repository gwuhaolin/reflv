import React from 'react';
import { render } from 'react-dom';
import ReDemo from 'redemo';
import { Basic } from './demo/basic';
import { Live } from './demo/live';
import { FlvSupport } from './support';
import './index.scss';

// load propTypes by docgen-loader from button component source code
const docgen = require('!!docgen-loader!../src');

const ROOT = (
  <div className="reflv-wrap">
    <h1>react component wrap flv.js</h1>
    <div>
      <h3>Demos</h3>

      <ReDemo
        docgen={docgen}
        code={require('!!raw-loader!./demo/basic')}
        doc={`
play same origin record video
`}
      >
        <Basic/>
      </ReDemo>

      <ReDemo
        code={require('!!raw-loader!./demo/live')}
        doc={`
play cross origin live stream video
`}
      >
        <Live/>
      </ReDemo>
    </div>
    <FlvSupport/>
  </div>
)

render(ROOT, window.document.getElementById('react-body'));
