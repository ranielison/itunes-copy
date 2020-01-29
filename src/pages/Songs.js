import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import api from '../api';
import SoundPlayer from 'react-native-sound-player';
import Icon from 'react-native-vector-icons/MaterialIcons';

function Songs({navigation, current}) {
  const [songs, setSongs] = useState([]);
  const [trackid, setTrackid] = useState(0);
  const [playing, setPlaying] = useState(false);
  const artist = navigation.getParam('artist');

  useEffect(() => {
    async function loadSongs() {
      const response = await api.get('/search?', {
        params: {
          term: artist,
          entity: 'song',
          limit: 10,
        },
      });
      console.log(response.data.results);
      setSongs(response.data.results);
    }

    loadSongs();
  }, [artist]);

  useEffect(() => {
    const _onFinishedPlayingSubscription = SoundPlayer.addEventListener(
      'FinishedPlaying',
      ({success}) => {
        setPlaying(false);
        setTrackid(0);
      },
    );
  }, []);

  useEffect(() => {
    return () => {
      if (playing) {
        SoundPlayer.stop();
      }
    };
  }, [playing]);

  function playMuscic(url_music, track) {
    if (playing) {
      SoundPlayer.stop();
      setPlaying(false);
    }
    if (playing && trackid == track) {
      return;
    }
    try {
      SoundPlayer.playUrl(url_music);
      setPlaying(true);
      setTrackid(track);
    } catch (e) {
      console.log('cannot play the sound file', e);
    }
  }

  function ItemSong(item) {
    return (
      <View style={styles.itemSong}>
        <TouchableOpacity
          style={styles.player}
          onPress={() => playMuscic(item.item.previewUrl, item.item.trackId)}>
          {playing && item.item.trackId == trackid ? (
            <Icon name="pause" size={50} color="#931EFF" />
          ) : (
            <Icon name="play-circle-filled" size={50} color="#931EFF" />
          )}
        </TouchableOpacity>
        <View>
          <Text style={styles.nameMusic} numberOfLines={1} ellipsizeMode="tail">
            {item.item.trackName}
          </Text>
          <View style={styles.album}>
            <Icon name="album" size={20} color="grey" />
            <Text
              style={styles.nameCollection}
              numberOfLines={1}
              ellipsizeMode="tail">
              {item.item.collectionName}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={songs}
        renderItem={ItemSong}
        keyExtractor={item => String(item.trackId)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },

  itemSong: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 20,
    height: 72,
    marginTop: 2,
    backgroundColor: '#ededed',
  },

  player: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },

  nameMusic: {
    width: 260,
    fontSize: 18,
    fontWeight: 'bold',
  },

  nameCollection: {
    width: 260,
    marginLeft: 5,
    fontSize: 14,
  },

  album: {
    flexDirection: 'row',
  },
});

export default Songs;
