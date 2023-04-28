import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import ModalScreen from "./ModalScreen";
import Home from "./Home";
import Chat from "./Chat";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createAppContainer } from 'react-navigation';

const TabNavigator = createMaterialBottomTabNavigator(
{
	
	User: {
	screen: ModalScreen,
	navigationOptions: {
		tabBarLabel: "Profile",
		tabBarIcon: (tabInfo) => (
		<Ionicons
			name="md-person-circle-outline"
			size={tabInfo.focused ? 23 : 20}
			color={"#9E2D0B"}
		/>
		),
	},
	},

    Home: {
        screen: Home,
        navigationOptions: {
            tabBarLabel: "Home",
            tabBarIcon: (tabInfo) => (
            <Ionicons
                name="md-home"
                size={tabInfo.focused ? 23 : 20}
                color={"#9E2D0B"}
            />
            ),
        },
        },
	Chat: {
	screen: Chat,
	navigationOptions: {
		tabBarLabel: "Chat",
		tabBarIcon: (tabInfo) => (
		<Ionicons
			name="md-chatbox"
			size={tabInfo.focused ? 23 : 20}
			color={"#9E2D0B"}
		/>
		),
	},
	},
},
{
    initialRouteName: "Home",
    tabBarOptions: {
       
        backgroundColor: "red",
      
    },
  }
);

const AppNavigator = createAppContainer(TabNavigator);

export default function MainTrial() {
    
return (
	<AppNavigator />
);
}
