import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

import {Picker, Textarea, Icon,Container, Content, Form, Item, Input, Label, Button } from 'native-base'

import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { getCat } from '../redux/actions/actions';

const validate = values => {
  const errors = {}
  if (!values.topic) {
    errors.topic = 'กรุณากรอกหัวข้อข่าว'
  }
  if (!values.detail) {
    errors.detail = 'กรุณากรอกรายละเอียดข่าว'
  }
  if (!values.category_id) {
    errors.category_id = 'กรุณาเลือกหมวดหมู่ข่าว'
  } 
  if (values.category_id === 0) {
    errors.category_id = 'กรุณาเลือกหมวดหมู่ข่าว'
  }
  //  else if (values.username.length > 15) {
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

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning, invalid }
}) => (
    <View>
      <Item error={ error && touched }>
        <Label>{label}</Label>
        <Input {...input} />
        { error && touched ? <Icon name='close-circle' /> : null  }
      </Item>
      { 
        error && (touched && ( 
        <Item style={ { borderColor: 'white'} }>
        <Label>
          <Text style={ {color: 'red'} }>{error}</Text>
        </Label>
        </Item>
      ))
      }
    </View>
)

const renderField2 = ({
  input,
  label,
  type,
  meta: { touched, error, warning, invalid }
}) => (
    <View>
      <Item error={ error && touched }>
        <Textarea {...input} rowSpan={5} bordered placeholder={label} style={{flex:1}} />
        { error && touched ? <Icon name='close-circle' /> : null  }
      </Item>
      { 
        error && (touched && ( 
        <Item style={ { borderColor: 'white'} }>
        <Label>
          <Text style={ {color: 'red'} }>{error}</Text>
        </Label>
        </Item>
      ))
      }
    </View>
)

const renderField3 = ({
  input: { onChange, value, ...inputProps },
  label,
  type,
  category,
  meta: { touched, error, warning, invalid }
}) => (
    <View>
      <Item error={ error && touched }>
        
        <Picker
          {...inputProps}
          mode="dropdown"
          style={{ width: undefined}}
          selectedValue={value}
          onValueChange={ (value, index) => onChange(value) }
        >
              <Picker.Item key={'unselected'} label="กรุณาเลือก" value={0} />
              {
                  category.map( (c) => <Picker.Item key={c.id} label={c.name} value={c.id} /> )
              }
        </Picker>

        { error && touched ? <Icon name='close-circle' /> : null  }

      </Item>
     
    </View>
)

class AddNewsScreen extends Component {

  componentDidMount() {
      this.props.dispatch(getCat());
  }

  _AddNews = (values, dispatch) => {
     alert(JSON.stringify(values)); 
  }


  render() {

    const { handleSubmit, reset, invalid, valid } = this.props;

    return (
      <Container>
        <Content padder>
          <Form>

            <Field name="topic" component={renderField} label='หัวข้อ' />

            <Field name="detail" component={renderField2} label='รายละเอียดข่าว' />

            <Field name="category_id" component={renderField3} label='หมวดหมู่ข่าว' category={this.props.category} />

            <Button
              onPress={handleSubmit(this._AddNews)}
              onLongPress={reset}
              disabled={invalid}
              block
              style={{ marginTop: 30, backgroundColor: valid ? '#008b54' : 'grey' }}
            >
              <Text style={{ color: 'white', fontSize: 18 }}>เพิ่มข่าว</Text>
            </Button>

          </Form>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
     category: state.catReducer.category
  }
}

AddNewsScreen = connect(mapStateToProps)(AddNewsScreen)

export default reduxForm({
  form: 'frmAddNews',
  validate
})(AddNewsScreen)
