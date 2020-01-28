import React from 'react';
import { Layout,TopNavigation,List,ListItem,Button} from '@ui-kitten/components';
import { StyleSheet,AsyncStorage} from 'react-native';
import {HeartIconFill} from '../assets/icons/index'
import Post from '../Components/Post.component';
export default class ChannelScreen extends React.Component{
    /*temp */
    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
      };

    /**/

    data = new Array(10).fill({
        title: 'Title for Item',
        description: 'Description for Item',
      });
    renderItemAccessory = (style) => (
        <Button appearance='ghost' status='danger' icon={HeartIconFill} onPress={this._signOutAsync}/>
    );
    renderItem = ({ item, index }) => (
        <Post
          header={`${item.title} ${index + 1}`}
          text={`${item.description} ${index + 1}`}
          style = {{margin:10}}
        />
      );
    render(){
        return(
            <Layout>
                <TopNavigation
                    title='<channel Name>'
                    alignment='center'
                />
                <List
                    data={this.data}
                    renderItem={this.renderItem}
                />
            </Layout>
        );
    }
}
