export const PUT_LOGIN = 'PUT_LOGIN';
export const SET_DIAMONDS = 'SET_DIAMONDS';
export const FIRST_TIME_CHECK = 'FIRST_TIME_CHECK';
export const SET_FIRST_TIME = 'SET_FIRST_TIME';



export const putLogin = (dataFromServer) => {
    return {
        type: PUT_LOGIN,
        data: dataFromServer
    }
}

export const setDiamonds = (coins) => {
    return {
        type: SET_DIAMONDS,
        DMD: coins
    }
}

export const isFirstTime = () => {
    return {
        type: FIRST_TIME_CHECK,
    }
}

export const setFirstTime = () => {
    return {
        type: SET_FIRST_TIME,
    }
}

