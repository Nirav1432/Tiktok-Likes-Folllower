import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Platform } from 'react-native';
import styles from './styles/ShareAndRateStyles';
import { Icons } from "../Utils/IconManager";
import Header from '../Components/Header';
import { connect } from 'react-redux'
import Share from 'react-native-share';
import Rate, { AndroidMarket } from 'react-native-rate'
import { puMaxCount, putcount, shoeAds, hideAds } from '../ReduxConfig/Actions/AddCount/AddCount';
import NativeAdsView from '../Screens/NativeAdsScreen'
import { InterstitialAdManager, AdSettings, BannerView, NativeAdsManager } from 'react-native-fbads';
import { heightPercentageToDP } from 'react-native-responsive-screen';

const AndroidRate = {
    GooglePackageName: "com.harekrishna.tikbooster",
    AppleAppID: "1520155141",
    preferredAndroidMarket: AndroidMarket.Google,
    preferInApp: true,
    openAppStoreIfInAppFails: true,
}
class ShareAndRate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: { follower_coin: 0 }
        };
    }


    componentDidMount() {
        // if (this.props.Data.adsCounter == this.props.Data.maxAdsCounter) {
        //     setTimeout(async () => {
        //         await this.props.showAds()
        //         await this.props.putCouter(0)
        //     }, 700)
        // }
    }


    shareMyapp = () => {
        let options = {
            url: Platform.OS === "ios" ? "https://apps.apple.com/us/app/id1520155141" : "https://play.google.com/store/apps/details?id=com.harekrishna.tikbooster"
        }
        Share.open(options)
            .then((res) => { })
            .catch((err) => { });
    }

    rateMyapp = () => {
        Rate.rate(AndroidRate, success => {

        })
    }

    render() {
        return (
            <ScrollView style={styles.MAINVIW}>
                <Header title={"Share & Rate App"} backPress={() => this.props.navigation.goBack()} coin={this.state.data.follower_coin} />
                <View style={styles.VIW1}>
                    <Image source={Icons.mobile} style={styles.IMG} resizeMode="contain" />
                    <Text style={styles.TXT}>Your Request Proceed Added Successfully. You will get it very soon. please give reviewto support us.</Text>
                    <View style={styles.ButtonView}>
                        <View style={styles.VIW2}>
                            <TouchableOpacity style={styles.Button} onPress={() => this.shareMyapp()}>
                                <Text style={styles.TXT3}>Share App</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.VIW2}>
                            <TouchableOpacity style={styles.Button} onPress={() => this.rateMyapp()}>
                                <Text style={styles.TXT3}>Rate App</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={styles.Thankyou}>Thank you!</Text>
                    <Text style={styles.LastTXT}>Do not remove this app to get more{"\n"}fans,heart,comments,and share</Text>
                </View>
                <View style={{ flex: 1, marginBottom: heightPercentageToDP(2) }}>
                    <NativeAdsView adsManager={this.props.Data.NativeADSObj} />
                </View>
            </ScrollView>
        );
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
        setGlobalData: (data) => { dispatch(putLogin(JSON.stringify(data))) },
        putCouter: (cnt) => dispatch(putcount(cnt)),
        showAds: () => dispatch(shoeAds()),
        hideAds: () => dispatch(hideAds()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ShareAndRate);