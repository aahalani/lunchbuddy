import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity,SafeAreaView } from 'react-native';
import ChatList from '../components/ChatList';
import Header from '../components/Header';

const Chat = () => {
  return (
    <SafeAreaView>
      <Header title="Chat" />
      <ChatList />
    </SafeAreaView>
  )
}

export default Chat;