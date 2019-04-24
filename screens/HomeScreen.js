import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableHighlight } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons';

import HeaderButtons, { HeaderButton, Item } from 'react-navigation-header-buttons';

const IoniconsHeaderButton = passMeFurther => (
  <HeaderButton {...passMeFurther} IconComponent={Icon} iconSize={30} color="white" />
);

export default class HomeScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'หน้าหลัก',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
        <Item title="menu" iconName="ios-menu" onPress={() => navigation.openDrawer() } />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
        <Item title="signup" iconName="ios-person-add" onPress={() => navigation.navigate('Register') } />
        <Item title="เข้าระบบ" onPress={() => navigation.navigate('Login') } /> 
      </HeaderButtons>
    ),
  });

  render() {
    return (
      <View style={styles.container}>


        <TouchableHighlight 
        onPress={ 
          () => this.props.navigation.navigate('About', {
             email: 'codingthailand@gmail.com',
             company: 'TOT'
          })
        }
        >
          <View
            style={{ width: 250, backgroundColor: '#008b54', alignItems: 'center', marginTop: 30 }}>
            <Text style={{ color: 'white', padding: 20, fontSize: 20 }}>เกี่ยวกับ</Text>
          </View>
        </TouchableHighlight>


      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
