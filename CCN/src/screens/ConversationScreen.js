import React from 'react';
import {Layout,List,TopNavigation,Divider,ListItem,Avatar,TopNavigationAction} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import {SearchIconOutline} from '../assets/icons/index';
import Constants from 'expo-constants';
export default class ConversationScreen extends React.Component{
    data = new Array(10).fill({
        Username: 'Username',
        lastmsg: 'Description for Item',
      });
    renderProfileAvatar = () => (
        <Avatar
          style={styles.avatar}
          source={require('../assets/images/profile.jpg')}
        />
      );
    renderItem = ({ item, index }) => (
        <ListItem
            title={`${item.Username} ${index + 1}`}
            description={`${item.lastmsg} ${index + 1}`}
            icon = {this.renderProfileAvatar}
            titleStyle ={{fontWeight:'bold'}}
            style = {{borderBottomWidth: 1,borderBottomColor: '#f2f2f2',height:70}}
            onPress= {()=>{this.props.navigation.navigate('Message')}}
        />
    );
    renderSearchAction = () => (
      <TopNavigationAction icon={SearchIconOutline} onPress={()=>{this.props.navigation.navigate('Search')}}/>
      //<View></View>
    );
    render(){
        return(
            <Layout style = {{width:'100%',height:'100%',paddingHorizontal:15,paddingTop:Constants.statusBarHeight}}>
                    <TopNavigation
                      title= 'Conversations'
                      alignment='center'
                      titleStyle = {{fontWeight:'200',fontSize:20,lineHeight:30,marginHorizontal:30}}
                      rightControls = {this.renderSearchAction()}
                    />
                    <Divider/>
                    <List
                        data={this.data}
                        renderItem={this.renderItem}
                        style = {{backgroundColor:'white'}}
                    />
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
      marginVertical:5,
      marginLeft:2,
      borderRadius:40,
    },
    label: {
        alignSelf: 'center',
        flex:8,
      },
    avatar: {
        width: 40,
        height: 40,
        marginLeft:2,
        tintColor: null,
      },
});
  