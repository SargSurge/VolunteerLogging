import React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity, TextInput } from "react-native";
import 'firebase/firestore'
import { db } from '../firebaseConfig'
import { FloatingAction } from "react-native-floating-action";

import {decode, encode} from 'base-64'

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    paddingTop: 50
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

const actions = [
    {
      text: "Check in to Event",
      //icon: require("./images/ic_accessibility_white.png"),
      name: "bt_checkin",
      position: 2
    },
    {
      text: "Add Event",
      //icon: require("./images/ic_language_white.png"),
      name: "bt_add",
      position: 1
    },
  ];

// Fetch Events from db

const ScreenContainer = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

function FloatingPress(name, navigation) {
    if(name==='bt_add'){
        navigation.navigate('AddEvent');
    } 
};

export const EventScreen = ({navigation}) => {
    return (
        <ScreenContainer>
            <Text>Add events by clicking the plus sign below.</Text>
            <FloatingAction
                showBackground={false}
                actions={actions}
                onPressItem={name => {
                FloatingPress(name, navigation);
                }}
            />
        </ScreenContainer>
    );
};

export const AddEvent = ({navigation}) => {
    const [eventName, onChangeName] = React.useState('');
    const [date, onChangeDate] = React.useState('');
    const [hours, onChangeHours] = React.useState('');
    const [organization, onChangeOrg] = React.useState('');

    return (

        <ScreenContainer>
            <TextInput
                style={styles.input}
                placeholder="Event Name"
                onChangeText={text => onChangeName(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Date"
                onChangeText={text => onChangeDate(text)}
            />
            <TextInput
                keyboardType={'numeric'}
                style={styles.input}
                placeholder="Number of Hours"
                onChangeText={text => onChangeHours(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Organization"
                onChangeText={text => onChangeOrg(text)}
            />
            <TouchableOpacity style={styles.touchableContainer} >
                <Text style={styles.touchableText}>Add Event</Text>
            </TouchableOpacity>
        </ScreenContainer>
    );
};

export const EventDetails = ({navigation, event}) => {
    return (
        <View>

        </View>
    );
};