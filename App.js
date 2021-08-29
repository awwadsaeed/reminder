// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,SafeAreaView,StatusBar, ScrollView, Button, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import AppBar from './components/AppBar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dummy from './components/Dummy';
import { Appbar } from 'react-native-paper';

const Stack = createNativeStackNavigator();

export default function App() {
 const days = ['Sat','Sun','Mon','Tue','Wed','Thu','Fri'];
 const tasks = [];
 for(let i=0;i<50;i++){
  tasks.push(<View key={i} style={styles.task}>
    <Text style={styles.taskTitle}>task{i+1}</Text>
    <View style={styles.deleteButton} ><Button title='D' onPress={()=>{ console.log(`deleted item: ${i+1}`) }}></Button></View>
  </View>)
}
  return (
    <>
    <AppBar />
    <View style={styles.days}>
      {days.map((item,idx)=>{
        return <View key={idx} style={styles.dayButton}><Button onPress={()=>{ console.log(`clicked on day: ${item}`) }} title={item}>
      </Button></View>
      })}
    </View>
    <View style={styles.addButton}>
    <Button title='Add Task'></Button>
    </View>
    <ScrollView style={styles.tasks}>
      {tasks.map((item,idx)=>{
        return item;
      })}
    </ScrollView>
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="dummy" component={Dummy} />
      <Stack.Screen name="appbar" component={AppBar} />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  safe:{
    flex:1,
    marginTop:StatusBar.currentHeight,
  },
  days:{
    flexWrap: 'wrap', 
    alignItems: 'flex-start',
    flexDirection:'row',
  },
  dayButton:{
    marginLeft:'2%',
    marginRight:'1%',
    marginTop:15,
  },
  addButton:{
    width:82,marginLeft:'2%',
    marginTop:15
  },
  tasks:{
    paddingRight:'2%',
    marginTop:15,
    paddingLeft:'2%',
    width:Dimensions.get('window').currentWidth,
    height:Dimensions.get('window').currentHeight,
  },
  task:{
    backgroundColor:'white',
    height:80,
    marginTop:10,
    marginRight:'2%',
    marginLeft:'2%',
    borderRadius:5,
    borderStyle:'solid',
    borderWidth: 1,
    borderColor:'lightgrey',
    flexDirection:'row',
    alignItems:'center',
  },
  taskTitle:{
    marginLeft:'1%',
    marginRight:'1%'
  },
  deleteButton:{
    position:'absolute',
    right:'2%',
    width:35,
    height:35,
  }
});
