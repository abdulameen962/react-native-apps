import React,{Component} from 'react';
import * as SecureStore from 'expo-secure-store';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import { NavigationContainer } from "@react-navigation/native";
import Home from './screens/Homescreen';
import Search from './screens/Searchscreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as SplashScreen from 'expo-splash-screen';
import { Text } from 'react-native';

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

/***
 * This function checks whether the key exists in secure store
 * @param value doesnt need any value
 * @returns true if the key exists, false otherwise
 */
const checkKey = async() => {
  let res = await SecureStore.getItemAsync('movieKey');
  if(res === null) {
    await save('movieKey','64104834')
  }
}

checkKey();

const BottomTab = createMaterialBottomTabNavigator()

export default class App extends React.Component {
  state = {
    apiKey: null
  }

  componentDidMount = () => {
    this.getMovieKey();
  }

  getMovieKey = async () => {
    let result = await SecureStore.getItemAsync('movieKey');
    this.setState({
      apiKey: result
    })
  }

  render() {
    if(this.state.apiKey === null) return <Text>Waiting...</Text>

    return (
      <NavigationContainer>
        <BottomTab.Navigator initialRouteName='Home' activeColor="black" barStyle={{ backgroundColor: 'lightblue',height:70 }}>
          <BottomTab.Screen name="Home"
            options={{animationTypeForReplace: 'pop',title:'Home',tabBarLabel: 'Home',tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="home" color={color} size={26} />),}}
            >
              {(props) => <Home {...props} apiKey={this.state.apiKey} />}
          </BottomTab.Screen>
          <BottomTab.Screen name="Search"
              options={{animationTypeForReplace: 'pop',title:'Search',tabBarLabel: 'Search',tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="select-search" color={color} size={26} />),}}
          >
            {(props) => <Search {...props} apiKey={this.state.apiKey} />}
          </BottomTab.Screen>
        </BottomTab.Navigator>
      </NavigationContainer>
    )
  }
}

