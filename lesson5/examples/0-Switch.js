import React,{Component} from "react";
import { Button,View,Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


class ScreenComponentOne extends Component{
    render(){
        return (
            <View styles={{flex:1, alignItems:'center',justifyContent:'center',borderWidth:25,borderColor:'teal'}}>
                <Text>This is the first page</Text>
                <Button title="Go to about page" onPress={() => this.props.navigation.navigate('About')} />
                <Button title="Go back" onPress={() => this.props.navigation.goBack()} />
                <Button title="Pop to tp" onPress={() => this.props.navigation.popToTop()} />
            </View>
        )
    }
}

class About extends Component{
    render(){
        return (
            <View styles={{flex:1, alignItems:'center',justifyContent:'center',borderWidth:25,borderColor:'teal'}}>
                <Text>This is the about page page</Text>
                <Button title="Go to home page" onPress={() => this.props.navigation.navigate('Home')} />
                <Button title="Go back" onPress={() => this.props.navigation.goBack()} />
                <Button title="Pop to top" onPress={() => this.props.navigation.popToTop()} />
            </View>
        )
    }
}

// const AppNavigator = createStackNavigator ({
//     'Firstpage': ScreenComponentOne,
// })

export default class App extends React.Component{
    render(){
        return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen name="Home" component={ScreenComponentOne} options={{title:'Home page'}} />
                <Stack.Screen name="About" component={About} options={{title:'About page'}}  />
                {/* <Stack.Screen name="Notifications" component={Notifications} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="Settings" component={Settings} /> */}
            </Stack.Navigator>
        </NavigationContainer>
        )
    }
}