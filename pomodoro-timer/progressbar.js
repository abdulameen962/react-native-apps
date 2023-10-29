import React from 'react'
import {View,Dimensions} from 'react-native'
import styles from './styles'
import PropTypes from 'prop-types'


const ProgressBar = props => {
    const {width} = Dimensions.get("window");
    const percent = 1 - props.timeRemaining / props.totalTime
    return(
    <View style={[styles.progressBar,{width: percent * 100}]}/>
)}

ProgressBar.propTypes = {
    timeRemaining: PropTypes.number,
    isRunning: PropTypes.bool,
    totalTime: PropTypes.number
}

export default ProgressBar