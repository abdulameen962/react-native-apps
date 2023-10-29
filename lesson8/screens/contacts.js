import React from "react";
import * as Contacts from 'expo-contacts'
import { StyleSheet, View, Text, Button } from 'react-native';
import styles from '../styles'

class Contact extends React.Component{
    state = {
        randomContact: null
    }

    // componentDidMount = () => {
    //     this.getContacts();
    // }

    // componentDidUpdate = () => {
    //     this.getContacts();
    // }

    getContacts = async () => {
        const {status} = await Contacts.requestPermissionsAsync();

        if (status == 'granted') {
            const { data } = await Contacts.getContactsAsync({
                fields: [Contacts.Fields.PhoneNumbers],
                // pageSize: 1,
                pageOffset: 0,
            })

            let total = data.length;
            let n = Math.floor(Math.random() * total);
            // console.log(n);
            let randomContact = data[n];
            this.setState({
                randomContact
            })
            // if (data.length > 0) {
            //     const contact = data[0]
            //     // console.log(contact)
            //     // console.log(data)
            // }
        }
        // const contact = {
        //     [Contacts.Fields.FirstName]: 'Bird',
        //     [Contacts.Fields.LastName]: 'Man',
        //     [Contacts.Fields.Company]: 'Young Money',
        //   };
        //   const contactId = await Contacts.addContactAsync(contact);
    }

    render() {
        return(
            <View style={styles.container}>
                <Button title="Choose random" onPress={this.getContacts} />
                {
                    this.state.randomContact && (
                        <Text>{this.state.randomContact.name}</Text>
                    ) || (
                        <Text>Waiting...</Text>
                    )
                }
            </View>
        )
    }
}

export default Contact