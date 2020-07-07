import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Platform } from 'react-native';
import styles from './styles/GetCommentsStyles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Services } from '../Configurations/Api/Connections';
import { Icons } from '../Utils/IconManager'
import Header from '../Components/Header';
import Preloader from '../Components/Preloader';
import { connect } from 'react-redux'
import { setDiamonds } from '../ReduxConfig/Actions/Login/LoginActions'
import { puMaxCount, putcount, shoeAds, hideAds } from '../ReduxConfig/Actions/AddCount/AddCount';
import BannerAds from './BannerAds';
import { InterstitialAdManager, AdSettings } from 'react-native-fbads';
import { custom_number_format, InterStrialAds } from '../Utils/functions'



class GetComments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DataFromServer: [],
            visible: true
        };
    }


    componentDidMount() {
        this.getData()
    }

    getData() {

        Services.getListofCoins().then((res) => {
            if (res.selection.length > 0) {
                this.setState({ visible: false })
                for (let obj of res.selection) {
                    if (obj.type == 3) {
                        this.state.DataFromServer.push(obj)
                    }
                }
            }
        }).catch((res) => {
            this.setState({ visible: false })
        })
        // if (this.props.Data.adsCounter == this.props.Data.maxAdsCounter) {
        //     setTimeout(async () => {
        //         await this.props.showAds()
        //         await this.props.putCouter(0)
        //     }, 2500)
        // }
    }

    render() {
        return (
            <View style={styles.MAINVIW}>
                <Preloader isLoader={this.state.visible} />
                <Header title={"Get Views"} backPress={() => this.props.navigation.goBack()} />

                <FlatList
                    data={this.state.DataFromServer}
                    renderItem={({ item, index, ss }) =>
                        <View style={[styles.VIW12, { marginTop: index == 0 ? hp(2) : 0, marginBottom: index == this.state.DataFromServer.length - 1 ? Platform.OS === "ios" ? hp(9) : hp(8) : hp(2) }]}>
                            <View style={styles.VIW13}>
                                <View>
                                    <Text style={styles.TXT6}>{index + 1 + ". "}</Text>
                                </View>
                                <View>
                                    <Text style={styles.TXT6}>{"Get " + item.request + " Real Views in " + item.coin}</Text>
                                    <Text style={styles.TXT6}>{"Diamonds."}</Text>
                                </View>
                            </View>
                            <View style={styles.VIW14}>
                                <TouchableOpacity style={[styles.VIW16]} onPress={() => this.commonNavigator(item)}>
                                    <View style={styles.VIW17}>
                                        <Image source={Icons.GetComments} style={styles.IMG4} resizeMode="contain" />
                                    </View>
                                    <View style={styles.VIW18}>
                                        <Text style={styles.TXT4}>{"Get " + item.request + " Views"}</Text>
                                    </View>
                                    <View style={styles.VIW19}>
                                        <Image source={Icons.right} style={styles.IMG3} resizeMode="contain" />
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

        if (this.props.Data.adsCounter == this.props.Data.maxAdsCounter) {

            await this.props.showAds()

            setTimeout(async () => {
                let adsResult = await InterStrialAds(this.props.Data.InterStrialId)
                this.props.hideAds()
                await this.props.putCouter(0)
                this.props.navigation.navigate('CommonScreen', { type: "Get Views", data: { Diamonds: item.coin, Request: item.request } })
            }, 3000)

        }
        else {
            let cnt = this.props.Data.adsCounter
            cnt++;
            this.props.putCouter(cnt)
            this.props.navigation.navigate('CommonScreen', { type: "Get Views", data: { Diamonds: item.coin, Request: item.request } })
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

export default connect(mapStateToProps, mapDispatchToProps)(GetComments);
