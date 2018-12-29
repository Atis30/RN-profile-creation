/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
//import { AsyncStorage } from "react-native";
import {Platform, StyleSheet, Text, View, TextInput, Button, CheckBox, TouchableOpacity,AsyncStorage} from 'react-native';

//type Props = {};
export default class LoginScreen extends Component
{

  //const { navigate } = this.props.navigation;
  constructor(props){
  super(props)
  this.state={
    
    //name:'',
    nameValdate:true,
    password:'',
    passwordValdate:true,
    //isLoading: true
    jsonData: '',
    email:''
  }
}


  async setUserId(data)
  {
    await AsyncStorage.setItem('userId',data);
  }
  
  static navigationOptions={
      header: null,
      
    }
    //store login sessions 
  //     handleEmail = (text) => {
  //     this.setState({ email: text })
  //  }
  //  handlePassword = (text) => {
  //     this.setState({ password: text })
  //  }
validate(text,type){
  alphnum=/^[a-zA-Z-0-9@.]+$/
  num=/^[a-zA-Z0-9@]+$/  
  
  if(type=='email')
  {
    this.setState({ email: text })
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
    this.setState({ password: text })
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
}
onclicklogin (){
  //console.log(this.state.username);
     //console.log(this.state.password);
   if(this.state.email && this.state.password){
      
      alert(">>>>>>>>>>>>>>>>");
           
       fetch('http://192.168.43.216:4000/api1/users/login', {
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
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("response:", responseJson);
        //alert(JSON.stringify(response.json()));
        //if(responseJson.length > 0){
          this.setState({
            jsonData:responseJson,
          },()=>
          {
            this.setUserId(this.state.jsonData[0]._id);
            alert("***Welcome to Profile Builder***");
            this.props.navigation.navigate('profile',this.state.jsonData);
          })
        
        //}else
          //{
            //alert("please enter non empty user!!!");
          //}
        })
       .catch((error) => {
        alert(1);
        alert(error); 
      });   
      }else{
        alert("Empty user!!");
      }
    }

  
  render() {
    
    return(
      <View style={styles.container} >   
        <TextInput underlineColorAndroid ='transparent'style= {[styles.inputStyle, 
          !this.state.nameValdate?styles.error:null]} 
          placeholder="Username"
          onChangeText={(text)=> this.validate(text, 'email')}
        //returnKeyLabel = {"next"}
        //onChangeText={this.handleEmail}
        
        />   
        <TextInput underlineColorAndroid ='transparent'secureTextEntry={true} style= 
        {[styles.inputStyle,
          !this.state.passwordValdate?styles.error:null]} 
          onChangeText={(text)=> this.validate(text, 'password')}
          //onChangeText={this.handlePassword}
          placeholder="Password"
          secureTextEntry
           autoCorrect={false}/>
        <TouchableOpacity onPress={()=>this.onclicklogin()}>
        <Text style= {styles.btnText}>Login</Text>
        </TouchableOpacity>

        <Text style= {styles.TextSignup}>Not a Member yet?</Text>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('signup')}>
        <Text style={styles.signupButton}>signup</Text>
        </TouchableOpacity> 
        </View>
      );
    
  }

}  
  



var styles = StyleSheet.create({

  container:{

    backgroundColor:'#0093c4',
    flex:1,
    justifyContent:'center',
    paddingRight:20,
    paddingLeft:20
  },
  inputStyle: {
  backgroundColor:'#fff',
  borderRadius:25,
  marginBottom:10,
  fontSize:20,
  paddingLeft:15
},
btnText:{

  backgroundColor:'#0093c4',
  borderRadius:25,
  paddingBottom:20,
  paddingTop:25,
  fontSize:25,
  marginTop:10,
  marginLeft:70,
  marginRight:70,
  textAlign:'center',
  fontWeight:'bold'
},
TextSignup:{
  backgroundColor:'#0093c4',
  color:'#fff',
  //paddingBottom:10,
  //paddingTop:10,
  fontSize:20,
  marginTop:10,
  //marginLeft:30,
  //marginRight:60,
  textAlign:'center',
  fontWeight:'200'
},
  signupButton:{
      backgroundColor:'#0093c4',
      fontSize:25,
      borderRadius:25,
      fontWeight:'bold',
      textAlign:'center',      
    },
  error:{
  borderWidth:3,
  borderColor:'red'
},
})  

