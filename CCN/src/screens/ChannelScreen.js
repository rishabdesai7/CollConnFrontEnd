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
        <ListItem
          title={`${item.title} ${index + 1}`}
          description={`${item.description} ${index + 1}`}
          style = {{margin:10,}}
          icon={HeartIconFill}
          accessory={this.renderItemAccessory}
        >
        </ListItem>
      );
    render(){
        return(
            <Layout>
                <TopNavigation
                    title='<channel Name>'
                    alignment='start'
                />
                <List
                    data={this.data}
                    renderItem={this.renderItem}
                />
            </Layout>
        );
    }
}
const styles = StyleSheet.create({
    headerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 32,
      minHeight: 150,
      width:'100%',
      height:'100%',
    },
    formContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 16,
    },
    LogInLabel: {
      marginTop: 16,
    },
    LogInButton: {
      marginHorizontal: 16,
    },
    forgotPasswordContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginBottom:200,
    },
    passwordInput: {
      marginTop: 16,
    },
    forgotPasswordButton: {
      paddingHorizontal: 0,
    },
    text: {
      margin: 8,
      textAlign:'center',
    },
    backgroundImage: {
      flex: 1,
      width: null,
      height: null,
    },
  });
  