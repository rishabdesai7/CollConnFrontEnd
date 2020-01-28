import React from 'react';
import {
  Image,
  StyleSheet,
  View
} from 'react-native';
import {
  Card,
  Button,
  ButtonGroup,
  Text,
} from '@ui-kitten/components';
import {
    HeartIconFill,
    MessageCircleIconFill,
    MessageCircleIconOutline,
    HeartIconOutline,
} from '../assets/icons/index';
  
class CardCustomHeaderShowcase extends React.Component{
    state = {
        likeIcon:HeartIconOutline,
        commentIcon : MessageCircleIconOutline,
    }
    CustomHeader = () => (
        <React.Fragment>
          <Text
            style={styles.headerText}
            category='h6'>
            {this.props.header}
          </Text>
        </React.Fragment>
      );
      render(){
          return(
              <View style = {{margin : 10}}>
                <Image source={require('../assets/images/back.png')} style={styles.headerImage}/>
                <Card>
                    <Text
                    style={styles.headerText}
                    category='h6'>
                    {this.props.header}
                    </Text>
                    <Text>
                    {this.props.text}
                    </Text>
                    <View style={{flex: 1, flexDirection: 'row',justifyContent: 'space-between'}} >
                        <Button 
                            style={styles.button} 
                            appearance='ghost' status='danger' 
                            icon={this.state.likeIcon}>
                            Like
                        </Button>
                        <Button 
                           style={styles.button} 
                           appearance='ghost' 
                           status='danger' 
                           icon={this.state.commentIcon}>
                           comment
                        </Button>
                    </View>
                </Card>
              </View>
          );
      }   
}
export default class Post extends React.Component{
    render(){
        return(
            <CardCustomHeaderShowcase
                text = {this.props.text}
                header = {this.props.header}
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