import { PUT_LOGIN, SET_DIAMONDS } from '../Actions/Login/LoginActions'
import { PUT_COUNT, GET_COUNT, PUT_MAX_COUNT, SHOW_ADS,HIDE_ADS } from '../Actions/AddCount/AddCount'
const initialState = {
  CommonData: null,
  coins: 0,
  adsCounter: 0,
  maxAdsCounter: 0,
  showAds: false
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {

    case PUT_LOGIN: {
      return Object.assign({}, state, {
        CommonData: JSON.parse(action.data)
      })
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


    case SHOW_ADS: {
      return Object.assign({}, state, {
        showAds: true
      })
    }

    case HIDE_ADS: {
      return Object.assign({}, state, {
        showAds: false
      })
    }

    default: {
      return state;
    }
  }
};

export default LoginReducer;