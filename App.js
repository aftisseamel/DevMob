import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Landing from './components/auth/Landing';
import { Register } from './components/auth/Register'



const Stack = createStackNavigator();

import React, { Component } from 'react'

export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded : false,
    }

  }
  componentDidMount(){
    firebase.auth().onAu
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default App

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name='Landing'>{props => <Landing {...props} />}</Stack.Screen>
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
