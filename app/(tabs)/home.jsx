import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
// import WebView from 'react-native-webview';

const Home = () => {
  return (
    <>
      <SafeAreaView>
        <Link href="./list">OPCJE</Link>
        <Link href="./songView">PIOSENKA</Link>
      </SafeAreaView>
      {/* <WebView
        style={styles.container}
        originWhitelist={['*']}
        source={{ html: '<h1>LOL</h1>' }}
      /> */}
    </>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: 360,
    height: 100
  }

})


//SPRAWDZIĆ CZY STYLOWANIE Z .CSS DZIAŁA