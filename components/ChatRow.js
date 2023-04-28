import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useEffect,useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { auth, db } from '../firebase'
import { s } from "react-native-wind";
import getMatchedUserInfo from '../lib/getMatchedUserInfo'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'

const ChatRow = ({matchDetails}) => {
    const user=auth.currentUser
    /*const [matchedUserInfo,setMatchedUserInfo]=useState(null);*/
    const matchedUserInfo = getMatchedUserInfo(matchDetails.users,user.uid);
    const [lastMessage,setLastMessage]=useState("");
    const navigation=useNavigation();
    console.log("newMatchDetails",getMatchedUserInfo(matchDetails.users,user.uid).photoURL)
    console.log("matchedUserInfo",matchedUserInfo)
    useEffect(()=> onSnapshot(query(collection(db,"matches",matchDetails.id, "messages"),
    orderBy('timestamp','desc')),
    snapshot => setLastMessage(snapshot.docs[0]?.data()?.message),
    )
    ,[matchDetails,db])
  return (
    <TouchableOpacity 
    onPress={()=>{
        navigation.navigate("Messages",{
            matchDetails,
        })
    }}
    style={s`flex-row items-center py-3 px-5 bg-white mx-3 my-1 rounded-lg`}>
        <Image 
        style={[s`rounded-full h-16 w-16 mr-4`,styles.cardShadow]}
        source={{uri:matchedUserInfo?.photoURL}}
        />
        <View>
            <Text style={s`text-lg font-semibold`}>
                {matchedUserInfo?.displayName}
            </Text>
            <Text>
                {lastMessage || "Say Hi!"}
            </Text>
        </View>
    </TouchableOpacity>
  )
}

export default ChatRow;

const styles=StyleSheet.create({
    cardShadow: {
        shadowColor:"#000",
        shadowOffset:{
            width:0,
            height:1
        },
        shadowOpacity:0.2,
        shadowRadius:1.41,
        elevation:2
    }
})