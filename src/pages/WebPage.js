import React from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';

function WebPage({navigation}) {
  const url = navigation.getParam('url');
  return <WebView source={{uri: url}} style={{marginTop: 20}} />;
}

export default WebPage;
