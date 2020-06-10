export const PUT_COUNT = 'PUT_COUNT';
export const GET_COUNT = 'GET_COUNT';
export const PUT_MAX_COUNT = 'PUT_MAX_COUNT';
export const SHOW_ADS = 'SHOW_ADS';
export const HIDE_ADS = 'HIDE_ADS'

export const putcount = (clicked) => {
    return {
        type: PUT_COUNT,
        data: clicked
    }
}

export const getcount = () => {
    return {
        type: GET_COUNT,
    }
}

export const puMaxCount = (maxCounts) => {
    return {
        type: PUT_MAX_COUNT,
        maxCounts: maxCounts
    }
}

export const shoeAds = () => {
    return {
        type: SHOW_ADS,
    }
}

export const hideAds = () => {
    return {
        type: HIDE_ADS,
    }
}


