import React, { PureComponent } from 'react';
import { Reflv } from '../../src/index';

export class FLV extends PureComponent {

  render() {
    return (
      <Reflv
        url="http://127.0.0.1:8081/live/movie.flv"
        type="flv"
        isLive
        cors
      />
    )
  }
}
