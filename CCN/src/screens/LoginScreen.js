import React from 'react';
import { StyleSheet, View, Alert,ImageBackground,AsyncStorage} from 'react-native';
import { Button, Input, Text} from '@ui-kitten/components';
import {loginUrl} from '../urls/urlgenerator'
import * as SecureStore from 'expo-secure-store';
import {
  EmailIconFill,
  EyeOffIconFill,
  EyeOnIconFill,
} from '../assets/icons/index';
import * as FileSystem from 'expo-file-system';


export default class LoginScreen extends React.Component{
  state = {
    username:'',
    password:'',
    status: '',
    icon:EyeOffIconFill,
    visibility:true,
  };
  toggleVisibility = ()=>{
    this.state.visibility?this.setState({icon:EyeOnIconFill,visibility:false}):this.setState({icon:EyeOffIconFill,visibility:true});
  }
  login = async ()=>{
    try{
      let formData = new FormData();
      formData.append('id',this.state.username);
      formData.append('pwd', this.state.password);
      var resp = await fetch(loginUrl(),
        {
            body: formData,
            method: "post"
        });
        switch(resp.status){
          case 200:
              resp = await resp.json();
              await SecureStore.setItemAsync('auth', resp['auth']);
              await SecureStore.setItemAsync('userData',JSON.stringify(resp['data']))
              await AsyncStorage.setItem('userToken', 'abc');
              this.props.navigation.navigate('App');
              break;
          case 403:
              Alert.alert("Please activate your account using the link sent to your registered email!");
              break;
          case 400:
          case 401:
              this.setState({status:'Invalid Username or Password!'});
              break;
          default:
               Alert.alert('OOPSY!Please try Again');
               break;
        }
    }
    catch(ex){
      console.log(''+ex);
    }
  }
  render(){
    return (
      <ImageBackground source={require('../assets/images/back.png')} style={styles.backgroundImage} >
            <View style={styles.headerContainer}>
              <Text
                category='h1'
                status = 'control'
                >
                COLLCONN
              </Text>
              <Text
                style={styles.LogInLabel}
                category='s1'
                status = 'control'
                >
                Log in to your account
              </Text>
            </View>
            <View style={styles.formContainer}>
              <Input
                placeholder='UserId'
                value = {this.state.username}
                onChangeText={(text) => this.setState({username:text})}
                icon = {EmailIconFill}
              />
              <Input
                style={styles.passwordInput}
                placeholder='Password'
                secureTextEntry={this.state.visibility}
                value = {this.state.password}
                onChangeText={(text) => this.setState({password:text})}
                icon = {this.state.icon}
                onIconPress = {this.toggleVisibility}
              />
            </View>
            <View style={styles.forgotPasswordContainer}>
                <Button
                  style={styles.forgotPasswordButton}
                  appearance='ghost'
                  onPress = {()=>{this.props.navigation.navigate('ForgotPassword')}}
                  status = 'control'
                >
                    Forgot your password?
                </Button>
            </View>
            <Text style={styles.text} status='danger'>{this.state.status}</Text>
            <Button
              style={styles.LogInButton}
              size='giant'
              onPress = {this.login}
              status = 'danger'
              >
              LOGIN
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
  },
  LogInLabel: {
    marginTop: 16,
  },
  LogInButton: {
    marginHorizontal: 16,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom:200,
  },
  passwordInput: {
    marginTop: 16,
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
  text: {
    margin: 8,
    textAlign:'center',
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
  },
});
