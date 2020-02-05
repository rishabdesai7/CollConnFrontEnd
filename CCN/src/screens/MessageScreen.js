import React from 'react';
import {Layout,List,TopNavigation,Input,Text,Button,Divider,TopNavigationAction,Avatar} from '@ui-kitten/components';
import {View,StyleSheet,KeyboardAvoidingView} from 'react-native';
import {sendIconFill} from '../assets/icons/index';
export default class MessageScreen extends React.Component{
    state={
        data : [
            {
                msg:'example',
                dir:'left',
                time:'Wed Feb 05 2020 19:41'
            },
            {
                msg:'example',
                dir:'left',
                time:'Wed Feb 05 2020 19:41'
            },
            {
                msg:'example',
                dir:'right',
                time:'Wed Feb 05 2020 19:41'
            },
            {
                msg:'example',
                dir:'left',
                time:'Wed Feb 05 2020 19:41'
            },
            {
                msg:'example',
                dir:'right',
                time:'Wed Feb 05 2020 19:41'
            },
            {
                msg:'example',
                dir:'left',
                time:'Wed Feb 05 2020 19:41'
            },
        ],
        message:'',
    }
    renderProfileAvatar = () => (
        <Avatar
          style={styles.avatar}
          source={require('../assets/images/profile.jpg')}
        />
    );
    renderProfileAction = () => (
        <TopNavigationAction icon={this.renderProfileAvatar}/>
      );
    renderItem = ({ item, index }) =>{
        if(item.dir == 'left')
            return (
                <View style={{flexDirection:'row'}}>
                    <View style={styles.message}>
                        <Text>{`${item.msg} ${index + 1}`}</Text>
                    </View>
                    <View style={styles.date}>
                        <Text style={{color:'#808080'}}>{`${item.time}`}</Text>
                    </View>
                </View>
              );
        else
            return(
                <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                    <View style={styles.date}>
                        <Text style={{textAlign: 'right',color:'#808080'}}>{`${item.time}`}</Text>
                    </View>
                    <View style={[styles.message,{backgroundColor:'#0078FF', borderTopLeftRadius:12,borderTopRightRadius:0,}]}>
                        <Text style={{color:'white'}}>{`${item.msg}`}</Text>
                    </View>
                </View>
              );
    } 
    sendPress = ()=>{
        var temp = this.state.data;
        var tempmsg ={
            msg:this.state.message,
            dir:'right',
            time: new Date().toString().slice(0,21),
        }
        temp.push(tempmsg);
        this.setState({data:temp,message:''});
    }
    render(){
        return(
            <KeyboardAvoidingView
            style = {{ flex: 1,backgroundColor:'white' }}
            behavior = "padding" >
                 <Layout style = {{width:'100%',height:'100%',paddingTop:20}}>
                    <TopNavigation
                        title= 'username'
                        alignment='center'
                        rightControls = {this.renderProfileAction()}
                        titleStyle = {{fontWeight:'200',fontSize:20,lineHeight:40,marginHorizontal:30}}
                    />
                    <Divider/>
                    <List
                        data={this.state.data}
                        renderItem={this.renderItem}
                        style = {{backgroundColor:'#ffffff',marginHorizontal:15}}
                        contentContainerStyle={{justifyContent: 'flex-end'}}
                    />
                    <View style={{flexDirection:'row',marginHorizontal:15}}>
                        <Input
                            placeholder = 'Type a message.....'
                            style={{borderRadius:20,flex:100}}
                            multiline= {true}
                            value = {this.state.message}
                            onChangeText={(text) => this.setState({message:text})}
                        />
                        <View style={{flex:20,flexDirection:'column-reverse'}}>
                            <Button  
                                style={{borderRadius:40,marginLeft:8}} 
                                icon={sendIconFill}
                                onPress={this.sendPress}
                            />
                        </View>
                    </View>
                </Layout>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    message:{
        marginVertical:10,
        height: 'auto', 
        width: 'auto',
        alignSelf: 'flex-start',
        backgroundColor:'#f2f2f2',
        maxWidth:'49%',
        borderRadius:12,
        borderTopLeftRadius:0,
        padding:10,
    },
    date:{
        marginVertical:10,
        height: 'auto', 
        width: 'auto',
        alignSelf: 'flex-start',
        maxWidth:'49%',
        paddingHorizontal:10,
    },
    avatar: {
        width: 40,
        height: 40,
        marginVertical:4,
        tintColor: null,
      },
});