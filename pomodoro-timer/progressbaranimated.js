import React from 'react'
import {View,Dimensions,Animated,Easing} from 'react-native'
import styles from './styles'
import PropTypes from 'prop-types'
// import Animated from 'react-native-reanimated'

class ProgressBar extends React.Component{
    state = {
        percent: new Animated.Value(0),
        setNew: setNewProps = (prevProps) => {
            console.log(prevProps.timeRemaining)
            if (prevProps.timeRemaining > this.props.timeRemaining) {
                this.setState({
                    percent: new Animated.Value(0)
                },this.startAnimation())
           }
        },
    }

    startAnimation = () => {
        this.animation = Animated.timing(this.state.percent,
            {
                toValue: 100,
                duration: this.props.timeRemaining * 1000,
                easing: Easing.linear,
                useNativeDriver: true,
            }    
        )

        this.animation.start();
    }

    componentDidMount(){
        this.startAnimation();
    }
    static getDerivedStateFromProps(nextProps,state){
        state.setNew(nextProps);

        return true;
    }

    setNewProps = (nextProps) => {
        // console.log(nextProps.timeRemaining);
        if (nextProps.timeRemaining > this.props.timeRemaining) {
            this.setState({
                percent: new Animated.Value(0)
            },this.startAnimation())
       }
    }
    render(){
        const {percent} = this.state
        const {width} = Dimensions.get("window");
        // const percent = 1 - props.timeRemaining / props.totalTime
        return(
        <Animated.View style={[
            styles.progressBar,
            {
                transform:[{scaleX: percent.interpolate({
                    inputRange : [0,100],
                    outputRange : [0,width],
                }) }],
            }
        ]}/>
    )}
}

ProgressBar.propTypes = {
    timeRemaining: PropTypes.number,
    isRunning: PropTypes.bool,
    totalTime: PropTypes.number
}

export default ProgressBar