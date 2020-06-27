import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './Styles/SidemenuStyle'
import { Icons } from '../Utils/IconManager'
import { withNavigation } from 'react-navigation'
import Preloader from './Preloader';
import { connect } from 'react-redux'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { WebView } from 'react-native-webview';
import { putLogin } from '../ReduxConfig/Actions/Login/LoginActions'
import { puMaxCount, putcount, shoeAds, hideAds } from '../ReduxConfig/Actions/AddCount/AddCount';
import Rate, { AndroidMarket } from 'react-native-rate'
import { custom_number_format, InterStrialAds } from '../Utils/functions'



const WWW_INJECTED_JAVASCRIPT = 'window.ReactNativeWebView.postMessage(document.getElementById("__NEXT_DATA__").innerHTML)'

const AndroidRate = {
    AppleAppID:"1520155141",
    GooglePackageName: "com.harekrishna.tikbooster",
    preferredAndroidMarket: AndroidMarket.Google,
    preferInApp: false,
    openAppStoreIfInAppFails: true,
}

class Sidemenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Refresh: false,
            visible: false,
            uniqueId: "",
            TiktokUrl: "",
            Type: ""
        };
    }

    async componentDidMount() {
        await this.setState({ uniqueId: '@' + this.props.Data.CommonData.uniqueId, TiktokUrl: this.props.Data.CommonData.Tiktok, Type: this.props.Data.CommonData.Type })
    }

    rateMyapp = () => {
        Rate.rate(AndroidRate, success => {
        })
    }

    render() {
        return (
            <View style={styles.MAINVIW}>
                <StatusBar backgroundColor="#FE2C55" />
                <Preloader isLoader={this.state.visible} />
                {
                    this.state.Refresh ?
                        <View style={{ height: hp(0) }}>
                            <WebView
                                source={{ uri: "https://www.tiktok.com/" + this.state.uniqueId }}
                                javaScriptEnabled={true}
                                allowUniversalAccessFromFileURLs={true}
                                allowFileAccess={true}
                                injectedJavaScript={WWW_INJECTED_JAVASCRIPT}
                                mixedContentMode={'always'}
                                onMessage={event => this.GetNewData(event.nativeEvent.data)}
                                onError={() => this.setState({ visible: false })}
                                onHttpError={() => this.setState({ visible: false })}
                                style={{ height: 0 }}
                            />
                        </View>
                        :
                        <></>
                }
                <View style={styles.InnerView1}>
                    <Image source={Icons.AppIcon} style={styles.IMG1} resizeMode="contain" />
                </View>
                <View style={styles.InnerView2}>
                    <TouchableOpacity style={styles.CMNVIW} onPress={() => this.commonNavigator('ContactUs')}>
                        <View style={styles.VIW1}>
                            <Image source={Icons.contact} style={styles.CMNIMG} resizeMode="contain" />
                        </View>
                        <View style={styles.VIW2}>
                            <Text style={styles.CMNTXT}>Contact us</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.CMNVIW} onPress={() => this.commonNavigator('PrivacyAndPolicy')}>
                        <View style={styles.VIW1}>
                            <Image source={Icons.lock} style={styles.CMNIMG} resizeMode="contain" />
                        </View>
                        <View style={styles.VIW2}>
                            <Text style={styles.CMNTXT}>Privacy</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.CMNVIW} onPress={() => this.rateMyapp()}>
                        <View style={styles.VIW1}>
                            <Image source={Icons.star} style={styles.CMNIMG} resizeMode="contain" />
                        </View>
                        <View style={styles.VIW2}>
                            <Text style={styles.CMNTXT}>Rate App</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.CMNVIW} onPress={() => this.commonNavigator('ShareAndRate')}>
                        <View style={styles.VIW1}>
                            <Image source={Icons.ShareIcon} style={styles.CMNIMG} resizeMode="contain" />
                        </View>
                        <View style={styles.VIW2}>
                            <Text style={styles.CMNTXT}>Share App</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.CMNVIW} onPress={() => this.onRefreshPressed()}>
                        <View style={styles.VIW1}>
                            <Image source={Icons.refresh} style={styles.CMNIMG} resizeMode="contain" />
                        </View>
                        <View style={styles.VIW2}>
                            <Text style={styles.CMNTXT}>Refresh</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.CMNVIW} onPress={() => this.onLogoutPress()}>
                        <View style={styles.VIW1}>
                            <Image source={Icons.logout} style={styles.CMNIMG} resizeMode="contain" />
                        </View>
                        <View style={styles.VIW2}>
                            <Text style={styles.CMNTXT}>Logout</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    async onLogoutPress() {
        await AsyncStorage.removeItem("UserNaData")
        // await AsyncStorage.removeItem('Fistime')
        await AsyncStorage.removeItem('app_version')
        this.props.navigation.navigate("Login")
    }

    async GetNewData(DA) {
        let DATA = await JSON.parse(DA)
        let FinalData = await DATA.props.pageProps.userData
        FinalData["Tiktok"] = this.state.TiktokUrl
        FinalData["Type"] = this.state.type
        await AsyncStorage.setItem("UserNaData", JSON.stringify(FinalData))
        await this.props.setGlobalData(FinalData)
        await this.setState({ visible: false, Refresh: false })
        this.props.navigation.closeDrawer()
        this.props.navigation.navigate('Home')
    }

    async onRefreshPressed() {
        await this.setState({ Refresh: true, visible: true })
    }

    commonNavigator = async (Type) => {
        if (this.props.Data.adsCounter == this.props.Data.maxAdsCounter) {

            await this.props.showAds()

            setTimeout(async () => {
              let adsResult = await InterStrialAds()
              this.props.hideAds()
              await this.props.putCouter(0)
              this.props.navigation.navigate(Type)
            }, 3000)

        }
        else {
            let cnt = this.props.Data.adsCounter
            cnt++;
            this.props.putCouter(cnt)
            this.props.navigation.navigate(Type)
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Sidemenu));