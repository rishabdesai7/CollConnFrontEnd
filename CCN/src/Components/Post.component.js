import React from 'react';
import {
  Image,
  StyleSheet,
  View
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
} from '../assets/icons/index';
import {uri} from '../urls/urlgenerator'
  
class CardCustomHeaderShowcase extends React.Component{
    state = {
        likeIcon:HeartIconOutline,
        commentIcon : MessageCircleIconOutline,
    }
      render(){
          return(
              <Layout style = {{margin : 10,borderRadius:20}}>
                 <Text
                    style={{marginHorizontal:10,marginTop:10,fontWeight:'bold'}}
                    category='h6'>
                    {this.props.by}
                  </Text>
                  <Text
                    style={{marginHorizontal:15}}
                    category='p2'
                    appearance='hint'
                    >
                    {this.props.date}
                  </Text>
                {(this.props.image != null)?(<Image source={{uri:uri+this.props.image}} style={styles.headerImage}/>):null}
                <Card>
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
    width : '100%',
  },
  button: {
    marginTop:8,
    marginBottom:8,
  },
});