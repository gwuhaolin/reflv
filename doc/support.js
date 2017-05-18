import React, { PureComponent } from 'react';
import flvjs from 'flv.js';
import { Table, Tag } from 'antd';

/**
 * FlvSupport
 */
export class FlvSupport extends PureComponent {

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { mseFlvPlayback, mseLiveFlvPlayback, networkStreamIO, networkLoaderName, nativeMP4H264Playback, nativeWebmVP8Playback, nativeWebmVP9Playback, } = flvjs.getFeatureList();
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: 'Support',
      dataIndex: 'support',
      key: 'support',
      render: (text) => {
        //noinspection EqualityComparisonWithCoercionJS
        if (typeof text === 'boolean' || text == null) {
          return text ? <Tag color="green">true</Tag> : <Tag color="red">false</Tag>;
        }
        return text;
      }
    }, {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    }];
    const dataSource = [
      {
        key: 'mseFlvPlayback',
        name: 'mseFlvPlayback',
        support: mseFlvPlayback,
        description: 'Same to flvjs.isSupported(), whether basic playback works on your browser.'
      },
      {
        key: 'mseLiveFlvPlayback',
        name: 'mseLiveFlvPlayback',
        support: mseLiveFlvPlayback,
        description: 'Whether HTTP FLV live stream can works on your browser.'
      },
      {
        key: 'networkStreamIO',
        name: 'networkStreamIO',
        support: networkStreamIO,
        description: 'Whether the network loader is streaming.'
      },
      {
        key: 'networkLoaderName',
        name: 'networkLoaderName',
        support: networkLoaderName,
        description: 'Indicates the network loader type name.'
      },
      {
        key: 'nativeMP4H264Playback',
        name: 'nativeMP4H264Playback',
        support: nativeMP4H264Playback,
        description: 'Whether your browser support H.264 MP4 video file natively.'
      },
      {
        key: 'nativeWebmVP8Playback',
        name: 'nativeWebmVP8Playback',
        support: nativeWebmVP8Playback,
        description: 'Whether your browser support WebM VP8 video file natively.'
      },
      {
        key: 'nativeWebmVP9Playback',
        name: 'nativeWebmVP9Playback',
        support: nativeWebmVP9Playback,
        description: 'Whether your browser support WebM VP9 video file natively.'
      },
    ];
    return (
      <div style={{ paddingBottom: '20px' }}>
        <h3>Supported flv.js feature list for your browser</h3>
        <Table size="small" pagination={false} dataSource={dataSource} columns={columns}/>
      </div>
    );
  }
}
