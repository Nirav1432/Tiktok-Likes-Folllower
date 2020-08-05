import React, { Component } from 'react';
import { View, Image, Text, StatusBar, TouchableHighlight, Platform } from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer';
import Homescreen from '../Screens/Homescreen';
import Sidemenu from '../Components/Sidemenu';
import LoginScreen from '../Screens/LoginScreen';
import Follower from '../Screens/Follower';
import GetFollower from '../Screens/GetFollower';
import FollowerList from '../Screens/FollowerList';
import SplashScreen from '../Screens/SplashScreen';
import Likes from '../Screens/Likes';
import GetLikes from '../Screens/GetLikes';
import LikesList from '../Screens/LikesList';
import Comments from '../Screens/Comments';
import GetComments from '../Screens/GetComments';
import Share from '../Screens/Share';
import GetShare from '../Screens/GetShare';
import ContactUs from '../Screens/ContactUs';
import EarnScreen from '../Screens/EarnScreen';
import ContactUsList from '../Screens/ContactUsList';
import PurchaseCoinsScreen from '../Screens/PurchaseCoinsScreen';
import WatchVideoTimer from '../Screens/WatchVideoTimer';
import watchVideoButton from '../Screens/watchVideoButton';
import ScratchAndWin from '../Screens/ScratchAndWin';
import DoFollowing from '../Screens/DoFollowing';
import DoLikes from '../Screens/DoLikes';
import ShareAndRate from '../Screens/ShareAndRate';
import DoShare from '../Screens/DoShare';
import DoComments from '../Screens/DoComments';
import CommentList from '../Screens/CommentList';
import ShareList from '../Screens/ShareList';
import CommonScreen from '../Screens/CommonScreen';
import AppIntroSlider from 'react-native-app-intro-slider';
import SP from 'react-native-splash-screen'
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux'
import { hideAds } from '../ReduxConfig/Actions/AddCount/AddCount'
import PrivacyAndPolicy from '../Screens/PrivacyAndPolicy';
import messaging from '@react-native-firebase/messaging';
import { isFirstTime, setFirstTime, putNativeAdsObject } from '../ReduxConfig/Actions/Login/LoginActions'
import crashlytics from '@react-native-firebase/crashlytics';
import CommonLoader from '../Components/CommonLoader';
import NativeAdAppInstallCheck from '../Screens/NativeAdAppInstallCheck';


const slides = [
    {
        key: 1,
        title: 'Title 1',
        text: 'Description.\nSay something cool',
        image: require('../Icons/1S.jpg'),
        backgroundColor: '#59b2ab',
    },
    {
        key: 2,
        title: 'Title 2',
        text: 'Other cool stuff',
        image: require('../Icons/2S.jpg'),
        backgroundColor: '#febe29',
    },
    {
        key: 3,
        title: 'Rocket guy',
        text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
        image: require('../Icons/3S.jpg'),
        backgroundColor: '#22bcb5',
    },
    {
        key: 4,
        title: 'Rocket guy',
        text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
        image: require('../Icons/4S.jpg'),
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
        CommonScreen: { screen: CommonScreen, navigationOptions: { headerShown: false } },
        PrivacyAndPolicy: { screen: PrivacyAndPolicy, navigationOptions: { headerShown: false } },
        NativeAdAppInstallCheck: { screen: NativeAdAppInstallCheck, navigationOptions: { headerShown: false } }
    },
    {
        initialRouteName: "Home"
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
    Login: { screen: LoginScreen },
    Sidemenu: { screen: DrawerScreens }
}, {
    initialRouteName: "SplashScreen"
})

const All = createAppContainer(SwitchedScreens)

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSlider: false,
        };
    }

    async componentDidMount() {


        await crashlytics().log('XXX')

        await Promise.all([
            crashlytics().setUserId("1432"),
            crashlytics().setUserName("Nirav Bhesaniya"),
            crashlytics().setUserEmail("Art.nn@gmail.cim"),
        ]).then((res) => {

        }).catch(err => {

        })

        //  crashlytics().crash()       

        messaging().subscribeToTopic('weather').then((log) => {
        })

        messaging().onMessage(() => {
        })

        let isfirsttime = await AsyncStorage.getItem('Fistime')
        if (isfirsttime == null) {
            this.props.setFirstTimeTrue()
            this.setState({ showSlider: true })
        }
        else {
            this.props.setFirstTimeFalse()
            this.setState({ showSlider: false, })
        }

    }

    render() {
        return (
            this.props.Data.isFirstime ?
                <View style={{ flex: 1, backgroundColor: "#FE2C55" }}>
                    <StatusBar backgroundColor="#FE2C55" />
                    <AppIntroSlider
                        renderItem={this._renderItem}
                        data={slides}
                        onDone={this._onDone}
                    />
                </View>
                :
                <View style={{ flex: 1 }}>
                    <CommonLoader visible={this.props.Data.showAds} />
                    <All />
                </View>

        );
    }


    _renderItem = ({ item }) => {
        return (
            <Image source={item.image} style={{ height: "100%", width: "100%" }} resizeMode="contain" />
        );
    }


    _onDone = async () => {
        await AsyncStorage.setItem('Fistime', "false")
        this.props.setFirstTimeFalse()
    }

}

const mapStateToProps = (state) => {
    return {
        Data: state.LoginData
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCoins: (coins) => dispatch(setDiamonds(coins)),
        hideAds: () => dispatch(hideAds()),
        setFirstTimeFalse: () => dispatch(setFirstTime()),
        setFirstTimeTrue: () => dispatch(isFirstTime()),
        setNativeAdsObject: (obj) => dispatch(putNativeAdsObject(obj))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);