import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ActivityIndicator, DeviceEventEmitter } from 'react-native';
import styles from './styles/ScratchAndWinStyles';
import { Icons } from "../Utils/IconManager";
import Header from '../Components/Header';
import { puMaxCount, putcount, shoeAds, hideAds } from '../ReduxConfig/Actions/AddCount/AddCount';
import { InterstitialAdManager, AdSettings, BannerView, NativeAdsManager } from 'react-native-fbads';
import NativeAdsView from '../Screens/NativeAdsScreen'
import { connect } from 'react-redux'
import { Services } from '../Configurations/Api/Connections';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';
import ScratchCardPopup from '../Components/Popups/ScratchCardPopup';
import AdsPopup from '../Components/Popups/AdsPopup';
import RNAndroidInstalledApps from 'react-native-android-installed-apps';
import AppList from 'react-native-installed-apps';

class ScratchAndWin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: { follower_coin: 0 },
            Scratches: [],
            SelectedScratchData: null,
            showPop: false,
            AdsPop: false
        };
    }

    componentDidMount() {
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
                <Header title={"Scratch & Win"} backPress={() => this.props.navigation.goBack()} coin={this.state.data.follower_coin} />
                <ScratchCardPopup data={this.state.SelectedScratchData} visible={this.state.showPop} ClosePop={() => this.ClosePop()} onScratchDone={() => this.setState({ AdsPop: true })} />
                <AdsPopup data={this.state.SelectedScratchData} visible={this.state.AdsPop} ClosePop={() => this.AdsPop()} />
                <View style={styles.ScratchView}>
                    {
                        this.state.Scratches.length > 0 ?
                            <ScrollView>
                                <Text style={styles.TXT1}>Try Your Luck by scratching coupons{"\n"}and win 10000 Diamonds</Text>
                                <View style={{ flex: 1, flexDirection: "row", paddingHorizontal: widthPercentageToDP(4), flexWrap: "wrap", alignSelf: "center", alignItems: "center" }}>
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
    onCardPress = async (data) => {
        await this.setState({ SelectedScratchData: data })
        this.setState({ showPop: true })
    }
    ClosePop = () => {
        this.setState({ showPop: false })
    }
    AdsPop = () => {
        this.setState({ AdsPop: false, showPop: false })
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
        showAds: () => dispatch(shoeAds()),
        hideAds: () => dispatch(hideAds()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScratchAndWin);
