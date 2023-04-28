import React,{useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';


function Splash({navigation}) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate('Login');
    }, 1000); // replace 3000 with the desired duration of the splash screen in milliseconds
    return () => clearTimeout(timeout);
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Image source={require('../assets/trans.png')} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent:'center',
    backgroundColor:"#F3F0ED"
  },
  logo: {
    width: 330,
    height: 200,
    resizeMode: 'contain',
  }
});

export default Splash;
