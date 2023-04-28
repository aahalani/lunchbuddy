import { View, Text, Button, KeyboardAvoidingView, Keyboard, FlatList, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { SafeAreaView } from 'react-native-safe-area-context'
import getMatchedUserInfo from '../lib/getMatchedUserInfo'
import { auth, db } from '../firebase'
import { useRoute } from '@react-navigation/native'
import { s } from "react-native-wind";
import { TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import SenderMessage from '../components/SenderMessage'
import ReceiverMessage from '../components/ReceiverMessage'
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'

const Messages = () => {
    const user=auth.currentUser
    const {params}=useRoute();
    const {matchDetails}=params;
    const [input,setInput]=useState("");
    const [messages,setMessages]=useState([]);

    useEffect(()=>onSnapshot(query(collection(db,"matches",matchDetails.id,"messages"),
      orderBy('timestamp','desc')
      ), snapshot => setMessages(snapshot.docs.map(doc => ({
        id:doc.id,
        ...doc.data()
      })))
      )
    ,[matchDetails,db])

    const sendMessage= () => {
      input?(
      addDoc(collection(db,"matches",matchDetails.id, "messages"),{
        timestamp:serverTimestamp(),
        userId:user.uid,
        displayName:user.displayName,
        photoURL: matchDetails.users[user.uid].photoURL,
        message:input
      }),
      setInput("")
      ):
      (setInput(""))
     
    }
  return (
    <SafeAreaView
    style={s`flex-1`}
    >
        <Header title={getMatchedUserInfo(matchDetails.users,user.uid).displayName} photo={getMatchedUserInfo(matchDetails.users,user.uid).photoURL}callEnabled />
        
        <KeyboardAvoidingView
        behavior={Platform.OS==="ios"?"padding":"height"}
        style={s`flex-1 mb-12`}
        keyboardVerticalOffset={60}
        >

        <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        >
          <FlatList
          inverted={-1}
          data={messages}
          style={s`pl-4`}
          keyExtractor={item => item.id}
          renderItem={({item:message}) => 
            message.userId === user.uid ? (
              <SenderMessage key={message.id} message={message} />
            ) : (
              <ReceiverMessage key={message.id} message={message} />
            )
        }
          />
        </TouchableWithoutFeedback>  
        
        </KeyboardAvoidingView>
        <View
        style={s`flex-row justify-between items-center border-t border-gray-200 px-5 py-2`}
        >
            <TextInput 
            style={s`h-10 text-lg`}
            placeholder="Send Message.."
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            value={input}
            />
            <Button 
            onPress={sendMessage}
            title='Send'
            color='#9E2D0B'
            />
        </View>
    </SafeAreaView>
  )
}

export default Messages