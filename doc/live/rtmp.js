import React, { PureComponent } from 'react';
import swfobject from 'swfobject';
import player from './player.swf';

export class RTMP extends PureComponent {

  componentDidMount() {
    const soFlashVars = {
      src: 'rtmp://localhost/live/movie',
      streamType: 'live',
      autoPlay: "true",
      controlBarAutoHide: "true",
      controlBarPosition: "bottom"
    };
    const swfVersionStr = "10.3.0";
    const xiSwfUrlStr = "swfs/playerProductInstall.swf";
    const params = {
      quality: 'high',
      allowscriptaccess: 'sameDomain',
    };
    swfobject.embedSWF(player, 'rtmp-player', "968", "549", swfVersionStr, xiSwfUrlStr, soFlashVars, params);
  }

  render() {
    return (
      <div id="rtmp-player"/>
    )
  }
}
