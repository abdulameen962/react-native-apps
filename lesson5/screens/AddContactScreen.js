import React,{Component} from 'react'

import AddContactForm from '../AddContactForm'

import {connect} from 'react-redux';
import store from '../store';

import { addContact } from '../actions';

class AddContactScreen extends Component{
    handleSubmit = formState => {
        store.dispatch(addContact(formState))
        // this.props.addContac(formState);
        // this.props.navigation.navigate('Home');
        this.props.navigation.navigate('Home');
    }
    render(){
        return(
            <AddContactForm onSubmit={this.handleSubmit} {...this.props} />
        )
    }
}

// export default AddContactScreen

export default connect(null,{addContac:addContact})(AddContactScreen)