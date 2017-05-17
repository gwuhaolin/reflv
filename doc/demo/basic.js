import React, { PureComponent } from 'react';
import { Reflv } from '../../src/index';
import demo from './demo.flv';

export class Basic extends PureComponent {

  render() {
    return (
      <Reflv url={demo} type="flv"/>
    )
  }
}
