import React from 'react';
import { StyleSheet, View, Alert} from 'react-native';
import { Button, Input, Text,Layout} from '@ui-kitten/components';
import {loginUrl} from '../urls/urlgenerator'
import * as SecureStore from 'expo-secure-store';


export default class LoginScreen extends React.Component{
  state = {
    username:'',
    password:'',
    status: '',
  };
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
              await SecureStore.deleteItemAsync('auth');
              await SecureStore.setItemAsync('auth', resp['auth']);
              Alert.alert('Logged In!');
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
      <Layout style={{width: '100%', height: '100%',flex: 1}}>
            <View style={styles.headerContainer}>
              <Text
                category='h1'
                >
                COLLCONN
              </Text>
              <Text
                style={styles.LogInLabel}
                category='s1'
                >
                Log in to your account
              </Text>
            </View>
            <View style={styles.formContainer}>
              <Input
                placeholder='UserId'
                value = {this.state.username}
                onChangeText={(text) => this.setState({username:text})}
              />
              <Input
                style={styles.passwordInput}
                placeholder='Password'
                secureTextEntry={true}
                value = {this.state.password}
                onChangeText={(text) => this.setState({password:text})}
              />
            </View>
            <View style={styles.forgotPasswordContainer}>
                <Button
                  style={styles.forgotPasswordButton}
                  appearance='ghost'
                  onPress = {()=>{this.props.navigation.navigate('ForgotPassword')}}
                >
                    Forgot your password?
                </Button>
            </View>
            <Text style={styles.text} status='danger'>{this.state.status}</Text>
            <Button
              style={styles.LogInButton}
              size='giant'
              onPress = {this.login}
              >
              LOGIN
            </Button>
        </Layout>
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
});
