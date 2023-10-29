import React from "react";
import { Button,Text,View } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import styles from '../styles'

class ContactDetails extends React.Component{
    useFocusEffect = () => (
        React.useCallback(() => {
            // Do something when the screen is focused
            this.props.navigation.setOptions({
                title: this.props.route.params.contact.name
            })
            return () => {
              // Do something when the screen is unfocused
              // Useful for cleanup functions
            };
          }, [])
    )
    // componentDidMount = () => {

    // }

    // componentDidUpdate = () => {
    //     this.props.navigation.setOptions({
    //         title: this.props.route.params.contact.name
    //     })  
    // }

    // goHome = () =>{
    //     console.log('it came here');
    //     this.props.navigation.navigate('AddContact');
    // }

    render(){
        return(
            <View style={[styles.container,{flex:1}]}>
                <Text>Name {this.props.route.params.contact.name} </Text>
                <Text>Phone {this.props.route.params.contact.phone} </Text>
                <Button title="Go to random contact" onPress={this._goToRandom} />
                <Button title="Go to main screen" onPress={this.props.goBack} />
            </View>
        )
    }
    _goToRandom = () => {
        //Todo
        const contacts = this.props.contacts;
        const phone = this.props.route.params.contact.phone;
        let randomContact;
        while (!randomContact) {
            const randomIndex = Math.floor(Math.random() * contacts.length);
            if (contacts[randomIndex].phone !== phone) {
                randomContact = contacts[randomIndex];
                this.props.navigation.push('Contacts',{
                    screen: 'AddContactDetails',
                    params: {
                        contact: randomContact,
                    }
                })
            }
        }
    }
}


export default ContactDetails