import { StyleSheet } from 'react-native';

import Constants from 'expo-constants'

const styles = StyleSheet.create({
    container: {
      // flex: 1,
      backgroundColor: '#fff',
      // alignItems: 'center',
      // justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
    },
    loginContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    row:{
        padding: 20,
    },
    h1:{
      fontSize:30,
      paddingBottom:20,
    },
    input: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius:8,
        width: '80%',
        fontSize:15,
        borderColor: 'rgba(0,0,0,.25)',
        borderWidth: 1,
        marginVertical: 10,
    },
    formContainer: {
        justifyContent: 'center',
        paddingHorizontal: 30,
        // backgroundColor: 'green'
    },
    headerStyle:{
      headerStyle:{
        backgroundColor: 'white',
      },
      headerTintColor: 'black',
      headerTitleStyle:{
        fontWeight: 'bold',
        fontSize:20
      }
    },
    text:{
      fontSize: 24
    },
    submitBtn:{
      borderRadius: 8,
      paddingVertical: 15,
      paddingHorizontal: 25,
      backgroundColor: 'teal',
      minWidth: '80%',
      justifyContent:'center',
      alignItems:'center',
      marginTop: 15,
    },
    textWhite:{
      color:'white',
      fontSize:20,
    }
  });


export default styles