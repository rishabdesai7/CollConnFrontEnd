import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';
import {
  Card,
  Button,
  Text,
  Layout
} from '@ui-kitten/components';
import {
    MessageCircleIconOutline,
    HeartIconOutline,
    downArrowOutline,
} from '../assets/icons/index';
import {uri} from '../urls/urlgenerator';
import { Linking} from 'expo';


  
class CardCustomHeaderShowcase extends React.Component{
    state = {
        likeIcon:HeartIconOutline,
        commentIcon : MessageCircleIconOutline,
        download:false,
    }
      render(){
          return(
              <Layout style = {{margin : 10,borderRadius:20}}>
                <View style ={{flexDirection:'row'}}>
                  <View style ={{flex:10}}>
                    <Text
                      style={{marginHorizontal:20,marginTop:10,fontWeight:'bold'}}
                      category='h6'>
                      {this.props.by}
                    </Text>
                    <Text
                      style={{marginHorizontal:25}}
                      category='p2'
                      appearance='hint'
                      >
                      {this.props.date}
                    </Text>
                  </View>
                  <Button 
                      style={[styles.button,{flex:1,backgroundColor:'#ffffff'}]} 
                      appearance='ghost' 
                      status='danger' 
                      icon={downArrowOutline}
                      disabled={!(this.props.file != null)}
                      onPress = {()=>{
                        Linking.openURL(uri+this.props.file);
                      }}
                    />
                </View>
                {(this.props.image != null)?(<TouchableOpacity onPress =  {()=>{Linking.openURL(uri+this.props.image);}}><Image source={{uri:uri+this.props.image}} style={styles.headerImage}/></TouchableOpacity>):null}
                <Card style={{borderColor:'#ffffff',borderRadius:20}}>
                    <Text
                    style={styles.headerText}
                    category='h6'>
                    {this.props.title}
                    </Text>
                    <Text>
                    {this.props.description}
                    </Text>
                    <Button 
                      style={styles.button} 
                      appearance='ghost' 
                      status='danger' 
                      onPress = {this.props.commentAction}
                      icon={this.state.commentIcon}>
                      comment
                    </Button>
                </Card>
              </Layout>
          );
      }   
}
export default class Post extends React.Component{
    render(){
        return(
            <CardCustomHeaderShowcase
                by = {this.props.by}
                date = {this.props.date}
                title={this.props.title}
                description={this.props.description}
                image = {this.props.image}
                file = {this.props.file}
                commentAction = {this.props.commentAction}
            />
        );
    }
}
const styles = StyleSheet.create({
  headerText: {
    //marginHorizontal: 24,
    marginVertical: 16,
  },
  headerImage: {
    flex: 1,
    height: 250,
    width : '90%',
    alignSelf:'center',
    borderRadius:5,
  },
  button: {
    marginTop:8,
    marginBottom:8,
  },
});