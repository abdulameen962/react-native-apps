import React from "react";

import { StyleSheet, Text, TouchableOpacity, View,Image,ImageBackground } from 'react-native';
import { DeviceMotion } from 'expo-sensors';
import styles from '../styles'

class Sensor extends React.Component{
    state = {
        isReady: false,
        dm: null    
    }

    componentDidMount = () => {
        this.DeviceMotion()
    }

    DeviceMotion = async () => {
        DeviceMotion.addListener((dm) => {
            this.setState({dm})
        });
        DeviceMotion.setUpdateInterval(16);
    }

    componentWillUnmount = () => {
        DeviceMotion.removeAllListeners();
    }


    render(){
        let angle = 0;
        if (this.state.dm && this.state.dm.rotation ) {
            angle = - this.state.dm.rotation.gamma;
        }
        return (
            <View style={styles.container}>
                <Image source={require('../assets/balloons.png')} style={{
                    width:342,
                    height:398,
                    transform: [{rotate: `${angle}rad`}]
                }} />
            </View>
        )
    }
}


export default Sensor
