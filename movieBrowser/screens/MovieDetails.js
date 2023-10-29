import React from "react";
import { View,Dimensions,Text,ScrollView,Image } from "react-native";
import Animated from 'react-native-reanimated';
import styles from "../styles";


class Detail extends React.Component{
    state = {
        movieDetail: null
    }

    // static navigationOptions = ({navigation}) => {
    //     return{
    //         headerTitle: `Screen name is dgdg`
    //     }
    // }

    componentDidMount(){
        this.getMovieDetail();
    }

    getMovieDetail = async () => {
        const movie = await fetch(`https://www.omdbapi.com/?i=${this.props.route.params.imdbID}&apikey=${this.props.route.params.apiKey}`)
        const movieDetail = await movie.json();
        this.setState({movieDetail});
    }

    render() {
        const {width} = Dimensions.get("window");
        return (
            <ScrollView>
                {/* <Animated.Text style={styles.text} sharedTransitionTag="tag">
                   {this.props.route.params.imdbID}
                </Animated.Text> */}
                <Image
                    source={{ uri: this.props.route.params.image }}
                    style={{ width: width, height: 300 }}
                    // sharedTransitionTag={this.props.route.params.imdbID}
                />
                {
                    this.state.movieDetail ? (
                        <>
                            <Text style={styles.text}>{this.state.movieDetail.Title}</Text>
                            <Text style={styles.text}>{this.state.movieDetail.Plot}</Text>
                            <Text style={styles.text}>{this.state.movieDetail.Year}</Text>
                            <Text style={styles.text}>{this.state.movieDetail.Rated}</Text>
                            <Text style={styles.text}>{this.state.movieDetail.Released}</Text>
                            <Text style={styles.text}>{this.state.movieDetail.Runtime}</Text>
                            <Text style={styles.text}>{this.state.movieDetail.Genre}</Text>
                            <Text style={styles.text}>{this.state.movieDetail.Director}</Text>
                            <Text style={styles.text}>{this.state.movieDetail.Writer}</Text>
                            <Text style={styles.text}>{this.state.movieDetail.Actors}</Text>
                            <Text style={styles.text}>{this.state.movieDetail.Language}</Text>
                            <Text style={styles.text}>{this.state.movieDetail.Country}</Text>
                            <Text style={styles.text}>{this.state.movieDetail.Awards}</Text>
                            {this.state.movieDetail.Ratings.map(deet => (
                                <Text key={deet.Source}>{deet.Source} : {deet.Value}</Text>
                            ))}


                        </>
                    ):(
                        <Text>Not yet shown</Text>
                    )
                }
            </ScrollView>
        )
    }
}

export default Detail
