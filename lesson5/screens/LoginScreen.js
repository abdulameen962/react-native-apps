import React from "react";
import { View,Text,Button,TextInput,TouchableOpacity,Pressable,ScrollView } from "react-native";
import styles from "../styles";
import {login} from '../api'
import { connect } from "react-redux";
import { loginUser } from "../actions";
import Proptypes from "prop-types";

class Login extends React.Component{
    static propTypes = {
        err: Proptypes.string,
        token: Proptypes.string,
        loginUser: Proptypes.func,
        activeUser: Proptypes.func,
    }
    state = {
        username: '',
        password: '',
        disabled: true,
    }

    componentDidUpdate = (prevProps,prevState) => {
        if (prevState.username !== this.state.username || prevState.password !== this.state.password) {
            if (this.state.username.length > 1 && this.state.password.length > 1) {
                this.setState({
                    disabled: false
                })
            }   
        }
    }

    handleChange = key => val => {
        this.setState({[key]:val})
    }

    static getDerivedStateFromProps(nextProps,state){
        try{
            if (nextProps.token) {
                nextProps.activeUser();
            }
            return null;
        }
        catch(error){
            return null;
        }
        
    }

    userLogin = async () => {
        this.props.loginUser(this.state.username,this.state.password)
        // console.log(success);
        // if (success){
            // this.props.activeUser();
            // return;
        // }
    }

    render(){
        return(
            // <Tab.Navigator>
            //     <Tab.Screen name="Feed" component={Feed} />
            //     <Tab.Screen name="Messages" component={Messages} />
            // </Tab.Navigator>
            <ScrollView contentContainerStyle={[styles.container,styles.loginContainer]}>
                <Text style={styles.h1}>Login here</Text>
                {
                    this.props.err ? (
                        <Text style={{color:'red',fontSize:20}}>{this.props.err}</Text>
                    ): null
                }
                <TextInput
                    placeholder="username"
                    style={styles.input}
                    value={this.state.username}
                    onChangeText={this.handleChange('username')}
                    autoCapitalize="none"
                />
                <TextInput
                    value={this.state.password}
                    style={styles.input}
                    placeholder="password"
                    onChangeText={this.handleChange('password')}
                    autoCapitalize="none"
                    secureTextEntry
                    autoComplete="off"
                    
                />
                <TouchableOpacity onPress={this.userLogin} style={styles.submitBtn} disabled={this.state.disabled}>
                    <Text style={styles.textWhite}>Login</Text>
                </TouchableOpacity>
                {/* <Button title="Press to login" onPress={this.props.activeUser} /> */}
            </ScrollView>
        )
    }
    _login = () => {
        //navigate to main page 
    }
}

const mapStateToProps = (state,ownProps) => ({
    err: state.user.loginErr || null,
    token: state.user.token || null,
    activeUser: ownProps.activeUser,
})

export default connect(mapStateToProps,{loginUser})(Login)