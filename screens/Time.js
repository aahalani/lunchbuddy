import React, {useState} from 'react';
import {View, Button, SafeAreaView , StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { s } from "react-native-wind";
import { TouchableHighlight } from 'react-native-gesture-handler';
import { format } from 'date-fns';
import { auth } from '../firebase'
import {db} from '../firebase'
import { onSnapshot, snapshotEqual,doc, collection, setDoc, getDoc,query, where, getDocs, DocumentSnapshot, serverTimestamp } from 'firebase/firestore';
import { async } from '@firebase/util';
import dateGetter from '../lib/dateGetter';


export default function Time({navigation}) {
   const [mydate, setDate] = useState(new Date());
   const [mydate1, setDate1] = useState(new Date());
   const [displaymode, setMode] = useState('time');
   const [isDisplayDate, setShow] = useState(false);
   const [daySelected,setDaySelected] = useState("monday")
   const [availability, setAvailability] = useState({
    monday: { startTime: null, endTime: null },
    tuesday: { startTime: null, endTime: null },
    wednesday: { startTime: null, endTime: null },
    thursday: { startTime: null, endTime: null },
    friday: { startTime: null, endTime: null },
    saturday: { startTime: null, endTime: null },
    sunday: { startTime: null, endTime: null },
  });
  const [mondayTime,setmondayTime]=useState()
  const [tuedsayTime,settuedsayTime]=useState()
  const [wednesdayTime,setwednesdayTime]=useState()
  const [thursdayTime,setthursdayTime]=useState()
  const [fridayTime,setfridayTime]=useState()
  const [saturdayTime,setsaturdayTime]=useState()
  const [sundayTime,setsundayTime]=useState()

   const changeSelectedDate = (event, selectedDate) => {
      const currentDate = selectedDate ;
      setDate(currentDate);
   };
   const changeSelectedDate1 = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate1(currentDate);
 };
   const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
   };
   const displayTimepicker = () => {
      showMode('time');
   };
   function findCommonTime(start1, end1, start2, end2) {
    const [hour1, minute1] = start1.split(':');
    const [hour2, minute2] = end1.split(':');
    const [hour3, minute3] = start2.split(':');
    const [hour4, minute4] = end2.split(':');
    const date1 = new Date(0, 0, 0, hour1, minute1);
    const date2 = new Date(0, 0, 0, hour2, minute2);
    const date3 = new Date(0, 0, 0, hour3, minute3);
    const date4 = new Date(0, 0, 0, hour4, minute4);
    const maxStartTime = new Date(Math.max(date1, date3));
    const minEndTime = new Date(Math.min(date2, date4));
    if (maxStartTime >= minEndTime) {
      return null;
    }
    const startHour = maxStartTime.getHours();
    const startMinute = maxStartTime.getMinutes();
    const endHour = minEndTime.getHours();
    const endMinute = minEndTime.getMinutes();
    return `${startHour.toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')}-${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;
  }
  
    const dateExtractor=()=>{
    const formattedTime1 = format(mydate, 'HH:mm');
    const formattedTime2 = format(mydate1, 'HH:mm');
    console.log("time 1",formattedTime1)
    console.log(formattedTime2)
    const [hour1, minute1] = formattedTime1.split(':');
    const [hour2, minute2] = formattedTime2.split(':');
    const date1 = new Date(0, 0, 0, hour1, minute1);
    const date2 = new Date(0, 0, 0, hour2, minute2);
    
    if (date1<date2){
        console.log("day selected",daySelected)
        setAvailability(prevAvailability => ({
            ...prevAvailability,
            [daySelected]:{
                startTime: formattedTime1,
                endTime: formattedTime2,
              }
           
          }));
        if (daySelected==="monday"){
            setmondayTime(formattedTime1+" - "+formattedTime2)
        }
        if (daySelected==="tuesday"){
            settuedsayTime(formattedTime1+" - "+formattedTime2)
        }
        if (daySelected==="wednesday"){
            setwednesdayTime(formattedTime1+" - "+formattedTime2)
        }
        if (daySelected==="thursday"){
            setthursdayTime(formattedTime1+" - "+formattedTime2)
        }
        if (daySelected==="friday"){
            setfridayTime(formattedTime1+" - "+formattedTime2)
        }
        if (daySelected==="saturday"){
            setsaturdayTime(formattedTime1+" - "+formattedTime2)
        }
        if (daySelected==="sunday"){
            setsundayTime(formattedTime1+" - "+formattedTime2)
        }
    }
    else{
        console.log("Not valid date")
    }
    
   }
   console.log("time is: ",availability.monday.startTime)
   const user=auth.currentUser
   console.log(user.uid)
   const availableTimes = [];
   
    
   const incompleteForm=!mondayTime || !tuedsayTime || !wednesdayTime || !thursdayTime || !fridayTime || !saturdayTime || !sundayTime;
    //console.log(findCommonTime(availability.monday.startTime,availability.monday.endTime,availability.tuesday.startTime,availability.tuesday.endTime)); // Output: "10:00-11:00"
    const submitToGoogle = ()=>{
        
        console.log("Ok")
        console.log(availability)
        const matchRef = doc(db, "users", user.uid,"availableTime",user.uid);
        setDoc(matchRef, {
            availability,
            timestamp:serverTimestamp(),
            
        }).then(()=>{
            alert("Saved Successfully!")
            navigation.navigate("Home")
        });
        
}
const renderObjProperties = () => {
    const properties = [];

    for (const key in availableTimes) {
      if (availableTimes.hasOwnProperty(key)) {
        console.log(availableTimes[key])
      }
    }

    return properties;
  };
  const [newfounddata,setNewfounddata]=useState()
  const gotit = (item) => {
    console.log(item.userAvailableTimes.availability,item.userUid)
  }
  
async function getAllAvailableTimes() {
    // Fetch all users apart from the current user
    let unsub;
    unsub = onSnapshot(
          collection(db,"users"), 
          (snapshot) => {
        setNewfounddata(
          snapshot.docs
          .filter(doc => doc.id !== user.uid)
          .map(doc => (doc.id))
        )
      })
      console.log("unsub",newfounddata)
    const dataFetcherr = async(userid) => {
    const dataforcurrent = await getDocs(collection(db,'users',userid,'availableTime')).then(
        (snapshot) => snapshot.docs.map((doc)=> doc.data())
        )
    console.log(`Data for ${userid} is`,dataforcurrent[0].availability);
    dateGetter(user.uid,userid,dataforcurrent[0].availability)
    }
    newfounddata.map((data)=>(
        dataFetcherr(data)
    ))
    // const snapshot = await db.collection('users').get();
    
  
    // snapshot.forEach(userDoc => {
    //   const userUid = userDoc.id;
    //   const availableTimesDocRef = db.collection(`users/${userUid}/availableTime`).doc(userUid);
    //   availableTimesDocRef.get().then(availableTimeDoc => {
    //     if (availableTimeDoc.exists) {
    //       const userAvailableTimes = availableTimeDoc.data();
    //       console.log({ userUid, userAvailableTimes });
    //     } else {
    //       console.log(`No availableTime document found for user ${userUid}`);    
    //       return availableTimes;
    //     }
    //   }).catch(error => {
    //     console.error(`Error retrieving availableTime document for user ${userUid}: ${error}`);
    //   });
    //   console.log(availableTimes)
    //   availableTimes.map(gotit);  
    //   return availableTimes;
    // });
   
  }
  
 
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.week}>
        <TouchableHighlight
    style={styles.button}
    underlayColor='red'
    onPress={() => setDaySelected("monday")}>
    <Text style={{ color: '#ffffff', fontSize: 12, fontWeight: 'bold' }}>Monday</Text>
</TouchableHighlight>
<TouchableHighlight
    style={styles.button}
    underlayColor='red'
    onPress={() => setDaySelected("tuesday")}>
    <Text style={{ color: '#ffffff', fontSize: 12, fontWeight: 'bold' }}>Tuesday</Text>
</TouchableHighlight>
<TouchableHighlight
    style={styles.button}
    underlayColor='red'
    onPress={() => setDaySelected("wednesday")}>
    <Text style={{ color: '#ffffff', fontSize: 12, fontWeight: 'bold' }}>Wednesday</Text>
</TouchableHighlight>
<TouchableHighlight
    style={styles.button}
    underlayColor='red'
    onPress={() => setDaySelected("thursday")}>
    <Text style={{ color: '#ffffff', fontSize: 12, fontWeight: 'bold' }}>Thursday</Text>
</TouchableHighlight>
<TouchableHighlight
    style={styles.button}
    underlayColor='red'
    onPress={() => setDaySelected("friday")}>
    <Text style={{ color: '#ffffff', fontSize: 12, fontWeight: 'bold' }}>Friday</Text>
</TouchableHighlight>
<TouchableHighlight
    style={styles.button}
    underlayColor='red'
    onPress={() => setDaySelected("saturday")}>
    <Text style={{ color: '#ffffff', fontSize: 12, fontWeight: 'bold' }}>Saturday</Text>
</TouchableHighlight>
<TouchableHighlight
    style={styles.button}
    underlayColor='red'
    onPress={() => setDaySelected("sunday")}>
    <Text style={{ color: '#ffffff', fontSize: 12, fontWeight: 'bold' }}>Sunday</Text>
</TouchableHighlight>
</View>
<Text style={s`text-xl p-2 font-bold text-red-500`}>Selected day is {daySelected.toUpperCase()}</Text>
<Text style={s`text-xl pb-5`}>Select Available time: </Text>
<View style={styles.selector}>
    
            <DateTimePicker
               value={mydate}
               style={s`pl-10`}
               mode={"time"}
               is24Hour={true}
               display="default"
               onChange={changeSelectedDate}
            />
            <DateTimePicker
            style={s`pl-10`}
               value={mydate1}
               mode={"time"}
               is24Hour={true}
               display="default"
               onChange={changeSelectedDate1}
            />
         </View>
         
         <TouchableOpacity onPress={dateExtractor} style={styles.submitButton}>
  <Text style={styles.submitButtonText}>Submit</Text>
</TouchableOpacity>
<Text style={s`text-l mt-2`}>Selected time for Monday is: {mondayTime}</Text>
<Text style={s`text-l mt-2`}>Selected time for Tuesday is: {tuedsayTime}</Text>
<Text style={s`text-l mt-2`}>Selected time for Wednesday is: {wednesdayTime}</Text>
<Text style={s`text-l mt-2`}>Selected time for Thursday is: {thursdayTime}</Text>
<Text style={s`text-l mt-2`}>Selected time for Friday is: {fridayTime}</Text>
<Text style={s`text-l mt-2`}>Selected time for Saturday is: {saturdayTime}</Text>
<Text style={s`text-l mt-2`}>Selected time for Sunday is: {sundayTime}</Text>

<TouchableOpacity onPress={()=>{incompleteForm ? alert("Not done") : submitToGoogle()}} style={styles.submitButton1}>
  <Text style={styles.submitButtonText}>Submit All</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={()=>navigation.navigate("Tabs")} style={styles.submitButton1}>
  <Text style={styles.submitButtonText}>Go Back</Text>
  </TouchableOpacity>
      </SafeAreaView>
   );
};
const styles = StyleSheet.create({
   container: {
      alignItems: "center",
      justifyContent: "center"
   },
   button: {
    alignItems: 'center',
    backgroundColor: '#4267b2',
    padding: 8,
    marginTop:10,
    borderRadius:5,
},
selector:{
    position:"relative",
    left: "50%",
    transform: [
        { translateX: -1*Dimensions.get('window').width/1.08 },
  
      ],  
    flexDirection:"row",
},
week:{
    padding:10,
},  
submitButton: {
    backgroundColor: '#2196F3',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButton1: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
