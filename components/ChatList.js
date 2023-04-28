import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { s } from "react-native-wind";
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import {db} from '../firebase'
import { auth } from '../firebase'
import { FlatList } from 'react-native-gesture-handler';
import ChatRow from './ChatRow';

const ChatList = () => {
    const user=auth.currentUser
    const [matches,setMatches]=useState([]);

    useEffect(()=>
        onSnapshot(query(collection(db,'matches'), where('userMatched','array-contains',user.uid)),
        snapshot => setMatches(snapshot.docs.map(doc => ({
            id:doc.id,
            ...doc.data(),
        }))))
    ,[user])
    console.log("matches",matches)
  return matches.length > 0 ? (
    <FlatList 
    style={s`h-full`}
    data={matches}
    keyExtractor={item => item.id}
    renderItem={({item})=> <ChatRow matchDetails={item} />}
    />
    ): (
        <View style={s`p-5`}>
            <Text style={s`text-center text-lg`}>No Matches at the Moment 😔 </Text>
        </View>
    )
}

export default ChatList