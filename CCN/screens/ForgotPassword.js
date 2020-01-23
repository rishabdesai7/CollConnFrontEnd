import React from 'react';
import { StyleSheet, View, Alert} from 'react-native';
import { Button, Input, Text,Layout} from '@ui-kitten/components';


export default class ForgotPasswordScreen extends React.Component{

  render(){
    return (
      <Layout style={{width: '100%', height: '100%',flex: 1}}>
            <View style={styles.headerContainer}>
              <Text
                category='h1'
                >
                Forgot Password
              </Text>
              <Text
                style={styles.ForgotLabel}
                category='s1'
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
              >
              Submit
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
    marginBottom : 150,
  },
  ForgotLabel: {
    marginTop: 16,
  },
  ForgotButton: {
    marginHorizontal: 16,
  },
});
