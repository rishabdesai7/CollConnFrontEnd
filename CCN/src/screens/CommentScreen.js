import React from 'react';
import { Layout,List,ListItem, Input, Button} from '@ui-kitten/components';
import {StyleSheet,View,Alert} from 'react-native';
import {PaperPlaneIconFill} from '../assets/icons/index';
import Constants from 'expo-constants';
import {AddComment,getComments} from '../urls/urlgenerator';
import * as SecureStore from 'expo-secure-store';
export default class CommentScreen extends React.Component{
  state = {
    comment:'',
    data:[],
  }
  data = new Array(5).fill({
    title: 'Title for Item',
    description: 'Description for Item',
  });
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
        <ListItem
          title={this.state.data[index].title}
          description={this.state.data[index].description}
          style={{backgroundColor:'#e6e6e6',margin:10,borderRadius:20,padding:2,}}
          titleStyle = {{fontWeight:'bold'}}
          descriptionStyle = {{color:'#000000'}}
        />
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
            style={{backgroundColor:'#ffffff'}}
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
});

