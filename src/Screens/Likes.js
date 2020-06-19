import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, } from 'react-native';
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


let ads = new NativeAdsManager("979168055864310_981496822298100")

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

export default connect(mapStateToProps, mapDispatchToProps)(Likes);
