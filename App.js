import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Login from './screens/Login'
import Home from './screens/Home'
import Splash from './screens/Splash'
import ModalScreen from './screens/ModalScreen'
import Chat from './screens/Chat'
import Tabs from './screens/Tabs'
import LoginScreen from './screens/LoginScreen';
import Registration from './screens/Registration';
import Home1 from './screens/Home1';
import MatchedScreen from './screens/MatchedScreen';
import Messages from './screens/Messages';
import Time from './screens/Time';
import MainTrial from './screens/MainTrial';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from './screens/Profile';
import { NavigationContainer } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


const Stack = createStackNavigator();

const App = () => {

 

  return (
    <NavigationContainer>
      
      <Stack.Navigator initialRouteName="Login">
      <Stack.Group>
      <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false, gestureEnabled: false }}/>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false, gestureEnabled: false }}/>
        <Stack.Screen name="Time" component={Time} options={{ headerShown: false, gestureEnabled: false }}/>
        <Stack.Screen name="Messages" component={Messages} options={{ headerShown: false, gestureEnabled: false }}/>
        <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false}}/>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false, gestureEnabled: false }}/>
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false, gestureEnabled: false }}/>
        <Stack.Screen name="Registration" component={Registration} options={{ headerShown: false, gestureEnabled: false }}/>
        <Stack.Screen name="Home1" component={Home1} options={{ headerShown: false, gestureEnabled: false }}/>
        <Stack.Screen name="Match" component={MatchedScreen} options={{ headerShown: false, gestureEnabled: false}}/>
        <Stack.Screen name="MainTrial" component={MainTrial} options={{ headerShown: false, gestureEnabled: false}}/>
      
        
      
      </Stack.Group>
      <Stack.Group screenOptions={{presentation:"modal"}}>
        <Stack.Screen name="Modal" component={ModalScreen} options={{ headerShown: false }}/>
      </Stack.Group>
      </Stack.Navigator> 
    </NavigationContainer>
  );
};
export default App;

