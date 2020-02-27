import React from 'react';
import {Alert} from 'react-native';
import {Layout,TopNavigation,List,Button,OverflowMenu,TopNavigationAction} from '@ui-kitten/components';
import {HeartIconFill,MoreVerticalIconFill,PersonAddIconFill,AssignIconFill,info,deleteOutline} from '../assets/icons/index'
import Post from '../Components/Post.component';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';
import {getPost,DeleteChannel,ChannelList} from '../urls/urlgenerator';
import Pusher from 'pusher-js/react-native';





// Enable pusher logging - don't include this in production
//Pusher.logToConsole = true;

var pusher = new Pusher('e8318624f1b41157722f', {
  cluster: 'ap2',
  forceTLS: true
});
var channel = pusher.subscribe('post');
console.warn = (msg)=>{}

export default class ChannelScreen extends React.Component{
    state ={
      menuVisible :false,
      channel:'College',
      menuData : [],
      acc_type : 'S',
      data : [],
      margin:0,
    }
    update = (data)=>{
      if(data.channel == this.state.channel){
        this.componentDidMount();
      }
    }
    componentWillMount(){
      channel.bind('posted',this.update);
    }
    async componentDidMount(){
      var data = await SecureStore.getItemAsync('userData');
      data = await JSON.parse(data);
      this.setState({
        acc_type : data['accounttype'],
      });
      await this.getData(this.state.channel);
      var resp = await fetch(ChannelList(), {
        headers: {
          'Authorization': await SecureStore.getItemAsync('auth'),
        },
        method: 'GET',
      });
      switch(resp.status){
        case 200:
            resp = await resp.json();
            this.setState({menuData:resp['data']})
            break;
        case 404:
            Alert.alert("Session expired.please logout and login again!");
            break;
        default:
             this.forceUpdate();
             break;
      }
      this.props.navigation.addListener("didFocus", async() =>{
        await this.getData(this.state.channel);
        var resp = await fetch(ChannelList(), {
          headers: {
            'Authorization': await SecureStore.getItemAsync('auth'),
          },
          method: 'GET',
        });
        switch(resp.status){
          case 200:
              resp = await resp.json();
              this.setState({menuData:resp['data']})
              break;
          case 404:
              Alert.alert("Session expired.please logout and login again!");
              break;
          default:
               this.forceUpdate();
               break;
        }
      });
    }
    getData = async(channel)=>{
      var resp = await fetch(getPost(channel),{
        headers: {
          'Authorization': await SecureStore.getItemAsync('auth'),
        },
        method: 'GET',
      });
      switch(resp.status){
        case 200:
            resp = await resp.json();
            await this.setState({data:resp['data'],margin:100});
            break;
        case 404:
            Alert.alert("Session expired.please logout and login again!");
            break;
        default:
             this.forceUpdate();
             break;
      }

    }
    toggleMenu = () => {
        (this.state.menuVisible)?this.setState({menuVisible:false}):this.setState({menuVisible:true});
      };
    
    onMenuItemSelect = async (index) => {
        // Handle Item Select
        await this.getData(this.state.menuData[index].title);
        this.setState({menuVisible : false,channel:this.state.menuData[index].title});
      };
    renderMenuAction = () => (
        <OverflowMenu
          visible={this.state.menuVisible}
          data={this.state.menuData}
          onSelect={this.onMenuItemSelect}
          onBackdropPress={this.toggleMenu}
          style = {{marginTop:30,}}
        >
          <TopNavigationAction
            icon={MoreVerticalIconFill}
            onPress={this.toggleMenu}
          />
        </OverflowMenu>
      );
    renderAddAction = () => (
      <TopNavigationAction icon={PersonAddIconFill} onPress={()=>{this.props.navigation.navigate('AddPeople',{channel:this.state.channel})}}/>
      //<View></View>
    );
    renderPostAction = () => (
      <TopNavigationAction icon={AssignIconFill} onPress={()=>{this.props.navigation.navigate('AddPost',{type:this.state.acc_type,channel:this.state.channel})}}/>
      //<View></View>
    );
    renderRightControls = ()=>{
      if(this.state.acc_type == 'F')
        return [this.renderAddAction(),this.renderPostAction(),this.renderMenuAction()];
      else
        return [this.renderPostAction(),this.renderMenuAction()];
    }
    renderLeftControl = ()=>{
      if(this.state.acc_type == 'F')
        return (
          <TopNavigationAction 
            icon = {deleteOutline} 
            onPress={async()=>{
              var resp = await fetch(DeleteChannel(this.state.channel), {
                headers: {
                  'Authorization': await SecureStore.getItemAsync('auth'),
                },
                method: 'GET',
              });
              switch(resp.status){
                case 200:
                    this.setState({channel:'College'});
                    this.componentDidMount();
                    break;
                case 404:
                    Alert.alert("Session expired.please logout and login again!");
                    break;
                default:
                    this.setState({channel:'College'});
                    this.componentDidMount();
                    break;
              }
            }}
          />)
    }
    renderItemAccessory = (style) => (
        <Button appearance='ghost' status='danger' icon={HeartIconFill} onPress={this._signOutAsync}/>
    );
    renderItem = ({ item, index }) =>{
      var date = new Date(this.state.data[index].date_posted).toString().slice(0,21);
      return (
        <Post
          by = {this.state.data[index].by}
          date = {date}
          title={this.state.data[index].title}
          description={this.state.data[index].description}
          image = {this.state.data[index].image}
          style = {{margin:10}}
          file = {this.state.data[index].files}
          commentAction = {()=>{this.props.navigation.navigate('Comment',{id:this.state.data[index].id})}}
        />
    );
    } 
    render(){
        return(
            <Layout>
                <TopNavigation
                    title= {this.state.channel}
                    rightControls={this.renderRightControls()}
                    style ={{marginTop:Constants.statusBarHeight}}
                    leftControl = {this.renderLeftControl()}
                    titleStyle = {{fontWeight:'bold',fontSize:20,lineHeight:40,marginHorizontal:30}}
                  />
                  <List
                    data={this.state.data}
                    renderItem={this.renderItem}
                    style = {{marginBottom:this.state.margin}}
                  />
            </Layout>
        );
    }
}
