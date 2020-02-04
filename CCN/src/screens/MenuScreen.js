import React from 'react';
import {View,StyleSheet,TouchableOpacity,AsyncStorage} from 'react-native'
import {Layout,Text,List,ListItem} from '@ui-kitten/components';
import { ProfileAvatar } from '../Components/profile-avatar.component';
import {PlusIconFill,LogoutIconOutline,AlertIconOutline,BellIconOutline} from '../assets/icons/index';
export default class MenuScreen extends React.Component{
    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
      };
    data = [
        {
            title: 'Add Channel',
            onpress: ()=>{this.props.navigation.navigate('Create')},
            icon:PlusIconFill,
        },
        {
            title: 'Report',
            onpress: ()=>{this.props.navigation.navigate('Report')},
            icon:AlertIconOutline,
        },
        {
            title: 'Notifications',
            onpress:()=>{this.props.navigation.navigate('Notification')},
            icon:BellIconOutline,
        },
        {
            title: 'Logout',
            onpress: this._signOutAsync,
            icon:LogoutIconOutline,
        }
    ]
    renderItem = ({ item, index }) => (
        <ListItem
            title={`${item.title}`}
            onPress = {(index,event)=>{this.data[index].onpress()}}
            titleStyle ={{fontWeight:'bold',fontSize:15}}
            icon = {item.icon}
            style={{height:50}}
        />
      );
    render(){
        return(
            <Layout style = {{width:'100%',height:'100%',paddingHorizontal:15}}>
                <TouchableOpacity onPress =  {()=>{this.props.navigation.navigate('Profile')}}>
                    <View style = {{flexDirection:'row',marginTop:20, borderBottomColor: 'grey',borderBottomWidth: 1,}}>
                        <ProfileAvatar
                            style={styles.profileAvatar}
                            source={require('../assets/images/profile.jpg')}
                        />
                        <View style={styles.label}>
                            <Text  category='h4'>User name</Text>
                            <Text category='label'>My Profile</Text>
                        </View>
                    </View>
                    <List
                        data={this.data}
                        renderItem={this.renderItem}
                        style = {{marginBottom:80}}
                    />
                </TouchableOpacity>
            </Layout>

        )
    }
}
const styles = StyleSheet.create({
    profileAvatar: {
      aspectRatio: 1.0,
      alignSelf: 'flex-start',
      flex:2,
      margin:10,
      marginLeft:2,
    },
    label: {
        margin: 8,
        alignSelf: 'center',
        flex:8,
      },
  });
  