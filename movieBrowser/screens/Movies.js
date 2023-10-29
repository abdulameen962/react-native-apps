import React from "react";
import { View,Text } from "react-native";
import styles from "../styles";
import { StatusBar } from "expo-status-bar";
import MovieSingle from "./MovieSingle"
import { getMovies } from "../api";
import { BlurView } from 'expo-blur'

class Movies extends React.Component {
    state = {
        movies: []
    }

    componentDidMount = () => {
        this.getStuff();
    }

    getStuff = async () => {
        const movies = await getMovies(this.props.apiKey);
        this.setState({movies});
    }

    render(){
        if (this.state.movies.length === 0) return <Text>Waiting...</Text>

        return (
            <View style={styles.container}>
                <MovieSingle {...this.state} {...this.props} />
                <StatusBar style="auto" />
            </View>
        )
    }
}

export default Movies
