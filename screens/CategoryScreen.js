import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default class CategoryScreen extends Component {

    static navigationOptions = {
        title: 'หมวดหมู่ข่าว'
      }

  render() {
    return (
      <View>
        <Text> หมวดหมู่ข่าว </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({})
