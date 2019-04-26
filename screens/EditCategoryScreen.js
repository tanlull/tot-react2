import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

import { Container, Content, Form, Item, Input, Label, Button } from 'native-base'

import { connect } from 'react-redux'
import { editCat } from '../redux/actions/actions'

class EditCategoryScreen extends Component {

    static navigationOptions = {
        title: 'แก้ไขหมวดหมู่ข่าว'
    };

    state = {
        id: 0,
        name: ''
    }

   componentDidMount() {
       this.setState({
          id: this.props.navigation.getParam('id', 0),
          name: this.props.navigation.getParam('name','')
       });
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
                            value={this.state.name}
                            editable={true}
                            />
                        </Item>

                        <Button
                            onPress={ 
                                () => {
                                    this.props.dispatch(editCat(this.state.id, this.state.name));
                                    this.props.navigation.navigate('Category');
                                }
                            }
                            block style={{ marginTop: 30, backgroundColor: '#008b54' }}>
                            <Text style={{ color: 'white', fontSize: 18 }}>แก้ไขข้อมูล</Text>
                        </Button>

                    </Form>
                </Content>
            </Container>
        )
    }
}


const styles = StyleSheet.create({})

export default connect()(EditCategoryScreen)