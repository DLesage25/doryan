export function changeAccent (payload) {
    return dispatch => {
        return dispatch({ type: 'CHANGE_ACCENT', payload });
    }
}

export function changeTempo (payload) {
    return dispatch => {
        return dispatch({ type: 'CHANGE_TEMPO', payload });
    }
}