import React,{Component} from 'react'
import { Text } from 'react-native'
import {createNativeStackNavigator,NativeStackScreenProps} from '@react-navigation/native-stack'
import Movies from './Movies'
import Detail from './MovieDetails'

const HomeStack = createNativeStackNavigator();

class Home extends Component{
    render() {
        return (
            <HomeStack.Navigator initialRouteName='Movie' screenOptions={{
                headerStyle: {
                  backgroundColor: '#f4511e',
                  height:50,
                },
                headerShadowVisible:false,
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}>
                <HomeStack.Screen name='Movie' options={{animationTypeForReplace: 'pop'}}>
                    {(props) => <Movies {...props} {...this.props} />}
                </HomeStack.Screen>
                <HomeStack.Screen name='MovieDetail' options={{animationTypeForReplace: 'pop',title:'Movie Detail'}}>
                    {(props) => <Detail {...props} {...this.props} />}
                </HomeStack.Screen>
            </HomeStack.Navigator>
        )
    }
}

export default Home