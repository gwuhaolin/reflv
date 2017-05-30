import React, { PureComponent } from 'react';
import swfobject from 'swfobject';
import player from './player.swf';
import { HOST } from './index';

const ID = 'rtmp-player';

export class RTMP extends PureComponent {

  componentDidMount() {
    const soFlashVars = {
      src: `rtmp://${HOST}:1935/live/movie`,
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
    swfobject.embedSWF(player, ID, "968", "549", swfVersionStr, xiSwfUrlStr, soFlashVars, params);
  }

  componentWillUnmount() {
    swfobject.removeSWF(ID);
  }

  render() {
    return (
      <div>
        <object id={ID}/>
      </div>
    )
  }
}
