import React, { Component } from 'react'
import { Text, View, StyleSheet, ActivityIndicator, ScrollView } from 'react-native'
import AdsPopup from '../Components/Popups/AdsPopup'
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { Fonts } from '../Utils/fonts';
import Header from '../Components/Header';
import { connect } from 'react-redux'
import { BannerView } from 'react-native-fbads';
import WaitingAppInstall from '../Components/Popups/WaitingAppInstallTwo';
import { Services } from '../Configurations/Api/Connections';
import Preloader from '../Components/Preloader';
import { puMaxCount, putcount, shoeAds, hideAds } from '../ReduxConfig/Actions/AddCount/AddCount';
import { setDiamonds } from '../ReduxConfig/Actions/Login/LoginActions';
import Congratulations from '../Components/Popups/Congratulations';
import GetAppsPop from '../Components/Popups/GetAppsPop';
import NativeAdViewTwo from '../Screens/NativeAdsScreenTwo'

class NativeAdAppInstallCheck extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            note: 'x',
            adsLoading: true,
            coin: 0,
            isWaitingforDownloadComplete: false,
            isWaiting: false,
            isLoaging: false,
            congo: false
        }
    }
    componentDidMount() {
        let dt = this.props.navigation.getParam('cardData')
        this.setState({ note: dt.note, coin: dt.coin, scratche_id: dt.scratche_id })
    }
    render() {
        return (
            <View style={{ flex: 1 }}>

                <Header title={"Scratch & Win"} backPress={() => this.props.navigation.goBack()} coin={0} />

                <Congratulations
                    visible={this.state.congo}
                    coins={this.state.coin}
                    ClosePop={() => this.setState({ congo: false })}
                />

                <Preloader isLoader={this.state.isLoaging} />

                <GetAppsPop visible={this.state.isWaiting} />

                <ScrollView style={{ flex: 1 }}>
                    {
                        this.state.isWaitingforDownloadComplete ?
                            <WaitingAppInstall appisInstalled={() => this.appisInstalled()} />
                            :
                            <></>
                    }
                    <View style={{ minHeight: hp(30), alignItems: "center", justifyContent: "center" }}>
                        <Text style={styles.Text2}>
                            {
                                this.state.note
                            }
                        </Text>
                    </View>
                    <View style={{ flex: 1, marginBottom:hp(2) }}>
                        <NativeAdViewTwo onAddpress={() => this.onAddpress()} adsManager={this.props.Data.NativeADSObj} />
                    </View>
                </ScrollView>
                {/* <View style={{
                    position: "absolute",
                    backgroundColor: "transparent",
                    width: "100%",
                    alignSelf: "center",
                    elevation: 3,
                    bottom: Platform.OS === "ios" ? heightPercentageToDP(0) : 0
                }}>
                    {
                        this.state.adsLoading ?
                            <View style={{
                                flexDirection: "row",
                                borderWidth: heightPercentageToDP(0.2),
                                backgroundColor: "white",
                                borderColor: "#3C64B3",
                                borderRadius: heightPercentageToDP(1),
                                height: heightPercentageToDP(6),
                                justifyContent: "center",
                                // position:"absolute",
                                // zIndex:100
                            }}>
                                <ActivityIndicator color={"#3C64B3"} />
                                <View style={{ justifyContent: "center" }}>
                                    <Text style={{ fontFamily: Fonts.LatoBold, left: 10 }}>Ads Loading</Text>
                                </View>
                            </View>
                            :
                            <></>
                    }
                    <View style={{ height: this.state.adsLoading ? 0 : "6%" }}>
                        <BannerView
                            placementId={this.props.Data.BannerId}
                            type="standard"
                            onPress={() => this.onAddpress()}
                            onLoad={(data) => this.onBannerLoad(data)}
                            onError={() => this.setState({ adsLoading: false })}
                        />
                    </View>
                </View> */}
            </View>
        )
    }

    onAddpress = async () => {
        this.setState({ isWaiting: true }, () => {
        })
        setTimeout(()=>{
            this.EnableOther()
        },5000)
    }

    EnableOther = async () => {
        this.setState({ isWaitingforDownloadComplete: true, })
    }

    onBannerLoad = (dt) => {
        this.setState({ adsLoading: false })
    }

    appisInstalled = async () => {
        this.setState({ isWaiting: false, isWaitingforDownloadComplete: false, isLoaging: true })
        let data = {
            user_id: this.props.Data.CommonData.userId,
            coin: this.state.coin,
            scratche_id: this.state.scratche_id
        }
        await Services.ScratchLog(data).then(async (res) => {
            await this.props.setCoins(res.coin)
            this.setState({ isLoaging: false })
            this.setState({ congo: true })
        }).catch((err) => {
            this.setState({ isLoaging: false })
            alert('Something Wrong ! You will get your diamonds soon')
        })
    }
}
const mapStateToProps = (state) => {
    return {
        Data: state.LoginData
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCoins: (coin) => dispatch(setDiamonds(coin)),
        putCouter: (cnt) => dispatch(putcount(cnt)),
        showAds: () => dispatch(shoeAds()),
        hideAds: () => dispatch(hideAds()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NativeAdAppInstallCheck);

const styles = StyleSheet.create({
    Text2: {
        fontSize: hp(3),
        color: '#333333',
        alignSelf: "center",
        textAlign: "justify",
        width: "70%",
        fontFamily: Fonts.LatoBlack,
        lineHeight: hp(5)
    },
})