import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableHighlight } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons';

import HeaderButtons, { HeaderButton, Item } from 'react-navigation-header-buttons';

import PushNotification from 'react-native-push-notification'

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


componentDidMount() {
  PushNotification.configure({

    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function(token) {
        console.log( 'TOKEN:', token );
        alert(JSON.stringify(token))
    },

    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
        console.log( 'NOTIFICATION:', notification );

        // process the notification

      alert(notification.title+' '+notification.message)

        // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
       // notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
    senderID: "413203611089",

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
      * (optional) default: true
      * - Specified if permissions (ios) and token (android and ios) will requested or not,
      * - if not, you must call PushNotificationsHandler.requestPermissions() later
      */
    requestPermissions: true,
});
}


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
