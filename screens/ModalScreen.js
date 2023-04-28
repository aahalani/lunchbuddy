import { View, Text, Image,TextInput, TouchableOpacity,StyleSheet,Button} from 'react-native'
import React , {useState}from 'react'
import { TailwindProvider } from 'tailwindcss-react-native';
import { auth } from '../firebase'
import { users } from '../firebase'
import {db} from '../firebase'
import { serverTimestamp, setDoc,doc,collection,addDoc,updateDoc } from 'firebase/firestore'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Time from './Time';
import { s } from "react-native-wind";
import App from '../App';

const ModalScreen = ({navigation}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };
  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (time) => {
    console.warn("A date has been picked: ", time);
    const dt=new Date(time);
    const x=dt.toLocaleTimeString()
    console.log(x)
    hideDatePicker();
  };

    const [image,setImage]=useState(null);
    const [job,setJob]=useState(null);
    const [age,setAge]=useState(null);
    const incompleteForm=!image || !job || !age;
    const user=auth.currentUser
    console.log(user.uid)
    console.log(user.displayName)
    console.log(image)
    console.log(age)
    console.log(serverTimestamp())
    const new1 = () => {
      users
      .doc("c8drQzrqLVbVTb4p2RjczKWuZEl2")
      .add(({
        doc:"c8drQzrqLVbVTb4p2RjczKWuZEl2"
      }))
    }
    const updateUserProfile = () => {
      if (!incompleteForm){
      const frankDocRef = doc(db, "users", user.uid);
      setDoc(frankDocRef, {
          id:user.uid,
          displayName:user.displayName,
          photoURL:image,
          job:job,
          age:age,
          timestamp:serverTimestamp()
      }).then(()=>{
        navigation.navigate("Tabs")
      });
      
    }
  }

    
    
  return (
    <TailwindProvider>
    <View style={s`flex-1 items-center pt-10 mt-10`}>
      <Image style={s`h-15 w-full`} 
      resizeMode="contain"
      source={require('../assets/logo.png')}
      />
      <Text style={s`text-xl text-gray-500 p-9 font-bold`}>
        
      Welcome {auth.currentUser?.displayName}
      </Text>
      <Text style={s`text-center text-red-400 p-2 font-bold`}>
        Step 1: Enter Profile Pic URL
      </Text>
      <TextInput  
      value={image}
      onChangeText={text => setImage(text)}
      style={s`text-center text-xl pb-2`}
      placeholder='Enter the profile Pic URL'
      autoCapitalize='none'

      />
      <Text style={s`text-center text-red-400 p-2 font-bold`}>
        Step 2: Enter your Tagline 
      </Text>
      <TextInput  
        value={job}
        onChangeText={text => setJob(text)}
      style={s`text-center text-xl pb-2`}
      placeholder='Enter your Bio'
      />
      <Text style={s`text-center text-red-400 p-2 font-bold`}>
        Step 3: Enter your Age 
      </Text>
      <TextInput 
      value={age}
      onChangeText={text => setAge(text)} 
      style={s`text-center text-xl pb-2`}
      placeholder='Enter your age'
      maxLength={2}
      keyboardType="numeric"
      />
      
      <TouchableOpacity 
      style={[s`w-64 p-3 rounded-xl bg-black`,incompleteForm ? styles.disable : null]}
      onPress={updateUserProfile}
      >
        <Text style={s`text-center text-white text-xl`}>Update Profile</Text>
      </TouchableOpacity>
      <Text style={s`text-center text-red-400 pt-10 font-bold`}>
        Step 4: Enter your Available time  
      </Text>
      <TouchableOpacity style={s`w-64 p-3 rounded-xl bg-black mt-5`} onPress={()=>{navigation.navigate("Time")}}>
        <Text style={s`text-center text-white text-xl`}>Set Available Time</Text>
      </TouchableOpacity>
    </View>
    </TailwindProvider>
  )
}

const styles = StyleSheet.create({
    disable:{
        backgroundColor:"gray"
    }
})
export default ModalScreen;