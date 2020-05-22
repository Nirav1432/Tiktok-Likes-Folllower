export const PUT_LOGIN = 'PUT_LOGIN';
export const LOAD_LOGIN = 'LOAD_LOGIN';

export const putLogin = (dataFromServer) => {
    return {
        type: PUT_LOGIN,
        data: dataFromServer
    }
}
