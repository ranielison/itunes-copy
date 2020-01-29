import React, {useState} from 'react';
import {
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';

import logo from '../../assets/itunes.png';

function Main({navigation}) {
  const [artist, setArtist] = useState('');

  function nextPage() {
    navigation.navigate('Menu', {artist: artist});
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Image source={logo} style={styles.image} />

      <TextInput
        placeholder="Busque por um artista"
        placeholderTextColor="grey"
        style={styles.input}
        onChangeText={setArtist}
      />

      <TouchableOpacity onPress={nextPage} style={styles.button}>
        <Text style={styles.textButton}>Buscar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 84,
    width: 84,
  },

  input: {
    width: 280,
    height: 42,
    marginTop: 10,
    paddingHorizontal: 20,
    color: 'black',
    borderWidth: 2,
    borderColor: '#931EFF',
    borderRadius: 5,
  },

  button: {
    width: 280,
    height: 42,
    marginTop: 10,
    borderRadius: 5,

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#931EFF',
  },

  textButton: {
    color: '#FFF',
    fontSize: 18,
  },
});

export default Main;
