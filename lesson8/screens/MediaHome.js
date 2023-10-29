import React from 'react'
import styles from '../styles'
import VideoClass from './video'
import Photos from './photos'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NotificationsView from './notifications'
import Constants from 'expo-constants'

const Media = createMaterialTopTabNavigator()

class MediaHome extends React.Component{
    render() {
        return (
            <Media.Navigator screenOptions={{
                tabBarStyle: {paddingTop: Constants.statusBarHeight}
            }}>
                <Media.Screen name='Video' component={VideoClass} options={{animationTypeForReplace: 'pop',title:'Video',tabBarLabel: 'Video'}} />
                <Media.Screen name='Photos' component={Photos} options={{animationTypeForReplace: 'pop',title:'Photos',tabBarLabel: 'Photos'}} />
                <Media.Screen name='Notification' component={NotificationsView} options={{animationTypeForReplace: 'pop',title:'Notification',tabBarLabel: 'Notification'}} />
            </Media.Navigator>
        )
    }
}

export default MediaHome