import React from "react";
import { View,ScrollView,Text,SafeAreaView,TextInput,Pressable,KeyboardAvoidingView } from "react-native";
import styles from "../styles";
import Row from "../Homescreens/row";

class Search extends React.PureComponent{
    state = {
        searchResults: [],
        searchTerm: "",
        disabled: true
    }

    componentDidUpdate(prevProps,prevState) {
        if (prevState.searchTerm !== this.state.searchTerm) {
            this.setState({disabled:!this.checkSubmit()})
        } 
    }

    checkSubmit = () => {
        const searchTerm = this.state.searchTerm.trim();
        if (searchTerm.length > 0) {
            return true
        }
        return false
    }

    searchWord = () => {
        setTimeout(async () => {
            const apiKey = this.props.apiKey;
            const response = await fetch(`https://www.omdbapi.com/?s=${this.state.searchTerm.trim()}&apikey=${apiKey}&page=1`);
            const {Response,Search} = await response.json();
            let searchResults;
            if (Response) {
                searchResults = Search
            }
            else{
                searchResults = []
            }
    
            this.setState({searchResults,searchTerm:""})
        }, 1000);
    }

    handleChange = key => val => {
        this.setState({[key]:val})
    }

    render(){
        return (
            <View style={[styles.container,styles.divContainer]}>
                <SafeAreaView>
                    <KeyboardAvoidingView behavior="padding" >
                        <TextInput 
                            placeholder="Search for movies"
                            style={styles.input}
                            value={this.state.searchTerm}
                            onChangeText={this.handleChange('searchTerm')}
                            autoCapitalize="none"
                        />
                        <Pressable style={[styles.primaryBtn,styles.btn]} disabled={this.state.disabled} onPress={this.searchWord}>
                            <Text style={styles.primaryBtnText}>Search</Text>
                        </Pressable>                        
                    </KeyboardAvoidingView>
                </SafeAreaView>
                <ScrollView style={{marginTop:25}}>
                    <Text style={styles.miniHeader}>Search results</Text>
                    <View style={{marginTop:15}}>
                        {
                            this.state.searchResults.length > 0 ? (
                                <>
                                    {
                                        this.state.searchResults.map((movie,index) => <Row 
                                            key={index} 
                                            {...this.props} 
                                            Poster={movie.Poster} 
                                            Title={movie.Title}
                                            Year={movie.Year}
                                            Type={movie.Type}
                                            imdbID={movie.imdbID}
                                        />
                                        )
                                    }                                
                                </>
                            ):(
                                <>
                                    <Text>No results found</Text>
                                </>
                            )
                        }
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default Search