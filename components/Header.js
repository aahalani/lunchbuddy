import { View, Text, Image } from 'react-native'
import React from 'react'
import {Foundation} from '@expo/vector-icons'
import { TailwindProvider } from 'tailwindcss-react-native'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {Ionicons} from '@expo/vector-icons'
import { s } from "react-native-wind";


const Header = ({title, photo, callEnabled}) => {
  const navigation=useNavigation();
  return (
    <View style={s`p-2 flex-row items-center justify-between`}>
      {photo ? (<View style={s`flex flex-row items-center`}>
        <TouchableOpacity onPress={()=> navigation.goBack()} style={s`p-2`}>
            <Ionicons name='chevron-back-outline' size={34} color="FF5864" />
        </TouchableOpacity>
        <View style={s`p-5`}>
          <Image 
      style={s`h-10 w-10 rounded-full absolute`} 
      source={{
        uri:photo,
      }} />
      </View>
      <Text style={s`text-2xl font-bold pl-5`}>{title}</Text>
      </View> ):(
        <View style={s`flex flex-row items-center`}>
        <TouchableOpacity onPress={()=> navigation.goBack()} style={s`p-2`}>
            <Ionicons name='chevron-back-outline' size={34} color="FF5864" />
        </TouchableOpacity>
      <Text style={s`text-2xl font-bold pl-3`}>{title}</Text>
      </View>
      ) }
      {callEnabled && (
        <TouchableOpacity style={s`rounded-full mr-4 p-3 bg-red-200`}>
          <Foundation style={s``} name="telephone" size={20} color="red" />
        </TouchableOpacity>
      )}
    </View>
    
  )
}

export default Header