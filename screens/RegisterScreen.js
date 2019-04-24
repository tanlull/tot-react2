import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

import { DatePicker, Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base';

import format from 'date-fns/format';
import axios from 'axios';

export default class RegisterScreen extends Component {

  state = {
    name: '',
    email: '',
    password: '',
    dob: ''
  }

  _Register = async () => {

    try {
        const apiUrl = 'https://api.codingthailand.com/api/register';
        const response = await axios.post(apiUrl, {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          dob: this.state.dob
        }, {
            headers: { 'Content-Type': 'application/json' }
          });
       // alert(response.data.message);
        this.props.navigation.navigate('Home');  

    } catch (error) {
        alert(error.response.data.errors.email[0]);
    }

  };

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item fixedLabel>
              <Label>ชื่อ-สกุล</Label>
              <Input
                maxLength={40}
                onChangeText={(name) => this.setState({ name: name })}
              />
            </Item>
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

            <Item fixedLabel last>
              <Label>วันเดือนปีเกิด</Label>
              <DatePicker
                defaultDate={new Date()}
                // minimumDate={new Date(2018, 1, 1)}
                // maximumDate={new Date(2018, 12, 31)}
                locale={"th"}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText=""
                textStyle={{ color: "green" }}
                placeHolderTextStyle={{ color: "green" }}
                onDateChange={(dob) => {
                  this.setState({ dob: format(dob, 'YYYY-MM-DD') });
                  //alert(this.state.dob);
                }}
                disabled={false}
              />
            </Item>

            <Button
              onPress={this._Register}
              block style={{ marginTop: 30, backgroundColor: '#008b54' }}>
              <Text style={{ color: 'white', fontSize: 18 }}>ลงทะเบียน</Text>
            </Button>

          </Form>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({})
