import React, { PureComponent } from 'react';

export class HLS extends PureComponent {

  render() {
    return (
      <video autoPlay style={{ width: '100%' }}>
        <source src="http://127.0.0.1:8082/live/movie.m3u8"/>
      </video>
    )
  }
}
