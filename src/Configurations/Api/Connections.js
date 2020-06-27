import URI from '../Constants/Uri';
import axios from 'react-native-axios';
import { } from 'react-native'

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
 
async function POSTtypeData(location, data) {

  let ReturnDATA=null

  await fetch(URI.MAIN_URL + location, {
    method: "POST",
    headers: new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }),
    body:JSON.stringify(data)
  })
  .then(res=>res.json())
  .then((res)=>{
      ReturnDATA=res
  })

  return ReturnDATA;
}

 
async function GETtypeData(location) {

  let ReturnDATA=null

  await fetch(URI.MAIN_URL + location, {
    method: "GET",
  })
  .then(res=>res.json())
  .then((res)=>{
      ReturnDATA=res
  })

  return ReturnDATA;
}


export const Services = {
  setting: data => POSTtypeData(`/setting`, data),
  login: data => POSTtypeData(`/user`, data),
  AddContactUS: data => POSTtypeData('/add/contact-us', data),

  Coversations: data => POSTtypeData('/contact-us', data),
  UpdateCoins: data => POSTtypeData('/update-wallet', data),
  ScratchLog: data => POSTtypeData('/scratche-log', data),
  ListOfCard: data => POSTtypeData('/user-scratche', data),


  RequestShare: data => POSTtypeData('/requestShare', data),
  RequestComment: data => POSTtypeData('/requestComment', data),
  RequestFollower: data => POSTtypeData('/requestFollower', data),
  RequestLikes: data => POSTtypeData('/requestLike', data),


  DoFollower: data => POSTtypeData('/userFollower', data),
  DoLike: data => POSTtypeData('/userLike', data),
  DoComment: data => POSTtypeData('/userComment', data),
  Doshare: data => POSTtypeData('/userShare', data),

  FollowerList: data => GETtypeData('/following/' + data),
  CommentList: data => GETtypeData('/user_comments/' + data),
  ShareList: data => GETtypeData('/user_share/' + data),
  LikeVideosList: data => GETtypeData('/liker/' + data),

  LikeList: data => GETtypeData('/like/' + data),
  Following: data => GETtypeData('/follower/' + data),
  CommentVideoList: data => GETtypeData('/comment/' + data),
  SharedVideoList: data => GETtypeData('/share/' + data),

  Videos: data => POSTtypeData('/userVideo', data),
  getListofCoins: data => GETtypeData('/selection'),
  PaymentCoins: type => GETtypeData('/payment-coin'),

  updateWallet: data => POSTtypeData('/update-wallet', data),
  userVideo: data => POSTtypeData('/userVideo', data)

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