import React from "react";
import { View, Text, StyleSheet, Alert, Button, TouchableOpacity, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { auth } from './firebaseConfig';
import { AuthContext } from "./context";

import { SignIn, CreateAccount, DecisionScreen } from "./Screens/AuthScreens"
import { EventScreen, AddEvent, EventDetails } from "./Screens/EventScreens"
import { Settings } from './Screens/SettingsScreen'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5
  }
});

const ScreenContainer = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

const Splash = () => (
  <ScreenContainer>
    <Text>Loading...</Text>
  </ScreenContainer>
);

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen
      name="DecisionScreen"
      component={DecisionScreen}
      options={{ title: "Sign In" }}
    />
    <AuthStack.Screen
      name="SignIn"
      component={SignIn}
      options={{ title: "Sign In" }}
    />
    <AuthStack.Screen
      name="CreateAccount"
      component={CreateAccount}
      options={{ title: "Create Account" }}
    />
  </AuthStack.Navigator>
);

/* const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const SearchStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen
      name="Details"
      component={Details}
      options={({ route }) => ({
        title: route.params.name
      })}
    />
  </HomeStack.Navigator>
);

const SearchStackScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen name="Search" component={Search} />
    <SearchStack.Screen name="Search2" component={Search2} />
  </SearchStack.Navigator>
);

 const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>
);

const TabsScreen = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="Home" component={HomeStackScreen} />
    <Tabs.Screen name="Search" component={SearchStackScreen} />
  </Tabs.Navigator>
); 

const Drawer = createDrawerNavigator();
const DrawerScreen = () => (
  <Drawer.Navigator initialRouteName="Profile">
    <Drawer.Screen name="Home" component={TabsScreen} />
    <Drawer.Screen name="Profile" component={ProfileStackScreen} />
  </Drawer.Navigator>
); */

const MainTabs = createBottomTabNavigator();
const EventStack = createStackNavigator();
const SettingsStack = createStackNavigator();

const EventStackScreen = () => (
  <EventStack.Navigator>
    <EventStack.Screen name='Events' component={EventScreen} />
    <EventStack.Screen name='AddEvent' options={{title: 'Add Event'}} component={AddEvent} />
    <EventStack.Screen name='EventDetails' component={EventDetails} /> 
  </EventStack.Navigator>
);

const SettingsStackScreen = () => (
  <SettingsStack.Navigator>
    <SettingsStack.Screen name="Settings" component={Settings} />
  </SettingsStack.Navigator>
)

const MainTabsScreen = () => (
  <MainTabs.Navigator initialRouteName="Events">
    <MainTabs.Screen name="Events" component={EventStackScreen} />
    <MainTabs.Screen name="Settings" component={SettingsStackScreen} />
  </MainTabs.Navigator>
);

const RootStack = createStackNavigator();
const RootStackScreen = ({ userToken }) => (
  <RootStack.Navigator headerMode="none">
    {userToken ? (
      <RootStack.Screen
        name="App"
        component={MainTabsScreen}
        options={{
          animationEnabled: false
        }}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{
          animationEnabled: false
        }}
      />
    )}
  </RootStack.Navigator>
);

export default () => {

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };
  
  loginReducer = (prevState, action) => {
    switch(action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        }
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        }
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        }
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        }
      case 'AUTH':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        }
    }
  }

  const authContext = React.useMemo(() => {
    return {
      signIn: (username, password) => {
        auth
        .signInWithEmailAndPassword(username, password)
        .then(cred => dispatch({type: 'LOGIN', id: cred.user.email, token: cred.user.uid}))
        .catch(error => Alert.alert(
                        "Error",
                        error.message,
                        [{text: "OK"}]
              ))
      },
      signUp: (username, password) => {
        auth
        .createUserWithEmailAndPassword(username, password)
        .then(cred => dispatch({type: 'REGISTER', id: cred.user.email, token: cred.user.uid}))
        .catch(error => Alert.alert(
                        "Error",
                        error.message,
                        [{text: "OK"}]
              ))
      },
      signOut: () => {
        auth
        .signOut()
        .then(() => dispatch({type: 'LOGOUT'}))
        .catch(error => Alert.alert(
                        "Error",
                        error.message,
                        [{text: "OK"}]
                        ))
      }, 
      }}
  );

  React.useEffect(() => {
    setTimeout(() => {
       auth.onAuthStateChanged(user => user ? dispatch({type: 'LOGIN', id: user.email, token: user.uid}) : dispatch({type: 'LOGOUT'}))
    }, 1000);
  }, []);

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  console.log(loginState);

  if (loginState.isLoading) {
    return <Splash />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen userToken={loginState.userToken} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
