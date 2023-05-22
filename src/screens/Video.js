import React from 'react';
import {StyleSheet, Text, ScrollView} from 'react-native';
import { ViewContainer } from '../components/ViewContainer';
import VideoPlayer from '../components/video-player';

export const VideoScreen = () => {

  return (
    <ViewContainer>
      {/* <Text style={{fontSize: 32, color: 'red'}}>Videos Screen</Text> */}
      {/* <ScrollView> */}
        <VideoPlayer />
      {/* </ScrollView> */}
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
});

export default VideoScreen;