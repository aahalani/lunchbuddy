import { View, Text } from 'react-native'
import React from 'react'
import { s } from "react-native-wind";

const SenderMessage = ({message}) => {
  return (
    <View
    style={[s`bg-blue-400 rounded-lg rounded-tr-none px-5 py-3 mx-3 my-2`,
    {alignSelf:'flex-start',marginLeft:'auto'},]}
    >
    <Text style={s`text-white`}>
        {message.message}
    </Text>
    </View>
  )
}

export default SenderMessage