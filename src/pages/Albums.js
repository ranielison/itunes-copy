import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import api from '../api';
import Icon from 'react-native-vector-icons/MaterialIcons';

function Albums({navigation}) {
  const [collections, setCollections] = useState([]);
  const artist = navigation.getParam('artist');

  useEffect(() => {
    async function loadSongs() {
      const response = await api.get('/search?', {
        params: {
          term: artist,
          entity: 'album',
          limit: 10,
        },
      });
      console.log(response.data.results);
      setCollections(response.data.results);
    }

    loadSongs();
  }, [artist]);

  function ItemCollection(item) {
    return (
      <View style={styles.itemCollection}>
        <TouchableOpacity
          style={styles.image}
          onPress={() =>
            navigation.navigate('WebPage', {
              url: item.item.collectionViewUrl,
            })
          }>
          <Image style={styles.image} source={{uri: item.item.artworkUrl100}} />
        </TouchableOpacity>
        <View style={styles.content}>
          <Text
            style={styles.nameCollection}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item.item.collectionName}
          </Text>
          <View style={styles.details}>
            <Text
              style={styles.collectionPrice}
              numberOfLines={1}
              ellipsizeMode="tail">
              $ {item.item.collectionPrice}
            </Text>

            <View style={styles.details}>
              <Icon name="music-note" size={20} color="grey" />
              <Text>{item.item.trackCount}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={collections}
        renderItem={ItemCollection}
        keyExtractor={item => String(item.collectionId)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },

  content: {
    flexDirection: 'column',
  },

  itemCollection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 20,
    height: 72,
    marginTop: 2,
    backgroundColor: '#ededed',
  },

  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },

  nameCollection: {
    width: 260,
    fontSize: 18,
    fontWeight: 'bold',
  },

  collectionPrice: {
    fontSize: 16,
    color: 'grey',
    marginRight: 14,
  },

  collectionCount: {
    fontSize: 16,
    color: 'grey',
  },

  details: {
    flexDirection: 'row',
  },
});

export default Albums;
