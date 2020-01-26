import React from 'react';
import { StyleSheet, View,ImageBackground,Alert,Platform,ToastAndroid} from 'react-native';
import { Button, Input, Text} from '@ui-kitten/components';
import {forgotPwdUrl,resetPwdUrl} from '../urls/urlgenerator';



export default class ForgotPasswordScreen extends React.Component{

  state={
    waiting : false,
    username:'',
    password:'',
    otp:'',
  }
  otpres =''

  displayMessage = (msg)=>{
    Platform.OS === 'ios' ? Alert.alert(msg) : ToastAndroid.show(msg, ToastAndroid.SHORT);
  }
  confirmPress = async()=>{
    if(this.state.otp == this.otpres)
    {
      var resp = await fetch(resetPwdUrl(this.state.username,this.state.password));
      switch(resp.status){
        case 200:
            this.displayMessage('Password changed!');
            break;
        case 400:
        case 204:
            this.displayMessage('Invalid Username or Password');
            break;
        default:
             this.displayMessage('OOPSY!Please try Again');
             break;
      }
      this.props.navigation.goBack();
    }
    else{
      Alert.alert('OOPSY!Wrong OTP,try again!');
      this.setState({waiting:false});
    }
  }
  submitPress = async()=>{
    var resp = await fetch(forgotPwdUrl(this.state.username));
    switch(resp.status){
      case 200:
          resp = await resp.json();
          this.otpres = resp['otp'];
          this.setState({waiting:true});
          break;
      case 400:
      case 204:
          Alert.alert('Invalid Username');
          break;
      default:
           Alert.alert('OOPSY!Please try Again');
           break;
    }
  }
  render(){
    if(this.state.waiting)
    return (
      <ImageBackground source={require('../assets/images/back.png')} style={styles.backgroundImage} >
            <View style={styles.headerContainer}>
              <Text
                category='h1'
                status = 'control'
                >
                Forgot Password
              </Text>
            </View>
            <View style={styles.formContainer}>
              <Input
                placeholder='OTP'
                value = {this.state.otp}
                onChangeText={(text) => this.setState({otp:text})}
              />
              <Input
                placeholder='New Password'
                value = {this.state.password}
                onChangeText={(text) => this.setState({password:text})}
              />
            </View>
            <Button
              size='giant'
              status = 'danger'
              style={styles.ForgotButton}
              onPress = {this.confirmPress}
              >
              Confirm
            </Button>
        </ImageBackground>
      );
    return (
      <ImageBackground source={require('../assets/images/back.png')} style={styles.backgroundImage} >
            <View style={styles.headerContainer}>
              <Text
                category='h1'
                status = 'control'
                >
                Forgot Password
              </Text>
              <Text
                style={styles.ForgotLabel}
                category='s1'
                status = 'control'
                >
                Enter your UserId
              </Text>
            </View>
            <View style={styles.formContainer}>
              <Input
                placeholder='UserId'
                value = {this.state.username}
                onChangeText={(text) => this.setState({username:text})}
              />
            </View>
            <Button
              style={styles.ForgotButton}
              size='giant'
              status = 'danger'
              onPress = {this.submitPress}
              >
              Submit
            </Button>
        </ImageBackground>
      );
  }
};

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
    minHeight: 150,
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 16,
    marginBottom : 150,
  },
  ForgotLabel: {
    marginTop: 16,
  },
  ForgotButton: {
    marginHorizontal: 16,
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
  },
});
