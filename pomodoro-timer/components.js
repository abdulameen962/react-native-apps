import React,{Component} from 'react'
import {TouchableOpacity,Image,View,Button,Pressable,Text} from 'react-native'

import styles from './styles'

class ControlBtn extends Component{
    render(){
        if (this.props.timer.playing) {
            return (
                <TouchableOpacity onPress={this.props.pause}>
                    <Image
                        source={require('./assets/pause.png')}
                        style={[styles.icons]}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            )
        }
        else{
            return (
                <TouchableOpacity onPress={this.props.play}>
                    <Image
                        source={require('./assets/play.png')}
                        style={[styles.icons]}
                        resizeMode='contain'
                    /> 
                </TouchableOpacity>
            )
        }
    }
}

export default ControlBtn

class CheckStart extends Component {
    render(){
        if (this.props.playing == false) {
            return(
                <Pressable style={[styles.button,styles.deepBtn]} onPress={this.props.start}>
                    <Text style={styles.btnText}> Start </Text>
                </Pressable>
            )
        }
        else{
            return (
                <Pressable style={[styles.button,styles.orangeBtn]} onPress={this.props.stop}>
                    <Text style={styles.btnText}> Stop </Text>
                </Pressable>
            )
        }
    }
}

class CheckState extends Component {
    render(){
        if (this.props.state == 'work') {
            return (
                <Pressable style={[styles.button,styles.orangeBtn,styles.bottomBtn]} onPress={this.props.break} >
                    <Text style={styles.btnText}> Take a break </Text>
                </Pressable>
            )
        }
        else{
            return (
                <Pressable style={[styles.button,styles.deepBtn,styles.bottomBtn]} onPress={this.props.work}>
                    <Text style={styles.btnText}> Start working </Text>
                </Pressable>
            )
        }
    }
}

export class BottomButtons extends Component{
    render(){
        return(
            <View>
                <CheckStart playing={this.props.timer.playing} start={this.props.start} stop={this.props.stop}  />
                <CheckState state={this.props.timer.type} break={this.props.break} work={this.props.work} />
            </View>
        )
    }
}
