import React from 'react';
import { StyleSheet, View} from 'react-native';
import { Button, Input, Text, Layout,OverflowMenu} from '@ui-kitten/components';
import {ImageIconOutline,AttachIconOutline} from '../assets/icons/index';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import {ArrowDownFill} from '../assets/icons/index';
export default class ComplaintScreen extends React.Component{
    state={
        on:'n',
        visible:false,
    }
    selectOptions = [
        { title: 'Channel' },
        { title: 'Person' },
    ];
    toggleMenu = () => {
        (this.state.visible)?this.setState({visible:false}):this.setState({visible:true});
      };
    onMenuItemSelect = async(index) => {
        await this.setState({visible:false});
        this.setState({on:this.selectOptions[index].title});
      };
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
        switch(this.state.on){
            case 'n':
                return(
                    <Layout style = {{height:'100%'}}>
                        <View style={styles.buttonContainer}>
                            <OverflowMenu
                                data={this.selectOptions}
                                visible={this.state.visible}
                                onBackdropPress={this.toggleMenu}
                                onSelect={this.onMenuItemSelect}
                                style = {{margin:30}}
                                >
                                <Button style={[styles.button, { flexDirection: 'row-reverse' }]} status='danger' onPress={this.toggleMenu} icon={ArrowDownFill}>
                                   Select Type
                                </Button>
                            </OverflowMenu>
                        </View>
                    </Layout>
                );
            case 'Person':
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
                            placeholder='Dept'
                            style={styles.input}
                        />
                        <Input
                            placeholder='Id'
                            style={styles.input}
                        />
                        <Input
                            placeholder='Designation'
                            style={styles.input}
                        />
                        <Input
                            placeholder='Issue'
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
            case 'Channel':
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
                            placeholder='Issue'
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
  }
};

const styles = StyleSheet.create({
   buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 376,
      },
    button: {
        width: 192,
      },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
    minHeight: 100,
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
