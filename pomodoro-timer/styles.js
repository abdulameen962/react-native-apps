import { StyleSheet } from "react-native";
import Constants from 'expo-constants'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Constants.statusBarHeight,
    },
    image: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 100,
    },
    text: {
      color: 'white',
      fontSize: 65,
    //   lineHeight: 84,
      fontWeight: 'bold',
      textAlign: 'center',
    //   backgroundColor: '#000000c0',
    },
    roundImg: {
        width: 250,
        height:250,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flexedDiv:{
        flexDirection: 'row',
        marginVertical: 30,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icons:{
        width:70,
    },
    button: {
        borderRadius: 15,
        marginVertical:10,
        paddingVertical: 18,
        paddingHorizontal: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    orangeBtn:{
        backgroundColor: '#F6AE2D',
    },
    deepBtn:{
        backgroundColor: '#F26419',
    },
    bottomBtn:{
        marginTop: 1,
    },
    btnText:{
        fontSize: 20,
    },
    progressBar:{
      width:20,
      height:20,
      backgroundColor: "blue",
      width: 2,
    }
  });

export default styles