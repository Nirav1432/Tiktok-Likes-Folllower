import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Platform, ScrollView } from 'react-native';
import styles from './styles/FollowerStyles';
import { Icons } from "../Utils/IconManager";
import Header from '../Components/Header';
import { setDiamonds } from '../ReduxConfig/Actions/Login/LoginActions'
import { puMaxCount, putcount, shoeAds, hideAds } from '../ReduxConfig/Actions/AddCount/AddCount';
import { connect } from 'react-redux'
import { InterstitialAdManager, AdSettings, BannerView, NativeAdsManager } from 'react-native-fbads';
import NativeAdsView from '../Screens/NativeAdsScreen'
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { custom_number_format, InterStrialAds } from '../Utils/functions'

let ads = new NativeAdsManager(Platform.OS === "android" ? "979168055864310_981496822298100" : "579084412746231_580335949287744")

class Follower extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: { follower_coin: 0 }
        };
    }

    render() {
        return (
            <View style={styles.MAINVIW}>
                <Header title={"Follower"} backPress={() => this.props.navigation.goBack()} coin={this.state.data.follower_coin} />
                <ScrollView>
                    <View style={styles.VIW2}>
                        <View style={styles.VIW12}>
                            <TouchableOpacity onPress={() => this.commonNavigator("GetFollower")}>
                                <Image style={styles.IMG4} source={Icons.get_follower} />
                                <Text style={styles.TXT55}>Get Followers</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.VIW12}>
                            <TouchableOpacity onPress={() => this.commonNavigator("FollowerList")}>
                                <Image style={styles.IMG4} source={Icons.follower_list} />
                                <Text style={styles.TXT55}>Followers List</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ height: heightPercentageToDP(60), marginBottom: heightPercentageToDP(2) }}>
                        <NativeAdsView adsManager={ads} />
                    </View>
                </ScrollView>
            </View>
        );
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
        putCouter: (cnt) => dispatch(putcount(cnt)),
        showAds: () => dispatch(shoeAds()),
        hideAds: () => dispatch(hideAds()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Follower);