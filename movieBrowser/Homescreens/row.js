import React from "react";
import { View,Image,Text,Pressable } from "react-native";
import styles from "../styles";
import {Asset} from 'expo-asset'
import * as SplashScreen from 'expo-splash-screen';
import PropTypes from 'prop-types'

import Animated, { FadeInLeft } from 'react-native-reanimated';

class Row extends React.Component{
    static propTypes = {
        Poster: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
        Year: PropTypes.string.isRequired,
        Type: PropTypes.string.isRequired,
        imdbID: PropTypes.string.isRequired,
        navigation: PropTypes.object.isRequired
    }

    state = {
        isReady: true
    }
    // loadAssetsAsync = async () => {
    //     await Asset.loadAsync([
    //         {uri: this.props.Poster}
    //     ])
    // }

    // componentDidMount(){
    //     this.loadAssetsAsync();
    //     this.setState({
    //         isReady: true
    //     })
    // }

    render(){
        if (this.state.isReady === false) return <Text>Waiting...</Text>
        const prop = this.props;
        const image = {uri: prop.Poster};
        return (
            <View>
                <Pressable onPress={() => this.props.navigation.navigate("Home",{
                    screen: 'MovieDetail',
                    imdbID: this.props.imdbID,
                    image: this.props.Poster,
                    apiKey: this.props.apiKey
                    })} 
                    style={styles.row}
                >
                <View>
                    <Image source={image} style={styles.image}
                        resizeMode="cover"
                        blurRadius={0}
                        quality={100}
                        fadeDuration={0}
                        resizeMethod="auto"
                        progressiveRenderingEnabled={true}
                        progressiveRenderingScale={2}
                        progressiveRenderingQuality="low"  
                        // entering={FadeInLeft.duration(400)}
                        // sharedTransitionTag={this.props.imdbID}
                    />
                </View>
                <View>
                    <Text>{prop.Title}</Text>
                    <Text>Year: {prop.Year}</Text>
                    <Text>Type: {prop.Type}</Text>
                </View>
            </Pressable>
            </View>
        )
    }
} 

export default Row