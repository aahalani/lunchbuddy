import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { users } from '../firebase'
import {db} from '../firebase'
import { serverTimestamp, setDoc,doc } from 'firebase/firestore'

const updateUserProfile = () => {
  setDoc(doc(db,'userss',user.id),{
    id: user.id,
    displayName: user.displayName,
    photoURL: image,
    age:age,
    timestamp: serverTimestamp()
  })
}

const Home1 = () => {
  users
  .get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      if (doc && doc.exists) {
        console.log(doc.data().name);
        
      }
  });
  
});

users
  .doc('JKz2OP70wcjMjUFVn3wu')
  .update({
    age: 35,
    timestamp: serverTimestamp,
  })
  .then(() => {
    console.log('User updated!');
  });
  return (
    <SafeAreaView>
      <Text>Home1</Text>
     
    </SafeAreaView>
  )
}

export default Home1