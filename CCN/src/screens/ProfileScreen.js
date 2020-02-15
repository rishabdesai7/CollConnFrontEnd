import React from 'react';
import { StyleSheet,ScrollView,Alert} from 'react-native';
import { Button, Layout, TopNavigation} from '@ui-kitten/components';
import { ProfileAvatar } from '../Components/profile-avatar.component';
import { ProfileSetting } from '../Components/profile-setting.component';
import {CameraIconFill} from '../assets/icons/index'
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';
import {uri,profilePicUpload} from '../urls/urlgenerator';
import * as ImagePicker from 'expo-image-picker';


export default class ProfileScreen extends React.Component{
    state = {
      name:'',
      id:'',
      type:'',
      email:'',
      profilepic:require('../assets/images/profile.jpg'),
    }
    async componentDidMount(){
      try{
        var data = await SecureStore.getItemAsync('userData');
        data = await JSON.parse(data)
        this.setState({
          name:data['name'],
          id : data['id'],
          type : data['accounttype'],
          email:data['email'],
          profilepic:{uri:uri+data['image']},
        });
      }
      catch(e){
        console.log(e)
      }
    }
    _pickImage = async () => {
      try{
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
          });
          var data = new FormData();
          data.append('my_photo', {
            uri: result.uri, // your file path string
            name: 'my_photo.png',
            type: 'image/png'
          });
          var resp = await fetch(profilePicUpload(), {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'multipart/form-data',
              'Authorization': await SecureStore.getItemAsync('auth'),
            },
            method: 'POST',
            body: data
          });
          switch(resp.status){
            case 200:
                resp = await resp.json();
                this.setState({profilepic:{uri:uri+resp['image']}});
                var temp = await SecureStore.getItemAsync('userData'); 
                temp = await JSON.parse(temp);
                temp.image = resp['image'];
                temp = await JSON.stringify(temp);
                await SecureStore.setItemAsync('userData',temp);
                break;
            case 404:
                Alert.alert("Session expired.please logout and login again!");
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
  renderPhotoButton = ()=> (
        <Button
          style={styles.editAvatarButton}
          status='basic'
          icon={CameraIconFill}
          onPress = {this._pickImage}
        />);
    render(){
        return(
            <Layout
                    style={styles.container}
                    level='2'>
                    <TopNavigation
                        alignment='center'
                        title='Profile'
                        style ={[styles.header,{marginTop:Constants.statusBarHeight}]}
                    />
                    <ProfileAvatar
                        style={styles.profileAvatar}
                        source={this.state.profilepic}
                        //source = {{uri: this.state.profilepic}}
                        editButton={this.renderPhotoButton}
                    />
                    <ScrollView>
                    <ProfileSetting
                        style={[styles.profileSetting, styles.section]}
                        hint='ID'
                        value={this.state.id}
                    />
                    <ProfileSetting
                        style={styles.profileSetting}
                        hint='Name'
                        value= {this.state.name}
                    />
                    <ProfileSetting
                        style={styles.profileSetting}
                        hint='Account Type'
                        value={this.state.type}
                    />
                    <ProfileSetting
                        style={[styles.profileSetting, styles.section]}
                        hint='Email'
                        value= {this.state.email}
                    />
                    </ScrollView>
            </Layout>
        );
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: 24,
  },
  profileAvatar: {
    aspectRatio: 1.0,
    height: 124,
    alignSelf: 'center',
    margin:10,
  },
  editAvatarButton: {
    aspectRatio: 1.0,
    height: 48,
    borderRadius: 24,
  },
  profileSetting: {
    padding: 16,
  },
  section: {
    marginTop: 24,
  },
  doneButton: {
    margin: 24,
  },
});
