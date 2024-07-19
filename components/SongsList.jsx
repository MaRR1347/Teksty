import { View, Text, FlatList, TouchableOp, TouchableOpacityacity } from 'react-native';
import React, { useState } from 'react';
import * as Filesystem from 'expo-file-system';
import { SafeAreaView } from 'react-native-safe-area-context';

const SongsList = () => {
  const [songsList, setSongsList] = useState("");
  const [currentSong, setCurrentSong] = useState("");
  const fileDir = Filesystem.documentDirectory + "songs/"

  Filesystem.readDirectoryAsync(fileDir)
    .then((el) => { setSongsList(el.sort()) })

  return (
    <SafeAreaView>
      <View 
      style={{
        borderWidth: 1,
        height: 400,

      }}
      >
        <FlatList
          data={songsList}
          renderItem={({ item }) => (<Text>{item}</Text>)}
          keyExtractor={(item) => item}
        />
      </View>


      <Text>
      </Text>
    </SafeAreaView>
  )
}

export default SongsList;