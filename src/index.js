import React, { Component } from 'react';
import PropTypes from 'prop-types';
import flvjs from 'flv.js';

/**
 * react component wrap flv.js
 */
export class Reflv extends Component {

  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    /**
     * Indicates media URL, can be starts with 'https(s)' or 'ws(s)' (WebSocket)
     */
    url: PropTypes.string,
    /**
     * Indicates media type, 'flv' or 'mp4'
     */
    type: PropTypes.oneOf(['flv', 'mp4']).isRequired,
  }

  initFlv = ($video) => {
    const { url, type } = this.props;
    if (flvjs.isSupported()) {
      let flvPlayer = flvjs.createPlayer({
        type: type,
        isLive: true,
        url,
      });
      flvPlayer.attachMediaElement($video);
      flvPlayer.load();
      flvPlayer.play();
      this.flvPlayer = flvPlayer;
    }
  }

  render() {
    const { className, style } = this.props;
    return (
      <video
        className={className}
        style={Object.assign({
          width: '100%',
        }, style)}
        ref={this.initFlv}
      />
    )
  }
}
