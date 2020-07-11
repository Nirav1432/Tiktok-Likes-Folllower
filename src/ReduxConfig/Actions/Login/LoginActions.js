export const PUT_LOGIN = 'PUT_LOGIN';
export const SET_DIAMONDS = 'SET_DIAMONDS';
export const FIRST_TIME_CHECK = 'FIRST_TIME_CHECK';
export const SET_FIRST_TIME = 'SET_FIRST_TIME';
export const SET_PRIVACY = "SET_PRIVACY"
export const SET_NATIVE_OBJ = "SET_NATIVE_OBJ"
export const SET_BANNER_ID = "SET_BANNER_ID"
export const SET_INTERSRIAL_ID = "SET_INTERSRIAL_ID"
export const PUT_SHOW_VIDEO = "PUT_SHOW_VIDEO"


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

export const setPrivacyUrl = (url) => {
    return {
        type: SET_PRIVACY,
        data: url
    }
}

export const putNativeAdsObject = (object) => {
    return {
        type: SET_NATIVE_OBJ,
        data: object
    }
}

export const setBannerId = (object) => {
    return {
        type: SET_BANNER_ID,
        data: object
    }
}

export const setInterStrialId = (object) => {
    return {
        type: SET_INTERSRIAL_ID,
        data: object
    }
}

export const PutShowVideo = (isShow) => {
    return {
        type: PUT_SHOW_VIDEO,
        data: isShow
    }
}




