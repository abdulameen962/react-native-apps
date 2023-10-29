import { StyleSheet } from "react-native";

import Constants from 'expo-constants'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: Constants.statusBarHeight,
    },
    image:{
        width: 100,
        height: 50
    },
    divContainer:{
      paddingHorizontal: 10,
    },
    row: {
        flexDirection: 'row',
    },
    text:{
      fontSize: 20,
    },
    miniHeader:{
      fontSize: 30
    },
    input: {
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderRadius:8,
      width: '100%',
      fontSize:15,
      borderColor: 'rgba(0,0,0,.25)',
      borderWidth: 1,
      marginVertical: 10,
    },
    btn:{
      borderRadius: 8,
      paddingHorizontal: 25,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 15,
    },
    primaryBtn:{
      backgroundColor: '#007bff',
      // marginVertical: 10,
    },
    primaryBtnText:{
      color: 'white',
      fontSize: 18,
    },
    secondaryBtnText:{
      color: '#007bff',
      fontSize: 18,
    },
    secondaryBtn:{
      borderWidth: 1,
      borderColor: '#007bff',
    }
  });

export default styles