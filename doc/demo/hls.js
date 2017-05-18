import React, { PureComponent } from 'react';

export class HLS extends PureComponent {

  render() {
    return (
      <video autoPlay style={{ width: '100%' }}>
        <source src="http://2000.liveplay.myqcloud.com/live/2000_feceb63d176711e6b91fa4dcbef5e35a.m3u8"/>
      </video>
    )
  }
}
