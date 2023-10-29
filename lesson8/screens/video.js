import React,{useCallback} from 'react'
import styles from '../styles'
import { Text,View,TouchableHighlight,ScrollView } from 'react-native'
import { Video, ResizeMode,Audio } from 'expo-av';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import AppLoading from 'expo-app-loading';

let green = '#477009'
let yellow = '#fcd602'

class VideoClass extends React.Component{
    state = {
        isLoaded: false
    }

    setAudio = async () => {
        await Audio.setAudioModeAsync({
            playsInSilentModeIOS: true,
            playThroughEarpieceAndroid: true,
            shouldDuckAndroid: true,
        })
    }

    loadAssetsAsync = async () => {
        await Asset.loadAsync([
            require('../assets/1.mp4'),
            require('../assets/2.mp4'),
            require('../assets/3.mp4'),
            // require('../assets/4.mp4'),
            // require('../assets/5.mp4'),
            // require('../assets/6.mp4'),
            // require('../assets/7.mp4'),
            // require('../assets/8.mp4'),
            // require('../assets/9.mp4'),

        ])
    }

    loadFontAsync = async () => {
        Font.loadAsync({
            CooperBlack: require('../assets/CooperBlackRegular.ttf')
        });
    }

    setupAsync = async () => {
        await Promise.all([
            this.loadAssetsAsync(),
            this.loadFontAsync(),
            this.setAudio()
        ]);
        await SplashScreen.hideAsync();
        this.setState({
            isLoaded: true
        });
    }

    componentDidMount = () => {
        SplashScreen.preventAutoHideAsync();
        this.setupAsync();
        // this.setAudio()
    }

    render(){
        if (this.state.isLoaded == false) {
            return (
                <Text>Waiting...</Text>
            )
        }
        return (
            <View style={[styles.vidContain,{
                backgroundColor: green,
            }]}>
                <Text style={{
                    color: yellow,
                    fontSize: 42,
                    fontFamily: "CooperBlack"
                }}>Cat sounds</Text>
                <ScrollView contentContainerStyle={styles.row}>
                    <CatVideoBtn source={require('../assets/1.mp4')} />
                    <CatVideoBtn source={require('../assets/2.mp4')} />
                    <CatVideoBtn source={require('../assets/3.mp4')} />
                </ScrollView>
                {/* <ScrollView contentContainerStyle={styles.row}>
                    <CatVideoBtn source={require('../assets/4.mp4')} />
                    <CatVideoBtn source={require('../assets/5.mp4')} />
                    <CatVideoBtn source={require('../assets/6.mp4')} />
                </ScrollView>
                <ScrollView contentContainerStyle={styles.row}>
                    <CatVideoBtn source={require('../assets/7.mp4')} />
                    <CatVideoBtn source={require('../assets/8.mp4')} />
                    <CatVideoBtn source={require('../assets/9.mp4')} />
                </ScrollView> */}
            </View>
        )
    }
}

class CatVideoBtn extends React.Component {

    resetAsync = async () => {
        await this._video.stopAsync();
        await this._video.setPositionAsync(0);
    }

    playAsync = async () => {
        await this._video.replayAsync()
    }

    render() {
        return (
            <View>
                <TouchableHighlight onPress={this.playAsync} styles={styles.video}>
                <Video source={this.props.source} 
                style={styles.video} 
                shouldPlay
                // resizeMode={ResizeMode.CONTAIN}
                resizeMode='cover'
                // isLooping
                // useNativeControls
                ref = {(c) => {this._video = c}}
                onPlaybackStatusUpdate={(status) => {
                    if (status.didJustFinish) {
                        this.resetAsync()
                    }
                }}
                />
                </TouchableHighlight>
            </View>
        )
    }
}


export default VideoClass