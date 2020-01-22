import React from 'react';
import { StyleSheet, View} from 'react-native';
import { Button, Input, Text,Layout} from '@ui-kitten/components';

export default class LoginScreen extends React.Component{

  render(){
    return (
      <Layout style={{width: '100%', height: '100%',flex: 1}}>
            <View style={styles.headerContainer}>
              <Text
                category='h1'
                >
                COLLCONN
              </Text>
              <Text
                style={styles.signInLabel}
                category='s1'
                >
                Log in to your account
              </Text>
            </View>
            <View style={styles.formContainer}>
              <Input
                placeholder='UserId'
              />
              <Input
                style={styles.passwordInput}
                placeholder='Password'
                secureTextEntry={true}
              />
            </View>
            <View style={styles.forgotPasswordContainer}>
                <Button
                  style={styles.forgotPasswordButton}
                  appearance='ghost'
                >
                    Forgot your password?
                </Button>
            </View>
            <Button
              style={styles.signInButton}
              size='giant'
              >
              SIGN IN
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
  signInLabel: {
    marginTop: 16,
  },
  signInButton: {
    marginHorizontal: 16,
  },
  signUpButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom:200,
  },
  passwordInput: {
    marginTop: 16,
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
});
