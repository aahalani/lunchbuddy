import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Profile from './Profile'
import Home1 from './Home1'
import Home from './Home'
import Find1 from './Find1'
import Post1 from './Post1'
import Time from './Time';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { styled } from 'tailwindcss-react-native';
import ModalScreen from './ModalScreen';
import Chat from './Chat';
import { Modal } from 'react-native-paper';
import LoadingNewTrial from './LoadingNewTrial';
import MatchedScreen from './MatchedScreen';

const Tab=createBottomTabNavigator();

const CustomTabBarButton=({children,onPress})=>(
  <TouchableOpacity 
  style={{
     top:-30,
     justifyContent:'center',
     alignItems:'center',
     ...styles.shadow
  }}
  onPress={onPress}
  >
    <View style={{
      width:70,
      height:70,
      borderRadius:35,
      backgroundColor:"#9E2D0B"
    }}>
      {children}
    </View>
  </TouchableOpacity>
);


const Tabs = () => {
  return (
    <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
        tabBarShowLabel:false,
        tabBarStyle:{
          position:'absolute',
          bottom:25,
          left:20,
          right:20,
          elevation:0,
          backgroundColor:"#ffffff",
          borderRadius:15,
          height:90,
          ...styles.shadow
        }
  }}
    >
        <Tab.Screen name='Modal' component={ModalScreen} options={{
          headerShown:false,
          tabBarIcon: ({focused}) => (
            <View style={{alignItems:'center',justifyContent:"center", top:10}}>
              <Image source={require('../assets/profile1.png')}
                resizeMode="contain"
                style={{
                  height:25,
                  width:25,
                  tintColor: focused ? "#9E2D0B" : "748c94",
                }}
              />
              <Text style={{color: focused ? "#9E2D0B" : "748c94",
                  fontSize:12}}>PROFILE</Text>
            </View>
          )
        }} />

        <Tab.Screen name='Home' component={Home} options={{
                  headerShown:false,
                  tabBarIcon: ({focused}) => (
                    <View style={{alignItems:'center',justifyContent:"center", top:10}}>
                      <Image source={require('../assets/home.png')}
                        resizeMode="contain"
                        style={{
                          height:25,
                          width:25,
                          tintColor: focused ? "#9E2D0B" : "748c94",
                        }}
                      />
                      <Text style={{color: focused ? "#9E2D0B" : "748c94",
                          fontSize:12}}>HOME</Text>
                    </View>
                  )
                }} />
        
        
        <Tab.Screen name='Chat' component={Chat} options={{
          headerShown:false,
          tabBarIcon: ({focused}) => (
            <View style={{alignItems:'center',justifyContent:"center", top:10}}>
              <Image source={require('../assets/chat.png')}
                resizeMode="contain"
                style={{
                  height:25,
                  width:25,
                  tintColor: focused ? "#9E2D0B" : "748c94",
                }}
              />
              <Text style={{color: focused ? "#9E2D0B" : "748c94",
                  fontSize:12}}>CHAT</Text>
            </View>
          )
        }} />
        
    </Tab.Navigator>
  )
}

const styles=StyleSheet.create({
  shadow:{
    shadowColor:"#7F5DF0",
    shadowOffset:{
      width:0,
      height:10
    },
    shadowOpacity:0.25,
    shadowRadius:3.5,
    elevation:5,
  }
});

export default Tabs