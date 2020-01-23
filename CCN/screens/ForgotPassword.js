import React from 'react';
import { StyleSheet, View,ImageBackground} from 'react-native';
import { Button, Input, Text} from '@ui-kitten/components';


export default class ForgotPasswordScreen extends React.Component{

  render(){
    return (
      <ImageBackground source={{uri: 'http://i.imgur.com/IGlBYaC.jpg'}} style={styles.backgroundImage} >
            <View style={styles.headerContainer}>
              <Text
                category='h1'
                status = 'control'
                >
                Forgot Password
              </Text>
              <Text
                style={styles.ForgotLabel}
                category='s1'
                status = 'control'
                >
                Enter your UserId
              </Text>
            </View>
            <View style={styles.formContainer}>
              <Input
                placeholder='UserId'
              />
            </View>
            <Button
              style={styles.ForgotButton}
              size='giant'
              status = 'danger'
              >
              Submit
            </Button>
        </ImageBackground>
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
    marginBottom : 150,
  },
  ForgotLabel: {
    marginTop: 16,
  },
  ForgotButton: {
    marginHorizontal: 16,
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
  },
});
