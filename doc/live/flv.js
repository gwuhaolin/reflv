import React, { PureComponent } from 'react';
import { Reflv } from '../../src/index';
import { HOST } from './index';

export class FLV extends PureComponent {

  render() {
    return (
      <Reflv
        url={`http://${HOST}:7001/live/movie.flv`}
        type="flv"
        isLive
        cors
      />
    )
  }
}
