/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
'use strict';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import CameraRoll, { saveToCameraRoll } from '@react-native-community/cameraroll';

export default class Camera extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions="Need Permission To Access Camera"
        />
        {/* <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style={styles.capture}>
            <Text style={{fontSize: 14}}> SNAP </Text>
          </TouchableOpacity>
        </View> */}
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
            onPressIn={this.beginRec.bind(this)}
            onPressOut={this.stopRec.bind(this)}
            style={styles.capture}>
            <Text style={{fontSize: 14}}> RECORD </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  takePicture = async () => {
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
      CameraRoll.saveToCameraRoll(data.uri);
    }
  };

  beginRec = async () => {
    if (this.camera) {
      try {
        const options = {
          quality: 0.5,
          videoBitrate: 8000000,
          maxDuration: 30,
        };
        const promise = this.camera.recordAsync(options);
        if (promise) {
          this.setState({recording: true});
          const data = await promise;
          console.log(data.uri);
          CameraRoll.saveToCameraRoll(data.uri, 'video');
          this.setState({recording: false});
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  //stop the recording by below method
  stopRec = async () => {
    await this.camera.stopRecording();
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
