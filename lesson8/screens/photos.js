import React,{ useState, useEffect, useRef } from "react";
import * as ImagePicker from 'expo-image-picker';
import { Text,View,ScrollView,Image,Button,TouchableOpacity } from "react-native";
import styles from "../styles";
import * as ImageManipulator from 'expo-image-manipulator';
import { Camera, CameraType } from 'expo-camera';

class Photos extends React.Component{
    state = {
        chosenImage: [],
        customCameraReady: false,
        TypeCamera: CameraType.back
    }
    launcCameraRollAsync = async () => {
        let {status} = await ImagePicker.requestCameraPermissionsAsync();
        

        if (status !== 'granted') {
            console.error('Camera roll perms not granted');
            return;
        }

        let imagePicker = await ImagePicker.launchImageLibraryAsync({allowsMultipleSelection:true});
        let asset = imagePicker['assets'];
        if (asset !== null) {
            this.setState(prevState => ({
                chosenImage: [...prevState.chosenImage,...asset]
            }))   
        }
    }

    // getProjectId = async () => {
    //     token = await Notifications.getExpoPushTokenAsync({
    //         projectId: Constants.expoConfig.extra.eas.projectId,
    //     });
    //     console.log(Constants.expoConfig["extra"]);
    // }

    launchCameraAsync = async () => {
        let {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            console.error('Camera roll perms not granted');
            return;
        }

        let imagePicker = await ImagePicker.launchCameraAsync({allowsEditing:true});
        let asset = imagePicker['assets'];
        let flippedImg = await ImageManipulator.manipulateAsync(asset[0].uri,[
            {flip: ImageManipulator.FlipType.Horizontal},
        ])
        if (asset !== null) {
            this.setState(prevState => ({
                chosenImage: [...prevState.chosenImage,flippedImg]
            }))   
        }
    }

    launchCustomCameraAsync = async () => {
        let status = await Camera.requestCameraPermissionsAsync() && await Camera.requestMicrophonePermissionsAsync();

        if (status["status"] !== 'granted' || status["granted"] == false) {
            console.error('Camera roll perms not granted');
            return;
        }

        this.setState({
            customCameraReady: true,
        })
    }

    componentDidMount = () => {
        this.launchCustomCameraAsync();
        // notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        //   setNotification(notification);
        // });
    
        // responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        //   console.log(response);
        // });
    
        // return () => {
        //   Notifications.removeNotificationSubscription(notificationListener.current);
        //   Notifications.removeNotificationSubscription(responseListener.current);
        // };
        // console.log(expoPushToken);
    }

    toggleCameraType = () => {
        let newType;
        if (this.state.TypeCamera == CameraType.back ) {
            newType = CameraType.front;
        }
        else{
            newType = CameraType.back;
        }
        this.setState({
            TypeCamera: this.state.TypeCamera == CameraType.back ? CameraType.front : CameraType.back
        })
    }

    render(){
        return(
            <ScrollView contentContainerStyle={[styles.container]}>
                <ScrollView>
                    <View>
                        <Image source={require('../assets/new1.jpg')} style={styles.photo}  />
                        <Image source={require('../assets/new2.jpg')} style={styles.photo}  />
                        {
                            this.state.chosenImage.length > 0 && (
                                this.state.chosenImage.map((image,index) => <ShowImg key={index} image={image} />)
                            )
                        }
                    </View>
                    <Button title="Choose image" onPress={this.launcCameraRollAsync} />
                    <Button title="Launch Camera" onPress={this.launchCameraAsync} />

                    {
                        this.state.customCameraReady && (
                            <Camera style={styles.camera} type={this.state.TypeCamera}>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity style={styles.button} onPress={this.toggleCameraType}>
                                        <Text style={styles.text}>Flip Camera</Text>
                                    </TouchableOpacity>
                                </View>
                        </Camera>
                        ) || null
                    }
                </ScrollView>
            </ScrollView>
        )
    }
}

class ShowImg extends React.Component{
    render(){
        return (
            <Image
                source={{uri:this.props.image.uri}} 
                style = {styles.photo}
            />
        )
    }
}

export default Photos