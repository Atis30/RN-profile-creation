import React, {Component} from 'react';
import {Alert, Image, Text, StyleSheet, TouchableOpacity, Button,View, AsyncStorage} from 'react-native';
//import {Actions} from 'react-native-router-flux';
//import styles from './styles';
//const user_id=userid;
export default class HomeScreen extends Component
{
constructor(props) {
    super(props);
   this.state = {
    uid: null,
   }
 }
  // getProtectedQuote() {
  //   Alert.alert('We will print a Chuck Norris quote')
  // }

static navigationOptions={
header:null}
  // async userLogout() {
  //     try {
  //     await AsyncStorage.removeItem('id_token');
  //     Alert.alert('Logout Success!');
  //     //this.props.navigation.navigate('Home');
  //   } catch (error) {
  //     console.log('AsyncStorage error: ' + error.message);
  //   }
  // }
  // async getuser() {
  //   try {
  //     const userid = await AsyncStorage.getItem('@MySuperStore:key');
  //     this.setState({uid: userid});
  //   } catch (error) {
  //     console.log("Error retrieving data" + error);
  //   }
  // }

  signup = () =>{
          this.props.navigation.navigate('signup');

  }

  signin = () =>{
           this.props.navigation.navigate('login');
         }
  
  render() {
    return (
      <View>
      <TouchableOpacity onPress={this.signup}>
        <Text style={styles.btnText}> Signup</Text>
        </TouchableOpacity>        
        <TouchableOpacity onPress={this.signin}>
        <Text style={styles.btnText}> Log In</Text>
        </TouchableOpacity>  
        <TouchableOpacity onPress={this.userLogout}>
        <Text style={styles.btnText}> Log Out</Text>
        </TouchableOpacity> 
        
               
      </View>
    );
  }
}


var styles = StyleSheet.create({

  
btnText:{

  backgroundColor:'#81b9bf',
  color:'#212121',
  borderRadius:20,
  paddingBottom:10,
  paddingTop:10,
  fontSize:20,
  marginTop:10,
  marginLeft:70,
  marginRight:70,
  textAlign:'center',
  fontWeight:'bold'
},
formButton: {
    borderWidth: 1,
    borderColor: "#555555",
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    marginTop: 5,
  },
});
