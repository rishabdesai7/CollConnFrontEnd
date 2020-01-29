import React from 'react';
import { Layout,List,ListItem, Input, Button} from '@ui-kitten/components';
import {StyleSheet,View} from 'react-native'
import {PaperPlaneIconFill} from '../assets/icons/index'
export default class CommentScreen extends React.Component{
  data = new Array(5).fill({
    title: 'Title for Item',
    description: 'Description for Item',
  });
  renderItem = ({ item, index }) => (
        <ListItem
          title={`${item.title} ${index + 1}`}
          description={`${item.description} ${index + 1}`}
        />
      );
    render(){
      return (
        <Layout style = {{marginTop:30,padding:10,height:'100%'}}>
          <View style={styles.formContainer}>
              <Input
                placeholder='Comment'
                size='large'
                style = {styles.input}
                multiline={true}
              />
              <Button style={styles.button} appearance='ghost' icon={PaperPlaneIconFill}/>
            </View>
            <List
            data={this.data}
            renderItem={this.renderItem}
          />
        </Layout>
      );
    }
}
const styles = StyleSheet.create({
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
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
});

