import React, { Component } from 'react';
import { View, Image, Text, StatusBar, TouchableHighlight } from 'react-native'
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
import CommonScreen from './src/Screens/CommonScreen';
import AppIntroSlider from 'react-native-app-intro-slider';
import SP from 'react-native-splash-screen'
import AsyncStorage from '@react-native-community/async-storage';

const slides = [
  {
    key: 1,
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    image: require('./src/Icons/1S.jpg'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 2,
    title: 'Title 2',
    text: 'Other cool stuff',
    image: require('./src/Icons/2S.jpg'),
    backgroundColor: '#febe29',
  },
  {
    key: 3,
    title: 'Rocket guy',
    text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
    image: require('./src/Icons/3S.jpg'),
    backgroundColor: '#22bcb5',
  },
  {
    key: 4,
    title: 'Rocket guy',
    text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
    image: require('./src/Icons/4S.jpg'),
    backgroundColor: '#22bcb5',
  }
];

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
    ShareList: { screen: ShareList, navigationOptions: { headerShown: false } },
    CommonScreen: { screen: CommonScreen, navigationOptions: { headerShown: false } }
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
      showSlider: false
    };
  }
  async componentDidMount() {
    let isfirsttime = await AsyncStorage.getItem('Fistime')
    if (isfirsttime == null) {
      this.setState({ showSlider: true })
    }
    else {
      this.setState({ showSlider: false })
    }
    SP.hide()
  }
  render() {
    return (
      this.state.showSlider ?
        <View style={{ flex: 1, backgroundColor: "#FE2C55" }}>
          <StatusBar backgroundColor="#FE2C55" />
          <AppIntroSlider
            renderItem={this._renderItem}
            data={slides}
            onDone={this._onDone}
          />
        </View>
        :
        <Provider store={store}>
          <View style={{ flex: 1, zIndex: 50 }}
            //  onStartShouldSetResponder={(event) => this.AddsManagement(event)}
            onStartShouldSetResponder={evt => {
              evt.persist();
              if (this.childrenIds && this.childrenIds.length) {
                if (this.childrenIds.includes(evt.target)) {
                  return;
                }
                console.log('Tapped outside');
              }
            }}
          >
            <All />
          </View>
        </Provider>
    );
  }
  _renderItem = ({ item }) => {
    return (
      <Image source={item.image} style={{ height: "100%", width: "100%" }} resizeMode="contain" />
    );
  }
  _onDone = async () => {
    await AsyncStorage.setItem('Fistime', "false")
    this.setState({ showSlider: false });
  }

  AddsManagement = (event) => {
    console.log(event)
  }

}
