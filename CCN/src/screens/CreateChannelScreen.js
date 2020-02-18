import React from 'react';
import { StyleSheet, View,Picker} from 'react-native';
import { Button, Input, Text, Layout,Select} from '@ui-kitten/components';
import Constants from 'expo-constants';
import {AddChannel} from '../urls/urlgenerator';
import * as SecureStore from 'expo-secure-store';
export default class CreateChannelScreen extends React.Component{
    state={
      name:'',
      description:'',
      type:'U',
    }
    submit = async()=>{
      var data = new FormData();
      data.append('name',this.state.name);
      data.append('description',this.state.description);
      data.append('type',this.state.type);
      var resp = await fetch(AddChannel(),
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
                    Create Channel
                </Text>
                </View>
                <View style={styles.formContainer}>
                <Input
                    placeholder='Name'
                    style={styles.input}
                    value = {this.state.name}
                    onChangeText = {(val)=>{this.setState({name:val})}}
                />
                <Input
                    placeholder='Description'
                    multiline = {true}
                    size='large'
                    style = {[styles.input,{borderRadius:20}]}
                    onChangeText = {(val)=>{this.setState({description:val})}}
                    value = {this.state.description}
                />
                </View>
                <Picker
                  selectedValue={this.state.type}
                  style={{height: 50, width: 100,marginHorizontal:20,backgroundColor:'#f2f2f2',marginVertical:20}}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({type: itemValue})}
                  >
                  <Picker.Item label="Public" value="U" />
                  <Picker.Item label="Private" value="R" />
                </Picker>
                <Button
                style={styles.LogInButton}
                size='giant'
                status = 'danger'
                onPress={this.submit}
                >
                Request Channel
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
