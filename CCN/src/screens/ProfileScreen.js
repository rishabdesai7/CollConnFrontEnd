import React from 'react';
import { StyleSheet,View,ScrollView,AsyncStorage } from 'react-native';
import { Button, Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { ProfileAvatar } from '../Components/profile-avatar.component';
import { ProfileSetting } from '../Components/profile-setting.component';
import {CameraIconFill} from '../assets/icons/index'


export default class ProfileScreen extends React.Component{
    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
      };
    renderPhotoButton = ()=> (
        <Button
          style={styles.editAvatarButton}
          status='basic'
          icon={CameraIconFill}
        />);
    render(){
        return(
            <Layout
                    style={styles.container}
                    level='2'>
                    <TopNavigation
                        alignment='center'
                        title='Profile'
                        style ={[styles.header,{marginTop:25}]}
                    />
                    <ProfileAvatar
                        style={styles.profileAvatar}
                        source={require('../assets/images/profile.jpg')}
                        editButton={this.renderPhotoButton}
                    />
                    <ScrollView>
                    <ProfileSetting
                        style={[styles.profileSetting, styles.section]}
                        hint='First Name'
                        value='{profile.firstName}'
                    />
                    <ProfileSetting
                        style={styles.profileSetting}
                        hint='Last Name'
                        value='{profile.lastName}'
                    />
                    <ProfileSetting
                        style={styles.profileSetting}
                        hint='Gender'
                        value='{profile.gender}'
                    />
                    <ProfileSetting
                        style={[styles.profileSetting, styles.section]}
                        hint='Email'
                        value='{profile.email}'
                    />
                    <ProfileSetting
                        style={styles.profileSetting}
                        hint='Phone Number'
                        value='{profile.phoneNumber}'
                    />
                   <View style = {{flexDirection:'row',margin:24}}>
                    <Button size = 'giant' style = {{flex:1,marginRight:5}} onPress = {()=>{this.props.navigation.navigate('Create')}}>Channel+</Button>
                    <Button size='giant' style = {{flex:1,marginLeft:5}} onPress={this._signOutAsync}>Logout</Button>
                    </View>
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
