import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Container, Content, Form, Item, Input, Label, Button } from 'native-base'

// copy from https://redux-form.com/8.2.0/examples/syncvalidation/
const validate = values => {
    const errors = {}
    if (!values.topic) {
        errors.topic = 'กรุณากรอกหัวข้อข่าว'
    }
    //else if (values.username.length > 15) {
    //   errors.username = 'Must be 15 characters or less'
    // }
    // if (!values.email) {
    //   errors.email = 'Required'
    // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    //   errors.email = 'Invalid email address'
    // }
    // if (!values.age) {
    //   errors.age = 'Required'
    // } else if (isNaN(Number(values.age))) {
    //   errors.age = 'Must be a number'
    // } else if (Number(values.age) < 18) {
    //   errors.age = 'Sorry, you must be at least 18 years old'
    // }
    return errors
}

const _renderField  = ({ input,label, type, meta: { touched, error, warning } }) => {
    return (
        <View>
        <Item >
            <Label>{label}</Label>
            <Input {...input} />
            <Label>{error && touched ? <Text style={{color:'red'}}>{error}</Text>:null}</Label>
            
        </Item>

</View>
    )
}

class AddNewsScreen extends Component {
    static navigationOptions = {
        title: 'เพิ่มข่าว',
    };
    render() {
        return (
            <Container>
                <Content padder>
                    <Form>
                        <Field name='topic' component={_renderField } label='หัวข้อ' />
                        <Button block style={{margin:30,backgroundColor:'#008b54'}}>
                        <Text style={{color:'white',fontSize:18}}> เพิ่มข่าว </Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        )
    }
}

export default reduxForm({
    form: 'frmAddNews',
    validate: validate,

})(AddNewsScreen)

