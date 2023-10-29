import React from "react"
import { View,Text,Button } from "react-native"
import styles from '../styles'

class ThirdScreen extends React.Component{
    // static navigationOptions = ({navigation}) => {
    //     return{
    //         headerTitle: `Screen name is ${this.props.route.params.screen}`
    //     }
    // }
    state = {
        count: 0,
    }
    updateCount = () => {
        this.setState(prevState => ({
            count: prevState.count + 1
        }))
    }
    componentDidMount = () => {
        this.props.navigation.setOptions({
            title: `${this.props.route.params.screen}`
        })
        this.props.navigation.setOptions({
            headerRight: () => (
              <Button onPress={this.updateCount} title="Update count" />
        )})
    }

    render(){
        return(
            <View style={[styles.container,{flex: 1}]}>
                <Text>{this.props.route.params.screen}</Text>
                <Text>Count is {this.state.count}</Text>
            </View>
        )
    }
}



export default ThirdScreen