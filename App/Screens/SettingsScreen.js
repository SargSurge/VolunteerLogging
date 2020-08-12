import React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity, TextInput } from "react-native";
import 'firebase/firestore'
import { AuthContext } from "../context";
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

export const Settings = ({navigation}) => {

    const { signOut } = React.useContext(AuthContext);

    return (
        <ScreenContainer>
            <TouchableOpacity style={styles.touchableContainer} onPress={() => signOut()} >
                <Text style={styles.touchableText}>Sign Out</Text>
            </TouchableOpacity>
        </ScreenContainer>
    );
}