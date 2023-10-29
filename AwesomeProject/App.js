import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Button, Switch } from 'react-native';

// import Constants from 'expo-constants';
import React, { Component } from 'react';
import Counter from './components'
import styles from './styles'

export default class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      showCounter: true,
    }
  }

  toggleCounter = () => {
    this.setState(prevState => ({
      showCounter: !prevState.showCounter
    }))
  }
  render(){
    if (this.state.showCounter) {
      return (
        <View style={[styles.container,styles.flexer,styles.listContainer]}>
          <Button title='Hide counter' onPress={this.toggleCounter} />
          <Counter />
        </View>
      ) 
    }
    else{
      return (
        <View style={[styles.container,styles.flexer,styles.listContainer]}>
          <Button title='Show counter' onPress={this.toggleCounter} />
          <Text>Updating the app</Text>
        </View>
      )
    }
  }
}