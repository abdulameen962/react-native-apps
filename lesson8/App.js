import { StatusBar } from 'expo-status-bar';
import { Linking } from 'react-native';
import React from 'react'
// import MapView,{Marker} from 'react-native-maps';
// import * as Location from 'expo-location';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from "@react-navigation/native";
import * as Notifications from 'expo-notifications';

import Map from './screens/Maps';
import Contact from './screens/contacts';
import Compass from './screens/compass';
import Sensor from './screens/sensor';
import MediaHome from './screens/MediaHome';

const Stack = createMaterialBottomTabNavigator()

const linking = {
  config: {
    // Configuration for linking
    screens: {
      Home: 'feed/:sort',
    },
  },
  async getInitialURL() {
    // First, you may want to do the default deep link handling
    // Check if app was opened from a deep link
    const url = await Linking.getInitialURL();

    if (url != null) {
      return url;
    }

    // Handle URL from expo push notifications
    const response = await Notifications.getLastNotificationResponseAsync();

    return response?.notification.request.content.data.url;
  },
  subscribe(listener) {
    const onReceiveURL = (url) => listener(url);

    // Listen to incoming links from deep linking
    const eventListenerSubscription = Linking.addEventListener('url', onReceiveURL);

    // Listen to expo push notifications
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      const url = response.notification.request.content.data.url;

      // Any custom logic to see whether the URL needs to be handled
      //...

      // Let React Navigation handle the URL
      listener(url);
    });

    return () => {
      // Clean up the event listeners
      eventListenerSubscription.remove();
      subscription.remove();
    };
  },
}


export default class App extends React.Component {


  render(){
    return (
<NavigationContainer
      linking={linking} fallback={<Text>Loading...</Text>}>
        <Stack.Navigator initialRouteName='Home' activeColor="black" barStyle={{ backgroundColor: 'aqua' }}>
          <Stack.Screen name='Home' component={Map} options={{animationTypeForReplace: 'pop',title:'Home',tabBarLabel: 'Home',tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="home" color={color} size={26} />),}} />
          <Stack.Screen name='Contacts' component={Contact} options={{animationTypeForReplace: 'pop',title:'Contacts',tabBarLabel: 'Contacts',tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="contacts" color={color} size={26} />),}} />
          <Stack.Screen name='compass' component={Compass} options={{animationTypeForReplace: 'pop',title:'compass',tabBarLabel: 'compass',tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="compass" color={color} size={26} />),}} />
          <Stack.Screen name='sensor' component={Sensor} options={{animationTypeForReplace: 'pop',title:'sensor',tabBarLabel: 'sensor',tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="compass" color={color} size={26} />),}} />
          <Stack.Screen name='Media' component={MediaHome} options={{animationTypeForReplace: 'pop',title:'Media',tabBarLabel: 'Media',tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="merge" color={color} size={26} />),}} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
