import React, { PureComponent } from 'react';
import { HOST } from './index';

export class HLS extends PureComponent {

  render() {
    return (
      <video autoPlay style={{ width: '100%' }}>
        <source src={`http://${HOST}:7002/live/movie.m3u8`}/>
      </video>
    )
  }
}
