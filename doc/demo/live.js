import React, { PureComponent } from 'react';
import { Reflv } from '../../src/index';

export class Live extends PureComponent {

  render() {
    return (
      <Reflv
        url="http://2000.liveplay.myqcloud.com/live/2000_feceb63d176711e6b91fa4dcbef5e35a.flv"
        type="flv"
        isLive
        cors
      />
    )
  }
}
