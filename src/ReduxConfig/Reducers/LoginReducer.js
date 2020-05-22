import { PUT_LOGIN } from '../Actions/Login/LoginActions'
import AsyncStorage from '@react-native-community/async-storage';

var DMD = AsyncStorage.getItem("DMD")

const initialState = {
  CommonData: null,
  DMD:0
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case PUT_LOGIN: {
      state.CommonData = JSON.parse(action.data)
      state.DMD=DMD['_55']
      return state
    }
    default: {
      return state;
    }
  }
};

export default LoginReducer;