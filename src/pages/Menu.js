import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function Menu({navigation}) {
  const artist = navigation.getParam('artist');

  return (
    <View style={styles.container}>
      <Text style={styles.artistName}>{navigation.getParam('artist')}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('Songs', {artist});
        }}>
        <Icon name="queue-music" size={50} color="#FFF" />
        <Text style={styles.textButton}>Songs</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('Collections', {artist});
        }}>
        <Icon name="collections" size={50} color="#FFF" />

        <Text style={styles.textButton}>Collections</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 80,
    width: 260,
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#931EFF',
    borderRadius: 5,
  },
  textButton: {
    marginLeft: 20,
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
  },

  artistName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#931EFF',
  },
});

export default Menu;
