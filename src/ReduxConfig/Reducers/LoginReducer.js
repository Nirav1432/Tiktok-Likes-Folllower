import { PUT_LOGIN, SET_DIAMONDS } from '../Actions/Login/LoginActions'
import { PUT_COUNT, GET_COUNT, PUT_MAX_COUNT } from '../Actions/AddCount/AddCount'
const initialState = {
  CommonData: null,
  coins: 0,
  adsCounter: 0,
  maxAdsCounter: 0
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {

    case PUT_LOGIN: {
      state.CommonData = JSON.parse(action.data)
      return state
    }
      break;


    case SET_DIAMONDS: {
      return Object.assign({}, state, {
        coins: action.DMD
      })
    }
      break;


    case GET_COUNT: {
      return state
    }
      break;


    case PUT_COUNT: {
      return Object.assign({}, state, {
        adsCounter: action.data
      })
    }
      break;


    case PUT_MAX_COUNT: {
      return Object.assign({}, state, {
        maxAdsCounter: action.maxCounts
      })
    }
      break;


    default: {
      return state;
    }
  }
};

export default LoginReducer;