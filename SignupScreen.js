/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
//import api1 from './backend/routes/api1';
//import user from './backend/models/user';
import {Platform, StyleSheet, Text, View, TextInput, Button, CheckBox, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
//import {saveItem} from '../src/Cookies';

//type Props = {};
export default class SignupScreen extends Component
{  

  // constructor(props){

  //   super(props)
  //   obj = new Cookies();
  // }
  state={
      email: '',
      password:'',
      errors: [],
      //showProgress: false
      //name:'',
      //nameValdate:true,
      
      //passwordValdate:true,
      
      
    }
  
  
    /*validate(text,type){
    alphnum=/^[a-zA-Z0-9@._]+$/
    num=/^[a-zA-Z0-9@]+$/

    if(type=='email')
    {
      if(alphnum.test(text))
      {
          this.setState({
            nameValdate:true,
          })

      }

      else
      {
            this.setState({
            nameValdate:false,   
            })
      }

    }
    else if(type=='password')
    {
      if(num.test(text))
      {
          this.setState({
            passwordValdate:true,
          })

      }

      else
      {
            this.setState({
            passwordValdate:false,   
            })
      }

    }
  }*/
  handleEmail = (text) => {
      this.setState({ email: text })
   }
   handlePassword = (text) => {
      this.setState({ password: text })
   }
   static navigationOptions={
      header: null,
      
    }
     //store user id
  //    async storeToken(accessToken) {
  //   try {
  //       await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
  //       console.log("Token was stored successfull ");
  //   } catch(error) {
  //       console.log("Something went wrong");
  //   }
  // }
  //    async saveItem(item, selectedValue)  {
  //   try {
  //     await AsyncStorage.setItem(item, selectedValue);
  //   } catch (error) {
  //     console.error('AsyncStorage error: ' + error.message);
  //   }
  // }
  //create user
  onclicksignup= (email, pass)=> {
    alert('email: ' + email + ' password: ' + pass);
      //this.setState({isLoggedIn : true});
     if(this.state.email&&this.state.password){
    //this.setState({showProgress: true})
    
       fetch('http://192.168.43.216:4000/api1/users', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        }),
      })
      .then((response) => JSON.stringify(response.json()))
      .then((responseJson) => {
                //alert(response.json);
                console.log("response:", +responseJson);
alert('email: ' + email + ' password: ' + pass);
//obj.saveItem();
//this.saveItem('id_token', responseJson.id_token),
        alert("User added successfully");
        this.props.navigation.navigate('home');
      })
      .catch((error) => {
          alert(1);
          alert(error); 
      });

      
  
}else{
  alert("Empty user!!");
}
}
  //      fetch('http://192.168.43.216:4000/api1/users', {
  //                             method: 'POST',
  //                             headers: {
  //                               'Accept': 'application/json',
  //                               'Content-Type': 'application/json',
  //                             },
  //                             body: JSON.stringify({
  //                               user:{
  //                                 //name: this.state.name,
  //                                 email: this.state.email,
  //                                 password: this.state.password,
  //                                 //password_confirmation: this.state.password_confirmation,
  //                               }
  //                             })
  //                           });
      
  //         this.props.navigation.navigate('home');
       
  //     }
    
  // }


      

  render() {
    
      return (
         <View style = {styles.container}>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Email"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleEmail}/>
            
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Password"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               secureTextEntry
               onChangeText = {this.handlePassword}/>
            
            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {()=>this.onclicksignup(this.state.email, this.state.password)
               }>
               <Text style = {styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>
         </View>
      /*<View style={styles.container} >   
        <TextInput underlineColorAndroid ='transparent'style= {styles.inputStyle} 
          placeholder="email"
        //returnKeyLabel = {"next"}

        onChangeText={(email) => this.setState({email})}
        />   
        <TextInput underlineColorAndroid ='transparent'secureTextEntry={true} style= 
        {styles.inputStyle} 
          placeholder="Password"
          onChangeText={(password) => this.setState({password})} 
          
          secureTextEntry
           autoCorrect={false}/> 
                 
        <TouchableOpacity  onPress={this.onclicksignup}>
        <Text style= {styles.btnText}>Create Account</Text>
        </TouchableOpacity>
        </View>*/
        );
    
    }
  
}

/*var styles = StyleSheet.create({

  container:{

    backgroundColor:'#81b9bf',
    flex:1,
    justifyContent:'center',
    paddingRight:20,
    paddingLeft:20
  },
  inputStyle: {
  backgroundColor:'#fff',
  marginBottom:10,
  borderRadius:25,
  fontSize:20,
  paddingLeft:15
},
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
btnTextLogin:{
  backgroundColor:'#81b9bf',
  color:'#212121',
  //paddingBottom:10,
  //paddingTop:10,
  fontSize:20,
  marginTop:25,
  marginLeft:60,
  marginRight:60,
  textAlign:'center',
  fontWeight:'bold'
},
error:{
  borderWidth:3,
  borderColor:'red'
}
})  */

const styles = StyleSheet.create({
   container: {
      paddingTop: 23
   },
   input: {
      margin: 15,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1
   },
   submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      height: 40,
   },
   submitButtonText:{
      color: 'white'
   }
})

