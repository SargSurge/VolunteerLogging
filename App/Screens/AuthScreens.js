import React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity, TextInput } from "react-native";
import 'firebase/firestore'
import { AuthContext } from "../context";
import AsyncStorage from "@react-native-community/async-storage";
import { auth, db } from '../firebaseConfig'

import {decode, encode} from 'base-64'

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    paddingTop: 120
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 32,
    color: 'black',
    margin: 15
  },
  touchableContainer: {
      backgroundColor: 'blue',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      borderRadius: 8,
      margin: 3,
  },
  touchableText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 18
  },
  input: {
      backgroundColor: '#e8e8e8',
      width: '100%',
      padding: 20,
      borderRadius: 8,
      margin: 10,
  }


});

const ScreenContainer = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

export const DecisionScreen = ({ navigation }) => {
    return (
        <ScreenContainer>
            <View style={{flex: 1, justifyContent: 'flex-end', marginBottom:100, width:'100%'}}>
            <TouchableOpacity style={styles.touchableContainer} onPress={() => navigation.push("SignIn")} >
                <Text style={styles.touchableText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchableContainer} onPress={() => navigation.push("CreateAccount")} >
                <Text style={styles.touchableText}>Create Account</Text>
            </TouchableOpacity>
            </View>
        </ScreenContainer>
    )
}

export const SignIn = ({ navigation }) => {

    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const { signIn } = React.useContext(AuthContext);

    const handleStudentLogin = () => {
      signIn(email, password);
    };
  
    return (
      <ScreenContainer>
        <Text style={styles.heading}>Login</Text>
        <TextInput
            style={styles.input}
            keyboardType={'email-address'}
            placeholder="Email"
            onChangeText={text => onChangeEmail(text)}
        />
        <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={text => onChangePassword(text)}
            secureTextEntry={true}
        />
        <TouchableOpacity style={styles.touchableContainer} onPress={() => handleStudentLogin()} >
            <Text style={styles.touchableText}>Login</Text>
        </TouchableOpacity>
      </ScreenContainer>
    );
  };
  
  export const CreateAccount = () => {
    const [name, onChangeName] = React.useState('');
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const { signUp, userID } = React.useContext(AuthContext);

    const handleStudentSignUp = () => {
        signUp(email,password);
        auth.onAuthStateChanged(user => 
          user ? db.collection('users').doc(user.uid).set({userType: 'student'}) : console.log('Not Logged In.')
        );
      };
    
    return (
      <ScreenContainer>
        <Text style={styles.heading}>Create Account</Text>
        <TextInput
            style={styles.input}
            placeholder="Name"
            onChangeText={text => onChangeName(text)}
        />
        <TextInput
            style={styles.input}
            keyboardType={'email-address'}
            placeholder="Email"
            onChangeText={text => onChangeEmail(text)}
        />
        <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={text => onChangePassword(text)}
            secureTextEntry={true}
        />
        <TouchableOpacity style={styles.touchableContainer} onPress={() => handleStudentSignUp()} >
            <Text style={styles.touchableText}>Create Account</Text>
        </TouchableOpacity>
        </ScreenContainer>
    );
  };
  