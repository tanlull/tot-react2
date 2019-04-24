import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

import { Container, Content, Form, Item, Input, Label, Button } from 'native-base';

import axios from 'axios';
import { connect } from 'react-redux'
import { getProfile } from '../redux/actions/actions'
import AsyncStorage from '@react-native-community/async-storage';


class EditProfileScreen extends Component {
  static navigationOptions = {
    title: 'แก้ไขข้อมูลส่วนตัว'
  }


  _EditProfile = async () => {

    try {

      const tokenStr = await AsyncStorage.getItem('@token');
      const token = JSON.parse(tokenStr)
      const editUrl = 'https://api.codingthailand.com/api/editprofile';
      const response = await axios.post(editUrl, {
        name : this.state.name
      }, {
          headers: {
            Authorization: 'Bearer ' + token.access_token
          }
        });

      alert(JSON.stringify(response.data))

      // profile = response.data.data.user
      await AsyncStorage.setItem('@profile',JSON.stringify(response.data.data.user));

      this.props.dispatch(getProfile(response.data.data.user))

      this.props.navigation.navigate('Home');


    } catch (error) {
      alert(error)
      //console.warn(error)
    }

  };

  state = {
    name: ''
  }

  componentDidMount() {
    this.setState({
      name: this.props.profile.name
    })
  }

  render() {
    return (
      <Container>
        <Content>
          <Form>

            <Item fixedLabel>
              <Label>ชื่อ นามสกุล</Label>
              <Input
                onChangeText={(name) => this.setState({ name: name })}
                value={this.state.name}
                editable={true}
              />
            </Item>


            <Button
              onPress={this._EditProfile}
              block style={{ marginTop: 30, backgroundColor: '#008b54' }}>
              <Text style={{ color: 'white', fontSize: 18 }}>แก้ไข Profile</Text>
            </Button>

          </Form>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({})

const mapStatetoProps = (state) => {
  return {
    profile: state.authReducer.profile
  }
}

export default connect(mapStatetoProps)(EditProfileScreen)
