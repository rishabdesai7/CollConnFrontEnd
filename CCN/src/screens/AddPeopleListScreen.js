import React from 'react';
import {Layout,List,ListItem,TopNavigation,TopNavigationAction,Button} from '@ui-kitten/components';
import Constants from 'expo-constants';
import { CheckBox } from 'react-native-elements';
import {PlusIconFill} from '../assets/icons/index';
import {GetPeople,AddPeople} from '../urls/urlgenerator';
import * as SecureStore from 'expo-secure-store';
import {Alert} from 'react-native';
export default class MenuScreen extends React.Component{
    state = {
      data:[],
      allChecked:false,
      resultList :[],
    }
    async componentDidMount(){
      var fd = this.props.navigation.state.params.fd;
      var resp = await fetch(GetPeople(fd.type,fd.dept,fd.year,fd.Section), {
        headers: {
          'Authorization': await SecureStore.getItemAsync('auth'),
        },
        method: 'GET',
      });
      switch(resp.status){
        case 200:
            resp = await resp.json();
            this.setState({data:resp['data']})
            break;
        case 404:
            Alert.alert("Session expired.please logout and login again!");
            break;
        default:
             this.forceUpdate();
             break;
      }
    }
    renderItem = ({ item, index }) => (
        <ListItem
        title={`${item.name}`}
        description={`${item.id}`}
        accessory={this.renderItemAccessory}
    />
    );
    renderItemAccessory = (style,index) => (
      <CheckBox
        checkedIcon = "check-square"
        uncheckedIcon="square-o"
        checked = {this.state.data[index].checked}
        onPress={() => {
          var temp = this.state.data;
          temp[index].checked = (!temp[index].checked);
          if(!temp[index].checked)
            this.setState({allChecked:false});
          this.setState({data: temp});}}
      />
    );
    renderHeader=()=>(
      <Layout style = {{flexDirection:'row',alignContent:'center',justifyContent:'center'}}>
        <Layout style = {{flex:10,margin:8,alignContent:'flex-end',justifyContent:'flex-end'}}>
        </Layout>
        <CheckBox
          iconRight
          checkedIcon = "check-square"
          uncheckedIcon="square-o"
          checked = {this.state.allChecked}
          title='All'
          containerStyle={{backgroundColor:'#ffffff',borderWidth:0}}
          onPress = {()=>{
            var temp = this.state.data;
            temp.forEach((item)=>{item.checked = !this.state.allChecked})
            this.setState({allChecked: !this.state.allChecked,data:temp})}}
        />
      </Layout>
    );
    addPeople = async()=>{
      var data = new FormData();
      var user = this.state.data
      user.forEach((item)=>{
        if(item.checked)
          data.append('users',item.id)
      });
      data.append('channel',this.props.navigation.state.params.fd.channel);
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
        return(
            <Layout style = {{width:'100%',height:'100%',paddingHorizontal:15,paddingTop:Constants.statusBarHeight}}>
                    <TopNavigation
                      title= 'Add People'
                      alignment='center'
                      titleStyle = {{fontWeight:'bold',fontSize:20,lineHeight:40,marginHorizontal:30}}
                      rightControls = {(<TopNavigationAction icon={PlusIconFill} onPress={this.addPeople}/>)}
                    />
                    <List
                        data={this.state.data}
                        renderItem={this.renderItem}
                        style = {{marginBottom:10,backgroundColor:'#ffffff'}}
                        ListHeaderComponent = {this.renderHeader}
                    />
            </Layout>

        )
    }
}
