/*


----------------------------------------------------------

              THIS PART IS NOT WORKING PERFECTLY

-----------------------------------------------------------


*/


import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { TailwindProvider } from 'tailwindcss-react-native';
import { s } from "react-native-wind";

const MatchedScreen = () => {
  const navigation = useNavigation();
  const {params} = useRoute();
  const {loggedInProfile,userSwiped}=params;
  return (
   
    <View className="h-full bg-red-500 pt-20" style={styles.view}>
      <View className="justify-center px-10 pt-20">
        <Image 
        style={s`h-20 w-full`}
        source={{uri: "https://links.papareact.com/mg9"}}/>
      </View>
      <Text className="text-white text-center mt-5">
        You and {userSwiped.displayName} have liked each other
      </Text>
{/*
      <View className="flex-row justify-evenly mt-5">
        <Image 
        className="h-32 w-32 rounded-full"
        source={{uri:loggedInProfile.photoURL}}
        />
        <Image 
        className="h-32 w-32 rounded-full"
        source={{uri:userSwiped.photoURL}}
        />
      </View>

  */ } 
      <TouchableOpacity className="bg-white m-5 px-10 py-8rounded-full mt-20"
      onPress={()=>{
        navigation.goBack();
        navigation.navigate("Chat")
      }}>
        <Text className="text-center">Send a message</Text>
      </TouchableOpacity>
    </View>
  )
}

export default MatchedScreen

const styles = StyleSheet.create({
  view:{
    opacity:0.89
  }
})