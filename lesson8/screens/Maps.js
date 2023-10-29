import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Platform } from 'react-native';
import React from 'react'
import MapView,{Marker} from 'react-native-maps';
import * as Location from 'expo-location';

import styles from '../styles'

class Map extends React.Component{
    state = {
        location: null,
        otherLocation: [],
        err: 'Waiting..'
      }
      componentDidMount = () => {
          this.getLocation()
      }
    
      getLocation = async () => {
        let { status } = await Location.getForegroundPermissionsAsync();
        if (status !== 'granted') {
          this.setErrorMsg('Permission to access location was denied');
          return;
        }
    
        let location = await Location.getCurrentPositionAsync({});
    
        let choiceLocation = await Location.geocodeAsync('Reinomed Pharmacy Shomolu Lagos Nigeria Africa');
        let unilag = await Location.geocodeAsync('University of Lagos Akoka Nigeria Africa');
    
        let where = await Location.reverseGeocodeAsync(choiceLocation[0]);
    
        this.addLocation(choiceLocation);
        this.addLocation(unilag);
        this.setLocation(location);
      }
    
      setLocation = location => this.setState({location}) 
      setErrorMsg = err => this.setState({err})
      addLocation = location => {
        this.setState(prevState => ({otherLocation: [...prevState.otherLocation,location[0]]}))
      
      }
    render(){
        return (
            <View style={styles.container}>
            {
              this.state.location === null ? (
                <Text>{this.state.err}</Text>
              ): (
                <MapView style={styles.map} provider={MapView.PROVIDER_GOOGLE}  onRegionChange={this.getLocation}
                  initialRegion={{
                    latitude: this.state.location.coords.latitude,
                    longitude: this.state.location.coords.longitude,
                    latitudeDelta: 0.0922 / 2,
                    longitudeDelta: 0.0421 / 2,
                  }} 
                >
                  <Marker
                    coordinate={this.state.location.coords}
                    title='You are here'
                  />
                  {
                    this.state.otherLocation.length > 0 ? (
                      this.state.otherLocation.map((location,index) => (
                        <Marker
                        key={index}
                        coordinate={location}
                        title='Just another location'
                        pinColor='blue'
                      />
                      ))
                    ): (
                      <Marker
                      coordinate={this.state.location.coords}
                      title='You are here'
                    />
                    )
                  }
                </MapView>
              )
            }
            <StatusBar style="auto" />
          </View>
        )
    }
}

export default Map