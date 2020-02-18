import React from 'react';
import { Layout,List,Text, Input, Button,Avatar} from '@ui-kitten/components';
import {StyleSheet,View,Alert} from 'react-native';
import {PaperPlaneIconFill} from '../assets/icons/index';
import Constants from 'expo-constants';
import {AddComment,getComments,uri} from '../urls/urlgenerator';
import * as SecureStore from 'expo-secure-store';
export default class CommentScreen extends React.Component{
  state = {
    comment:'',
    data:[],
  }
  async componentDidMount(){
    var resp = await fetch(getComments(this.props.navigation.state.params.id),{
      headers: {
        'Authorization': await SecureStore.getItemAsync('auth'),
      },
      method: 'GET',
    });
    switch(resp.status){
      case 200:
          resp = await resp.json();
          await this.setState({data:resp['data']});
          break;
      case 404:
          Alert.alert("Session expired.please logout and login again!");
          break;
      default:
           this.forceUpdate();
           break;
    }
  }
  renderItem = ({ item, index }) => (
    <View style = {{flexDirection:'row'}} >
       <Avatar
          style={styles.avatar}
          source={{uri:uri+this.state.data[index].image}}
      />
      <View style={styles.message}>
          <Text style={{fontWeight:'bold'}}>{this.state.data[index].title}</Text>
          <Text>{this.state.data[index].description}</Text>
      </View>
    </View>
    );
    comment = async()=>{
      var data = new FormData();
      data.append('comment',this.state.comment);
      data.append('id',this.props.navigation.state.params.id);
      var resp = await fetch(AddComment(),
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
        <Layout style = {{marginTop:30,padding:10,height:'100%'}}>
          <View style={styles.formContainer}>
              <Input
                placeholder='Comment'
                size='large'
                style = {styles.input}
                multiline={true}
                value = {this.state.comment}
                onChangeText = {(val)=>{this.setState({comment:val})}}
              />
              <Button 
                style={styles.button} 
                appearance='ghost' 
                icon={PaperPlaneIconFill}
                onPress = {this.comment}
              />
            </View>
            <List
            data={this.state.data}
            renderItem={this.renderItem}
            style={{backgroundColor:'#ffffff',marginBottom:15}}
          />
        </Layout>
      );
    }
}
const styles = StyleSheet.create({
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:Constants.statusBarHeight,
    paddingHorizontal: 16,
    flexDirection:'row',
  },
  input:{
    borderRadius:20,
    flex:100
  },
  button: {
    flex:1,
  },
  message:{
        marginVertical:10,
        height: 'auto', 
        width: 'auto',
        alignSelf: 'flex-start',
        backgroundColor:'#f2f2f2',
        borderRadius:12,
        padding:10,
        maxWidth:'80%',
    },
    avatar: {
      width: 40,
      height: 40,
      marginVertical:4,
      tintColor: null,
      marginRight:10,
      marginTop:10,
    },
});

