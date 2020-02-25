import React from 'react';
import {Layout,List,ListItem,TopNavigation,Button} from '@ui-kitten/components';
import Constants from 'expo-constants';
import {checkMarkOutline,closeOutline} from '../assets/icons/index';
import {invitationList,processInvitation} from '../urls/urlgenerator';
import * as SecureStore from 'expo-secure-store';
export default class InvitationScreen extends React.Component{
    state = {
        data : [],
    }
    async componentDidMount(){
        var resp = await fetch(invitationList(), {
            headers: {
              'Authorization': await SecureStore.getItemAsync('auth'),
            },
            method: 'GET',
          });
          switch(resp.status){
            case 200:
                resp = await resp.json();
                this.setState({data:resp['data']})
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
        title={`${item.title}`}
        description={`${item.description}`}
        accessory={this.renderItemAccessory}
        titleStyle = {{fontWeight:'bold',fontSize:20}}
    />
    );
    renderItemAccessory = (style,index) => (
        <Layout style = {{flexDirection:'row'}}>
            <Button status='success' icon = {checkMarkOutline} appearance='ghost' onPress={()=>{this.process(index,'y')}}/>
            <Button status='danger' icon = {closeOutline} appearance = 'ghost' onPress={()=>{this.process(index,'n')}}/>
        </Layout>
    );
    process = async(index,accepted)=>{
        var data = new FormData();
        data.append('channel',this.state.data[index].title);
        data.append('accepted',accepted);
        var resp = await fetch(processInvitation(),
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
              this.componentDidMount();
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
        return(
            <Layout style = {{width:'100%',height:'100%',paddingHorizontal:15,paddingTop:Constants.statusBarHeight}}>
                    <TopNavigation
                    title= 'Invitations'
                    alignment='center'
                    titleStyle = {{fontWeight:'bold',fontSize:20,lineHeight:40,marginHorizontal:30}}
                    />
                    <List
                        data={this.state.data}
                        renderItem={this.renderItem}
                        style = {{marginBottom:10,backgroundColor:'#ffffff'}}
                    />
            </Layout>

        )
    }
}
