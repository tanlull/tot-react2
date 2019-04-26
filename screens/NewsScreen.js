import React, { Component } from 'react'
import { ActivityIndicator, StyleSheet, View, FlatList, Image, TouchableOpacity } from 'react-native'

import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

import axios from 'axios';

import format from 'date-fns/format';

export default class NewsScreen extends Component {

  static navigationOptions = {
    title: 'ข่าวสาร',
    headerStyle: {
      backgroundColor: '#008b54',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };


  state = {
    articles: [],
    loading: true,
    page: 1,
    footerLoading: true
  }

  async getData() {
    const response = await axios.get('https://api.codingthailand.com/api/news');
    //alert(JSON.stringify(response.data.data));
    this.setState({
      articles: response.data.data,
      loading: false
    });
  }

  componentDidMount() {
    this.getData();
  }

  _renderItem = ({ item }) => {
    return (
    <TouchableOpacity onPress={
        () => {
          //alert(item.url);
          this.props.navigation.navigate('Web',{ url: item.url });
        }
    }>  
      <Card>
        <CardItem>
          <Left>
            <Body>
              <Text>{item.topic}</Text>
              <Text note>{item.id}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem>
              <Body>
                   <Text>{item.detail}</Text>
              </Body>
        </CardItem>
        <CardItem>
          <Left>
            <Button transparent>
              <Icon active name="person" />
              <Text>{item.name}</Text>
            </Button>
          </Left>
          <Right>
            <Text>{format(item.dateadd, 'DD MMMM YYYY hh:mm:ss')}</Text>
          </Right>
        </CardItem>
      </Card>
    </TouchableOpacity>
    );
  };

  _onRefresh = () => {
    this.setState(
      { 
        articles: [],
        loading: true,
        page: 1
      }
    );
    this.getData();
  }

   async getLoadMore()  {
    const response = 
    await axios.get('https://api.codingthailand.com/api/news?page='+this.state.page);
  
    this.setState( (prevState) => ({
        articles: prevState.articles.concat(response.data.data),
        //loading: false
        footerLoading: false
    }));

  }

  _onEndReached = () => {
     //console.warn('ok');
     this.setState({
        page: ++this.state.page,
        footerLoading: true
     })
     this.getLoadMore();
  }

  _renderFooter = () => {
      return (
         this.state.footerLoading === true ? <ActivityIndicator size="large" color="green" /> : null
      )
  }

  render() {
    return (
      <View>

        {
          this.state.loading === true ? (
            <ActivityIndicator size='large' color='green' />
          ) : (
              <FlatList
                data={this.state.articles}
                keyExtractor={item => item.id.toString()}
                renderItem={this._renderItem}
                refreshing={this.state.loading}
                onRefresh={this._onRefresh}
                onEndReached={this._onEndReached}
                onEndReachedThreshold={0.5}
                ListFooterComponent={this._renderFooter}
              />
            )
        }

      </View>
    )
  }

}

const styles = StyleSheet.create({})
