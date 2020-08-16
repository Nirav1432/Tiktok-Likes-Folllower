import { PUT_LOGIN, SET_DIAMONDS, FIRST_TIME_CHECK, SET_FIRST_TIME, SET_PRIVACY, SET_NATIVE_OBJ, SET_INTERSRIAL_ID, SET_BANNER_ID, PUT_SHOW_VIDEO, SHOW_APP_INSTALL_POP } from '../Actions/Login/LoginActions'
import { PUT_COUNT, GET_COUNT, PUT_MAX_COUNT, SHOW_ADS, HIDE_ADS } from '../Actions/AddCount/AddCount'
const initialState = {
  CommonData: null,
  coins: 0,
  adsCounter: 0,
  maxAdsCounter: 0,
  showAds: false,
  isFirstime: false,
  privacy: "",
  NativeADSObj: null,
  InterStrialId: null,
  BannerId: null,
  isWaitingforDownloadCompletePop: false,
  show_reward_video: false
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
      break;

    case HIDE_ADS: {
      return Object.assign({}, state, {
        showAds: false
      })
    }
      break;

    case FIRST_TIME_CHECK: {
      return Object.assign({}, state, {
        isFirstime: true
      })
    }
      break;

    case SET_FIRST_TIME: {
      return Object.assign({}, state, {
        isFirstime: false
      })
    }
      break;

    case SET_PRIVACY: {
      return Object.assign({}, state, {
        privacy: action.data
      })
    }

    case SET_NATIVE_OBJ: {
      return Object.assign({}, state, {
        NativeADSObj: action.data
      })
    }
      break;

    case SET_BANNER_ID: {
      return Object.assign({}, state, {
        BannerId: action.data
      })
    }
      break;

    case SET_INTERSRIAL_ID: {
      return Object.assign({}, state, {
        InterStrialId: action.data
      })
    }
      break;

    case PUT_SHOW_VIDEO: {
      return Object.assign({}, state, {
        show_reward_video: action.data
      })
    }
      break;

    case SHOW_APP_INSTALL_POP: {
      return Object.assign({}, state, {
        isWaitingforDownloadCompletePop: action.data
      })
    }
      break;

    default: {
      return state;
    }

  }
};

export default LoginReducer;