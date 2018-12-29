/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {NativeAppEventEmitter, Platform, StyleSheet, Text, View, TextInput, Button} from 'react-native';
import { StackNavigator } from 'react-navigation';
import LoginScreen from './src/LoginScreen';
//import Main from './src/Main';
import SignupScreen from './src/SignupScreen';
import Profile from './src/Profile';
//import Home from './src/Home';
//import Login from './src/Login';
//import Register from './src/Register';
//import Root from './src/Root';
//import Update from'./src/Update';
//import Inputs from './src/Inputs';
import HomeScreen from './src/HomeScreen';
//import RegisterTest from './src/RegisterTest';
//import Main from './src/Main';
//import Cookies from './src/Cookies';
//#import <React/RCTEventEmitter.h>

//import api1 from './backend/routes/api1';
//import user from './backend/models/user';
//import Logintest from './src/Logintest';

//var NativeAppEventEmitter = require('RCTNativeAppEventEmitter');
//type Props = {};
//export default class App extends Component<Props> {
	
  const Navigation = StackNavigator({
    
    
  	//signup:RegisterTest
    //test:Logintest,
   	//main:Main,
   	//root:Root,
   	home:HomeScreen,
    login:LoginScreen,    
    signup:SignupScreen,
    
   //update:Update,
    profile:Profile,     
    
    
  })
   
  
export default Navigation;
