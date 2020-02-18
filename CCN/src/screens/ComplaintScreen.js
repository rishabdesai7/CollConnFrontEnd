import React from 'react';
import { StyleSheet, View,Picker,Alert} from 'react-native';
import { Button, Input, Text, Layout,Select} from '@ui-kitten/components';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';
import {AddComplaint} from '../urls/urlgenerator';
export default class CreateChannelScreen extends React.Component{
    state={
      name:'',
      type:'P',
      issue:'',
    }
    submit = async()=>{
      var data = new FormData();
      if(this.state.type == 'P'){
        data.append('idp',this.state.name);
        data.append('name','');
      }
      else{
        data.append('idp','');
        data.append('name',this.state.name);
      }
      data.append('issue',this.state.issue);
      var resp = await fetch(AddComplaint(),
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
                    Report
                </Text>
                </View>
                <View style={styles.formContainer}>
                <Input
                    placeholder={(this.state.type=='P')?'Id':'Name'}
                    style={styles.input}
                    value = {this.state.name}
                    onChangeText = {(val)=>{this.setState({name:val})}}
                />
                <Input
                    placeholder='Issue'
                    multiline = {true}
                    size='large'
                    style = {[styles.input,{borderRadius:20}]}
                    onChangeText = {(val)=>{this.setState({issue:val})}}
                    value = {this.state.issue}
                />
                </View>
                <Picker
                  selectedValue={this.state.type}
                  style={{height: 50, width: 100,marginHorizontal:20,backgroundColor:'#f2f2f2',marginVertical:20}}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({type: itemValue})}
                  >
                  <Picker.Item label="Person" value="P" />
                  <Picker.Item label="Channel" value="C" />
                </Picker>
                <Button
                style={styles.LogInButton}
                size='giant'
                status = 'danger'
                onPress={this.submit}
                >
                Report
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
    paddingHorizontal: 16,
  },
  LogInButton: {
    marginHorizontal: 16,
  },
  input: {
    marginTop: 16,
  },
});
