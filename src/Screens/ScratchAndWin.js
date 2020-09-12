import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ActivityIndicator, DeviceEventEmitter } from 'react-native';
import styles from './styles/ScratchAndWinStyles';
import { Icons } from "../Utils/IconManager";
import Header from '../Components/Header';
import { puMaxCount, putcount, shoeAds, hideAds } from '../ReduxConfig/Actions/AddCount/AddCount';
import { setDiamonds, ShowAppInstallPop } from '../ReduxConfig/Actions/Login/LoginActions';
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

let before = 0

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
    }

    getDt = () => {
        this.setState({ Scratches: [], isLoaging: true })
        let dt = {
            user_id: this.props.Data.CommonData.userId
        }
        Services.scratcheList(dt).then((res) => {
            if (res.flag == true) {
                let x = []
                for (let obj of res.scratche) {
                    x.push(obj)
                }
                this.setState({ Scratches: x, isLoaging: false })
            }
            else{
                this.setState({ isLoaging: false })
            }
        })
        setTimeout(() => this.onBackground(), 3000)
    }

    getAppsCount = async () => {
        await RNAndroidInstalledApps.getNonSystemApps()
            .then(apps => {
                let after = apps.length
                console.log('before--->', before)
                console.log('after--->', after)
                if (after > before) {
                    before = after
                    this.appisInstalled()
                }
                else {
                    this.props.showInstallPop(false)
                    alert("Sorry ! without installing app you can't get Diamonds")
                }
            })
            .catch(error => {
                alert(error);
            });
    }

    onBackground = async () => {
        await RNAndroidInstalledApps.getNonSystemApps()
            .then(apps => {
                before = apps.length
                console.log('before--->', before)
            })
            .catch(error => {
                alert(error);
            });
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
                {/* <AppStateListener
                    // onActive={() => this.onActive()}
                    onBackground={() => this.getAppsCount()}
                /> */}
                <Preloader isLoader={this.state.isLoaging} />
                <Header title={"Scratch & Win"} backPress={() => this.props.navigation.goBack()} coin={this.state.data.follower_coin} />
                <ScratchBanner data={this.state.SelectedScratchDataEx} visible={this.state.showPopX} ClosePop={() => this.ClosePop()} onScratchDone={() => this.onXscrDone()} />
                <ScratchCardPopup data={this.state.SelectedScratchData} visible={this.state.showPop} ClosePop={() => this.ClosePop()} onScratchDone={() => this.setState({ AdsPop: true, showPop: false })} />
                <AdsPopup data={this.state.SelectedScratchData} visible={this.state.AdsPop} simpleClose={() => this.simpleClose()} ClosePop={() => this.AdsPop()} />
                {/* {
                    this.state.isWaitingforDownloadComplete ?
                        <WaitingAppInstall appisInstalled={() => this.appisInstalled()} />
                        :
                        <></>
                } */}
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
                                <View style={{ alignItems: "center", flexDirection: "row", flexWrap: "wrap", left: widthPercentageToDP(8.5) }}>
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
                            <View>
                                {
                                    this.state.isLoaging ?
                                        <Text style={[styles.TXT1, { fontSize: heightPercentageToDP(2.5) }]}>
                                            Getting Scratch Cards...
                                        </Text>
                                        :
                                        <Text style={[styles.TXT1, { fontSize: heightPercentageToDP(2.5) }]}>
                                            No More Scratch Cards Found for today
                                        </Text>
                                }
                            </View>
                    }

                </View>
            </View>
        );
    }

    onXscrDone = () => {
        this.setState({ showPopX: false })
        if (this.state.SelectedScratchDataEx.advertise == "native")
            this.props.navigation.navigate('NativeAdAppInstallCheck', { cardData: this.state.SelectedScratchDataEx })
        else
            this.props.navigation.navigate('BannerInstallApp', { cardData: this.state.SelectedScratchDataEx })
    }

    onCardPress = async (data) => {
        if (data.advertise == "native") {
            await this.setState({ SelectedScratchDataEx: data })
            this.setState({ showPopX: true })
        }
        else if (data.advertise == "banner") {
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
        this.props.showInstallPop(true)
        setTimeout(() => this.getAppsCount(), 500)
    }

    AdsPop = async () => {
        this.setState({ isWaitingforDownloadComplete: true, })
    }

    appisInstalled = async () => {
        this.props.showInstallPop(false)
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
        showInstallPop: (bool) => dispatch(ShowAppInstallPop(bool)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScratchAndWin);
