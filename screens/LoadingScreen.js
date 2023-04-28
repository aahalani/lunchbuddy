import React from 'react';
import { View, ActivityIndicator, StyleSheet,Text } from 'react-native';
import { s } from "react-native-wind";


const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#9E2D0B" />
      <Text style={s`mt-8 text-blue-500`}>Have your appetite ready! 😉</Text>
      <Text style={s`mt-3 text-gray-500`}>Just a few moments more! 👍</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingScreen;
