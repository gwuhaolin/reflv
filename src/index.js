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
    /**
     * Indicates whether the data source is a **live stream**
     */
    isLive: PropTypes.bool,
    /**
     * Indicates whether to enable CORS for http fetching
     */
    cors: PropTypes.bool,
  }

  static defaultProps = {
    isLive: false,
    cors: false,
  }

  initFlv = ($video) => {
    if ($video) {
      const { url, type, isLive, cors } = this.props;
      if (flvjs.isSupported()) {
        let flvPlayer = flvjs.createPlayer({
          type,
          isLive,
          url,
          cors,
        });
        flvPlayer.attachMediaElement($video);
        flvPlayer.load();
        flvPlayer.play();
        this.flvPlayer = flvPlayer;
      }
    }
  }

  componentWillUnmount() {
    if (this.flvPlayer) {
      this.flvPlayer.unload();
      this.flvPlayer.detachMediaElement();
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
