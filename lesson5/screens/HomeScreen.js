import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AddContactForm from './AddContactScreen'
import Home from './ContactList'
import Third from './Testscreen'
// import contacts,{compareNames} from '../contacts'
import users from '../api'
import ContactDetails from './ContactDetails'
import {store} from '../store';

import { Provider } from 'react-redux';

const HomeTab = createMaterialBottomTabNavigator()



export default class HomeScreen extends React.Component{
    state = {
        contacts: [],
    }

    addContact = newContact => {
        this.setState(prevState => ({
            contacts: [...prevState.contacts,newContact]
        }))
        // this.props.navigation.navigate('Home');
    }

    componentDidMount = () => {
        // const results = await this.fetchUsers()
        this.fetchUsers()
    }

    fetchUsers = async () => {
        const results = await users()
        this.setState({
            contacts: results
        })
    }

    render(){
        const contacts = store.getState().contact;
        return(
                <HomeTab.Navigator initialRouteName='Home' activeColor="black" barStyle={{ backgroundColor: 'aqua' }}>
                    <HomeTab.Screen name="Home" options={{animationTypeForReplace: 'pop',title:'Home',tabBarLabel: 'Home',tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="home" color={color} size={26} />),}} >
                        {(props) => <Home {...props} contacts={contacts} addContact={this.addContact} />}
                    </HomeTab.Screen>
                    <HomeTab.Screen name="AddContact" options={{animationTypeForReplace: 'pop',title:'Add contact',tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="contacts" color={color} size={26} />),}} >
                        {(props) => <AddContactForm {...props} addContact={props.addContact} />}
                    </HomeTab.Screen>
                    <HomeTab.Screen name="Third" initialParams={{screen:'Settings'}} options={{animationTypeForReplace: 'pop',title:'Settings',tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="pinwheel" color={color} size={26} />),}} >
                        {(props) => <Third {...props} />}
                    </HomeTab.Screen>
                    <HomeTab.Screen name="AddContactDetails" initialParams={{contact:contacts[0]}} options={{animationTypeForReplace: 'pop',title:'Contact details',tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="details" color={color} size={26} />),}} >
                        {(props) => <ContactDetails {...props} contacts={contacts} goBack={() => {
                            props.navigation.navigate('Contacts',{screen:'Home'})
                        }} />}
                    </HomeTab.Screen>
                </HomeTab.Navigator>
        )
    }
}