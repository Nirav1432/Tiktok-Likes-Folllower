import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer';
import Homescreen from './src/Screens/Homescreen';
import Sidemenu from './src/Components/Sidemenu';
import LoginScreen from './src/Screens/LoginScreen';
import Follower from './src/Screens/Follower';
import GetFollower from './src/Screens/GetFollower';
import FollowerList from './src/Screens/FollowerList';
import SplashScreen from './src/Screens/SplashScreen';
import Likes from './src/Screens/Likes';
import GetLikes from './src/Screens/GetLikes';
import LikesList from './src/Screens/LikesList';
import Comments from './src/Screens/Comments';
import GetComments from './src/Screens/GetComments';
import Share from './src/Screens/Share';
import GetShare from './src/Screens/GetShare';
import ContactUs from './src/Screens/ContactUs';
import OnetimeLogin from './src/Screens/OnetimeLogin';
import EarnScreen from './src/Screens/EarnScreen';
import ContactUsList from './src/Screens/ContactUsList';
import PurchaseCoinsScreen from './src/Screens/PurchaseCoinsScreen';
import WatchVideoTimer from './src/Screens/WatchVideoTimer';
import watchVideoButton from './src/Screens/watchVideoButton';
import ScratchAndWin from './src/Screens/ScratchAndWin';
import DoFollowing from './src/Screens/DoFollowing';
import DoLikes from './src/Screens/DoLikes';
import ShareAndRate from './src/Screens/ShareAndRate';
import DoShare from './src/Screens/DoShare';
import DoComments from './src/Screens/DoComments';
import CommentList from './src/Screens/CommentList';
import ShareList from './src/Screens/ShareList';
import { Provider } from 'react-redux';
import { store } from './src/ReduxConfig/Store/Store'

const AllInDrawer = createStackNavigator(
  {
    Home: { screen: Homescreen, navigationOptions: { headerShown: false } },
    Follower: { screen: Follower, navigationOptions: { headerShown: false } },
    GetFollower: { screen: GetFollower, navigationOptions: { headerShown: false } },
    FollowerList: { screen: FollowerList, navigationOptions: { headerShown: false } },
    Likes: { screen: Likes, navigationOptions: { headerShown: false } },
    GetLikes: { screen: GetLikes, navigationOptions: { headerShown: false } },
    LikesList: { screen: LikesList, navigationOptions: { headerShown: false } },
    GetComments: { screen: GetComments, navigationOptions: { headerShown: false } },
    Comments: { screen: Comments, navigationOptions: { headerShown: false } },
    Share: { screen: Share, navigationOptions: { headerShown: false } },
    GetShare: { screen: GetShare, navigationOptions: { headerShown: false } },
    ContactUs: { screen: ContactUs, navigationOptions: { headerShown: false } },
    EarnScreen: { screen: EarnScreen, navigationOptions: { headerShown: false } },
    ContactUsList: { screen: ContactUsList, navigationOptions: { headerShown: false } },
    PurchaseCoinsScreen: { screen: PurchaseCoinsScreen, navigationOptions: { headerShown: false } },
    WatchVideoTimer: { screen: WatchVideoTimer, navigationOptions: { headerShown: false } },
    watchVideoButton: { screen: watchVideoButton, navigationOptions: { headerShown: false } },
    ScratchAndWin: { screen: ScratchAndWin, navigationOptions: { headerShown: false } },
    DoFollowing: { screen: DoFollowing, navigationOptions: { headerShown: false } },
    DoLikes: { screen: DoLikes, navigationOptions: { headerShown: false } },
    ShareAndRate: { screen: ShareAndRate, navigationOptions: { headerShown: false } },
    DoShare: { screen: DoShare, navigationOptions: { headerShown: false } },
    DoComments: { screen: DoComments, navigationOptions: { headerShown: false } },
    CommentList: { screen: CommentList, navigationOptions: { headerShown: false } },
    ShareList: { screen: ShareList, navigationOptions: { headerShown: false } }
  }
)


const DrawerScreens = createDrawerNavigator({
  AllScreenS: { screen: AllInDrawer }
},
  {
    contentComponent: Sidemenu,
    drawerWidth: "80%",
  }
)

const SwitchedScreens = createSwitchNavigator({
  SplashScreen: { screen: SplashScreen },
  OnetimeLogin: { screen: OnetimeLogin },
  Login: LoginScreen,
  Sidemenu: DrawerScreens
}, {
  initialRouteName: "SplashScreen"
})

const All = createAppContainer(SwitchedScreens)

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <Provider store={store}>
        <All />
      </Provider>
    );
  }
}
