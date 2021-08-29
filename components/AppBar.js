import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet,StatusBar } from 'react-native';

const AppBar = () => (
  <>
 <Appbar style={styles.status}>
   <Appbar.Action
     icon="archive"
     onPress={() => console.log('Pressed archive')}
    />
    <Appbar.Action icon="mail" onPress={() => console.log('Pressed mail')} />
    <Appbar.Action icon="label" onPress={() => console.log('Pressed label')} />
    <Appbar.Action
      icon="delete"
      onPress={() => console.log('Pressed delete')}
    />
  </Appbar>
  </>
 );

export default AppBar;

const styles = StyleSheet.create({
  status:{
    paddingTop:1.5*StatusBar.currentHeight,
    paddingBottom:0.9*StatusBar.currentHeight
  }
})