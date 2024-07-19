import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'

const HomeBttn = () => {
    return (
        <TouchableOpacity onPress={()=>(<Redirect href="../home"/>)}>
            <Text></Text>
        </TouchableOpacity>
    )
}

export default HomeBttn