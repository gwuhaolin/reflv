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
    <h1>Reflv: react component wrap flv.js</h1>
    <div>
      <h3>Demos</h3>
      <ReDemo
        docgen={docgen}
        code={require('!!raw-loader!./demo/basic')}
        doc={`
### react component used to demonstrate react component
#### structure
- in top section is demo instance to play
- circle button in right are toggle for **component propTypes** and **demo source code**
- propTypes table show all prop's info for this component
- in bottom is source code for this demo
`}
      >
        <Basic/>
      </ReDemo>
    </div>
    <FlvSupport/>
  </div>
)

render(ROOT, window.document.getElementById('react-body'));
