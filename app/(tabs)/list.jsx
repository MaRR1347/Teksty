import { Alert, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import { Link, router } from 'expo-router';
import Config, { databases } from '../../lib/appwrite';
import { Query } from 'react-native-appwrite';
// import WebView from 'react-native-webview';

// import Update from '../../lib/updateSongs';

// const Frame = props => {
//   const songStyles = `<head><style>
//     .chorus {
//       color: #F00;
//     }
//   </style>
//   </head><body>`;
//   return (
//     <WebView
//       style={styles.container}
//       originWhitelist={['*']}
//       source={{ html: songStyles + props.content + '</body>' }}
//     />
//   )
// }

const List = () => {
  const [file, setFile] = useState("");
  const [files, setFiles] = useState("");
  const [songsList, setSongsList] = useState("")
  const [isListUpdated, setIsListUpdated] = useState("")
  const fileDir = FileSystem.documentDirectory + 'songs/';

  let songData = JSON.stringify(files).split(',').map((el) => (el.replace("\"", "").replace(".txt\"", "")));


  async function updateSongsFiles() {
    //wyciąga listę piosenek z bazy danych
    databases.listDocuments(
      Config.databaseId,
      Config.songCollectionId,
      [Query.limit(100)])
      .then((zapyt) => { setSongsList(zapyt.documents) }, (error) => { console.log(error) });

    //rozpoczęcie pobierania każdej po kolei
    for (let i = 0; i < songsList.length; i++) {
      FileSystem.downloadAsync(songsList[i].fileUrl, fileDir + songsList[i].file)
        .then((res) => { setIsListUpdated("Zakończono pobieranie " + songsList[i].title) }, (error) => { console.log(error) });
    }
  }


  //Odczytywanie piosenki
  // FileSystem.readAsStringAsync(FileSystem.documentDirectory + 'songs/Filmowa miłość.txt')
  //   .then((lol) => { setFile(lol) }, (error) => { console.log(error) })

  //Odczytywanie lokalizacji
  FileSystem.readDirectoryAsync(FileSystem.documentDirectory + 'songs/')
    .then((lol) => { setFiles(lol) }, (error) => { console.log(error) });


  function download() {
    FileSystem.downloadAsync('https://cloud.appwrite.io/v1/storage/buckets/667d57cc0025225c019f/files/668d0184001006de7479/view?project=667d4fd2003c3bb228b2&mode=admin', FileSystem.documentDirectory + 'songs/granica.txt')
      .then((uri) => {
        console.log("Zakończono pobieranie " + uri)
      })
      .catch(error => { console.error(error) })
  }

  // async function AddFile() {
  //   const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
  //   if (permissions.granted) {
  //     const uri = permissions.directoryUri;

  //     const files = await StorageAccessFramework.readDirectoryAsync(uri);
  //     alert(`Files inside ${uri}:\n\n${JSON.stringify(files)}`);
  //   }
  // }

  const addDirectory = () => {
    FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'songs')
      .then(lol => { console.log("dodano folder ") }, error => { console.log(error) })
  }
  const addFile = () => {
    FileSystem.writeAsStringAsync(FileSystem.documentDirectory + "songs/song", `
<input type="text" class="title" value="Granica">
<section class="songContent">
<code class="key">F-dur-przyg dete</code><code class="chords">F d B C F</code>           
            <code class="verse">O Tobie miła ciągle marzę<br>O Tobie miła ciągle śnię<br>Chciałbym całować usta Twoje<br>I czule szeptać: „Kocham cię"</code><code class="chords">F d B C F</code>                       
            <code class="chorus">Bo wielka dzieli nas granica<br>Boś ty bogatą przecież jest<br>Ja jestem tylko zwykłym grajkiem<br>I jest mi w życiu bardzo źle</code>
</section>`)
      .then(() => { console.log("dodano plik") }, error => { console.log(error) })
  }
  function usun() {
    FileSystem.deleteAsync(FileSystem.documentDirectory + 'songs')
      .then((lol) => { console.log("usunięto folder " + lol) }, error => { console.log(error) })
  }
  function refresh() {
    router.replace("/");
  }

  return (
    <>
      <SafeAreaView>

        <TouchableOpacity onPress={addDirectory} style={styles.pad}>
          <Text>Dodaj folder</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={addFile} style={styles.pad}>
          <Text>Dodaj plik</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={usun} style={styles.pad}>
          <Text>Usuń</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={download} style={styles.pad}>
          <Text>Pobierz</Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={refresh}>
          <Text>odśwież</Text>
        </TouchableOpacity>


        <Link href="/home">Do HOME</Link>

        <TouchableOpacity onPress={updateSongsFiles}>
          <Text>Updateuj</Text>
        </TouchableOpacity>

        {/* <Text>{files}</Text> */}

        {/* <Text>{JSON.stringify(files).split(',').map((el)=>(el.replace("\"", "").replace(".txt\"", ""))).join("\n")}</Text> */}

        <View style={{overflow: 'scroll', height: 'auto'}}>
          <Text>Znaleziono {songData.length} piosenek</Text>
          <FlatList
            style={{
              flexDirection: "column",
              flexWrap: "wrap"
            }}
            data={songData}
            renderItem={({ item, index }) => (<Text>{index}. {item}</Text>)}
            keyExtractor={(item) => item}
          />
        </View>
      

        {/* <Text>{file}</Text> */}

        <Text>{isListUpdated}</Text>



      </SafeAreaView>
      {/* <Frame content={file} /> */}
    </>
  )
}

export default List

const styles = StyleSheet.create({
  pad: {
    paddingVertical: 10,
  },
  web: {
    flex: 1,
    marginTop: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: 360,
    height: 100
  }
})