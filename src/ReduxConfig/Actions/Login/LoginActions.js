export const PUT_LOGIN = 'PUT_LOGIN';
export const SET_DIAMONDS = 'SET_DIAMONDS';

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

