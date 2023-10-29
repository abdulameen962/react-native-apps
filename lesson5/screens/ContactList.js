import { StatusBar } from 'expo-status-bar';
import {View,ScrollView,Button} from 'react-native';
import React from 'react';
import { createMaterialBottomTabNavigator,createMaterialTopTabNavigator } from '@react-navigation/material-bottom-tabs';
// import { PURGE } from 'redux-persist';
// import Example from './examples/0-Switch';
// export default Example

// import contacts,{compareNames} from '../contacts'
import styles from '../styles'
import Contactlist from '../contactslist'
import { connect } from 'react-redux';

const Tab = createMaterialBottomTabNavigator();

class Home extends React.Component{
    // state = {
    //     showContacts: true,
    //     contacts: contacts,
    //   }
    
    // //   toggleContacts = () => {
    // //     this.setState(prevState => ({
    // //       showContacts : !prevState.showContacts
    // //     }))
    // //   }
    
    // addContact = newContact => {
    // this.setState(prevState => ({
    //     contacts: [...prevState.contacts,newContact]
    // }))
    // this.props.navigation.navigate('Home');
    // }
    
    //   toggleForm = () => {
    //     this.setState(prevState => ({
    //       showForm : !prevState.showForm
    //     }))
    //   }
    
    //   sort = () => {
    //     this.setState(prevState => ({
    //       contacts: [...prevState.contacts].sort(compareNames),
    //     }))
    //   }

      render(){
        // if (this.state.showForm) return <AddContactForm onSubmit={this.addContact} />
        return (
          <View style={styles.container}>
            {/* <Button title='Toggle contacts' onPress={() => this.toggleContacts()} /> */}
            {/* <Button title='Add Contact' onPress={() => this.props.navigation.navigate('AddContact')} /> */}
            {/* <Button title='Go to third screen' onPress={() => this.props.navigation.navigate('Third',{
                screen: 'Settings',
            })} /> */}
            <Contactlist contacts={this.props.contacts} onSelectContact={(contact) => {
                this.props.navigation.navigate('AddContactDetails',{
                    contact: contact
                })
            }}  />
            {/* {
              this.state.showContacts ? (
                // <FlatList
                //   renderItem={this.renderItem}
                //   data={this.state.contacts}
                // />
                <Contactlist contacts={this.state.contacts}  />
              ): null
            } */}
            <StatusBar style="auto" />
          </View>
        );
      }
}

// export default Home

const mapStateToProps = (state,ownProps) => ({
  contacts: ownProps.contacts,
})

export default connect(mapStateToProps)(Home)
