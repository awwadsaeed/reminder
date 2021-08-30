const initialState = {
    days: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    activeDay: 'Sat'
}


export default function dayReducer(state = initialState, action) {
    const { payload, type } = action;

    switch (type) {
        case 'CHANGE_ACTIVE':
            return {
                days: state.days,
                activeDay: payload
            }
        default:
            return state;
    }

}

export function changeActive(payload) {
    return {
        type:'CHANGE_ACTIVE',
        payload:payload,
    }
}