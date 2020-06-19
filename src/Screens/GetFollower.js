import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Platform } from 'react-native';
import styles from './styles/GetFollowerStyles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import GetFollowerPop from '../Components/Popups/GetFollowerPop'
import RequestSuccess from '../Components/Popups/RequestSuccess'
import { Icons } from '../Utils/IconManager'
import Header from '../Components/Header';
import Preloader from '../Components/Preloader';
import { connect } from 'react-redux'
import { Services } from '../Configurations/Api/Connections';
import NotEnoughDiamondPop from '../Components/Popups/NotEnoughDiamondPop';
import { setDiamonds } from '../ReduxConfig/Actions/Login/LoginActions'
import { puMaxCount, putcount, shoeAds,hideAds } from '../ReduxConfig/Actions/AddCount/AddCount';
import BannerAds from './BannerAds';
import { InterstitialAdManager, AdSettings } from 'react-native-fbads';
import { custom_number_format, InterStrialAds } from '../Utils/functions'


class GetFollower extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            DataFromServer: [],
            Visi: false,
            Visi1: false,
            TotalDiamond: 0,
            ClickedDiamond: 0,
            RequestFollowers: 0,
            userId: "",
            NotEnough: false
        };
    }
    componentDidMount() {
        this.setState({ TotalDiamond: this.props.Data.coins })
        this.setState({ userId: this.props.Data.CommonData.userId })
        this.setState({ visible: true })
        this.getData()
    }

    getData() {

        Services.getListofCoins().then(async (res) => {
            if (res.selection.length > 0) {
                this.setState({ visible: false })
                for (let obj of res.selection) {
                    if (obj.type == 2) {
                        this.state.DataFromServer.push(obj)
                    }
                }
                // if (this.props.Data.adsCounter == this.props.Data.maxAdsCounter) {
                //     setTimeout(async () => {
                //         await this.props.showAds()
                //         await this.props.putCouter(0)
                //     }, 2500)
                // }
            }
        }).catch((res) => {
            this.setState({ visible: false })
        })
    }

    PopupMangement = () => {

        this.setState({ Visi: false })
        let data = { user_id: this.state.userId, request_follower: this.state.RequestFollowers, follower_coin: this.state.ClickedDiamond }
        // let data = { user_id: this.state.userId, request_follower: 1, follower_coin: 1 }

        if (parseInt(data.follower_coin) > parseInt(this.state.TotalDiamond)) {
            this.setState({ NotEnough: true })
        }
        else {

            this.setState({ visible: true })
            Services.RequestFollower(data).then(async (res) => {
                if (res.tiktok_follower.success == "true") {
                    this.setState({ visible: false })
                    await this.props.setCoins(res.tiktok_follower.coin)
                    setTimeout(() => this.setState({ Visi1: true }), 500)
                }
                else{
                    this.setState({ visible: false })
                    setTimeout(()=>{
                        alert('Sorry! You can Request Only One At Time')
                    },100)
                    
                }
            })
        }
    }

    render() {
        return (
            <View style={styles.MAINVIW}>
                <Preloader isLoader={this.state.visible} />
                <NotEnoughDiamondPop
                    visible={this.state.NotEnough}
                    ClosePop={() => this.setState({ NotEnough: false })}
                />
                <GetFollowerPop
                    visible={this.state.Visi}
                    ClosePop={() => this.setState({ Visi: false })}
                    YesPress={() => this.PopupMangement()}
                    Counter={this.state.RequestFollowers}
                />
                <RequestSuccess
                    visible={this.state.Visi1}
                    ClosePop={() => this.setState({ Visi1: false })}
                />

                <Header title={"Get Followers"} backPress={() => this.props.navigation.goBack()} />


                <FlatList
                    data={this.state.DataFromServer}
                    renderItem={({ item, index, ss }) =>
                        <View style={[styles.VIW12, { marginTop: index == 0 ? hp(2) : 0,  marginBottom: index == this.state.DataFromServer.length - 1 ? Platform.OS === "ios" ? hp(9) : hp(8) : hp(2)  }]}>
                            <View style={styles.VIW13}>
                                <View>
                                    <Text style={styles.TXT6}>{index + 1 + ". "}</Text>
                                </View>
                                <View>
                                    <Text style={styles.TXT6}>{"Get " + item.request + " real followers in " + item.coin}</Text>
                                    <Text style={styles.TXT6}>{"Diamonds."}</Text>
                                </View>
                            </View>
                            <View style={styles.VIW14}>
                                <TouchableOpacity style={[styles.VIW16]} onPress={() => this.commonNavigator(item)}>
                                    <View style={styles.VIW17}>
                                        <Image source={Icons.Group} style={styles.IMG4} resizeMode="contain" />
                                    </View>
                                    <View style={styles.VIW18}>
                                        <Image source={Icons.premium_quality} style={styles.IMG5} resizeMode="contain" />
                                    </View>
                                    <View style={styles.VIW19}>
                                        <Text style={styles.TXT4}>{item.coin}</Text>
                                    </View>

                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                    style={styles.FlatList}
                    showsVerticalScrollIndicator={false}
                />
                <BannerAds />
            </View>
        );
    }
    commonNavigator = async (item) => {
        // if (this.props.Data.adsCounter == this.props.Data.maxAdsCounter) {
        //     await this.props.showAds()
        //     await this.props.putCouter(0)
        //     if (!this.props.showAds)
        //         this.setState({ Visi: true, ClickedDiamond: item.coin, RequestFollowers: item.request })
        // }
        // else {
        //     let cnt = this.props.Data.adsCounter
        //     cnt++;
        //     this.props.putCouter(cnt)
        //     this.setState({ Visi: true, ClickedDiamond: item.coin, RequestFollowers: item.request })
        // }
        if (this.props.Data.adsCounter == this.props.Data.maxAdsCounter) {

            await this.props.showAds()

            setTimeout(async () => {
              let adsResult = await InterStrialAds()
              if (adsResult) {
                this.props.hideAds()
                await this.props.putCouter(0)
                this.setState({ Visi: true, ClickedDiamond: item.coin, RequestFollowers: item.request })
              }
            }, 3000)

        }
        else {
            let cnt = this.props.Data.adsCounter
            cnt++;
            this.props.putCouter(cnt)
            this.setState({ Visi: true, ClickedDiamond: item.coin, RequestFollowers: item.request })
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
        setMaxAdsCounter: () => dispatch(puMaxCount(parseInt(OtherData.ads_click))),
        putCouter: (cnt) => dispatch(putcount(cnt)),
        showAds: () => dispatch(shoeAds()),
        hideAds: () => dispatch(hideAds()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GetFollower);