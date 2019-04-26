import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

import { Container, Content, Form, Item, Input, Label, Button } from 'native-base'

import { connect } from 'react-redux'
import { addCat, getCat } from '../redux/actions/actions'

class AddCategoryScreen extends Component {

    static navigationOptions = {
        title: 'เพิ่มหมวดหมู่ข่าว'
    };

    state = {
        name: ''
    }

    render() {
        return (
            <Container>
                <Content padder>
                    <Form>
                        <Item fixedLabel>
                            <Label>รายละเอียด</Label>
                            <Input 
                            onChangeText={(name) => this.setState({ name: name })}
                            />
                        </Item>

                        <Button
                            onPress={ 
                                () => {
                                    this.props.dispatch(addCat(this.state.name));
                                    this.props.navigation.navigate('Category');
                                }
                            }
                            block style={{ marginTop: 30, backgroundColor: '#008b54' }}>
                            <Text style={{ color: 'white', fontSize: 18 }}>เพิ่มข้อมูล</Text>
                        </Button>

                    </Form>
                </Content>
            </Container>
        )
    }
}


const styles = StyleSheet.create({})

export default connect()(AddCategoryScreen)