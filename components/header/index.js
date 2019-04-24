import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

// stateless component 
// <Header />
const Header = ({topic}) => {
    // const {topic} = props;
    return (
        <View>
            <Text style={{ fontSize: 30 }}>{ topic }</Text>
        </View>
    );
};

export default Header;

