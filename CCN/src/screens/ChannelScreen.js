import React from 'react';
import { Layout,TopNavigation,List,Button,OverflowMenu,TopNavigationAction} from '@ui-kitten/components';
import {HeartIconFill,MoreVerticalIconFill,PersonAddIconFill,AssignIconFill} from '../assets/icons/index'
import Post from '../Components/Post.component';
import Constants from 'expo-constants';
export default class ChannelScreen extends React.Component{

    state ={
      menuVisible :false,
      channel:'College',
    }
    data = new Array(10).fill({
        title: 'Title for Item',
        description: 'Description for Item',
      });
    menuData = [
        {
          title: 'College',
        },
        {
          title: 'Canteen',
        },
        {
          title: 'Library',
        },
        {
          title: 'Placement',
        },
      ];
      toggleMenu = () => {
        (this.state.menuVisible)?this.setState({menuVisible:false}):this.setState({menuVisible:true});
      };
    
      onMenuItemSelect = (index) => {
        // Handle Item Select
    
        this.setState({menuVisible : false,channel:this.menuData[index].title});
      };
    renderMenuAction = () => (
        <OverflowMenu
          visible={this.state.menuVisible}
          data={this.menuData}
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
      <TopNavigationAction icon={PersonAddIconFill} onPress={()=>{this.props.navigation.navigate('AddPeople')}}/>
      //<View></View>
    );
    renderPostAction = () => (
      <TopNavigationAction icon={AssignIconFill} onPress={()=>{this.props.navigation.navigate('AddPost')}}/>
      //<View></View>
    );
    renderRightControls = ()=>{
      return [this.renderAddAction(),this.renderPostAction(),this.renderMenuAction()];
    }
    renderItemAccessory = (style) => (
        <Button appearance='ghost' status='danger' icon={HeartIconFill} onPress={this._signOutAsync}/>
    );
    renderItem = ({ item, index }) => (
        <Post
          header={`${item.title} ${index + 1}`}
          text={`${item.description} ${index + 1}`}
          style = {{margin:10}}
          commentAction = {()=>{this.props.navigation.navigate('Comment')}}
        />
      );
    render(){
        return(
            <Layout>
                <TopNavigation
                    title= {this.state.channel}
                    rightControls={this.renderRightControls()}
                    style ={{marginTop:Constants.statusBarHeight}}
                    titleStyle = {{fontWeight:'bold',fontSize:20,lineHeight:40,marginHorizontal:30}}
                  />
                  <List
                    data={this.data}
                    renderItem={this.renderItem}
                    style = {{marginBottom:100}}
                  />
            </Layout>
        );
    }
}
