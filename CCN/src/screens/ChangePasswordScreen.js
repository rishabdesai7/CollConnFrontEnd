import React from 'react';
import { StyleSheet, View,Alert} from 'react-native';
import { Button, Input, Text, Layout,Select} from '@ui-kitten/components';
import Constants from 'expo-constants';
import {ChangePassword} from '../urls/urlgenerator';
import * as SecureStore from 'expo-secure-store';
export default class CreateChannelScreen extends React.Component{
    state={
      pwd:''
    }
    submit = async()=>{
      var data = new FormData();
      data.append('pwd',this.state.pwd);
      var resp = await fetch(ChangePassword(),
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          'Authorization': await SecureStore.getItemAsync('auth'),
        },
        method:'POST',
        body: data
      });
      switch(resp.status){
        case 200:
            Alert.alert("Password Changed Successfully!");
            this.props.navigation.goBack();
            break;
        case 404:
            Alert.alert("Session expired.please logout and login again!");
            break;
        default:
             Alert.alert('OOPSY!Please try Again');
             break;
      }
    }
    render(){
        return (
        <Layout style = {{height:'100%'}}>
                <View style={styles.headerContainer}>
                <Text
                    category='h1'
                    >
                    Reset Password
                </Text>
                </View>
                <View style={styles.formContainer}>
                <Input
                    placeholder='New Password'
                    style={styles.input}
                    value = {this.state.pwd}
                    onChangeText = {(val)=>{this.setState({pwd:val})}}
                />
                </View>
                <Button
                style={styles.LogInButton}
                size='giant'
                status = 'danger'
                onPress={this.submit}
                >
                Reset
                </Button>
            </Layout>
        );
  }
};

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Constants.statusBarHeight,
    minHeight: 150,
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom:40,
    paddingHorizontal: 16,
  },
  LogInButton: {
    marginHorizontal: 16,
  },
  input: {
    marginTop: 16,
  },
});
