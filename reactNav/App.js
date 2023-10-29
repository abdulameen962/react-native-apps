import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button } from 'react-native';
import { NavigationContainer,createSwitchNavigator } from '@react-navigation/native';
import React,{Component} from 'react';

class FirstComponent extends Component{
  render(){
    return (
      <View style={styles.container}>
        <Text>First page</Text>
        <Button title='Go to second page' onPress={() => this.props.navigation.navigate('Secondpage')} />
        <StatusBar style="auto" />
      </View>
    );
  }
}

class Secondcomponent extends Component{
  render(){
    return (
      <View style={styles.container}>
        <Text>Second page</Text>
        <Button title='Go to first page' onPress={() => this.props.navigation.navigate('Firstpage')} />
        <StatusBar style="auto" />
      </View>
    );
  }
}


const AppNavigator = createSwitchNavigator({
  'Firstpage': FirstComponent,
  'Secondpage': Secondcomponent
})

export default class App extends React.Component {
  render(){
    // return (
    //   <View style={styles.container}>
    //     <Text>Open up App.js to start working on your app!</Text>
    //     <StatusBar style="auto" />
    //   </View>
    // );
    return (
      <AppNavigator/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
