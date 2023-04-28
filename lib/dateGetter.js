import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity,SafeAreaView,Dimensions } from 'react-native';
import { AntDesign, Entypo,Ionicons } from '@expo/vector-icons'; 
import { NativeScreenNavigationContainer } from 'react-native-screens';
import Swiper from 'react-native-deck-swiper';
import { s } from "react-native-wind";
import { auth } from '../firebase'
import {db} from '../firebase'
import { onSnapshot, snapshotEqual,doc, collection, setDoc, getDoc,query, where, getDocs, DocumentSnapshot, serverTimestamp } from 'firebase/firestore';
import { async } from '@firebase/util';
import generateIds from '../lib/generateIds';
import commonTime from '../lib/commonTime';

const dateGetter = async (userid,otheruserid) => {

    const user=auth.currentUser
    console.log("Logged in User is",userid)
    console.log("data is for user",otheruserid)
    const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const timesAvailable=[];
        const dataforcurrent = await getDocs(collection(db,'users',userid,'availableTime')).then(
            (snapshot) => snapshot.docs.map((doc)=> doc.data()))
        const data = await getDocs(collection(db,'users',otheruserid,'availableTime')).then(
                (snapshot) => snapshot.docs.map((doc)=> doc.data()))
            for (let i = 0; i < daysOfWeek.length; i++) {
                const key = daysOfWeek[i]
                if (key==="monday"){
                const common = commonTime(
                          dataforcurrent[0].availability.monday.startTime,
                          dataforcurrent[0].availability.monday.endTime,
                          data[0].availability.monday.startTime,
                          data[0].availability.monday.endTime
                        );
                
                if (common !== null){
                    timesAvailable.push(["monday",common])
                }
                }
                if (key==="tuesday"){
                const common = commonTime(
                          dataforcurrent[0].availability.tuesday.startTime,
                          dataforcurrent[0].availability.tuesday.endTime,
                          data[0].availability.tuesday.startTime,
                          data[0].availability.tuesday.endTime
                        );
                
                if (common !== null){
                    timesAvailable.push(["tuesday",common])
                }
                }
                if (key==="wednesday"){
                    const common = commonTime(
                              dataforcurrent[0].availability.wednesday.startTime,
                              dataforcurrent[0].availability.wednesday.endTime,
                              data[0].availability.wednesday.startTime,
                              data[0].availability.wednesday.endTime
                            );
                    
                    if (common !== null){
                        timesAvailable.push(["wednesday",common])
                    }
                    }
                if (key==="thursday"){
                    const common = commonTime(
                                dataforcurrent[0].availability.thursday.startTime,
                                dataforcurrent[0].availability.thursday.endTime,
                                data[0].availability.thursday.startTime,
                                data[0].availability.thursday.endTime
                            );
                        
                        if (common !== null){
                            timesAvailable.push(["thursday",common])
                        }
                        }
                if (key==="friday"){
                    const common = commonTime(
                                dataforcurrent[0].availability.friday.startTime,
                                dataforcurrent[0].availability.friday.endTime,
                                data[0].availability.friday.startTime,
                                data[0].availability.friday.endTime
                            );
                    
                    if (common !== null){
                        timesAvailable.push(["friday",common])     
                        }                   
                    }
                if (key==="saturday"){
                const common = commonTime(
                          dataforcurrent[0].availability.saturday.startTime,
                          dataforcurrent[0].availability.saturday.endTime,
                          data[0].availability.saturday.startTime,
                          data[0].availability.saturday.endTime
                        );
                
                if (common !== null){
                    timesAvailable.push(["saturday",common])
                }
                }
                if (key==="sunday"){
                    const common = commonTime(
                              dataforcurrent[0].availability.sunday.startTime,
                              dataforcurrent[0].availability.sunday.endTime,
                              data[0].availability.sunday.startTime,
                              data[0].availability.sunday.endTime
                            );
                if (common !== null){
                    timesAvailable.push(["sunday",common])
                }
                }

              
    }
    if (timesAvailable.length==0){
        return [];
    }
    else{
    const firestoreData = {
        available: timesAvailable.map(arr => ({
          day: arr[0],
          times: arr[1]
        }))
      };
      console.log("firestoreData",firestoreData)
      return firestoreData;
    }

}

export default dateGetter;