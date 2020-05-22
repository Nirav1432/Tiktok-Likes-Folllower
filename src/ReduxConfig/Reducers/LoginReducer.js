import { PUT_LOGIN } from '../Actions/Login/LoginActions'
import AsyncStorage from '@react-native-community/async-storage';



const initialState = {
  CommonData: null,
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case PUT_LOGIN: {
      state.CommonData = JSON.parse(action.data)      
      return state
    }
    default: {
      return state;
    }
  }
};

export default LoginReducer;