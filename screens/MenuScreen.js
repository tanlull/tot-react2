import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableHighlight } from 'react-native'

import AsyncStorage from '@react-native-community/async-storage';

import axios from 'axios'
import {connect} from 'react-redux'
import { getProfile } from '../redux/actions/actions'
import {EditProfileScreen} from 'EditProfileScreen'


class MenuScreen extends Component {

  async componentDidMount(){
    const profile = await AsyncStorage.getItem('@profile');
    this.props.dispatch(getProfile(JSON.parse(profile)))
  }

  //manually controls re-render 
  shouldComponentUpdate(nextProps,nextState){
    if(this.props.profile === nextProps.profile){
      return false; //do not re-render
    }
    return true;
    
  }

  render() {
   
    //alert('render' + JSON.stringify(this.props.profile))

    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 35, marginTop: 10 }}>
          เมนูหลัก
        </Text>
        {
          this.props.profile  &&
            <View>
              <Text>ID : {this.props.profile.id}</Text>
              <Text>Name : {this.props.profile.name}</Text>
              <Text>Email : {this.props.profile.email}</Text>
              <Text>Role : {this.props.profile.role}</Text>
              <TouchableHighlight
              onPress={
                 () => {
                  this.props.navigation.navigate('EditProfile');
                }
              }
            >
              <View
                style={{ width: 250, backgroundColor: 'blue', alignItems: 'center', marginTop: 30 }}>
                <Text style={{ color: 'white', padding: 20, fontSize: 20 }}>แก้ไขข้อมูลส่วนตัว</Text>
              </View>
            </TouchableHighlight>

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
        {
          this.props.profile    &&
          <TouchableHighlight
          onPress={
            async () => {
              // Server 
              const tokenStr = await AsyncStorage.getItem('@token');
              const token = JSON.parse(tokenStr)
             // alert(token.access_token)
              const logoutUrl = 'https://api.codingthailand.com/api/logout';
              const response = await axios.post(logoutUrl,{} ,{
                headers: {
                    Authorization: 'Bearer '+token.access_token
                }
              });
              //alert(JSON.stringify(response.data))

              //Client
              await AsyncStorage.removeItem('@token')
              await AsyncStorage.removeItem('@profile')
              //View
              this.props.dispatch(getProfile(null))
              this.props.navigation.closeDrawer();
              //alert('logged out')
            }

          }
        >
          <View
            style={{ width: 250, backgroundColor: '#ff0000', alignItems: 'center', marginTop: 30 }}>
            <Text style={{ color: 'white', padding: 20, fontSize: 20 }}>Logout</Text>
          </View>
        </TouchableHighlight>
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

const mapStatetoProps = (state) => {
  return {
    profile : state.authReducer.profile
  }
}

export default connect(mapStatetoProps)(MenuScreen)
