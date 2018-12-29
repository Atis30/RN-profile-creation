/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, 
  StyleSheet, 
  Text, 
  View, 
  TextInput, Button, CheckBox, TouchableOpacity, AsyncStorage, Image} from 'react-native';
  import ImagePicker from 'react-native-image-picker';
  //import ImagePickerManager from 'react-native-image-picker';
  import RNFetchBlob from 'rn-fetch-blob';
//type Props = {};
//const {uid} = 'user._id';
const options={
  title: 'my pic',
  takePhotoButtonTitle: 'Take photo with your camera',
  chooseFromLibraryButtonTitle: 'Choose photo from library',
}
export default class Profile extends Component 
{  
  static navigationOptions={
      header: null,
      
    }
    
  constructor(props)
  {
  super(props);
  this.state={
    firstname:'',
    lastname: '' ,
    gender:'',
    Occupation:'',
    address:'',
    contact:'',
    avatarSource: null,
      pic:null,
      isLoading:'',
      isWorking:'',
    
    jsonData:this.props.navigation.state.params
  }
  console.log(">>>>>>>>>>>",this.state.jsonData);
  this.fetchUserId();
}
  handleName = (text) => {
      this.setState({ firstname: text })
   }

   handleLastname = (text) => {
      this.setState({ lastname: text })
    }
    handlephoto =(text)=>{
      this.setState({photo: text})
    }


    fetchUserId= async()=>
    {
      try{
        const userId = await AsyncStorage.getItem('userId');

        if(userId != null)
        {
          console.log(">>>>>>>>12345",userId);
        }
      }
      catch (error){
        console.log(error);
      }
    }
    // handleuid = (text) => {
    //   this.setState({ uid: uid })
    // }
  
