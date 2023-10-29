import { StyleSheet } from "react-native";
import Constants from 'expo-constants'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
    },
    vidContain:{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
    },
    map:{
      width: '100%',
      height: '100%',
    },
    imgBg:{
        width: 320,
        height:320,
        alignItems: 'center',
        justifyContent: 'center'
    },
    compassNeedle: {
        width:420,
        height: 420,
        opacity: 0.65
    },
    video: {
        width: 100,
        height: 100,
        margin: 5
    },
    row: {
        flexDirection: 'row',
    },
    photo: {
        width:200,
        height:200,
        margin:5,
    },
    camera: {
        width: 300,
        height: 300
    },
    buttonContainer:{
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,.01)'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },  
    text:{
        color: 'white',
        fontSize: 22
    }
});

export default styles