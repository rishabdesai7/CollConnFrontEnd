import React from 'react';
import { StyleSheet, View} from 'react-native';
import { Button, Input, Text, Layout} from '@ui-kitten/components';


export default class CreateChannelScreen extends React.Component{

    render(){
        return (
        <Layout style = {{height:'100%'}}>
                <View style={styles.headerContainer}>
                <Text
                    category='h1'
                    >
                    Create Channel
                </Text>
                </View>
                <View style={styles.formContainer}>
                <Input
                    placeholder='Name'
                    style={styles.input}
                />
                <Input
                    placeholder='Description'
                    multiline = {true}
                    size='large'
                    style = {[styles.input,{borderRadius:20}]}
                />
                </View>
                <Button
                style={styles.LogInButton}
                size='giant'
                status = 'danger'
                >
                Request Channel
                </Button>
            </Layout>
        );
  }
};

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
    minHeight: 150,
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 16,
  },
  LogInButton: {
    marginHorizontal: 16,
  },
  input: {
    marginTop: 16,
  },
});
