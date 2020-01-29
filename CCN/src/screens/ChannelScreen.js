import React from 'react';
import { Layout,TopNavigation,List,Button,ButtonGroup} from '@ui-kitten/components';
import {HeartIconFill} from '../assets/icons/index'
import Post from '../Components/Post.component';
export default class ChannelScreen extends React.Component{

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
                    style ={{marginTop:25}}
                  />
                    <List
                        data={this.data}
                        renderItem={this.renderItem}
                    />
            </Layout>
        );
    }
}
