import React from 'react';
import { Layout,Button} from '@ui-kitten/components';
import {AsyncStorage} from 'react-native';
export default class ProfileScreen extends React.Component{
    /*temp */
    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
      };

    /**/
    render(){
        return(
            <Layout>
                <Button style = {{margin:40}} onPress = {this._signOutAsync}>Temp Logout</Button>
            </Layout>
        );
    }
}