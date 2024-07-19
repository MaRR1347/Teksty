import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useFonts } from 'expo-font'
import { SplashScreen } from 'expo-router'

// SplashScreen.preventAutoHideAsync();

export const SongTitle = ({children}) => {
    const [loaded, error] = useFonts({
        'Poppins-ExtraBold': require('../../assets/fonts/Poppins-ExtraBold.ttf')
    })
    useEffect(()=>{
      if(loaded||error) {
        SplashScreen.hideAsync();
      }
    }, [loaded, error]);

    if(!loaded && !error) return null;

  return (
      <Text style={{
        fontSize: 28,
        fontFamily: 'Poppins-ExtraBold',
        color: '#39A1FF'
      }}>{children}</Text>
  )
}