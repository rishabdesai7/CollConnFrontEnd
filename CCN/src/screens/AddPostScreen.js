import React from 'react';
import { StyleSheet, View, Alert} from 'react-native';
import { Button, Input, Text, Layout} from '@ui-kitten/components';
import {ImageIconOutline,AttachIconOutline} from '../assets/icons/index';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';
import {AddPost} from '../urls/urlgenerator';


export default class AddPostScreen extends React.Component{

    state = {
      acc_type : this.props.navigation.state.params.type,
      title:'',
      description:'',
      image:'',
      file:'',
      channel:this.props.navigation.state.params.channel,
    }
    _pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        if(!result.cancelled)
          this.setState({file:result.uri});
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        });
        if (!result.cancelled) {
        this.setState({ image: result.uri });
        }
    }
    submit = async()=>{
      try{
          var data = new FormData();
          data.append('channelName',this.state.channel);
          data.append('title',this.state.title);
          data.append('description',this.state.description);
          if(this.state.acc_type == 'F'){
            if(this.state.image != ''){
              const image = {
                uri : this.state.image,             
                name:'my_photo.png',           
                type: 'image/jpg'            
              }
              data.append('my_photo',image);
            }
            if(this.state.file != ''){
              var mime = this.state.file.split('.');
              var type = mime[mime.length-1];
              switch(type){
                case 'doc':
                  mime = 'application/msword'
                  break;
                case 'docx':
                  mime = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                  break;
                case 'xls':
                  mime = 'application/vnd.ms-excel'
                  break;
                case 'xlsx':
                  mime = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                  break;
                case 'ppt':
                  mime = 'application/vnd.ms-powerpoint'
                  break;
                case 'pptx':
                  mime = 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
                  break;
                case 'pdf':
                  mime = 'application/pdf'
                  break;
                case '3gp':
                  mime = 'video/3gpp'
                  break;
                case 'mp3':
                  mime = 'video/mp3'
                  break;
                case 'mp4':
                  mime = 'video/mp4'
                  break;
                default:
                  Alert.alert("Format not supported!!!");
                  break;
              }
              const file = {
                uri : this.state.file,            
                name:'my_file.'+type,            
                type: mime           
              }
              data.append('my_file',file);
          }
          }
          var resp = await fetch(AddPost(),
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
                Alert.alert("Posted Successfully!!!")
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
      catch(ex){console.log(ex)}
    }
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
                    style={styles.input}
                    value = {this.state.title}
                    onChangeText = {(val)=>{this.setState({title:val})}}
                />
                <Input
                    placeholder='Text'
                    multiline = {true}
                    size='large'
                    style = {[styles.input,{borderRadius:20}]}
                    value = {this.state.description}
                    onChangeText = {(val)=>{this.setState({description:val})}}
                />
                </View>
                {(this.state.acc_type == 'F')?(
                <View style = {{flexDirection:'row'}}>
                    <Button appearance='ghost' style = {{flex:1}} onPress={this._pickImage} icon = {ImageIconOutline}/>
                    <Button appearance='ghost' style = {{flex:1}} onPress={this._pickDocument}icon = {AttachIconOutline}/>
                </View>):null}
                <Button
                style={styles.LogInButton}
                size='giant'
                status = 'danger'
                onPress = {this.submit}
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
