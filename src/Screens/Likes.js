import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Platform } from 'react-native';
import styles from './styles/FollowerStyles';
import { Icons } from "../Utils/IconManager";
import Header from '../Components/Header';
import { puMaxCount, putcount, shoeAds, hideAds } from '../ReduxConfig/Actions/AddCount/AddCount';
import { connect } from 'react-redux'
import NativeAdsView from '../Screens/NativeAdsScreen'
import { InterstitialAdManager, AdSettings, BannerView, NativeAdsManager } from 'react-native-fbads';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';
import { custom_number_format, InterStrialAds } from '../Utils/functions'


class Likes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: { follower_coin: 0 }
        };
    }

    render() {
        return (
            <View style={styles.MAINVIW}>
                <Header title={"Like"} backPress={() => this.props.navigation.goBack()} coin={this.state.data.follower_coin} />
                <ScrollView>
                    <View style={styles.VIW2}>
                        <View style={styles.VIW12}>
                            <TouchableOpacity onPress={() => this.commonNavigator("GetLikes")}>
                                <Image style={styles.IMG4} source={Icons.Like} />
                                <Text style={styles.TXT55}>Get Likes</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.VIW12}>
                            <TouchableOpacity onPress={() => this.commonNavigator("LikesList")}>
                                <Image style={styles.IMG4} source={Icons.Like_List} />
                                <Text style={styles.TXT55}>Likes List</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex:1 , marginBottom: heightPercentageToDP(2) }}>
                        <NativeAdsView  adsManager={this.props.Data.NativeADSObj} />
                    </View>
                </ScrollView>
            </View>
        );
    }
    commonNavigator = async (Type) => {
        if (this.props.Data.adsCounter == this.props.Data.maxAdsCounter) {

            await this.props.showAds()

            setTimeout(async () => {
                let adsResult = await InterStrialAds(this.props.Data.InterStrialId)
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

export default connect(mapStateToProps, mapDispatchToProps)(Likes);
