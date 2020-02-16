import React from 'react';
import {View,StyleSheet,TouchableOpacity,AsyncStorage} from 'react-native'
import {Layout,Text,List,ListItem} from '@ui-kitten/components';
import { ProfileAvatar } from '../Components/profile-avatar.component';
import {logout} from '../urls/urlgenerator'
import {PlusIconFill,LogoutIconOutline,AlertIconOutline,BellIconOutline} from '../assets/icons/index';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';
import {uri} from '../urls/urlgenerator';
export default class MenuScreen extends React.Component{
    state = {
        name:'',
        profilepic:require('../assets/images/profile.jpg'),
        data : [
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
                onpress: async () => {
                    fetch(logout(), { 
                        method: 'get', 
                        headers: new Headers({
                        'Authorization': await SecureStore.getItemAsync('auth'),
                        }), 
                    });
                    await AsyncStorage.clear();
                    await SecureStore.deleteItemAsync('auth');
                    await SecureStore.deleteItemAsync('userData');
                    this.props.navigation.navigate('Auth');
                },
                icon:LogoutIconOutline,
            }
        ]
      }
    componentDidMount(){
        this.props.navigation.addListener("didFocus", async() => {
            // user has navigated to this screen
            try{
                var temp = await SecureStore.getItemAsync('userData');
                temp = await JSON.parse(temp);
                if(temp['accounttype'] == 'S')
                    this.setState({
                    name:temp['name'],
                    profilepic:{uri:uri+temp['image']},
                    });
                else
                    this.setState({
                        name:temp['name'],
                        profilepic:{uri:uri+temp['image']},
                        data:[
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
                                onpress: async () => {
                                        fetch(logout(), { 
                                            method: 'get', 
                                            headers: new Headers({
                                            'Authorization': await SecureStore.getItemAsync('auth'),
                                            }), 
                                        });
                                        await AsyncStorage.clear();
                                        await SecureStore.deleteItemAsync('auth');
                                        await SecureStore.deleteItemAsync('userData');
                                        this.props.navigation.navigate('Auth');
                                    },
                                icon:LogoutIconOutline,
                            }
                        ],
                    });
              }
              catch(e){
                console.log(e)
              }
        });
    }
    /*_signOutAsync = async () => {
        fetch(logout(), { 
            method: 'get', 
            headers: new Headers({
              'Authorization': await SecureStore.getItemAsync('auth'),
            }), 
        });
        await AsyncStorage.clear();
        await SecureStore.deleteItemAsync('auth');
        await SecureStore.deleteItemAsync('userData');
        this.props.navigation.navigate('Auth');
    }; have put it in arry!!!!!*/
    renderItem = ({ item, index }) => (
        <ListItem
            title={`${item.title}`}
            onPress = {(index,event)=>{this.state.data[index].onpress()}}
            titleStyle ={{fontWeight:'bold',fontSize:15}}
            icon = {item.icon}
            style={{height:50}}
        />
      );
    render(){
        return(
            <Layout style = {{width:'100%',height:'100%',paddingHorizontal:15}}>
                <TouchableOpacity onPress =  {()=>{this.props.navigation.navigate('Profile')}}>
                    <View style = {{flexDirection:'row',marginTop:Constants.statusBarHeight, borderBottomColor: '#cccccc',borderBottomWidth: 1,}}>
                        <ProfileAvatar
                            style={styles.profileAvatar}
                            source={this.state.profilepic}
                        />
                        <View style={styles.label}>
                            <Text  category='h4'>{this.state.name}</Text>
                            <Text category='label'>My Profile</Text>
                        </View>
                    </View>
                    <List
                        data={this.state.data}
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
  