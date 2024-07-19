import { StyleSheet, Text, SafeAreaView, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useContext, createContext } from 'react'
import { Redirect, router } from 'expo-router';

const LoggedContext = createContext();
const LoggedProvider = ({children}) => {
  const [isLogged, setIsLogged] = useState(false);
    return (
      <LoggedContext.Provider
        value={{isLogged, setIsLogged}}>
        {children}
      </LoggedContext.Provider>
    );
}

const Index = () => {
  const { isLogged, setIsLogged } = useContext(LoggedContext);
  const [password, setPassword] = useState('');

  if(isLogged) return <Redirect href="/songView"/>

  function checkPassword() {
    if (password == "") setIsLogged(true)
    else { Alert.alert("złe hasło") }
  }

  return (
    <View style={{
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%'
    }}>
      <TextInput
        onChangeText={text => setPassword(text)}
        value={password}
        placeholder='hasło'
      >
      </TextInput>

      <TouchableOpacity onPress={checkPassword}>
        <Text>Zaloguj</Text>
      </TouchableOpacity>


      <TouchableOpacity onPress={() => { router.replace("home") }}>
        <Text>coś</Text>
      </TouchableOpacity>
    </View>
  )
}

const App = () => {
  return (
    <LoggedProvider>
      <Index></Index>
    </LoggedProvider>
  )
}

export default App

const styles = StyleSheet.create({})