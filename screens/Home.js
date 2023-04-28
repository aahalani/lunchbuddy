import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity,SafeAreaView,Dimensions,FlatList } from 'react-native';
import { AntDesign, Entypo,Ionicons } from '@expo/vector-icons'; 
import { NativeScreenNavigationContainer } from 'react-native-screens';
import Swiper from 'react-native-deck-swiper';
import { s } from "react-native-wind";
import { auth } from '../firebase'
import {db} from '../firebase'
import { onSnapshot, snapshotEqual,doc, collection, setDoc, getDoc,query, where, getDocs, DocumentSnapshot, serverTimestamp } from 'firebase/firestore';
import { async } from '@firebase/util';
import generateIds from '../lib/generateIds';
import CheckBox from 'react-native-just-checkbox' 
import dateGetter from '../lib/dateGetter';
import Grid from 'react-native-grid-component';
import LoadingScreen from './LoadingScreen';

const Auth = () => {
  const { status, data: user } = useUser();
  console.log('status', status, user)
}

const { width, height } = Dimensions.get('window');
const DUMMY_DATA=[
  {
    firstName:"Avval",
    lastName:"Halani",
    job:"Studying Hopefully!",
    photoURL: "https://media.licdn.com/dms/image/D5603AQGXeTqe_M5dPw/profile-displayphoto-shrink_800_800/0/1643213303255?e=2147483647&v=beta&t=-6ACfnE1hViETk2JAxspfZUm3cviih5w3LxQgLBGc50",
    age:20,
    id:3
  },
  {
    firstName:"Sonny",
    lastName:"Singh",
    job:"Software Engineer",
    photoURL: "https://avatars.githubusercontent.com/u/24712956?v=4",
    age:40,
    id:1
  },
  {
    firstName:"Ramanika",
    lastName:"Roy",
    job:"No Friends, hence here ;)",
    photoURL: "https://images.squarespace-cdn.com/content/v1/63c40b2f318f96687443605f/83679cc7-f3fc-44cd-a639-fe6b580e35f1/IMG-20221224-WA0001.jpg?format=750w",
    age:21,
    id:2
  },
  
]

