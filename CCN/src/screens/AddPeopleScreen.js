import React from 'react';
import { Layout,List,Text, Input, Button,Avatar,Divider,TopNavigation,ViewPager,Radio,RadioGroup,} from '@ui-kitten/components';
import {StyleSheet,View,Alert} from 'react-native';
import {PaperPlaneIconFill} from '../assets/icons/index';
import Constants from 'expo-constants';
import {AddPeople} from '../urls/urlgenerator';
import * as SecureStore from 'expo-secure-store';
export default class AddPeopleScreen extends React.Component{
    state = {
        Username : '',
        dept:'IT',
        year:'1',
        Section:'A',
        selectedIndex :0,
    }
    addPeople = async()=>{
        var data = new FormData();
        var user = [this.state.Username]
        user.forEach((item)=>{
            data.append('users',item)
        });
        data.append('channel',this.props.navigation.state.params.channel);
        var resp = await fetch(AddPeople(),
        {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': await SecureStore.getItemAsync('auth'),
            },
            method:'POST',
            body: data
        });
        switch(resp.status){
            case 200:
                this.props.navigation.goBack();
                break;
            case 404:
                Alert.alert("Session expired.please logout and login again!");
                break;
            default:
                Alert.alert('OOPSY!Please try Again');
                break;
        }
    }
    render(){
      return (
        <Layout style = {{height:'100%'}}>
            <TopNavigation
                    title= {'Add People+'}
                    style ={{marginTop:Constants.statusBarHeight}}
                    titleStyle = {{fontWeight:'bold',fontSize:20,lineHeight:40,marginHorizontal:30}}
                    alignment='center'
            />
            <Divider/>
          <View style={styles.formContainer}>
              <Input
                placeholder='Username'
                size='large'
                style = {styles.input}
                value = {this.state.Username}
                onChangeText = {(text)=>{this.setState({Username:text})}}
              />
              <Button 
                style={styles.button} 
                appearance='ghost' 
                icon={PaperPlaneIconFill}
                onPress = {this.addPeople}
              />
            </View>
            <Divider/>
            <View style={{backgroundColor:'#f2f2f2',alignItems:'center',justifyContent:'center'}}>
                <Text category='h6'>Or</Text>
            </View>
            <Divider/>
            <TopNavigation
                title= {'Filters'}
                titleStyle = {{fontWeight:'bold',fontSize:20,lineHeight:40,marginHorizontal:30}}
                alignment='center'
            />
            <Divider/>
            <RadioGroup 
              style = {{flexDirection:'row',alignItems:'center',justifyContent:'center'}} 
              selectedIndex = {this.state.selectedIndex}
              onChange={(index) => {this.setState({selectedIndex:index});}}
              >
                <Radio style={styles.radio} text='Faculty'/>
                <Radio style={styles.radio} text='Students'/>
            </RadioGroup>
            <Layout style = {{alignItems:'center',justifyContent:'center',padding:20}}>
                <Input
                    placeholder='Department'
                    size='large'
                    style ={{margin:8}}
                    value = {this.state.dept}
                    onChangeText = {(text)=>{this.setState({dept:text})}}
                />
                <Input
                    placeholder='Year'
                    size='large'
                    style ={{margin:8}}
                    disabled = {(this.state.selectedIndex == 0)}
                    value = {this.state.year}
                    onChangeText = {(text)=>{this.setState({year:text})}}
                />
                <Input
                    placeholder='Section'
                    size='large'
                    style ={{margin:8}}
                    disabled = {(this.state.selectedIndex == 0)}
                    value = {this.state.Section}
                    onChangeText = {(text)=>{this.setState({Section:text})}}
                />
                <Button style ={{margin:8}} onPress={()=>{var fd = {channel:this.props.navigation.state.params.channel,type:this.state.selectedIndex,dept:this.state.dept,year:this.state.year,Section:this.state.Section};this.props.navigation.navigate('AddPeopleList',{fd:fd})}}>Submit</Button>
            </Layout>
        </Layout>
      );
    }
}
const styles = StyleSheet.create({
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin:10,
    paddingHorizontal: 16,
    flexDirection:'row',
  },
  input:{
    borderRadius:20,
    flex:100
  },
  button: {
    flex:1,
  },
  message:{
        marginVertical:10,
        height: 'auto', 
        width: 'auto',
        alignSelf: 'flex-start',
        backgroundColor:'#f2f2f2',
        borderRadius:12,
        padding:10,
        maxWidth:'80%',
    },
    avatar: {
      width: 40,
      height: 40,
      marginVertical:4,
      tintColor: null,
      marginRight:10,
      marginTop:10,
    },
    tab: {
        height: 192,
        alignItems: 'center',
        justifyContent: 'center',
      },
    radio: {
        marginHorizontal: 28,
        marginVertical:8,
    },
});

