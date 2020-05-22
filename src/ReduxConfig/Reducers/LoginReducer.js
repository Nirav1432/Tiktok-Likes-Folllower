import { PUT_LOGIN, SET_DIAMONDS } from '../Actions/Login/LoginActions'

const initialState = {
  CommonData: null,
  coins: 0
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case PUT_LOGIN: {
      state.CommonData = JSON.parse(action.data)
      return state
    }
    break;
    case SET_DIAMONDS: {
      return Object.assign({},state,{
        coins:action.DMD
      })
    }
    break;
    default: {
      return state;
    }
  }
};

export default LoginReducer;