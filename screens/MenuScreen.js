import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableHighlight } from 'react-native'

import AsyncStorage from '@react-native-community/async-storage';

import axios from 'axios';

import { connect } from 'react-redux';
import { getProfile } from '../redux/actions/actions';

class MenuScreen extends Component {

  async componentDidMount() {
    const profile = await AsyncStorage.getItem('@profile');
    this.props.dispatch(getProfile(JSON.parse(profile)));
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.profile === nextProps.profile) {
      return false;
    }
    return true;
  }

  render() {

    //alert('render ' + JSON.stringify(this.props.profile));

    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 35, marginTop: 10 }}>
          เมนูหลัก
        </Text>

        {
          this.props.profile &&
          <View>
            <Text>ID: {this.props.profile.id}</Text>
            <Text>Name: {this.props.profile.name}</Text>
            <Text>Email: {this.props.profile.email}</Text>
            <Text>Role: {this.props.profile.role}</Text>
          </View>
        }

        {
          this.props.profile &&
          (
            <TouchableHighlight
              onPress={
                () => {
                  this.props.navigation.navigate('EditProfile');
                }
              }
            >
              <View
                style={{ width: 250, backgroundColor: 'red', alignItems: 'center', marginTop: 30 }}>
                <Text style={{ color: 'white', padding: 20, fontSize: 20 }}>แก้ไขข้อมูลส่วนตัว</Text>
              </View>
            </TouchableHighlight>
          )
        }

        {
          this.props.profile && this.props.profile.role === 'admin' &&
          (
            <TouchableHighlight
              onPress={
                () => {
                  this.props.navigation.navigate('Category');
                }
              }
            >
              <View
                style={{ width: 250, backgroundColor: '#008b54', alignItems: 'center', marginTop: 30 }}>
                <Text style={{ color: 'white', padding: 20, fontSize: 20 }}>หมวดหมู่ข่าว</Text>
              </View>
            </TouchableHighlight>
          )
        }


        {
          this.props.profile &&
          (
            <TouchableHighlight
              onPress={
                () => {
                  this.props.navigation.navigate('AddNews');
                }
              }
            >
              <View
                style={{ width: 250, backgroundColor: '#233454', alignItems: 'center', marginTop: 30 }}>
                <Text style={{ color: 'white', padding: 20, fontSize: 20 }}>เพิ่มข่าว</Text>
              </View>
            </TouchableHighlight>
          )
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



        {
          this.props.profile &&
          (
            <TouchableHighlight
              onPress={
                async () => {
                  const tokenStr = await AsyncStorage.getItem('@token');
                  const token = JSON.parse(tokenStr);
                  // alert(token.access_token);

                  const logoutUrl = 'https://api.codingthailand.com/api/logout';
                  const response = await axios.post(logoutUrl, {}, {
                    headers: {
                      Authorization: 'Bearer ' + token.access_token
                    }
                  });
                  alert(JSON.stringify(response.data));

                  await AsyncStorage.removeItem('@token');
                  await AsyncStorage.removeItem('@profile');

                  this.props.dispatch(getProfile(null));
                  this.props.navigation.closeDrawer();

                }
              }
            >
              <View
                style={{ width: 250, backgroundColor: 'red', alignItems: 'center', marginTop: 30 }}>
                <Text style={{ color: 'white', padding: 20, fontSize: 20 }}>Log out</Text>
              </View>
            </TouchableHighlight>
          )
        }



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

const mapStateToProps = (state) => {
  return {
    profile: state.authReducer.profile
  }
};

export default connect(mapStateToProps)(MenuScreen)