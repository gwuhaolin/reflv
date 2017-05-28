import React, { PureComponent } from 'react';
import swfobject from 'swfobject';
import player from './player.swf';

window.rtmpPlayerHandleEmit = function (event) {
  switch (event.kind) {
    case "connect":
    case "disconnect":
    case "publish":
    case "status":
    case "error":
      rtmpPlayerLog("got event", event)
      break
    default:
      rtmpPlayerLog(event)
  }
}

window.rtmpPlayerLog = function (log) {
  console.info('rtmp-player', log);
}

export class RTMP extends PureComponent {

  componentDidMount() {
    const swfVersionStr = "11.4.0"
      , xiSwfUrlStr = "playerProductInstall.swf"
      , flashvars = {}
      , params = {}
      , attributes = {}

    params.allowscriptaccess = "sameDomain"
    params.allowfullscreen = "true"
    attributes.id = "rtmp-player"
    attributes.name = "rtmp-player"
    attributes.align = "middle"
    swfobject.embedSWF(
      player, "rtmp-player", "1000", "500",
      swfVersionStr, xiSwfUrlStr,
      flashvars, params, attributes,
      function (embedEvent) {
        if (embedEvent.success) {
          // need to wait a bit until initialization finishes
          setTimeout(function () {
            embedEvent.ref.setOptions({
                jsLogFunction: "rtmpPlayerLog",
                jsEmitFunction: "rtmpPlayerHandleEmit",
                serverURL: "rtmp://localhost/live",
                streamName: "movie"
              }
            );
            embedEvent.ref.play();
          }, 3000);
        }
      }
    )
  }

  render() {
    return (
      <div id="rtmp-player"/>
    )
  }
}