  //static navigationOptions={
      //title: 'Home',

/*validate(text,type){
  alphnum=/^[a-zA-Z-@.]+$/
  num=/^[0-9]+$/
  if(type=='firstname')
  {
    if(alphnum.test(text))
    {
        this.setState({
          fnameValdate:true,
        })

    }

    else
    {
          this.setState({
          fnameValdate:false,   
          })
    }

  }
  else if(type=='lastName')
  {
    if(alphnum.test(text))
    {
        this.setState({
          lnameValdate:true,
        })

    }

    else
    {
          this.setState({
          lnameValdate:false,   
          })
    }

  }else if( type=='gender'){
          if(alphnum.test(text))
        {
          this.setState({
          gValdate:true,
        })

    }

    else
    {
          this.setState({
          gValdate:false,   
          })
    }
  }else if(type=='address')
  {
        if(alphnum.test(text)){
          this.setState({
            aValdate:true,
          })
        }
        else
        {
          this.setState({
            aValdate:false,
          })
        }

  }else if(type=='profilepicture'){
    if(alphnum.test(text)){
      this.setState({
        pValdate:true,
      })
    }
    else
    {
      this.setState({
        pValdate:false,
      })
    }
  }
}*/
// get user id
// async getitem(item)  {
//     try {
//       await AsyncStorage.getItem(item);
//     } catch (error) {
//       console.error('AsyncStorage error: ' + error.message);
//     }
//   }
// async retrieveItem(key) {
  //   try {
  //     const retrievedItem =  await AsyncStorage.getItem(key);
  //     const item = JSON.parse(retrievedItem);
  //     return item;
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  //   return
  // }
// async getItem(key){
//     return AsyncStorage.getItem(key, (err, result) => {
//          return result;
//   });
// }



onclicksubmit(){
       
      //alert(">>>>>>>>>>>>>>>>");
      
      // AsyncStorage.getitem('id_token').then((token) =>{
      //   alert(token);
       fetch('http://192.168.43.216:4000/api1/users/updateProfile', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({
          _id:this.state.jsonData[0]._id,
          //mailid:this.state.username,
          //password:this.state.password,
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          photo:this.state.form,
          //uid:this.state.uid,
          // gender: this.state.gender,
          // address: this.state.address,
          // profilepicture: this.state.profilepicture,
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        //alert(JSON.stringify(responseJson));
        //console.log(req.params.id);
        //this.getItem(item)
        alert("Profile Created");
        this.props.navigation.navigate('home');
          
      })
      .catch((error) => {
          alert(1);
          alert(error); 
      });
      
    
    }
    //logout
  //   async userLogout() {
  //     try {
  //     await AsyncStorage.removeItem('id_token');
  //     Alert.alert('Logout Success!');
  //     this.props.navigation.navigate('Home');
  //   } catch (error) {
  //     console.log('AsyncStorage error: ' + error.message);
  //   }
  // }

  onClickPhotoChange=()=>
  {
      ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
      console.log('User cancelled image picker');
      }
      else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
      }
      else {
      this.setState({ isUploading: true});
      var form = new FormData();
      form.append('files[]', {
      uri: response.uri,
      type: response.type,
      name:response.fileName,
      });
      let xhr = new XMLHttpRequest()
      xhr.open('post', 'http://192.168.43.216:4000/uploads')
      xhr.onload = function (e) {
      if (xhr.readyState === 4) {
      if (xhr.status === 200) {
      if(xhr.response.length>0)
      {
      var json_obj = JSON.parse(xhr.responseText);
      this.setState({
      imageData: json_obj[0],
      image:json_obj[0].filename,
      isUploading:false
      },()=>
      {
      Toast.show('Image attached',Toast.SHORT);
      })
      }
      else
      {
      Toast.show('Error in uploading image, try again',Toast.LONG);
      }
      }
      }
      }.bind(this);
      xhr.onerror=(e)=>{
      this.setState({isLoading:false,isWorking:false});
      Toast.show('Error in uploading image, try again',Toast.LONG); 
      console.log(JSON.stringify(e));
      };
      xhr.send(form);
      }
      })
      }
    //alert('clicked');
  
    // ImagePicker.showImagePicker(options, (response) => {
    //   console.log('Response = ', response);
  
    //   if (response.didCancel) {
    //     console.log('User cancelled image picker');
    //   }
    //   else if (response.error) {
    //     console.log('Image Picker Error: ', response.error);
    //   }
  
    //   else {
    //     let source = { uri: response.uri };
  
    //     // You can also display the image using data:
    //     // let source = { uri: 'data:image/jpeg;base64,' + response.data };
  
    //     this.setState({
    //       avatarSource: source,
    //       pic:response.data
    //     });
    //   }
    // });
  //}
  // uploadPic(){
  //   // alert('ddf');
  //   RNFetchBlob.fetch('POST', 'http://192.168.43.216:4000/api1/users/photo', {
  //     Accept: "Bearer access-token",
  //     otherHeader : "foo",
  //     'Content-Type' : 'multipart/form-data',
  //   }, [
  //     // append field data from file path
  //     {
  //       name : 'avatar',
  //       filename : 'avatar.jpeg',
  //       data: this.state.pic,
  //       //data: RNFetchBlob.wrap("c:\Desktop")
  //     }
  //     ]).then((resp) => {
  //     console.log(resp);
  //     alert('your image uploaded successfully');
  //     //this.setState({avatarSource:null})
  //   })
  // }
  


    
  render() {
    return(
      <View style={styles.container}>   
      <Text style= {styles.inputStyle}> Create Profile</Text>
        <View style={styles.container}>
      <TextInput style={styles.inputBox}
      onChangeText = {this.handleName}
      underlineColorAndroid= 'rgba(0,0,0,0)' 
      placeholder="FirstName"
      placeholderTextColor='#ffffff'
      />
      <TextInput style={styles.inputBox} 
      onChangeText = {this.handleLastname}
      underlineColorAndroid= 'rgba(0,0,0,0)' 
      placeholder="LastName"
      placeholderTextColor='#ffffff'
      />
      {/* <Image source={this.state.avatarSource}
          style={{width:'50%',height:50,margin:10}}/> */}

        <TouchableOpacity style={{backgroundColor:'green',margin:10,padding:10}}
        onPress={()=>this.onClickPhotoChange()}>
          <Text style={{color:'#fff'}}>Select Image</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={()=>this.uploadPic()}>
          <Text>Upload</Text>
        </TouchableOpacity> */}
             
      </View>
      <TouchableOpacity onPress={()=>this.onclicksubmit()}>
        <Text style= {styles.btnText}>Submit Profile</Text>
        </TouchableOpacity>
        
        
        </View>
      );
    
  }
}

const styles= StyleSheet.create({

  container: {

    backgroundColor:'#ff94c2',
    flex:1,
    justifyContent:'center',
    paddingRight:20,
    paddingLeft:20
    //verticalPadding:200,
  },
  inputStyle: {
  backgroundColor:'#ff94c2',
  textAlign:'center',
  //flex:2,
  color:'#1a237e',
  marginBottom:10,
  fontSize:20,
  paddingLeft:15
},

inputBox: {

  width: 300,
  backgroundColor:'rgba(255,255,255,0.2)',
  borderRadius:25,
  paddingHorizontal:16,
  fontSize:16,
  color:'#ffffff',
  marginVertical:20
 },

 btnText:{

  backgroundColor:'#0093c4',
  borderRadius:25,
  paddingBottom:10,
  paddingTop:10,
  fontSize:25,
  marginTop:20,
  marginLeft:70,
  marginRight:70,
  textAlign:'center',
  fontWeight:'bold'
},
});

