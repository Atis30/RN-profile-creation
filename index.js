/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { YellowBox } from 'react-native';
//import {AsyncStorage} from 'react-native';

//#import <React/RCTEventEmitter.h>
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
var NativeAppEventEmitter = require('RCTNativeAppEventEmitter');
AppRegistry.registerComponent(appName, () => App);

//var NativeAppEventEmitter = require('RCTNativeAppEventEmitter');


