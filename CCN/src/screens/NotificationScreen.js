import React from 'react';
import {Layout,List,ListItem,TopNavigation} from '@ui-kitten/components';
export default class MenuScreen extends React.Component{
    data = new Array(10).fill({
        title: 'Title for Item',
        description: 'Description for Item',
      });
    renderItem = ({ item, index }) => (
        <ListItem
        title={`${item.title} ${index + 1}`}
        description={`${item.description} ${index + 1}`}
    />
      );
    render(){
        return(
            <Layout style = {{width:'100%',height:'100%',paddingHorizontal:15,paddingTop:20}}>
                    <TopNavigation
                    title= 'NOTIFICATIONS'
                    alignment='center'
                    titleStyle = {{fontWeight:'bold',fontSize:20,lineHeight:40,marginHorizontal:30}}
                    />
                    <List
                        data={this.data}
                        renderItem={this.renderItem}
                        style = {{marginBottom:80}}
                    />
            </Layout>

        )
    }
}
