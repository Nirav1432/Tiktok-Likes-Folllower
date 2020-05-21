import URI from '../Constants/Uri';
import axios from 'react-native-axios';

const api = axios.create();
api.defaults.baseURL = URI.MAIN_URL;
api.defaults.headers.post['Content-Type'] = 'application/json';
api.defaults.headers.post['Accept'] = 'application/json';


function onError(response) {
    return response.data;
}

function onSuccess(response) {
    return response.data;
}


export const Services = {  
    login: data => api.post(`/user`, data).then(onSuccess, onError),
    setting:data => api.post(`/setting`, data).then(onSuccess, onError)        
}



//Logs
api.interceptors.request.use(
    request => {
      console.log(request.url, "----- request ----->", request.data)
      return request
    },
  )
  api.interceptors.response.use(
    response => {
      console.log(response.config.url, "+++++ response +++++>", response.data);
      return response
    },
  )