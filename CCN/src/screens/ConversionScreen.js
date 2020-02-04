import React from 'react';
import {Layout,List,TopNavigation,Text,ListItem} from '@ui-kitten/components';
import {View,StyleSheet} from 'react-native';
import { ProfileAvatar } from '../Components/profile-avatar.component';
export default class MenuScreen extends React.Component{
    data = new Array(10).fill({
        Username: 'Username',
        lastmsg: 'Description for Item',
      });
    renderItem = ({ item, index }) =>(
        <Layout style = {{flexDirection:'row', borderBottomColor: 'grey',borderBottomWidth: 0.2}}>
            <ProfileAvatar
                style={styles.profileAvatar}
                source={require('../assets/images/profile.jpg')}
            />
            <View style={styles.label}>
                <Text category='h6'>{this.data[index].Username}</Text>
                <Text category='label'>{this.data[index].lastmsg}</Text>
            </View>
        </Layout>
    );
    render(){
        return(
            <Layout style = {{width:'100%',height:'100%',paddingHorizontal:15,paddingTop:20}}>
                    <TopNavigation
                    title= 'Conversation List'
                    alignment='center'
                    titleStyle = {{fontWeight:'200',fontSize:20,lineHeight:30,marginHorizontal:30}}
                    />
                    <List
                        data={this.data}
                        renderItem={this.renderItem}
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
});
  