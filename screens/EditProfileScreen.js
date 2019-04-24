import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default class EditProfileScreen extends Component {
static navigationOptions = {
  title: 'แก้ไขข้อมูลส่วนตัว'
}

  render() {
    return (
      <View>
        <Text> Edit Profile Screen </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({})
