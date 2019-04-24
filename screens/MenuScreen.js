import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableHighlight } from 'react-native'

import AsyncStorage from '@react-native-community/async-storage';

import {connect} from 'react-redux'

class MenuScreen extends Component {

  render() {
   
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 35, marginTop: 10 }}>
          เมนูหลัก
        </Text>
        {
          this.props.profile    &&
            <View>
              <Text>ID : {this.props.profile.id}</Text>
              <Text>Name : {this.props.profile.name}</Text>
              <Text>Email : {this.props.profile.email}</Text>
              <Text>Role : {this.props.profile.role}</Text>
            </View>
        }
        <TouchableHighlight
          onPress={
            () => {
              //this.props.navigation.navigate('');
            }
          }
        >
          <View
            style={{ width: 250, backgroundColor: '#008b54', alignItems: 'center', marginTop: 30 }}>
            <Text style={{ color: 'white', padding: 20, fontSize: 20 }}>ข่าว</Text>
          </View>
        </TouchableHighlight>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    alignItems: 'center'
  }
})

const mapStatetoProps = (state) => {
  return {
    profile : state.authReducer.profile
  }
}

export default connect(mapStatetoProps)(MenuScreen)
