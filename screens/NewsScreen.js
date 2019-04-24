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
    loading: true
  }

  async getData() {
    const response = await axios.get('https://newsapi.org/v2/top-headlines?country=th&apiKey=ab0d4aca4cea481e8157d31c68eb2b23');
    //alert(JSON.stringify(response.data.articles));
    this.setState({
      articles: response.data.articles,
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
              <Text>{item.title}</Text>
              <Text note>{item.source.name}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <Image source={{ uri: item.urlToImage }} style={{ height: 200, width: null, flex: 1 }} />
        </CardItem>
        <CardItem>
          <Left>
            <Button transparent>
              <Icon active name="person" />
              <Text>{item.author ? item.author : '-'}</Text>
            </Button>
          </Left>
          <Right>
            <Text>{format(item.publishedAt, 'DD MMMM YYYY hh:mm:ss')}</Text>
          </Right>
        </CardItem>
      </Card>
    </TouchableOpacity>
    );
  };

  _onRefresh = () => {
    this.setState({loading: true});
    this.getData();
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
                keyExtractor={item => item.title}
                renderItem={this._renderItem}
                refreshing={this.state.loading}
                onRefresh={this._onRefresh}
              />
            )
        }

      </View>
    )
  }

}

const styles = StyleSheet.create({})
