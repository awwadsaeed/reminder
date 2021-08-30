import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { AddItem } from '../store/tasks';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import * as SecureStore from 'expo-secure-store';

async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
}

export default function NewItem() {


    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const state = useSelector(state => {
        return {
            days: state.day,
            tasks: state.tasks
        }
    });
    const dispatch = useDispatch();

    useEffect(() => {
        save('allState', `${JSON.stringify(state.tasks)}`)
    }, [state.tasks.allTasks]);


    const addItem = () => {
        if (!content || !title) {
            alert('Please Enter Some Content and a Title', { text: 'OK' });
        } else {
            dispatch(AddItem({ title: title, content: content, day: state.days.activeDay, id: uuidv4() }));
        }
    }

    const changeTitle = (textValue) => setTitle(textValue);
    const changeContent = (textValue) => setContent(textValue);


    return (
        <View style={{ marginTop: 10, }}>
            {/* <ImageBackground source={require('../textImage.jpeg')}></ImageBackground> */}
            <TouchableOpacity style={styles.btn} onPress={() => addItem()}>
                <Text style={styles.btnText}> <AntDesign name="pluscircleo" size={24} color="black" />  Add Item</Text>
            </TouchableOpacity>
            <TextInput placeholder='Title' style={styles.input} onChangeText={changeTitle} />
            <View style={styles.container}>
                <TextInput multiline={true} placeholder='Content' style={styles.content} onChangeText={changeContent} />
            </View>
        </View>
    );
}




const styles = StyleSheet.create({
    input: {
        height: 60,
        padding: 8,
        fontSize: 18,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'lightgrey',
        marginLeft: '1%',
        marginRight: '1%',
        marginBottom: 5,
        backgroundColor:'white'
    },
    btn: {
        backgroundColor: 'tomato',
        padding: 9,
        margin: 5,
    },
    btnText: {
        color: 'white',
        fontSize: 23,
        textAlign: 'center'
    },
    content: {
        padding: 8,
        fontSize: 18,

    },
    container: {
        height: '80%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'lightgrey',
        marginLeft: '1%',
        marginRight: '1%',
        backgroundColor:'white'

    }
});