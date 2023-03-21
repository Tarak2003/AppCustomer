import React, { useState, useEffect, useCallback } from 'react';
import {View, Text, TextInput, StyleSheet, Platform, Alert, Button} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as userAction from '../store/actions/userDetails';
//import ImgPicker from '../components/imageSelector';

const IntroForm = props => {

    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector((state) =>
        {state.user.userProducts.find((prod) => {prod.id === prodId})}
    ); 
    const dispatch = useDispatch();

    const [name, setName] = useState(editedProduct ? editedProduct.name : '')
    const [titleIsValid, setTitleIsValid] = useState(false)
    const [location, setLocation] = useState(editedProduct ? editedProduct.location : '')
    const [locationIsValid, setLocationIsValid] = useState(false)
    //const [selectedImage, setSelectedImage] = useState()

    /* const imageTakenHandler = imagePath => {
      setSelectedImage(imagePath)
    } */

    const submitHandler = useCallback(() => {
        if (!titleIsValid || !locationIsValid) {
          Alert.alert('Wrong Input!', 'Please enter properly', [
            {text: 'Okay'}
          ])
          return
        }
        if (editedProduct) {
          dispatch(
            userAction.updateProduct(prodId, name, location)
          );
        } else {
          dispatch(
            userAction.createProduct(name, location)
          );
        props.navigation.navigate('Feed')
        }
      }, [dispatch, prodId, name, location]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);
    
      const titleChangeHandler = text => {
        if (text.trim().length === 0){
          setTitleIsValid(false)
        } else {
          setTitleIsValid(true)
        }
        setName(text)
      }

      const locationChangeHandler = text => {
        if (text.trim().length === 0){
          setLocationIsValid(false)
        } else {
          setLocationIsValid(true)
        }
        setLocation(text)
      }

    return(
        <View style={styles.form}>
            <View style={styles.formControl}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={titleChangeHandler}
                  keyboardType='default'
                  autoCapitalize='sentences'
                  returnKeyType='next'
              />
            </View>
            <View style={styles.formControl}>
            <Text style={styles.label}>Location</Text>
              <TextInput
                  style={styles.input}
                  value={location}
                  onChangeText={locationChangeHandler}
                  keyboardType='default'
                  autoCapitalize='sentences'
                  returnKeyType='next'
              />
            </View>
            <View>
                <Button title='next' color='black' onPress={submitHandler}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  formControl: {
    width: '100%',
    paddingHorizontal: 30,
    paddingVertical: 15
  },
  label: {
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  errorContainer: {
    marginVertical: 5
  },
  errorText: {
    color: 'red',
    fontSize: 14
  }
});

export default IntroForm