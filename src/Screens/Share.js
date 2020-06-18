import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, } from 'react-native';
import styles from './styles/FollowerStyles';
import { Icons } from "../Utils/IconManager";
import Header from '../Components/Header';
import { puMaxCount, putcount, shoeAds } from '../ReduxConfig/Actions/AddCount/AddCount';
import { InterstitialAdManager, AdSettings, BannerView, NativeAdsManager } from 'react-native-fbads';
import NativeAdsView from '../Screens/NativeAdsScreen'
import { connect } from 'react-redux'
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';

let ads = new NativeAdsManager("979168055864310_981496822298100")

class Share extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: { follower_coin: 0 }
        };
    }
    UNSAFE_componentWillMount() {
        // if (this.props.Data.adsCounter == this.props.Data.maxAdsCounter) {
        //     setTimeout(async () => {
        //         await this.props.showAds()
        //         await this.props.putCouter(0)
        //     }, 1500)
        // }
    }
    render() {
        return (
            <View style={styles.MAINVIW}>
                <Header title={"Share"} backPress={() => this.props.navigation.goBack()} coin={this.state.data.follower_coin} />
                <ScrollView>
                    <View style={styles.VIW2}>
                        <View style={styles.VIW12}>
                            <TouchableOpacity onPress={() => this.commonNavigator("GetShare")}>
                                <Image style={styles.IMG4} source={Icons.shareHome} />
                                <Text style={styles.TXT55}>Get Share</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.VIW12}>
                            <TouchableOpacity onPress={() => this.commonNavigator("ShareList")}>
                                <Image style={styles.IMG4} source={Icons.ShareList} />
                                <Text style={styles.TXT55}>Share List</Text>
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
            await this.props.putCouter(0)
            this.props.navigation.navigate(Type)
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
        showAds: () => dispatch(shoeAds())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Share);
