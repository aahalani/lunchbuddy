import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core'


const Login = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/trans.png')} style={styles.logo} />
      <Image source={require('../assets/picture.png')} style={styles.logo1} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate("LoginScreen")}}>  
        <Image source={require('../assets/google.png')} style={styles.google} />
          <Text style={styles.buttonText}>Login with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button1} onPress={()=>{navigation.navigate("Registration")}}>
          <Text style={styles.buttonText1}>Sign up with email address</Text>
        </TouchableOpacity>
        <View style={styles.line}>
        </View>
        <View style={styles.bottom}>
        <Text>Already have an account?!</Text>
        <TouchableOpacity onPress={()=>{navigation.navigate("LoginScreen")}}>
        <Text style={styles.buttonT}> Sign in!</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  logo: {
    width: 330,
    height: 200,
    resizeMode: 'contain',
  },
  logo1: {
    width: 500,
    height: 270,
    resizeMode: 'contain',
  },
  google: {
    resizeMode: 'contain',
    marginLeft:18,
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 4,
    width: '100%',
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  bottom:{
    flexDirection:'row',
  },
  button: {
    backgroundColor: '#9E2D0B',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    borderRadius: 15,
    width:292,
    height:54,
  },
  button1: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 15,
    padding: 10,
    margin: 10,
    width:292,
    height:54,
    alignItems:'center',
    justifyContent:'center'
  },
  
  buttonText1: {
    color: '#000',
    fontSize: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft:45,
  },
  buttonT:{
    color:"#9E2D0B"
  }
});

export default Login;
