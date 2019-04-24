import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default class AboutScreen extends Component {
  static navigationOptions = {
    title: 'เกี่ยวกับ'
  };

  render() {

    const email = this.props.navigation.getParam('email','');
    const company = this.props.navigation.getParam('company','');

    return (
      <View>
        <Text style={{fontSize: 16}}> บริษัท: {company} {'\n'} อีเมล์ {email} </Text>

      </View>
    )
  }
}

const styles = StyleSheet.create({})
