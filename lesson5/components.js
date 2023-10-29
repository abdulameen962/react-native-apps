import { StyleSheet, Text, View,ScrollView,Button,Pressable,TouchableOpacity } from 'react-native';
import React,{Component} from 'react'
import styles from './styles'

class Contact extends React.PureComponent{
  render(){
    const {props} = this
    return (
      <Pressable style={[styles.row]} onPress={() => {
        // debugger;
        props.onSelectContact({name:props.name,phone:props.name})
        }}>
        <Text> {props.name} {props.phone} </Text>
      </Pressable>
    )
  }
}

export default Contact