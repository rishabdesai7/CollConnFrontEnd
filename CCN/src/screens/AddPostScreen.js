import React from 'react';
import { StyleSheet, View, Alert,ImageBackground,AsyncStorage} from 'react-native';
import { Button, Input, Text, Layout} from '@ui-kitten/components';
import {loginUrl} from '../urls/urlgenerator'
import * as SecureStore from 'expo-secure-store';
import {
  EmailIconFill,
  EyeOffIconFill,
  EyeOnIconFill,
} from '../assets/icons/index';


export default class LoginScreen extends React.Component{
  render(){
    return (
      <Layout style = {{height:'100%'}}>
            <View style={styles.headerContainer}>
              <Text
                category='h1'
                >
                Post
              </Text>
            </View>
            <View style={styles.formContainer}>
              <Input
                placeholder='Title'
              />
              <Input
                placeholder='Text'
                multiline = {true}
              />
            </View>
            <Button
              style={styles.LogInButton}
              size='giant'
              status = 'danger'
              >
              Post
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
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
  },
});
