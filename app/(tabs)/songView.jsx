import { View, Text, FlatList, TouchableOpacity, StyleSheet, DevSettings, Dimensions, useWindowDimensions } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Filesystem from "expo-file-system";

const songView = () => {
  const [songsList, setSongsList] = useState("");
  const [currentSong, setCurrentSong] = useState("");
  const [songContent, setSongContent] = useState("")
  const fileDir = Filesystem.documentDirectory + "songs/"
  const deviceWidth = useWindowDimensions().width
  const deviceHeight = useWindowDimensions().height;

  Filesystem.readDirectoryAsync(fileDir)
    .then((res) => { setSongsList(res.sort()) })

  if (currentSong != "") {
    Filesystem.readAsStringAsync(fileDir + currentSong)
      .then((res) => { setSongContent(res) })
  }

  return (
    <SafeAreaView>
      <View style={styles.quickList}>
        <FlatList
          data={songsList}
          renderItem={({ item }) => (<TouchableOpacity onPress={() => { setCurrentSong(item) }}><Text>{item}</Text></TouchableOpacity>)} //DODAĆ funkcję w customowym przycisku i zobaczyć rpzez onpress={this.funkcja} czy zadziała
          keyExtractor={(item) => item}
        />
      </View>

      <TouchableOpacity onPress={() => { console.log(currentSong) }}><Text>pokaż</Text></TouchableOpacity>

      <View style={{
        height: 300,
        overflow: "scroll"
      }}>
        <Text>
          {songContent != "" ? songContent : "Wybierz piosenkę"}
        </Text>
      </View>
    </SafeAreaView>
  )
}

export default songView;

const styles = StyleSheet.create({
  quickList: {
    borderWidth: 1,
    height: 400
  },
  songContent: {
    height: 1000
  }
})