import React from 'react';
import {Layout,List,Divider,ListItem,Avatar,Input} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
export default class ConversationSearchScreen extends React.Component{
    state ={
        searchText:'',
        data : [ { Username: 'rishab', lastmsg: 'Description for Item' },
        { Username: 'snabith', lastmsg: 'Description for Item' },
        { Username: 'kiranmayee', lastmsg: 'Description for Item' }],
        condata: [ { Username: 'rishab', lastmsg: 'Description for Item' },
        { Username: 'snabith', lastmsg: 'Description for Item' },
        { Username: 'kiranmayee', lastmsg: 'Description for Item' }],
    }
    search = async(searchString)=>{
        await this.setState({searchText:searchString,data:this.state.condata});
        if (searchString && searchString.length) {
            const query = searchString.toUpperCase();
            const items = this.state.data
              .filter((item) => {
                const name = `${item.Username}`.toUpperCase();
                return name.includes(query);
              });
            this.setState({data: items });
          } else {
            this.setState({data:this.state.condata});
          }
    }
    renderProfileAvatar = () => (
        <Avatar
          style={styles.avatar}
          source={require('../assets/images/profile.jpg')}
        />
      );
    renderItem = ({ item, index }) => (
        <ListItem
            title={`${item.Username}`}
            description={`${item.lastmsg} ${index + 1}`}
            icon = {this.renderProfileAvatar}
            titleStyle ={{fontWeight:'bold'}}
            style = {{borderBottomWidth: 1,borderBottomColor: '#f2f2f2',height:70}}
            onPress= {()=>{this.props.navigation.navigate('Message')}}
        />
    );
    render(){
        return(
            <Layout style = {{width:'100%',height:'100%',paddingTop:20}}>
                    <Input 
                        style={styles.input}
                        value={this.state.searchText}
                        onChangeText={this.search}
                    />
                    <List
                        data={this.state.data}
                        renderItem={this.renderItem}
                        style = {{backgroundColor:'white',marginHorizontal:15}}
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
    input:{
        marginTop:20,
        borderRadius:20,
        padding:5,
    }
});
  