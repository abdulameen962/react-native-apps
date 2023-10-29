import React from "react";

import { StyleSheet, Text, TouchableOpacity, View,Image,ImageBackground } from 'react-native';
import { Magnetometer } from 'expo-sensors';
import styles from '../styles'
import * as ScreenCapture from 'expo-screen-capture';
import * as MediaLibrary from 'expo-media-library';

class Compass extends React.Component{
    state = {
        isReady: false,
        v: null    
    }

    componentDidMount = () => {
        this.setUpMagnetometer();
        if (this.hasPermissions()) {
            subscription = ScreenCapture.addScreenshotListener(() => {
                this.preventScreenshot();
            })
            return () => subscription.remove();
        }
    }

    // componentWillUnmount = () => {
    //     ScreenCapture.removeScreenshotListener(this.subscription);
    // }

    setUpMagnetometer = async () => {
        Magnetometer.addListener((v) => {
            this.setState({v})
        });
    }

    hasPermissions = async () => {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        return status === 'granted';
    };

    preventScreenshot = async () => {
        await ScreenCapture.preventScreenCaptureAsync();
    }

    allowScreenshot = async () => {
        await ScreenCapture.allowScreenCaptureAsync();
    };

    componentWillUnmount = () => {
       Magnetometer.removeAllListeners();
    }

    render(){
        let theta = '0rad';
        if (this.state.v !== null) {
            let {x,y,z} = this.state.v;
            theta = Math.atan(-x/y);
            if (-x > 0 && y > 0) {
                //
            }
            else if(y > 0) {
                theta += Math.PI;
            }
            else{
                theta += Math.PI * 2; 
            }
            theta = `${theta}rad`;
        }
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../assets/compass.png')} style={[styles.imgBg]}>
                    <Image source={require('../assets/needle.png')} style={[styles.compassNeedle,{
                        transform: [{rotate:theta}]
                    }]} />
                </ImageBackground>
            </View>
        )
    }
}


export default Compass
