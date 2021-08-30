import * as SecureStore from 'expo-secure-store';
const initialState = {
    allTasks: [],
    activeTasks: []
}

async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
}


export default function taskReducer(state = initialState, action) {
    const { payload, type } = action;
    switch (type) {
        case 'CHANGE_ACTIVE':
            let active = state.allTasks.filter((task) => {
                return (task.day === payload)
            });
            return {
                allTasks: state.allTasks,
                activeTasks: active,
            }
        case 'ADD_ITEM':
            let task = {
                title: payload.title,
                content: payload.content,
                day: payload.day,
                id: payload.id
            }
            return {
                allTasks: [...state.allTasks, task],
                activeTasks: state.activeTasks
            }
        case 'DELETE':
            let newAllTasks = state.allTasks.filter((item) => (item.id !== payload));
            save('allState', `${JSON.stringify({
                allTasks: newAllTasks,
                activeTasks: state.activeTasks
            })}`)
            return {
                allTasks: newAllTasks,
                activeTasks: state.activeTasks
            }
        case 'LOAD_INIT':
            console.log(payload.activeTasks);
            return {
                allTasks: payload.allTasks,
                activeTasks: payload.activeTasks
            };
        case 'DELETE_ALL':
            let temp = state.allTasks.filter((item) => (item.day != payload));
            save('allState', `${JSON.stringify({
                allTasks: temp,
                activeTasks: state.activeTasks
            })}`)
            return {
                allTasks: temp,
                activeTasks: state.activeTasks
            }
        default:
            return state;
    }
}


export function AddItem(payload) {
    return {
        type: 'ADD_ITEM',
        payload: payload,
    }
}


export function deleteItem(payload) {
    return {
        type: 'DELETE',
        payload: payload
    }
}

export function loadInitialItems(payload) {
    return {
        type: 'LOAD_INIT',
        payload: payload
    }
}

export function deleteAll(payload) {
    return {
        type: 'DELETE_ALL',
        payload: payload
    }
}