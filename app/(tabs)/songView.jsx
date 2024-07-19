import { View, Text } from 'react-native'
import React from 'react'
import SongsList from '../../components/SongsList'

const songView = () => {
  return (
    <View>
      <Text>songView</Text>
      <SongsList></SongsList>
    </View>
  )
}

export default songView