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
  setting: data => api.post(`/setting`, data).then(onSuccess, onError),
  AddContactUS: data => api.post('/add/contact-us', data).then(onSuccess, onError),
  Coversations: data => api.post('/contact-us', data).then(onSuccess, onError),
  UpdateCoins: data => api.post('/update-wallet', data).then(onSuccess, onError),
  ScratchLog: data => api.post('/scratche-log', data).then(onSuccess, onError),
  ListOfCard: data => api.post('/user-scratche', data).then(onSuccess, onError),


  RequestShare: data => api.post('/requestShare', data).then(onSuccess, onError),
  RequestComment: data => api.post('/requestComment', data).then(onSuccess, onError),
  RequestFollower: data => api.post('/requestFollower', data).then(onSuccess, onError),
  RequestLikes: data => api.post('/requestLike', data).then(onSuccess, onError),


  DoFollower: data => api.post('/userFollower', data).then(onSuccess, onError),
  DoLike: data => api.post('/userLike', data).then(onSuccess, onError),
  DoComment: data => api.post('/userComment', data).then(onSuccess, onError),
  Doshare: data => api.post('/userShare', data).then(onSuccess, onError),

  FollowerList: data => api.get('/following/' + data).then(onSuccess, onError),
  CommentList: data => api.get('/user_comments/' + data).then(onSuccess, onError),
  ShareList: data => api.get('/user_share/' + data).then(onSuccess, onError),
  LikeVideosList: data => api.get('/liker/' + data).then(onSuccess, onError),

  LikeList: data => api.get('/like/' + data).then(onSuccess, onError),
  Following: data => api.get('/follower/' + data).then(onSuccess, onError),
  CommentVideoList: data => api.get('/comment/' + data).then(onSuccess, onError),
  SharedVideoList: data => api.get('/share/' + data).then(onSuccess, onError),

  Videos: data => api.post('/userVideo', data).then(onSuccess, onError),
  getListofCoins: data => api.get('/selection').then(onSuccess, onError),
  PaymentCoins: data => api.get('/payment-coin').then(onSuccess, onError),

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