function Home({navigation}) {
  const [profiles,setProfiles]=useState([]);
  const [newprofiles,setNewProfiles]=useState("null");
  const user=auth.currentUser
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Login")
      })
      .catch(error => alert(error.message))
  }
  const swipeRef=useRef(null);
  useLayoutEffect(()=>
   onSnapshot(doc(db,'users',user.uid), (snapshot) => {
       if(!snapshot.exists()){
        navigation.navigate("Modal")
       }
      }),[])
    const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    let unsub;

    const fetchUsers = async () => {
      const passes = await getDocs(collection(db,'users',user.uid,'passes')).then(
        (snapshot) => snapshot.docs.map((doc)=> doc.id)
        )
        const swipes = await getDocs(collection(db,'users',user.uid,'swipes')).then(
          (snapshot) => snapshot.docs.map((doc)=> doc.id)
          )
      const passedUserIds = passes.length > 0 ? passes : ['test'];
      const swipedUserIds = swipes.length > 0 ? swipes : ['test'];
      unsub = onSnapshot(
        query(
          collection(db,"users"),//do it in parts
          where("id","not-in",[...passedUserIds,...swipedUserIds])
        ), 
        async (snapshot) => {
          const profiles = await Promise.all(
            snapshot.docs
              .filter(doc => doc.id !== user.uid)
              .map(async doc => {
                const date = await dateGetter(user.uid,doc.id); // waiting for the Promise to resolve
                if (date.length === 0) {
                  return null; // exclude profile with empty date array
                }
                return {
                  id: doc.id,
                  ...doc.data(),
                  available:date
                };
              })
          ).then(profiles => profiles.filter(profile => profile !== null)); // filter out excluded profiles
          setProfiles(profiles);
          setTimeout(() => {
            setIsLoading(false);
          }, 1000); 
          
        })
      
    }
    fetchUsers();
    return unsub;
  },[db])

  console.log(profiles)
  const [recs,setRecs]=useState([]);
  let rec;
  useEffect(() => {
    const maker = async () => {
      for (let i = 0; i < profiles.length; i++) {
        const item = profiles[i];
        rec = await dateGetter(user.uid, item.id);
        console.log(`rec for ${item.displayName} is: `, rec);
        setNewProfiles(rec)
        console.log("rec set is",recs)
        };
      }
      maker()
    }
    , [db]);


  const swipeLeft = async(cardIndex) => {
    if (!profiles[cardIndex]) return;
    const userSwiped = profiles[cardIndex]
    console.log(`You Swiped left on ${userSwiped.displayName}`)
    try {
      await setDoc(doc(db, "users", user.uid, "passes", userSwiped.id), userSwiped);
    } catch (error) {
      console.error("Error setting document:", error);
    }
  }
  /*const [loggedInUser,setLoggedInUser]=useState({});*/
  const swipeRight = async (cardIndex) => {
    if (!profiles[cardIndex]) return;
    const userSwiped = profiles[cardIndex]
    /*const loggedInUser = await (
        await getDoc(doc(db,"users",user.uid))).data();
    console.log(loggedInUser)*/
    
    console.log("Initialized")
    const loggedInUser=await(
      await getDoc(doc(db,"users",user.uid))
    ).data()
    /*db.collection("users").doc(user.uid).get().then((snapshot) => {
      console.log(snapshot.data())
      setLoggedInUser(
        snapshot.docs
        .map(doc => ({
          id:doc.id,
          ...doc.data()
        }))
      )
    }).catch((e) => console.log(e))*/
    // check if the user swiped on you

    getDoc(doc(db,"users",userSwiped.id,"swipes",user.uid)).then(
      (documentSnapshot)=>{
        if (documentSnapshot.exists()){
          //this is gonna be a match
          console.log(`Hurray you matched with ${userSwiped.displayName}`)
          setDoc(doc(db,"users",user.uid,'swipes',userSwiped.id),userSwiped)
          //Create the match
          
          const matchRef = doc(db, "matches", generateIds(user.uid,userSwiped.id));
          console.log(loggedInUser)
          console.log(userSwiped.id,userSwiped.displayName,userSwiped.photoURL)
          setDoc(matchRef, {
              users:{
                [user.uid]:loggedInUser,
                [userSwiped.id]: userSwiped
              },
              userMatched: [user.uid,userSwiped.id],
              timestamp:serverTimestamp(),
          }).then(()=>{
            navigation.navigate("Match",{loggedInUser,userSwiped})
          }); 
        }else{
          setDoc(doc(db,"users",user.uid,'swipes',userSwiped.id),userSwiped)
      
        }

      }
    )


  }
  const renderLists = (item) => {
    return item.available.map((list, index) => (
      <View key={index}>
        <Text>List {index + 1}</Text>
        {list.map((item, index) => (
          <Text key={index}>{item}</Text>
        ))}
      </View>
    ));
        }
      if (isLoading) {
        return <LoadingScreen />;
      }
  return (
    
    <SafeAreaView>



      {/* Cards */}
      <View style={styles.seperator}>
      <Text style={s`ml-4 mt-2 text-2xl font-bold`}>Hola, {auth.currentUser?.displayName}</Text>
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
     <Text style={styles.buttonText}>Sign out</Text>

      </TouchableOpacity>
      <Swiper 
      containerStyle={{backgroundColor:"transparent"}}
      cards={profiles}
      ref={swipeRef}
      stackSize={5}
      cardIndex={0}
      verticalSwipe={false}
      animateCardOpacity
      backgroundColor='#4FD0E9'
      onSwipedLeft={(cardIndex)=>{
        console.log("Swipped LEFT")
        swipeLeft(cardIndex)
      }}
      onSwipedRight={(cardIndex)=>{
        console.log("Swipped RIGHT")
        swipeRight(cardIndex)
      }}
      overlayLabels={{
        left:{
          title:"NOPE",
          style:{
            label:{
              textAlign:"right",
              color:"red"
            },
          },
        },
        right:{
          title:"MATCH",
          style:{
            label:{
              color:"#4DED30"
            },
          },
        }
      }}
      renderCard={(card) => card ? (
        <View key={card.id} style={s`relative bg-white  h-3/4 rounded-xl`}>
          <View style={s`absolute top-0 w-full flex-row justify-between items-center h-20
          px-6 py-2 rounded-b-xl`} >
          <View>
              <Text style={s`text-xl font-bold`}>
                {card.displayName}
              </Text>
              <Text>{card.job}</Text>
            </View>
            <Text style={s`text-2xl font-bold`}>
              {card.age}
            </Text>
            </View>
          <Image style={s`absolute top-20 h-3/4 w-full rounded-xl`} source={{uri:card.photoURL}} />
          <View style={s`absolute bottom-0 bg-white w-full justify-between items-center h-22
          px-6 py-2 rounded-b-xl`} >   
          <Text>Common Available Times: {"\n"}</Text>    
          <View style={styles.container}>
          <View style={styles.column}>
            {card.available.available.map((item) => (
              <View key={item.day}>
                <Text style={s`text-xs`}>{item.day}</Text>
              </View>
            ))}
          </View>
          <View style={styles.separator} />
          <View style={styles.column}>
            {card.available.available.map((item) => (
              <View key={item.day}>
                <Text style={s`text-xs`}>{item.times}</Text>
              </View>
            ))}
          </View>
        </View>  
         {/* <Text style={`display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; justify-content: space-between;`}>
          {card.available.map(([day, time], i) => (
            <Text key={i} style={`padding: 10px;`}>{`${day}: ${time} \n`}</Text>
          ))}
        </Text> */}


            
          </View>
        </View>
        ) : (
          <View style={[s`bg-white h-3/4 rounded-xl justify-center items-center`,styles.cardShadow]}>
            <Text style={s`font-bold pb-5`}>No more profiles</Text>
            <Image style={s`h-20 w-20`} 
            height={50}
            width={50}
            source={{uri: "https://links.papareact.com/6gb"}}
            />
          </View>  
        )}/>
      
      </View>

      {/* End of Cards */}
      {/*<View className="flex flex-row justify-evenly ">
         <TouchableOpacity 
        onPress={()=>swipeRef.current.swipeLeft()}
        className="items-center justify-center rounded-full w-16 h-16 bg-red-200">
          <Entypo name='cross' size={24} color="red"/>
        </TouchableOpacity> 
        <TouchableOpacity 
        onPress={()=>navigation.navigate("Modal")}
        className="items-center justify-center rounded-full w-16 h-16 bg-green-200">
           <AntDesign name='heart' size={24} color="green"/>
        </TouchableOpacity>
      </View>
      */}
    </SafeAreaView>
    
  )
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection:"row"
  },
  column: {
    flex: 1,
    paddingHorizontal: 10,
  },
  separator: {
    borderRightWidth: 15,
    borderColor: 'black',
    marginVertical: 10,
  },
  cardShadow:{
    shadowColor:"#000",
    shadowOffset:{
      width:0,
      height:1
    },
    shadowOpacity:0.2,
    shadowRadius:1.41,
    elevation:2

  },
  profile: {
    width:60,
    height:60,
    borderRadius:100,
  },
  cardView:{
    flex:1,
  },
  chatIcon:{
    position:'absolute',
    right:30,
    top:35,
  },
  hello:{
    fontSize:40,
    top:30,
    right:80
  },
  header:{
    alignItems:'center',
  },
  profileButton:{
    position:'absolute',
    left:35,
    top:30,
  },
  seperator:{
    marginTop:10,
    flexDirection:'row',
  },
  cardInner:{
    marginTop:80,
    backgroundColor:"white",
    height:"75%",
    borderRadius:"15",
    position:'relative'
  },
  cardImage:{
    height:"100%",
    width:"100%",
    position:"absolute",
    top:0
  },
  button: {
    zIndex : 1,
    backgroundColor: '#9E2D0B',
    width: '30%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    left:width-290,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },

})
export default Home;