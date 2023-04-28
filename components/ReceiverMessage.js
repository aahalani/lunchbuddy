import { View, Text, Image } from 'react-native'
import React from 'react'
import { s } from "react-native-wind";

const ReceiverMessage = ({message}) => {
  return (
    <View
    style={[s`bg-purple-400 rounded-lg rounded-tl-none px-5 py-3 mx-3 my-2`,{alignSelf:"flex-start"}]}>
      
      <Text style={s`text-white`}>
      {message.message}
      </Text>
    </View>
  )
}

export default ReceiverMessage