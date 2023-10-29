import React,{Component} from "react";
import { TextInput,View,StatusBar,Button,KeyboardAvoidingView } from "react-native";
import style from './styles'

import PropTypes from 'prop-types'

// big red errors
//console.error('hshsha')
//throw new Error('big error here')

//yellow less aggressive errors
//console.warn('hi,hello')

export default class AddContactForm extends Component{
    static propTypes  = {
        addContact: PropTypes.func,
    }

    state = {
        name: '',
        phone: '',
        isFormvalid: false,
    }

    componentDidUpdate(prevProps,prevState){
        if (this.state.name !== prevState.name || this.state.phone !== prevState.phone) {
            this.checkFormValid();            
        }
    }

    handleUpdate = key => val => {
            this.setState({[key]:val})
        }

    handleNameChange = name => {
        this.setState({name})            
    }

    handlePhoneChange = phone => {
        if (+phone >= 0 && phone.length <= 10) {
            this.setState({phone})
        }
    }

    checkFormValid = () => {
        if (+this.state.phone >= 0 && this.state.phone.length == 10 && this.state.name.length > 3) {
            this.setState(({
                isFormvalid: true
            }))
            // return true          
        }
        else{
            this.setState(({
                isFormvalid: false
            }))
        }
        // return false
    }

    handleSubmit = () => {
        // if (this.checkFormValid) {
        this.props.onSubmit({name:this.state.name,phone:this.state.phone})            
        // }
    }

    render(){
        return (
            <KeyboardAvoidingView behavior="padding" style={[style.container,style.formContainer]}>
                <TextInput style={style.input}
                placeholder="Name"
                value={this.state.name} onChangeText={this.handleUpdate('name')} />
                <TextInput 
                    style={style.input} 
                    value={this.state.phone} 
                    onChangeText={this.handleUpdate('phone')}
                    keyboardType="numeric"    
                    placeholder="Telephone number"
                />
                <Button title='Add Contact' disabled={!this.state.isFormvalid} onPress={this.handleSubmit} />
                <Button title='Go home' onPress={() => this.props.navigation.goBack()} />
                <StatusBar style='auto' /> 
            </KeyboardAvoidingView>
        )
    }
}
