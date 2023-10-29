import { StyleSheet } from "react-native";
import Constants from 'expo-constants';

const styles = StyleSheet.create({
    container: {
      // flex: 1,
      backgroundColor: '#fff',
      paddingTop: Constants.statusBarHeight,
    },
    flexer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    liststyle: {
      flexDirection:'row',
    },
    listContainer:{
      flex: 1,
    },
    count: {
      fontSize: 48,
    },  
  });

export default styles