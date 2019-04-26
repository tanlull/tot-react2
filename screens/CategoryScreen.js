import React, { Component } from 'react'
import { Text, StyleSheet, View, FlatList, Alert, ActivityIndicator } from 'react-native'

import { ListItem, Fab, Icon } from 'native-base';

import Swipeout from 'react-native-swipeout';

import { connect } from 'react-redux';
import { getCat, delCat } from '../redux/actions/actions'

class CategoryScreen extends Component {

  static navigationOptions = {
    title: 'หมวดหมู่ข่าว'
  };


  async getData() {
    this.props.dispatch(getCat());
  }

  componentDidMount() {
    this.getData();
  }

  _deleteData = (id) => {
    this.props.dispatch(delCat(id));
  }

  RenderItem = ({ item }) => {

    const btnRight = [{
      text: 'ลบ',
      //backgroundColor: 'red',
      type: 'delete',
      onPress: () => {
        //alert(item.name);
        Alert.alert('ยืนยันการลบ', 'แน่ใจว่าต้องการลบ ' + item.name + ' ?', [
          { text: 'ยกเลิก', style: 'cancel' },
          { text: 'ตกลง', onPress: () => this._deleteData(item.id) },
        ]);
      }
    }];

    const btnLeft = [{ 
      text: 'แก้ไข', 
      type: 'primary', 
      onPress: () => { 
        this.props.navigation.navigate('EditCategory',{ 
          id: item.id,
          name: item.name 
        }); 
      } 
    }]

    return (
      <Swipeout autoClose={true} left={btnLeft} right={btnRight} backgroundColor='white'>
        <ListItem>
          <Text>{item.name}</Text>
        </ListItem>
      </Swipeout>
    )
  }

  _onRefresh = () => {
    this.getData();
  }

  render() {

    if (this.props.errorMessage) alert(this.props.errorMessage);

    return (
      <View style={{flex: 1}}>
        {
          this.props.loading === true ? (
            <ActivityIndicator size='large' color='green' />
          ) : (
              <FlatList
                data={this.props.category}
                keyExtractor={item => item.id.toString()}
                renderItem={this.RenderItem}
                refreshing={this.props.loading}
                onRefresh={this._onRefresh}
              />
            )
        }


        <Fab
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: '#008b54' }}
          position="bottomRight"
          onPress={() => this.props.navigation.navigate('AddCategory')  }
        >
          <Icon name="ios-add-circle" />
        </Fab>


      </View>
    )
  }
}

const styles = StyleSheet.create({})

const mapStateToProps = (state) => {
  return {
    category: state.catReducer.category,
    loading: state.catReducer.loading,
    errorMessage: state.catReducer.errorMessage
  }
};

export default connect(mapStateToProps)(CategoryScreen)