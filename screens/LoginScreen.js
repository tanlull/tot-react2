import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

import { DatePicker, Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base';

import axios from 'axios';

import {connect} from  'react-redux';
import  {getProfile} from '../redux/actions/actions'

import AsyncStorage from '@react-native-community/async-storage';


class LoginScreen extends Component {

    static navigationOptions = {
        title: 'เข้าระบบ',
    };

    state = {
        email: 't@t.t',
        password: '123'
    }

    _Login = async () => {

        try {
            const apiUrl = 'https://api.codingthailand.com/api/login';
            const response = await axios.post(apiUrl, {
                email: this.state.email,
                password: this.state.password
            }, {
                    headers: { 'Content-Type': 'application/json' }
                });
            
            // alert(JSON.stringify(response.data));

            await AsyncStorage.setItem('@token', JSON.stringify(response.data));
            
            //getprofile
            const profileUrl = 'https://api.codingthailand.com/api/me';
            const responseProfile = await axios.post(profileUrl,{} ,{
                headers: {
                    Authorization: 'Bearer '+response.data.access_token
                }
            });
            // alert(JSON.stringify(responseProfile.data.data.user));
            await AsyncStorage.setItem('@profile',JSON.stringify(responseProfile.data.data.user));

            //get profile
            const profile = await AsyncStorage.getItem('@profile');
            //alert(profile)
            //call action (action creator)
            this.props.dispatch(getProfile(JSON.parse(profile)))

           
            
            this.props.navigation.navigate('Home');

        } catch (error) {
            alert(error.response.data.message);
        }

    };

    render() {
        return (
            <Container>
                <Content>
                    <Form>

                        <Item fixedLabel>
                            <Label>อีเมล์</Label>
                            <Input
                                keyboardType='email-address'
                                onChangeText={(email) => this.setState({ email: email })}
                            />
                        </Item>
                        <Item fixedLabel>
                            <Label>รหัสผ่าน</Label>
                            <Input
                                keyboardType='number-pad'
                                secureTextEntry={true}
                                onChangeText={(password) => this.setState({ password: password })}
                            />
                        </Item>


                        <Button
                            onPress={this._Login}
                            block style={{ marginTop: 30, backgroundColor: '#008b54' }}>
                            <Text style={{ color: 'white', fontSize: 18 }}>Log In</Text>
                        </Button>

                    </Form>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({})

export default connect()(LoginScreen)