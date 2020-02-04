import React from 'react';
import { StyleSheet, View} from 'react-native';
import { Button, Input, Text, Layout,Select} from '@ui-kitten/components';
import {ImageIconOutline,AttachIconOutline} from '../assets/icons/index';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

export default class ComplaintScreen extends React.Component{
    selectOptions = [
        { text: 'Channel' },
        { text: 'Person' },
      ];
    _pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        alert(result.uri);
        console.log(result);
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        });

        alert(result.uri);
        console.log(result)

        if (!result.cancelled) {
        this.setState({ image: result.uri });
        }
    }
    render(){
        return (
            <Layout style = {{height:'100%'}}>
                <View style={styles.headerContainer}>
                <Text
                    category='h1'
                    >
                    Report
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
                <View style = {{flexDirection:'row'}}>
                    <Button appearance='ghost' style = {{flex:1}} onPress={this._pickImage} icon = {ImageIconOutline}/>
                    <Button appearance='ghost' style = {{flex:1}} onPress={this._pickDocument}icon = {AttachIconOutline}/>
                </View>
                <Button
                style={styles.LogInButton}
                size='giant'
                status = 'danger'
                >
                Report
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
