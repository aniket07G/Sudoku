import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Gamescreen from './Screens/Gamescreen';
import Homescreen from './Screens/Homescreen';
import Difficultysreen from './Screens/Difficultyscreen';
import Splashscreen from './Screens/Splashscreen';
import About from './Screens/Aboutscreen';
import Help from './Screens/Helpscreen';
import Settingsscreen from './Screens/Settingsscreen';

const Stack = createNativeStackNavigator();
const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Splash'>
        <Stack.Screen name='Splash' component={Splashscreen} options={{headerShown: false }} />
        <Stack.Screen name='Home' component={Homescreen} options={{headerShown: false }} />
        <Stack.Screen name='About' component={About} options={{headerShown: false }} />
        <Stack.Screen name='Mode' component={Difficultysreen} options={{headerShown: false}} />
        <Stack.Screen name='Game' component={Gamescreen} options={{headerShown: false}}/>
        <Stack.Screen name='Help' component={Help} options={{headerShown: false}}/>
        <Stack.Screen name='Settings' component={Settingsscreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3FB',
  },
})

export default App;

