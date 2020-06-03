export const PUT_COUNT = 'PUT_COUNT';
export const GET_COUNT = 'GET_COUNT';
export const PUT_MAX_COUNT = 'PUT_MAX_COUNT';

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

