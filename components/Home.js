import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeActive } from '../store/days';
import { StyleSheet, Text, View, StatusBar, ScrollView, Button, TouchableOpacity, Modal } from 'react-native';
import { Dimensions } from 'react-native';
import { deleteItem } from '../store/tasks';
import * as SecureStore from 'expo-secure-store';
import { loadInitialItems } from '../store/tasks';
import { deleteAll } from '../store/tasks';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    return JSON.parse(result);
}


export default function Home() {
    const [modalVisible, setModalVisible] = useState(false);
    const [tasky, setTasky] = useState({});
    const state = useSelector(state => {
        return {
            days: state.day,
            tasks: state.tasks
        }
    });


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeActive(state.days.activeDay));
    }, [state.tasks.allTasks]);

    useEffect(() => {
        async function getData() {
            let result = await getValueFor('allState');
            if (result) {
                console.log(result);
                dispatch(loadInitialItems(result));
            }
        }
        getData();
    }, []);

    const showModal = (item) => {
        setModalVisible(!modalVisible);
        setTasky(item);
    }
    const view = state.tasks.activeTasks.map((item) => {
        return (<TouchableOpacity onPress={() => { showModal(item) }} key={uuidv4()} style={styles.task}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <View style={styles.deleteButton} ><FontAwesome name="remove" size={28} color="red" onPress={() => { dispatch(deleteItem(item.id)) }}></FontAwesome ></View>
        </TouchableOpacity>)
    });

    function delAll() {
        dispatch(deleteAll(state.days.activeDay));
    }

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <TouchableOpacity
                    style={styles.container}
                    activeOpacity={1}
                    onPressOut={() => { setModalVisible(false) }}
                >
                    <View
                        style={styles.modal}>
                        <Text style={styles.title}> {tasky.title}</Text>
                        <Text style={styles.content}> {tasky.content}</Text>
                    </View>
                </TouchableOpacity>


            </Modal>
            <View style={{ paddingBottom: 159 }}>
                <View style={styles.days}>
                    {state.days.days.map((item, idx) => {
                        return <View key={idx} style={styles.dayButton}><Button color={state.days.activeDay===item?'tomato':'blue'} onPress={() => { dispatch(changeActive(item)) }} title={item}>
                        </Button></View>
                    })}
                </View>
                <View style={styles.addButton}>
                    <MaterialCommunityIcons name="playlist-remove" size={40} color="red" title='Delete All' onPress={() => delAll()}></MaterialCommunityIcons>
                </View>
                <ScrollView style={styles.tasks}>
                    {view.map((item, idx) => {
                        return item;
                    })}
                </ScrollView>
            </View>
        </>
    );
}
const styles = StyleSheet.create({

    safe: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
    },
    days: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    dayButton: {
        marginLeft: '2%',
        marginRight: '1%',
        marginTop: 15,
    },
    addButton: {
        width: 82, marginLeft: '2%',
        marginTop: 15
    },
    tasks: {
        paddingRight: '2%',
        marginTop: 15,
        paddingLeft: '2%',
        width: Dimensions.get('window').currentWidth,
        height: Dimensions.get('window').currentHeight,
    },
    task: {
        backgroundColor: 'white',
        height: 80,
        marginTop: 10,
        marginRight: '2%',
        marginLeft: '2%',
        borderRadius: 5,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'lightgrey',
        flexDirection: 'row',
        alignItems: 'center',
    },
    taskTitle: {
        marginLeft: '1%',
        marginRight: '1%'
    },
    deleteButton: {
        position: 'absolute',
        right: '2%',
        width: 35,
        height: 35,
    },
    modal: {
        width: '80%',
        marginLeft: '10%',
        marginRight: '10%',
        marginTop: '50%',
        marginBottom: '80%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'lightgrey',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
        padding: '5%',
        textAlign: 'justify',
    },
    title: {
        fontSize: 28,
    },
    content: {
        fontSize: 18,

    }
});
