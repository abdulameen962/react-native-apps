import 'react-native-gesture-handler';
import React from 'react'
import { Button } from 'react-native';
// import Example from './examples/0-Switch';
// export default Example
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import * as SplashScreen from 'expo-splash-screen';
import { Provider } from 'react-redux';
import {store,persistor} from './store';
import { PersistGate } from 'redux-persist/integration/react'

async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
}

const Stack = createNativeStackNavigator();

import Login from './screens/LoginScreen'
import styles from './styles'
import HomeScreen from './screens/HomeScreen'

export default class App extends React.Component {
    state = {
        userAuth: false,
    }

    componentDidMount = () => {
        try{
            if (store.user.token) {
                this.setState({
                    userAuth: true
                })
            }
        }
        catch(error){
            this.setState({
                userAuth: false
            })
        }
    }

    activateUser = () => {
        // save('userAuth',!this.state.userAuth)
        this.setState(prevState => ({
            userAuth: !prevState.userAuth
        }))
    }
    // componentDidUpdate = () => {
    //     // console.log('it is updating');
    //     async function setNew(){
    //         let updated_result = await SecureStore.getItemAsync('userAuth');
    //         // if (updated_result.isLoading) {
    //         //     // We haven't finished checking for the token yet
    //         //     return <SplashScreen />;
    //         // }
    //         if (updated_result !== this.state.userAuth){
    //             this.setState({
    //                 userAuth: updated_result
    //             })
    //         }
    //     }
    //     setNew();

    // }

    getRouteName = () => {
        if(this.state.userAuth) {
            return 'Contacts'
        }
        return 'Login'
    }

    render(){
        return(
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <NavigationContainer>
                        <Stack.Navigator
                            screenOptions={styles.headerStyle} initialRouteName={this.getRouteName}>
                            {this.state.userAuth == false ? (
                                <Stack.Screen name='Login' options={{ headerShown: false,
                                animationTypeForReplace: this.state.userAuth ? 'pop' : 'push',
                                }}>
                                    {(props) => <Login {...props} activeUser={this.activateUser}  />}
                                </Stack.Screen>
                            ):(
                                <>
                                    <Stack.Screen name="Contacts" options={{ headerShown: false,animationTypeForReplace: 'pop',}} >
                                        {(props) => <HomeScreen {...this.state} {...props} addContact={this.addContact} />}
                                    </Stack.Screen>
                                </>
                            )}
                            {/* <Stack.Screen name="Notifications" component={Notifications} />
                            <Stack.Screen name="Profile" component={Profile} />
                            <Stack.Screen name="Settings" component={Settings} /> */}
                        </Stack.Navigator>
                    </NavigationContainer>
                </PersistGate>
            </Provider>
        )
    }
}
