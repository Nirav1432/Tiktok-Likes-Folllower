import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ActivityIndicator, DeviceEventEmitter } from 'react-native';
import styles from './styles/ScratchAndWinStyles';
import { Icons } from "../Utils/IconManager";
import Header from '../Components/Header';
import { puMaxCount, putcount, shoeAds, hideAds } from '../ReduxConfig/Actions/AddCount/AddCount';
import { setDiamonds } from '../ReduxConfig/Actions/Login/LoginActions';
import { InterstitialAdManager, AdSettings, BannerView, NativeAdsManager } from 'react-native-fbads';
import NativeAdsView from '../Screens/NativeAdsScreen'
import { connect } from 'react-redux'
import { Services } from '../Configurations/Api/Connections';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';
import ScratchCardPopup from '../Components/Popups/ScratchCardPopup';
import AdsPopup from '../Components/Popups/AdsPopup';
import AppStateListener from "react-native-appstate-listener";
import RNAndroidInstalledApps from 'react-native-android-installed-apps';
import WaitingAppInstall from '../Components/Popups/WaitingAppInstall';
import Congratulations from '../Components/Popups/Congratulations'
import Preloader from '../Components/Preloader'
import ScratchBanner from '../Components/Popups/ScratchBanner';
import { NavigationEvents } from 'react-navigation';
import GetAppsPop from '../Components/Popups/GetAppsPop';


class ScratchAndWin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: { follower_coin: 0 },
            Scratches: [],
            SelectedScratchData: { coin: 0 },
            SelectedScratchDataEx: { coin: 0 },
            showPop: false,
            showPopX: false,
            AdsPop: false,
            AppCounter: 0,
            isWaitingforDownloadComplete: false,
            isWaitingforDownloadCompletePop: false,
            congo: false,
            isLoaging: false
        };
    }

    async componentDidMount() {
        // this.getDt()
    }

    getDt = () => {
        this.setState({ Scratches: [] })
        Services.scratcheList(this.props.Data.CommonData.userId).then((res) => {
            let x = []
            for (let obj of res.scratche) {
                x.push(obj)
            }
            this.setState({ Scratches: x })
        })
    }

    onScratchDone = () => {
        alert('Done')
    }

    render() {
        return (
            <View style={styles.MAINVIW}>
                <NavigationEvents
                    onDidFocus={() => this.getDt()}
                />
                <Preloader isLoader={this.state.isLoaging} />
                <Header title={"Scratch & Win"} backPress={() => this.props.navigation.goBack()} coin={this.state.data.follower_coin} />
                <ScratchBanner data={this.state.SelectedScratchDataEx} visible={this.state.showPopX} ClosePop={() => this.ClosePop()} onScratchDone={() => this.onXscrDone()} />
                <ScratchCardPopup data={this.state.SelectedScratchData} visible={this.state.showPop} ClosePop={() => this.ClosePop()} onScratchDone={() => this.setState({ AdsPop: true, showPop: false })} />
                <AdsPopup data={this.state.SelectedScratchData} visible={this.state.AdsPop} simpleClose={() => this.simpleClose()} ClosePop={() => this.AdsPop()} />
                <GetAppsPop visible={this.state.isWaitingforDownloadCompletePop} />
                {
                    this.state.isWaitingforDownloadComplete ?
                        <WaitingAppInstall appisInstalled={() => this.appisInstalled()} />
                        :
                        <></>
                }
                <Congratulations
                    visible={this.state.congo}
                    coins={this.state.SelectedScratchData.coin}
                    ClosePop={() => this.setState({ congo: false })}
                />
                <View style={styles.ScratchView}>
                    {
                        this.state.Scratches.length > 0 ?
                            <ScrollView>
                                <Text style={styles.TXT1}>Try Your Luck by scratching coupons{"\n"}and win 10000 Diamonds</Text>
                                <View style={{ flex: 1, left: widthPercentageToDP(5), flexDirection: "row", paddingHorizontal: widthPercentageToDP(4), flexWrap: "wrap", alignSelf: "center", alignItems: "center" }}>
                                    {
                                        this.state.Scratches.map((data, index) => {
                                            return (
                                                <TouchableOpacity onPress={() => this.onCardPress(data)} activeOpacity={0.7} style={[styles.View1, { marginLeft: index % 2 != 0 ? widthPercentageToDP(2) : 0 }]}>
                                                    <Image source={Icons.ScratchImage} style={{ height: "100%", width: "100%" }} />
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </View>
                            </ScrollView>
                            :
                            <ActivityIndicator size="large" />
                    }

                </View>
            </View>
        );
    }

    onXscrDone = () => {
        this.setState({ showPopX: false })
        this.props.navigation.navigate('NativeAdAppInstallCheck', { cardData: this.state.SelectedScratchDataEx })
    }

    onCardPress = async (data) => {
        if (data.advertise == "native") {
            await this.setState({ SelectedScratchDataEx: data })
            this.setState({ showPopX: true })
        }
        else {
            await this.setState({ SelectedScratchData: data })
            await this.setState({ showPop: true })
        }
    }

    ClosePop = async () => {
        await this.setState({ showPop: false })
    }

    simpleClose = async () => {
        await this.setState({ AdsPop: false, showPop: false })
    }

    AdsPop = async () => {
        await this.setState({ AdsPop: false })
        await this.setState({ showPop: false })
        this.setState({ isWaitingforDownloadCompletePop: true, })

        setTimeout(() => {
            this.setState({ isWaitingforDownloadComplete: true, })
        }, 300)
    }

    appisInstalled = async () => {
        this.setState({ isWaitingforDownloadComplete: false, isLoaging: true, isWaitingforDownloadCompletePop: false })
        let data = {
            user_id: this.props.Data.CommonData.userId,
            coin: this.state.SelectedScratchData.coin,
            scratche_id: this.state.SelectedScratchData.scratche_id
        }
        await Services.ScratchLog(data).then(async (res) => {
            await this.props.setCoins(res.coin)
            this.setState({ isLoaging: false })
            this.getDt()
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
        putCouter: (cnt) => dispatch(putcount(cnt)),
        setCoins: (coin) => dispatch(setDiamonds(coin)),
        showAds: () => dispatch(shoeAds()),
        hideAds: () => dispatch(hideAds()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScratchAndWin);
