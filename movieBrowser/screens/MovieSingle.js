import React from "react";
import { FlatList } from "react-native";
import PropTypes from 'prop-types'
import Movie from '../Homescreens/row'

const DetailView = props => {
    const renderItem = ({item}) => <Movie {...item} {...props} />
    return (
        <FlatList
            renderItem={renderItem}
            data={props.movies}
        />
    )
}

DetailView.propTypes = {
    movies: PropTypes.array.isRequired
}

export default DetailView;